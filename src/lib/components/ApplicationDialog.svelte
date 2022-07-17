<script context="module" lang="ts">
    import hljs from "highlight.js/lib/core";
    import bash from "highlight.js/lib/languages/bash";
    import 'highlight.js/styles/atom-one-dark.css'

    hljs.registerLanguage("bash", bash);

    const highlight = (code: string, syntax: any) =>
        hljs.highlight(code, {
            language: syntax,
        }).value;
</script>
<script lang="ts">
  import type { SunshineApplication } from '$lib/types'
  import SettingPart from '$lib/components/SettingPart.svelte';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { Check, X } from "svelte-heros";
  import { Input } from "flowbite-svelte";

  let app: (SunshineApplication | null) = null,
    updateApp: (app: SunshineApplication | {id: string;}) => void
  let title = '',
    isEditTitleMode = false;

  let disInput = null;
  let detachedScripts = app?.detached.join('\n') || '';

  $: {
    if (!isEditTitleMode) {
      title = app?.name
    }
    if (disInput != null && isEditTitleMode) {
        disInput.focus();
    } else {
        disInput = null;
    }
  }

  let handleTitleKeyPress = (event: KeyboardEvent) => {
    if (event.key == 'Enter') {
        app.name = title
        isEditTitleMode = false
    }
  }

  let CodeJar;
  onMount(async () => {
      ({CodeJar} = await import("@novacbn/svelte-codejar"));
  });

  export { app, updateApp }
</script>
{#if app}
  <div class="fixed overflow-hidden z-20 w-[100vw] h-[100vh] left-0 top-0 pt-4 rounded-xl shadow-lg bg-white" transition:fly={{ y: 30, duration: 200 }}>
    <div class="flex h-10 items-center px-8">
      {#if isEditTitleMode}
        <input
          bind:this={disInput}
          on:keydown={handleTitleKeyPress}
          on:blur={() => isEditTitleMode = false}
          type="text"
          bind:value={title}
          class="text-2xl border-gray-200 border-b-gray-500 focus:(border-b-accent-500 border-b-2) focus:(outline-none) border-1 pl-3 rounded w-24"
        />
      {:else}
        <h2 on:dblclick={() => (isEditTitleMode = true)} class="py-2 border-b-2 border-white text-2xl font-medium flex-1">
          {title}
        </h2>
      {/if}
      <div class="flex space-x-2 ml-4">
        <button
          on:click={() => updateApp({...app, detached: detachedScripts.split("\n")})}
          class="rounded-md w-10 h-10 bg-blue-200 bg-opacity-80 flex items-center justify-center"
        >
         <Check />
        </button>
        <button
          on:click={() => updateApp({id: app.id})}
          class="rounded-md w-10 h-10 bg-red-200 flex items-center justify-center"
        >
          <X class="w-4 h-4 text-red-900" />
        </button>
      </div>
    </div>
    <div class="pl-8 pr-4 w-full h-[calc(100vh-55px)] overflow-y-auto">
      <SettingPart inputType={'full'}>
        <h4 slot="title" class="text-md font-medium">Main command</h4>
        <p slot="help" class="italic text-gray-500 mb-1">The main application started.<br>If empty, a process that sleeps indefinitely is used.</p>
        <Input slot="input" bind:value={app.cmd} class="w-full" />
      </SettingPart>
      <SettingPart>
        <h4 slot="title" class="text-md font-medium">Output file</h4>
        <p slot="help">Command output will be saved in this file.<br>Ignored if empty.</p>
        <Input slot="input" type="text" bind:value={app.output} class="w-60" />
      </SettingPart>
      <SettingPart>
        <h4 slot="title" class="text-md font-medium">Working directory</h4>
        <p slot="help">In what directory should processes be started in? <br> Some applications use the working directory <br> to search for configuration files.<br> Default: parent directory of the command</p>
        <Input slot="input" placeholder="C:\path\to\game\dir" bind:value={app.cwd} type="text" class="w-60" />
      </SettingPart>
      <h4 class="text-md font-medium mt-4">Detached scripts</h4>
      <p class="italic text-gray-500">Selected scripts you would like to be run alongside the main command.</p>
      {#if CodeJar}
        <svelte:component this={CodeJar} bind:value={detachedScripts} syntax="bash" class="hljs mb-4" withLineNumbers={true} {highlight} />
      {/if}
    </div>
  </div>
{/if}
