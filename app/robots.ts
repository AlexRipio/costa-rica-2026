import type { MetadataRoute } from 'next'
import { siteUrl } from '@/src/data/siteSeo'

export default function robots(): MetadataRoute.Robots {
  const privatePaths = ['/familia', '/actualizar', '/api/', '/hotels/']

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: privatePaths,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
