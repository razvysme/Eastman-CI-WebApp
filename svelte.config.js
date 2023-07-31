//import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
    
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
          // ignore deliberate link to shiny 404 page
          if (path === '/not-found' && referrer === '/blog/how-we-built-our-404-page') {
              return;
          }

          // otherwise fail the build
          throw new Error(message);
      }
    }
	}
};

//export default config;

export default {
    kit: {
        adapter: adapter({
            // default options are shown. On some platforms
            // these options are set automatically — see below
            pages: 'build',
            assets: 'build',
            fallback: undefined,
            precompress: false,
            strict: true
        })
    }
};
