<script context="module">
	export const load = async (session) => {
		return {
			props: {
				route: session.url.pathname
			}
		}
	};
</script>
<script lang="ts">
  import "virtual:windi.css"
  import Navbar from '$lib/Navbar.svelte'
  import { onMount } from 'svelte'
  import { APIConfiguration, StartWebSocketServer } from '$lib/api';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import PinDialog from '$lib/components/PinDialog.svelte';

  export let route;
  onMount(() => {
    APIConfiguration.subscribe(async (a) => {
      if (a.token !== "") {
        let result = await StartWebSocketServer(false);
        if (result) {
          if($page.url.pathname === '/welcome') goto("/");
          return;
        }
      }
      if($page.url.pathname !== '/welcome') goto("/welcome");
    });
    if ($APIConfiguration.token === "") {
      if (route !== '/welcome') goto("/welcome");
    } else {
      StartWebSocketServer(false);
    }
  });
  $: route = $page.url.pathname;
</script>

<div class="fixed left-0 top-0 -z-10 w-screen h-screen bg-gray-100">
</div>
{#if route === '/welcome'}
  <slot />
{:else}
  <Navbar />
  <container class="block container mx-auto flex">
      <Sidebar {route} />
    <slot />
  </container>
{/if}

<PinDialog />