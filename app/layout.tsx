import type { Metadata, Viewport } from 'next'
import './globals.css'
import { LanguageProvider } from '@/components/LanguageContext'
import { TrackerProvider } from '@/components/TrackerContext'
import CrisisBanner from '@/components/CrisisBanner'
import AppFooter from '@/components/AppFooter'
import ChatWidget from '@/components/ChatWidget'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'
import { Analytics } from '@vercel/analytics/react'
import PageViewTracker from '@/components/PageViewTracker'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    description: '192 bilingual resources to help New Haven residents find food, housing, healthcare, and more.',
    url: 'https://www.nhvnavigator.com',
    siteName: 'New Haven Navigator',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://www.nhvnavigator.com/og-image.png',
      width: 1200,
      height: 630,
      alt: 'New Haven Navigator — Find resources to help you thrive',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Haven Navigator',
    description: '192 bilingual resources to help New Haven residents find food, housing, healthcare, and more.',
    images: ['https://www.nhvnavigator.com/og-image.png'],
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
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen">
        <LanguageProvider>
          <TrackerProvider>
            <main className="max-w-lg mx-auto">
              <CrisisBanner />
              {children}
              <AppFooter />
            </main>
            <ChatWidget />
            <ServiceWorkerRegistration />
          </TrackerProvider>
          <Analytics />
          <PageViewTracker />
        </LanguageProvider>
      </body>
    </html>
  )
}
