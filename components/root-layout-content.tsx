"use client"

import type { ReactNode } from "react"
import Sidebar from "@/components/sidebar"
import Topbar from "@/components/topbar"
import { useState } from "react"

interface RootLayoutContentProps {
  children: ReactNode
}

export default function RootLayoutContent({ children }: RootLayoutContentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedCompany, setSelectedCompany] = useState("TechStyle Co.")
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New sample request from Buyer A", time: "2 hours ago", read: false },
    { id: 2, message: "Project status updated", time: "5 hours ago", read: false },
    { id: 3, message: "Company approval completed", time: "1 day ago", read: true },
  ])

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
