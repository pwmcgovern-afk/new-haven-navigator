'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'

const categories = {
  en: [
    { name: 'Housing', slug: 'housing', icon: '🏠', description: 'Shelter, rent help, Section 8', ariaLabel: 'Housing resources including shelter, rent help, and Section 8' },
    { name: 'Food', slug: 'food', icon: '🍎', description: 'Food pantries, SNAP, meals', ariaLabel: 'Food resources including food pantries, SNAP, and meals' },
    { name: 'Cash', slug: 'cash', icon: '💵', description: 'Emergency funds, TANF', ariaLabel: 'Cash assistance including emergency funds and TANF' },
    { name: 'Harm Reduction', slug: 'harm-reduction', icon: '💊', description: 'Narcan, syringe services', ariaLabel: 'Harm reduction services including Narcan and syringe services' },
    { name: 'Healthcare', slug: 'healthcare', icon: '🏥', description: 'Free clinics, Medicaid', ariaLabel: 'Healthcare resources including free clinics and Medicaid' },
    { name: 'Mental Health', slug: 'mental-health', icon: '🧠', description: 'Counseling, crisis support', ariaLabel: 'Mental health resources including counseling and crisis support' },
    { name: 'Jobs', slug: 'employment', icon: '💼', description: 'Job training, employment', ariaLabel: 'Employment resources including job training' },
    { name: 'Childcare', slug: 'childcare', icon: '👶', description: 'Head Start, subsidized care', ariaLabel: 'Childcare resources including Head Start and subsidized care' },
    { name: 'Legal Aid', slug: 'legal', icon: '⚖️', description: 'Eviction defense, expungement', ariaLabel: 'Legal aid including eviction defense and expungement' },
    { name: 'Transportation', slug: 'transportation', icon: '🚌', description: 'Bus passes, medical rides', ariaLabel: 'Transportation resources including bus passes and medical rides' },
    { name: 'Utilities', slug: 'utilities', icon: '💡', description: 'LIHEAP, bill assistance', ariaLabel: 'Utility assistance including LIHEAP and bill help' },
    { name: 'Immigration', slug: 'immigration', icon: '📄', description: 'Legal services, asylum', ariaLabel: 'Immigration resources including legal services and asylum help' },
  ],
  es: [
    { name: 'Vivienda', slug: 'housing', icon: '🏠', description: 'Refugio, ayuda con alquiler', ariaLabel: 'Recursos de vivienda incluyendo refugio y ayuda con alquiler' },
    { name: 'Comida', slug: 'food', icon: '🍎', description: 'Despensas, SNAP, comidas', ariaLabel: 'Recursos de comida incluyendo despensas y SNAP' },
    { name: 'Efectivo', slug: 'cash', icon: '💵', description: 'Fondos de emergencia, TANF', ariaLabel: 'Asistencia de efectivo incluyendo fondos de emergencia' },
    { name: 'Reducción de Daños', slug: 'harm-reduction', icon: '💊', description: 'Narcan, servicios de jeringas', ariaLabel: 'Servicios de reducción de daños incluyendo Narcan' },
    { name: 'Salud', slug: 'healthcare', icon: '🏥', description: 'Clínicas gratis, Medicaid', ariaLabel: 'Recursos de salud incluyendo clínicas gratis' },
    { name: 'Salud Mental', slug: 'mental-health', icon: '🧠', description: 'Consejería, apoyo en crisis', ariaLabel: 'Recursos de salud mental incluyendo consejería' },
    { name: 'Empleo', slug: 'employment', icon: '💼', description: 'Capacitación, trabajo', ariaLabel: 'Recursos de empleo incluyendo capacitación' },
    { name: 'Cuidado Infantil', slug: 'childcare', icon: '👶', description: 'Head Start, subsidios', ariaLabel: 'Recursos de cuidado infantil incluyendo Head Start' },
    { name: 'Ayuda Legal', slug: 'legal', icon: '⚖️', description: 'Defensa contra desalojo', ariaLabel: 'Ayuda legal incluyendo defensa contra desalojo' },
    { name: 'Transporte', slug: 'transportation', icon: '🚌', description: 'Pases de autobús, viajes', ariaLabel: 'Recursos de transporte incluyendo pases de autobús' },
    { name: 'Servicios', slug: 'utilities', icon: '💡', description: 'LIHEAP, ayuda con facturas', ariaLabel: 'Asistencia de servicios públicos incluyendo LIHEAP' },
    { name: 'Inmigración', slug: 'immigration', icon: '📄', description: 'Servicios legales, asilo', ariaLabel: 'Recursos de inmigración incluyendo servicios legales' },
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
    call211Label: 'Call 2-1-1 for free help finding services',
    skipToMain: 'Skip to main content',
    footer1: 'A community resource for New Haven residents',
    footer2: 'Not affiliated with any government agency',
    needHelp: 'Need personalized help?',
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
    call211Label: 'Llame al 2-1-1 para ayuda gratuita',
    skipToMain: 'Saltar al contenido principal',
    footer1: 'Un recurso comunitario para residentes de New Haven',
    footer2: 'No está afiliado a ninguna agencia gubernamental',
    needHelp: '¿Necesita ayuda personalizada?',
  }
}

