import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import WindiCSS from 'vite-plugin-windicss'

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    vite: {
      plugins: [ WindiCSS() ],
    },
  }
}
