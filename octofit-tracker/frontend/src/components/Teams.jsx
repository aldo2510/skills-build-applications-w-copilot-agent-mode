import { useCallback } from 'react'
import { API_BASE_URL } from '../api.js'
import useCollection from '../hooks/useCollection.js'
import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Team', key: 'name' },
  { label: 'Description', key: 'description' },
  { label: 'Members', key: 'members', render: (members) => Array.isArray(members) ? members.length : 0 },
]

export default function Teams() {
  const loadTeams = useCallback(
    (signal) => fetch(`${API_BASE_URL}/api/teams/`, { signal }),
    [],
  )
  const { records, loading, error } = useCollection(loadTeams)

  return (
    <CollectionPage
      title="Teams"
      description="Find your team and see who's training together."
      columns={columns}
      records={records}
      loading={loading}
      error={error}
    />
  )
}
