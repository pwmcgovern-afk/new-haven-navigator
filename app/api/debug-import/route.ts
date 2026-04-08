import { PrismaClient } from '@prisma/client'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

// One-time data migration endpoint. Reads from the current DATABASE_URL
// (the locked-out old project) and writes to a target DB passed in the body.
// DELETE THIS ENDPOINT AFTER USE.
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { targetDatabaseUrl, secret } = body

    if (!secret || secret !== process.env.ADMIN_API_KEY) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (!targetDatabaseUrl) {
      return Response.json({ error: 'targetDatabaseUrl required' }, { status: 400 })
    }

    // Create a fresh Prisma client pointing at the target DB
    const target = new PrismaClient({
      datasources: { db: { url: targetDatabaseUrl } }
    })

    // Read from source (current DATABASE_URL = old DB)
    const sourceRows = await prisma.$queryRaw<Record<string, unknown>[]>`
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

    let inserted = 0
    let skipped = 0
    const errors: string[] = []

    for (const r of sourceRows) {
      try {
        // Coerce null array fields to empty arrays
        const categories = (r.categories as string[] | null) || []
        const tips = (r.tips as string[] | null) || []
        const tipsEs = (r.tipsEs as string[] | null) || []

        // Use raw SQL on the target to bypass any Prisma client schema mismatches
        await target.$executeRaw`
          INSERT INTO "Resource" (
            id, name, organization, description, categories,
            address, city, state, zip, latitude, longitude,
            phone, website, email, hours,
            eligibility, "howToApply", tips,
            "nameEs", "descriptionEs", "howToApplyEs", "tipsEs",
            source, "sourceId",
            "verifiedAt", "createdAt", "updatedAt"
          ) VALUES (
            ${r.id as string},
            ${r.name as string},
            ${(r.organization as string | null) || null},
            ${r.description as string},
            ${categories}::text[],
            ${(r.address as string | null) || null},
            ${(r.city as string) || 'New Haven'},
            ${(r.state as string) || 'CT'},
            ${(r.zip as string | null) || null},
            ${(r.latitude as number | null) || null},
            ${(r.longitude as number | null) || null},
            ${(r.phone as string | null) || null},
            ${(r.website as string | null) || null},
            ${(r.email as string | null) || null},
            ${(r.hours as string | null) || null},
            ${r.eligibility ? JSON.stringify(r.eligibility) : null}::jsonb,
            ${(r.howToApply as string | null) || null},
            ${tips}::text[],
            ${(r.nameEs as string | null) || null},
            ${(r.descriptionEs as string | null) || null},
            ${(r.howToApplyEs as string | null) || null},
            ${tipsEs}::text[],
            ${(r.source as string) || 'manual'},
            ${(r.sourceId as string | null) || null},
            ${r.verifiedAt ? new Date(r.verifiedAt as string) : null},
            ${r.createdAt ? new Date(r.createdAt as string) : new Date()},
            ${r.updatedAt ? new Date(r.updatedAt as string) : new Date()}
          )
          ON CONFLICT (id) DO NOTHING
        `
        inserted++
      } catch (e) {
        skipped++
        errors.push(`${r.id}: ${e instanceof Error ? e.message : String(e)}`)
      }
    }

    await target.$disconnect()

    return Response.json({
      sourceCount: sourceRows.length,
      inserted,
      skipped,
      errorCount: errors.length,
      errors: errors.slice(0, 10),
    })
  } catch (e) {
    return Response.json({
      error: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack?.slice(0, 1000) : undefined,
    }, { status: 500 })
  }
}
