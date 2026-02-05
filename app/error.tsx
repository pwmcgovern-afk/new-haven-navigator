'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="text-center max-w-sm">
        <div className="text-5xl mb-4" aria-hidden="true">⚠️</div>
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          We had trouble loading this page. Please try again.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-primary">
            Try again
          </button>
          <a href="/" className="btn-secondary">
            Go home
          </a>
        </div>
      </div>
    </div>
  )
}
