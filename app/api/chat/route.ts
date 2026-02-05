import { streamText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  const { messages, language = 'en' } = await req.json()

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

  const resourceList = resources
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
    messages,
    maxTokens: 1024,
  })

  return result.toDataStreamResponse()
}
