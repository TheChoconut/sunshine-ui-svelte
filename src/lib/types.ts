export type SunshineConfiguration = {
    sunshine_name: string;
    amd_quality: string;
    amd_rc: string;
    amd_coder: string;
    audio_sink: string;
    virtual_sink: string;
    adapter_name: string;
    output_name: string;
    back_button_timeout: string;
    key_repeat_delay: string;
    key_repeat_frequency: string;
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
    ping_timeout: string;
    origin_pin_allowed: string;
    origin_web_api_allowed: string;
    platform: string;
    resolutions: string;
    status: string;
    upnp: boolean;
    dwmflush: boolean;
}
export type SunshineApplication = { 
    id: string;
    name: string;
    output: string;
    "prep-cmd": { do: string; undo: string; }[];
    "image-path": string;
    detached: string[];
    cmd: string;
    "working-dir": string;
}
export type ConfigProperty = {
    name: string;
    translated_name: string;
    description: string;
    translated_description: string;
    required: boolean;
    type: "int" | "double" | "string" | "int_array" | "string_array" | "file" | "boolean" | "custom";
}

export type GenericResponse = { type: string; result: boolean; authenticated: string; }
export type ApplicationsGetAPIResult = GenericResponse & { content: string }
export type ConfigGetAPIResult = GenericResponse & SunshineConfiguration
export type APIVersionResult = GenericResponse & { api_version: string; version: string; }
export type ConfigGetSchemaAPIResult = GenericResponse & { [key: string]: ConfigProperty; }

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

export type APIProps = {
    host: string;
    port: string;
    endpoints: {
        api: string;
        events: string;
        auth: string;
        appAsset: string;
    }
    token: string;
}

export enum ConnectionResult {
    CONNECTION_OK,
    CONNECTION_FAIL,
    OUTDATED_API,
    NOT_AUTHENTICATED,
    INVALID_CERTIFICATE
}