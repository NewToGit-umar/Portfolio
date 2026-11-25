import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Umar Farooq | Developer',
    short_name: 'Portfolio',
    description: 'Portfolio of Umar Farooq — developer & builder',
    start_url: '/',
    display: 'standalone',      // browser bar ke baghair, app jaisa
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}