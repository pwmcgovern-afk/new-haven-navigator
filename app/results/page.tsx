import { Suspense } from 'react'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { filterAndRankResources, UserProfile, ResourceWithEligibility } from '@/lib/eligibility'
import ResourceCard from '@/components/ResourceCard'
import { CATEGORIES } from '@/lib/constants'

interface SearchParams {
  zip?: string
  household?: string
  income?: string
  housing?: string
  insurance?: string
  populations?: string
  categories?: string
}

async function ResultsContent({ searchParams }: { searchParams: SearchParams }) {
  const userProfile: UserProfile = {
    zipCode: searchParams.zip || '',
    householdSize: parseInt(searchParams.household || '1'),
    monthlyIncome: parseInt(searchParams.income || '0'),
    housingStatus: searchParams.housing || 'housed',
    insuranceStatus: searchParams.insurance || 'uninsured',
    populations: searchParams.populations?.split(',').filter(Boolean) || [],
    categoriesNeeded: searchParams.categories?.split(',').filter(Boolean) || []
  }

  // Fetch all resources
  const dbResources = await prisma.resource.findMany({
    select: {
      id: true,
      name: true,
      organization: true,
      description: true,
      categories: true,
      address: true,
      city: true,
      phone: true,
      website: true,
      eligibility: true,
      howToApply: true
    }
  })

  // Cast to our type (eligibility is stored as JSON)
  const resources: ResourceWithEligibility[] = dbResources.map(r => ({
    ...r,
    eligibility: r.eligibility as ResourceWithEligibility['eligibility']
  }))

  // Filter and rank by eligibility
  const rankedResources = filterAndRankResources(userProfile, resources)

  // Get selected categories for display
  const selectedCategories = userProfile.categoriesNeeded.map(slug =>
    CATEGORIES.find(c => c.slug === slug)
  ).filter(Boolean)

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <Link href="/wizard" className="text-primary-600 text-sm mb-2 inline-flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Edit answers
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Your Resources</h1>
        <p className="text-gray-600">
          {rankedResources.length} resources match your situation
        </p>
      </div>

      {/* Category pills */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedCategories.map((cat) => cat && (
            <span
              key={cat.slug}
              className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full"
            >
              {cat.icon} {cat.name}
            </span>
          ))}
        </div>
      )}

      {/* Results */}
      {rankedResources.length > 0 ? (
        <div className="space-y-4">
          {rankedResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              id={resource.id}
              name={resource.name}
              organization={resource.organization}
              description={resource.description}
              categories={resource.categories}
              phone={resource.phone}
              address={resource.address}
              score={resource.score}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h2>
          <p className="text-gray-600 mb-6">
            Try adjusting your answers or browse all resources
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/wizard" className="btn-secondary">
              Try again
            </Link>
            <Link href="/resources" className="btn-primary">
              Browse all
            </Link>
          </div>
        </div>
      )}

      {/* Call 211 CTA */}
      <div className="mt-8 p-4 bg-gray-100 rounded-2xl text-center">
        <p className="text-sm text-gray-600 mb-2">Need more help?</p>
        <a
          href="tel:211"
          className="text-lg font-semibold text-primary-600 hover:underline"
        >
          Call 211 for personalized assistance
        </a>
      </div>
    </div>
  )
}

export default function ResultsPage({
  searchParams
}: {
  searchParams: SearchParams
}) {
  return (
    <Suspense fallback={
      <div className="px-4 py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-32 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    }>
      <ResultsContent searchParams={searchParams} />
    </Suspense>
  )
}
