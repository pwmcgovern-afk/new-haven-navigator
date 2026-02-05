import type { Metadata, Viewport } from 'next'
import './globals.css'
import { LanguageProvider } from '@/components/LanguageContext'
import { TrackerProvider } from '@/components/TrackerContext'
import CrisisBanner from '@/components/CrisisBanner'
import AppFooter from '@/components/AppFooter'
import ChatWidget from '@/components/ChatWidget'

export const metadata: Metadata = {
  title: 'New Haven Navigator',
  description: 'Find social services, benefits, and resources in New Haven, CT',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'New Haven Navigator',
    description: 'Find social services, benefits, and resources in New Haven, CT',
    url: 'https://new-haven-navigator.vercel.app',
    siteName: 'New Haven Navigator',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'New Haven Navigator',
    description: 'Find social services, benefits, and resources in New Haven, CT',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0D6E6E',
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
              <AppFooter />
            </main>
            <ChatWidget />
          </TrackerProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
