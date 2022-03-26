import { localStore } from '$lib/localStore'
import { invoke } from '@tauri-apps/api';
import { WebviewWindow, primaryMonitor } from '@tauri-apps/api/window';
import { listen } from '@tauri-apps/api/event'
import { get } from 'svelte/store';

export type SunshineApplication = { 
    id: string;
    name: string;
    output: string;
    "prep-cmd": { do: string; undo: string; }[];
    detached: string[];
    cmd: string;
    cwd: string;
}
export const EmptySunshineApp: SunshineApplication = { id: "-1", name: "Untitled", output: "", "prep-cmd": [], detached: [], cmd: "", cwd: "" }
export type ConfigProperty = {
    name: string;
    translated_name: string;
    description: string;
    translated_description: string;
    required: boolean;
    type: "int" | "double" | "string" | "int_array" | "string_array" | "file" | "boolean" | "limited_string" | "custom";
}
export type ConfigGetSchemaAPIResult = GenericResponse & {
    [key: string]: ConfigProperty;
}
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
// @ts-expect-error base64 copied, fix by finding a lib.
// eslint-disable-next-line
const Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

export type ApplicationsGetAPIResult = GenericResponse & { content: string }
export type ConfigGetAPIResult = GenericResponse & SunshineConfiguration
export type APIVersionResult = GenericResponse & { api_version: string; version: string; }
export type APIResponseTypes = {
    'get_apps': ApplicationsGetAPIResult,
    'get_config': ConfigGetAPIResult,
    'get_config_schema': ConfigGetSchemaAPIResult,
    'api_version': APIVersionResult,
    'delete_app': GenericResponse,
    'save_config': GenericResponse,
    'save_app': GenericResponse,
    'save_pin': GenericResponse,
    'close_app': GenericResponse,
    'unpair_all': GenericResponse
}
type GenericResponse = { type: string; result: boolean; authenticated: string; }
type APIProps = {
    host: string;
    port: string;
    endpoints: {
        api: string;
        events: string;
        auth: string;
        appAsset: string;
    }
    token?: string;
}

const ServerAPIEvents = { active: false, unlistenFn: null };
export const APIConfiguration = localStore<APIProps>('apiConfig', { host: 'localhost', port: '47990', endpoints: { api: 'api/en', appAsset: 'appasset', auth: 'api/authenticate', events: 'api/events' }, token: ''});

export function getEndpointUrl(endpointType: 'auth' | 'events' | 'api' | 'appAsset'): string {
    const config = get(APIConfiguration);
    return `https://${config.host}:${config.port}/${config.endpoints[endpointType]}`;
}

export async function APIRequest<T extends keyof APIResponseTypes>(type: T, data: any = null): Promise<APIResponseTypes[T] | null> {
    const config = get(APIConfiguration);
    const authorization = config.token ? `Bearer ${config.token}` : "";
    return invoke('fetch', { url: getEndpointUrl('api') + '/' + type, body: data ? JSON.stringify(data) : '', method: data ? 'POST' : 'GET', authorization })
        .then((res: string) => JSON.parse(res))
        .then((res) => {
            if (res.code === 200) return JSON.parse(res.result);
            else throw "Invalid code: " + res.code;
        })
        .catch((err) => {
            // TODO: If certificate is not trusted, display a message.
            console.debug('API request failed',err);
            return null;
        });
}

export async function APIAuthenticate(password: string): Promise<boolean> {
    return invoke('fetch', { url: getEndpointUrl('auth'), body: "", method: 'POST', authorization: "Basic " + Base64.encode("sunshine" + ":" + password) })
        .then((res: string) => JSON.parse(res))
        .then(async (res) => {
            if (res.code === 200) {
                const token = res.result;
                APIConfiguration.update((a) => ({...a, token}));
                const config = get(APIConfiguration);
                invoke('start_sse', { urlStr: getEndpointUrl("events"), authorization: config.token });
                ServerAPIEvents.active = true;
                ServerAPIEvents.unlistenFn = await listen('sse_event', (event) => handleServerEvent(event.payload as string));
                return true;
            }
            else return false;
        })
        .catch((err) => {
            console.log(err); 
            return false;
        });
}

export function invalidateAPIConfiguration(): void {
    console.log('API configuration will be invalidated');
    if (ServerAPIEvents.active === true) {
        console.debug('invalidateAPIConfiguration: closing ServerAPIEvents');
        invoke('stop_sse')
            .then((res) => console.log('SSE closing success',res))
            .catch((res) => console.log('SSE closing failed',res));
        if (ServerAPIEvents.unlistenFn !== null)
            ServerAPIEvents.unlistenFn();
        else
            console.warn("ServerAPIEvents active, but no event listening function isn't registered.")
        ServerAPIEvents.unlistenFn = null;
        ServerAPIEvents.active = false;
    }
    APIConfiguration.update((a) => ({...a, token: ''}));
}

async function handleServerEvent(res: string) {
    try {
        const data = JSON.parse(res);
        console.debug('API server event',data);
        if (Object.prototype.hasOwnProperty.call(data, 'type')) {
            if (data.type === 'request_pin') {
                
                let webview = WebviewWindow.getByLabel('pin_request'); 
                
                if (webview === null) {
                    const monitor = await primaryMonitor();
                    webview = new WebviewWindow('pin_request', {
                        url: '/pin',
                        alwaysOnTop: true,
                        skipTaskbar: true,
                        title: 'Pair Requested',
                        fileDropEnabled: false,
                        resizable: false,
                        width: 400,
                        height: 180,
                        focus: true,
                        x: monitor.size.width - 420,
                        y: monitor.size.height - (200 + 48 + 20),
                        visible: true,
                    });
                } else {
                    await webview.show();
                    await webview.setFocus();
                }
            } else if (data.type === 'error') {
                let isConnected = await TestConnection(true);
                if (!isConnected) {
                    invalidateAPIConfiguration();
                }
            }
        }
    } catch (e) { console.error('Server event fail: ', e); }
}

export async function TestConnection(checkForAuth: boolean, suppliedConfig?: APIProps): Promise<boolean> {
    const config = suppliedConfig || get(APIConfiguration);
    if (config.token === "") return;

    const result = await APIRequest('api_version')
        .then((res) => { 
            console.log(res);
            return res;
        })
        .then((result) => Number(result.api_version) >= 1 && (checkForAuth ? result.authenticated === "true" : true))
        .catch((err) => {
            console.log('Connection test failed',err);
            return false;
        });
    return result;
}