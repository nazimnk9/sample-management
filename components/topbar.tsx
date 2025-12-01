// "use client"

// import { usePathname, useRouter } from "next/navigation"
// import { useState } from "react"
// import { Menu, Bell, Grid, User, ChevronDown, X } from "lucide-react"
// import AppsPanel from "./panels/apps-panel"
// import NotificationPanel from "./panels/notification-panel"
// import UserPanel from "./panels/user-panel"

// interface TopbarProps {
//   sidebarOpen: boolean
//   setSidebarOpen: (open: boolean) => void
//   selectedCompany: string
//   setSelectedCompany: (company: string) => void
//   notifications: any[]
//   setNotifications: (notifications: any[]) => void
// }

// export default function Topbar({
//   sidebarOpen,
//   setSidebarOpen,
//   selectedCompany,
//   setSelectedCompany,
//   notifications,
//   setNotifications,
// }: TopbarProps) {
//   const pathname = usePathname()
//   const router = useRouter()
//   const [appsOpen, setAppsOpen] = useState(false)
//   const [notificationOpen, setNotificationOpen] = useState(false)
//   const [userOpen, setUserOpen] = useState(false)
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   const companies = ["TechStyle Co.", "Fashion Forward Inc.", "Global Garments Ltd."]

//   const menuItems = [
//     { id: "dashboard", label: "Dashboard" },
//     { id: "company", label: "Company" },
//     { id: "buyers", label: "Buyers" },
//     { id: "projects", label: "Projects" },
//     { id: "space", label: "Space" },
//     { id: "drawers", label: "Drawers" },
//     { id: "analytics", label: "Analytics" },
//     { id: "admin-settings", label: "Admin Settings" },
//   ]

//   const handleNavigate = (id: string) => {
//     router.push(`/${id}`)
//     setMobileMenuOpen(false)
//   }

//   return (
//     <>
//       <header className="h-16 bg-white border-b border-border shadow-sm flex items-center justify-between px-4 sm:px-6 sticky top-0 z-50">
//         {/* Left Section - Menu Toggle */}
//         <div className="flex items-center gap-2 sm:gap-4">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="hidden sm:flex p-2 hover:bg-muted rounded-lg transition-colors text-foreground"
//             title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
//           >
//             <Menu className="w-5 h-5" />
//           </button>

//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="sm:hidden p-2 hover:bg-muted rounded-lg transition-colors text-foreground"
//           >
//             {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//           </button>
//           <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-sm">
//             GS
//           </div>
//         </div>

//         {/* Right Section - Controls */}
//         <div className="flex items-center gap-2 sm:gap-4">
//           {/* Company Selector - Hidden on mobile */}
//           <div className="relative group hidden md:block">
//             <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-accent/30 transition-colors text-foreground text-sm font-medium whitespace-nowrap">
//               {selectedCompany.split(" ")[0]}
//               <ChevronDown className="w-4 h-4" />
//             </button>
//             <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
//               {companies.map((company) => (
//                 <button
//                   key={company}
//                   onClick={() => setSelectedCompany(company)}
//                   className="w-full text-left px-4 py-2 hover:bg-muted first:rounded-t-lg last:rounded-b-lg transition-colors text-sm"
//                 >
//                   {company}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Apps Icon */}
//           <div className="relative">
//             <button
//               onClick={() => setAppsOpen(!appsOpen)}
//               className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground relative"
//             >
//               <Grid className="w-5 h-5" />
//             </button>
//             {appsOpen && <AppsPanel />}
//           </div>

//           {/* Notification Icon */}
//           <div className="relative">
//             <button
//               onClick={() => setNotificationOpen(!notificationOpen)}
//               className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground relative"
//             >
//               <Bell className="w-5 h-5" />
//               {notifications.some((n) => !n.read) && (
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               )}
//             </button>
//             {notificationOpen && (
//               <NotificationPanel notifications={notifications} setNotifications={setNotifications} />
//             )}
//           </div>

