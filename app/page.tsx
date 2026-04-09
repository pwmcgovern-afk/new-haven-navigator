'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'
import { getCategoriesWithDetails } from '@/lib/categories'
import { Button } from '@/components/ui/button'

const content = {
  en: {
    heroTitle: 'Find free help in New Haven',
    heroSub: 'Food, housing, healthcare, legal aid — 192 resources in English and Spanish, all in one place.',
    heroCta: 'Find Resources for Me',
    heroSecondary: 'Browse All Resources',
    browseTitle: 'Browse by Category',
    call211: 'Need help now? Call 211',
    call211Sub: 'Free, confidential, 24/7',
    skipToMain: 'Skip to main content',
    footer: 'A free community resource for New Haven residents. Not affiliated with any government agency.',
    resources: 'resources',
  },
  es: {
    heroTitle: 'Encuentre ayuda gratuita en New Haven',
    heroSub: 'Comida, vivienda, salud, ayuda legal — 192 recursos en ingles y espanol, todo en un solo lugar.',
    heroCta: 'Buscar Recursos',
    heroSecondary: 'Ver Todos los Recursos',
    browseTitle: 'Buscar por Categoria',
    call211: 'Necesita ayuda ahora? Llame al 211',
    call211Sub: 'Gratuito, confidencial, 24/7',
    skipToMain: 'Saltar al contenido principal',
    footer: 'Un recurso comunitario gratuito para residentes de New Haven. No afiliado a ninguna agencia del gobierno.',
    resources: 'recursos',
  }
}

// Category colors for visual variety
const catColors: Record<string, string> = {
  housing: '#E8F5E9',
  food: '#FFF3E0',
  cash: '#E8F5E9',
  'harm-reduction': '#FCE4EC',
  healthcare: '#E3F2FD',
  'mental-health': '#F3E5F5',
  employment: '#FFF8E1',
  childcare: '#E0F7FA',
  legal: '#EFEBE9',
  transportation: '#E8EAF6',
  utilities: '#FFF9C4',
  immigration: '#F1F8E9',
}

export default function Home() {
  const { language } = useLanguage()
  const t = content[language]
  const cats = getCategoriesWithDetails(language)

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="skip-link">{t.skipToMain}</a>

      {/* Hero Section — full-width teal background, breaks out of parent max-w-lg */}
      <div style={{
        background: 'linear-gradient(145deg, #0D6E6E 0%, #095252 100%)',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        width: '100vw',
      }}>
        <div className="max-w-lg mx-auto px-5">
          {/* Header inside hero */}
          <header className="pt-4 pb-2 flex items-center justify-between" role="banner">
            <span className="text-[13px] font-semibold tracking-widest uppercase text-white/70">
              Navigator
            </span>
            <LanguageToggle />
          </header>

          {/* Hero content */}
          <section className="pt-8 pb-12" id="main-content">
            <h1 className="text-[2rem] sm:text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-white mb-4">
              {t.heroTitle}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-white/80 mb-8" style={{ maxWidth: '38ch' }}>
              {t.heroSub}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/wizard">
                <Button size="lg" className="w-full sm:w-auto text-[15px] font-semibold px-7 h-12 rounded-xl bg-white text-gray-900 hover:bg-gray-100">
                  {t.heroCta}
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </Button>
              </Link>
              <Link href="/resources">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-[15px] font-semibold px-7 h-12 rounded-xl border-white/30 text-white hover:bg-white/10 bg-transparent">
                  {t.heroSecondary}
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-lg mx-auto px-5">
        <main className="pb-12" role="main">

          {/* Categories */}
          <section className="pt-8 mb-10" aria-labelledby="browse-heading">
            <h2 id="browse-heading" className="text-lg font-bold mb-5">
              {t.browseTitle}
            </h2>
            <nav aria-label={language === 'en' ? 'Resource categories' : 'Categorias de recursos'}>
              <div className="grid grid-cols-3 gap-3">
                {cats.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-200 hover:scale-[1.03] hover:shadow-md"
                    style={{ background: catColors[category.slug] || '#F5F5F5' }}
                    aria-label={category.ariaLabel}
                  >
                    <span className="text-2xl mb-2" aria-hidden="true">{category.icon}</span>
                    <span className="text-xs font-semibold leading-tight">{category.name}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </section>

          {/* 211 CTA */}
          <section className="rounded-2xl p-6 mb-6 text-center" style={{ background: '#F0FAF0', border: '1px solid #C8E6C9' }}>
            <a href="tel:211" className="text-lg font-bold" style={{ color: '#2E7D32' }}>
              {t.call211}
            </a>
            <p className="text-sm mt-1" style={{ color: '#558B2F' }}>{t.call211Sub}</p>
          </section>
        </main>

        {/* Footer */}
        <footer className="pb-8 text-center text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }} role="contentinfo">
          {t.footer}
        </footer>
      </div>
    </div>
  )
}
