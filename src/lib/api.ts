import { invoke } from '@tauri-apps/api';
import { WebviewWindow, primaryMonitor } from '@tauri-apps/api/window';
import { listen } from '@tauri-apps/api/event'
import { get } from 'svelte/store';
import { ConnectionResult, type APIProps, type APIResponseTypes, type SunshineApplication } from './types';
import { APIConfiguration } from './store';
import { nanoid } from 'nanoid';
import { goto } from '$app/navigation';

export const EmptySunshineApp: () => SunshineApplication = () => ({ id: nanoid(), name: "Untitled", "image-path": "", output: "", "prep-cmd": [], detached: [], cmd: "", "working-dir": "" })

const ServerAPIEvents = { active: false, unlistenFn: null };

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
            console.debug('API request failed',err);
            if (err.includes("not trusted")) {
                throw ConnectionResult.INVALID_CERTIFICATE;
            } else {
                TestConnection(true);
            }
            return null;
        });
}

export async function sha256(text: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

export async function APIAuthenticate(password: string): Promise<boolean> {

    return invoke('fetch', { url: getEndpointUrl('auth'), body: await sha256(password), method: 'POST', authorization: '' })
        .then((res: string) => JSON.parse(res))
        .then(async (res) => {
            if (res.code === 200) {
                const token = res.result;
                APIConfiguration.update((a) => ({...a, token}));
                invoke('start_sse', { urlStr: getEndpointUrl("events"), authorization: token });
                ServerAPIEvents.active = true;
                ServerAPIEvents.unlistenFn = await listen('sse_event', (event) => handleServerEvent(event.payload as string));
                return true;
            }
            else return false;
        })
        .catch(() => {
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
            console.warn("ServerAPIEvents active, but no event listening function isn't registered.");
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
                        visible: true
                    });
                } else {
                    await webview.show();
                    await webview.setFocus();
                    await webview.emit('onload');
                }
            } else if (data.type === 'error') {
                await TestConnection(true);
            } else if (data.type === 'close') {
                invalidateAPIConfiguration();
            }
        }
    } catch (e) { console.error('Server event fail: ', e); }
}

export async function TryTestConnection(checkForAuth: boolean, suppliedConfig?: APIProps): Promise<ConnectionResult> {
    const config = suppliedConfig || get(APIConfiguration);
    if (checkForAuth && !config.token) return;

    const result = await APIRequest('api_version')
        .then((result) => {
            if (!result) return ConnectionResult.CONNECTION_FAIL;
            if (Number(result.api_version) < 1) return ConnectionResult.OUTDATED_API; 
            if (checkForAuth === false || (checkForAuth && result.authenticated === "true")) {
                return ConnectionResult.CONNECTION_OK;
            } else return ConnectionResult.CONNECTION_FAIL;
        })
        .catch((err) => {
            if (err == ConnectionResult.INVALID_CERTIFICATE)
                return ConnectionResult.INVALID_CERTIFICATE;
            console.log('Connection test failed',err);
            return ConnectionResult.CONNECTION_FAIL;
        });
    return result;
}

export async function TestConnection(checkForAuth: boolean, suppliedConfig?: APIProps): Promise<void> {
    const config = suppliedConfig || get(APIConfiguration);

    const result = await TryTestConnection(checkForAuth, config);

    if (result !== ConnectionResult.CONNECTION_OK) {
        invalidateAPIConfiguration();
    }
}

APIConfiguration.subscribe(async a => {
    if (a.token !== '') {
        if (window.location.pathname === '/welcome') goto('/')
    } else {
        if (window.location.pathname !== '/welcome') {
            goto('/welcome')
        }
    }
})