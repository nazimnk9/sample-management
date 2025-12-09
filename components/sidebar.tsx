// "use client"

// import { usePathname } from "next/navigation"
// import Link from "next/link"
// import { LayoutDashboard, Building2, Users, FolderOpen, Grid3x3, Archive, BarChart3, Settings } from "lucide-react"

// interface SidebarProps {
//   sidebarOpen: boolean
// }

// export default function Sidebar({ sidebarOpen }: SidebarProps) {
//   const pathname = usePathname()

//   const menuItems = [
//     { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
//     { id: "company", label: "Company", icon: Building2 },
//     { id: "buyers", label: "Buyers", icon: Users },
//     { id: "projects", label: "Projects", icon: FolderOpen },
//     { id: "space", label: "Space", icon: Grid3x3 },
//     { id: "drawers", label: "Drawers", icon: Archive },
//     { id: "analytics", label: "Analytics", icon: BarChart3 },
//   ]

//   const isActive = (id: string) => pathname === `/${id}`

//   return (
//     <aside
//       className={`${
//         sidebarOpen ? "w-64" : "w-20"
//       } bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 flex flex-col overflow-y-auto hidden sm:flex max-h-screen sticky top-0`}
//     >
//       <div className="h-16 flex-shrink-0 border-b border-sidebar-border"></div>

//       {/* Menu Items */}
//       <nav className="flex-1 px-4 py-6">
//         <div className="space-y-2">
//           {menuItems.map((item) => {
//             const Icon = item.icon
//             return (
//               <Link
//                 key={item.id}
//                 href={`/${item.id}`}
//                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
//                   isActive(item.id)
//                     ? "bg-sidebar-primary text-sidebar-primary-foreground"
//                     : "hover:bg-sidebar-accent/20 text-sidebar-foreground"
//                 }`}
//               >
//                 <Icon className="w-5 h-5 flex-shrink-0" />
//                 {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
//               </Link>
//             )
//           })}
//         </div>
//       </nav>

//       {/* Bottom Settings */}
//       <div className="border-t border-sidebar-border p-4 mt-auto">
//         <Link
//           href="/admin-settings"
//           className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
//             isActive("admin-settings")
//               ? "bg-sidebar-primary text-sidebar-primary-foreground"
//               : "hover:bg-sidebar-accent/20 text-sidebar-foreground"
//           }`}
//         >
//           <Settings className="w-5 h-5 flex-shrink-0" />
//           {sidebarOpen && <span className="text-sm font-medium">Admin Settings</span>}
//         </Link>
//       </div>
//     </aside>
//   )
// }


// "use client"

// import { usePathname } from "next/navigation"
// import Link from "next/link"
// import { LayoutDashboard, Building2, Users, FolderOpen, Grid3x3, Archive, BarChart3, Settings } from "lucide-react"
// import { useEffect, useState } from "react"
// import { getCurrentUserRole, canAccessFeature } from "@/lib/auth-utils"

// interface SidebarProps {
//   sidebarOpen: boolean
// }

// export default function Sidebar({ sidebarOpen }: SidebarProps) {
//   const pathname = usePathname()
//   const [userRole, setUserRole] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const fetchRole = async () => {
//       const role = await getCurrentUserRole()
//       setUserRole(role)
//       setIsLoading(false)
//     }
//     fetchRole()
//   }, [])

//   const menuItems = [
//     { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
//     { id: "company", label: "Company", icon: Building2, feature: "company_list" },
//     { id: "buyers", label: "Buyers", icon: Users, feature: "buyer_list" },
//     { id: "projects", label: "Projects", icon: FolderOpen, feature: "project_list" },
//     { id: "space", label: "Space", icon: Grid3x3, feature: "space_list" },
//     { id: "drawers", label: "Drawers", icon: Archive, feature: "drawer_list" },
//     { id: "analytics", label: "Analytics", icon: BarChart3, feature: "analytics_list" },
//     { id: "adminUser", label: "Users", icon: Users, feature: "admin_user_list" },
//   ]

//   const isActive = (id: string) => pathname === `/${id}`

//   return (
//     <aside
//       className={`${
//         sidebarOpen ? "w-64" : "w-20"
//       } bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 flex flex-col overflow-y-auto hidden sm:flex max-h-screen sticky top-0`}
//     >
//       <div className="h-16 flex-shrink-0"></div>

//       {/* Menu Items */}
//       <nav className="flex-1 px-4 py-6">
//         <div className="space-y-2">
//           {menuItems.map((item) => {
//             const Icon = item.icon
//             if (item.feature && !canAccessFeature(userRole, item.feature)) {
//               return null
//             }
//             return (
//               <Link
//                 key={item.id}
//                 href={`/${item.id}`}
//                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
//                   isActive(item.id)
//                     ? "bg-sidebar-primary text-sidebar-primary-foreground"
//                     : "hover:bg-sidebar-accent/20 text-sidebar-foreground"
//                 }`}
//               >
//                 <Icon className="w-5 h-5 flex-shrink-0" />
//                 {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
//               </Link>
//             )
//           })}
//         </div>
//       </nav>

//       {/* Bottom Settings */}
//       <div className="border-t border-sidebar-border p-4 mt-auto">
//         <Link
//           href="/admin-settings"
//           className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
//             isActive("admin-settings")
//               ? "bg-sidebar-primary text-sidebar-primary-foreground"
//               : "hover:bg-sidebar-accent/20 text-sidebar-foreground"
//           }`}
//         >
//           <Settings className="w-5 h-5 flex-shrink-0" />
//           {sidebarOpen && <span className="text-sm font-medium">Admin Settings</span>}
//         </Link>
//       </div>
//     </aside>
//   )
// }

