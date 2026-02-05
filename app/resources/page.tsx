import { prisma } from '@/lib/db'
import type { ResourceListItem } from '@/lib/types'
import ResourcesClient from './ResourcesClient'

export default async function ResourcesPage({
  searchParams
}: {
  searchParams: { q?: string; category?: string }
}) {
  const { q, category } = searchParams

  const resources = await prisma.resource.findMany({
    where: {
      AND: [
        q ? {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
            { organization: { contains: q, mode: 'insensitive' } },
            { categories: { has: q.toLowerCase() } },
            { address: { contains: q, mode: 'insensitive' } },
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
      hours: true
    }
  })

  return <ResourcesClient resources={resources} query={q} category={category} />
}
