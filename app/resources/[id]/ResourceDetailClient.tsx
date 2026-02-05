'use client'

import { useState } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'
import LanguageToggle from '@/components/LanguageToggle'
import { useLanguage } from '@/components/LanguageContext'
import { useTracker } from '@/components/TrackerContext'
import { statusConfig, type TrackerStatus } from '@/lib/trackerTypes'
import type { Resource } from '@/lib/types'

interface Props {
  resource: Resource
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
    about: 'About',
    howToGetHelp: 'How to Get Help',
    whoCanGetHelp: 'Who Can Get Help',
    tipsTitle: 'Tips for This Resource',
    location: 'Location',
    phone: 'Phone',
    email: 'Email',
    hours: 'Hours',
    website: 'Website',
    call: 'Call',
    directions: 'Directions',
    lastVerified: 'Last verified',
    notVerified: 'Not yet verified',
    serves: 'Serves:',
    incomeLimit: 'Income limit:',
    ofFPL: '% of Federal Poverty Level',
    homeless: 'Currently homeless',
    at_risk: 'At risk of homelessness',
    housed: 'Currently housed',
    veteran: 'Veterans',
    formerly_incarcerated: 'Formerly incarcerated',
    pregnant: 'Pregnant individuals',
    children: 'Families with children',
    seniors: 'Seniors (60+)',
    disabled: 'People with disabilities',
    domestic_violence: 'DV survivors',
    // Tracker
    track: 'Track',
    tracked: 'Tracked',
    updateTracking: 'Update',
    editTracking: 'Edit Tracking',
    contactPerson: 'Contact Person',
    dateContacted: 'Date Contacted',
    status: 'Status',
    notes: 'Notes / Next Steps',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    optional: 'Optional',
    reportIssue: 'Report an issue',
    reportIssueSubject: 'Issue with resource:',
    // Accessibility
    backToResources: 'Back to all resources',
    callPhone: 'Call phone number',
    getDirections: 'Get directions to location',
    closeDialog: 'Close dialog',
  },
  es: {
    about: 'Acerca de',
    howToGetHelp: 'Cómo Obtener Ayuda',
    whoCanGetHelp: 'Quién Puede Obtener Ayuda',
    tipsTitle: 'Consejos para Este Recurso',
    location: 'Ubicación',
    phone: 'Teléfono',
    email: 'Correo',
    hours: 'Horario',
    website: 'Sitio Web',
    call: 'Llamar',
    directions: 'Direcciones',
    lastVerified: 'Última verificación',
    notVerified: 'Aún no verificado',
    serves: 'Sirve a:',
    incomeLimit: 'Límite de ingresos:',
    ofFPL: '% del Nivel Federal de Pobreza',
    homeless: 'Actualmente sin hogar',
    at_risk: 'En riesgo de perder vivienda',
    housed: 'Con vivienda actualmente',
    veteran: 'Veteranos',
    formerly_incarcerated: 'Anteriormente encarcelados',
    pregnant: 'Personas embarazadas',
    children: 'Familias con niños',
    seniors: 'Personas mayores (60+)',
    disabled: 'Personas con discapacidades',
    domestic_violence: 'Sobrevivientes de VD',
    // Tracker
    track: 'Rastrear',
    tracked: 'Rastreado',
    updateTracking: 'Actualizar',
    editTracking: 'Editar Seguimiento',
    contactPerson: 'Persona de Contacto',
    dateContacted: 'Fecha de Contacto',
    status: 'Estado',
    notes: 'Notas / Próximos Pasos',
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    optional: 'Opcional',
    reportIssue: 'Reportar un problema',
    reportIssueSubject: 'Problema con recurso:',
    // Accessibility
    backToResources: 'Volver a todos los recursos',
    callPhone: 'Llamar al número de teléfono',
    getDirections: 'Obtener direcciones a la ubicación',
    closeDialog: 'Cerrar diálogo',
  }
}

