import { prisma } from '@/lib/db'
import type { ResourceListItem } from '@/lib/types'
import ResourcesClient from './ResourcesClient'

// Revalidate resource list every hour
export const revalidate = 3600

export default async function ResourcesPage({
  searchParams
}: {
  searchParams: { q?: string; category?: string }
}) {
  const { q, category } = searchParams

  // Limit search query length
  const safeQ = q?.slice(0, 200)

  const resources = await prisma.resource.findMany({
    where: {
      AND: [
        safeQ ? {
          OR: [
            { name: { contains: safeQ, mode: 'insensitive' } },
            { description: { contains: safeQ, mode: 'insensitive' } },
            { organization: { contains: safeQ, mode: 'insensitive' } },
            { categories: { has: safeQ.toLowerCase() } },
            { address: { contains: safeQ, mode: 'insensitive' } },
          ]
        } : {},
        category ? {
          categories: { has: category }
        } : {}
      ]
    },
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      nameEs: true,
      organization: true,
      description: true,
      descriptionEs: true,
      categories: true,
      address: true,
      phone: true,
      hours: true,
      latitude: true,
      longitude: true
    }
  })

  return <ResourcesClient resources={resources} query={safeQ} category={category} />
}
