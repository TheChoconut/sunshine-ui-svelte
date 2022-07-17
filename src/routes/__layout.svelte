<script lang="ts">
    import '../app.css'
    import Navbar from '$lib/components/Navbar.svelte'
    import { page } from '$app/stores'
    import { onMount } from 'svelte'
    import { TryTestConnection } from '$lib/api'
    import { ConnectionResult } from '$lib/types'
    import { goto } from '$app/navigation'

    let route = $page.url.pathname
    $: route = $page.url.pathname

    let loaded = false;

    onMount(async () => {
        if (
            (await TryTestConnection(true)) !== ConnectionResult.CONNECTION_OK &&
            $page.url.pathname !== '/welcome'
        ) {
            goto('/welcome')
        }
        loaded = true;
    })
</script>

{#if route !== '/welcome'}
    <Navbar {route} />
{/if}
<container class="lg:(container mx-auto) mx-4 flex">
    {#if loaded}
    <slot />
    {/if}
</container>
