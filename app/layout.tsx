import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Viajan2Juntos — Dos viajeros, un mapa y muchas historias',
    template: '%s — Viajan2Juntos',
  },
  description:
    'Blog personal de viajes con rutas, diarios e historias de dos viajeros descubriendo el mundo juntos.',
  metadataBase: new URL('https://costa-rica-2026-lime.vercel.app'),
  openGraph: {
    title: 'Viajan2Juntos',
    description: 'Dos viajeros, un mapa y muchas historias.',
    type: 'website',
    locale: 'es_ES',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#162c27',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
