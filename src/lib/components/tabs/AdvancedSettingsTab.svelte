<script lang="ts">
	import type { SunshineConfiguration } from '$lib/types';
    import { Input } from 'flowbite-svelte';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import SettingPart from '../SettingPart.svelte';

    const config = getContext<Writable<SunshineConfiguration>>('SunshineSettings');
</script>
<SettingPart>
    <span slot="title">Port</span>
    <span slot="help">The family of ports used by Sunshine</span>
    <Input bind:value={$config.port} slot="input" type="number" min={0} max={65529} placeholder={"47789"} class="w-28" />
</SettingPart>
<SettingPart>
    <span slot="title">FEC percentage</span>
    <span slot="help">Percentage of error correcting packets per data packet in each video frame.<br/>
        Higher values can correct for more network packet loss, but at the cost of increasing bandwidth usage.<br/>
        <pre>GeForce Experience uses 20</pre></span>
    <Input bind:value={$config.fec_percentage} slot="input" type="number" min={0} placeholder={"20"} class="w-28" />
</SettingPart>
<SettingPart>
    <span slot="title">Channels</span>
    <span slot="help">When multicasting, it could be useful to have different configurations for each connected Client.<br />
        Unlike simply broadcasting to multiple Client, this will generate distinct video streams.<br/>
        <strong>Note:</strong> CPU usage increases for each distinct video stream generated
    </span>
    <Input bind:value={$config.channels} slot="input" type="number" min={1} placeholder={"1"} class="w-28" />
</SettingPart>