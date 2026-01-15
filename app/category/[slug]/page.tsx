import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import ResourceCard from '@/components/ResourceCard'
import { CATEGORIES } from '@/lib/constants'
import type { ResourceListItem } from '@/lib/types'

export default async function CategoryPage({
  params
}: {
  params: { slug: string }
}) {
  const category = CATEGORIES.find(c => c.slug === params.slug)

  if (!category) {
    notFound()
  }

  const resources: ResourceListItem[] = await prisma.resource.findMany({
    where: {
      categories: { has: params.slug }
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
          <div>
            <span className="text-2xl">{category.icon}</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">{category.name}</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Results count */}
        <p className="text-sm text-gray-600 mb-4">
          {resources.length} resource{resources.length !== 1 ? 's' : ''} in {category.name}
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
            <div className="text-4xl mb-4">{category.icon}</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No resources yet</h2>
            <p className="text-gray-600 mb-6">
              We're still adding {category.name.toLowerCase()} resources
            </p>
            <Link href="/resources" className="btn-secondary">
              Browse all resources
            </Link>
          </div>
        )}

        {/* Call 211 CTA */}
        <div className="mt-8 p-4 bg-gray-100 rounded-2xl text-center">
          <p className="text-sm text-gray-600 mb-2">
            Need help finding {category.name.toLowerCase()} resources?
          </p>
          <a
            href="tel:211"
            className="text-lg font-semibold text-primary-600 hover:underline"
          >
            Call 211
          </a>
        </div>
      </div>
    </div>
  )
}
