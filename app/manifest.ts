import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Viajan2Juntos',
    short_name: 'Viajan2Juntos',
    description: 'Rutas, mapas y consejos de viaje de Andrea y Alejandro.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fbf8f1',
    theme_color: '#123f35',
    lang: 'es',
    icons: [{ src: '/icon.png', sizes: '1024x1024', type: 'image/png' }],
  }
}
