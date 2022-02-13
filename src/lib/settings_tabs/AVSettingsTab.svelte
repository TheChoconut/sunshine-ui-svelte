<script lang="ts">
	import type { SunshineConfiguration } from '../api';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';

    import SettingPart from '../components/SettingPart.svelte';

    const config = getContext('SunshineSettings') as Writable<SunshineConfiguration>;
</script>
<SettingPart longInput={true}>
    <span slot="title">Audio Sink</span>
    <span slot="help">The name of the audio sink used for Audio Loopback.</span>
    <input bind:value={$config.audio_sink} slot="input" type="text" placeholder={"{0.0.0.00000000}.{FD47D9CC-4218-4135-9CE2-0C195C87405B}"} class="h-10 border-gray-300 border-1 pl-4 rounded-lg w-full" />
</SettingPart>
<SettingPart longInput={true}>
    <span slot="title">Virtual Sink</span>
    <span slot="help">Virtual audio device name (like Steam Streaming Speakers) <br/> Allows Sunshine to stream audio with muted speakers.</span>
    <input bind:value={$config.virtual_sink} slot="input" type="text" placeholder={"{0.0.0.00000000}.{FD47D9CC-4218-4135-9CE2-0C195C87405B}"} class="h-10 border-gray-300 border-1 pl-4 rounded-lg w-full" />
</SettingPart>
<SettingPart>
    <span slot="title">Adapter name</span>
    <span slot="help">Select the video card you want to stream with.</span>
    <input bind:value={$config.adapter_name} slot="input" type="text" placeholder="Radeon RX 580 Series" class="h-10 border-gray-300 border-1 pl-4 rounded-lg w-full" />
</SettingPart>
<SettingPart>
    <span slot="title">Output name</span>
    <span slot="help">Select the display output you want to stream.</span>
    <input bind:value={$config.output_name} slot="input" type="text" placeholder="\\.\DISPLAY1" class="h-10 border-gray-300 border-1 pl-4 rounded-lg w-full" />
</SettingPart>