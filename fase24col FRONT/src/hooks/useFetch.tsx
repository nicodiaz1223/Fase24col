import { HttpResponse, httpUtil } from "@/app/utils/httpUtil"
import { HTTP_METHOD } from "next/dist/server/web/http"
import { useState, useEffect } from "react"

interface UseFetchResult<T> {
  data: T | null
  loading: boolean
  error: string | null
}

/**
 * Custom hook to fetch data from an API endpoint.
 * @param url - The API endpoint URL
 * @param method - HTTP method (default is 'GET')
 * @param body - Request body for POST/PUT methods
 * @returns { data, loading, error }
 */
export function useFetch<T>(
  url: string,
  method: HTTP_METHOD = "GET",
  body?: unknown
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const response: HttpResponse<T> = await httpUtil<T>(method, url, body)
        if (isMounted) {
          if (response.error) {
            setError(response.error)
            setData(null)
          } else {
            setData(response.data)
            setError(null)
          }
          setLoading(false)
        }
      } catch (err: unknown) {
        if (isMounted) {
          const errorMessage =
            err instanceof Error ? err.message : "Unknown error"
          setError(errorMessage)
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [url, method, body])

  return { data, loading, error }
}
