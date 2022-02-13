<script lang="ts">
import { APIRequest, WaitForSocket } from '$lib/api';

import { pinDialog } from "$lib/store";

let digits = ["","","",""];
let submitButton = null;
let inputs = [];

const handleKeyPress = (ev, index) => {
    if (ev.key === 'Backspace') {
        digits[index] = "";
        if (index-1 >= 0) inputs[index-1].focus();
        return true;
    }
    ev.preventDefault();
    let key = Number(ev.key);
    if (isNaN(key) || ev.key === null) {
        
        return false;
    }
    digits[index] = ev.key;
    if (index + 1 >= inputs.length) {
        submitButton.focus();
    } else {
        inputs[index+1].focus();
    }
}
const handlePinSubmit = () => {
    WaitForSocket().then(async () => {
        await APIRequest("save_pin", {pin: Number(digits.join(''))});
        pinDialog.set({ open: false, pin: '' });
    })
}
const handleCancel = () => pinDialog.set({ open: false, pin: '' });

</script>


{#if $pinDialog.open}
    <div class="fixed left-0 top-0 z-1 w-screen h-screen bg-black bg-opacity-90 backdrop-blur-md backdrop-filter">
    </div>
    <div class="block fixed z-100 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white w-200 p-10 h-80">
        <h2 class="text-2xl font-bold">Pairing Request</h2>
        <h2 class="text-xl text-center my-6">Enter the PIN displayed on the device.</h2>
        <div class="flex m-auto w-full items-center justify-center gap-2">
            {#each digits as _, index}
                <input type="text" bind:this={inputs[index]} on:keydown={(ev) => handleKeyPress(ev, index)} bind:value={digits[index]} placeholder="0" min="0" max="9" class="w-16 h-16 text-4xl font-bold text-center focus:border-blue-500 outline-none border-2 border-gray-300 rounded" />
            {/each}
        </div>
        <div class="w-full flex justify-center gap-2">
            <button bind:this={submitButton} on:click={handlePinSubmit} class="w-40 h-12 bg-blue-200 text-blue-900 font-bold text-lg text-center rounded-lg mt-4 hover:(ring-2 ring-blue-500) ring-offset-2 transition-all">Enter</button>
            <button on:click={handleCancel} class="w-40 h-12 bg-gray-200 text-gray-900 font-bold text-lg text-center rounded-lg mt-4 hover:(ring-2 ring-gray-500) ring-offset-2 transition-all">Cancel</button>
        </div>
    </div>
{/if}