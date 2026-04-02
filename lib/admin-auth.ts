import { createHmac, timingSafeEqual } from 'crypto'

const COOKIE_NAME = 'admin_session'
const SESSION_PAYLOAD = 'nhv-navigator-admin-session'

function getAdminKey(): string {
  const key = process.env.ADMIN_API_KEY
  if (!key) throw new Error('ADMIN_API_KEY not configured')
  return key
}

export function createSessionToken(): string {
  const key = getAdminKey()
  return createHmac('sha256', key).update(SESSION_PAYLOAD).digest('hex')
}

export function verifySessionToken(token: string): boolean {
  try {
    const expected = createSessionToken()
    const tokenBuf = Buffer.from(token, 'utf8')
    const expectedBuf = Buffer.from(expected, 'utf8')
    if (tokenBuf.length !== expectedBuf.length) return false
    return timingSafeEqual(tokenBuf, expectedBuf)
  } catch {
    return false
  }
}

export function verifyApiKey(key: string): boolean {
  try {
    const expected = getAdminKey()
    const keyBuf = Buffer.from(key, 'utf8')
    const expectedBuf = Buffer.from(expected, 'utf8')
    if (keyBuf.length !== expectedBuf.length) return false
    return timingSafeEqual(keyBuf, expectedBuf)
  } catch {
    return false
  }
}

// Check request for valid admin auth (cookie or Bearer token)
export function isAdminAuthenticated(req: Request): boolean {
  // Check Bearer token first (for API calls)
  const authHeader = req.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7)
    if (verifyApiKey(token)) return true
  }

  // Check cookie (for browser pages)
  const cookieHeader = req.headers.get('cookie') || ''
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`))
  if (match) {
    return verifySessionToken(match[1])
  }

  return false
}

// For use in API routes — returns 401 Response if not authenticated
export function requireAdmin(req: Request): Response | null {
  if (!isAdminAuthenticated(req)) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }
  return null
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME

export function getAdminCookieOptions(): string {
  const maxAge = 60 * 60 * 24 * 7 // 7 days
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  return `${COOKIE_NAME}=${createSessionToken()}; HttpOnly; SameSite=Strict; Path=/admin; Max-Age=${maxAge}${secure}`
}

export function getClearCookieHeader(): string {
  return `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/admin; Max-Age=0`
}
