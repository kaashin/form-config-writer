/** @type {import('@sveltejs/kit').Config} */
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import vercel from '@sveltejs/adapter-vercel';
import path from 'path';

const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: vercel(),
		vite: {
			// plugins: [viteCommonjs()],
			resolve: {
				alias: {
					$utils: path.resolve('./src/utils')
				}
			}
		}
	}
};

export default config;
