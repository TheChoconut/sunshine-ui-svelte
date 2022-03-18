<script>
    import { APIRequest } from '$lib/api';
    import { WebviewWindow } from '@tauri-apps/api/window';

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
const handlePinSubmit = async () => {
    await APIRequest("save_pin", {pin: digits.join('')});
    digits = ["", "", "", ""];
    WebviewWindow.getByLabel('pin_request').hide();
}
const handleCancel = async () => {
    await APIRequest("save_pin", {pin: "0000"});
    digits = ["", "", "", ""];
    WebviewWindow.getByLabel('pin_request').hide();
};
</script>
<div class="block fixed z-100 bg-gray-100 w-100 p-4 h-50">
    <h2 class="text-lg font-bold">Pairing Request</h2>
    <h2 class="text-md mb-2">Enter the PIN displayed on the device.</h2>
    <div class="flex m-auto w-full items-center justify-center gap-2">
        {#each digits as _, index}
            <input type="text" bind:this={inputs[index]} on:keydown={(ev) => handleKeyPress(ev, index)} bind:value={digits[index]} placeholder="0" min="0" max="9" class="w-10 h-10 text-xl font-bold text-center focus:border-blue-500 outline-none border-2 border-gray-300 rounded" />
        {/each}
    </div>
    <div class="w-full flex justify-center gap-2">
        <button bind:this={submitButton} on:click={handlePinSubmit} class="flex-1 h-12 bg-blue-200 text-blue-900 font-bold text-lg text-center rounded-lg mt-4 hover:(ring-2 ring-blue-500) ring-offset-2 transition-all">Enter</button>
        <button on:click={handleCancel} class="flex-1 h-12 bg-gray-200 text-gray-900 font-bold text-lg text-center rounded-lg mt-4 hover:(ring-2 ring-gray-500) ring-offset-2 transition-all">Cancel</button>
    </div>
</div>