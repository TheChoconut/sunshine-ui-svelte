<script lang="ts">
    export let inputType: 'long' | 'full' | 'short' = 'short';

    let inputWidth = 'max-w-[240px]';
    if (inputType === 'long') inputWidth = 'max-w-sm';
    else if (inputType === 'full') inputWidth = '';
</script>
<div class="flex {inputType === 'full' ? 'flex-col' : ''} border-b dark:border-neutral-800 py-4">
    <div class="flex-1 dark:text-white">
        <slot name="title"></slot>
        <div class="text-gray-500 dark:text-gray-300 pl-2 pt-2 italic">
            <slot name="help"></slot>
        </div>
    </div>
    <div class="{inputWidth} w-full flex items-center justify-end">
        <slot name="input"></slot>
    </div>
</div>