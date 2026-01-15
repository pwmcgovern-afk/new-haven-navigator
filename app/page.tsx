import Link from 'next/link'

const categories = [
  { name: 'Housing', slug: 'housing', icon: '🏠', description: 'Shelter, rent help, Section 8' },
  { name: 'Food', slug: 'food', icon: '🍎', description: 'Food pantries, SNAP, meals' },
  { name: 'Cash Assistance', slug: 'cash', icon: '💵', description: 'Emergency funds, TANF' },
  { name: 'Harm Reduction', slug: 'harm-reduction', icon: '💊', description: 'Narcan, syringe exchange' },
  { name: 'Healthcare', slug: 'healthcare', icon: '🏥', description: 'Free clinics, Medicaid' },
  { name: 'Mental Health', slug: 'mental-health', icon: '🧠', description: 'Counseling, crisis support' },
  { name: 'Jobs', slug: 'employment', icon: '💼', description: 'Job training, employment' },
  { name: 'Childcare', slug: 'childcare', icon: '👶', description: 'Head Start, subsidized care' },
  { name: 'Legal Aid', slug: 'legal', icon: '⚖️', description: 'Eviction defense, expungement' },
  { name: 'Transportation', slug: 'transportation', icon: '🚌', description: 'Bus passes, rides' },
  { name: 'Utilities', slug: 'utilities', icon: '💡', description: 'LIHEAP, bill assistance' },
  { name: 'Immigration', slug: 'immigration', icon: '📄', description: 'Legal services, asylum' },
]

export default function Home() {
  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          New Haven Navigator
        </h1>
        <p className="text-gray-600">
          Find help with housing, food, healthcare, and more
        </p>
      </div>

      {/* Main CTA - Eligibility Wizard */}
      <Link href="/wizard" className="block mb-8">
        <div className="bg-primary-600 text-white rounded-2xl p-6 text-center shadow-lg hover:bg-primary-700 transition-colors">
          <div className="text-3xl mb-2">✨</div>
          <h2 className="text-xl font-semibold mb-2">Find Resources For You</h2>
          <p className="text-primary-100 text-sm">
            Answer a few questions to see what you qualify for
          </p>
          <div className="mt-4 inline-flex items-center text-sm font-medium">
            Get Started
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>

      {/* Browse by Category */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Or browse by category
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="card hover:border-primary-200 hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <h3 className="font-medium text-gray-900">{category.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex gap-4 text-sm">
          <Link href="/resources" className="text-primary-600 hover:underline">
            View all resources
          </Link>
          <a href="tel:211" className="text-primary-600 hover:underline">
            Call 211
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
        <p>A community resource for New Haven residents</p>
        <p className="mt-1">Not affiliated with any government agency</p>
      </footer>
    </div>
  )
}
