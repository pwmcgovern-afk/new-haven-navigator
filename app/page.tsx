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
      <header className="px-5 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{t.title}</h1>
        </div>
        <LanguageToggle />
      </header>

      <main className="px-5 pb-8">
        {/* Hero Card */}
        <Link href="/wizard" className="block mb-8 fade-in">
          <div className="hero-card">
            <h2 className="text-2xl font-semibold mb-2">{t.heroTitle}</h2>
            <p className="opacity-90 mb-6 text-sm">{t.heroSubtitle}</p>
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-5 py-2.5 rounded-full text-sm font-medium">
              {t.heroButton}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </Link>

        {/* Browse by Category */}
        <section className="mb-8 slide-up">
          <h2 className="text-lg font-semibold mb-4">{t.browseTitle}</h2>
          <div className="grid grid-cols-2 gap-3">
            {cats.map((category, i) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="card"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-medium text-[15px]">{category.name}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{category.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <div className="flex gap-4 text-sm font-medium">
          <Link href="/resources" className="text-[hsl(var(--color-primary))] hover:underline">
            {t.viewAll}
          </Link>
          <a href="tel:211" className="text-[hsl(var(--color-primary))] hover:underline">
            {t.call211}
          </a>
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
