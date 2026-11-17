import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { listingsAPI } from '../api'
import { ListingCard, Spinner, EmptyState } from '../components/UI'
import { useSavedListings } from '../context/SavedListingsContext'

export default function SavedListings() {
  const nav = useNavigate()
  const { savedIds } = useSavedListings()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    listingsAPI.getAll({ limit: 100 })
      .then(r => {
        if (active) setListings((r.data.listings || []).filter(item => savedIds.includes(item.id)))
      })
      .catch(() => { if (active) setListings([]) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [savedIds])

  return (
    <div style={{ minHeight: '100%', paddingBottom: 24 }}>
      <div className="topbar">
        <button className="icon-btn" onClick={() => nav(-1)} aria-label="Go back"><i className="fas fa-arrow-left" /></button>
        <div className="brand">SAVED <span>FINDS</span></div>
        <div style={{ width: 36 }} />
      </div>
      <div style={{ padding: '22px 20px 8px' }}>
        <div style={{ fontFamily: 'Syne', fontSize: 22, fontWeight: 800, color: 'var(--text)' }}>Your wishlist ❤️</div>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 5 }}>Keep interesting finds close while you decide.</p>
      </div>
      {loading ? <Spinner /> : listings.length === 0 ? (
        <EmptyState emoji="💛" message={'No saved listings yet. Tap the heart on any item to keep it here.'} />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12, padding: '12px 20px' }}>
          {listings.map(item => <ListingCard key={item.id} listing={item} />)}
        </div>
      )}
    </div>
  )
}
