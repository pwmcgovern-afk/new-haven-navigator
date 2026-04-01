import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/db'
import ResourcesClient from './ResourcesClient'

// Revalidate resource list every hour
export const revalidate = 3600

export default async function ResourcesPage({
  searchParams
}: {
  searchParams: { q?: string; category?: string }
}) {
  const { q, category } = searchParams
  const safeQ = q?.slice(0, 200)

  let resources

  if (safeQ && safeQ.trim().length > 0) {
    // Build tsquery from search terms with prefix matching
    const tsQuery = safeQ
      .trim()
      .split(/\s+/)
      .filter(w => w.length > 1)
      .map(w => w.replace(/[^a-zA-Z0-9áéíóúñü]/g, ''))
      .filter(Boolean)
      .map(w => w + ':*')
      .join(' & ')

    if (tsQuery) {
      // Full-text search with ILIKE fallback for partial/accent matches
      const categoryFilter = category
        ? Prisma.sql`AND ${category} = ANY(categories)`
        : Prisma.empty

      resources = await prisma.$queryRaw`
        SELECT id, name, "nameEs", organization, description, "descriptionEs",
               categories, address, phone, hours, latitude, longitude
        FROM "Resource"
        WHERE (
          "search_vector" @@ to_tsquery('english', ${tsQuery})
          OR name ILIKE ${'%' + safeQ + '%'}
          OR "nameEs" ILIKE ${'%' + safeQ + '%'}
          OR organization ILIKE ${'%' + safeQ + '%'}
        )
        ${categoryFilter}
        ORDER BY
          ts_rank("search_vector", to_tsquery('english', ${tsQuery})) DESC,
          name ASC
      `
    } else {
      resources = await prisma.resource.findMany({
        where: category ? { categories: { has: category } } : {},
        orderBy: { name: 'asc' },
        select: {
          id: true, name: true, nameEs: true, organization: true,
          description: true, descriptionEs: true, categories: true,
          address: true, phone: true, hours: true, latitude: true, longitude: true
        }
      })
    }
  } else {
    resources = await prisma.resource.findMany({
      where: category ? { categories: { has: category } } : {},
      orderBy: { name: 'asc' },
      select: {
        id: true, name: true, nameEs: true, organization: true,
        description: true, descriptionEs: true, categories: true,
        address: true, phone: true, hours: true, latitude: true, longitude: true
      }
    })
  }

  return <ResourcesClient resources={resources as any[]} query={safeQ} category={category} />
}
