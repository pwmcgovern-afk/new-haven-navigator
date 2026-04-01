import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { resourceId, helpful } = body

    if (!resourceId || typeof helpful !== 'boolean') {
      return new Response(
        JSON.stringify({ error: 'Invalid request: resourceId and helpful required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    await prisma.feedback.create({
      data: { resourceId, helpful }
    })

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Feedback API error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to save feedback' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
