'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'
import { getCategoriesWithDetails } from '@/lib/categories'

const content = {
  en: {
    title: 'New Haven Navigator',
    heroTitle: 'Find help in\nNew Haven',
    heroSubtitle: 'Free, bilingual directory of 192 social services — food, housing, healthcare, legal aid, and more.',
    heroButton: 'Find Resources for Me',
    browseAll: 'Browse All Resources',
    browseTitle: 'Browse by Category',
    call211: 'Call 211',
    call211Sub: 'Free help finding services, 24/7',
    skipToMain: 'Skip to main content',
    footer1: 'A free community resource · Not a government agency',
    openChat: 'Or ask our AI assistant',
  },
  es: {
    title: 'Navegador de New Haven',
    heroTitle: 'Encuentre ayuda\nen New Haven',
    heroSubtitle: 'Directorio gratuito y bilingue de 192 servicios sociales — comida, vivienda, salud, ayuda legal y mas.',
    heroButton: 'Buscar Recursos para Mi',
    browseAll: 'Ver Todos los Recursos',
    browseTitle: 'Buscar por Categoria',
    call211: 'Llamar al 211',
    call211Sub: 'Ayuda gratuita para encontrar servicios, 24/7',
    skipToMain: 'Saltar al contenido principal',
    footer1: 'Un recurso comunitario gratuito · No es una agencia gubernamental',
    openChat: 'O pregunte a nuestro asistente',
  }
}

export default function Home() {
  const { language } = useLanguage()
  const t = content[language]
  const cats = getCategoriesWithDetails(language)

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="skip-link">{t.skipToMain}</a>

      {/* Minimal header */}
      <header className="px-5 pt-5 pb-2 flex items-center justify-between" role="banner">
        <span className="text-sm font-semibold tracking-wide uppercase" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>
          {t.title}
        </span>
        <LanguageToggle />
      </header>

      <main id="main-content" className="px-5 pb-10" role="main">

        {/* Hero — big bold text, not a card */}
        <section className="pt-8 pb-10">
          <h1 className="font-bold leading-[1.1] tracking-tight mb-5" style={{ fontSize: 'clamp(2.25rem, 8vw, 3rem)', color: 'var(--color-text)', whiteSpace: 'pre-line' }}>
            {t.heroTitle}
          </h1>
          <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)', maxWidth: '36ch' }}>
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/wizard" className="btn-primary text-center" style={{ fontSize: '1.0625rem', padding: '0.875rem 1.75rem' }}>
              {t.heroButton}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/resources" className="btn-secondary text-center" style={{ fontSize: '1.0625rem', padding: '0.875rem 1.75rem' }}>
              {t.browseAll}
            </Link>
          </div>
        </section>

        {/* Quick stats strip */}
        <div className="flex items-center gap-6 py-4 mb-8 overflow-x-auto" style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>192</span>
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{language === 'es' ? 'recursos' : 'resources'}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>12</span>
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{language === 'es' ? 'categorias' : 'categories'}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>EN/ES</span>
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{language === 'es' ? 'bilingue' : 'bilingual'}</span>
          </div>
        </div>

        {/* Category Grid — wider cards, less cluttered */}
        <section className="mb-10" aria-labelledby="browse-heading">
          <h2 id="browse-heading" className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>
            {t.browseTitle}
          </h2>
          <nav aria-label={language === 'en' ? 'Resource categories' : 'Categorias de recursos'}>
            <div className="grid grid-cols-2 gap-3 stagger-children">
              {cats.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group flex items-start gap-3 p-4 rounded-xl transition-all duration-200"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1.5px solid var(--color-border)',
                  }}
                  aria-label={category.ariaLabel}
                >
                  <span className="text-2xl shrink-0 mt-0.5" aria-hidden="true">{category.icon}</span>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{category.name}</div>
                    <div className="text-xs mt-0.5 leading-snug" style={{ color: 'var(--color-text-muted)' }}>{category.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </nav>
        </section>

        {/* 211 CTA — minimal, not a card */}
        <section className="py-6 text-center" style={{ borderTop: '1px solid var(--color-border)' }}>
          <a href="tel:211" className="inline-flex items-center gap-3 text-lg font-bold transition-colors" style={{ color: 'var(--color-success)' }}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {t.call211}
          </a>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{t.call211Sub}</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-5 py-5 text-center text-xs" style={{ color: 'var(--color-text-muted)' }} role="contentinfo">
        <p>{t.footer1}</p>
      </footer>
    </div>
  )
}
