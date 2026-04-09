'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'
import { getCategoriesWithDetails } from '@/lib/categories'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const content = {
  en: {
    heroTitle: 'Find free help\nin New Haven',
    heroSub: '192 social services. Bilingual. Updated regularly.',
    heroCta: 'Find Resources for Me',
    heroSecondary: 'Browse All',
    browseTitle: 'Categories',
    call211: 'Call 211',
    call211Sub: 'Free, confidential helpline — 24/7',
    skipToMain: 'Skip to main content',
    footer: 'A free community resource. Not a government agency.',
    learnMore: 'Learn more →',
  },
  es: {
    heroTitle: 'Encuentre ayuda\nen New Haven',
    heroSub: '192 servicios sociales. Bilingue. Actualizado regularmente.',
    heroCta: 'Buscar Recursos',
    heroSecondary: 'Ver Todos',
    browseTitle: 'Categorias',
    call211: 'Llamar al 211',
    call211Sub: 'Linea de ayuda gratuita y confidencial — 24/7',
    skipToMain: 'Saltar al contenido principal',
    footer: 'Un recurso comunitario gratuito. No es una agencia del gobierno.',
    learnMore: 'Ver mas →',
  }
}

export default function Home() {
  const { language } = useLanguage()
  const t = content[language]
  const cats = getCategoriesWithDetails(language)

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="skip-link">{t.skipToMain}</a>

      {/* Header */}
      <header className="px-5 pt-5 pb-2 flex items-center justify-between" role="banner">
        <span className="text-[13px] font-medium tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>
          New Haven Navigator
        </span>
        <LanguageToggle />
      </header>

      <main id="main-content" className="px-5 pb-12" role="main">

        {/* Hero */}
        <section className="pt-10 pb-8">
          <h1 className="text-[2.5rem] sm:text-5xl font-extrabold leading-[1.08] tracking-tight mb-4" style={{ whiteSpace: 'pre-line' }}>
            {t.heroTitle}
          </h1>
          <p className="text-[1.125rem] leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)', maxWidth: '34ch' }}>
            {t.heroSub}
          </p>
          <div className="flex gap-3">
            <Link href="/wizard">
              <Button size="lg" className="text-[15px] font-semibold px-6 h-12 rounded-xl" style={{ background: 'var(--color-primary)', color: 'white' }}>
                {t.heroCta}
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Button>
            </Link>
            <Link href="/resources">
              <Button variant="outline" size="lg" className="text-[15px] font-semibold px-6 h-12 rounded-xl">
                {t.heroSecondary}
              </Button>
            </Link>
          </div>
        </section>

        <Separator className="mb-8" />

        {/* Categories */}
        <section className="mb-10" aria-labelledby="browse-heading">
          <h2 id="browse-heading" className="text-[13px] font-medium tracking-widest uppercase mb-5" style={{ color: 'var(--color-text-muted)' }}>
            {t.browseTitle}
          </h2>
          <nav aria-label={language === 'en' ? 'Resource categories' : 'Categorias de recursos'}>
            <div className="grid grid-cols-1 gap-px rounded-xl overflow-hidden border" style={{ borderColor: 'var(--color-border)', background: 'var(--color-border)' }}>
              {cats.map((category, i) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-gray-50"
                  style={{ background: 'var(--color-surface)' }}
                  aria-label={category.ariaLabel}
                >
                  <span className="text-xl w-8 text-center shrink-0" aria-hidden="true">{category.icon}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[15px] font-semibold">{category.name}</span>
                    <span className="text-sm ml-2" style={{ color: 'var(--color-text-muted)' }}>{category.description}</span>
                  </div>
                  <svg className="w-4 h-4 shrink-0" style={{ color: 'var(--color-text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              ))}
            </div>
          </nav>
        </section>

        {/* 211 CTA */}
        <section className="text-center py-6 rounded-xl mb-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <a href="tel:211" className="inline-flex items-center gap-2 text-xl font-bold" style={{ color: 'var(--color-success)' }}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            {t.call211}
          </a>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{t.call211Sub}</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-5 py-5 text-center text-xs" style={{ color: 'var(--color-text-muted)' }} role="contentinfo">
        {t.footer}
      </footer>
    </div>
  )
}
