import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import type { Resource } from '@/lib/types'
import ResourceDetailClient from './ResourceDetailClient'

// Revalidate detail pages every 30 minutes
export const revalidate = 1800

export default async function ResourceDetailPage({
  params
}: {
  params: { id: string }
}) {
  // Explicit select to exclude the Unsupported tsvector search_vector column
  const resource = await prisma.resource.findUnique({
    where: { id: params.id },
    select: {
      id: true, name: true, organization: true, description: true,
      categories: true, address: true, city: true, state: true, zip: true,
      latitude: true, longitude: true, phone: true, website: true, email: true,
      hours: true, eligibility: true, howToApply: true, tips: true,
      nameEs: true, descriptionEs: true, howToApplyEs: true, tipsEs: true,
      source: true, sourceId: true, verifiedAt: true,
      createdAt: true, updatedAt: true,
    }
  }) as Resource | null

  if (!resource) {
    notFound()
  }

  return <ResourceDetailClient resource={resource} />
}
