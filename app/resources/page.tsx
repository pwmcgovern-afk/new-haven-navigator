import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/db'
import ResourcesClient from './ResourcesClient'

export const revalidate = 3600

export default async function ResourcesPage({
  searchParams
}: {
  searchParams: {
    q?: string; category?: string; insurance?: string;
    language?: string; accepting?: string
  }
}) {
  const { q, category, insurance, language: langFilter, accepting } = searchParams
  const safeQ = q?.slice(0, 200)

  // Build Prisma where clause for non-FTS filters
  const extraFilters: Prisma.ResourceWhereInput[] = []
  if (category) extraFilters.push({ categories: { has: category } })
  // Note: insurance, language, acceptingClients filters temporarily disabled
  // while Prisma client rebuilds with the expanded Resource schema

  const selectFields = {
    id: true, name: true, nameEs: true, organization: true,
    description: true, descriptionEs: true, categories: true,
    address: true, phone: true, hours: true, latitude: true, longitude: true,
  }

  let resources

  if (safeQ && safeQ.trim().length > 0) {
    const tsQuery = safeQ.trim().split(/\s+/)
      .filter(w => w.length > 1)
      .map(w => w.replace(/[^a-zA-Z0-9áéíóúñü]/g, ''))
      .filter(Boolean)
      .map(w => w + ':*')
      .join(' & ')

    if (tsQuery) {
      // Full-text search — then apply extra filters in Prisma
      const ftsResults = await prisma.$queryRaw`
        SELECT id FROM "Resource"
        WHERE (
          "search_vector" @@ to_tsquery('english', ${tsQuery})
          OR name ILIKE ${'%' + safeQ + '%'}
          OR "nameEs" ILIKE ${'%' + safeQ + '%'}
          OR organization ILIKE ${'%' + safeQ + '%'}
        )
        ORDER BY ts_rank("search_vector", to_tsquery('english', ${tsQuery})) DESC
      ` as { id: string }[]

      const ids = ftsResults.map(r => r.id)

      if (ids.length > 0) {
        resources = await prisma.resource.findMany({
          where: {
            id: { in: ids },
            AND: extraFilters,
          },
          select: selectFields,
        })
        // Preserve FTS ranking order
        const idOrder = new Map(ids.map((id, i) => [id, i]))
        resources.sort((a, b) => (idOrder.get(a.id) ?? 999) - (idOrder.get(b.id) ?? 999))
      } else {
        resources = []
      }
    } else {
      resources = await prisma.resource.findMany({
        where: { AND: extraFilters },
        orderBy: { name: 'asc' },
        select: selectFields,
      })
    }
  } else {
    resources = await prisma.resource.findMany({
      where: extraFilters.length > 0 ? { AND: extraFilters } : {},
      orderBy: { name: 'asc' },
      select: selectFields,
    })
  }

  return <ResourcesClient
    resources={resources}
    query={safeQ}
    category={category}
    insurance={insurance}
    langFilter={langFilter}
    accepting={accepting}
  />
}
