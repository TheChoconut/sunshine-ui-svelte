<script lang="ts">
  import edit16Filled from '@iconify/icons-fluent/edit-16-filled';
  import dismiss16Filled from '@iconify/icons-fluent/dismiss-16-filled';
  import add12Filled from '@iconify/icons-fluent/add-12-regular';
  import Icon from '@iconify/svelte'
  import type { SunshineApplication } from '$lib/api';
  import { APIRequest, EmptySunshineApp } from '$lib/api'
  import ApplicationDialog from '../lib/components/ApplicationDialog.svelte';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition'
  import { nanoid } from 'nanoid'

  let apps: SunshineApplication[] = [];
  let selectedApp = null;


  let updateApplication = async (app: SunshineApplication | {id: string}) => {
    selectedApp = null;
    if (!('name' in app)) return;
    
    // update app.
    if (app.id === '-1') app.id = nanoid();
    await APIRequest('save_app', app);
    await APIRequest('get_apps').then((a) => apps = JSON.parse(a.content).apps);
  };

  let handleUpdateAppClick = (ev: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }, app: SunshineApplication) => {
    selectedApp = app;
  }
  let handleNewApp = (ev: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) => {
    selectedApp = {...EmptySunshineApp};
  }
  let handleDeleteApp = async (appId: string) => {
    await APIRequest('delete_app', {id: appId});
    await APIRequest('get_apps').then((a) => apps = JSON.parse(a.content).apps);
  }

  onMount(async () => {
    APIRequest('get_apps').then((a) => {
      if (a.result) {
        apps = JSON.parse(a.content).apps;
      }
    });
  });
  let explorePromise = async () => null;
</script>
<ApplicationDialog app={selectedApp} updateApp={updateApplication} />
<content class="w-full">
  <div class="w-full flex">
    <h2 class="text-xl flex-1 font-medium mb-4">Your library</h2>
    <button on:click={(ev) => handleNewApp(ev)} 
      class="bg-accent-500 text-white flex gap-2 hover:(bg-accent-700) active:(opacity-80) px-6 text-sm h-8 transition-shadow leading-4 items-center justify-center rounded">
      <Icon icon={add12Filled} class="w-4 h-4" />
      New application
    </button>
  </div>
  <div class="flex space-x-8">
    {#if apps.length !== 0}
      {#each apps as appInfo, index}
        <div in:fly={{ y: 20, duration: 200}} class="card relative w-60 rounded-md overflow-hidden shadow bg-gray-200">
          <div class="absolute right-4 top-4 flex space-x-2">
            <button on:click={(ev) => handleUpdateAppClick(ev, appInfo)} class="rounded-md w-10 h-10 bg-blue-200 bg-opacity-80 flex items-center justify-center">
              <Icon icon={edit16Filled} class="w-4 h-4 text-blue-900" />
            </button>
            <button on:click={() => handleDeleteApp(appInfo.id)} class="rounded-md w-10 h-10 bg-red-200  flex items-center justify-center">
              <Icon icon={dismiss16Filled} class="w-4 h-4 text-red-900" />
            </button>
          </div>
          <img class="w-60 h-80" src={'https://picsum.photos/200/300'} alt="Application cover poster" />
          <h4 class="absolute bottom-0 card-text-gradient text-center text-white font-medium w-full text-xl pb-5 pt-8">{appInfo.name}</h4>
        </div>
      {/each}
    {/if}
  </div>
  <h2 class="text-xl font-medium mb-4">Explore</h2>
  <div class="flex space-x-8">
    {#await explorePromise}
      <div>Loading...</div>
    {:then result}
      {#if result}
        <pre>No results.</pre>
      {/if}
    {/await}
  </div>
</content>
<style>
  .card-text-gradient {
    background: linear-gradient(180deg, transparent 0%, rgb(34 34 34 / 91%) 55%, rgb(22 22 22) 100%);
  }
</style>
