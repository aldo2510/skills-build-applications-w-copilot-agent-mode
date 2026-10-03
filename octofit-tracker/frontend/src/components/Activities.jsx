import { useCallback } from 'react'
import { API_BASE_URL } from '../api.js'
import useCollection from '../hooks/useCollection.js'
import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Activity', key: 'type' },
  { label: 'Duration (min)', key: 'duration' },
  { label: 'Date', key: 'date', render: (date) => date ? new Date(date).toLocaleDateString() : '—' },
  { label: 'Notes', key: 'notes' },
]

export default function Activities() {
  const loadActivities = useCallback(
    (signal) => fetch(`${API_BASE_URL}/api/activities/`, { signal }),
    [],
  )
  const { records, loading, error } = useCollection(loadActivities)

  return (
    <CollectionPage
      title="Activities"
      description="Recent movement logged by your community."
      columns={columns}
      records={records}
      loading={loading}
      error={error}
    />
  )
}
