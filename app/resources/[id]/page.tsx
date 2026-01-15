import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { CATEGORIES } from '@/lib/constants'
import ShareButton from '@/components/ShareButton'
import type { Resource } from '@/lib/types'

export default async function ResourceDetailPage({
  params
}: {
  params: { id: string }
}) {
  const resource = await prisma.resource.findUnique({
    where: { id: params.id }
  }) as Resource | null

  if (!resource) {
    notFound()
  }

  const getCategoryInfo = (slug: string) => {
    return CATEGORIES.find(c => c.slug === slug)
  }

  const googleMapsUrl = resource.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${resource.address}, ${resource.city}, ${resource.state} ${resource.zip || ''}`
      )}`
    : null

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <Link href="/resources" className="text-gray-600 hover:text-gray-900">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      </div>

      <div className="px-4 py-6">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {resource.categories.map((cat) => {
            const catInfo = getCategoryInfo(cat)
            return (
              <Link
                key={cat}
                href={`/category/${cat}`}
                className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200"
              >
                {catInfo?.icon} {catInfo?.name || cat}
              </Link>
            )
          })}
        </div>

        {/* Name & Organization */}
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{resource.name}</h1>
        {resource.organization && resource.organization !== resource.name && (
          <p className="text-gray-600">{resource.organization}</p>
        )}

        {/* Description */}
        <p className="text-gray-700 mt-4 leading-relaxed">{resource.description}</p>

        {/* Contact Actions */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          {resource.phone && (
            <a
              href={`tel:${resource.phone.replace(/\D/g, '')}`}
              className="btn-primary text-center flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call
            </a>
          )}
          {googleMapsUrl && (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-center flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Directions
            </a>
          )}
        </div>

        {/* Details */}
        <div className="mt-8 space-y-6">
          {/* Address */}
          {resource.address && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Location
              </h2>
              <p className="text-gray-900">
                {resource.address}
                <br />
                {resource.city}, {resource.state} {resource.zip}
              </p>
            </div>
          )}

          {/* Phone */}
          {resource.phone && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Phone
              </h2>
              <a href={`tel:${resource.phone.replace(/\D/g, '')}`} className="text-primary-600">
                {resource.phone}
              </a>
            </div>
          )}

          {/* Hours */}
          {resource.hours && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Hours
              </h2>
              <p className="text-gray-900 whitespace-pre-line">{resource.hours}</p>
            </div>
          )}

          {/* Website */}
          {resource.website && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Website
              </h2>
              <a
                href={resource.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 break-all"
              >
                {resource.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}

          {/* How to Apply */}
          {resource.howToApply && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                How to Get Help
              </h2>
              <p className="text-gray-900 whitespace-pre-line">{resource.howToApply}</p>
            </div>
          )}
        </div>

        {/* Share */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <ShareButton title={resource.name} text={resource.description} />
        </div>

        {/* Data source */}
        <div className="mt-6 text-xs text-gray-400">
          Last verified: {resource.verifiedAt?.toLocaleDateString() || 'Not yet verified'}
          {resource.source !== 'manual' && ` • Source: ${resource.source}`}
        </div>
      </div>
    </div>
  )
}
