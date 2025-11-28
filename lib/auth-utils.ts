export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null
  return null
}

export function getAuthHeaders(): HeadersInit {
  const token = getCookie("access_token")
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

export async function apiCall(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
  const url = `${baseURL}${endpoint}`

  return fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  })
}
