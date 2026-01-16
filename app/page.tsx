'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'

const categories = {
  en: [
    { name: 'Housing', slug: 'housing', icon: '🏠', description: 'Shelter, rent help, Section 8' },
    { name: 'Food', slug: 'food', icon: '🍎', description: 'Food pantries, SNAP, meals' },
    { name: 'Cash', slug: 'cash', icon: '💵', description: 'Emergency funds, TANF' },
    { name: 'Harm Reduction', slug: 'harm-reduction', icon: '💊', description: 'Narcan, syringe services' },
    { name: 'Healthcare', slug: 'healthcare', icon: '🏥', description: 'Free clinics, Medicaid' },
    { name: 'Mental Health', slug: 'mental-health', icon: '🧠', description: 'Counseling, crisis support' },
    { name: 'Jobs', slug: 'employment', icon: '💼', description: 'Job training, employment' },
    { name: 'Childcare', slug: 'childcare', icon: '👶', description: 'Head Start, subsidized care' },
    { name: 'Legal Aid', slug: 'legal', icon: '⚖️', description: 'Eviction defense, expungement' },
    { name: 'Transportation', slug: 'transportation', icon: '🚌', description: 'Bus passes, medical rides' },
    { name: 'Utilities', slug: 'utilities', icon: '💡', description: 'LIHEAP, bill assistance' },
    { name: 'Immigration', slug: 'immigration', icon: '📄', description: 'Legal services, asylum' },
  ],
  es: [
    { name: 'Vivienda', slug: 'housing', icon: '🏠', description: 'Refugio, ayuda con alquiler' },
    { name: 'Comida', slug: 'food', icon: '🍎', description: 'Despensas, SNAP, comidas' },
    { name: 'Efectivo', slug: 'cash', icon: '💵', description: 'Fondos de emergencia, TANF' },
    { name: 'Reducción de Daños', slug: 'harm-reduction', icon: '💊', description: 'Narcan, servicios de jeringas' },
    { name: 'Salud', slug: 'healthcare', icon: '🏥', description: 'Clínicas gratis, Medicaid' },
    { name: 'Salud Mental', slug: 'mental-health', icon: '🧠', description: 'Consejería, apoyo en crisis' },
    { name: 'Empleo', slug: 'employment', icon: '💼', description: 'Capacitación, trabajo' },
    { name: 'Cuidado Infantil', slug: 'childcare', icon: '👶', description: 'Head Start, subsidios' },
    { name: 'Ayuda Legal', slug: 'legal', icon: '⚖️', description: 'Defensa contra desalojo' },
    { name: 'Transporte', slug: 'transportation', icon: '🚌', description: 'Pases de autobús, viajes' },
    { name: 'Servicios', slug: 'utilities', icon: '💡', description: 'LIHEAP, ayuda con facturas' },
    { name: 'Inmigración', slug: 'immigration', icon: '📄', description: 'Servicios legales, asilo' },
  ]
}

const content = {
  en: {
    title: 'New Haven Navigator',
    subtitle: 'Find resources to help you thrive',
    heroTitle: 'Find the Right Help for You',
    heroSubtitle: 'Answer a few questions to discover resources you may qualify for',
    heroButton: 'Get Started',
    browseTitle: 'Browse by Category',
    viewAll: 'View all resources',
    myTracker: 'My Tracker',
    call211: 'Call 211',
    footer1: 'A community resource for New Haven residents',
    footer2: 'Not affiliated with any government agency',
  },
  es: {
    title: 'Navegador de New Haven',
    subtitle: 'Encuentre recursos para prosperar',
    heroTitle: 'Encuentre la Ayuda Correcta',
    heroSubtitle: 'Responda algunas preguntas para descubrir recursos para los que puede calificar',
    heroButton: 'Comenzar',
    browseTitle: 'Buscar por Categoría',
    viewAll: 'Ver todos los recursos',
    myTracker: 'Mi Seguimiento',
    call211: 'Llamar al 211',
    footer1: 'Un recurso comunitario para residentes de New Haven',
    footer2: 'No está afiliado a ninguna agencia gubernamental',
  }
}

export default function Home() {
  const { language } = useLanguage()
  const t = content[language]
  const cats = categories[language]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="px-5 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gradient">{t.title}</h1>
        </div>
        <LanguageToggle />
      </header>

      <main className="px-5 pb-8">
        {/* Hero Card */}
        <Link href="/wizard" className="block mb-10 fade-in">
          <div className="hero-card pulse-glow">
            <div className="text-4xl mb-4">&#10024;</div>
            <h2 className="text-2xl font-bold mb-3">{t.heroTitle}</h2>
            <p className="opacity-90 mb-8 text-base leading-relaxed">{t.heroSubtitle}</p>
            <span className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl text-base font-semibold shadow-lg hover:bg-white/30 transition-all duration-300">
              {t.heroButton}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </Link>

        {/* Browse by Category */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-5 fade-in">{t.browseTitle}</h2>
          <div className="grid grid-cols-2 gap-4 stagger-children">
            {cats.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="card group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                <h3 className="font-semibold text-[15px] mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500 leading-snug">{category.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="cta-card space-y-4 slide-up">
          <p className="text-base text-gray-600 mb-4 font-medium">
            {language === 'en' ? 'Need personalized help?' : '¿Necesita ayuda personalizada?'}
          </p>
          <a href="tel:211" className="btn-phone w-full">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {t.call211}
          </a>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link href="/resources" className="btn-outline-lg">
              <span className="relative z-10">{t.viewAll}</span>
            </Link>
            <Link href="/tracker" className="btn-outline-lg">
              <span className="relative z-10">{t.myTracker}</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-5 py-6 border-t border-[hsl(var(--color-border))] text-center text-xs text-gray-500">
        <p>{t.footer1}</p>
        <p className="mt-1">{t.footer2}</p>
      </footer>
    </div>
  )
}
