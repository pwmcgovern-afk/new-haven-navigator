'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, translations, getTranslation } from '@/lib/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof translations.en) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'en' || saved === 'es')) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: keyof typeof translations.en) => getTranslation(language, key)

  // Prevent hydration mismatch by rendering with default language until mounted
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: 'en', setLanguage, t: (key) => getTranslation('en', key) }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
