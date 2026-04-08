import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const count = await prisma.resource.count()
    const first = await prisma.resource.findMany({
      take: 3,
      select: { id: true, name: true }
    })

    // Try raw SQL with the same ID
    const targetId = '061d9ff2-700e-40b2-8df3-eada3beb9244'
    const rawResult = await prisma.$queryRaw<{ id: string; name: string }[]>(
      Prisma.sql`SELECT id, name FROM "Resource" WHERE id = ${targetId}`
    )

    // Try Prisma findUnique on the same ID
    let findUniqueResult: { id: string; name: string } | null = null
    let findUniqueError: string | null = null
    try {
      findUniqueResult = await prisma.resource.findUnique({
        where: { id: targetId },
        select: { id: true, name: true }
      })
    } catch (e) {
      findUniqueError = e instanceof Error ? e.message : String(e)
    }

    // Extract more details about the connection
    const dbUrl = process.env.DATABASE_URL || ''
    // Pooler URL format: postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-region.pooler.supabase.com:port/postgres
    const projectRefMatch = dbUrl.match(/postgres\.([a-z0-9]+):/)
    const hostMatch = dbUrl.match(/@([^:/]+)/)

    return Response.json({
      databaseHost: hostMatch?.[1] || 'unknown',
      projectRef: projectRefMatch?.[1] || 'unknown',
      count,
      sampleIds: first,
      targetId,
      rawSqlResult: rawResult,
      findUniqueResult,
      findUniqueError,
    })
  } catch (e) {
    return Response.json({
      error: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack : undefined,
    }, { status: 500 })
  }
}
