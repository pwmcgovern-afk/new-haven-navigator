export type TrackerStatus = 'reached_out' | 'waiting' | 'approved' | 'denied'

export interface TrackerEntry {
  id: string
  resourceId: string
  resourceName: string
  resourceNameEs?: string
  organizationName?: string
  status: TrackerStatus
  contactPerson: string
  dateContacted: string
  notes: string
  createdAt: string
  updatedAt: string
}

export interface TrackerContextType {
  entries: TrackerEntry[]
  addEntry: (entry: Omit<TrackerEntry, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateEntry: (id: string, updates: Partial<Omit<TrackerEntry, 'id' | 'createdAt'>>) => void
  deleteEntry: (id: string) => void
  getEntryByResourceId: (resourceId: string) => TrackerEntry | undefined
}

export const statusConfig = {
  reached_out: {
    en: 'Reached Out',
    es: 'Contactado',
    color: 'bg-blue-100 text-blue-800'
  },
  waiting: {
    en: 'Waiting',
    es: 'Esperando',
    color: 'bg-yellow-100 text-yellow-800'
  },
  approved: {
    en: 'Approved',
    es: 'Aprobado',
    color: 'bg-green-100 text-green-800'
  },
  denied: {
    en: 'Denied',
    es: 'Denegado',
    color: 'bg-red-100 text-red-800'
  }
}
