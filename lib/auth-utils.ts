// export function getCookie(name: string): string | null {
//   const value = `; ${document.cookie}`
//   const parts = value.split(`; ${name}=`)
//   if (parts.length === 2) return parts.pop()?.split(";").shift() || null
//   return null
// }

// export function getAuthHeaders(): HeadersInit {
//   const token = getCookie("access_token")
//   return {
//     "Content-Type": "application/json",
//     ...(token && { Authorization: `Bearer ${token}` }),
//   }
// }

// export async function apiCall(endpoint: string, options: RequestInit = {}): Promise<Response> {
//   const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
//   const url = `${baseURL}${endpoint}`

//   return fetch(url, {
//     ...options,
//     headers: {
//       ...getAuthHeaders(),
//       ...options.headers,
//     },
//   })
// }


// export function getCookie(name: string): string | null {
//   const value = `; ${document.cookie}`
//   const parts = value.split(`; ${name}=`)
//   if (parts.length === 2) return parts.pop()?.split(";").shift() || null
//   return null
// }

// export function getAuthHeaders(): HeadersInit {
//   const token = getCookie("access_token")
//   return {
//     "Content-Type": "application/json",
//     ...(token && { Authorization: `Bearer ${token}` }),
//   }
// }

// export async function apiCall(endpoint: string, options: RequestInit = {}): Promise<Response> {
//   const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
//   const url = `${baseURL}${endpoint}`

//   return fetch(url, {
//     ...options,
//     headers: {
//       ...getAuthHeaders(),
//       ...options.headers,
//     },
//   })
// }

// export async function getCurrentUserRole(): Promise<string | null> {
//   try {
//     const response = await apiCall("/me")
//     if (response.ok) {
//       const data = await response.json()
//       return data.role || null
//     }
//     return null
//   } catch (error) {
//     console.error("Error fetching user role:", error)
//     return null
//   }
// }

// export function canAccessFeature(role: string | null, feature: string): boolean {
//   // ADMINISTRATOR cannot access: create company, create buyer, create project, admin user list, create user
//   if (role === "ADMINISTRATOR") {
//     const restrictedFeatures = ["create_company", "create_buyer", "create_project", "admin_user_list", "create_user"]
//     return !restrictedFeatures.includes(feature)
//   }
//   return true
// }


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

export async function getCurrentUserRole(): Promise<string | null> {
  try {
    const response = await apiCall("/me")
    if (response.ok) {
      const data = await response.json()
      return data.role || null
    }
    return null
  } catch (error) {
    console.error("Error fetching user role:", error)
    return null
  }
}

export function canAccessFeature(role: string | null, feature: string): boolean {
  // ADMINISTRATOR cannot access: admin user list only
  if (role === "ADMINISTRATOR") {
    const restrictedFeatures = ["admin_user_list"]
    return !restrictedFeatures.includes(feature)
  }

  if (role === "SUPER_ADMIN") {
    const restrictedFeatures = ["staff_user_list"]
    return !restrictedFeatures.includes(feature)
  }

  return true
}
