<script lang="ts">
import { APIRequest } from '$lib/api';
import LoadingSpinner from '$lib/LoadingSpinner.svelte';

let quickAction = { active: false, text: '' }

const doQuickAction = (type: 'close_app' | 'unpair_all') => {
  let text = 'Closing active app...';
  if (type === 'unpair_all') text = 'Unpairing all clients...';
  quickAction = { active: true, text }
  APIRequest(type, {}).then(async () => {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  })
  .then(() => {
    quickAction = { active: false, text: '' }
  });
}

</script>
<content>
  <div class="text-lg font-medium mb-4">
    Sunshine is a display streaming host for Moonlight clients using the GameStream protocol.<br>
    This UI was created using Svelte and Tailwind CSS.
  </div>

  <div class="mb-4">
    <h2 class="font-bold text-lg">Quick actions</h2>
    <div class="flex gap-4 items-center h-10">
      {#if quickAction.active}
      <LoadingSpinner size={'16px'} />
      {quickAction.text}
      {:else}
      <button on:click={() => doQuickAction('close_app')} class="bg-gray-200 flex gap-3 items-center h-10 px-4 rounded-lg transition-all hover:(ring-2 ring-offset-2 ring-gray-800)">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" style="vertical-align: -0.125em;" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M764.288 214.592L512 466.88L259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512L214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/></svg>
        Close running app
      </button>
      <button on:click={() => doQuickAction('unpair_all')} class="bg-gray-200 flex gap-3 items-center h-10 px-4 rounded-lg transition-all hover:(ring-2 ring-offset-2 ring-gray-800)">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" style="vertical-align: -0.125em;" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M13.617 3.844a2.87 2.87 0 0 0-.451-.868l1.354-1.36L13.904 1l-1.36 1.354a2.877 2.877 0 0 0-.868-.452a3.073 3.073 0 0 0-2.14.075a3.03 3.03 0 0 0-.991.664L7 4.192l4.327 4.328l1.552-1.545c.287-.287.508-.618.663-.992a3.074 3.074 0 0 0 .075-2.14zm-.889 1.804a2.15 2.15 0 0 1-.471.705l-.93.93l-3.09-3.09l.93-.93a2.15 2.15 0 0 1 .704-.472a2.134 2.134 0 0 1 1.689.007c.264.114.494.271.69.472c.2.195.358.426.472.69a2.134 2.134 0 0 1 .007 1.688zm-4.824 4.994l1.484-1.545l-.616-.622l-1.49 1.551l-1.86-1.859l1.491-1.552L6.291 6L4.808 7.545l-.616-.615l-1.551 1.545a3 3 0 0 0-.663.998a3.023 3.023 0 0 0-.233 1.169c0 .332.05.656.15.97c.105.31.258.597.459.862L1 13.834l.615.615l1.36-1.353c.265.2.552.353.862.458c.314.1.638.15.97.15c.406 0 .796-.077 1.17-.232c.378-.155.71-.376.998-.663l1.545-1.552l-.616-.615zm-2.262 2.023a2.16 2.16 0 0 1-.834.164c-.301 0-.586-.057-.855-.17a2.278 2.278 0 0 1-.697-.466a2.28 2.28 0 0 1-.465-.697a2.167 2.167 0 0 1-.17-.854a2.16 2.16 0 0 1 .642-1.545l.93-.93l3.09 3.09l-.93.93a2.22 2.22 0 0 1-.711.478z" clip-rule="evenodd"/></svg>
        Unpair all clients
      </button>
      {/if}
    </div>
  </div>

  <a href="https://github.com/SunshineStream/sunshine" rel="_blank" class="bg-white border-1 border-gray-200 text-black flex gap-2 hover:(bg-gray-100) active:(opacity-80) inline-flex px-6 text-sm h-8 items-center justify-center rounded">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16px" height="16px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" clip-rule="evenodd"/></svg>
    <span class="text-lg">GitHub</span>
  </a>
</content>
