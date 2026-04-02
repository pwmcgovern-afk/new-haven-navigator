import { verifyApiKey, getAdminCookieOptions, getClearCookieHeader } from '@/lib/admin-auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { apiKey } = body

    if (!apiKey || !verifyApiKey(apiKey)) {
      return new Response(
        JSON.stringify({ error: 'Invalid API key' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': getAdminCookieOptions(),
        },
      }
    )
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid request' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function DELETE() {
  return new Response(
    JSON.stringify({ success: true }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': getClearCookieHeader(),
      },
    }
  )
}
