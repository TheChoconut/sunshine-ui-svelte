<script>
    import { APIRequest } from '$lib/api'
    import { WebviewWindow, appWindow } from '@tauri-apps/api/window'
    import { Button } from 'flowbite-svelte'
    import { onMount } from 'svelte'

    let digits = ['', '', '', '']
    let inputs = []

    const handleKeyPress = (ev, index) => {
        if (ev.key === 'Backspace') {
            digits[index] = ''
            if (index - 1 >= 0) inputs[index - 1].focus()
            return true
        }
        if (ev.key === 'Enter' && index == 3) {
            handlePinSubmit()
        }
        ev.preventDefault()
        let key = Number(ev.key)
        if (isNaN(key) || ev.key === null) {
            return false
        }
        digits[index] = ev.key
        if (index + 1 < inputs.length) {
            inputs[index + 1].focus()
        }
    }
    const handlePinSubmit = async () => {
        await APIRequest('save_pin', { pin: digits.join('') })
        digits = ['', '', '', '']
        WebviewWindow.getByLabel('pin_request').hide()
    }
    const handleCancel = async () => {
        await APIRequest('save_pin', { pin: '0000' })
        digits = ['', '', '', '']
        WebviewWindow.getByLabel('pin_request').hide()
    }

    const onLoad = () => {
        console.log('onload')
        inputs[0].focus()
    }

    onMount(() => {
        appWindow.listen('onload', onLoad)
    })
</script>

<div class="block fixed z-100 bg-gray-100 w-[400px] px-4 py-2 h-[180px]">
    <h2 class="text-lg font-bold">Pairing Request</h2>
    <h2 class="text-md mb-2">Enter the PIN displayed on the device.</h2>
    <div class="flex m-auto w-full items-center justify-center gap-2">
        {#each digits as _, index}
            <input
                type="text"
                bind:this={inputs[index]}
                on:keydown={ev => handleKeyPress(ev, index)}
                bind:value={digits[index]}
                placeholder="0"
                min="0"
                max="9"
                class="w-10 h-10 text-xl font-bold text-center focus:border-blue-500 outline-none border-2 border-gray-300 rounded" />
        {/each}
    </div>
    <div class="w-full flex justify-center mt-4 gap-2">
        <Button on:click={handlePinSubmit}>Enter</Button>
        <Button color="alternative" on:click={handleCancel}>Cancel</Button>
    </div>
</div>
