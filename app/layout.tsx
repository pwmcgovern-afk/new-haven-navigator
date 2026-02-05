import type { Metadata, Viewport } from 'next'
import './globals.css'
import { LanguageProvider } from '@/components/LanguageContext'
import { TrackerProvider } from '@/components/TrackerContext'
import CrisisBanner from '@/components/CrisisBanner'

export const metadata: Metadata = {
  title: 'New Haven Navigator',
  description: 'Find social services, benefits, and resources in New Haven, CT',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#2563eb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <LanguageProvider>
          <TrackerProvider>
            <main className="max-w-lg mx-auto">
              <CrisisBanner />
              {children}
            </main>
          </TrackerProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
