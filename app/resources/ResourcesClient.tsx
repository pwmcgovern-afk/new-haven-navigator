'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'
import { isOpenNow } from '@/lib/hoursParser'

interface Resource {
  id: string
  name: string
  nameEs: string | null
  organization: string | null
  description: string
  descriptionEs: string | null
  categories: string[]
  address: string | null
  phone: string | null
  hours: string | null
}

interface Props {
  resources: Resource[]
  query?: string
  category?: string
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
    { slug: 'legal', name: 'Legal', icon: '⚖️' },
    { slug: 'transportation', name: 'Transport', icon: '🚌' },
    { slug: 'utilities', name: 'Utilities', icon: '💡' },
    { slug: 'immigration', name: 'Immigration', icon: '📄' },
  ],
  es: [
    { slug: 'housing', name: 'Vivienda', icon: '🏠' },
    { slug: 'food', name: 'Comida', icon: '🍎' },
    { slug: 'cash', name: 'Efectivo', icon: '💵' },
    { slug: 'harm-reduction', name: 'Reducción', icon: '💊' },
    { slug: 'healthcare', name: 'Salud', icon: '🏥' },
    { slug: 'mental-health', name: 'Mental', icon: '🧠' },
    { slug: 'employment', name: 'Empleo', icon: '💼' },
    { slug: 'childcare', name: 'Niños', icon: '👶' },
    { slug: 'legal', name: 'Legal', icon: '⚖️' },
    { slug: 'transportation', name: 'Transporte', icon: '🚌' },
    { slug: 'utilities', name: 'Servicios', icon: '💡' },
    { slug: 'immigration', name: 'Inmigración', icon: '📄' },
  ]
}

const content = {
  en: {
    title: 'All Resources',
    search: 'Search resources...',
    all: 'All',
    resources: 'resources',
    resource: 'resource',
    forQuery: 'for',
    inCategory: 'in',
    noResults: 'No resources found',
    tryDifferent: 'Try a different search term or category',
    openNow: 'Open Now',
  },
  es: {
    title: 'Todos los Recursos',
    search: 'Buscar recursos...',
    all: 'Todos',
    resources: 'recursos',
    resource: 'recurso',
    forQuery: 'para',
    inCategory: 'en',
    noResults: 'No se encontraron recursos',
    tryDifferent: 'Intente con otro término o categoría',
    openNow: 'Abierto Ahora',
  }
}

export default function ResourcesClient({ resources, query, category }: Props) {
  const { language } = useLanguage()
  const t = content[language]
  const cats = categories[language]
  const [openNowFilter, setOpenNowFilter] = useState(false)

  const getCatName = (slug: string) => cats.find(c => c.slug === slug)?.name || slug

  // Filter by "Open Now" if enabled
  const filteredResources = openNowFilter
    ? resources.filter(r => {
        const status = isOpenNow(r.hours)
        // Include if open (true) or unknown (null) - only exclude if definitely closed (false)
        return status !== false
      })
    : resources

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[hsl(var(--color-bg))] border-b border-[hsl(var(--color-border))] px-5 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl font-semibold">{t.title}</h1>
          </div>
          <LanguageToggle />
        </div>

        {/* Search */}
        <form action="/resources" method="GET">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder={t.search}
              className="input pl-12"
            />
          </div>
          {category && <input type="hidden" name="category" value={category} />}
        </form>
      </header>

      <div className="px-5 py-6">
        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 -mx-5 px-5 scrollbar-hide">
          <Link
            href="/resources"
            className={`category-pill whitespace-nowrap ${!category ? 'active' : ''}`}
          >
            {t.all}
          </Link>
          <button
            onClick={() => setOpenNowFilter(!openNowFilter)}
            className={`category-pill whitespace-nowrap ${openNowFilter ? 'active' : ''}`}
          >
            <span className="mr-1">🕐</span> {t.openNow}
          </button>
          {cats.map((cat) => (
            <Link
              key={cat.slug}
              href={`/resources?category=${cat.slug}${query ? `&q=${query}` : ''}`}
              className={`category-pill whitespace-nowrap ${category === cat.slug ? 'active' : ''}`}
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">
          {filteredResources.length} {filteredResources.length !== 1 ? t.resources : t.resource}
          {query && ` ${t.forQuery} "${query}"`}
          {category && ` ${t.inCategory} ${getCatName(category)}`}
        </p>

        {/* Results */}
        {filteredResources.length > 0 ? (
          <div className="space-y-3">
            {filteredResources.map((resource) => {
              const name = language === 'es' && resource.nameEs ? resource.nameEs : resource.name
              const description = language === 'es' && resource.descriptionEs ? resource.descriptionEs : resource.description

              return (
                <Link key={resource.id} href={`/resources/${resource.id}`} className="card block">
                  <div className="flex gap-2 mb-2">
                    {resource.categories.slice(0, 2).map((cat) => {
                      const catInfo = cats.find(c => c.slug === cat)
                      return (
                        <span key={cat} className="text-xs text-gray-500">
                          {catInfo?.icon} {catInfo?.name}
                        </span>
                      )
                    })}
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
            <h2 className="text-xl font-semibold mb-2">{t.noResults}</h2>
            <p className="text-gray-500">{t.tryDifferent}</p>
          </div>
        )}
      </div>
    </div>
  )
}
