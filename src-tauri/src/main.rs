#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use std::fs::File;
use std::io::Read;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct APIResponse {
    code: u16,
    result: String
}

struct AppState(reqwest::Client, Option<reqwest::Certificate>);

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
async fn startSSE(urlStr: String, state: tauri::State<'_, AppState>) -> Result<String, String> {
  let cert: &reqwest::Certificate = &state.1.unwrap();

  let url = reqwest::Url::parse(&urlStr).unwrap();
  let joinHandle = std::thread::spawn(move || {
    let blocking = reqwest::blocking::Client::builder()
      .add_root_certificate(cert.to_owned()).build().unwrap();
    let client = eventsource::reqwest::Client::new_with_client(url, blocking);
  });
  // TODO: save join handle into app state.
  Ok("confirmed".to_string())
}

fn main() {

  let mut buf = Vec::new();
  let file_result = File::open("../cacert.pem");
  let client_builder = reqwest::Client::builder();
  let mut cert: Option<reqwest::Certificate> = None;
  match file_result {
    Ok(mut file) => { 
      file.read_to_end(&mut buf).expect("Failed to read the certificate.");
      cert = Some(reqwest::Certificate::from_pem(&buf).expect("Invalid certificate format."));
    },
    Err(_error) => println!("Error while reading certificate: {}", _error)
  };
  let client = match cert { 
    Some(cert) => client_builder.add_root_certificate(cert).build().unwrap(),
    None => client_builder.build().unwrap()
  };
  
  tauri::Builder::default()
    .manage(AppState(client, cert))
    .invoke_handler(tauri::generate_handler![fetch, startSSE])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
