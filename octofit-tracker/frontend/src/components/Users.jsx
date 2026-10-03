import { useCallback } from 'react'
import { API_BASE_URL } from '../api.js'
import useCollection from '../hooks/useCollection.js'
import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Team', key: 'teamId' },
]

export default function Users() {
  const loadUsers = useCallback(
    (signal) => fetch(`${API_BASE_URL}/api/users/`, { signal }),
    [],
  )
  const { records, loading, error } = useCollection(loadUsers)

  return (
    <CollectionPage
      title="Users"
      description="Meet the members of your OctoFit community."
      columns={columns}
      records={records}
      loading={loading}
      error={error}
    />
  )
}
