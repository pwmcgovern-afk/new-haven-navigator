import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const targetId = url.searchParams.get('id') || '032f60c5-3539-467a-89c7-6f432b64e287'

    const count = await prisma.resource.count()

    // Try raw SQL the same way the detail page does
    let rawSqlResult: unknown[] = []
    let rawSqlError: string | null = null
    try {
      rawSqlResult = await prisma.$queryRaw`
        SELECT id, name FROM "Resource" WHERE id = ${targetId}
      `
    } catch (e) {
      rawSqlError = e instanceof Error ? e.message : String(e)
    }

    // Try findUnique
    let findUniqueResult: unknown = null
    let findUniqueError: string | null = null
    try {
      findUniqueResult = await prisma.resource.findUnique({
        where: { id: targetId },
        select: { id: true, name: true }
      })
    } catch (e) {
      findUniqueError = e instanceof Error ? e.message : String(e)
    }

    // Try findFirst
    let findFirstResult: unknown = null
    let findFirstError: string | null = null
    try {
      findFirstResult = await prisma.resource.findFirst({
        where: { id: targetId },
        select: { id: true, name: true }
      })
    } catch (e) {
      findFirstError = e instanceof Error ? e.message : String(e)
    }

    const dbUrl = process.env.DATABASE_URL || ''
    const projectRefMatch = dbUrl.match(/postgres\.([a-z0-9]+):/)
    const hostMatch = dbUrl.match(/@([^:/]+)/)

    return Response.json({
      databaseHost: hostMatch?.[1] || 'unknown',
      projectRef: projectRefMatch?.[1] || 'unknown',
      count,
      targetId,
      rawSqlResult,
      rawSqlError,
      findUniqueResult,
      findUniqueError,
      findFirstResult,
      findFirstError,
    })
  } catch (e) {
    return Response.json({
      error: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack : undefined,
    }, { status: 500 })
  }
}
