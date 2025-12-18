"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LogOut, User, FileText } from "lucide-react"
import { apiCall } from "@/lib/auth-utils"

interface UserData {
  id: number
  first_name: string
  last_name: string
  email: string
  role: string
  username: string
  profile_picture?: string | null
}

export default function UserPanel() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiCall("/me")
        if (response.ok) {
          const data = await response.json()
          setUser(data)
        }
      } catch (error) {
        console.error("Failed to fetch user data", error)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = () => {
    // Remove tokens from cookies
    document.cookie = "access_token=; path=/; Max-Age=0"
    document.cookie = "refresh_token=; path=/; Max-Age=0"
    router.push("/login")
  }

  const getInitials = () => {
    if (!user) return "JD"
    const first = user.first_name?.charAt(0) || ""
    const last = user.last_name?.charAt(0) || ""
    return (first + last).toUpperCase() || user.username?.substring(0, 2).toUpperCase() || "JD"
  }

  const getDisplayName = () => {
    if (!user) return "John Doe"
    return `${user.first_name} ${user.last_name}`
  }

  const getRole = () => {
    if (!user) return "Admin"
    // Format simple role if strictly needed, or just display raw
    return user.role.replace("_", " ") // e.g. SUPER_ADMIN -> SUPER ADMIN
  }

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white border border-border rounded-lg shadow-xl z-50 overflow-hidden">
      {/* Profile Section */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold overflow-hidden">
            {user?.profile_picture ? (
              <img src={user.profile_picture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              getInitials()
            )}
          </div>
          <div>
            <p className="font-medium text-foreground text-sm max-w-[180px]" title={getDisplayName()}>{getDisplayName()}</p>
            <p className="text-xs text-muted-foreground capitalize">{getRole().toLowerCase()}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground truncate" title={user?.email || "john.doe@techstyle.com"}>{user?.email || "john.doe@techstyle.com"}</p>
      </div>

      {/* Menu Items */}
      <div className="p-2">
        <button
          onClick={() => router.push("/profile")}
          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition-colors text-foreground text-sm"
        >
          <User className="w-4 h-4" />
          Profile
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition-colors text-foreground text-sm">
          <FileText className="w-4 h-4" />
          Logs
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition-colors text-destructive text-sm"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  )
}
