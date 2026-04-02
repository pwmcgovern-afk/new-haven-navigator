import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'

const COOKIE_NAME = 'admin_session'
const SESSION_PAYLOAD = 'nhv-navigator-admin-session'

// Inline auth check — can't import from lib in Edge middleware
function isValidAdminSession(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false
  try {
    const key = process.env.ADMIN_API_KEY
    if (!key) return false
    const expected = createHmac('sha256', key).update(SESSION_PAYLOAD).digest('hex')
    const tokenBuf = Buffer.from(cookieValue, 'utf8')
    const expectedBuf = Buffer.from(expected, 'utf8')
    if (tokenBuf.length !== expectedBuf.length) return false
    return timingSafeEqual(tokenBuf, expectedBuf)
  } catch {
    return false
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Admin route protection (except login page and auth API)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionCookie = request.cookies.get(COOKIE_NAME)?.value
    if (!isValidAdminSession(sessionCookie)) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  const response = NextResponse.next()

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)')

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.png|favicon\\.svg|icon-.*\\.png|apple-touch-icon\\.png|manifest\\.json|sw\\.js).*)',
  ],
}
