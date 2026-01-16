'use client'

import { useState } from 'react'
import Link from 'next/link'
import LanguageToggle from '@/components/LanguageToggle'
import { useLanguage } from '@/components/LanguageContext'
import { useTracker } from '@/components/TrackerContext'
import { statusConfig, type TrackerStatus, type TrackerEntry } from '@/lib/trackerTypes'

const content = {
  en: {
    myTracker: 'My Tracker',
    trackerEmpty: 'No tracked resources yet',
    trackerEmptySubtitle: 'Use the Track button on any resource to start tracking your outreach',
    browseResources: 'Browse Resources',
    all: 'All',
    contactPerson: 'Contact',
    dateContacted: 'Contacted',
    notes: 'Notes',
    edit: 'Edit',
    delete: 'Delete',
    editTracking: 'Edit Tracking',
    status: 'Status',
    save: 'Save',
    cancel: 'Cancel',
    optional: 'Optional',
  },
  es: {
    myTracker: 'Mi Seguimiento',
    trackerEmpty: 'No hay recursos rastreados',
    trackerEmptySubtitle: 'Use el botón Rastrear en cualquier recurso para comenzar',
    browseResources: 'Ver Recursos',
    all: 'Todos',
    contactPerson: 'Contacto',
    dateContacted: 'Contactado',
    notes: 'Notas',
    edit: 'Editar',
    delete: 'Eliminar',
    editTracking: 'Editar Seguimiento',
    status: 'Estado',
    save: 'Guardar',
    cancel: 'Cancelar',
    optional: 'Opcional',
  }
}

export default function TrackerClient() {
  const { language } = useLanguage()
  const t = content[language]
  const { entries, updateEntry, deleteEntry } = useTracker()

  const [filterStatus, setFilterStatus] = useState<TrackerStatus | 'all'>('all')
  const [editingEntry, setEditingEntry] = useState<TrackerEntry | null>(null)

  // Edit form state
  const [formStatus, setFormStatus] = useState<TrackerStatus>('reached_out')
  const [formContact, setFormContact] = useState('')
  const [formDate, setFormDate] = useState('')
  const [formNotes, setFormNotes] = useState('')

  const filteredEntries = filterStatus === 'all'
    ? entries
    : entries.filter(e => e.status === filterStatus)

  const handleEdit = (entry: TrackerEntry) => {
    setEditingEntry(entry)
    setFormStatus(entry.status)
    setFormContact(entry.contactPerson)
    setFormDate(entry.dateContacted)
    setFormNotes(entry.notes)
  }

  const handleSave = () => {
    if (editingEntry) {
      updateEntry(editingEntry.id, {
        status: formStatus,
        contactPerson: formContact,
        dateContacted: formDate,
        notes: formNotes
      })
      setEditingEntry(null)
    }
  }

  const handleDelete = (id: string) => {
    deleteEntry(id)
  }

  const getResourceName = (entry: TrackerEntry) => {
    return language === 'es' && entry.resourceNameEs ? entry.resourceNameEs : entry.resourceName
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString(language === 'es' ? 'es-US' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[hsl(var(--color-bg))] border-b border-[hsl(var(--color-border))] px-5 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="font-semibold">{t.myTracker}</h1>
          <LanguageToggle />
        </div>
      </header>

      <main className="px-5 py-6">
        {entries.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{t.trackerEmpty}</h2>
            <p className="text-gray-500 mb-6">{t.trackerEmptySubtitle}</p>
            <Link href="/resources" className="btn-primary inline-block">
              {t.browseResources}
            </Link>
          </div>
        ) : (
          <>
            {/* Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-4 -mx-5 px-5 scrollbar-hide">
              <button
                onClick={() => setFilterStatus('all')}
                className={`category-pill whitespace-nowrap ${filterStatus === 'all' ? 'active' : ''}`}
              >
                {t.all} ({entries.length})
              </button>
              {(Object.keys(statusConfig) as TrackerStatus[]).map((status) => {
                const count = entries.filter(e => e.status === status).length
                if (count === 0) return null
                return (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`category-pill whitespace-nowrap ${filterStatus === status ? 'active' : ''}`}
                  >
                    {statusConfig[status][language]} ({count})
                  </button>
                )
              })}
            </div>

            {/* Entries List */}
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <div key={entry.id} className="card-flat">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/resources/${entry.resourceId}`}
                        className="font-semibold text-[hsl(var(--color-primary))] hover:underline block truncate"
                      >
                        {getResourceName(entry)}
                      </Link>
                      {entry.organizationName && entry.organizationName !== entry.resourceName && (
                        <p className="text-sm text-gray-500 truncate">{entry.organizationName}</p>
                      )}
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${statusConfig[entry.status].color}`}>
                      {statusConfig[entry.status][language]}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    {entry.contactPerson && (
                      <div>
                        <span className="text-gray-400">{t.contactPerson}:</span>{' '}
                        <span className="text-gray-700">{entry.contactPerson}</span>
                      </div>
                    )}
                    {entry.dateContacted && (
                      <div>
                        <span className="text-gray-400">{t.dateContacted}:</span>{' '}
                        <span className="text-gray-700">{formatDate(entry.dateContacted)}</span>
                      </div>
                    )}
                  </div>

                  {entry.notes && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{entry.notes}</p>
                  )}

                  <div className="mt-3 pt-3 border-t border-[hsl(var(--color-border))] flex gap-3">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="text-sm text-[hsl(var(--color-primary))] font-medium"
                    >
                      {t.edit}
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="text-sm text-red-600 font-medium"
                    >
                      {t.delete}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Edit Modal */}
      {editingEntry && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setEditingEntry(null)} />
          <div className="relative w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">{t.editTracking}</h2>

            {/* Status */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                {t.status}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(statusConfig) as TrackerStatus[]).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFormStatus(status)}
                    className={`selection-btn text-center py-3 ${formStatus === status ? 'selected' : ''}`}
                  >
                    <span className="font-medium text-sm">
                      {statusConfig[status][language]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Person */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                {t.contactPerson} <span className="text-gray-300">({t.optional})</span>
              </label>
              <input
                type="text"
                value={formContact}
                onChange={(e) => setFormContact(e.target.value)}
                className="input"
              />
            </div>

            {/* Date Contacted */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                {t.dateContacted}
              </label>
              <input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className="input"
              />
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                {t.notes} <span className="text-gray-300">({t.optional})</span>
              </label>
              <textarea
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                rows={3}
                className="input resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setEditingEntry(null)}
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
    </div>
  )
}
