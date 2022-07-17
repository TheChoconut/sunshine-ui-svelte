<script>
    import { fly } from 'svelte/transition'
    import { invalidateAPIConfiguration } from '../api'
    import { Logout } from 'svelte-heros'
    import Apps from '$lib/icons/Apps.svelte'
    import Home from '$lib/icons/Home.svelte'
    import Settings from '$lib/icons/Settings.svelte'

    export let route;
    let main_menu = [
        {title: 'Home', icon: Home, href: '/'},
        {title: 'Applications', icon: Apps, href: '/applications'},
        {title: 'Settings', icon: Settings, href: '/settings'} 
    ]
    let main_menu_order = ['/', '/applications', '/settings'];



    let selectedIndex = 0;

    $: selectedIndex = main_menu_order.findIndex(a => a === route);

    let logout = () => invalidateAPIConfiguration();
</script>
<navbar class="lg:container flex flex-wrap items-center">
    <div class="flex items-center p-5 space-x-4">
        <img src="/sunshine.png" alt="Sunshine logo" class="h-7 w-7" />
        <div class="col-span-6 col-start-9 row-start-3 text-center font-medium text-3xl">Sunshine</div>
    </div>
    <div class="md:absolute md:left-1/2 md:-translate-x-1/2 justify-center transform flex">
        {#each main_menu as menuItem}
            <a href={menuItem.href} class="{route === menuItem.href ? 'text-accent-500' : 'text-gray-800'} flex items-center transition-colors">
                <div class="w-[100px] h-14 flex flex-col items-center transition-all justify-center {route === menuItem.href ? 'fill-accent-500 text-accent-500' : ''}">
                    <svelte:component this={menuItem.icon} />
                    {#if route === menuItem.href}
                        <h4 class="text-sm" transition:fly={{ y: 20, duration: 100 }}>{menuItem.title}</h4>
                    {/if}
                </div>
            </a>
        {/each}
        <div class="absolute h-[3px] w-[100px] bottom-0 left-0 block bg-accent-500 transition-all transform" style="--tw-translate-x: {selectedIndex * 100}px"></div>
    </div>
    <button on:click={() => logout()} class="w-24 h-16 m-2 flex flex-col items-center transition-colors justify-center absolute top-0 right-2 hover:text-accent-500">
        <Logout />
        <span class="">Disconnect</span>
      </button>
</navbar>