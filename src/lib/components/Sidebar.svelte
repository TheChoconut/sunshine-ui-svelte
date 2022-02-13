<script>
  import FaHome from 'svelte-icons/fa/FaHome.svelte'
  import FaCog from 'svelte-icons/fa/FaCog.svelte'
  import FaBox from 'svelte-icons/fa/FaBox.svelte'
  import FaSignOutAlt from 'svelte-icons/fa/FaSignOutAlt.svelte'
  import { invalidateAPIConfiguration } from '$lib/api';
  let main_menu = [
    {title: 'Home', icon: FaHome, href: '/'},
    {title: 'Applications', icon: FaBox, href: '/applications'},
    {title: 'Settings', icon: FaCog, href: '/settings'} 
  ]

  const logout = () => {
    invalidateAPIConfiguration();
  }

  export let route;
</script>
<sidebar class="flex flex-col">
  {#each main_menu as menuItem}
    <a href={menuItem.href} class="h-14 text-xl {route === menuItem.href ? 'text-blue-500' : 'text-gray-800'} flex items-center">
        <div class="w-1 h-14 {route === menuItem.href ? 'bg-blue-500' : ''} mr-4"></div>
      <div class="w-6 h-6 mr-4"><svelte:component this={menuItem.icon} /></div>
      <span class="pr-16">{menuItem.title}</span>
    </a>
  {/each}
  <button on:click={() => logout()} class="mt-4 w-48 h-14 text-xl text-blue-900 bg-blue-100 rounded-lg flex justify-center hover:(ring-blue-500 ring-4 ring-offset-2) transition-all space-x-2 items-center">
    <span class="w-6 h-6"><FaSignOutAlt /></span>
    <span>Disconnect</span>
  </button>
</sidebar>