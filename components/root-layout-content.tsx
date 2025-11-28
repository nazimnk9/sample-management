// "use client"

// import type { ReactNode } from "react"
// import Sidebar from "@/components/sidebar"
// import Topbar from "@/components/topbar"
// import { useState } from "react"

// interface RootLayoutContentProps {
//   children: ReactNode
// }

// export default function RootLayoutContent({ children }: RootLayoutContentProps) {
//   const [sidebarOpen, setSidebarOpen] = useState(true)
//   const [selectedCompany, setSelectedCompany] = useState("TechStyle Co.")
//   const [notifications, setNotifications] = useState([
//     { id: 1, message: "New sample request from Buyer A", time: "2 hours ago", read: false },
//     { id: 2, message: "Project status updated", time: "5 hours ago", read: false },
//     { id: 3, message: "Company approval completed", time: "1 day ago", read: true },
//   ])

//   return (
//     <div className="flex h-screen bg-background overflow-hidden">
//       <Sidebar sidebarOpen={sidebarOpen} />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Topbar
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//           selectedCompany={selectedCompany}
//           setSelectedCompany={setSelectedCompany}
//           notifications={notifications}
//           setNotifications={setNotifications}
//         />
//         <main className="flex-1 overflow-auto bg-background">{children}</main>
//       </div>
//     </div>
//   )
// }


"use client"

import type { ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Sidebar from "@/components/sidebar"
import Topbar from "@/components/topbar"

interface RootLayoutContentProps {
  children: ReactNode
}

export default function RootLayoutContent({ children }: RootLayoutContentProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedCompany, setSelectedCompany] = useState("TechStyle Co.")
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New sample request from Buyer A", time: "2 hours ago", read: false },
    { id: 2, message: "Project status updated", time: "5 hours ago", read: false },
    { id: 3, message: "Company approval completed", time: "1 day ago", read: true },
  ])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const token = getCookie("access_token")
      if (token) {
        setIsAuthenticated(true)
      } else {
        if (pathname !== "/login") {
          router.push("/login")
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [pathname, router])

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(";").shift()
    return null
  }

  // Show login page without layout for login route
  if (pathname === "/login") {
    return children
  }

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Show dashboard layout only if authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          notifications={notifications}
          setNotifications={setNotifications}
        />
        <main className="flex-1 overflow-auto bg-background">{children}</main>
      </div>
    </div>
  )
}
