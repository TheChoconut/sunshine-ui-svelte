<script lang="ts">
    import type { SunshineApplication } from '$lib/types'
    import { APIRequest, EmptySunshineApp, getEndpointUrl } from '$lib/api'
    import ApplicationDialog from '$lib/components/ApplicationDialog.svelte'
    import { onMount } from 'svelte'
    import { fly } from 'svelte/transition'
    import { Plus, Pencil, X, Trash } from 'svelte-heros'
    import { Button } from 'flowbite-svelte'
    import { convertFileSrc } from '@tauri-apps/api/tauri'
    import { nanoid } from 'nanoid'

    let apps: SunshineApplication[] = []
    let selectedApp = null

    let updateApplication = async (app: SunshineApplication | { id: string }) => {
        selectedApp = null
        if (!('name' in app)) return

        await APIRequest('save_app', app)
        await APIRequest('get_apps').then(res => (apps = JSON.parse(res.content).apps))
    }

    let handleUpdateAppClick = (app: SunshineApplication) => {
        selectedApp = app
    }
    let handleNewApp = () => {
        selectedApp = { ...EmptySunshineApp() }
    }
    let handleDeleteApp = async (appId: string) => {
        await APIRequest('delete_app', { id: appId })
        await APIRequest('get_apps').then(res => (apps = JSON.parse(res.content).apps))
    }

    onMount(async () => {
        APIRequest('get_apps').then(a => {
            if (a.result) {
                apps = JSON.parse(a.content).apps
            }
        })
    })
</script>

<ApplicationDialog app={selectedApp} updateApp={updateApplication} />
<content class="w-full dark:text-white">
    <div class="w-full flex">
        <h2 class="text-xl flex-1 font-medium mb-4">Your library</h2>
        <Button color="blue" on:click={handleNewApp}>
            <Plus variation="solid" size="24px" style="vertical-align: -2rem;" />
            New application
        </Button>
    </div>
    <div class="flex space-x-8">
        {#if apps.length !== 0}
            {#each apps as appInfo, index (appInfo.id)}
                <div
                    in:fly={{ y: 20, duration: 200 }}
                    class="card relative w-60 rounded-md shadow">
                    <div class="absolute right-4 top-4 flex space-x-2">
                        <button
                            on:click={() => handleUpdateAppClick(appInfo)}
                            class="rounded-md w-10 h-10 bg-blue-200 bg-opacity-80 flex items-center justify-center">
                            <Pencil class="w-4 h-4 text-blue-900" />
                        </button>
                        <button
                            on:click={() => handleDeleteApp(appInfo.id)}
                            class="rounded-md w-10 h-10 bg-red-200 flex items-center justify-center">
                            <Trash class="w-4 h-4 text-red-900" />
                        </button>
                    </div>
                    <img
                        class="w-60 h-80 rounded-md bg-gray-200 dark:bg-gray-900"
                        src={convertFileSrc(
                            getEndpointUrl('appAsset') + '/' + (index + 2) + '?v=' + nanoid(),
                            'sunshine'
                        )}
                        alt="Application cover poster" />
                    <h4
                        class="absolute bottom-0 card-text-gradient card-text-gradient-dark rounded-b-md text-center text-white font-medium w-full text-xl pb-5 pt-8">
                        {appInfo.name}
                    </h4>
                </div>
            {/each}
        {/if}
    </div>
</content>

<style>
    .card-text-gradient {
        background: linear-gradient(
            180deg,
            transparent 0%,
            rgb(34 34 34 / 91%) 55%,
            rgb(22 22 22) 100%
        );
    }
    :global(.dark .card-text-gradient-dark) {
        background: linear-gradient(
            180deg,
            transparent 0%,
            rgb(72 72 72 / 91%) 55%,
            rgb(86 86 86) 100%
        );
    }
</style>
