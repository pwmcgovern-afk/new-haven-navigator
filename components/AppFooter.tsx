'use client'

import { useLanguage } from '@/components/LanguageContext'

export default function AppFooter() {
  const { t } = useLanguage()

  return (
    <footer className="px-5 py-6 text-center" style={{ borderTop: '2px solid var(--color-border)' }}>
      <a
        href="mailto:pwmcgovern@gmail.com"
        className="text-sm font-medium"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {t('contactAdmin')}
      </a>
    </footer>
  )
}
