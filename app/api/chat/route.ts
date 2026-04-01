import { streamText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { prisma } from '@/lib/db'

// Simple in-memory rate limiter (per-IP, resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 20 // requests per window
const RATE_WINDOW_MS = 60 * 60 * 1000 // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT
}

// Cache resource list in memory (refreshes every hour)
let cachedResources: string | null = null
let cacheExpiry = 0

async function getResourceContext(): Promise<string> {
  const now = Date.now()
  if (cachedResources && now < cacheExpiry) {
    return cachedResources
  }

  const resources = await prisma.resource.findMany({
    select: {
      id: true,
      name: true,
      nameEs: true,
      organization: true,
      description: true,
      descriptionEs: true,
      categories: true,
      phone: true,
      address: true,
      hours: true,
      website: true,
    },
  })

  cachedResources = resources
    .map((r) => {
      const parts = [
        r.id,
        r.name,
        r.nameEs || '',
        r.organization || '',
        r.categories.join(','),
        r.description.slice(0, 200),
        (r.descriptionEs || '').slice(0, 200),
        r.phone || '',
        r.address || '',
        r.hours || '',
      ]
      return parts.join('|')
    })
    .join('\n')

  cacheExpiry = now + 60 * 60 * 1000 // 1 hour
  return cachedResources
}

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('x-real-ip')
      || 'unknown'

    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Parse and validate input
    const body = await req.json()
    const { messages, language = 'en' } = body

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: messages required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (language !== 'en' && language !== 'es') {
      return new Response(
        JSON.stringify({ error: 'Invalid language' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Cap conversation history to prevent unbounded token growth
    const recentMessages = messages.slice(-20)

    const resourceList = await getResourceContext()
    const isSpanish = language === 'es'

    const systemPrompt = `You are a helpful assistant for New Haven Navigator, a social services directory for New Haven, CT residents.

${isSpanish ? 'IMPORTANT: Respond in Spanish. The user has selected Spanish as their language.' : 'Respond in English.'}

RULES:
- Only recommend resources from the database below. Never invent resources.
- Always link to resources using this format: [Resource Name](/resources/RESOURCE_ID)
- Include phone numbers when available.
- For crisis situations (suicidal thoughts, immediate danger), direct to 988 Suicide & Crisis Lifeline or 911.
- Keep responses concise: 2-4 short paragraphs.
- If no matching resource exists, suggest calling 211 for additional help.
- Be warm, direct, and non-judgmental.

RESOURCE DATABASE (id|name|nameEs|org|categories|description|descriptionEs|phone|address|hours):
${resourceList}`

    const result = streamText({
      model: anthropic('claude-sonnet-4-20250514'),
      system: systemPrompt,
      messages: recentMessages,
      maxTokens: 1024,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ error: 'An error occurred processing your request.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
