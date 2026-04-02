import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Admin — New Haven Navigator',
  robots: 'noindex, nofollow',
}

function AdminNav() {
  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/admin" className="font-bold text-lg">NHV Admin</a>
          <div className="flex gap-4 text-sm">
            <a href="/admin" className="text-gray-300 hover:text-white transition-colors">Dashboard</a>
            <a href="/admin/resources" className="text-gray-300 hover:text-white transition-colors">Resources</a>
            <a href="/admin/feedback" className="text-gray-300 hover:text-white transition-colors">Feedback</a>
            <a href="/admin/imports" className="text-gray-300 hover:text-white transition-colors">Imports</a>
            <a href="/admin/suggestions" className="text-gray-300 hover:text-white transition-colors">Suggestions</a>
            <a href="/admin/usage" className="text-gray-300 hover:text-white transition-colors">Usage</a>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <a href="/" className="text-gray-400 hover:text-gray-200 transition-colors">View Site</a>
          <LogoutButton />
        </div>
      </div>
    </nav>
  )
}

function LogoutButton() {
  return (
    <form action="/api/admin/auth" method="POST">
      <button
        type="submit"
        className="text-gray-400 hover:text-red-400 transition-colors"
        onClick={async (e) => {
          e.preventDefault()
          await fetch('/api/admin/auth', { method: 'DELETE' })
          window.location.href = '/admin/login'
        }}
      >
        Logout
      </button>
    </form>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <AdminNav />
        <main className="max-w-6xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
