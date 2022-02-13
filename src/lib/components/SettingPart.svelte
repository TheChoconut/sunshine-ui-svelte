<script lang="ts">
    export let longInput: boolean = false;
</script>
<div class="flex border-b py-4">
    <div class="flex-1">
        <slot name="title"></slot>
        <div class="text-gray-500 pl-2 pt-2 italic">
            <slot name="help"></slot>
        </div>
    </div>
    <div class="{longInput ? 'w-120' : 'w-60'} flex items-center justify-end">
        <slot name="input"></slot>
    </div>
</div>