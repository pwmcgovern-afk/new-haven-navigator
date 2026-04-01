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
  const resource = await prisma.resource.findUnique({
    where: { id: params.id }
  }) as Resource | null

  if (!resource) {
    notFound()
  }

  return <ResourceDetailClient resource={resource} />
}
