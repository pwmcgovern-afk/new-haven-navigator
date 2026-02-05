import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const resources = await prisma.resource.findMany({
    select: { id: true, updatedAt: true },
  })

  const resourceUrls = resources.map((r) => ({
    url: `https://new-haven-navigator.vercel.app/resources/${r.id}`,
    lastModified: r.updatedAt,
  }))

  const categories = [
    'housing', 'food', 'cash', 'harm-reduction', 'healthcare',
    'mental-health', 'employment', 'childcare', 'legal',
    'transportation', 'utilities', 'immigration',
  ]

  const categoryUrls = categories.map((slug) => ({
    url: `https://new-haven-navigator.vercel.app/category/${slug}`,
    lastModified: new Date(),
  }))

  return [
    { url: 'https://new-haven-navigator.vercel.app', lastModified: new Date() },
    { url: 'https://new-haven-navigator.vercel.app/resources', lastModified: new Date() },
    { url: 'https://new-haven-navigator.vercel.app/wizard', lastModified: new Date() },
    ...categoryUrls,
    ...resourceUrls,
  ]
}
