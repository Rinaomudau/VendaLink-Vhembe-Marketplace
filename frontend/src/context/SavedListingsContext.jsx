import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const SavedListingsContext = createContext(null)
const STORAGE_KEY = 'vendalink_saved_listings'

function readSavedIds() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

export function SavedListingsProvider({ children }) {
  const [savedIds, setSavedIds] = useState(readSavedIds)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds))
  }, [savedIds])

  const value = useMemo(() => ({
    savedIds,
    isSaved: id => savedIds.includes(id),
    toggleSaved: id => setSavedIds(current => current.includes(id)
      ? current.filter(savedId => savedId !== id)
      : [...current, id]),
  }), [savedIds])

  return <SavedListingsContext.Provider value={value}>{children}</SavedListingsContext.Provider>
}

export function useSavedListings() {
  const context = useContext(SavedListingsContext)
  if (!context) throw new Error('useSavedListings must be used inside SavedListingsProvider')
  return context
}
