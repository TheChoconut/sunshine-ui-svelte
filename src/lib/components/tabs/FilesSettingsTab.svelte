<script lang="ts">
	import type { SunshineConfiguration } from '$lib/types';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import { open } from '@tauri-apps/api/dialog'

    import SettingPart from '../SettingPart.svelte';
    import { Button, Input } from 'flowbite-svelte';

    const findFile = async (fileName: string, fileExt: string, target: string) => {
        const selected = await open({
            filters: [{
                name: `${fileName}`,
                extensions: [fileExt]
            }]
        });

        if (selected) {
            $config[target] = selected;
        }
    }

    const config = getContext('SunshineSettings') as Writable<SunshineConfiguration>;
</script>
<SettingPart inputType='long'>
    <span slot="title">Private key</span>
    <span slot="help">The private key must be 2048 bits.</span>
    <div slot="input" class="w-full space-x-2 flex items-center justify-end">
        {#if $config.pkey}
        <Input readonly disabled value={$config.pkey} class="flex-1" />
        {/if}
        <Button on:click={() => findFile('cakey.pem', 'pem', 'pkey')} color="light">Find file</Button>
    </div>
</SettingPart>
<SettingPart inputType='long'>
    <span slot="title">Certificate file</span>
    <span slot="help">The certificate must be signed with a 2048 bit key!</span>
    <div slot="input" class="w-full space-x-2 flex items-center justify-end">
        {#if $config.cert}
        <Input readonly disabled value={$config.cert} class="flex-1" />
        {/if}
        <Button on:click={() => findFile('apps.json', 'json', 'cert')} color="light">Find file</Button>
    </div>
</SettingPart>
<SettingPart inputType='long'>
    <span slot="title">Sunshine State File</span>
    <span slot="help">The file where current state of Sunshine is stored.</span>
    <div slot="input" class="w-full space-x-2 flex items-center justify-end">
        {#if $config.file_state}
        <Input readonly disabled value={$config.file_state} class="flex-1" />
        {/if}
        <Button on:click={() => findFile('sunshine_state.json', 'json', 'file_state')} color="light">Find file</Button>
    </div>
</SettingPart>
<SettingPart inputType='long'>
    <span slot="title">Applications file</span>
    <span slot="help"><strong>apps.json</strong> contains all the necessary configuration for running apps in Sunshine.</span>
    <div slot="input" class="w-full space-x-2 flex items-center justify-end">
        {#if $config.file_apps}
        <Input readonly disabled value={$config.file_apps} class="flex-1" />
        {/if}
        <Button on:click={() => findFile('apps.json', 'json', 'file_apps')} color="light">Find file</Button>
    </div>
</SettingPart>