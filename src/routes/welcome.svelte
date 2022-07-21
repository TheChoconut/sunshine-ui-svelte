<script lang="ts">
    import { fly } from 'svelte/transition'
    import { InformationCircle, Check, ArrowLeft } from 'svelte-heros'
    import { Card, Alert, Label, Input, Spinner, Button } from 'flowbite-svelte'
    import { APIAuthenticate, TryTestConnection } from '$lib/api'
    import { APIConfiguration } from '$lib/store'
    import { ConnectionResult } from '$lib/types'
    import { onMount } from 'svelte';

    let formState = 0,
        error = '',
        host = $APIConfiguration.host,
        port = $APIConfiguration.port,
        endpoints = $APIConfiguration.endpoints,
        password = ''

    let tryConnect = (ev: Event) => {
        ev.preventDefault()
        let timeoutId = setTimeout(() => formState = 1, 250);
        APIConfiguration.update(() => ({ host, port, endpoints, token: '' }))
        TryTestConnection(false, { host, port, endpoints }).then(result => {
            clearTimeout(timeoutId);
            if (result == ConnectionResult.INVALID_CERTIFICATE) {
                formState = 3
            } else if (result != ConnectionResult.CONNECTION_OK) {
                formState = 0
                if (result == ConnectionResult.OUTDATED_API)
                    error =
                        "The server's API version is outdated. Update server to a newer version in order to use this client."
                else if (result == ConnectionResult.CONNECTION_FAIL && ev.type !== "firstConnect")
                    error =
                        'Something went wrong while connecting to your server. Is your data valid?'
            } else {
                APIAuthenticate(password).then(authenticated => {
                    if (!authenticated) {
                        formState = 2
                        if (ev.type !== "firstConnect") error = 'Password is invalid. Try again'
                    }
                })
            }
        })
    }

    onMount(() => {
        tryConnect(new Event("firstConnect"));
    })
</script>

<main
    in:fly={{ y: 50, duration: 500, delay: 500 }}
    out:fly={{ y: 50, duration: 500 }}
    class="max-w-lg w-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <Card
        textdivClass="p-5 w-full h-full"
        divClass="w-full min-h-[320px] bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div slot="paragraph" class="w-full min-h-[320px] flex flex-col">
            <div class="flex items-center justify-center space-x-4">
                <img class="w-14 h-14" src="/sunshine.png" alt="Sunshine Icon" />
                <div class="text-center dark:text-white font-medium text-4xl">Sunshine</div>
            </div>
            {#if formState == 0}
                <div class="text-gray-500 dark:text-gray-300 w-full text-xl py-4 text-center px-10">
                    Connect to Sunshine API
                </div>
                <form on:submit={tryConnect} class="flex-1 w-full h-full flex flex-col items-center gap-2">
                    <div class="flex gap-2 w-full mb-2">
                        <div class="flex-1">
                            <Label for="ipaddr" class="block mb-2">IP Address / Host name</Label>
                            <Input id="ipaddr" autocomplete="on" bind:value={host} placeholder="127.0.0.1" />
                        </div>
                        <div class="w-24">
                            <Label for="port" class="block mb-2">Port</Label>
                            <Input
                                id="port"
                                bind:value={port}
                                type="number"
                                placeholder="47756"
                                min={0}
                                max={65525} />
                        </div>
                    </div>
                    <div class="flex-1"></div>
                    <Button type="submit" color="blue" class="w-full space-x-2">
                        <Check />
                        <span>Connect</span>
                    </Button>
                </form>
            {:else if formState == 1}
                <div class="flex-1 w-full h-full flex flex-col justify-center items-center gap-2">
                    <Spinner size="16" />
                    <span class="text-xl font-medium dark:text-white mt-2">Connecting...</span>
                </div>
            {:else if formState == 2}
                <div class="text-gray-500 dark:text-gray-300 w-full text-xl py-4 text-center px-10">
                    Password is required
                </div>
                {#if error}
                    <Alert color="yellow" icon={InformationCircle}>
                        {error}
                    </Alert>
                {/if}
                <form on:submit={tryConnect} class="flex-1 w-full h-full flex flex-col justify-center items-center gap-2">
                    <div class="mb-4 w-full">
                        <Label for="password" class="block mb-2">Password</Label>
                        <Input type="password" autocomplete="current-password" bind:value={password} placeholder="Password" />
                    </div>
                    <div class="flex gap-2 w-full">
                        <Button on:click={() => formState = 0} color="light" class="w-full space-x-2 flex-1">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <Button type="submit" color="blue" class="w-full space-x-2">
                            <Check />
                            <span>Connect</span>
                        </Button>
                    </div>
                </form>
            {:else if formState == 3}
                <span class="text-gray-500 w-full text-xl py-4 text-center px-10"
                    >Invalid certificate</span>
                <p class="text-justify mb-2 dark:text-white">
                    Sunshine by default uses a self-signed certificate to achieve an HTTPS
                    connection. You need to provide the server certificate file located in
                    Sunshine's credentials directory in order to connect. This file is located at
                    <span class="bg-gray-600 border-gray-900 p-1 rounded text-red-100 text-italic">
                        credentials/webapi-cacert.pem
                    </span>.
                    <br /> <br />
                    Copy this file at the root directory of this application and restart the client.
                </p>
                <Button color="blue" on:click={() => (formState = 0)} class="space-x-2">
                    <ArrowLeft />
                    <span>Back</span>
                </Button>
            {/if}
        </div>
    </Card>
</main>
