import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
            pages: 'docs',
            assets: 'docs',
            fallback: null,
            precompress: false,
            strict: true,
			trailingSlash: 'always'
        }),
		paths: {
			base: process.env.NODE_ENV === "production" ? "/Biblioteca" : ""
		}
		// prerender: {
		// 	handleHttpError: ({ path, referrer, message }) => {
		// 		// ignore deliberate link to shiny 404 page
		// 			return;
		// 	}
		// }
	}
};

export default config;
