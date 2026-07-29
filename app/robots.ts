import type { MetadataRoute } from 'next'
import { siteUrl } from '@/src/data/siteSeo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/familia', '/actualizar', '/api/', '/hotels/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
