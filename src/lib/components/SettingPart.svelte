<script lang="ts">
    export let inputType: 'long' | 'full' | 'short' = 'short';

    let inputWidth = 'max-w-[240px]';
    if (inputType === 'long') inputWidth = 'max-w-sm';
    else if (inputType === 'full') inputWidth = '';
</script>
<div class="flex {inputType === 'full' ? 'flex-col' : ''} border-b py-4">
    <div class="flex-1">
        <slot name="title"></slot>
        <div class="text-gray-500 pl-2 pt-2 italic">
            <slot name="help"></slot>
        </div>
    </div>
    <div class="{inputWidth} w-full flex items-center justify-end">
        <slot name="input"></slot>
    </div>
</div>