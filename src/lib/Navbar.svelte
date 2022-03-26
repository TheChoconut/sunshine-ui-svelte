<script>
    import Icon from '@iconify/svelte';
    import appsIcon from '@iconify/icons-fluent/apps-16-filled';
    import homeIcon from '@iconify/icons-fluent/home-12-filled';
    import settingsIcon from '@iconify/icons-fluent/settings-16-filled';
    import signOut20Filled from '@iconify/icons-fluent/sign-out-20-filled';
    import { fly } from 'svelte/transition';
    import { invalidateAPIConfiguration } from './api';
    import { goto } from '$app/navigation';

    export let route;
    let main_menu = [
        {title: 'Home', icon: homeIcon, href: '/'},
        {title: 'Applications', icon: appsIcon, href: '/applications'},
        {title: 'Settings', icon: settingsIcon, href: '/settings'} 
    ]
    let logout = () => {
        invalidateAPIConfiguration();
        goto("/welcome");
    }
</script>
<navbar class="block lg:container m-5 flex flex-wrap items-center space-x-8">
    <div class="flex items-center space-x-4">
        <img src="/sunshine.png" alt="Sunshine logo" class="h-7 w-7" />
        <div class="col-span-6 col-start-9 row-start-3 text-center font-medium text-3xl">Sunshine</div>
    </div>
    <div class="icons md:(absolute left-1/2 -translate-x-1/2) justify-center transform flex">
        {#each main_menu as menuItem}
            <a href={menuItem.href} class="{route === menuItem.href ? 'text-accent-500' : 'text-gray-800'} flex items-center transition-colors">
                <div class="w-24 h-16 flex flex-col items-center transition-colors justify-center border-b-3 {route === menuItem.href ? 'text-accent-500 border-b-accent-500' : 'border-b-transparent'}">
                    <Icon icon={menuItem.icon} class="w-8 h-8" />
                    {#if route === menuItem.href}
                        <h4 class="text-sm" transition:fly={{ y: 50, duration: 100 }}>{menuItem.title}</h4>
                    {/if}
                </div>
            </a>
        {/each}
    </div>
    <button on:click={() => logout()} class="w-24 h-16 flex flex-col items-center transition-colors justify-center absolute right-4 hover:(text-accent-500)">
        <Icon icon={signOut20Filled} class="w-8 h-8" />
        <span>Disconnect</span>
      </button>
</navbar>