import Link from 'next/link'
import { prisma } from '@/lib/db'
import ResourceCard from '@/components/ResourceCard'
import { CATEGORIES } from '@/lib/constants'
import type { ResourceListItem } from '@/lib/types'

export default async function ResourcesPage({
  searchParams
}: {
  searchParams: { q?: string; category?: string }
}) {
  const { q, category } = searchParams

  const resources: ResourceListItem[] = await prisma.resource.findMany({
    where: {
      AND: [
        q ? {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
            { organization: { contains: q, mode: 'insensitive' } }
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
      organization: true,
      description: true,
      categories: true,
      address: true,
      phone: true
    }
  })

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">All Resources</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Search */}
        <form action="/resources" method="GET" className="mb-6">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search resources..."
              className="input pl-12"
            />
          </div>
          {category && <input type="hidden" name="category" value={category} />}
        </form>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 -mx-4 px-4">
          <Link
            href="/resources"
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm transition-colors ${
              !category
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/resources?category=${cat.slug}${q ? `&q=${q}` : ''}`}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm transition-colors ${
                category === cat.slug
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600 mb-4">
          {resources.length} resource{resources.length !== 1 ? 's' : ''}
          {q && ` for "${q}"`}
          {category && ` in ${CATEGORIES.find(c => c.slug === category)?.name}`}
        </p>

        {/* Results */}
        {resources.length > 0 ? (
          <div className="space-y-4">
            {resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                id={resource.id}
                name={resource.name}
                organization={resource.organization}
                description={resource.description}
                categories={resource.categories}
                phone={resource.phone}
                address={resource.address}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h2>
            <p className="text-gray-600">
              Try a different search term or category
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
