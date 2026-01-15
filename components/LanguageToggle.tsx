'use client'

import { useLanguage } from './LanguageContext'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="lang-toggle">
      <button
        onClick={() => setLanguage('en')}
        className={language === 'en' ? 'active' : ''}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('es')}
        className={language === 'es' ? 'active' : ''}
      >
        ES
      </button>
    </div>
  )
}
