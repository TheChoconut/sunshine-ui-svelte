<script>
	import FaCheck from 'svelte-icons/fa/FaCheck.svelte';
	import { onMount } from 'svelte';
    import FaArrowRight from 'svelte-icons/fa/FaArrowRight.svelte'
    import FaKey from 'svelte-icons/fa/FaKey.svelte'
    import FaExclamationTriangle from 'svelte-icons/fa/FaExclamationTriangle.svelte'
    import { APIConfiguration, StartWebSocketServer } from '$lib/api';

    let visible = false;
    onMount(() => {
        visible = true
    });

    let formState = 0, error = "", host = $APIConfiguration.host, port = $APIConfiguration.port, endpoint = $APIConfiguration.endpoint, token = "";

    let tryConnect = () => {
        formState = 2;
        StartWebSocketServer(false, {host, port, token, endpoint}).then((result) => {
            if (!result) {
                formState = 1;
                error = "Failed to connect. Are your credentials correct?";
            } else {
                APIConfiguration.set({ host, port, token, endpoint })
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
            <button on:click={() => formState = 1} class="w-full rounded-lg bg-blue-200 text-blue-900 px-6 py-4 font-medium flex space-x-1 mt-4 items-center justify-center hover:ring-3 ring-blue-100 ring-offset-2">
                <span>Continue</span>
                <div class="w-4 h-4"><FaArrowRight /></div>
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
                <span class="w-4 h-4"><FaExclamationTriangle /></span>
                {error}
            </div>
        {/if}
        <div class="flex gap-2">
            <div class="flex-1">
                <label for="host" class="text-gray-500 text-xl flex items-center space-x-1 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="w-6 h-6" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M16 11h-2V9h2v2M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5m7 2H8v10h2V7m2 10h2v-4h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4v10z" fill="currentColor"/></svg><span>Host</span>
                </label>
                <input type="text" id="host" bind:value={host} class="rounded-lg border border-gray-400 w-full h-10 pl-2 mb-2" />
            </div>
            <div>
                <label for="port" class="text-gray-500 text-xl flex items-center space-x-1 mb-2">
                    <span>Port</span>
                </label>
                <input type="number" id="port" min={0} max={65529} bind:value={port} class="rounded-lg border border-gray-400 h-10 pl-2 mb-2" />
            </div>
        </div>
        <label for="token" class="text-gray-500 text-xl flex items-center gap-1 mb-2">
            <div class="w-4 h-4"><FaKey /></div>
            <span>Access token</span>
        </label>
        <input type="password" id="token" bind:value={token} class="rounded-lg border border-gray-400 w-full h-10 pl-2 mb-2" />
        <button on:click={() => tryConnect()} class="rounded-lg bg-blue-200 text-blue-900 ring-blue-100 hover:ring-3 px-6 py-4 font-medium flex space-x-2 mt-4 items-center justify-center ring-offset-2">
            <span>Connect</span>
            <div class="w-4 h-4"><FaCheck /></div>
        </button>
    {:else if formState == 2}
        <div class="flex flex-col justify-center items-center gap-2">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
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
    .lds-ring {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 64px;
        height: 64px;
        margin: 8px;
        border: 8px solid #2a5f83;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #2a5f83 transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

</style>