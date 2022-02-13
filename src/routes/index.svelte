<script lang="ts">
import DiGithubBadge from 'svelte-icons/di/DiGithubBadge.svelte'
export const prerender = true;
</script>
<content>
  <div class="text-lg font-medium mb-4">
    Sunshine is a display streaming host for Moonlight clients using the GameStream protocol.<br>
    This UI was created using Svelte and Tailwind CSS.
  </div>
  <a href="https://github.com/loki-47-6F-64/sunshine" rel="external" class="inline-flex items-center px-12 bg-white border border-gray-900 hover:ring-4 ring-offset-2 ring-light-800 rounded-lg">
    <div class="w-16 h-16"><DiGithubBadge /></div>
    <span class="text-xl font-medium">GitHub</span>
  </a>
</content>
