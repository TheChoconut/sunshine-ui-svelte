#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use std::{fs::File};
use std::io::Read;
use reqwest::StatusCode;
use reqwest_eventsource::EventSource;
use serde::{Deserialize, Serialize};
use futures::{StreamExt};
use tauri::Manager;
use tokio::task;
use tokio::sync::mpsc;
use tokio::sync::mpsc::{UnboundedSender};


#[derive(Debug, Serialize, Deserialize)]
struct APIResponse {
    code: u16,
    result: String
}

struct AppState(reqwest::Client, Option<reqwest::Certificate>, std::sync::Mutex<Option<UnboundedSender<bool>>>);

#[tauri::command]
async fn fetch(url: String, body: String, method: String, authorization: String, state: tauri::State<'_, AppState>) -> Result<String, String> {
  let client: &reqwest::Client = &state.0;
  let _method: reqwest::Method = reqwest::Method::from_bytes(method.as_bytes()).unwrap();
  let mut headers = reqwest::header::HeaderMap::new();
  headers.insert(reqwest::header::USER_AGENT, "Sunshine RustUI v0.0.1-beta".parse().unwrap());
  if authorization.len() > 0 {
    headers.insert(reqwest::header::AUTHORIZATION, authorization.parse().unwrap());
  }

  let result = client.request(_method, url)
    .headers(headers)
    .body(body)
    .send()
    .await;

  let result = match result {
    Ok(response) => response,
    Err(_error) => { return Err("Response failed: ".to_string() + &_error.to_string()); }
  };

  let code = result.status().as_u16();
  let response = APIResponse {
    result: result.text().await.unwrap(),
    code: code
  };
  
  Ok(serde_json::to_string(&response).unwrap())
}

#[tauri::command]
async fn start_sse(url_str: String, authorization: String, state: tauri::State<'_, AppState>, window: tauri::Window) -> Result<String, String> {

  let cert: reqwest::Certificate = state.1.as_ref().unwrap().clone();

  let url = reqwest::Url::parse(&url_str).unwrap();
  let (tx, mut rx) = mpsc::unbounded_channel::<bool>();

  *state.2.lock().unwrap() = Some(tx);

  task::spawn(async move {
    let client = reqwest::Client::builder()
      .add_root_certificate(cert).build().unwrap();
    let request = client.request(reqwest::Method::GET, url)
        .header(reqwest::header::AUTHORIZATION, authorization)
        .header(reqwest::header::USER_AGENT, "Sunshine RustUI v0.0.1-beta");
    let mut es = EventSource::new(request).unwrap();

    loop {
      tokio::select! (
        res = es.next() => {
          match res {
            Some(event) => match event {
              Ok(reqwest_eventsource::Event::Open) => println!("Connection Open!"),
              Ok(reqwest_eventsource::Event::Message(message)) => {
                window.emit_all("sse_event", message.data).unwrap();
              },
              Err(err) => {
                window.emit_all("sse_event", "{\"type\": \"error\"}").unwrap();
                println!("Error: {}", err);
                es.close();
              }
            },
            None => { window.emit_all("sse_event", "{\"type\": \"close\"}").unwrap(); println!("Something failed"); break; }
          }
        },
        _ = rx.recv() => {
          es.close();
          println!("SSE closed");
          break;
        }
      )
    }
  });
  
  Ok("confirmed".to_string())
}

#[tauri::command]
async fn stop_sse(state: tauri::State< '_,AppState>) -> Result<String, String> {
  // test
  match state.2.try_lock() {
    Ok(mut send) => {
      match send.as_mut() {
        Some(send) => {
          match send.send(true) {
            Ok(_) => return Ok("Sent stop command".to_string()),
            Err(_) => return Err("Failed to send SSE close event".to_string())
          }
        },
        None => return Err("SSE is not running.".to_string())
      }
    }
    Err(_err) => return Err("Failed to send SSE close event".to_string())
  }
  
}

fn read_certificate_file() -> Result<reqwest::Certificate, Box<dyn std::error::Error>> {
  let mut buf = Vec::new();
  let mut file = File::open("cacert.pem")?;
  file.read_to_end(&mut buf)?;
  match reqwest::Certificate::from_pem(&buf) {
    Ok(cert) => return Ok(cert),
    Err(_err) => return Err(Box::new(_err))
  };
}

fn main() {
  let client_builder = reqwest::Client::builder();
  
  let cert = read_certificate_file();
  let client = match cert { 
    Ok(ref cert) => client_builder.add_root_certificate(cert.clone()).build().unwrap(),
    Err(ref _err) => {
      println!("Failed to read certificate file!");
      client_builder.build().unwrap()
    }
  };
  
  let app = tauri::Builder::default()
    .manage(AppState(client, cert.ok(), std::sync::Mutex::new(None)))
    .invoke_handler(tauri::generate_handler![fetch, start_sse, stop_sse])
    .register_uri_scheme_protocol("sunshine", move |_app, request| {
      
      let response = tauri::http::ResponseBuilder::new();

      // Get wanted path.
      #[cfg(target_os = "windows")]
      let path = request.uri().strip_prefix("sunshine://localhost/").unwrap();
      #[cfg(not(target_os = "windows"))]
      let path = request.uri().strip_prefix("sunshine://").unwrap();
      let path = percent_encoding::percent_decode(path.as_bytes())
        .decode_utf8_lossy()
        .to_string();

      // Make an HTTPS request.
      let mut headers = reqwest::header::HeaderMap::new();
      headers.insert(reqwest::header::USER_AGENT, "Sunshine RustUI v0.0.1-beta".parse().unwrap());

      let state: tauri::State<AppState> = _app.state();
      let client: &reqwest::Client = &state.0;
      
      let result = client.request(reqwest::Method::GET, path)
        .headers(headers)
        .send();
      
      let rt = tokio::runtime::Runtime::new().unwrap();
      let result = rt.block_on(result);

      let result = match result {
        Ok(response) => response,
        Err(_error) => { return response.mimetype("text/plain").status(404).body(Vec::new()); }
      };
      
      if result.status() != StatusCode::OK {
        return response.mimetype("text/plain").status(404).body(Vec::new());
      }

      let bytes = rt.block_on(result.bytes()).unwrap();

      response.mimetype("image/png").status(200).body(bytes.to_vec())
    })
    .build(tauri::generate_context!())
    .expect("error while running tauri application");
  
  app.run(|app_handle, e| match e {
    tauri::RunEvent::WindowEvent { label, event, .. } => match event {
      tauri::WindowEvent::CloseRequested { .. } => {
        if label == "main" {
          let app_handle = app_handle.clone();
          std::thread::spawn(move || {
            match app_handle.get_window("pin_request") {
              None => {},
              Some(window) => { window.close().unwrap(); }
            }
          });
          
        }
      }
      _ => {}
    },
    _ => {}
  });
}
