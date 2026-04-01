'use client'

import { useLanguage } from '@/components/LanguageContext'

const badgeContent = {
  en: {
    verified: 'Verified',
    outdated: 'Info may be outdated',
  },
  es: {
    verified: 'Verificado',
    outdated: 'La info puede estar desactualizada',
  }
}

interface FreshnessBadgeProps {
  verifiedAt: Date | string | null
}

export default function FreshnessBadge({ verifiedAt }: FreshnessBadgeProps) {
  const { language } = useLanguage()
  const t = badgeContent[language]

  if (!verifiedAt) {
    return (
      <span
        className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
        style={{ background: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {t.outdated}
      </span>
    )
  }

  const date = typeof verifiedAt === 'string' ? new Date(verifiedAt) : verifiedAt
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
  const isFresh = date > sixMonthsAgo

  if (isFresh) {
    return (
      <span
        className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
        style={{ background: 'var(--color-success-light)', color: 'var(--color-success)' }}
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        {t.verified} {date.toLocaleDateString()}
      </span>
    )
  }

  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
      style={{ background: '#fef3c7', color: '#92400e' }}
    >
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {t.outdated}
    </span>
  )
}
