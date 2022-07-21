<script context="module" lang="ts">
    import hljs from 'highlight.js/lib/core'
    import bash from 'highlight.js/lib/languages/bash'
    import 'highlight.js/styles/atom-one-dark.css'

    hljs.registerLanguage('bash', bash)

    const highlight = (code: string, syntax: any) =>
        hljs.highlight(code, {
            language: syntax
        }).value
</script>

<script lang="ts">
    import type { SunshineApplication } from '$lib/types'
    import SettingPart from '$lib/components/SettingPart.svelte'
    import { onMount } from 'svelte'
    import { fly } from 'svelte/transition'
    import { Check, X } from 'svelte-heros'
    import { AccordionFlush, Button, Input } from 'flowbite-svelte'
    import { open } from '@tauri-apps/api/dialog'
    import { type } from '@tauri-apps/api/os'

    let app: SunshineApplication | null = null,
        updateApp: (app: SunshineApplication | { id: string }) => void
    let title = '',
        isEditTitleMode = false,
        dialogOpen = false

    let disInput = null
    let detachedScripts = ''

    $: {
        if (app === null && dialogOpen) dialogOpen = false
        else if (app !== null && !dialogOpen) {
            dialogOpen = true
            detachedScripts = app.detached.join('\n')
        }
    }

    $: {
        if (!isEditTitleMode) {
            title = app?.name
        }
        if (disInput != null && isEditTitleMode) {
            disInput.focus()
        } else {
            disInput = null
        }
    }

    let handleTitleKeyPress = (event: KeyboardEvent) => {
        if (event.key == 'Enter') {
            app.name = title
            isEditTitleMode = false
        }
    }

    const findFile = async (fileName: string, fileExt: string[], target: string) => {
        let filters = [{ name: fileName, extensions: fileExt }]
        if (fileExt.includes('exe') && (await type()) !== 'Windows_NT') {
            filters = []
        }

        const selected = await open({ filters })
        if (selected) {
            app[target] = selected
        }
    }

    let CodeJar
    onMount(async () => {
        CodeJar = (await import('@novacbn/svelte-codejar')).CodeJar
    })

    export { app, updateApp }
</script>

{#if app}
    <div
        class="fixed overflow-hidden z-20 w-[100vw] h-[100vh] left-0 top-0 pt-4 shadow-lg bg-white dark:bg-neutral-900 dark:text-white"
        transition:fly={{ y: 30, duration: 200 }}>
        <div class="flex h-10 items-center px-8">
            {#if isEditTitleMode}
                <input
                    bind:this={disInput}
                    on:keydown={handleTitleKeyPress}
                    on:blur={() => (isEditTitleMode = false)}
                    type="text"
                    bind:value={title}
                    class="text-2xl pl-0 font-medium rounded w-full bg-transparent" />
            {:else}
                <h2
                    on:dblclick={() => (isEditTitleMode = true)}
                    class="py-2 text-2xl font-medium flex-1">
                    {title}
                </h2>
            {/if}
            {#if isEditTitleMode === false}
                <div class="flex space-x-2 ml-4">
                    <button
                        on:click={() =>
                            updateApp({ ...app, detached: detachedScripts.split('\n') })}
                        class="rounded-md w-10 h-10 bg-blue-200 bg-opacity-80 flex items-center justify-center">
                        <Check class="w-6 h-6 text-blue-900" />
                    </button>
                    <button
                        on:click={() => updateApp({ id: app.id })}
                        class="rounded-md w-10 h-10 bg-red-200 flex items-center justify-center">
                        <X class="w-6 h-6 text-red-900" />
                    </button>
                </div>
            {/if}
        </div>
        <div class="pl-8 pr-4 w-full h-[calc(100vh-55px)] overflow-y-auto">
            <SettingPart inputType={'full'}>
                <h4 slot="title" class="text-md font-medium">Main command</h4>
                <p slot="help" class="italic text-gray-500 dark:text-gray-300 mb-1">
                    The main application started.<br />If empty, a process that sleeps indefinitely
                    is used.
                </p>
                <div slot="input" class="flex w-full space-x-2 items-center">
                    <Button on:click={() => findFile('Executable', ['exe', 'bat', 'ps1', 'cmd', 'com', 'vbs'], 'cmd')} color="light"
                        >Find executable</Button>
                    <Input bind:value={app.cmd} class="flex-1" />
                </div>
            </SettingPart>
            <AccordionFlush id="1">
                <h2 slot="header" class="dark:text-white text-black">
                    Cover image <sm class="text-sm text-gray-400">OPTIONAL</sm>
                </h2>
                <div slot="body">
                    <p class="ml-2 italic text-gray-500 dark:text-gray-300 mb-2">
                        Application icon that will be sent to client.
                    </p>
                    <div class="flex w-full space-x-2 items-center">
                        <Button
                            on:click={() => findFile('Text file', ['txt', 'log'], 'output')}
                            color="light">Find file</Button>
                        <Input bind:value={app.output} class="flex-1" />
                    </div>
                </div>
            </AccordionFlush>
            <AccordionFlush id="2">
                <h2 slot="header" class="dark:text-white text-black">
                    Output file <sm class="text-sm text-gray-400">OPTIONAL</sm>
                </h2>
                <div slot="body">
                    <p class="ml-2 italic text-gray-500 dark:text-gray-300 mb-2">
                        Command output will be saved in this file.
                    </p>
                    <div class="flex w-full space-x-2 items-center">
                        <Button
                            on:click={() => findFile('Text file', ['txt', 'log'], 'output')}
                            color="light">Find file</Button>
                        <Input bind:value={app.output} class="flex-1" />
                    </div>
                </div>
            </AccordionFlush>
            <AccordionFlush id="3">
                <h2 slot="header" class="dark:text-white text-black">
                    Working directory <sm class="text-sm text-gray-400">OPTIONAL</sm>
                </h2>
                <div slot="body">
                    <p class="ml-2 italic text-gray-500 dark:text-gray-300 mb-2">
                        The working directory that should be passed to the process. <br />
                        Some applications use the working directory to search for configuration files.
                        <br />
                        Default: parent directory of the command
                    </p>
                    <div class="flex w-full space-x-2 items-center">
                        <Button
                            on:click={() => findFile('Text file', ['txt', 'log'], 'output')}
                            color="light">Find file</Button>
                        <Input bind:value={app.output} class="flex-1" />
                    </div>
                </div>
            </AccordionFlush>
            <h4 class="text-md font-medium mt-4">Detached scripts</h4>
            <p class="italic text-gray-500 dark:text-gray-300 mb-2">
                Scripts you would like to be run alongside the main command.
            </p>
            {#if CodeJar}
                <svelte:component
                    this={CodeJar}
                    bind:value={detachedScripts}
                    syntax="bash"
                    class="hljs mb-4"
                    withLineNumbers={true}
                    {highlight} />
            {/if}
        </div>
    </div>
{/if}
