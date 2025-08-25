import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mytutorai.app'
  return [
    { url: base + '/', lastModified: new Date() },
    { url: base + '/en', lastModified: new Date() },
    { url: base + '/legal', lastModified: new Date() },
    { url: base + '/privacy', lastModified: new Date() },
  ]
}