export default function ResourceDetailClient({ resource }: Props) {
  const { language } = useLanguage()
  const t = content[language]
  const cats = categories[language]
  const { getEntryByResourceId, addEntry, updateEntry, deleteEntry } = useTracker()

  const [showTrackModal, setShowTrackModal] = useState(false)
  const existingEntry = getEntryByResourceId(resource.id)

  const [formStatus, setFormStatus] = useState<TrackerStatus>(existingEntry?.status || 'reached_out')
  const [formContact, setFormContact] = useState(existingEntry?.contactPerson || '')
  const [formDate, setFormDate] = useState(existingEntry?.dateContacted || new Date().toISOString().split('T')[0])
  const [formNotes, setFormNotes] = useState(existingEntry?.notes || '')

  const resetForm = () => {
    setFormStatus(existingEntry?.status || 'reached_out')
    setFormContact(existingEntry?.contactPerson || '')
    setFormDate(existingEntry?.dateContacted || new Date().toISOString().split('T')[0])
    setFormNotes(existingEntry?.notes || '')
  }

  const handleOpenModal = () => {
    resetForm()
    setShowTrackModal(true)
  }

  const handleSave = () => {
    const name = language === 'es' && resource.nameEs ? resource.nameEs : resource.name
    if (existingEntry) {
      updateEntry(existingEntry.id, {
        status: formStatus,
        contactPerson: formContact,
        dateContacted: formDate,
        notes: formNotes
      })
    } else {
      addEntry({
        resourceId: resource.id,
        resourceName: resource.name,
        resourceNameEs: resource.nameEs || undefined,
        organizationName: resource.organization || undefined,
        status: formStatus,
        contactPerson: formContact,
        dateContacted: formDate,
        notes: formNotes
      })
    }
    setShowTrackModal(false)
  }

  const handleDelete = () => {
    if (existingEntry) {
      deleteEntry(existingEntry.id)
      setShowTrackModal(false)
    }
  }

  const getCategoryInfo = (slug: string) => cats.find(c => c.slug === slug)

  // Use organization-specific tips
  const tips = language === 'es' && resource.tipsEs?.length > 0
    ? resource.tipsEs
    : resource.tips?.length > 0
      ? resource.tips
      : []

  // Use Spanish translations when available
  const name = language === 'es' && resource.nameEs ? resource.nameEs : resource.name
  const description = language === 'es' && resource.descriptionEs ? resource.descriptionEs : resource.description
  const howToApply = language === 'es' && resource.howToApplyEs ? resource.howToApplyEs : resource.howToApply

  const googleMapsUrl = resource.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${resource.address}, ${resource.city}, ${resource.state} ${resource.zip || ''}`
      )}`
    : null

  const eligibility = resource.eligibility as Record<string, unknown> | null

  const translateHousing = (s: string) => t[s as keyof typeof t] || s
  const translatePopulation = (p: string) => t[p as keyof typeof t] || p

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 px-5 py-4" style={{ background: 'var(--color-bg)', borderBottom: '2px solid var(--color-border)' }} role="banner">
        <div className="flex items-center justify-between">
          <Link
            href="/resources"
            className="p-2 -ml-2 rounded-lg"
            style={{ color: 'var(--color-text-secondary)' }}
            aria-label={t.backToResources}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <LanguageToggle />
        </div>
      </header>

      <main className="px-5 py-6 fade-in" role="main" id="main-content">
        {/* Categories */}
        <nav aria-label={language === 'en' ? 'Resource categories' : 'Categorías del recurso'}>
          <div className="flex flex-wrap gap-2 mb-4">
            {resource.categories.map((cat) => {
              const catInfo = getCategoryInfo(cat)
              return (
                <Link key={cat} href={`/category/${cat}`} className="category-pill">
                  <span aria-hidden="true">{catInfo?.icon}</span> {catInfo?.name}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Name & Organization */}
        <h1 className="text-2xl font-semibold mb-1">{name}</h1>
        {resource.organization && resource.organization !== resource.name && (
          <p style={{ color: 'var(--color-text-secondary)' }}>{resource.organization}</p>
        )}

        {/* About */}
        <div className="card-flat mt-6">
          <h2 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">{t.about}</h2>
          <p className="text-[var(--color-text)] leading-relaxed">{description}</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6" role="group" aria-label={language === 'en' ? 'Quick actions' : 'Acciones rápidas'}>
          {resource.phone && (
            <a
              href={`tel:${resource.phone.replace(/\D/g, '')}`}
              className="btn-primary text-center flex items-center justify-center gap-2"
              aria-label={`${t.callPhone}: ${resource.phone}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t.call}
            </a>
          )}
          {googleMapsUrl && (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-center flex items-center justify-center gap-2"
              aria-label={t.getDirections}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {t.directions}
            </a>
          )}
        </div>

        {/* Details */}
        <div className="mt-8 space-y-5">
          {resource.address && (
            <div>
              <h2 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">{t.location}</h2>
              <p className="text-[var(--color-text)]">
                {resource.address}<br />
                {resource.city}, {resource.state} {resource.zip}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-5">
            {resource.phone && (
              <div>
                <h2 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">{t.phone}</h2>
                <a href={`tel:${resource.phone.replace(/\D/g, '')}`} className="text-[var(--color-primary)] font-medium">
                  {resource.phone}
                </a>
              </div>
            )}
            {resource.email && (
              <div>
                <h2 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">{t.email}</h2>
                <a href={`mailto:${resource.email}`} className="text-[var(--color-primary)] font-medium break-all text-sm">
                  {resource.email}
                </a>
              </div>
            )}
          </div>

          {resource.hours && (
            <div>
              <h2 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">{t.hours}</h2>
              <p className="text-[var(--color-text)] whitespace-pre-line">{resource.hours}</p>
            </div>
          )}

          {resource.website && (
            <div>
              <h2 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">{t.website}</h2>
              <a
                href={resource.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-primary)] font-medium break-all"
              >
                {resource.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}

          {/* How to Apply */}
          {howToApply && (
            <div className="info-card success">
              <h2 className="text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t.howToGetHelp}
              </h2>
              <p className="whitespace-pre-line">{howToApply}</p>
            </div>
          )}

          {/* Eligibility */}
          {eligibility && Object.keys(eligibility).length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">{t.whoCanGetHelp}</h2>
              <ul className="text-[var(--color-text)] space-y-1 text-sm">
                {Array.isArray(eligibility.housingStatus) && eligibility.housingStatus.length > 0 && (
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-primary)]">•</span>
                    <span>{eligibility.housingStatus.map((s: string) => translateHousing(s)).join(', ')}</span>
                  </li>
                )}
                {Array.isArray(eligibility.populations) && eligibility.populations.length > 0 && (
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-primary)]">•</span>
                    <span>{t.serves} {eligibility.populations.map((p: string) => translatePopulation(p)).join(', ')}</span>
                  </li>
                )}
                {typeof eligibility.incomeLimitPctFpl === 'number' && (
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-primary)]">•</span>
                    <span>{t.incomeLimit} {eligibility.incomeLimitPctFpl}{t.ofFPL}</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Tips */}
        {tips.length > 0 && (
          <div className="info-card info mt-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.tipsTitle}
            </h2>
            <ul className="space-y-2 text-sm">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Share & Track */}
        <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex gap-3">
          <ShareButton title={name} text={description} />
          <button
            onClick={handleOpenModal}
            className={`btn-secondary flex-1 flex items-center justify-center gap-2 ${existingEntry ? 'bg-[var(--color-success-light)] border-[var(--color-success)]' : ''}`}
          >
            {existingEntry ? (
              <>
                <svg className="w-5 h-5 text-[var(--color-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[var(--color-success)]">{t.tracked}</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {t.track}
              </>
            )}
          </button>
        </div>

        {/* Track Modal */}
        {showTrackModal && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="track-modal-title"
          >
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.5)' }}
              onClick={() => setShowTrackModal(false)}
              aria-label={t.closeDialog}
            />
            <div
              className="relative w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
              style={{ background: 'var(--color-surface)' }}
            >
              <h2 id="track-modal-title" className="text-lg font-semibold mb-4">
                {existingEntry ? t.editTracking : t.track}
              </h2>

              {/* Status */}
              <fieldset className="mb-4">
                <legend className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: 'var(--color-text-secondary)' }}>
                  {t.status}
                </legend>
                <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label={t.status}>
                  {(Object.keys(statusConfig) as TrackerStatus[]).map((status) => (
                    <button
                      key={status}
                      onClick={() => setFormStatus(status)}
                      className={`selection-btn text-center py-3 ${formStatus === status ? 'selected' : ''}`}
                      role="radio"
                      aria-checked={formStatus === status}
                    >
                      <span className="font-medium text-sm">
                        {statusConfig[status][language]}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Contact Person */}
              <div className="mb-4">
                <label htmlFor="contact-person-input" className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: 'var(--color-text-secondary)' }}>
                  {t.contactPerson} <span style={{ color: 'var(--color-text-muted)' }}>({t.optional})</span>
                </label>
                <input
                  id="contact-person-input"
                  type="text"
                  value={formContact}
                  onChange={(e) => setFormContact(e.target.value)}
                  placeholder="John Smith"
                  className="input"
                />
              </div>

              {/* Date Contacted */}
              <div className="mb-4">
                <label htmlFor="date-contacted-input" className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: 'var(--color-text-secondary)' }}>
                  {t.dateContacted}
                </label>
                <input
                  id="date-contacted-input"
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="input"
                />
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label htmlFor="notes-input" className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: 'var(--color-text-secondary)' }}>
                  {t.notes} <span style={{ color: 'var(--color-text-muted)' }}>({t.optional})</span>
                </label>
                <textarea
                  id="notes-input"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Next steps, notes..."
                  rows={3}
                  className="input resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {existingEntry && (
                  <button
                    onClick={handleDelete}
                    className="px-4 py-3 font-medium rounded-xl transition-colors btn-touch"
                    style={{ color: 'var(--color-error)' }}
                  >
                    {t.delete}
                  </button>
                )}
                <button
                  onClick={() => setShowTrackModal(false)}
                  className="flex-1 btn-secondary"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 btn-primary"
                >
                  {t.save}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Verification & Report */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-[var(--color-text-muted)]">
            {t.lastVerified}: {resource.verifiedAt ? new Date(resource.verifiedAt).toLocaleDateString() : t.notVerified}
          </p>
          <a
            href={`mailto:pmcgovern@bowerycap.com?subject=${encodeURIComponent(`${t.reportIssueSubject} ${resource.name}`)}&body=${encodeURIComponent(`Resource: ${resource.name}\nID: ${resource.id}\n\nIssue:\n`)}`}
            className="text-xs font-medium flex items-center gap-1 btn-touch"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t.reportIssue}
          </a>
        </div>
      </main>
    </div>
  )
}
