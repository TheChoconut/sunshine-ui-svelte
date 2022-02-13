import { localStore } from '$lib/localStore'
import { pinDialog } from '$lib/store';
import { get } from 'svelte/store';

export type WindowProps = {
    x: number;
    y: number;
    app: SunshineApplication;
};
export type SunshineApplication = { 
    id: string;
    coverImage: string;
    name: string;
    output: string;
    "prep-cmd": { do: string; undo: string; }[];
    detached: string[];
    cmd: string;
    cwd: string;
}
export const EmptySunshineApp: SunshineApplication = { id: "-1", coverImage: "", name: "Untitled", output: "", "prep-cmd": [], detached: [], cmd: "", cwd: "" }
export type SunshineConfiguration = {
    sunshine_name: string;
    amd_quality: string;
    amd_rc: string;
    amd_coder: string;
    audio_sink: string;
    virtual_sink: string;
    adapter_name: string;
    output_name: string;
    back_button_timeout: number;
    key_repeat_delay: number;
    key_repeat_frequency: number;
    min_threads: string;
    fps: string;
    gamepad: string;
    hevc_mode: string;
    key_rightalt_to_key_win: boolean;
    pkey: string;
    cert: string;
    port: string;
    channels: string;
    encoder: string;
    sw_preset: string;
    sw_tune: string;
    file_state: string;
    file_apps: string;
    min_log_level: string;
    fec_percentage: string;
    nv_coder: string;
    nv_preset: string;
    nv_rc: string;
    ping_timeout: number;
    origin_pin_allowed: string;
    origin_web_api_allowed: string;
    platform: string;
    resolutions: string;
    status: string;
    upnp: boolean;
}

export type ApplicationsGetAPIResult = GenericResponse & { content: string }
export type ConfigGetAPIResult = GenericResponse & SunshineConfiguration
export type APIResponseTypes = {
    'get_apps': ApplicationsGetAPIResult,
    'save_app': GenericResponse,
    'delete_app': GenericResponse,
    'save_config': GenericResponse,
    'get_config': ConfigGetAPIResult,
    'save_pin': GenericResponse,
}
type GenericResponse = { type: string; result: boolean; }
type APIProps = {
    host: string;
    port: string;
    endpoint: string;
    token: string;
}

let WebSocket: WebSocket | null = null;
export const APIConfiguration = localStore<APIProps>('apiConfig', { host: 'localhost', port: '47990', endpoint: 'v1', token: ''});

export async function APIRequest<T extends keyof APIResponseTypes>(type: T, data: any = {}): Promise<APIResponseTypes[T]> {
    if (!WebSocket) throw new Error("Default WebSocket is not connected. Did you run StartWebSocketServer()?");
    return new Promise((resolve) => {
        WebSocket.send(JSON.stringify({type, data}));
        const id = setTimeout(() => resolve(null), 15000);
        WebSocket.onmessage = (ev) => {
            clearTimeout(id);
            resolve(JSON.parse(ev.data));
        };
    });
}

export async function WaitForSocket(): Promise<void> {
    return new Promise<void>((resolve) => {
        const retry = async () => { await WaitForSocket(); resolve(); }
        if (!WebSocket) {
            setTimeout(retry,200);
            return;
        }
        if (WebSocket.readyState != WebSocket.OPEN) {
            setTimeout(retry,200);
            return;
        }
        resolve();
    });
}

export function invalidateAPIConfiguration(): void {
    if (WebSocket && WebSocket.readyState == WebSocket.OPEN) {
        WebSocket.close();
    }
    WebSocket = null;
    APIConfiguration.update((a) => ({...a, token: ''}));
}

export async function StartWebSocketServer(tryAgain: boolean, suppliedConfig?: APIProps): Promise<boolean> {
    if (!('WebSocket' in window)) return false;
    if (WebSocket) return WebSocket.readyState === WebSocket.OPEN;

    const config = suppliedConfig || get(APIConfiguration);

    return new Promise((resolve) => {
        try {
            console.log("Connecting",config);
            WebSocket = new window.WebSocket(`wss://${config.host}:${config.port}/${config.endpoint}?token=${config.token}`);
            WebSocket.onerror = () => {
                invalidateAPIConfiguration();
                resolve(false);
            };
            WebSocket.addEventListener('message', (ev) => {
                const request = JSON.parse(ev.data);
                if (Object.prototype.hasOwnProperty.call(request, 'type') && request.type === 'request_pin') {
                    pinDialog.set({ open: true, pin: '' });
                }
            })
            WebSocket.onopen=function(evt) {
                console.log("Socket connected",evt);
                resolve(true);
            }  
            WebSocket.onclose=function() {
                invalidateAPIConfiguration();
                resolve(false);
                if (tryAgain) {
                    setTimeout(() => StartWebSocketServer(tryAgain), 1500);
                }
            }  
        } catch (e) {
            console.log('Error while creating WebSocket',e);
            resolve(false);
        }
    });

}