//           {/* User Icon */}
//           <div className="relative">
//             <button
//               onClick={() => setUserOpen(!userOpen)}
//               className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground"
//             >
//               <User className="w-5 h-5" />
//             </button>
//             {userOpen && <UserPanel />}
//           </div>
//         </div>
//       </header>

//       {mobileMenuOpen && (
//         <div className="sm:hidden bg-white border-b border-border shadow-sm p-4 flex flex-col gap-2">
//           <div className="mb-4">
//             <label className="text-xs font-semibold text-muted-foreground mb-2 block">Company</label>
//             <select
//               value={selectedCompany}
//               onChange={(e) => setSelectedCompany(e.target.value)}
//               className="w-full px-3 py-2 border border-border rounded-lg text-sm"
//             >
//               {companies.map((company) => (
//                 <option key={company} value={company}>
//                   {company}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="space-y-1">
//             {menuItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => handleNavigate(item.id)}
//                 className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
//                   pathname === `/${item.id}` ? "bg-primary text-white" : "hover:bg-muted text-foreground"
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   )
// }


"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Menu, Bell, Grid, User, ChevronDown, X } from "lucide-react"
import AppsPanel from "./panels/apps-panel"
import NotificationPanel from "./panels/notification-panel"
import UserPanel from "./panels/user-panel"

interface TopbarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  selectedCompany: string
  setSelectedCompany: (company: string) => void
  notifications: any[]
  setNotifications: (notifications: any[]) => void
}

export default function Topbar({
  sidebarOpen,
  setSidebarOpen,
  selectedCompany,
  setSelectedCompany,
  notifications,
  setNotifications,
}: TopbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [appsOpen, setAppsOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const companies = ["TechStyle Co.", "Fashion Forward Inc.", "Global Garments Ltd."]

  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "company", label: "Company" },
    { id: "buyers", label: "Buyers" },
    { id: "projects", label: "Projects" },
    { id: "space", label: "Space" },
    { id: "drawers", label: "Drawers" },
    { id: "analytics", label: "Analytics" },
    { id: "adminUser", label: "Users" },
    { id: "admin-settings", label: "Admin Settings" },
  ]

  const handleNavigate = (id: string) => {
    router.push(`/${id}`)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="h-16 bg-white border-b border-border shadow-sm flex items-center justify-between px-4 sm:px-6 sticky top-0 z-50">
        {/* Left Section - Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden sm:flex p-2 hover:bg-muted rounded-lg transition-colors text-foreground"
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 hover:bg-muted rounded-lg transition-colors text-foreground"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Company Selector - Hidden on mobile */}
          <div className="relative group hidden md:block">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-accent/30 transition-colors text-foreground text-sm font-medium whitespace-nowrap">
              {selectedCompany.split(" ")[0]}
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
              {companies.map((company) => (
                <button
                  key={company}
                  onClick={() => setSelectedCompany(company)}
                  className="w-full text-left px-4 py-2 hover:bg-muted first:rounded-t-lg last:rounded-b-lg transition-colors text-sm"
                >
                  {company}
                </button>
              ))}
            </div>
          </div>

          {/* Apps Icon */}
          <div className="relative">
            <button
              onClick={() => setAppsOpen(!appsOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground relative"
            >
              <Grid className="w-5 h-5" />
            </button>
            {appsOpen && <AppsPanel />}
          </div>

          {/* Notification Icon */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground relative"
            >
              <Bell className="w-5 h-5" />
              {notifications.some((n) => !n.read) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            {notificationOpen && (
              <NotificationPanel notifications={notifications} setNotifications={setNotifications} />
            )}
          </div>

          {/* User Icon */}
          <div className="relative">
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground"
            >
              <User className="w-5 h-5" />
            </button>
            {userOpen && <UserPanel />}
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-border shadow-sm p-4 flex flex-col gap-2">
          <div className="mb-4">
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">Company</label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm"
            >
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                  pathname === `/${item.id}` ? "bg-primary text-white" : "hover:bg-muted text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
