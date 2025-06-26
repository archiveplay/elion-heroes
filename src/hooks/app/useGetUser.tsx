import { useEffect, useState } from 'react'
import { getUser } from '@/api/user'
import { User } from '@/types'

type QueryState<T> = {
  data?: T
  error?: unknown
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

export function useGetUser(): QueryState<User> {
  const [data, setData] = useState<User | undefined>()
  const [error, setError] = useState<unknown>()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    getUser()
      .then((user) => {
        if (!cancelled) {
          setData(user)
          setError(undefined)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err)
          setData(undefined)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return {
    data,
    error,
    isLoading,
    isSuccess: !!data && !error,
    isError: !!error,
  }
}

