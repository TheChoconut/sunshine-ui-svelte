<script lang="ts">
	import type { SunshineConfiguration } from '../../api';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';

    import SettingPart from '../SettingPart.svelte';

    const config = getContext('SunshineSettings') as Writable<SunshineConfiguration>;
</script>
<SettingPart>
    <span slot="title">Port</span>
    <span slot="help">The family of ports used by Sunshine</span>
    <input bind:value={$config.port} slot="input" type="number" min={0} max={65529} placeholder={"47789"} class="h-9 border-gray-200 border-b-gray-500 focus:(border-b-accent-500 border-b-2) focus:(outline-none) border-1 pl-3 rounded w-24" />
</SettingPart>
<SettingPart>
    <span slot="title">FEC percentage</span>
    <span slot="help">Percentage of error correcting packets per data packet in each video frame.<br/>
        Higher values can correct for more network packet loss, but at the cost of increasing bandwidth usage.<br/>
        <pre>GeForce Experience uses 20</pre></span>
    <input bind:value={$config.fec_percentage} slot="input" type="number" min={0} placeholder={"20"} class="h-9 border-gray-200 border-b-gray-500 focus:(border-b-accent-500 border-b-2) focus:(outline-none) border-1 pl-3 rounded w-24" />
</SettingPart>
<SettingPart>
    <span slot="title">Channels</span>
    <span slot="help">When multicasting, it could be useful to have different configurations for each connected Client.<br />
        Unlike simply broadcasting to multiple Client, this will generate distinct video streams.<br/>
        <strong>Note:</strong> CPU usage increases for each distinct video stream generated
    </span>
    <input bind:value={$config.channels} slot="input" type="number" min={1} placeholder={"1"} class="h-9 border-gray-200 border-b-gray-500 focus:(border-b-accent-500 border-b-2) focus:(outline-none) border-1 pl-3 rounded w-24" />
</SettingPart>