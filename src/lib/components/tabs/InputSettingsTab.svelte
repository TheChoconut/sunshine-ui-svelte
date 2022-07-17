<script lang="ts">
	import type { SunshineConfiguration } from '$lib/types';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';

    import SettingPart from '../SettingPart.svelte';
import { Input } from 'flowbite-svelte';

    const config = getContext('SunshineSettings') as Writable<SunshineConfiguration>;
</script>
<SettingPart>
    <span slot="title">Back button timeout</span>
    <span slot="help">Emulate back/select button press on the controller.<br>
        On Shield, the home and power buttons are not passed to Moonlight. <br>
        If the back button is still pressed down after the timeout, Home/Guide button press is emulated.<br>
        If timeout is less than 0, the Home/Guide button will not be emulated.</span>
    <Input bind:value={$config.back_button_timeout} slot="input" type="number" placeholder="0" class="w-28" />
</SettingPart>
<SettingPart>
    <span slot="title">Key Repeat Delay</span>
    <span slot="help">Controls how fast keys will repeat themselves after holding<br>
        The initial delay in milliseconds before repeating keys.</span>
    <Input bind:value={$config.key_repeat_delay} slot="input" type="number" placeholder="500" class="w-28" />
</SettingPart>
<SettingPart>
    <span slot="title">Key Repeat Frequency</span>
    <span slot="help">How often keys repeat every second after delay.<br/>
        This configurable option supports decimals</span>
    <Input bind:value={$config.key_repeat_frequency} slot="input" type="number" placeholder="24.9" class="w-28" />
</SettingPart>