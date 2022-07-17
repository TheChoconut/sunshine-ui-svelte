<script lang="ts">
	import type { SunshineConfiguration } from '$lib/types';
    import { Input, Select } from 'flowbite-svelte';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import SettingPart from '../SettingPart.svelte';

    const config = getContext('SunshineSettings') as Writable<SunshineConfiguration>;

    let encoder = 'software';
</script>
<SettingPart>
    <span slot="title">Minimum threads for encoding</span>
    <span slot="help">Minimum number of threads used by ffmpeg to encode the video.<br />
        Increasing the value reduces encoding efficiency, but is more efficient on multiple CPU cores.<br/> 
        Ideal value is the lowest number that can reliably encode at your desired streaming settings on your hardware.</span>
    <Input bind:value={$config.min_threads} slot="input" type="number" min={1} placeholder={"1"} class="w-28" />
</SettingPart>
<SettingPart>
    <span slot="title">HEVC encoding</span>
    <span slot="help">Allows the client to request HEVC Main or HEVC Main10 video streams.<br />
        HEVC is more CPU-intensive to encode, so enabling this may reduce performance when using software encoding.</span>
    <Select slot="input" bind:value={$config.hevc_mode}>
        <option value="0">Auto (based on encoder)</option>
        <option value="1">Disabled</option>
        <option value="2">HEVC Main Only (No HDR)</option>
        <option value="3">HEVC Main + Main10</option>
    </Select>
</SettingPart>
<SettingPart>
    <span slot="title">Force a specific encoder</span>
    <span slot="help">Force a specific encoder.</span>
    <Select slot="input" bind:value={$config.encoder}>
        <option value="">Auto</option>
        <option value="nvenc">Nvidia NVENC</option>
        <option value="amdvce">AMD AMF/VCE</option>
        <option value="vaapi">VA-API</option>
        <option value="software">Software</option>
    </Select>
</SettingPart>
<div class="flex items-center">
    <h2 class="text-xl font-bold dark:text-white flex-1">Change specific encoder settings</h2>
    <div class="inline-flex rounded-lg overflow-hidden border mt-4 border-gray-300 dark:border-gray-400">
        <button on:click={() => encoder = 'software'} class="flex flex-col items-center justify-center transition-colors gap-2 h-24 w-24 border-r border-gray-300 dark:border-gray-400 {encoder === 'software' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-600 dark:text-white hover:bg-gray-100'}">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M2.344 15.271l2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4s-4-1.794-4-4s1.794-4 4-4z" fill="currentColor"/></svg>
            Software
        </button>
        <button on:click={() => encoder = 'amd'} class="flex flex-col items-center justify-center transition-colors gap-2 h-24 w-24 border-r border-gray-300 dark:border-gray-400 {encoder === 'amd' ? 'bg-red-500 text-white' : 'bg-white dark:bg-gray-600 dark:text-white hover:bg-gray-100'}">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path d="M512 512L369.628 369.736V142.264H142.085L0 0h512v512zM142.085 369.736V165.004L0 307.226V512h204.651l142.22-142.264H142.084z" fill="currentColor"/></svg>
            AMD
        </button>
        <button on:click={() => encoder = 'nvidia'} class="flex flex-col items-center justify-center transition-colors gap-2 h-24 w-24 {encoder === 'nvidia' ? 'bg-green-500 text-white' : 'bg-white dark:bg-gray-600 dark:text-white hover:bg-gray-100'}">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path d="M191.034 187.695v-30.604c2.97-.212 5.971-.37 9.03-.466c83.702-2.63 138.617 71.92 138.617 71.92s-59.31 82.378-122.903 82.378c-9.159 0-17.356-1.477-24.744-3.957v-92.802c32.585 3.937 39.136 18.33 58.732 50.985l43.57-36.736s-31.805-41.714-85.42-41.714c-5.833 0-11.409.41-16.882.996m0-101.096v45.713c3.004-.238 6.012-.427 9.03-.538c116.399-3.921 192.235 95.461 192.235 95.461s-87.108 105.92-177.85 105.92c-8.315 0-16.1-.768-23.415-2.064v28.258c6.256.795 12.735 1.263 19.499 1.263c84.448 0 145.52-43.123 204.655-94.166c9.797 7.85 49.94 26.948 58.195 35.319c-56.233 47.07-187.266 85.006-261.551 85.006c-7.159 0-14.045-.431-20.798-1.08v39.71H512V86.599H191.034zm0 220.367v24.125c-78.106-13.924-99.783-95.115-99.783-95.115s37.499-41.549 99.783-48.28v26.468c-.05 0-.08-.013-.122-.013c-32.682-3.925-58.22 26.615-58.22 26.615s14.307 51.405 58.342 66.2M52.311 232.458s46.29-68.306 138.723-75.367v-24.779C88.657 140.528 0 227.235 0 227.235S50.209 372.401 191.034 385.69v-26.34C87.695 346.346 52.311 232.457 52.311 232.457z" fill="currentColor"/></svg>
            Nvidia
        </button>
    </div>
