// import { LogOut, User, FileText } from "lucide-react"

// export default function UserPanel() {
//   return (
//     <div className="absolute right-0 mt-2 w-72 bg-white border border-border rounded-lg shadow-xl z-50 overflow-hidden">
//       {/* Profile Section */}
//       <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
//         <div className="flex items-center gap-3 mb-3">
//           <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
//             JD
//           </div>
//           <div>
//             <p className="font-medium text-foreground text-sm">John Doe</p>
//             <p className="text-xs text-muted-foreground">Admin</p>
//           </div>
//         </div>
//         <p className="text-xs text-muted-foreground">john.doe@techstyle.com</p>
//       </div>

//       {/* Menu Items */}
//       <div className="p-2">
//         <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition-colors text-foreground text-sm">
//           <User className="w-4 h-4" />
//           Profile
//         </button>
//         <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition-colors text-foreground text-sm">
//           <FileText className="w-4 h-4" />
//           Logs
//         </button>
//         <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition-colors text-destructive text-sm">
//           <LogOut className="w-4 h-4" />
//           Logout
//         </button>
//       </div>
//     </div>
//   )
// }


"use client"

import { useRouter } from "next/navigation"
import { LogOut, User, FileText } from "lucide-react"

export default function UserPanel() {
  const router = useRouter()

  const handleLogout = () => {
    // Remove tokens from cookies
    document.cookie = "access_token=; path=/; Max-Age=0"
    document.cookie = "refresh_token=; path=/; Max-Age=0"
    router.push("/login")
  }

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white border border-border rounded-lg shadow-xl z-50 overflow-hidden">
      {/* Profile Section */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
            JD
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">John Doe</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">john.doe@techstyle.com</p>
      </div>

      {/* Menu Items */}
      <div className="p-2">
        <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition-colors text-foreground text-sm">
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
