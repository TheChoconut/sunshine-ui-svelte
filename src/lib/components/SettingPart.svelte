<script lang="ts">
    export let inputType: 'long' | 'full' | 'short' = 'short';

    let inputWidth = 'w-60';
    if (inputType === 'long') inputWidth = 'w-120';
    else if (inputType === 'full') inputWidth = 'w-full';
</script>
<div class="flex {inputType === 'full' ? 'flex-col' : ''} border-b py-4">
    <div class="flex-1">
        <slot name="title"></slot>
        <div class="text-gray-500 pl-2 pt-2 italic">
            <slot name="help"></slot>
        </div>
    </div>
    <div class="{inputWidth} flex items-center justify-end">
        <slot name="input"></slot>
    </div>
</div>