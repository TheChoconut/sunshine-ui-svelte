<script lang="ts">
	import type { SunshineConfiguration } from '$lib/types';
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import SettingPart from '../SettingPart.svelte';
  import { Input, Select, Toggle } from 'flowbite-svelte';

    const config = getContext('SunshineSettings') as Writable<SunshineConfiguration>;
</script>
<SettingPart>
    <span slot="title">Your PC name</span>
    <span slot="help">The name displayed by Moonlight.<br> If not specified, the PC's hostname is used</span>
    <Input bind:value={$config.sunshine_name} slot="input" type="text" placeholder="Sunshine" />
  </SettingPart>
  <SettingPart>
    <span slot="title">Log Level</span>
    <span slot="help">The minimum log level printed to standard out</span>
    <Select slot="input" bind:value={$config.min_log_level} >
      <option value="0">Verbose</option>
      <option value="1">Debug</option>
      <option value="2">Info</option>
      <option value="3">Warning</option>
      <option value="4">Error</option>
      <option value="5">Fatal</option>
      <option value="6">None</option>
    </Select>
  </SettingPart>
  <SettingPart>
    <span slot="title">Web API origin whitelist</span>
    <span slot="help">The origin of the remote endpoint address<br> that is not denied access to Web API</span>
    <Select slot="input" bind:value={$config.origin_web_api_allowed}>
      <option value="pc">Localhost only</option>
      <option value="lan">LAN only</option>
      <option value="wan">Anyone</option>
    </Select>
  </SettingPart>
  <SettingPart>
    <span slot="title">UPnP</span>
    <span slot="help">Automatically configure port forwarding</span>
    <div slot="input" class="flex space-x-2">
      <Toggle size={'large'} label={$config.upnp ? 'Enabled' : 'Disabled'} bind:checked={$config.upnp} />
    </div>
  </SettingPart>
  <SettingPart>
    <span slot="title">Gamepad</span>
    <span slot="help">Default gamepad used</span>
    <Select slot="input" bind:value={$config.gamepad}>
      <option value="x360">X360 (Xbox 360)</option>
      <option value="ds4">DS4 (Dualshock 4)</option>
    </Select>
  </SettingPart>
  <SettingPart>
    <span slot="title">Ping Timeout</span>
    <span slot="help">How long to wait (in milliseconds) for data<br> from moonlight clients before<br> shutting down the stream</span>
    <Input slot="input" bind:value={$config.ping_timeout} type="number" placeholder="10000" />
  </SettingPart>
  <SettingPart>
    <span slot="title">Map Right Alt key to Windows key</span>
    <span slot="help">It may be possible that you cannot send<br> the Windows Key from Moonlight directly.<br>Allows using Right Alt key as the Windows key.</span>
    <div slot="input" class="flex space-x-2">
      <Toggle size={'large'} label={$config.key_rightalt_to_key_win ? 'Enabled' : 'Disabled'}  bind:checked={$config.key_rightalt_to_key_win} />
    </div>
  </SettingPart>