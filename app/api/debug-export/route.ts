import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

// Helper: coerce null array fields to empty arrays so the data is import-ready
function normalizeArrays<T extends Record<string, unknown>>(row: T, arrayFields: string[]): T {
  const out = { ...row } as Record<string, unknown>
  for (const f of arrayFields) {
    if (out[f] === null || out[f] === undefined) out[f] = []
  }
  return out as T
}

export async function GET() {
  try {
    // Use raw SQL for everything to bypass any Prisma deserialization issues
    // with the expanded schema fields and the search_vector tsvector column.

    // The production DB has the OLD schema — no healthcare-specific columns.
    // Only select columns we know exist there.
    const resources = await prisma.$queryRaw<Record<string, unknown>[]>`
      SELECT
        id, name, organization, description, categories,
        address, city, state, zip, latitude, longitude,
        phone, website, email, hours,
        eligibility, "howToApply", tips,
        "nameEs", "descriptionEs", "howToApplyEs", "tipsEs",
        source, "sourceId",
        "verifiedAt", "createdAt", "updatedAt"
      FROM "Resource"
    `

    const categories = await prisma.$queryRaw<Record<string, unknown>[]>`
      SELECT id, name, slug, description, icon, "displayOrder" FROM "Category"
    `

    let feedback: Record<string, unknown>[] = []
    try {
      feedback = await prisma.$queryRaw<Record<string, unknown>[]>`
        SELECT id, "resourceId", helpful, "createdAt" FROM "Feedback"
      `
    } catch {
      // table may not exist on old DB
    }

    let anonymousUsers: Record<string, unknown>[] = []
    try {
      anonymousUsers = await prisma.$queryRaw<Record<string, unknown>[]>`
        SELECT id, token, "createdAt" FROM "AnonymousUser"
      `
    } catch {}

    let trackerEntries: Record<string, unknown>[] = []
    try {
      trackerEntries = await prisma.$queryRaw<Record<string, unknown>[]>`
        SELECT id, "userId", "resourceId", "resourceName", "resourceNameEs",
               "organizationName", status, outcome, "contactPerson",
               "dateContacted", notes, "createdAt", "updatedAt"
        FROM "TrackerEntry"
      `
    } catch {}

    let suggestions: Record<string, unknown>[] = []
    try {
      suggestions = await prisma.$queryRaw<Record<string, unknown>[]>`
        SELECT id, "resourceId", type, "submitterName", "submitterEmail",
               "submitterOrg", changes, status, "adminNotes",
               "createdAt", "reviewedAt"
        FROM "Suggestion"
      `
    } catch {}

    // Normalize null array fields on resources so they can be inserted into
    // the new DB which has NOT NULL constraints
    const normalizedResources = resources.map(r =>
      normalizeArrays(r, ['categories', 'tips', 'tipsEs', 'languages', 'insuranceAccepted'])
    )

    return Response.json({
      exportedAt: new Date().toISOString(),
      counts: {
        resources: normalizedResources.length,
        categories: categories.length,
        feedback: feedback.length,
        anonymousUsers: anonymousUsers.length,
        trackerEntries: trackerEntries.length,
        suggestions: suggestions.length,
      },
      resources: normalizedResources,
      categories,
      feedback,
      anonymousUsers,
      trackerEntries,
      suggestions,
    })
  } catch (e) {
    return Response.json({
      error: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack : undefined,
    }, { status: 500 })
  }
}
