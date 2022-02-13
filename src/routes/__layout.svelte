<script context="module">
	export const load = async ({ url }) => ({
		props: {
			key: url.pathname
		}
	});
</script>
<script lang="ts">
  import "virtual:windi.css"
  import Navbar from '$lib/Navbar.svelte'
  import { theme } from '$lib/store'
  import { onMount } from 'svelte'
  import { APIConfiguration, StartWebSocketServer } from '$lib/api';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import PinDialog from '$lib/components/PinDialog.svelte';

  export let key;
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
      if (key !== '/welcome') goto("/welcome");
    } else {
      StartWebSocketServer(false);
    }
  });
</script>

<div class="fixed left-0 top-0 -z-10 w-screen h-screen bg-gray-100">
</div>
{#if key === '/welcome'}
  <slot />
{:else}
  <Navbar />
  <container class="block container mx-auto flex">
      <Sidebar route={key} />
    <slot />
  </container>
{/if}

<PinDialog />