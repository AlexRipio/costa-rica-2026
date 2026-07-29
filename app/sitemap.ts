import type { MetadataRoute } from 'next'
import { costaRicaGuides } from '@/src/data/costaRicaGuides'
import { contentUpdatedAt, siteUrl } from '@/src/data/siteSeo'

export default function sitemap(): MetadataRoute.Sitemap {
  const modified = new Date(`${contentUpdatedAt}T12:00:00+02:00`)
  const staticPages = [
    ['', 1],
    ['/viajes', 0.9],
    ['/nosotros', 0.7],
    ['/viajes/costa-rica-2026', 1],
    ['/viajes/costa-rica-2026/maleta', 0.8],
    ['/aviso-legal', 0.2],
    ['/privacidad', 0.2],
    ['/cookies', 0.2],
    ['/creditos', 0.2],
  ] as const

  return [
    ...staticPages.map(([path, priority]) => ({
      url: `${siteUrl}${path}`,
      lastModified: modified,
      changeFrequency: path.includes('costa-rica') ? ('monthly' as const) : ('yearly' as const),
      priority,
    })),
    ...costaRicaGuides.map((guide) => ({
      url: `${siteUrl}/viajes/costa-rica-2026/${guide.slug}`,
      lastModified: modified,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ]
}
