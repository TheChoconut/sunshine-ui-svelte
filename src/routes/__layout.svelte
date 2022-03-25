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
  import { APIConfiguration, TestConnection } from '$lib/api';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import PinDialog from '$lib/components/PinDialog.svelte';
import PageTransitions from '$lib/PageTransitions.svelte';

  export let route;
  onMount(async () => {
    APIConfiguration.subscribe(async (a) => {
      if (a.token !== "") {
        if ($page.url.pathname === '/welcome') goto("/");
      } else {
        if ($page.url.pathname !== '/welcome') {
          goto("/welcome");
        }
      }
    });
    if ($APIConfiguration.token === "") {
      if (route !== '/welcome') {
        goto("/welcome");
      }
    } else {
      if (await TestConnection(true) === false) {
        goto("/welcome");
      }
    }
  });
  $: route = $page.url.pathname;
</script>

<div class="fixed left-0 top-0 -z-10 w-screen h-screen bg-gray-50">
</div>
{#if route === '/welcome'}
  <slot />
{:else}
  <Navbar {route} />
  <container class="block lg:(container mx-auto) mx-4 flex">
    <slot />
  </container>
{/if}

<PinDialog />