</div>

{#if encoder === 'software'}
    <SettingPart inputType='long'>
        <span slot="title">SW presets</span>
        <Input bind:value={$config.sw_preset} slot="input" type="text" placeholder={"superfast"} />
    </SettingPart>
    <SettingPart inputType='long'>
        <span slot="title">SW tune</span>
        <Input bind:value={$config.sw_tune} slot="input" type="text" placeholder={"zerolatency"} />
    </SettingPart>
{:else if encoder === 'amd'}
    <SettingPart inputType='long'>
        <span slot="title">AMD AMF quality</span>
        <Select bind:value={$config.amd_quality} slot="input">
            <option value="default">Default</option>
            <option value="speed">Speed</option>
            <option value="balanced">Balanced</option>
        </Select>
    </SettingPart>
    <SettingPart inputType='long'>
        <span slot="title">AMD AMF rate control</span>
        <Select bind:value={$config.amd_rc} slot="input">
            <option value="auto">Let FFMpeg decide</option>
            <option value="speed">Constant (QP)</option>
            <option value="vbr_latency">Latency Constrained Variable Bitrate</option>
            <option value="vbr_peak">Peak Constrained Variable Bitrate</option>
            <option value="cbr">Constant Bitrate</option>
        </Select>
    </SettingPart>
    <SettingPart inputType='long'>
        <span slot="title">AMD Coder</span>
        <Select bind:value={$config.amd_coder} slot="input">
            <option value="auto">Auto</option>
            <option value="cabac">cabac</option>
            <option value="cavlc">cavlc</option>
        </Select>
    </SettingPart>
{:else if encoder === 'nvidia'}
    <SettingPart inputType='long'>
        <span slot="title">NVENC preset</span>
        <Select bind:value={$config.nv_preset} slot="input">
            <option value="default">Default</option>
            <option value="hp">High Performance</option>
            <option value="hq">High Quality</option>
            <option value="ll">Low latency</option>
            <option value="lossless">Lossless</option>
            <option value="slow">slow - hq 2 passes</option>
            <option value="medium">medium -- hq 1 pass</option>
            <option value="fast">fast -- hp 1 pass</option>
            <option value="bd">bd</option>
            <option value="llhq">llhq</option> 
            <option value="llhp">llhp</option>
            <option value="losslesshp">losslesshp</option>
        </Select>
    </SettingPart>
    <SettingPart inputType='long'>
        <span slot="title">NVENC rate control</span>
        <Select bind:value={$config.nv_rc} slot="input">
            <option value="auto">Let FFMpeg decide</option>
            <option value="constqp">Constant (QP)</option>
            <option value="cbr">Constant Bitrate</option>
            <option value="cbr_hq">High quality constant bitrate</option>
            <option value="cbr_ld_hq">Low delay HQ constant bitrate</option>
            <option value="vbr">Variable Bitrate</option>
            <option value="vbr_hq">High quality variable Bitrate</option>
        </Select>
    </SettingPart>
    <SettingPart inputType='long'>
        <span slot="title">NVENC Coder</span>
        <Select bind:value={$config.nv_coder} slot="input">
            <option value="auto">Auto</option>
            <option value="cabac">cabac</option>
            <option value="cavlc">cavlc</option>
        </Select>
    </SettingPart>
{/if}