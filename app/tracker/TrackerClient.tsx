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
      <header className="sticky top-0 z-10 glass border-b border-white/20 px-5 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="p-2 -ml-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-white/50 transition-all duration-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="font-bold text-gradient">{t.myTracker}</h1>
          <LanguageToggle />
        </div>
      </header>

      <main className="px-5 py-6 fade-in">
        {entries.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t.trackerEmpty}</h2>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto leading-relaxed">{t.trackerEmptySubtitle}</p>
            <Link href="/resources" className="btn-primary inline-flex items-center gap-2">
              {t.browseResources}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        ) : (
          <>
            {/* Filter Pills */}
            <div className="flex gap-3 overflow-x-auto pb-6 -mx-5 px-5 scrollbar-hide">
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
            <div className="space-y-4 stagger-children">
              {filteredEntries.map((entry) => (
                <div key={entry.id} className="card-flat group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/resources/${entry.resourceId}`}
                        className="font-bold text-lg hover:text-[hsl(var(--color-primary))] transition-colors block truncate"
                      >
                        {getResourceName(entry)}
                      </Link>
                      {entry.organizationName && entry.organizationName !== entry.resourceName && (
                        <p className="text-sm text-gray-500 truncate mt-0.5">{entry.organizationName}</p>
                      )}
                    </div>
                    <span className={`status-badge ${entry.status}`}>
                      {statusConfig[entry.status][language]}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    {entry.contactPerson && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-gray-700 font-medium">{entry.contactPerson}</span>
                      </div>
                    )}
                    {entry.dateContacted && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-700">{formatDate(entry.dateContacted)}</span>
                      </div>
                    )}
                  </div>

                  {entry.notes && (
                    <p className="mt-4 text-sm text-gray-600 line-clamp-2 bg-gray-50 rounded-xl p-3">{entry.notes}</p>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--color-primary))] hover:opacity-70 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      {t.edit}
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:opacity-70 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
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
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setEditingEntry(null)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-t-[2rem] sm:rounded-[2rem] p-8 max-h-[90vh] overflow-y-auto scale-in shadow-2xl">
            {/* Modal Handle */}
            <div className="w-12 h-1.5 rounded-full bg-gray-200 mx-auto mb-6 sm:hidden" />

            <h2 className="text-xl font-bold mb-6">{t.editTracking}</h2>

            {/* Status */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
                {t.status}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(statusConfig) as TrackerStatus[]).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFormStatus(status)}
                    className={`selection-btn text-center py-4 ${formStatus === status ? 'selected' : ''}`}
                  >
                    <span className="font-semibold text-sm">
                      {statusConfig[status][language]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Person */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
                {t.contactPerson} <span className="text-gray-300 normal-case">({t.optional})</span>
              </label>
              <input
                type="text"
                value={formContact}
                onChange={(e) => setFormContact(e.target.value)}
                className="input"
                placeholder="John Smith"
              />
            </div>

            {/* Date Contacted */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
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
            <div className="mb-8">
              <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
                {t.notes} <span className="text-gray-300 normal-case">({t.optional})</span>
              </label>
              <textarea
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                rows={3}
                className="input resize-none min-h-24"
                placeholder="Next steps, notes..."
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4">
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
