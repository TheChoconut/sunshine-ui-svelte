<script lang="ts">
    import { APIRequest } from '$lib/api'
import Unpair from '$lib/icons/Unpair.svelte'
    import { Button, Spinner } from 'flowbite-svelte'
    import { X } from 'svelte-heros'

    let quickAction = { active: false, text: '' }

    const doQuickAction = (type: 'close_app' | 'unpair_all') => {
        let text = 'Closing active app...'
        if (type === 'unpair_all') text = 'Unpairing all clients...'
        quickAction = { active: true, text }
        APIRequest(type, {})
            .then(async () => {
                return new Promise(resolve => setTimeout(resolve, 1000))
            })
            .then(() => {
                quickAction = { active: false, text: '' }
            })
    }
</script>

<content>
    <div class="text-lg font-medium my-4 dark:text-white">
        Sunshine is a display streaming host for Moonlight clients using the GameStream protocol.
        <br />
        This UI was created using Svelte and Tailwind CSS.
    </div>

    <div class="mb-4">
        <h2 class="font-bold text-lg dark:text-white">Quick actions</h2>
        <div class="flex gap-4 items-center h-10 mt-3">
            {#if quickAction.active}
                <Spinner />
                {quickAction.text}
            {:else}
                <Button color="light" class="space-x-2" on:click={() => doQuickAction('close_app')}>
                    <X variation="solid" />
                    <span>Close running app</span>
                </Button>
                <Button color="light" class="space-x-2" on:click={() => doQuickAction('unpair_all')}>
                    <Unpair class="w-6 h-6" />
                    <span>Unpair all clients</span>
                </Button>
            {/if}
        </div>
    </div>
</content>
