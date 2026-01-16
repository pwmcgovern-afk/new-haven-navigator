'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { TrackerEntry, TrackerContextType } from '@/lib/trackerTypes'

const STORAGE_KEY = 'nhn-tracker-entries'

const TrackerContext = createContext<TrackerContextType | undefined>(undefined)

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function TrackerProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<TrackerEntry[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setEntries(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse tracker entries', e)
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
    }
  }, [entries, mounted])

  const addEntry = (entry: Omit<TrackerEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const newEntry: TrackerEntry = {
      ...entry,
      id: generateId(),
      createdAt: now,
      updatedAt: now
    }
    setEntries(prev => [newEntry, ...prev])
  }

  const updateEntry = (id: string, updates: Partial<Omit<TrackerEntry, 'id' | 'createdAt'>>) => {
    setEntries(prev => prev.map(entry =>
      entry.id === id
        ? { ...entry, ...updates, updatedAt: new Date().toISOString() }
        : entry
    ))
  }

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id))
  }

  const getEntryByResourceId = (resourceId: string) => {
    return entries.find(entry => entry.resourceId === resourceId)
  }

  const contextValue: TrackerContextType = {
    entries,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntryByResourceId
  }

  // Prevent hydration mismatch by rendering with empty entries until mounted
  if (!mounted) {
    return (
      <TrackerContext.Provider value={{
        entries: [],
        addEntry: () => {},
        updateEntry: () => {},
        deleteEntry: () => {},
        getEntryByResourceId: () => undefined
      }}>
        {children}
      </TrackerContext.Provider>
    )
  }

  return (
    <TrackerContext.Provider value={contextValue}>
      {children}
    </TrackerContext.Provider>
  )
}

export function useTracker() {
  const context = useContext(TrackerContext)
  if (!context) {
    throw new Error('useTracker must be used within a TrackerProvider')
  }
  return context
}
