import type { Metadata, Viewport } from 'next'
import { JsonLd } from '@/components/json-ld'
import { MotionExperience } from '@/components/motion-experience'
import { authors, defaultSocialImage, siteDescription, siteName, siteUrl } from '@/src/data/siteSeo'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Viajan2Juntos — Dos viajeros, un mapa y muchas historias',
    template: '%s — Viajan2Juntos',
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  authors,
  creator: 'Andrea y Alejandro',
  publisher: siteName,
  category: 'travel',
  keywords: ['blog de viajes', 'viajes en pareja', 'rutas por libre', 'itinerarios de viaje', 'consejos de viaje'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName,
    images: [{ url: defaultSocialImage, width: 1152, height: 1536, alt: 'Andrea y Alejandro viajando juntos' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    images: [defaultSocialImage],
  },
  verification: { google: 'v8NCp-2SF9WZhMmesZWCd-Co1xJ774qluerAnT5afUw' },
  icons: { icon: '/brand/v2-logo-white.png', apple: '/brand/v2-logo-white.png' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#162c27',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': `${siteUrl}/#website`,
                url: siteUrl,
                name: siteName,
                alternateName: 'V2J',
                description: siteDescription,
                inLanguage: 'es-ES',
              },
              {
                '@type': 'Organization',
                '@id': `${siteUrl}/#publisher`,
                name: siteName,
                url: siteUrl,
                logo: `${siteUrl}/brand/v2-logo-white.png`,
                founder: [
                  { '@type': 'Person', name: 'Andrea', url: `${siteUrl}/nosotros` },
                  { '@type': 'Person', name: 'Alejandro', url: `${siteUrl}/nosotros` },
                ],
              },
            ],
          }}
        />
        <MotionExperience />
        {children}
      </body>
    </html>
  )
}
