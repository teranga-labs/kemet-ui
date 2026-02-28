import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			registerType: 'autoUpdate',

			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,ttf,vtt}'],
				maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
				runtimeCaching: [
					{
						urlPattern: /\.(?:mp4|mov)$/,
						handler: 'CacheFirst',
						options: {
							cacheName: 'video-cache',
							expiration: {
								maxEntries: 5,
								maxAgeSeconds: 60 * 60 * 24
							}
						}
					},
					{
						urlPattern: ({ url }) =>
							url.pathname.startsWith('/api/'),
						handler: 'NetworkFirst',
						options: {
							cacheName: 'api-cache',
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 60 * 60 * 24
							},

							cacheableResponse: {
								statuses: [0, 200]
							}
						}
					}
				]
			},
			devOptions: { enabled: false },
			manifest: {
				name: 'Kemet Streaming App',
				short_name: 'Kemet',
				description: 'A streaming platform for original content.',
				theme_color: '#7227F4',
				background_color: '#FFFFFF',
				icons: [
					{
						src: '/images/misc/KEMET Android.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/images/misc/KEMET Android.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		})
	],
	base: '/',
	assetsInclude: ['**/*.ttf', '**/*.vtt'],
	build: {
		assetsInlineLimit: 4096
	},
	server: {
		allowedHosts: true
	}
})
