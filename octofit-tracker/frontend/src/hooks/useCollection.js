import { useEffect, useState } from 'react'
import { extractCollection } from '../api.js'

export default function useCollection(loadCollection) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        setError('')
        const response = await loadCollection(controller.signal)
        if (!response.ok) {
          throw new Error(`The API request failed (${response.status}).`)
        }

        const payload = await response.json()
        setRecords(extractCollection(payload))
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message || 'Unable to load data.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    load()
    return () => controller.abort()
  }, [loadCollection])

  return { records, loading, error }
}