export default function Home() {
  const { language } = useLanguage()
  const t = content[language]
  const cats = categories[language]

  return (
    <div className="min-h-screen">
      {/* Skip Link for keyboard users */}
      <a href="#main-content" className="skip-link">
        {t.skipToMain}
      </a>

      {/* Header */}
      <header className="px-5 py-5 flex items-center justify-between" role="banner">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
            {t.title}
          </h1>
        </div>
        <LanguageToggle />
      </header>

      <main id="main-content" className="px-5 pb-8" role="main">
        {/* Hero Card */}
        <Link
          href="/wizard"
          className="block mb-10 fade-in"
          aria-label={language === 'en' ? 'Start the resource finder wizard' : 'Iniciar el asistente de búsqueda de recursos'}
        >
          <div className="hero-card">
            <div className="text-4xl mb-4" aria-hidden="true">&#10024;</div>
            <h2 className="text-2xl font-bold mb-3">{t.heroTitle}</h2>
            <p className="mb-8 text-base leading-relaxed" style={{ opacity: 0.95 }}>{t.heroSubtitle}</p>
            <span className="inline-flex items-center gap-3 bg-white/20 px-6 py-3 rounded-2xl text-base font-semibold">
              {t.heroButton}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </Link>

        {/* Browse by Category */}
        <section className="mb-8" aria-labelledby="browse-heading">
          <h2 id="browse-heading" className="text-lg font-semibold mb-5 fade-in">{t.browseTitle}</h2>
          <nav aria-label={language === 'en' ? 'Resource categories' : 'Categorías de recursos'}>
            <ul className="grid grid-cols-2 gap-4 stagger-children" role="list">
              {cats.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="card block h-full"
                    aria-label={category.ariaLabel}
                  >
                    <div className="text-3xl mb-3" aria-hidden="true">{category.icon}</div>
                    <h3 className="font-semibold text-[15px] mb-1">{category.name}</h3>
                    <p className="text-sm leading-snug" style={{ color: 'var(--color-text-secondary)' }}>
                      {category.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        {/* CTA Section */}
        <section className="cta-card space-y-4 slide-up" aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="sr-only">
            {language === 'en' ? 'Get help' : 'Obtener ayuda'}
          </h2>
          <p className="text-base font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            {t.needHelp}
          </p>
          <a
            href="tel:211"
            className="btn-phone w-full"
            aria-label={t.call211Label}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {t.call211}
          </a>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link href="/resources" className="btn-outline-lg">
              {t.viewAll}
            </Link>
            <Link href="/tracker" className="btn-outline-lg">
              {t.myTracker}
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-5 py-6 border-t text-center text-sm" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }} role="contentinfo">
        <p>{t.footer1}</p>
        <p className="mt-1">{t.footer2}</p>
      </footer>
    </div>
  )
}
