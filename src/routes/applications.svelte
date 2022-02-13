<script lang="ts">
  import FaTimes from 'svelte-icons/fa/FaTimes.svelte'
  import FaPencilAlt from 'svelte-icons/fa/FaPencilAlt.svelte'
  import FaPlus from 'svelte-icons/fa/FaPlus.svelte'
  import { APIRequest, EmptySunshineApp, SunshineApplication, WaitForSocket, WindowProps } from '$lib/api';
  import ApplicationDialog from '../lib/components/ApplicationDialog.svelte';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition'
  import { nanoid } from 'nanoid'

  let apps: SunshineApplication[] = [];

  type OpenedAppWindows = WindowProps[];
  let appWindows: OpenedAppWindows = [];

  let updateApplication = (app: SunshineApplication | {id: string}) => {
    appWindows = appWindows.filter((a) => a.app.id !== app.id);
    if (!('name' in app)) return;
    // update app.
    if (app.id === '-1')
      app.id = nanoid();
    
    WaitForSocket().then(async () => {
      await APIRequest('save_app', app);
      await APIRequest('get_apps').then((a) => apps = JSON.parse(a.content).apps);
    })
  };

  let handleUpdateAppClick = (ev: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }, app: SunshineApplication) => {
    
    appWindows = appWindows.filter((a) => a.app.id !== app.id);
    appWindows[appWindows.length] = { x: ev.clientX, y: ev.clientY, app };
  }
  let handleNewApp = (ev: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) => {
    appWindows = appWindows.filter((a) => a.app.id !== "-1");
    appWindows[appWindows.length] = { x: ev.clientX - 800, y: ev.clientY, app: {...EmptySunshineApp} };
  }
  let handleDeleteApp = (appId: string) => {
    WaitForSocket().then(async () => {
      await APIRequest('delete_app', {id: appId});
      await APIRequest('get_apps').then((a) => apps = JSON.parse(a.content).apps);
    })
  }

  onMount(async () => {
    await WaitForSocket();
    APIRequest('get_apps').then((a) => {
      if (a.result) {
        apps = JSON.parse(a.content).apps;
      }
    });
  });
  let explorePromise = async () => null;
</script>
{#each appWindows as window}
  <ApplicationDialog windowProps={window} updateApp={updateApplication} />
{/each}
<content class="w-full">
  <div class="w-full flex">
    <h2 class="text-xl flex-1 font-medium mb-4">Your library</h2>
    <button on:click={(ev) => handleNewApp(ev)} class="bg-blue-200 text-blue-900 flex gap-2 hover:shadow-lg shadow-blue-900 transition-shadow px-4 leading-4 items-center justify-center rounded"><div class="w-4 h-4 text-blue-900"><FaPlus /></div> New application</button>
  </div>
  <div class="flex space-x-8">
    {#if apps.length !== 0}
      {#each apps as appInfo}
        <div in:fly={{ y: 20, duration: 200}} class="card relative w-60 rounded-md overflow-hidden shadow bg-gray-200">
          <div class="absolute right-4 top-4 flex space-x-2">
            <button on:click={(ev) => handleUpdateAppClick(ev, appInfo)} class="rounded-md w-10 h-10 bg-blue-200 bg-opacity-80 flex items-center justify-center">
              <div class="w-4 h-4 text-blue-900"><FaPencilAlt/></div>
            </button>
            <button on:click={(ev) => handleDeleteApp(appInfo.id)} class="rounded-md w-10 h-10 bg-red-200  flex items-center justify-center">
              <div class="w-4 h-4 text-red-900"><FaTimes/></div>
            </button>
          </div>
          <img class="w-60 h-80" src={appInfo.coverImage || 'https://via.placeholder.com/240/480'} alt="Application cover poster" />
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
