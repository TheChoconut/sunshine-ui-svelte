<script lang="ts">
	import type { SunshineConfiguration } from '../../api';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';

    import SettingPart from '../SettingPart.svelte';

    const config = getContext('SunshineSettings') as Writable<SunshineConfiguration>;
</script>
<SettingPart inputType='long'>
    <span slot="title">Private key</span>
    <span slot="help">The private key must be 2048 bits.</span>
    <input bind:value={$config.pkey} slot="input" type="text" placeholder="/path/to/key.pem" class="h-9 border-gray-200 border-b-gray-500 focus:(border-b-accent-500 border-b-2) focus:(outline-none) border-1 pl-3 rounded w-full" />
</SettingPart>
<SettingPart inputType='long'>
    <span slot="title">Certificate file</span>
    <span slot="help">The certificate must be signed with a 2048 bit key!</span>
    <input bind:value={$config.cert} slot="input" type="text" placeholder="/path/to/sunshine-state.json" class="h-9 border-gray-200 border-b-gray-500 focus:(border-b-accent-500 border-b-2) focus:(outline-none) border-1 pl-3 rounded w-full" />
</SettingPart>
<SettingPart inputType='long'>
    <span slot="title">Sunshine State File</span>
    <span slot="help">The file where current state of Sunshine is stored.</span>
    <input bind:value={$config.file_state} slot="input" type="text" placeholder="/path/to/sunshine-state.json" class="h-9 border-gray-200 border-b-gray-500 focus:(border-b-accent-500 border-b-2) focus:(outline-none) border-1 pl-3 rounded w-full" />
</SettingPart>
<SettingPart inputType='long'>
    <span slot="title">Applications file</span>
    <span slot="help"><strong>apps.json</strong> contains all the necessary configuration for running apps in Sunshine.</span>
    <input bind:value={$config.file_apps} slot="input" type="text" placeholder="/path/to/apps.json" class="h-9 border-gray-200 border-b-gray-500 focus:(border-b-accent-500 border-b-2) focus:(outline-none) border-1 pl-3 rounded w-full" />
</SettingPart>