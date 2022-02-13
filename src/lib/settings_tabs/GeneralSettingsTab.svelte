<script lang="ts">
	import type { SunshineConfiguration } from '../api';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';

    import SettingPart from '../components/SettingPart.svelte';

    const config = getContext('SunshineSettings') as Writable<SunshineConfiguration>;
</script>
<SettingPart>
    <span slot="title">Your PC name</span>
    <span slot="help">The name displayed by Moonlight.<br> If not specified, the PC's hostname is used</span>
    <input bind:value={$config.sunshine_name} slot="input" type="text" placeholder="Sunshine" class="h-10 border-gray-300 border-1 pl-4 rounded-lg w-full" />
  </SettingPart>
  <SettingPart>
    <span slot="title">Log Level</span>
    <span slot="help">The minimum log level printed to standard out</span>
    <select slot="input" bind:value={$config.min_log_level} class="h-10 px-4 rounded-lg border-gray-300 border-1 w-40">
      <option value="0">Verbose</option>
      <option value="1">Debug</option>
      <option value="2">Info</option>
      <option value="3">Warning</option>
      <option value="4">Error</option>
      <option value="5">Fatal</option>
      <option value="6">None</option>
    </select>
  </SettingPart>
  <SettingPart>
    <span slot="title">Web API origin whitelist</span>
    <span slot="help">The origin of the remote endpoint address<br> that is not denied access to Web API</span>
    <select slot="input" bind:value={$config.origin_web_api_allowed} class="h-10 px-4 rounded-lg border-gray-300 border-1 w-40">
      <option value="pc">Localhost only</option>
      <option value="lan">LAN only</option>
      <option value="wan">Anyone</option>
    </select>
  </SettingPart>
  <SettingPart>
    <span slot="title">UPnP</span>
    <span slot="help">Automatically configure port forwarding</span>
    <div slot="input"  class="flex space-x-2">
      <input type="checkbox" bind:checked={$config.upnp} class="w-8 h-8 px-4" />
      <span class="text-xl">{$config.upnp ? 'Enabled' : 'Disabled'}</span>
    </div>
  </SettingPart>
  <SettingPart>
    <span slot="title">Gamepad</span>
    <span slot="help">Default gamepad used</span>
    <select slot="input" bind:value={$config.gamepad} class="h-10 px-4 rounded-lg border-gray-300 border-1 w-full">
      <option value="x360">X360 (Xbox 360)</option>
      <option value="ds4">DS4 (Dualshock 4)</option>
    </select>
  </SettingPart>
  <SettingPart>
    <span slot="title">Ping Timeout</span>
    <span slot="help">How long to wait (in milliseconds) for data<br> from moonlight clients before<br> shutting down the stream</span>
    <input slot="input" bind:value={$config.ping_timeout} type="number" placeholder="10000" class="h-10 pl-4 rounded-lg border-gray-300 border-1 w-full" />
  </SettingPart>
  <SettingPart>
    <span slot="title">Map Right Alt key to Windows key</span>
    <span slot="help">It may be possible that you cannot send<br> the Windows Key from Moonlight directly.<br>Allows using Right Alt key as the Windows key.</span>
    <div slot="input" class="flex space-x-2">
      <input type="checkbox" bind:checked={$config.key_rightalt_to_key_win} class="w-8 h-8 px-4 rounded-lg border-1 border-gray-300" />
      <span class="text-xl">{$config.key_rightalt_to_key_win ? 'Enabled' : 'Disabled'}</span>
    </div>
  </SettingPart>