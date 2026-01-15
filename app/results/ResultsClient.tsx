'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'

interface Resource {
  id: string
  name: string
  nameEs?: string | null
  organization?: string | null
  description: string
  descriptionEs?: string | null
  categories: string[]
  address?: string | null
  phone?: string | null
  score: number
}

interface Props {
  resources: Resource[]
  selectedCategories: string[]
}

const categories = {
  en: [
    { slug: 'housing', name: 'Housing', icon: '🏠' },
    { slug: 'food', name: 'Food', icon: '🍎' },
    { slug: 'cash', name: 'Cash', icon: '💵' },
    { slug: 'harm-reduction', name: 'Harm Reduction', icon: '💊' },
    { slug: 'healthcare', name: 'Healthcare', icon: '🏥' },
    { slug: 'mental-health', name: 'Mental Health', icon: '🧠' },
    { slug: 'employment', name: 'Jobs', icon: '💼' },
    { slug: 'childcare', name: 'Childcare', icon: '👶' },
    { slug: 'legal', name: 'Legal Aid', icon: '⚖️' },
    { slug: 'transportation', name: 'Transportation', icon: '🚌' },
    { slug: 'utilities', name: 'Utilities', icon: '💡' },
    { slug: 'immigration', name: 'Immigration', icon: '📄' },
  ],
  es: [
    { slug: 'housing', name: 'Vivienda', icon: '🏠' },
    { slug: 'food', name: 'Comida', icon: '🍎' },
    { slug: 'cash', name: 'Efectivo', icon: '💵' },
    { slug: 'harm-reduction', name: 'Reducción de Daños', icon: '💊' },
    { slug: 'healthcare', name: 'Salud', icon: '🏥' },
    { slug: 'mental-health', name: 'Salud Mental', icon: '🧠' },
    { slug: 'employment', name: 'Empleo', icon: '💼' },
    { slug: 'childcare', name: 'Cuidado Infantil', icon: '👶' },
    { slug: 'legal', name: 'Ayuda Legal', icon: '⚖️' },
    { slug: 'transportation', name: 'Transporte', icon: '🚌' },
    { slug: 'utilities', name: 'Servicios', icon: '💡' },
    { slug: 'immigration', name: 'Inmigración', icon: '📄' },
  ]
}

const content = {
  en: {
    title: 'Your Resources',
    resourcesMatch: 'resources match your situation',
    resourceMatch: 'resource matches your situation',
    editAnswers: 'Edit answers',
    noMatches: 'No matches found',
    noMatchesDesc: 'Try adjusting your answers or browse all resources',
    tryAgain: 'Try again',
    browseAll: 'Browse all',
    needMoreHelp: 'Need more help?',
    call211: 'Call 211 for personalized assistance',
    goodMatch: 'Good match',
  },
  es: {
    title: 'Sus Recursos',
    resourcesMatch: 'recursos coinciden con su situación',
    resourceMatch: 'recurso coincide con su situación',
    editAnswers: 'Editar respuestas',
    noMatches: 'No se encontraron coincidencias',
    noMatchesDesc: 'Intente ajustar sus respuestas o explore todos los recursos',
    tryAgain: 'Intentar de nuevo',
    browseAll: 'Ver todos',
    needMoreHelp: '¿Necesita más ayuda?',
    call211: 'Llame al 211 para asistencia personalizada',
    goodMatch: 'Buena coincidencia',
  }
}

export default function ResultsClient({ resources, selectedCategories }: Props) {
  const { language } = useLanguage()
  const t = content[language]
  const cats = categories[language]

  const getCatInfo = (slug: string) => cats.find(c => c.slug === slug)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[hsl(var(--color-bg))] border-b border-[hsl(var(--color-border))] px-5 py-4">
        <div className="flex items-center justify-between">
          <Link href="/wizard" className="text-[hsl(var(--color-primary))] text-sm font-medium inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.editAnswers}
          </Link>
          <LanguageToggle />
        </div>
      </header>

      <main className="px-5 py-6 fade-in">
        {/* Title */}
        <h1 className="text-2xl font-semibold mb-1">{t.title}</h1>
        <p className="text-gray-500 mb-6">
          {resources.length} {resources.length !== 1 ? t.resourcesMatch : t.resourceMatch}
        </p>

        {/* Selected category pills */}
        {selectedCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategories.map((slug) => {
              const cat = getCatInfo(slug)
              return cat ? (
                <span key={slug} className="category-pill active">
                  {cat.icon} {cat.name}
                </span>
              ) : null
            })}
          </div>
        )}

        {/* Results */}
        {resources.length > 0 ? (
          <div className="space-y-3">
            {resources.map((resource) => {
              const name = language === 'es' && resource.nameEs ? resource.nameEs : resource.name
              const description = language === 'es' && resource.descriptionEs ? resource.descriptionEs : resource.description

              return (
                <Link key={resource.id} href={`/resources/${resource.id}`} className="card block">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex gap-2">
                      {resource.categories.slice(0, 2).map((cat) => {
                        const catInfo = getCatInfo(cat)
                        return (
                          <span key={cat} className="text-xs text-gray-500">
                            {catInfo?.icon} {catInfo?.name}
                          </span>
                        )
                      })}
                    </div>
                    {resource.score >= 70 && (
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        {t.goodMatch}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-[15px] mb-1">{name}</h3>
                  {resource.organization && resource.organization !== resource.name && (
                    <p className="text-sm text-gray-500 mb-2">{resource.organization}</p>
                  )}
                  <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
                  {resource.phone && (
                    <p className="text-sm text-[hsl(var(--color-primary))] mt-2 font-medium">{resource.phone}</p>
                  )}
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold mb-2">{t.noMatches}</h2>
            <p className="text-gray-500 mb-6">{t.noMatchesDesc}</p>
            <div className="flex gap-3 justify-center">
              <Link href="/wizard" className="btn-secondary">{t.tryAgain}</Link>
              <Link href="/resources" className="btn-primary">{t.browseAll}</Link>
            </div>
          </div>
        )}

        {/* Call 211 CTA */}
        <div className="mt-8 card-flat text-center">
          <p className="text-sm text-gray-500 mb-2">{t.needMoreHelp}</p>
          <a href="tel:211" className="text-lg font-semibold text-[hsl(var(--color-primary))] hover:underline">
            {t.call211}
          </a>
        </div>
      </main>
    </div>
  )
}
