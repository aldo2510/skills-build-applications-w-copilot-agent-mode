import { useCallback } from 'react'
import { API_BASE_URL } from '../api.js'
import useCollection from '../hooks/useCollection.js'
import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Workout', key: 'name' },
  { label: 'Category', key: 'category' },
  { label: 'Duration (min)', key: 'duration' },
  { label: 'Description', key: 'description' },
]

export default function Workouts() {
  const loadWorkouts = useCallback(
    (signal) => fetch(`${API_BASE_URL}/api/workouts/`, { signal }),
    [],
  )
  const { records, loading, error } = useCollection(loadWorkouts)

  return (
    <CollectionPage
      title="Workouts"
      description="Choose a session to match your goals and energy."
      columns={columns}
      records={records}
      loading={loading}
      error={error}
    />
  )
}
