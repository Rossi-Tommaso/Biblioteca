import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
            pages: 'docs',
            assets: 'docs',
            fallback: undefined,
            precompress: false,
            strict: true
        }),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// ignore deliberate link to shiny 404 page
					return;
			}
		}
	}
};

export default config;
