<script lang="ts">
	import type { SunshineConfiguration } from '$lib/types';
    import { Input, Toggle } from 'flowbite-svelte';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';

    import SettingPart from '../SettingPart.svelte';

    const config = getContext<Writable<SunshineConfiguration>>('SunshineSettings');
</script>
<SettingPart inputType='long'>
    <span slot="title">Audio Sink</span>
    <span slot="help">The name of the audio sink used for Audio Loopback.</span>
    <Input bind:value={$config.audio_sink} slot="input" type="text" placeholder={"{0.0.0.00000000}.{FD47D9CC-4218-4135-9CE2-0C195C87405B}"}  />
</SettingPart>
<SettingPart inputType='long'>
    <span slot="title">Virtual Sink</span>
    <span slot="help">Virtual audio device name (like Steam Streaming Speakers) <br/> Allows Sunshine to stream audio with muted speakers.</span>
    <Input bind:value={$config.virtual_sink} slot="input" type="text" placeholder={"{0.0.0.00000000}.{FD47D9CC-4218-4135-9CE2-0C195C87405B}"} />
</SettingPart>
<SettingPart>
    <span slot="title">Adapter name</span>
    <span slot="help">Select the video card you want to stream with.</span>
    <Input bind:value={$config.adapter_name} slot="input" type="text" placeholder="Radeon RX 580 Series" />
</SettingPart>
<SettingPart>
    <span slot="title">Output name</span>
    <span slot="help">Select the display output you want to stream.</span>
    <Input bind:value={$config.output_name} slot="input" type="text" placeholder="\\.\DISPLAY1" />
</SettingPart>
<SettingPart>
    <span slot="title">DWM Flush</span>
    <span slot="help">Improves capture latency during mouse movement.<br /> Enabling this may prevent the client's FPS from exceeding the host monitor's active refresh rate.</span>
    <div slot="input" class="flex space-x-2">
        <Toggle size={'large'} label={$config.dwmflush ? 'Enabled' : 'Disabled'} bind:checked={$config.dwmflush} />
    </div>
</SettingPart>