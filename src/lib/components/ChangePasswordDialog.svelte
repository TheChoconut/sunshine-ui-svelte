<script>
    import { Button, Input, Label, Helper } from 'flowbite-svelte'
    import { fly } from 'svelte/transition'
    import { Check, X } from 'svelte-heros'
    import { APIRequest, invalidateAPIConfiguration, sha256 } from '$lib/api'

    let oldPassword = '', newPassword = '', error = {oldPassword: '', generic: ''};

    let open = false;

    const closeDialog = () => {
        oldPassword = "";
        newPassword = "";
        open = false;
    }

    let changePassword = async () => {
        error = {oldPassword: '', generic: ''};

        if (oldPassword.length < 3 || newPassword.length < 3) {
            error.generic = "Passwords must be at least 3 characters long!";
            return;
        }
        let body = { oldPassword: await sha256(oldPassword), password: await sha256(newPassword) };
        const result = await APIRequest('change_password', body);
        if (!result) {
            error.generic = "Something went wrong.";
        }
        if (result.result !== "true") {
            if (result.error == "invalid_old_password") {
                error.oldPassword = "Old password is invalid. Try again with a different password.";
            } else {
                error.generic = "An error occured: " + error.error;
            }
        } else {
            open = false;
            invalidateAPIConfiguration();
        }
    }

    export { open };
</script>

{#if open}
<div class="fixed z-10 bg-gray-500 bg-opacity-80 backdrop-blur-md backdrop-filter left-0 top-0 right-0 bottom-0"></div>
<div
    class="fixed overflow-hidden z-20 px-4 py-6 max-w-md w-full transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 shadow-lg rounded-md bg-white dark:bg-neutral-900 dark:text-white"
    transition:fly={{ y: 30, duration: 200 }}>
    <div class="flex w-full">
        <h2 class="text-2xl font-medium flex-1">
            Change password
        </h2>
        <button class="hover:bg-gray-100 transition-colors text-gray-700 rounded-md p-2" on:click={closeDialog}>
            <X class="w-6 h-6" />
        </button>
    </div>

    <form>
        <Label for="oldpass" class="block mb-2">Old password</Label>
        <Input id="oldpass" bind:value={oldPassword} color="{error.oldPassword ? 'red' : 'base'}" type="password" />
        <Helper class='mt-2 leading-3 h-3' color='red'>{error.oldPassword || ' '}</Helper>
        <Label for="newpass" class="block mb-2 mt-4">New password</Label>
        <Input id="newpass" bind:value={newPassword} type="password" />
    </form>
    <span class="flex-1 mr-4 mb-4 text-sm text-red-600 leading-3 min-h-[12px]">{error.generic}</span>
    
    <div class="flex space-x-2 w-full justify-end items-center">
        <Button on:click={changePassword} class="space-x-4">
            <span>Change password</span>
            <Check class="w-6 h-6" />
        </Button>
    </div>
</div>
{/if}