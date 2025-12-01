// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Search, Plus, Eye, SettingsIcon, X } from "lucide-react"

// const projects = [
//   { id: 1, name: "Summer Collection 2024", company: "TechStyle Co.", samples: 45, status: "In Progress" },
//   { id: 2, name: "Winter Collection 2024", company: "Fashion Forward Inc.", samples: 32, status: "Planning" },
//   { id: 3, name: "Spring Capsule", company: "Global Garments Ltd.", samples: 78, status: "Completed" },
//   { id: 4, name: "Limited Edition Line", company: "Premium Textiles", samples: 28, status: "In Progress" },
// ]

// export default function ProjectsPage() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedProject, setSelectedProject] = useState<any>(null)
//   const [detailsModal, setDetailsModal] = useState(false)
//   const [settingsModal, setSettingsModal] = useState(false)

//   const filteredProjects = projects.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()))

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Projects</h1>
//           <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage and monitor sample projects</p>
//         </div>
//         <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
//           <Plus className="w-4 h-4" />
//           Add New Project
//         </Button>
//       </div>

//       {/* Search Bar */}
//       <div className="mb-6 relative">
//         <Search className="absolute left-3 top-2.5 sm:top-3 w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground" />
//         <input
//           type="text"
//           placeholder="Search projects..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//         />
//       </div>

//       {/* Project Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//         {filteredProjects.map((project) => (
//           <Card key={project.id} className="border-border hover:shadow-lg transition-all">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-base sm:text-lg line-clamp-2">{project.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3 mb-4">
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-1">Company</p>
//                   <p className="text-sm font-medium text-foreground truncate">{project.company}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-1">Samples</p>
//                   <p className="text-sm font-medium text-foreground">{project.samples}</p>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between pt-4 border-t border-border mb-4">
//                 <span
//                   className={`text-xs font-medium px-2 py-1 rounded ${
//                     project.status === "Completed"
//                       ? "bg-green-100 text-green-700"
//                       : project.status === "In Progress"
//                         ? "bg-blue-100 text-blue-700"
//                         : "bg-gray-100 text-gray-700"
//                   }`}
//                 >
//                   {project.status}
//                 </span>
//               </div>
//               <div className="flex gap-2">
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-transparent text-xs sm:text-sm"
//                   onClick={() => {
//                     setSelectedProject(project)
//                     setDetailsModal(true)
//                   }}
//                 >
//                   <Eye className="w-3 sm:w-4 h-3 sm:h-4" />
//                   Details
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-transparent text-xs sm:text-sm"
//                   onClick={() => {
//                     setSelectedProject(project)
//                     setSettingsModal(true)
//                   }}
//                 >
//                   <SettingsIcon className="w-3 sm:w-4 h-3 sm:h-4" />
//                   Settings
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Details Modal */}
//       {detailsModal && selectedProject && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl line-clamp-1">{selectedProject.name}</CardTitle>
//               <button onClick={() => setDetailsModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-2">Project Name</p>
//                   <p className="text-base sm:text-lg font-semibold text-foreground">{selectedProject.name}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-2">Company</p>
//                   <p className="text-base sm:text-lg font-semibold text-foreground">{selectedProject.company}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-2">Status</p>
//                   <span
//                     className={`inline-block text-sm font-medium px-3 py-1 rounded ${
//                       selectedProject.status === "Completed"
//                         ? "bg-green-100 text-green-700"
//                         : selectedProject.status === "In Progress"
//                           ? "bg-blue-100 text-blue-700"
//                           : "bg-gray-100 text-gray-700"
//                     }`}
//                   >
//                     {selectedProject.status}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-2">Samples</p>
//                   <p className="text-base sm:text-lg font-semibold text-foreground">{selectedProject.samples}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Settings Modal */}
//       {settingsModal && selectedProject && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl line-clamp-2">
//                 Project Settings - {selectedProject.name}
//               </CardTitle>
//               <button onClick={() => setSettingsModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Project Name</label>
//                   <input
//                     type="text"
//                     defaultValue={selectedProject.name}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Company</label>
//                   <input
//                     type="text"
//                     defaultValue={selectedProject.company}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Status</label>
//                   <select className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
//                     <option>Planning</option>
//                     <option>In Progress</option>
//                     <option>Completed</option>
//                   </select>
//                 </div>
//                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
//                   <Button className="flex-1 bg-primary hover:bg-primary/90 text-white text-sm">Save Changes</Button>
//                   <Button
//                     variant="outline"
//                     className="flex-1 bg-transparent text-sm"
//                     onClick={() => setSettingsModal(false)}
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Plus, Eye, SettingsIcon, X } from "lucide-react"
import { getCookie, getCurrentUserRole, canAccessFeature } from "@/lib/auth-utils"

const projects = [
  { id: 1, name: "Summer Collection 2024", company: "TechStyle Co.", samples: 45, status: "In Progress" },
  { id: 2, name: "Winter Collection 2024", company: "Fashion Forward Inc.", samples: 32, status: "Planning" },
  { id: 3, name: "Spring Capsule", company: "Global Garments Ltd.", samples: 78, status: "Completed" },
  { id: 4, name: "Limited Edition Line", company: "Premium Textiles", samples: 28, status: "In Progress" },
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [detailsModal, setDetailsModal] = useState(false)
  const [settingsModal, setSettingsModal] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = getCookie("access_token")
      if (!token) return

      const role = await getCurrentUserRole()
      setUserRole(role)
    }

    fetchUserRole()
  }, [])

  const filteredProjects = projects.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage and monitor sample projects</p>
        </div>
        {canAccessFeature(userRole, "create_project") && (
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Project
          </Button>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-2.5 sm:top-3 w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="border-border hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg line-clamp-2">{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Company</p>
                  <p className="text-sm font-medium text-foreground truncate">{project.company}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Samples</p>
                  <p className="text-sm font-medium text-foreground">{project.samples}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border mb-4">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    project.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : project.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-transparent text-xs sm:text-sm"
                  onClick={() => {
                    setSelectedProject(project)
                    setDetailsModal(true)
                  }}
                >
                  <Eye className="w-3 sm:w-4 h-3 sm:h-4" />
                  Details
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-transparent text-xs sm:text-sm"
                  onClick={() => {
                    setSelectedProject(project)
                    setSettingsModal(true)
                  }}
                >
                  <SettingsIcon className="w-3 sm:w-4 h-3 sm:h-4" />
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details Modal */}
      {detailsModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-lg sm:text-xl line-clamp-1">{selectedProject.name}</CardTitle>
              <button onClick={() => setDetailsModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Project Name</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">{selectedProject.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Company</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">{selectedProject.company}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Status</p>
                  <span
                    className={`inline-block text-sm font-medium px-3 py-1 rounded ${
                      selectedProject.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : selectedProject.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {selectedProject.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Samples</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">{selectedProject.samples}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Settings Modal */}
      {settingsModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-lg sm:text-xl line-clamp-2">
                Project Settings - {selectedProject.name}
              </CardTitle>
              <button onClick={() => setSettingsModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Project Name</label>
                  <input
                    type="text"
                    defaultValue={selectedProject.name}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Company</label>
                  <input
                    type="text"
                    defaultValue={selectedProject.company}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Status</label>
                  <select className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Planning</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-white text-sm">Save Changes</Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent text-sm"
                    onClick={() => setSettingsModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
