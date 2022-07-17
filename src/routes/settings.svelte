<script lang="ts">
    import AdvancedSettingsTab from '$lib/components/tabs/AdvancedSettingsTab.svelte'
    import FilesSettingsTab from '$lib/components/tabs/FilesSettingsTab.svelte'
    import InputSettingsTab from '$lib/components/tabs/InputSettingsTab.svelte'
    import AVSettingsTab from '$lib/components/tabs/AVSettingsTab.svelte'
    import GeneralSettingsTab from '$lib/components/tabs/GeneralSettingsTab.svelte'
    import EncoderSettingsTab from '$lib/components/tabs/EncoderSettingsTab.svelte'
    import { APIRequest } from '$lib/api'
    import type { SunshineConfiguration } from '$lib/types'
    import type { Writable } from 'svelte/store'
    import { writable } from 'svelte/store'
    import { onMount, setContext } from 'svelte'
    import { Button } from 'flowbite-svelte'

    let config: Writable<SunshineConfiguration | null> = writable(null)
    setContext('SunshineSettings', config)

    let requestConfig = async () => {
        const config_schema = await APIRequest('get_config_schema')
        console.log(config_schema)
        const newConfig = await APIRequest('get_config')
        delete newConfig.status
        delete newConfig.result
        delete newConfig.authenticated
        delete newConfig.platform
        delete newConfig.type
        config.set(newConfig)
    }

    let saveChanges = async () => {
        await APIRequest('save_config', { config: JSON.stringify($config) })
        requestConfig()
    }
    let undoChanges = () => requestConfig()

    onMount(() => {
        requestConfig()
    })

    let tabs = {
        general: { id: 'general', name: 'General', component: GeneralSettingsTab },
        av: { id: 'av', name: 'Audio/Video', component: AVSettingsTab },
        input: { id: 'input', name: 'Input', component: InputSettingsTab },
        files: { id: 'files', name: 'Files', component: FilesSettingsTab },
        advanced: { id: 'advanced', name: 'Advanced', component: AdvancedSettingsTab },
        encoder: { id: 'encoder', name: 'Encoder', component: EncoderSettingsTab }
    }
    let currentTab = 'general'
</script>

<content class="w-full flex flex-col">
    <tabbar class="inline-flex w-full space-x-2 mb-2 border-b-2">
        {#each Object.values(tabs) as tab (tab.id)}
            <button
                on:click={() => (currentTab = tab.id)}
                class="{tab.id === currentTab
                    ? 'font-medium bg-gray-200 border-2 border-b-0'
                    : ''} w-40 px-3 h-8 rounded-tl-lg rounded-tr-lg text-md focus:outline-none">
                {tab.name}
            </button>
        {/each}
    </tabbar>
    <div class="flex-1 overflow-y-auto pr-2">
        {#if $config}
            <svelte:component this={tabs[currentTab].component} />
        {/if}
    </div>
    <unsavedChanges class="w-full container flex h-20 items-center gap-4">
        <Button color="blue" on:click={saveChanges}>Save</Button>
        <Button color="alternative" on:click={undoChanges}>Cancel</Button>
    </unsavedChanges>
</content>

<style>
    content {
        height: calc(100vh - 80px);
    }
</style>