// "use client"

// import { usePathname } from "next/navigation"
// import Link from "next/link"
// import { LayoutDashboard, Building2, Users, FolderOpen, Grid3x3, Archive, BarChart3, Settings } from "lucide-react"
// import { useEffect, useState } from "react"
// import { getCurrentUserRole, canAccessFeature } from "@/lib/auth-utils"

// interface SidebarProps {
//   sidebarOpen: boolean
// }

// export default function Sidebar({ sidebarOpen }: SidebarProps) {
//   const pathname = usePathname()
//   const [userRole, setUserRole] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const fetchRole = async () => {
//       const role = await getCurrentUserRole()
//       setUserRole(role)
//       setIsLoading(false)
//     }
//     fetchRole()
//   }, [])

//   const menuItems = [
//     { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
//     { id: "company", label: "Company", icon: Building2, feature: "company_list" },
//     { id: "buyers", label: "Buyers", icon: Users, feature: "buyer_list" },
//     { id: "projects", label: "Projects", icon: FolderOpen, feature: "project_list" },
//     { id: "space", label: "Space", icon: Grid3x3, feature: "space_list" },
//     { id: "drawers", label: "Drawers", icon: Archive, feature: "drawer_list" },
//     { id: "analytics", label: "Analytics", icon: BarChart3, feature: "analytics_list" },
//     { id: "adminUser", label: "Users", icon: Users, feature: "admin_user_list" },
//     { id: "staffUser", label: "Staff", icon: Users, feature: "staff_user_list" },
//   ]

//   const isActive = (id: string) => pathname === `/${id}`

//   return (
//     <aside
//       className={`${
//         sidebarOpen ? "w-64" : "w-20"
//       } bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 flex flex-col overflow-y-auto hidden sm:flex max-h-screen sticky top-0`}
//     >
//       <div className="h-16 flex-shrink-0 border-b border-sidebar-border"></div>

//       {/* Menu Items */}
//       <nav className="flex-1 px-4 py-6">
//         <div className="space-y-2">
//           {menuItems.map((item) => {
//             const Icon = item.icon
//             if (item.feature && !canAccessFeature(userRole, item.feature)) {
//               return null
//             }
//             return (
//               <Link
//                 key={item.id}
//                 href={`/${item.id}`}
//                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
//                   isActive(item.id)
//                     ? "bg-sidebar-primary text-sidebar-primary-foreground"
//                     : "hover:bg-sidebar-accent/20 text-sidebar-foreground"
//                 }`}
//               >
//                 <Icon className="w-5 h-5 flex-shrink-0" />
//                 {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
//               </Link>
//             )
//           })}
//         </div>
//       </nav>

//       {/* Bottom Settings */}
//       <div className="border-t border-sidebar-border p-4 mt-auto">
//         <Link
//           href="/admin-settings"
//           className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
//             isActive("admin-settings")
//               ? "bg-sidebar-primary text-sidebar-primary-foreground"
//               : "hover:bg-sidebar-accent/20 text-sidebar-foreground"
//           }`}
//         >
//           <Settings className="w-5 h-5 flex-shrink-0" />
//           {sidebarOpen && <span className="text-sm font-medium">Admin Settings</span>}
//         </Link>
//       </div>
//     </aside>
//   )
// }


"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Building2,
  Users,
  FolderOpen,
  Grid3x3,
  Archive,
  BarChart3,
  Settings,
  FileText,
} from "lucide-react"
import { useEffect, useState } from "react"
import { getCurrentUserRole, canAccessFeature } from "@/lib/auth-utils"

interface SidebarProps {
  sidebarOpen: boolean
}

export default function Sidebar({ sidebarOpen }: SidebarProps) {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRole = async () => {
      const role = await getCurrentUserRole()
      setUserRole(role)
      setIsLoading(false)
    }
    fetchRole()
  }, [])

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "company", label: "Company", icon: Building2, feature: "company_list" },
    { id: "buyers", label: "Buyers", icon: Users, feature: "buyer_list" },
    { id: "projects", label: "Projects", icon: FolderOpen, feature: "project_list" },
    { id: "space", label: "Space", icon: Grid3x3, feature: "space_list" },
    { id: "drawers", label: "Drawers", icon: Archive, feature: "drawer_list" },
    { id: "analytics", label: "Analytics", icon: BarChart3, feature: "analytics_list" },
    { id: "notes", label: "Notes", icon: FileText, feature: "notes_list" },
    { id: "adminUser", label: "Users", icon: Users, feature: "admin_user_list" },
    { id: "staffUser", label: "Staff", icon: Users, feature: "staff_user_list" },
  ]

  const isActive = (id: string) => pathname === `/${id}`

  return (
    <aside
      className={`${sidebarOpen ? "w-64" : "w-20"
        } bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 flex flex-col overflow-y-auto hidden sm:flex max-h-screen sticky top-0`}
    >
      <div className="h-16 flex-shrink-0 border-b border-sidebar-border"></div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            if (item.feature && !canAccessFeature(userRole, item.feature)) {
              return null
            }
            return (
              <Link
                key={item.id}
                href={`/${item.id}`}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive(item.id)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "hover:bg-sidebar-accent/20 text-sidebar-foreground"
                  }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Bottom Settings */}
      <div className="border-t border-sidebar-border p-4 mt-auto">
        <Link
          href="/admin-settings"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive("admin-settings")
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "hover:bg-sidebar-accent/20 text-sidebar-foreground"
            }`}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {sidebarOpen && <span className="text-sm font-medium">Admin Settings</span>}
        </Link>
      </div>
    </aside>
  )
}
