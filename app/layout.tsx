import type { Metadata, Viewport } from 'next'
import { JsonLd } from '@/components/json-ld'
import { MotionExperience } from '@/components/motion-experience'
import { AnalyticsConsent } from '@/components/analytics-consent'
import { adsenseClient } from '@/src/lib/adsense'
import { authors, defaultSocialImage, siteDescription, siteName, siteUrl, tiktokUrl } from '@/src/data/siteSeo'
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
    images: [{ url: defaultSocialImage, width: 1200, height: 630, alt: 'Logo de Viajan2Juntos' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    images: [defaultSocialImage],
  },
  verification: { google: 'v8NCp-2SF9WZhMmesZWCd-Co1xJ774qluerAnT5afUw' },
  icons: {
    icon: [
      { url: '/favicon-48.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon-96.png', type: 'image/png', sizes: '96x96' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon-48.png',
    apple: [{ url: '/apple-icon.png', type: 'image/png', sizes: '180x180' }],
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
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          crossOrigin="anonymous"
        />
      </head>
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
                publisher: { '@id': `${siteUrl}/#publisher` },
              },
              {
                '@type': 'Organization',
                '@id': `${siteUrl}/#publisher`,
                name: siteName,
                url: siteUrl,
                description: siteDescription,
                email: 'hola@viajan2juntos.com',
                logo: {
                  '@type': 'ImageObject',
                  url: `${siteUrl}/icon.png`,
                  width: 512,
                  height: 512,
                },
                sameAs: [tiktokUrl],
                knowsAbout: ['viajes en pareja', 'rutas por libre', 'itinerarios de viaje', 'Costa Rica'],
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
        <AnalyticsConsent />
      </body>
    </html>
  )
}
