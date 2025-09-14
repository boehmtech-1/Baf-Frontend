import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	// Load env file based on `mode` in the current working directory.
	// Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
	const env = loadEnv(mode, process.cwd(), '')

	return {
		plugins: [react()],
		server: {
			proxy: {
				'/api': {
					target: env.VITE_CMS_URL,
					changeOrigin: true,
					secure: false,
					// Optional: Add this to see the proxied requests in your terminal
					configure: (proxy, _options) => {
						proxy.on('proxyReq', (proxyReq, req, _res) => {
							console.log(`[Vite Proxy] Forwarding request: ${req.method} ${req.url} -> ${proxyReq.host}${proxyReq.path}`);
						});
					},
				},
			},
		},
	}
})
