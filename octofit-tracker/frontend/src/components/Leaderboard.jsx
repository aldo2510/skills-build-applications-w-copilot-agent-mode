import { useCallback } from 'react'
import { API_BASE_URL } from '../api.js'
import useCollection from '../hooks/useCollection.js'
import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Athlete', key: 'userId' },
  { label: 'Points', key: 'points' },
]

export default function Leaderboard() {
  const loadLeaderboard = useCallback(
    (signal) => fetch(`${API_BASE_URL}/api/leaderboard/`, { signal }),
    [],
  )
  const { records, loading, error } = useCollection(loadLeaderboard)
  const rankedRecords = [...records].sort(
    (first, second) => (second.points ?? 0) - (first.points ?? 0),
  )

  return (
    <CollectionPage
      title="Leaderboard"
      description="See how athletes are progressing this season."
      columns={columns}
      records={rankedRecords}
      loading={loading}
      error={error}
    />
  )
}
