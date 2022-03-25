<script>
    import { fly } from 'svelte/transition';
    export let refresh = '';
</script>
{#key refresh}
  <div
    in:fly={{ x: -50, duration: 250, delay: 300 }}
    out:fly={{ x: -50, duration: 250 }}
    class="w-full"
    >
    <slot/>
  </div>
{/key}