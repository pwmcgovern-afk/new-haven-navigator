'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'
import { isOpenNow } from '@/lib/hoursParser'
import { getDistanceMiles } from '@/lib/geo'

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
  latitude: number | null
  longitude: number | null
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
    nearMe: 'Near Me',
    backHome: 'Go back to home page',
    filterBy: 'Filter by category',
    searchLabel: 'Search for resources',
    resultsLabel: 'Search results',
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
    nearMe: 'Cerca de Mí',
    backHome: 'Volver a la página principal',
    filterBy: 'Filtrar por categoría',
    searchLabel: 'Buscar recursos',
    resultsLabel: 'Resultados de búsqueda',
  }
}

export default function ResourcesClient({ resources, query, category }: Props) {
  const { language } = useLanguage()
  const t = content[language]
  const cats = categories[language]
  const [openNowFilter, setOpenNowFilter] = useState(false)
  const [nearMeActive, setNearMeActive] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = useState(false)

  const getCatName = (slug: string) => cats.find(c => c.slug === slug)?.name || slug

  const handleNearMe = useCallback(() => {
    if (nearMeActive) {
      setNearMeActive(false)
      setUserLocation(null)
      return
    }
    if (!navigator.geolocation) {
      setLocationError(true)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setNearMeActive(true)
        setLocationError(false)
      },
      () => setLocationError(true),
      { timeout: 10000 }
    )
  }, [nearMeActive])

  const getDistance = (r: Resource): number | null => {
    if (!userLocation || !r.latitude || !r.longitude) return null
    return getDistanceMiles(userLocation.lat, userLocation.lng, r.latitude, r.longitude)
  }

  // Filter by "Open Now" if enabled
  let filteredResources = openNowFilter
    ? resources.filter(r => {
        const status = isOpenNow(r.hours)
        return status !== false
      })
    : [...resources]

  // Sort by distance if Near Me is active
  if (nearMeActive && userLocation) {
    filteredResources.sort((a, b) => {
      const distA = getDistance(a)
      const distB = getDistance(b)
      if (distA === null && distB === null) return 0
      if (distA === null) return 1
      if (distB === null) return 1
      return distA - distB
    })
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 px-5 py-4" style={{ background: 'var(--color-bg)', borderBottom: '2px solid var(--color-border)' }} role="banner">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 -ml-2 rounded-lg"
              style={{ color: 'var(--color-text-secondary)' }}
              aria-label={t.backHome}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl font-semibold">{t.title}</h1>
          </div>
          <LanguageToggle />
        </div>

        {/* Search */}
        <form action="/resources" method="GET" role="search" aria-label={t.searchLabel}>
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder={t.search}
              className="input pl-12"
              aria-label={t.searchLabel}
            />
          </div>
          {category && <input type="hidden" name="category" value={category} />}
        </form>
      </header>

      <main className="px-5 py-6" role="main" id="main-content">
        {/* Category filter */}
        <nav aria-label={t.filterBy}>
          <div className="flex gap-2 overflow-x-auto pb-4 mb-4 -mx-5 px-5 scrollbar-hide" role="list">
            <Link
              href="/resources"
              className={`category-pill whitespace-nowrap ${!category ? 'active' : ''}`}
              aria-current={!category ? 'page' : undefined}
            >
              {t.all}
            </Link>
            <button
              onClick={() => setOpenNowFilter(!openNowFilter)}
              className={`category-pill whitespace-nowrap ${openNowFilter ? 'active' : ''}`}
              aria-pressed={openNowFilter}
            >
              <span className="mr-1" aria-hidden="true">🕐</span> {t.openNow}
            </button>
            <button
              onClick={handleNearMe}
              className={`category-pill whitespace-nowrap ${nearMeActive ? 'active' : ''}`}
              aria-pressed={nearMeActive}
            >
              <span className="mr-1" aria-hidden="true">📍</span> {t.nearMe}
            </button>
            {cats.map((cat) => (
              <Link
                key={cat.slug}
                href={`/resources?category=${cat.slug}${query ? `&q=${query}` : ''}`}
                className={`category-pill whitespace-nowrap ${category === cat.slug ? 'active' : ''}`}
                aria-current={category === cat.slug ? 'page' : undefined}
              >
                <span aria-hidden="true">{cat.icon}</span> {cat.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Results count - announced to screen readers */}
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }} role="status" aria-live="polite">
          {filteredResources.length} {filteredResources.length !== 1 ? t.resources : t.resource}
          {query && ` ${t.forQuery} "${query}"`}
          {category && ` ${t.inCategory} ${getCatName(category)}`}
        </p>

        {/* Results */}
        <section aria-label={t.resultsLabel}>
          {filteredResources.length > 0 ? (
            <ul className="space-y-3" role="list">
              {filteredResources.map((resource) => {
                const name = language === 'es' && resource.nameEs ? resource.nameEs : resource.name
                const description = language === 'es' && resource.descriptionEs ? resource.descriptionEs : resource.description
                const dist = nearMeActive ? getDistance(resource) : null

                return (
                  <li key={resource.id}>
                    <Link href={`/resources/${resource.id}`} className="card block">
                      <div className="flex gap-2 mb-2 items-center">
                        {resource.categories.slice(0, 2).map((cat) => {
                          const catInfo = cats.find(c => c.slug === cat)
                          return (
                            <span key={cat} className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                              <span aria-hidden="true">{catInfo?.icon}</span> {catInfo?.name}
                            </span>
                          )
                        })}
                        {dist !== null && (
                          <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                            {dist < 0.1 ? '< 0.1' : dist.toFixed(1)} mi
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-[15px] mb-1">{name}</h3>
                      {resource.organization && resource.organization !== resource.name && (
                        <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>{resource.organization}</p>
                      )}
                      <p className="text-sm line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>{description}</p>
                      {resource.phone && (
                        <p className="text-sm mt-2 font-medium" style={{ color: 'var(--color-primary)' }}>{resource.phone}</p>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className="text-center py-16" role="status">
              <div className="text-5xl mb-4" aria-hidden="true">🔍</div>
              <h2 className="text-xl font-semibold mb-2">{t.noResults}</h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>{t.tryDifferent}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
