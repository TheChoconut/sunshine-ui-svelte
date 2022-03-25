<script>
	import { onMount } from 'svelte';
    import arrowRight12Regular from '@iconify/icons-fluent/arrow-right-12-regular';
    import plugConnected20Filled from '@iconify/icons-fluent/plug-connected-20-filled';
    import warning12Filled from '@iconify/icons-fluent/warning-12-filled';
    import { APIAuthenticate, APIConfiguration, TestConnection } from '$lib/api';
    import LoadingSpinner from '$lib/LoadingSpinner.svelte';
    import Icon from '@iconify/svelte';

    let visible = false;
    onMount(() => {
        visible = true;
        APIConfiguration.update((a) => ({...a, token: ''}));
    });

    let formState = 0, error = "", host = $APIConfiguration.host, port = $APIConfiguration.port, endpoints = $APIConfiguration.endpoints, password = "";

    let tryConnect = () => {
        formState = 2;
        TestConnection(false, {host, port, endpoints}).then((result) => {
            if (!result) {
                formState = 1;
                error = "Cannot reach the server. Is your data correct?";
            } else {
                console.debug("Testing authenticated connection");
                APIConfiguration.set({ host, port, endpoints, token: '' });
                APIAuthenticate(password).then((authenticated) => {
                    if (!authenticated) {
                        formState = 1;
                        error = "Password is invalid. Try again";
                    }
                })
            }
        })
    }
</script>

{#if visible}
<main class="bg-white shadow-lg w-120 rounded-3xl flex p-8 flex-col">
    {#if formState == 0}
        <div class="py-8 w-full">
            <img src="/sunshine.png" alt="Sunshine Icon" class="mx-auto h-40 w-40 mb-4" />
            <div class="col-span-6 col-start-9 row-start-3 text-center text-3xl">
                Welcome to<br> 
                <span class="font-bold text-5xl">Sunshine</span>
            </div>
            <button on:click={() => formState = 1} class="w-full mt-4 bg-accent-500 text-white flex gap-2 hover:(bg-accent-700) active:(opacity-80) px-6 text-sm h-10 transition-shadow leading-4 items-center justify-center rounded">
                <span>Continue</span>
                <Icon icon={arrowRight12Regular} class="w-4 h-4" />
            </button>
        </div>
    {:else if formState == 1}
        <div class="flex items-center space-x-4 mx-auto">
            <img class="h-16 w-16" src="/sunshine.png" alt="Sunshine Icon" />
            <div class="col-span-6 col-start-9 row-start-3 text-center font-medium text-4xl">Sunshine</div>
        </div>
        <span class="text-gray-500 w-full text-xl py-8 text-center px-10">Connect to Sunshine API</span>
        {#if error}
            <div class="w-full bg-yellow-100 text-yellow-900 border-l-6 py-4 px-4 border-yellow-600 flex items-center gap-2">
                <span class="w-4 h-4"><Icon icon={warning12Filled} /></span>
                {error}
            </div>
        {/if}
        <div class="flex gap-2">
            <div class="flex-1">
                <label for="host" class="flex items-center mt-2">
                    <span>Host</span>
                </label>
                <input type="text" id="host" bind:value={host} class="w-full h-9 border-gray-200 border-b-gray-500 focus:(border-b-accent-500 border-b-2) focus:(outline-none) border-1 pl-3 rounded" />
            </div>
            <div>
                <label for="port" class="flex items-center mt-2">
                    <span>Port</span>
                </label>
                <input type="number" id="port" min={0} max={65529} bind:value={port} class="h-9 border-gray-200 border-b-gray-500 focus:(border-b-accent-500 border-b-2) focus:(outline-none) border-1 pl-3 rounded w-24" />
            </div>
        </div>
        <label for="password" class="flex items-center gap-1 mt-2">
            <span>Password</span>
        </label>
        <input type="password" id="password" bind:value={password} class="h-9 border-gray-200 border-b-gray-500 focus:(border-b-accent-500 border-b-2) focus:(outline-none) border-1 pl-3 rounded w-full" />
        <button on:click={() => tryConnect()} class="mt-4 bg-accent-500 text-white flex gap-2 hover:(bg-accent-700) active:(opacity-80) px-6 text-sm h-10 transition-shadow leading-4 items-center justify-center rounded">
            <Icon icon={plugConnected20Filled} class="w-4 h-4"/>
            <span>Connect</span>
        </button>
    {:else if formState == 2}
        <div class="flex flex-col justify-center items-center gap-2">
            <LoadingSpinner />
            <span class="text-xl">Connecting...</span>
        </div>
    {/if}
</main>
{/if}


<style>
    main {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>