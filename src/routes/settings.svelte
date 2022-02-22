<script lang="ts">
	import AdvancedSettingsTab from '$lib/settings_tabs/AdvancedSettingsTab.svelte';
	import FilesSettingsTab from '$lib/settings_tabs/FilesSettingsTab.svelte';
	import InputSettingsTab from '$lib/settings_tabs/InputSettingsTab.svelte';
	import AVSettingsTab from '$lib/settings_tabs/AVSettingsTab.svelte';
	import GeneralSettingsTab from '$lib/settings_tabs/GeneralSettingsTab.svelte';
  import EncoderSettingsTab from '$lib/settings_tabs/EncoderSettingsTab.svelte';
  import { APIRequest, SunshineConfiguration } from '$lib/api';
  import { Writable, writable } from 'svelte/store';
  import { onMount, setContext } from 'svelte';

  let config: Writable<SunshineConfiguration | null> = writable(null);
  setContext('SunshineSettings', config);

  let requestConfig = async () => {
    const newConfig = await APIRequest("get_config");
    delete newConfig.status;
    delete newConfig.result;
    delete newConfig.platform;
    delete newConfig.type;
    config.set(newConfig);
  }

  let saveChanges = async () => {
    await APIRequest("save_config", {config: JSON.stringify($config)});
    requestConfig();
  }
  let undoChanges = () => requestConfig();

  onMount(() => {
    requestConfig();
  });

  let tabs = {
    'general': { id: 'general', name: 'General', component: GeneralSettingsTab }, 
    'av': { id: 'av', name: 'Audio & Video', component: AVSettingsTab },
    'input': { id: 'input', name: 'Input', component: InputSettingsTab },
    'files': { id: 'files', name: 'Files', component: FilesSettingsTab },
    'advanced': { id: 'advanced', name: 'Advanced', component: AdvancedSettingsTab },
    'encoder': { id: 'encoder', name: 'Encoder Settings', component: EncoderSettingsTab },
  };
  let currentTab = 'general';
</script>
<content class="block w-full flex flex-col">
  <tabbar class="flex w-full space-x-4 mb-2">
    {#each Object.values(tabs) as tab (tab.id)}
      <button on:click={() => currentTab = tab.id} class="{tab.id === currentTab ? 'font-medium border-blue-400 border-b-2' : ''} text-xl focus:outline-none">{tab.name}</button>
    {/each}
  </tabbar>
  <div class="flex-1 overflow-y-auto pr-2">
    {#if $config}
      <svelte:component this={tabs[currentTab].component} />
    {/if}
  </div>
  <unsavedChanges class="block w-full container flex h-24 items-center gap-4">
    <button on:click={saveChanges} class="bg-blue-300 text-blue-900 font-bold rounded w-24 h-10 hover:(ring-2 ring-blue-500 ring-offset-gray-100 ring-offset-2) transition-shadow">Save</button>
    <button on:click={undoChanges} class="bg-gray-300 text-black font-bold rounded w-24 h-10 hover:(ring-2 ring-gray-500 ring-offset-gray-100 ring-offset-2) transition-shadow">Cancel</button>
  </unsavedChanges>
</content>

<style>
  content {
    height: calc(100vh - 120px);
  }
</style>