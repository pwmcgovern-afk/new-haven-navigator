import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import type { Resource } from '@/lib/types'
import ResourceDetailClient from './ResourceDetailClient'

// Force dynamic rendering — no ISR caching that could mask DB issues
export const dynamic = 'force-dynamic'

// UUID validation to prevent SQL injection in raw query
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

type RawResource = {
  id: string
  name: string
  organization: string | null
  description: string
  categories: string[]
  address: string | null
  city: string
  state: string
  zip: string | null
  latitude: number | null
  longitude: number | null
  phone: string | null
  website: string | null
  email: string | null
  hours: string | null
  eligibility: unknown
  howToApply: string | null
  tips: string[] | null
  nameEs: string | null
  descriptionEs: string | null
  howToApplyEs: string | null
  tipsEs: string[] | null
  source: string
  sourceId: string | null
  verifiedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export default async function ResourceDetailPage({
  params
}: {
  params: { id: string }
}) {
  // Validate ID format before SQL query
  if (!UUID_RE.test(params.id)) {
    notFound()
  }

  // Use raw SQL to bypass any Prisma client deserialization issues with
  // expanded schema fields. Explicitly excludes search_vector tsvector.
  const rows = await prisma.$queryRaw<RawResource[]>`
    SELECT
      id, name, organization, description, categories,
      address, city, state, zip, latitude, longitude,
      phone, website, email, hours,
      eligibility, "howToApply", tips,
      "nameEs", "descriptionEs", "howToApplyEs", "tipsEs",
      source, "sourceId", "verifiedAt", "createdAt", "updatedAt"
    FROM "Resource"
    WHERE id = ${params.id}::text
    LIMIT 1
  `

  if (!rows || rows.length === 0) {
    notFound()
  }

  const row = rows[0]
  const resource = {
    ...row,
    tips: row.tips || [],
    tipsEs: row.tipsEs || [],
  } as unknown as Resource

  return <ResourceDetailClient resource={resource} />
}
