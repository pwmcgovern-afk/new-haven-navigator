import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="text-center max-w-sm">
        <div className="text-5xl mb-4" aria-hidden="true">🔍</div>
        <h1 className="text-2xl font-bold mb-2">Page not found</h1>
        <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Go home
          </Link>
          <Link href="/resources" className="btn-secondary">
            Browse resources
          </Link>
        </div>
      </div>
    </div>
  )
}
