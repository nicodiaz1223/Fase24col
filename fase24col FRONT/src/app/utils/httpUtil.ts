import { HTTP_METHODS } from "./frontendConsts"

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpResponse<T> {
  status: number
  data: T | null
  error: string | null
}

/**
 * Makes an HTTP request using fetch and returns a standardized response.
 * @param method - HTTP method ('GET', 'POST', 'PUT', 'DELETE')
 * @param url - The endpoint URL
 * @param data - The request body (for POST/PUT)
 */

export async function httpUtil<T>(
  method: (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS],
  url: string,
  data?: any
): Promise<HttpResponse<T>> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  }

  if (data && (method === "POST" || method === "PUT")) {
    options.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(url, options)

    // Try to parse JSON, but handle empty responses gracefully
    let responseData: any = null
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json()
    }

    if (!response.ok) {
      return {
        status: response.status,
        data: null,
        error:
          responseData?.message ||
          `Request failed with status ${response.status}`,
      }
    }

    return {
      status: response.status,
      data: responseData,
      error: null,
    }
  } catch (error: any) {
    return {
      status: 0,
      data: null,
      error: error.message || "Network error",
    }
  }
}
