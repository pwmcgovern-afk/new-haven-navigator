import type { Language } from './translations'

// Centralized bilingual category data — single source of truth
// Used by ResourcesClient, ResultsClient, ResourceDetailClient, CategoryClient
export const CATEGORIES_I18N = [
  { slug: 'housing', icon: '🏠', en: 'Housing', es: 'Vivienda' },
  { slug: 'food', icon: '🍎', en: 'Food', es: 'Comida' },
  { slug: 'cash', icon: '💵', en: 'Cash Assistance', es: 'Asistencia en Efectivo' },
  { slug: 'harm-reduction', icon: '💊', en: 'Harm Reduction', es: 'Reduccion de Danos' },
  { slug: 'healthcare', icon: '🏥', en: 'Healthcare', es: 'Salud' },
  { slug: 'mental-health', icon: '🧠', en: 'Mental Health', es: 'Salud Mental' },
  { slug: 'employment', icon: '💼', en: 'Employment', es: 'Empleo' },
  { slug: 'childcare', icon: '👶', en: 'Childcare', es: 'Cuidado Infantil' },
  { slug: 'legal', icon: '⚖️', en: 'Legal Aid', es: 'Ayuda Legal' },
  { slug: 'transportation', icon: '🚌', en: 'Transportation', es: 'Transporte' },
  { slug: 'utilities', icon: '💡', en: 'Utilities', es: 'Servicios Publicos' },
  { slug: 'immigration', icon: '📄', en: 'Immigration', es: 'Inmigracion' },
] as const

export type CategorySlug = typeof CATEGORIES_I18N[number]['slug']

export function getCategoryInfo(slug: string, language: Language) {
  const cat = CATEGORIES_I18N.find(c => c.slug === slug)
  if (!cat) return null
  return {
    slug: cat.slug,
    icon: cat.icon,
    name: language === 'es' ? cat.es : cat.en,
  }
}

export function getCategoriesForLanguage(language: Language) {
  return CATEGORIES_I18N.map(cat => ({
    slug: cat.slug,
    icon: cat.icon,
    name: language === 'es' ? cat.es : cat.en,
  }))
}
