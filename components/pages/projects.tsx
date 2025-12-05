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


// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Search, Plus, Eye, SettingsIcon, X } from "lucide-react"
// import { getCookie } from "@/lib/auth-utils"

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

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       const token = getCookie("access_token")
//       if (!token) return
//     }

//     fetchUserRole()
//   }, [])

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


// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Search, Plus, Eye, SettingsIcon, X } from "lucide-react"
// import { getCookie } from "@/lib/auth-utils"
// import Link from "next/link"

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

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       const token = getCookie("access_token")
//       if (!token) return
//     }

//     fetchUserRole()
//   }, [])

//   const filteredProjects = projects.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()))

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Projects</h1>
//           <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage and monitor sample projects</p>
//         </div>
//         <Link href="/projects/add" className="w-full sm:w-auto">
//           <Button className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
//             <Plus className="w-4 h-4" />
//             Add New Project
//           </Button>
//         </Link>
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


// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Search, Plus, Eye, MoreVertical, X, Upload, Loader2 } from "lucide-react"
// import { getCookie, apiCall, getCurrentUserRole, canAccessFeature } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useToast } from "@/hooks/use-toast"

// interface ProjectImage {
//   uid: string
//   file: string
//   file_name: string
// }

// interface ProjectBuyer {
//   uid: string
//   name: string
// }

// interface ProjectCompany {
//   uid: string
//   name: string
// }

// interface Project {
//   uid: string
//   name: string
//   company: ProjectCompany
//   started_at: string
//   will_finish_at: string
//   images: ProjectImage[]
//   buyers: ProjectBuyer[]
// }

// function ImageUploadModal({
//   isOpen,
//   onClose,
//   onImagesUpload,
//   existingImages = [],
// }: {
//   isOpen: boolean
//   onClose: () => void
//   onImagesUpload: (uids: string[]) => void
//   existingImages?: ProjectImage[]
// }) {
//   const { toast } = useToast()
//   const [uploadedImages, setUploadedImages] = useState<Array<{ uid: string; preview: string }>>(
//     existingImages.map((img) => ({ uid: img.uid, preview: img.file })),
//   )
//   const [isUploading, setIsUploading] = useState(false)

//   const compressImage = async (file: File): Promise<Blob> => {
//     return new Promise((resolve) => {
//       const reader = new FileReader()
//       reader.readAsDataURL(file)
//       reader.onload = (e) => {
//         const img = new Image()
//         img.src = e.target?.result as string
//         img.onload = () => {
//           const canvas = document.createElement("canvas")
//           let width = img.width
//           let height = img.height
//           let quality = 0.9

//           while (quality > 0.1) {
//             canvas.width = width
//             canvas.height = height
//             const ctx = canvas.getContext("2d")
//             ctx?.drawImage(img, 0, 0, width, height)

//             const dataUrl = canvas.toDataURL("image/jpeg", quality)
//             if (dataUrl.length / 1024 <= 999) break
//             quality -= 0.1
//           }

//           if (img.width > 1920 || img.height > 1920) {
//             const maxDim = 1920
//             if (width > height) {
//               height = Math.round((height * maxDim) / width)
//               width = maxDim
//             } else {
//               width = Math.round((width * maxDim) / height)
//               height = maxDim
//             }
//           }

//           canvas.width = width
//           canvas.height = height
//           const ctx = canvas.getContext("2d")
//           ctx?.drawImage(img, 0, 0, width, height)

//           canvas.toBlob(
//             (blob) => {
//               if (blob) resolve(blob)
//             },
//             "image/jpeg",
//             quality,
//           )
//         }
//       }
//     })
//   }

//   const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.currentTarget.files
//     if (!files) return

//     setIsUploading(true)
//     try {
//       for (let i = 0; i < files.length; i++) {
//         const file = files[i]
//         const compressedBlob = await compressImage(file)

//         const formData = new FormData()
//         formData.append("file", new File([compressedBlob], file.name, { type: "image/jpeg" }))

//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/images/`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${getCookie("access_token")}`,
//           },
//           body: formData,
//         })

//         if (!response.ok) {
//           throw new Error("Failed to upload image")
//         }

//         const data = await response.json()
//         const imagePreview = URL.createObjectURL(compressedBlob)

//         setUploadedImages((prev) => [...prev, { uid: data.uid, preview: imagePreview }])
//       }

//       toast({
//         title: "Success",
//         description: `${files.length} image(s) uploaded successfully.`,
//       })
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "Failed to upload images. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   const handleRemoveImage = (uid: string) => {
//     setUploadedImages((prev) => prev.filter((img) => img.uid !== uid))
//   }

//   const handleConfirm = () => {
//     const uids = uploadedImages.map((img) => img.uid)
//     localStorage.setItem("project_update_image_uids", JSON.stringify(uids))
//     onImagesUpload(uids)
//     onClose()
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//         <CardContent className="pt-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-foreground">Manage Project Images</h2>
//             <button onClick={onClose} className="p-1 hover:bg-muted rounded">
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           <div className="border-2 border-dashed border-border rounded-lg p-6 mb-6 text-center">
//             <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
//             <p className="text-sm text-muted-foreground mb-4">Add more images or replace existing ones</p>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleFileSelect}
//               disabled={isUploading}
//               className="hidden"
//               id="image-input-update"
//             />
//             <label htmlFor="image-input-update">
//               <Button
//                 asChild
//                 disabled={isUploading}
//                 className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
//               >
//                 <span>{isUploading ? "Uploading..." : "Select Images"}</span>
//               </Button>
//             </label>
//           </div>

//           {uploadedImages.length > 0 && (
//             <div>
//               <p className="text-sm font-medium text-foreground mb-3">Images ({uploadedImages.length})</p>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
//                 {uploadedImages.map((img) => (
//                   <div key={img.uid} className="relative group">
//                     <img
//                       src={img.preview || "/placeholder.svg"}
//                       alt="preview"
//                       className="w-full h-32 object-cover rounded-lg border border-border"
//                     />
//                     <button
//                       onClick={() => handleRemoveImage(img.uid)}
//                       className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button onClick={handleConfirm} className="flex-1 bg-primary hover:bg-primary/90 text-white">
//                   Confirm Images
//                 </Button>
//                 <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// function DeleteConfirmationModal({
//   isOpen,
//   onClose,
//   onConfirm,
//   projectName,
//   isDeleting,
// }: {
//   isOpen: boolean
//   onClose: () => void
//   onConfirm: () => void
//   projectName: string
//   isDeleting: boolean
// }) {
//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <Card className="w-full max-w-md border-border">
//         <CardContent className="pt-6">
//           <h2 className="text-lg font-bold text-foreground mb-2">Delete Project?</h2>
//           <p className="text-sm text-muted-foreground mb-6">
//             Are you sure you want to delete <strong>{projectName}</strong>? This action cannot be undone.
//           </p>
//           <div className="flex gap-3">
//             <Button onClick={onConfirm} disabled={isDeleting} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
//               {isDeleting ? (
//                 <>
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   Deleting...
//                 </>
//               ) : (
//                 "Delete"
//               )}
//             </Button>
//             <Button onClick={onClose} disabled={isDeleting} variant="outline" className="flex-1 bg-transparent">
//               Cancel
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default function ProjectsPage() {
//   const { toast } = useToast()
//   const [searchTerm, setSearchTerm] = useState("")
//   const [projects, setProjects] = useState<Project[]>([])
//   const [userRole, setUserRole] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null)
//   const [detailsModal, setDetailsModal] = useState(false)
//   const [settingsModal, setSettingsModal] = useState(false)
//   const [imageUploadModal, setImageUploadModal] = useState(false)
//   const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)
//   const [isSaving, setIsSaving] = useState(false)
//   const [companies, setCompanies] = useState<Array<{ uid: string; name: string }>>([])
//   const [buyers, setBuyers] = useState<Array<{ uid: string; name: string }>>([])
//   const [companiesLoading, setCompaniesLoading] = useState(false)
//   const [buyersLoading, setBuyersLoading] = useState(false)
//   const [menuOpen, setMenuOpen] = useState<string | null>(null)

//   const [formData, setFormData] = useState({
//     name: "",
//     started_at: "",
//     will_finish_at: "",
//     company_uid: "",
//     buyer_uids: [] as string[],
//   })

//   const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

//   useEffect(() => {
//     const fetchProjectsAndRole = async () => {
//       try {
//         const token = getCookie("access_token")
//         if (!token) {
//           return
//         }

//         const role = await getCurrentUserRole()
//         setUserRole(role)

//         const response = await apiCall("/sample_manager/project/")
//         if (response.ok) {
//           const data = await response.json()
//           const projectList = Array.isArray(data) ? data : data.results || []
//           setProjects(projectList)
//         } else {
//           throw new Error("Failed to fetch projects")
//         }
//       } catch (err) {
//         toast({
//           title: "Error",
//           description: "Failed to load projects",
//           variant: "destructive",
//         })
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchProjectsAndRole()
//   }, [toast])

//   const openSettingsModal = async (project: Project) => {
//     setSelectedProject(project)
//     setFormData({
//       name: project.name,
//       started_at: project.started_at.slice(0, 16),
//       will_finish_at: project.will_finish_at.slice(0, 16),
//       company_uid: project.company.uid,
//       buyer_uids: project.buyers.map((b) => b.uid),
//     })

//     setCompaniesLoading(true)
//     setBuyersLoading(true)

//     try {
//       const companyRes = await apiCall("/organizations/my_companys/")
//       if (companyRes.ok) {
//         const companyData = await companyRes.json()
//         setCompanies(Array.isArray(companyData) ? companyData : companyData.results || [])
//       }

//       const buyerRes = await apiCall("/sample_manager/buyer/")
//       if (buyerRes.ok) {
//         const buyerData = await buyerRes.json()
//         setBuyers(Array.isArray(buyerData) ? buyerData : buyerData.results || [])
//       }
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "Failed to load form data",
//         variant: "destructive",
//       })
//     } finally {
//       setCompaniesLoading(false)
//       setBuyersLoading(false)
//     }

//     setSettingsModal(true)
//   }

//   const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     if (name === "buyer_uids") {
//       const selectedOptions = Array.from((e.target as HTMLSelectElement).selectedOptions, (option) => option.value)
//       setFormData((prev) => ({ ...prev, buyer_uids: selectedOptions }))
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }))
//     }
//     if (fieldErrors[name]) {
//       setFieldErrors((prev) => {
//         const newErrors = { ...prev }
//         delete newErrors[name]
//         return newErrors
//       })
//     }
//   }

//   const handleUpdateProject = async () => {
//     if (!selectedProject) return
//     setIsSaving(true)
//     setFieldErrors({})

//     try {
//       const storedImageUids = localStorage.getItem("project_update_image_uids")
//       const imageUids = storedImageUids ? JSON.parse(storedImageUids) : selectedProject.images.map((img) => img.uid)

//       const submitData = {
//         ...formData,
//         image_uids: imageUids,
//       }

//       const response = await apiCall(`/sample_manager/project/${selectedProject.uid}/`, {
//         method: "PUT",
//         body: JSON.stringify(submitData),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         if (typeof data === "object" && !Array.isArray(data)) {
//           const hasFieldErrors = Object.keys(data).some((key) => Array.isArray(data[key]))
//           if (hasFieldErrors) {
//             setFieldErrors(data)
//             const formattedError = Object.entries(data)
//               .map(([field, messages]: [string, any]) => `${field}: ${messages.join(", ")}`)
//               .join("; ")
//             toast({
//               title: "Validation Error",
//               description: formattedError,
//               variant: "destructive",
//             })
//           }
//         }
//       } else {
//         localStorage.removeItem("project_update_image_uids")
//         toast({
//           title: "Success",
//           description: "Project updated successfully",
//         })
//         setSettingsModal(false)

//         // Refresh projects list
//         const refreshRes = await apiCall("/sample_manager/project/")
//         if (refreshRes.ok) {
//           const refreshData = await refreshRes.json()
//           const projectList = Array.isArray(refreshData) ? refreshData : refreshData.results || []
//           setProjects(projectList)
//         }
//       }
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "Failed to update project",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleDeleteProject = async () => {
//     if (!selectedProject) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/project/${selectedProject.uid}/`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete project")
//       }

//       toast({
//         title: "Success",
//         description: "Project deleted successfully",
//       })

//       setProjects((prev) => prev.filter((p) => p.uid !== selectedProject.uid))
//       setDeleteConfirmModal(false)
//       setMenuOpen(null)
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "Failed to delete project",
//         variant: "destructive",
//       })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const filteredProjects = projects.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()))

//   const formatDateTime = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   if (isLoading) {
//     return (
//       <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto flex items-center justify-center">
//         <Loader2 className="w-8 h-8 animate-spin text-primary" />
//       </div>
//     )
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Projects</h1>
//           <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage and monitor sample projects</p>
//         </div>
//         <Link href="/projects/add" className="w-full sm:w-auto">
//           <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
//             <Plus className="w-4 h-4" />
//             Add New Project
//           </Button>
//         </Link>
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
//           <Card key={project.uid} className="border-border hover:shadow-lg transition-all relative">
//             <div className="absolute top-3 right-3 z-10">
//               <div className="relative">
//                 <button
//                   onClick={() => setMenuOpen(menuOpen === project.uid ? null : project.uid)}
//                   className="p-1 hover:bg-muted rounded"
//                 >
//                   <MoreVertical className="w-5 h-5 text-muted-foreground" />
//                 </button>
//                 {menuOpen === project.uid && (
//                   <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-50">
//                     <button
//                       onClick={() => {
//                         setSelectedProject(project)
//                         setDeleteConfirmModal(true)
//                         setMenuOpen(null)
//                       }}
//                       className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-muted"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <CardHeader className="pb-3">
//               <CardTitle className="text-base sm:text-lg line-clamp-2 pr-8">{project.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3 mb-4">
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-1">Company</p>
//                   <p className="text-sm font-medium text-foreground truncate">{project.company.name}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-1">Images</p>
//                   <p className="text-sm font-medium text-foreground">{project.images.length} images</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-1">Buyers</p>
//                   <p className="text-sm font-medium text-foreground">{project.buyers.length} buyers</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-1">Timeline</p>
//                   <p className="text-sm font-medium text-foreground">
//                     {formatDateTime(project.started_at)} - {formatDateTime(project.will_finish_at)}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-2 pt-4 border-t border-border">
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
//                   onClick={() => openSettingsModal(project)}
//                 >
//                   <MoreVertical className="w-3 sm:w-4 h-3 sm:h-4" />
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
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-2">Project Name</p>
//                     <p className="text-base sm:text-lg font-semibold text-foreground">{selectedProject.name}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-2">Company</p>
//                     <p className="text-base sm:text-lg font-semibold text-foreground">{selectedProject.company.name}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-2">Started Date</p>
//                     <p className="text-base sm:text-lg font-semibold text-foreground">
//                       {formatDateTime(selectedProject.started_at)}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-2">Finish Date</p>
//                     <p className="text-base sm:text-lg font-semibold text-foreground">
//                       {formatDateTime(selectedProject.will_finish_at)}
//                     </p>
//                   </div>
//                 </div>

//                 {selectedProject.buyers.length > 0 && (
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-2">Buyers</p>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedProject.buyers.map((buyer) => (
//                         <span key={buyer.uid} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
//                           {buyer.name}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {selectedProject.images.length > 0 && (
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-3">Project Images</p>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                       {selectedProject.images.map((image) => (
//                         <img
//                           key={image.uid}
//                           src={image.file || "/placeholder.svg"}
//                           alt={image.file_name}
//                           className="w-full h-24 object-cover rounded-lg border border-border"
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )}
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
//               <button
//                 onClick={() => {
//                   setSettingsModal(false)
//                   localStorage.removeItem("project_update_image_uids")
//                 }}
//                 className="p-1 hover:bg-muted rounded flex-shrink-0"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 {/* Project Name */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Project Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleFormChange}
//                     className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name[0]}</p>}
//                 </div>

//                 {/* Started Date */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Started Date</label>
//                   <input
//                     type="datetime-local"
//                     name="started_at"
//                     value={formData.started_at}
//                     onChange={handleFormChange}
//                     className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.started_at ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.started_at && <p className="text-sm text-red-600 mt-1">{fieldErrors.started_at[0]}</p>}
//                 </div>

//                 {/* Finish Date */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Finish Date</label>
//                   <input
//                     type="datetime-local"
//                     name="will_finish_at"
//                     value={formData.will_finish_at}
//                     onChange={handleFormChange}
//                     className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.will_finish_at
//                         ? "border-red-500 focus:ring-red-500"
//                         : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.will_finish_at && (
//                     <p className="text-sm text-red-600 mt-1">{fieldErrors.will_finish_at[0]}</p>
//                   )}
//                 </div>

//                 {/* Company - Only for SUPER_ADMIN */}
//                 {canAccessFeature(userRole, "company_selection") && (
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Company</label>
//                     <select
//                       name="company_uid"
//                       value={formData.company_uid}
//                       onChange={handleFormChange}
//                       disabled={companiesLoading}
//                       className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition disabled:opacity-50 ${
//                         fieldErrors.company_uid
//                           ? "border-red-500 focus:ring-red-500"
//                           : "border-border focus:ring-primary"
//                       }`}
//                     >
//                       {companies.map((company) => (
//                         <option key={company.uid} value={company.uid}>
//                           {company.name}
//                         </option>
//                       ))}
//                     </select>
//                     {fieldErrors.company_uid && (
//                       <p className="text-sm text-red-600 mt-1">{fieldErrors.company_uid[0]}</p>
//                     )}
//                   </div>
//                 )}

//                 {/* Buyers */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Buyers</label>
//                   <select
//                     name="buyer_uids"
//                     multiple
//                     value={formData.buyer_uids}
//                     onChange={handleFormChange}
//                     disabled={buyersLoading}
//                     className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition disabled:opacity-50 ${
//                       fieldErrors.buyer_uids ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   >
//                     {buyers.map((buyer) => (
//                       <option key={buyer.uid} value={buyer.uid}>
//                         {buyer.name}
//                       </option>
//                     ))}
//                   </select>
//                   {fieldErrors.buyer_uids && <p className="text-sm text-red-600 mt-1">{fieldErrors.buyer_uids[0]}</p>}
//                 </div>

//                 {/* Image Management */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">
//                     Project Images ({selectedProject.images.length})
//                   </label>
//                   <Button
//                     type="button"
//                     onClick={() => setImageUploadModal(true)}
//                     className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
//                   >
//                     <Upload className="w-4 h-4" />
//                     Manage Images
//                   </Button>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleUpdateProject}
//                     disabled={isSaving}
//                     className="flex-1 bg-primary hover:bg-primary/90 text-white text-sm"
//                   >
//                     {isSaving ? (
//                       <>
//                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                         Saving...
//                       </>
//                     ) : (
//                       "Update"
//                     )}
//                   </Button>
//                   <Button
//                     onClick={() => {
//                       setSettingsModal(false)
//                       localStorage.removeItem("project_update_image_uids")
//                     }}
//                     disabled={isSaving}
//                     variant="outline"
//                     className="flex-1 bg-transparent text-sm"
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Image Upload Modal */}
//       <ImageUploadModal
//         isOpen={imageUploadModal}
//         onClose={() => setImageUploadModal(false)}
//         onImagesUpload={() => setImageUploadModal(false)}
//         existingImages={selectedProject?.images || []}
//       />

//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmationModal
//         isOpen={deleteConfirmModal}
//         onClose={() => setDeleteConfirmModal(false)}
//         onConfirm={handleDeleteProject}
//         projectName={selectedProject?.name || ""}
//         isDeleting={isDeleting}
//       />
//     </div>
//   )
// }


// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Search, Plus, Eye, SettingsIcon, X, Upload, MoreVertical, Loader2, Trash2 } from "lucide-react"
// import { getCookie, apiCall, getCurrentUserRole, canAccessFeature } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useToast } from "@/hooks/use-toast"
// import { Checkbox } from "@/components/ui/checkbox"

// interface ProjectImage {
//   id: number
//   uid: string
//   file: string
//   file_name: string
// }

// interface ProjectBuyer {
//   id: number
//   uid: string
//   name: string
// }

// interface Project {
//   id: number
//   uid: string
//   name: string
//   company: number
//   started_at: string
//   will_finish_at: string
//   images: ProjectImage[]
//   buyers: ProjectBuyer[]
// }

// interface Company {
//   id: number
//   uid: string
//   name: string
// }

// interface Buyer {
//   id: number
//   uid: string
//   name: string
// }

// interface ImageUploadModalProps {
//   isOpen: boolean
//   onClose: () => void
//   existingImages: ProjectImage[]
//   onImagesUpload: (uids: string[]) => void
// }

// function ImageUploadModal({ isOpen, onClose, existingImages, onImagesUpload }: ImageUploadModalProps) {
//   const { toast } = useToast()
//   const [uploadedImages, setUploadedImages] = useState<Array<{ uid: string; preview: string; isNew: boolean }>>([])
//   const [isUploading, setIsUploading] = useState(false)

//   useEffect(() => {
//     if (isOpen) {
//       const existingPreview = existingImages.map((img) => ({
//         uid: img.uid,
//         preview: img.file,
//         isNew: false,
//       }))
//       setUploadedImages(existingPreview)
//     }
//   }, [isOpen, existingImages])

//   const compressImage = async (file: File): Promise<Blob> => {
//     return new Promise((resolve) => {
//       const reader = new FileReader()
//       reader.readAsDataURL(file)
//       reader.onload = (e) => {
//         const img = new Image()
//         img.src = e.target?.result as string
//         img.onload = () => {
//           const canvas = document.createElement("canvas")
//           let width = img.width
//           let height = img.height
//           let quality = 0.9

//           while (
//             (canvas.toBlob((blob) => {}, "image/jpeg", quality),
//             canvas.toDataURL("image/jpeg", quality).length / 1024 > 999) &&
//             quality > 0.1
//           ) {
//             quality -= 0.1
//           }

//           if (img.width > 1920 || img.height > 1920) {
//             const maxDim = 1920
//             if (width > height) {
//               height = Math.round((height * maxDim) / width)
//               width = maxDim
//             } else {
//               width = Math.round((width * maxDim) / height)
//               height = maxDim
//             }
//           }

//           canvas.width = width
//           canvas.height = height
//           const ctx = canvas.getContext("2d")
//           ctx?.drawImage(img, 0, 0, width, height)

//           canvas.toBlob(
//             (blob) => {
//               if (blob) resolve(blob)
//             },
//             "image/jpeg",
//             quality,
//           )
//         }
//       }
//     })
//   }

//   const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.currentTarget.files
//     if (!files) return

//     setIsUploading(true)
//     try {
//       for (let i = 0; i < files.length; i++) {
//         const file = files[i]
//         const compressedBlob = await compressImage(file)

//         const formData = new FormData()
//         formData.append("file", new File([compressedBlob], file.name, { type: "image/jpeg" }))

//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/images/`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${getCookie("access_token")}`,
//           },
//           body: formData,
//         })

//         if (!response.ok) {
//           throw new Error("Failed to upload image")
//         }

//         const data = await response.json()
//         const imagePreview = URL.createObjectURL(compressedBlob)

//         setUploadedImages((prev) => [...prev, { uid: data.uid, preview: imagePreview, isNew: true }])
//       }

//       toast({
//         title: "Success",
//         description: `${files.length} image(s) uploaded successfully.`,
//       })
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "Failed to upload images. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   const handleRemoveImage = (uid: string) => {
//     setUploadedImages((prev) => prev.filter((img) => img.uid !== uid))
//   }

//   const handleConfirm = () => {
//     const newImageUids = uploadedImages.filter((img) => img.isNew).map((img) => img.uid)
//     const allImageUids = uploadedImages.map((img) => img.uid)

//     if (newImageUids.length > 0 || allImageUids.length > 0) {
//       localStorage.setItem("project_image_uids", JSON.stringify(allImageUids))
//       onImagesUpload(allImageUids)
//       onClose()
//     }
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//         <CardContent className="pt-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-foreground">Manage Project Images</h2>
//             <button onClick={onClose} className="p-1 hover:bg-muted rounded">
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           <div className="border-2 border-dashed border-border rounded-lg p-6 mb-6 text-center">
//             <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
//             <p className="text-sm text-muted-foreground mb-4">Add more images or click to select</p>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleFileSelect}
//               disabled={isUploading}
//               className="hidden"
//               id="image-input-update"
//             />
//             <label htmlFor="image-input-update">
//               <Button
//                 asChild
//                 disabled={isUploading}
//                 className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
//               >
//                 <span>{isUploading ? "Uploading..." : "Select Images"}</span>
//               </Button>
//             </label>
//           </div>

//           {uploadedImages.length > 0 && (
//             <div>
//               <p className="text-sm font-medium text-foreground mb-3">Images ({uploadedImages.length})</p>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
//                 {uploadedImages.map((img) => (
//                   <div key={img.uid} className="relative group">
//                     <img
//                       src={img.preview || "/placeholder.svg"}
//                       alt="preview"
//                       className="w-full h-32 object-cover rounded-lg border border-border"
//                     />
//                     <button
//                       onClick={() => handleRemoveImage(img.uid)}
//                       className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button onClick={handleConfirm} className="flex-1 bg-primary hover:bg-primary/90 text-white">
//                   Confirm Images
//                 </Button>
//                 <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default function ProjectsPage() {
//   const { toast } = useToast()
//   const [searchTerm, setSearchTerm] = useState("")
//   const [projects, setProjects] = useState<Project[]>([])
//   const [allCompanies, setAllCompanies] = useState<Company[]>([])
//   const [allBuyers, setAllBuyers] = useState<Buyer[]>([])
//   const [userRole, setUserRole] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null)
//   const [detailsModal, setDetailsModal] = useState(false)
//   const [settingsModal, setSettingsModal] = useState(false)
//   const [imageUploadOpen, setImageUploadOpen] = useState(false)
//   const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)
//   const [isSaving, setIsSaving] = useState(false)
//   const [menuOpen, setMenuOpen] = useState<string | null>(null)
//   const [formData, setFormData] = useState({
//     name: "",
//     started_at: "",
//     will_finish_at: "",
//     company_uid: "",
//     buyer_uids: [] as string[],
//   })
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

//   const getCompanyName = (companyId: number): string => {
//     const company = allCompanies.find((c) => c.id === companyId)
//     return company?.name || "Unknown Company"
//   }

//   useEffect(() => {
//     const loadProjects = async () => {
//       try {
//         const token = getCookie("access_token")
//         if (!token) return

//         const role = await getCurrentUserRole()
//         setUserRole(role)

//         const response = await apiCall("/sample_manager/project/")
//         if (response.ok) {
//           const data = await response.json()
//           setProjects(Array.isArray(data) ? data : data.results || [])
//         }

//         // Load companies and buyers for forms
//         const companyResponse = await apiCall("/organizations/my_companys/")
//         if (companyResponse.ok) {
//           const companyData = await companyResponse.json()
//           setAllCompanies(Array.isArray(companyData) ? companyData : companyData.results || [])
//         }

//         const buyerResponse = await apiCall("/sample_manager/buyer/")
//         if (buyerResponse.ok) {
//           const buyerData = await buyerResponse.json()
//           setAllBuyers(Array.isArray(buyerData) ? buyerData : buyerData.results || [])
//         }
//       } catch (err) {
//         console.error("Error loading projects:", err)
//         toast({
//           title: "Error",
//           description: "Failed to load projects",
//           variant: "destructive",
//         })
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     loadProjects()
//   }, [toast])

//   const filteredProjects = projects.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()))

//   const handleSettingsClick = async (project: Project) => {
//     setSelectedProject(project)
//     try {
//       const response = await apiCall(`/sample_manager/project/${project.uid}/`)
//       if (response.ok) {
//         const data = await response.json()

//         const startDate = new Date(data.started_at)
//         const endDate = new Date(data.will_finish_at)

//         const localStartDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000)
//           .toISOString()
//           .slice(0, 16)
//         const localEndDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000)
//           .toISOString()
//           .slice(0, 16)

//         setFormData({
//           name: data.name || "",
//           started_at: localStartDate,
//           will_finish_at: localEndDate,
//           company_uid: data.company_uid || "",
//           buyer_uids: data.buyer_uids || [],
//         })
//       }
//     } catch (err) {
//       console.error("Error fetching project details:", err)
//     }
//     setSettingsModal(true)
//   }

//   const handleUpdateProject = async () => {
//     if (!selectedProject) return
//     setFieldErrors({})
//     setIsSaving(true)

//     try {
//       const storedImageUids = localStorage.getItem("project_image_uids")
//       const imageUids = storedImageUids ? JSON.parse(storedImageUids) : selectedProject.images.map((img) => img.uid)

//       const submitData = {
//         name: formData.name,
//         started_at: formData.started_at,
//         will_finish_at: formData.will_finish_at,
//         ...(canAccessFeature(userRole, "company_selection") && { company_uid: formData.company_uid }),
//         buyer_uids: formData.buyer_uids,
//         image_uids: imageUids,
//       }

//       const response = await apiCall(`/sample_manager/project/${selectedProject.uid}/`, {
//         method: "PUT",
//         body: JSON.stringify(submitData),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         if (typeof data === "object" && !Array.isArray(data)) {
//           setFieldErrors(data)
//           toast({
//             title: "Error",
//             description: "Failed to update project",
//             variant: "destructive",
//           })
//         }
//         return
//       }

//       localStorage.removeItem("project_image_uids")
//       setSettingsModal(false)

//       // Refresh project list
//       const projectsResponse = await apiCall("/sample_manager/project/")
//       if (projectsResponse.ok) {
//         const projectsData = await projectsResponse.json()
//         setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
//       }

//       toast({
//         title: "Success",
//         description: "Project updated successfully",
//       })
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: err instanceof Error ? err.message : "Failed to update project",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleDeleteProject = async () => {
//     if (!selectedProject) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/project/${selectedProject.uid}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete project")
//       }

//       setDeleteConfirmModal(false)
//       setSettingsModal(false)

//       // Refresh project list
//       const projectsResponse = await apiCall("/sample_manager/project/")
//       if (projectsResponse.ok) {
//         const projectsData = await projectsResponse.json()
//         setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
//       }

//       toast({
//         title: "Success",
//         description: "Project deleted successfully",
//       })
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: err instanceof Error ? err.message : "Failed to delete project",
//         variant: "destructive",
//       })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleBuyerToggle = (buyerUid: string) => {
//     setFormData((prev) => {
//       const current = prev.buyer_uids
//       if (current.includes(buyerUid)) {
//         return { ...prev, buyer_uids: current.filter((uid) => uid !== buyerUid) }
//       } else {
//         return { ...prev, buyer_uids: [...current, buyerUid] }
//       }
//     })
//   }

//   if (isLoading) {
//     return (
//       <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full flex items-center justify-center">
//         <Loader2 className="w-8 h-8 animate-spin text-primary" />
//       </div>
//     )
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Projects</h1>
//           <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage and monitor sample projects</p>
//         </div>
//         <Link href="/projects/add" className="w-full sm:w-auto">
//           <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
//             <Plus className="w-4 h-4" />
//             Add New Project
//           </Button>
//         </Link>
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
//           <Card key={project.uid} className="border-border hover:shadow-lg transition-all relative">
//             <div className="absolute top-3 right-3 z-10">
//               <button
//                 onClick={() => setMenuOpen(menuOpen === project.uid ? null : project.uid)}
//                 className="p-2 hover:bg-muted rounded-full transition"
//               >
//                 <MoreVertical className="w-4 h-4 text-muted-foreground" />
//               </button>
//               {menuOpen === project.uid && (
//                 <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg">
//                   <button
//                     onClick={() => {
//                       setSelectedProject(project)
//                       setDeleteConfirmModal(true)
//                       setMenuOpen(null)
//                     }}
//                     className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </div>

//             <CardHeader className="pb-3">
//               <CardTitle className="text-base sm:text-lg line-clamp-2">{project.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3 mb-4">
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-1">Images</p>
//                   <p className="text-sm font-medium text-foreground">{project.images?.length || 0} image(s)</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-1">Buyers</p>
//                   <p className="text-sm font-medium text-foreground">{project.buyers?.length || 0} buyer(s)</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-1">Company</p>
//                   <p className="text-sm font-medium text-foreground">{getCompanyName(project.company)}</p>
//                 </div>
//               </div>
//               <div className="flex gap-2 pt-4 border-t border-border">
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
//                   onClick={() => handleSettingsClick(project)}
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
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-2">Project Name</p>
//                     <p className="text-base sm:text-lg font-semibold text-foreground">{selectedProject.name}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-2">Company</p>
//                     <p className="text-base sm:text-lg font-semibold text-foreground">
//                       {getCompanyName(selectedProject.company)}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-2">Started At</p>
//                     <p className="text-base sm:text-lg font-semibold text-foreground">
//                       {new Date(selectedProject.started_at).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-2">Will Finish At</p>
//                     <p className="text-base sm:text-lg font-semibold text-foreground">
//                       {new Date(selectedProject.will_finish_at).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>

//                 {selectedProject.images && selectedProject.images.length > 0 && (
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-3">Images ({selectedProject.images.length})</p>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                       {selectedProject.images.map((img) => (
//                         <div key={img.uid} className="relative group">
//                           <img
//                             src={img.file || "/placeholder.svg"}
//                             alt={img.file_name}
//                             className="w-full h-24 object-cover rounded-lg border border-border"
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {selectedProject.buyers && selectedProject.buyers.length > 0 && (
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-2">Buyers</p>
//                     <div className="space-y-1">
//                       {selectedProject.buyers.map((buyer) => (
//                         <p key={buyer.uid} className="text-sm text-foreground">
//                           {buyer.name}
//                         </p>
//                       ))}
//                     </div>
//                   </div>
//                 )}
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
//               <CardTitle className="text-lg sm:text-xl line-clamp-2">Update Project - {selectedProject.name}</CardTitle>
//               <button onClick={() => setSettingsModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 {/* Project Name */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Project Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleFormChange}
//                     className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name[0]}</p>}
//                 </div>

//                 {/* Started Date */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Started Date</label>
//                   <input
//                     type="datetime-local"
//                     name="started_at"
//                     value={formData.started_at}
//                     onChange={handleFormChange}
//                     className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.started_at ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.started_at && <p className="text-sm text-red-600 mt-1">{fieldErrors.started_at[0]}</p>}
//                 </div>

//                 {/* Finish Date */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Finish Date</label>
//                   <input
//                     type="datetime-local"
//                     name="will_finish_at"
//                     value={formData.will_finish_at}
//                     onChange={handleFormChange}
//                     className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.will_finish_at
//                         ? "border-red-500 focus:ring-red-500"
//                         : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.will_finish_at && (
//                     <p className="text-sm text-red-600 mt-1">{fieldErrors.will_finish_at[0]}</p>
//                   )}
//                 </div>

//                 {/* Company - Only for SUPER_ADMIN */}
//                 {canAccessFeature(userRole, "company_selection") && (
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Company</label>
//                     <div className="space-y-2">
//                       {selectedProject && (
//                         <div className="text-sm text-muted-foreground">
//                           <p>
//                             Current:{" "}
//                             <span className="text-foreground font-medium">
//                               {getCompanyName(selectedProject.company)}
//                             </span>
//                           </p>
//                         </div>
//                       )}
//                       <select
//                         name="company_uid"
//                         value={formData.company_uid}
//                         onChange={handleFormChange}
//                         className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                           fieldErrors.company_uid
//                             ? "border-red-500 focus:ring-red-500"
//                             : "border-border focus:ring-primary"
//                         }`}
//                       >
//                         <option value="">Select a company</option>
//                         {allCompanies.map((company) => (
//                           <option key={company.uid} value={company.uid}>
//                             {company.name}
//                           </option>
//                         ))}
//                       </select>
//                       {fieldErrors.company_uid && (
//                         <p className="text-sm text-red-600 mt-1">{fieldErrors.company_uid[0]}</p>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Buyers - Multi Select with Checkboxes */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Buyers</label>
//                   <div
//                     className={`border rounded-lg p-3 bg-card max-h-40 overflow-y-auto ${
//                       fieldErrors.buyer_uids ? "border-red-500" : "border-border"
//                     }`}
//                   >
//                     {allBuyers.length > 0 ? (
//                       <div className="space-y-2">
//                         {allBuyers.map((buyer) => (
//                           <label
//                             key={buyer.uid}
//                             className="flex items-center gap-2 cursor-pointer hover:bg-muted p-1 rounded"
//                           >
//                             <Checkbox
//                               checked={formData.buyer_uids.includes(buyer.uid)}
//                               onCheckedChange={() => handleBuyerToggle(buyer.uid)}
//                             />
//                             <span className="text-sm text-foreground">{buyer.name}</span>
//                           </label>
//                         ))}
//                       </div>
//                     ) : (
//                       <p className="text-sm text-muted-foreground">No buyers available</p>
//                     )}
//                   </div>
//                   {fieldErrors.buyer_uids && <p className="text-sm text-red-600 mt-1">{fieldErrors.buyer_uids[0]}</p>}
//                 </div>

//                 {/* Image Upload */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">
//                     Project Images ({selectedProject.images?.length || 0})
//                   </label>
//                   <Button
//                     type="button"
//                     onClick={() => setImageUploadOpen(true)}
//                     className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
//                   >
//                     <Upload className="w-4 h-4" />
//                     Manage Images
//                   </Button>
//                 </div>

//                 {/* Submit Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleUpdateProject}
//                     disabled={isSaving}
//                     className="flex-1 bg-primary hover:bg-primary/90 text-white"
//                   >
//                     {isSaving ? (
//                       <>
//                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                         Updating...
//                       </>
//                     ) : (
//                       "Update"
//                     )}
//                   </Button>
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setSettingsModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Image Upload Modal */}
//       <ImageUploadModal
//         isOpen={imageUploadOpen}
//         onClose={() => setImageUploadOpen(false)}
//         existingImages={selectedProject?.images || []}
//         onImagesUpload={() => {
//           setImageUploadOpen(false)
//         }}
//       />

//       {/* Delete Confirmation Modal */}
//       {deleteConfirmModal && selectedProject && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Project</CardTitle>
//               <button onClick={() => setDeleteConfirmModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete project "{selectedProject.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleDeleteProject}
//                   disabled={isDeleting}
//                   className="flex-1 bg-red-600 hover:bg-red-700 text-white"
//                 >
//                   {isDeleting ? (
//                     <>
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                       Deleting...
//                     </>
//                   ) : (
//                     "Delete"
//                   )}
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="flex-1 bg-transparent"
//                   onClick={() => setDeleteConfirmModal(false)}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   )
// }


// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Search, Plus, Eye, SettingsIcon, X, Upload, MoreVertical, Loader2, Trash2 } from "lucide-react"
// import { getCookie, apiCall, getCurrentUserRole, canAccessFeature } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useToast } from "@/hooks/use-toast"
// import { Checkbox } from "@/components/ui/checkbox"
// import { useRouter } from "next/navigation" // Import useRouter

// interface ProjectImage {
//   id: number
//   uid: string
//   file: string
//   file_name: string
// }

// interface ProjectBuyer {
//   id: number
//   uid: string
//   name: string
// }

// interface Project {
//   id: number
//   uid: string
//   name: string
//   company: number
//   started_at: string
//   will_finish_at: string
//   images: ProjectImage[]
//   buyers: ProjectBuyer[]
// }

// interface Company {
//   id: number
//   uid: string
//   name: string
// }

// interface Buyer {
//   id: number
//   uid: string
//   name: string
// }

// interface ImageUploadModalProps {
//   isOpen: boolean
//   onClose: () => void
//   existingImages: ProjectImage[]
//   onImagesUpload: (uids: string[]) => void
// }

// function ImageUploadModal({ isOpen, onClose, existingImages, onImagesUpload }: ImageUploadModalProps) {
//   const { toast } = useToast()
//   const [uploadedImages, setUploadedImages] = useState<Array<{ uid: string; preview: string; isNew: boolean }>>([])
//   const [isUploading, setIsUploading] = useState(false)

//   useEffect(() => {
//     if (isOpen) {
//       const existingPreview = existingImages.map((img) => ({
//         uid: img.uid,
//         preview: img.file,
//         isNew: false,
//       }))
//       setUploadedImages(existingPreview)
//     }
//   }, [isOpen, existingImages])

//   const compressImage = async (file: File): Promise<Blob> => {
//     return new Promise((resolve) => {
//       const reader = new FileReader()
//       reader.readAsDataURL(file)
//       reader.onload = (e) => {
//         const img = new Image()
//         img.src = e.target?.result as string
//         img.onload = () => {
//           const canvas = document.createElement("canvas")
//           let width = img.width
//           let height = img.height
//           let quality = 0.9

//           while (
//             (canvas.toBlob((blob) => {}, "image/jpeg", quality),
//             canvas.toDataURL("image/jpeg", quality).length / 1024 > 999) &&
//             quality > 0.1
//           ) {
//             quality -= 0.1
//           }

//           if (img.width > 1920 || img.height > 1920) {
//             const maxDim = 1920
//             if (width > height) {
//               height = Math.round((height * maxDim) / width)
//               width = maxDim
//             } else {
//               width = Math.round((width * maxDim) / height)
//               height = maxDim
//             }
//           }

//           canvas.width = width
//           canvas.height = height
//           const ctx = canvas.getContext("2d")
//           ctx?.drawImage(img, 0, 0, width, height)

//           canvas.toBlob(
//             (blob) => {
//               if (blob) resolve(blob)
//             },
//             "image/jpeg",
//             quality,
//           )
//         }
//       }
//     })
//   }

//   const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.currentTarget.files
//     if (!files) return

//     setIsUploading(true)
//     try {
//       for (let i = 0; i < files.length; i++) {
//         const file = files[i]
//         const compressedBlob = await compressImage(file)

//         const formData = new FormData()
//         formData.append("file", new File([compressedBlob], file.name, { type: "image/jpeg" }))

//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/images/`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${getCookie("access_token")}`,
//           },
//           body: formData,
//         })

//         if (!response.ok) {
//           throw new Error("Failed to upload image")
//         }

//         const data = await response.json()
//         const imagePreview = URL.createObjectURL(compressedBlob)

//         setUploadedImages((prev) => [...prev, { uid: data.uid, preview: imagePreview, isNew: true }])
//       }

//       toast({
//         title: "Success",
//         description: `${files.length} image(s) uploaded successfully.`,
//       })
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "Failed to upload images. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   const handleRemoveImage = (uid: string) => {
//     setUploadedImages((prev) => prev.filter((img) => img.uid !== uid))
//   }

//   const handleConfirm = () => {
//     const newImageUids = uploadedImages.filter((img) => img.isNew).map((img) => img.uid)
//     const allImageUids = uploadedImages.map((img) => img.uid)

//     if (newImageUids.length > 0 || allImageUids.length > 0) {
//       localStorage.setItem("project_image_uids", JSON.stringify(allImageUids))
//       onImagesUpload(allImageUids)
//       onClose()
//     }
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//         <CardContent className="pt-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-foreground">Manage Project Images</h2>
//             <button onClick={onClose} className="p-1 hover:bg-muted rounded">
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           <div className="border-2 border-dashed border-border rounded-lg p-6 mb-6 text-center">
//             <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
//             <p className="text-sm text-muted-foreground mb-4">Add more images or click to select</p>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleFileSelect}
//               disabled={isUploading}
//               className="hidden"
//               id="image-input-update"
//             />
//             <label htmlFor="image-input-update">
//               <Button
//                 asChild
//                 disabled={isUploading}
//                 className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
//               >
//                 <span>{isUploading ? "Uploading..." : "Select Images"}</span>
//               </Button>
//             </label>
//           </div>

//           {uploadedImages.length > 0 && (
//             <div>
//               <p className="text-sm font-medium text-foreground mb-3">Images ({uploadedImages.length})</p>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
//                 {uploadedImages.map((img) => (
//                   <div key={img.uid} className="relative group">
//                     <img
//                       src={img.preview || "/placeholder.svg"}
//                       alt="preview"
//                       className="w-full h-32 object-cover rounded-lg border border-border"
//                     />
//                     <button
//                       onClick={() => handleRemoveImage(img.uid)}
//                       className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button onClick={handleConfirm} className="flex-1 bg-primary hover:bg-primary/90 text-white">
//                   Confirm Images
//                 </Button>
//                 <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default function ProjectsPage() {
//   const router = useRouter() // Initialize useRouter
//   const { toast } = useToast()
//   const [searchTerm, setSearchTerm] = useState("")
//   const [projects, setProjects] = useState<Project[]>([])
//   const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
//   const [allCompanies, setAllCompanies] = useState<Company[]>([])
//   const [companyMap, setCompanyMap] = useState<Record<number, string>>({})
//   const [allBuyers, setAllBuyers] = useState<Buyer[]>([])
//   const [userRole, setUserRole] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null)
//   const [detailsModal, setDetailsModal] = useState(false)
//   const [settingsModal, setSettingsModal] = useState(false)
//   const [imageUploadOpen, setImageUploadOpen] = useState(false)
//   const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)
//   const [isSaving, setIsSaving] = useState(false)
//   const [menuOpen, setMenuOpen] = useState<string | null>(null)
//   const [formData, setFormData] = useState({
//     name: "",
//     started_at: "",
//     will_finish_at: "",
//     company_uid: "",
//     buyer_uids: [] as string[],
//   })
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

//   useEffect(() => {
//     const initializeData = async () => {
//       try {
//         const token = getCookie("access_token")
//         if (!token) {
//           router.push("/login")
//           return
//         }

//         const role = await getCurrentUserRole()
//         setUserRole(role)

//         const companiesResponse = await apiCall("/organizations/my_companys/")
//         if (companiesResponse.ok) {
//           const companiesData = await companiesResponse.json()
//           const companiesList = Array.isArray(companiesData) ? companiesData : companiesData.results || []
//           setAllCompanies(companiesList)

//           // Build company map for quick lookup by ID
//           const map: Record<number, string> = {}
//           companiesList.forEach((company: Company) => {
//             map[company.id] = company.name
//           })
//           setCompanyMap(map)
//         }

//         // Fetch buyers
//         const buyersResponse = await apiCall("/sample_manager/buyer/")
//         if (buyersResponse.ok) {
//           const buyersData = await buyersResponse.json()
//           setAllBuyers(Array.isArray(buyersData) ? buyersData : buyersData.results || [])
//         }

//         // Fetch projects
//         const projectsResponse = await apiCall("/sample_manager/project/")
//         if (projectsResponse.ok) {
//           const projectsData = await projectsResponse.json()
//           setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
//           setFilteredProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
//         }

//         setIsLoading(false)
//       } catch (err) {
//         console.error("Error initializing data:", err)
//         setIsLoading(false)
//       }
//     }

//     initializeData()
//   }, [router]) // Added router to dependency array

//   const handleSettingsClick = async (project: Project) => {
//     setSelectedProject(project)
//     try {
//       const response = await apiCall(`/sample_manager/project/${project.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setSelectedProject(data)
//         const convertToDatetimeLocal = (isoString: string) => {
//           if (!isoString) return ""
//           const date = new Date(isoString)
//           const year = date.getFullYear()
//           const month = String(date.getMonth() + 1).padStart(2, "0")
//           const day = String(date.getDate()).padStart(2, "0")
//           const hours = String(date.getHours()).padStart(2, "0")
//           const minutes = String(date.getMinutes()).padStart(2, "0")
//           return `${year}-${month}-${day}T${hours}:${minutes}`
//         }
//         setFormData({
//           name: data.name,
//           started_at: convertToDatetimeLocal(data.started_at),
//           will_finish_at: convertToDatetimeLocal(data.will_finish_at),
//           company_uid: data.company?.toString() || "",
//           buyer_uids: data.buyers?.map((b: ProjectBuyer) => b.uid) || [],
//         })
//         setSettingsModal(true)
//       }
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "Failed to load project details",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleUpdateProject = async () => {
//     if (!selectedProject) return
//     setFieldErrors({})
//     setIsSaving(true)

//     try {
//       const storedImageUids = localStorage.getItem("project_image_uids")
//       const imageUids = storedImageUids ? JSON.parse(storedImageUids) : selectedProject.images.map((img) => img.uid)

//       const submitData = {
//         name: formData.name,
//         started_at: formData.started_at,
//         will_finish_at: formData.will_finish_at,
//         ...(canAccessFeature(userRole, "company_selection") && { company_uid: formData.company_uid }),
//         buyer_uids: formData.buyer_uids,
//         image_uids: imageUids,
//       }

//       const response = await apiCall(`/sample_manager/project/${selectedProject.uid}`, {
//         method: "PUT",
//         body: JSON.stringify(submitData),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         if (typeof data === "object" && !Array.isArray(data)) {
//           setFieldErrors(data)
//           toast({
//             title: "Error",
//             description: "Failed to update project",
//             variant: "destructive",
//           })
//         }
//         return
//       }

//       localStorage.removeItem("project_image_uids")
//       setSettingsModal(false)

//       // Refresh project list
//       const projectsResponse = await apiCall("/sample_manager/project/")
//       if (projectsResponse.ok) {
//         const projectsData = await projectsResponse.json()
//         setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
//         setFilteredProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || []) // Update filteredProjects too
//       }

//       toast({
//         title: "Success",
//         description: "Project updated successfully",
//       })
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: err instanceof Error ? err.message : "Failed to update project",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleDeleteProject = async () => {
//     if (!selectedProject) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/project/${selectedProject.uid}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete project")
//       }

//       setDeleteConfirmModal(false)
//       setSettingsModal(false)

//       // Refresh project list
//       const projectsResponse = await apiCall("/sample_manager/project/")
//       if (projectsResponse.ok) {
//         const projectsData = await projectsResponse.json()
//         setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
//         setFilteredProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || []) // Update filteredProjects too
//       }

//       toast({
//         title: "Success",
//         description: "Project deleted successfully",
//       })
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: err instanceof Error ? err.message : "Failed to delete project",
//         variant: "destructive",
//       })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleBuyerToggle = (buyerUid: string) => {
//     setFormData((prev) => {
//       const current = prev.buyer_uids
//       if (current.includes(buyerUid)) {
//         return { ...prev, buyer_uids: current.filter((uid) => uid !== buyerUid) }
//       } else {
//         return { ...prev, buyer_uids: [...current, buyerUid] }
//       }
//     })
//   }

//   // Handle search term change and update filteredProjects
//   useEffect(() => {
//     setFilteredProjects(projects.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase())))
//   }, [searchTerm, projects])

//   if (isLoading) {
//     return (
//       <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full flex items-center justify-center">
//         <Loader2 className="w-8 h-8 animate-spin text-primary" />
//       </div>
//     )
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Projects</h1>
//           <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage and monitor sample projects</p>
//         </div>
//         <Link href="/projects/add" className="w-full sm:w-auto">
//           <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
//             <Plus className="w-4 h-4" />
//             Add New Project
//           </Button>
//         </Link>
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
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//         {filteredProjects.map((project) => (
//           <Card key={project.uid} className="border-border hover:shadow-lg transition-all relative">
//             <div className="absolute top-3 right-3 z-10">
//               <button
//                 onClick={() => setMenuOpen(menuOpen === project.uid ? null : project.uid)}
//                 className="p-2 hover:bg-muted rounded-full transition"
//               >
//                 <MoreVertical className="w-4 h-4 text-muted-foreground" />
//               </button>
//               {menuOpen === project.uid && (
//                 <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg">
//                   <button
//                     onClick={() => {
//                       setSelectedProject(project)
//                       setDeleteConfirmModal(true)
//                       setMenuOpen(null)
//                     }}
//                     className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </div>

//             <CardHeader className="pb-3">
//               <CardTitle className="text-base sm:text-lg line-clamp-2">{project.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3 mb-4">
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-1">Company</p>
//                   <p className="text-sm font-medium text-foreground">{companyMap[project.company] || "N/A"}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-1">Images</p>
//                   <p className="text-sm font-medium text-foreground">{project.images?.length || 0} image(s)</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-1">Buyers</p>
//                   <p className="text-sm font-medium text-foreground">{project.buyers?.length || 0} buyer(s)</p>
//                 </div>
//               </div>
//               <div className="flex gap-2 pt-4 border-t border-border">
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
//                   onClick={() => handleSettingsClick(project)}
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
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-2">Project Name</p>
//                     <p className="text-base sm:text-lg font-semibold text-foreground">{selectedProject.name}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-2">Company</p>
//                     <p className="text-base sm:text-lg font-semibold text-foreground">
//                       {companyMap[selectedProject.company] || "N/A"}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-2">Started At</p>
//                     <p className="text-base sm:text-lg font-semibold text-foreground">
//                       {new Date(selectedProject.started_at).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-2">Will Finish At</p>
//                     <p className="text-base sm:text-lg font-semibold text-foreground">
//                       {new Date(selectedProject.will_finish_at).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>

//                 {selectedProject.images && selectedProject.images.length > 0 && (
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-3">Images ({selectedProject.images.length})</p>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                       {selectedProject.images.map((img) => (
//                         <div key={img.uid} className="relative group">
//                           <img
//                             src={img.file || "/placeholder.svg"}
//                             alt={img.file_name}
//                             className="w-full h-24 object-cover rounded-lg border border-border"
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {selectedProject.buyers && selectedProject.buyers.length > 0 && (
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-2">Buyers</p>
//                     <div className="space-y-1">
//                       {selectedProject.buyers.map((buyer) => (
//                         <p key={buyer.uid} className="text-sm text-foreground">
//                           {buyer.name}
//                         </p>
//                       ))}
//                     </div>
//                   </div>
//                 )}
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
//               <CardTitle className="text-lg sm:text-xl line-clamp-2">Update Project - {selectedProject.name}</CardTitle>
//               <button onClick={() => setSettingsModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 {/* Project Name */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Project Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleFormChange}
//                     className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name[0]}</p>}
//                 </div>

//                 {/* Started Date */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Started Date</label>
//                   <input
//                     type="datetime-local"
//                     name="started_at"
//                     value={formData.started_at}
//                     onChange={handleFormChange}
//                     className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.started_at ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.started_at && <p className="text-sm text-red-600 mt-1">{fieldErrors.started_at[0]}</p>}
//                 </div>

//                 {/* Finish Date */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Finish Date</label>
//                   <input
//                     type="datetime-local"
//                     name="will_finish_at"
//                     value={formData.will_finish_at}
//                     onChange={handleFormChange}
//                     className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.will_finish_at
//                         ? "border-red-500 focus:ring-red-500"
//                         : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.will_finish_at && (
//                     <p className="text-sm text-red-600 mt-1">{fieldErrors.will_finish_at[0]}</p>
//                   )}
//                 </div>

//                 {/* Company - Only for SUPER_ADMIN */}
//                 {canAccessFeature(userRole, "company_selection") && (
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Company</label>
//                     <select
//                       name="company_uid"
//                       value={formData.company_uid}
//                       onChange={handleFormChange}
//                       className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                         fieldErrors.company_uid
//                           ? "border-red-500 focus:ring-red-500"
//                           : "border-border focus:ring-primary"
//                       }`}
//                     >
//                       <option value="">Select a company</option>
//                       {allCompanies.map((company) => (
//                         <option key={company.uid} value={company.uid}>
//                           {company.name}
//                         </option>
//                       ))}
//                     </select>
//                     {fieldErrors.company_uid && (
//                       <p className="text-sm text-red-600 mt-1">{fieldErrors.company_uid[0]}</p>
//                     )}
//                   </div>
//                 )}

//                 {/* Buyers - Multi Select with Checkboxes */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Buyers</label>
//                   <div
//                     className={`border rounded-lg p-3 bg-card max-h-40 overflow-y-auto ${
//                       fieldErrors.buyer_uids ? "border-red-500" : "border-border"
//                     }`}
//                   >
//                     {allBuyers.length > 0 ? (
//                       <div className="space-y-2">
//                         {allBuyers.map((buyer) => (
//                           <label
//                             key={buyer.uid}
//                             className="flex items-center gap-2 cursor-pointer hover:bg-muted p-1 rounded"
//                           >
//                             <Checkbox
//                               checked={formData.buyer_uids.includes(buyer.uid)}
//                               onCheckedChange={() => handleBuyerToggle(buyer.uid)}
//                             />
//                             <span className="text-sm text-foreground">{buyer.name}</span>
//                           </label>
//                         ))}
//                       </div>
//                     ) : (
//                       <p className="text-sm text-muted-foreground">No buyers available</p>
//                     )}
//                   </div>
//                   {fieldErrors.buyer_uids && <p className="text-sm text-red-600 mt-1">{fieldErrors.buyer_uids[0]}</p>}
//                 </div>

//                 {/* Image Upload */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">
//                     Project Images ({selectedProject.images?.length || 0})
//                   </label>
//                   <Button
//                     type="button"
//                     onClick={() => setImageUploadOpen(true)}
//                     className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
//                   >
//                     <Upload className="w-4 h-4" />
//                     Manage Images
//                   </Button>
//                 </div>

//                 {/* Submit Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleUpdateProject}
//                     disabled={isSaving}
//                     className="flex-1 bg-primary hover:bg-primary/90 text-white"
//                   >
//                     {isSaving ? (
//                       <>
//                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                         Updating...
//                       </>
//                     ) : (
//                       "Update"
//                     )}
//                   </Button>
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setSettingsModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Image Upload Modal */}
//       <ImageUploadModal
//         isOpen={imageUploadOpen}
//         onClose={() => setImageUploadOpen(false)}
//         existingImages={selectedProject?.images || []}
//         onImagesUpload={() => {
//           setImageUploadOpen(false)
//         }}
//       />

//       {/* Delete Confirmation Modal */}
//       {deleteConfirmModal && selectedProject && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Project</CardTitle>
//               <button onClick={() => setDeleteConfirmModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete project "{selectedProject.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleDeleteProject}
//                   disabled={isDeleting}
//                   className="flex-1 bg-red-600 hover:bg-red-700 text-white"
//                 >
//                   {isDeleting ? (
//                     <>
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                       Deleting...
//                     </>
//                   ) : (
//                     "Delete"
//                   )}
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="flex-1 bg-transparent"
//                   onClick={() => setDeleteConfirmModal(false)}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   )
// }


// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Search, Plus, Eye, SettingsIcon, X, Upload, MoreVertical, Loader2, Trash2 } from "lucide-react"
// import { getCookie, apiCall, getCurrentUserRole, canAccessFeature } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useToast } from "@/hooks/use-toast"
// import { Checkbox } from "@/components/ui/checkbox"
// import { useRouter } from "next/navigation" // Import useRouter

// interface ProjectImage {
//   id: number
//   uid: string
//   file: string
//   file_name: string
// }

// interface ProjectBuyer {
//   id: number
//   uid: string
//   name: string
// }

// interface Project {
//   id: number
//   uid: string
//   name: string
//   company: number
//   started_at: string
//   will_finish_at: string
//   images: ProjectImage[]
//   buyers: ProjectBuyer[]
// }

// interface Company {
//   id: number
//   uid: string
//   name: string
// }

// interface Buyer {
//   id: number
//   uid: string
//   name: string
// }

// interface ImageUploadModalProps {
//   isOpen: boolean
//   onClose: () => void
//   existingImages: ProjectImage[]
//   onImagesUpload: (uids: string[]) => void
// }

// function ImageUploadModal({ isOpen, onClose, existingImages, onImagesUpload }: ImageUploadModalProps) {
//   const { toast } = useToast()
//   const [uploadedImages, setUploadedImages] = useState<Array<{ uid: string; preview: string; isNew: boolean }>>([])
//   const [isUploading, setIsUploading] = useState(false)

//   useEffect(() => {
//     if (isOpen) {
//       const existingPreview = existingImages.map((img) => ({
//         uid: img.uid,
//         preview: img.file,
//         isNew: false,
//       }))
//       setUploadedImages(existingPreview)
//     }
//   }, [isOpen, existingImages])

//   const compressImage = async (file: File): Promise<Blob> => {
//     return new Promise((resolve) => {
//       const reader = new FileReader()
//       reader.readAsDataURL(file)
//       reader.onload = (e) => {
//         const img = new Image()
//         img.src = e.target?.result as string
//         img.onload = () => {
//           const canvas = document.createElement("canvas")
//           let width = img.width
//           let height = img.height
//           let quality = 0.9

//           while (
//             (canvas.toBlob((blob) => {}, "image/jpeg", quality),
//             canvas.toDataURL("image/jpeg", quality).length / 1024 > 999) &&
//             quality > 0.1
//           ) {
//             quality -= 0.1
//           }

//           if (img.width > 1920 || img.height > 1920) {
//             const maxDim = 1920
//             if (width > height) {
//               height = Math.round((height * maxDim) / width)
//               width = maxDim
//             } else {
//               width = Math.round((width * maxDim) / height)
//               height = maxDim
//             }
//           }

//           canvas.width = width
//           canvas.height = height
//           const ctx = canvas.getContext("2d")
//           ctx?.drawImage(img, 0, 0, width, height)

//           canvas.toBlob(
//             (blob) => {
//               if (blob) resolve(blob)
//             },
//             "image/jpeg",
//             quality,
//           )
//         }
//       }
//     })
//   }

//   const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.currentTarget.files
//     if (!files) return

//     setIsUploading(true)
//     try {
//       for (let i = 0; i < files.length; i++) {
//         const file = files[i]
//         const compressedBlob = await compressImage(file)

//         const formData = new FormData()
//         formData.append("file", new File([compressedBlob], file.name, { type: "image/jpeg" }))

//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/images/`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${getCookie("access_token")}`,
//           },
//           body: formData,
//         })

//         if (!response.ok) {
//           throw new Error("Failed to upload image")
//         }

//         const data = await response.json()
//         const imagePreview = URL.createObjectURL(compressedBlob)

//         setUploadedImages((prev) => [...prev, { uid: data.uid, preview: imagePreview, isNew: true }])
//       }

//       toast({
//         title: "Success",
//         description: `${files.length} image(s) uploaded successfully.`,
//       })
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "Failed to upload images. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   const handleRemoveImage = (uid: string) => {
//     setUploadedImages((prev) => prev.filter((img) => img.uid !== uid))
//   }

//   const handleConfirm = () => {
//     const newImageUids = uploadedImages.filter((img) => img.isNew).map((img) => img.uid)
//     const allImageUids = uploadedImages.map((img) => img.uid)

//     if (newImageUids.length > 0 || allImageUids.length > 0) {
//       localStorage.setItem("project_image_uids", JSON.stringify(allImageUids))
//       onImagesUpload(allImageUids)
//       onClose()
//     }
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//         <CardContent className="pt-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-foreground">Manage Project Images</h2>
//             <button onClick={onClose} className="p-1 hover:bg-muted rounded">
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           <div className="border-2 border-dashed border-border rounded-lg p-6 mb-6 text-center">
//             <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
//             <p className="text-sm text-muted-foreground mb-4">Add more images or click to select</p>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleFileSelect}
//               disabled={isUploading}
//               className="hidden"
//               id="image-input-update"
//             />
//             <label htmlFor="image-input-update">
//               <Button
//                 asChild
//                 disabled={isUploading}
//                 className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
//               >
//                 <span>{isUploading ? "Uploading..." : "Select Images"}</span>
//               </Button>
//             </label>
//           </div>

//           {uploadedImages.length > 0 && (
//             <div>
//               <p className="text-sm font-medium text-foreground mb-3">Images ({uploadedImages.length})</p>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
//                 {uploadedImages.map((img) => (
//                   <div key={img.uid} className="relative group">
//                     <img
//                       src={img.preview || "/placeholder.svg"}
//                       alt="preview"
//                       className="w-full h-32 object-cover rounded-lg border border-border"
//                     />
//                     <button
//                       onClick={() => handleRemoveImage(img.uid)}
//                       className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button onClick={handleConfirm} className="flex-1 bg-primary hover:bg-primary/90 text-white">
//                   Confirm Images
//                 </Button>
//                 <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default function ProjectsPage() {
//   const router = useRouter() // Initialize useRouter
//   const { toast } = useToast()
//   const [searchTerm, setSearchTerm] = useState("")
//   const [projects, setProjects] = useState<Project[]>([])
//   const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
//   const [allCompanies, setAllCompanies] = useState<Company[]>([])
//   const [companyMap, setCompanyMap] = useState<Record<number, string>>({})
//   const [allBuyers, setAllBuyers] = useState<Buyer[]>([])
//   const [userRole, setUserRole] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null)
//   const [detailsModal, setDetailsModal] = useState(false)
//   const [settingsModal, setSettingsModal] = useState(false)
//   const [imageUploadOpen, setImageUploadOpen] = useState(false)
//   const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)
//   const [isSaving, setIsSaving] = useState(false)
//   const [menuOpen, setMenuOpen] = useState<string | null>(null)
//   const [formData, setFormData] = useState({
//     name: "",
//     started_at: "",
//     will_finish_at: "",
//     company_uid: "",
//     buyer_uids: [] as string[],
//   })
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

//   useEffect(() => {
//     const initializeData = async () => {
//       try {
//         const token = getCookie("access_token")
//         if (!token) {
//           router.push("/login")
//           return
//         }

//         const role = await getCurrentUserRole()
//         setUserRole(role)

//         const companiesResponse = await apiCall("/organizations/my_companys/")
//         if (companiesResponse.ok) {
//           const companiesData = await companiesResponse.json()
//           const companiesList = Array.isArray(companiesData) ? companiesData : companiesData.results || []
//           setAllCompanies(companiesList)

//           // Build company map for quick lookup by ID
//           const map: Record<number, string> = {}
//           companiesList.forEach((company: Company) => {
//             map[company.id] = company.name
//           })
//           setCompanyMap(map)
//         }

//         // Fetch buyers
//         const buyersResponse = await apiCall("/sample_manager/buyer/")
//         if (buyersResponse.ok) {
//           const buyersData = await buyersResponse.json()
//           setAllBuyers(Array.isArray(buyersData) ? buyersData : buyersData.results || [])
//         }

//         // Fetch projects
//         const projectsResponse = await apiCall("/sample_manager/project/")
//         if (projectsResponse.ok) {
//           const projectsData = await projectsResponse.json()
//           setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
//           setFilteredProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
//         }

//         setIsLoading(false)
//       } catch (err) {
//         console.error("Error initializing data:", err)
//         setIsLoading(false)
//       }
//     }

//     initializeData()
//   }, [router]) // Added router to dependency array

//   const handleSettingsClick = async (project: Project) => {
//     setSelectedProject(project)
//     try {
//       const response = await apiCall(`/sample_manager/project/${project.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setSelectedProject(data)
//         const convertToDatetimeLocal = (isoString: string) => {
//           if (!isoString) return ""
//           const date = new Date(isoString)
//           const year = date.getFullYear()
//           const month = String(date.getMonth() + 1).padStart(2, "0")
//           const day = String(date.getDate()).padStart(2, "0")
//           const hours = String(date.getHours()).padStart(2, "0")
//           const minutes = String(date.getMinutes()).padStart(2, "0")
//           return `${year}-${month}-${day}T${hours}:${minutes}`
//         }
//         setFormData({
//           name: data.name,
//           started_at: convertToDatetimeLocal(data.started_at),
//           will_finish_at: convertToDatetimeLocal(data.will_finish_at),
//           company_uid: data.company?.toString() || "",
//           buyer_uids: data.buyers?.map((b: ProjectBuyer) => b.uid) || [],
//         })
//         setSettingsModal(true)
//       }
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "Failed to load project details",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleUpdateProject = async () => {
//     if (!selectedProject) return
//     setFieldErrors({})
//     setIsSaving(true)

//     try {
//       const storedImageUids = localStorage.getItem("project_image_uids")
//       const imageUids = storedImageUids ? JSON.parse(storedImageUids) : selectedProject.images.map((img) => img.uid)

//       const convertToISO = (datetimeLocal: string) => {
//         if (!datetimeLocal) return ""
//         return new Date(datetimeLocal).toISOString()
//       }

//       const submitData = {
//         name: formData.name,
//         started_at: convertToISO(formData.started_at),
//         will_finish_at: convertToISO(formData.will_finish_at),
//         ...(canAccessFeature(userRole, "company_selection") && { company_uid: formData.company_uid }),
//         buyer_uids: formData.buyer_uids,
//         image_uids: imageUids,
//       }

//       const response = await apiCall(`/sample_manager/project/${selectedProject.uid}`, {
//         method: "PUT",
//         body: JSON.stringify(submitData),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         if (typeof data === "object" && !Array.isArray(data)) {
//           setFieldErrors(data)
//           toast({
//             title: "Error",
//             description: "Failed to update project",
//             variant: "destructive",
//           })
//         }
//         return
//       }

//       localStorage.removeItem("project_image_uids")
//       setSettingsModal(false)

//       // Refresh project list
//       const projectsResponse = await apiCall("/sample_manager/project/")
//       if (projectsResponse.ok) {
//         const projectsData = await projectsResponse.json()
//         setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
//         setFilteredProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || []) // Update filteredProjects too
//       }

//       toast({
//         title: "Success",
//         description: "Project updated successfully",
//       })
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: err instanceof Error ? err.message : "Failed to update project",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleDeleteProject = async () => {
//     if (!selectedProject) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/project/${selectedProject.uid}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete project")
//       }

//       setDeleteConfirmModal(false)
//       setSettingsModal(false)

//       // Refresh project list
//       const projectsResponse = await apiCall("/sample_manager/project/")
//       if (projectsResponse.ok) {
//         const projectsData = await projectsResponse.json()
//         setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
//         setFilteredProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || []) // Update filteredProjects too
//       }

//       toast({
//         title: "Success",
//         description: "Project deleted successfully",
//       })
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: err instanceof Error ? err.message : "Failed to delete project",
//         variant: "destructive",
//       })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleBuyerToggle = (buyerUid: string) => {
//     setFormData((prev) => {
//       const current = prev.buyer_uids
//       if (current.includes(buyerUid)) {
//         return { ...prev, buyer_uids: current.filter((uid) => uid !== buyerUid) }
//       } else {
//         return { ...prev, buyer_uids: [...current, buyerUid] }
//       }
//     })
//   }

//   // Handle search term change and update filteredProjects
//   useEffect(() => {
//     setFilteredProjects(projects.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase())))
//   }, [searchTerm, projects])

//   if (isLoading) {
//     return (
//       <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full flex items-center justify-center">
//         <Loader2 className="w-8 h-8 animate-spin text-primary" />
//       </div>
//     )
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Projects</h1>
//           <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage and monitor sample projects</p>
//         </div>
//         <Link href="/projects/add" className="w-full sm:w-auto">
//           <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
//             <Plus className="w-4 h-4" />
//             Add New Project
//           </Button>
//         </Link>
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
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//         {filteredProjects.map((project) => (
//           <Card key={project.uid} className="border-border hover:shadow-lg transition-all relative">
//             <div className="absolute top-3 right-3 z-10">
//               <button
//                 onClick={() => setMenuOpen(menuOpen === project.uid ? null : project.uid)}
//                 className="p-2 hover:bg-muted rounded-full transition"
//               >
//                 <MoreVertical className="w-4 h-4 text-muted-foreground" />
//               </button>
//               {menuOpen === project.uid && (
//                 <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg">
//                   <button
//                     onClick={() => {
//                       setSelectedProject(project)
//                       setDeleteConfirmModal(true)
//                       setMenuOpen(null)
//                     }}
//                     className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </div>

//             <CardHeader className="pb-3">
//               <CardTitle className="text-base sm:text-lg line-clamp-2">{project.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3 mb-4">
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-1">Company</p>
//                   <p className="text-sm font-medium text-foreground">{companyMap[project.company] || "N/A"}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-1">Images</p>
//                   <p className="text-sm font-medium text-foreground">{project.images?.length || 0} image(s)</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-1">Buyers</p>
//                   <p className="text-sm font-medium text-foreground">{project.buyers?.length || 0} buyer(s)</p>
//                 </div>
//               </div>
//               <div className="flex gap-2 pt-4 border-t border-border">
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
//                   onClick={() => handleSettingsClick(project)}
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
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-2">Project Name</p>
//                     <p className="text-base sm:text-lg font-semibold text-foreground">{selectedProject.name}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-2">Company</p>
//                     <p className="text-base sm:text-lg font-semibold text-foreground">
//                       {companyMap[selectedProject.company] || "N/A"}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-2">Started At</p>
//                     <p className="text-base sm:text-lg font-semibold text-foreground">
//                       {new Date(selectedProject.started_at).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-2">Will Finish At</p>
//                     <p className="text-base sm:text-lg font-semibold text-foreground">
//                       {new Date(selectedProject.will_finish_at).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>

//                 {selectedProject.images && selectedProject.images.length > 0 && (
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-3">Images ({selectedProject.images.length})</p>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                       {selectedProject.images.map((img) => (
//                         <div key={img.uid} className="relative group">
//                           <img
//                             src={img.file || "/placeholder.svg"}
//                             alt={img.file_name}
//                             className="w-full h-24 object-cover rounded-lg border border-border"
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {selectedProject.buyers && selectedProject.buyers.length > 0 && (
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-2">Buyers</p>
//                     <div className="space-y-1">
//                       {selectedProject.buyers.map((buyer) => (
//                         <p key={buyer.uid} className="text-sm text-foreground">
//                           {buyer.name}
//                         </p>
//                       ))}
//                     </div>
//                   </div>
//                 )}
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
//               <CardTitle className="text-lg sm:text-xl line-clamp-2">Update Project - {selectedProject.name}</CardTitle>
//               <button onClick={() => setSettingsModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 {/* Project Name */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Project Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleFormChange}
//                     className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name[0]}</p>}
//                 </div>

//                 {/* Started Date */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Started Date</label>
//                   <input
//                     type="datetime-local"
//                     name="started_at"
//                     value={formData.started_at}
//                     onChange={handleFormChange}
//                     className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.started_at ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.started_at && <p className="text-sm text-red-600 mt-1">{fieldErrors.started_at[0]}</p>}
//                 </div>

//                 {/* Finish Date */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Finish Date</label>
//                   <input
//                     type="datetime-local"
//                     name="will_finish_at"
//                     value={formData.will_finish_at}
//                     onChange={handleFormChange}
//                     className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.will_finish_at
//                         ? "border-red-500 focus:ring-red-500"
//                         : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.will_finish_at && (
//                     <p className="text-sm text-red-600 mt-1">{fieldErrors.will_finish_at[0]}</p>
//                   )}
//                 </div>

//                 {/* Company - Only for SUPER_ADMIN */}
//                 {canAccessFeature(userRole, "company_selection") && (
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Company</label>
//                     <select
//                       name="company_uid"
//                       value={formData.company_uid}
//                       onChange={handleFormChange}
//                       className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                         fieldErrors.company_uid
//                           ? "border-red-500 focus:ring-red-500"
//                           : "border-border focus:ring-primary"
//                       }`}
//                     >
//                       <option value="">Select a company</option>
//                       {allCompanies.map((company) => (
//                         <option key={company.uid} value={company.uid}>
//                           {company.name}
//                         </option>
//                       ))}
//                     </select>
//                     {fieldErrors.company_uid && (
//                       <p className="text-sm text-red-600 mt-1">{fieldErrors.company_uid[0]}</p>
//                     )}
//                   </div>
//                 )}

//                 {/* Buyers - Multi Select with Checkboxes */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Buyers</label>
//                   <div
//                     className={`border rounded-lg p-3 bg-card max-h-40 overflow-y-auto ${
//                       fieldErrors.buyer_uids ? "border-red-500" : "border-border"
//                     }`}
//                   >
//                     {allBuyers.length > 0 ? (
//                       <div className="space-y-2">
//                         {allBuyers.map((buyer) => (
//                           <label
//                             key={buyer.uid}
//                             className="flex items-center gap-2 cursor-pointer hover:bg-muted p-1 rounded"
//                           >
//                             <Checkbox
//                               checked={formData.buyer_uids.includes(buyer.uid)}
//                               onCheckedChange={() => handleBuyerToggle(buyer.uid)}
//                             />
//                             <span className="text-sm text-foreground">{buyer.name}</span>
//                           </label>
//                         ))}
//                       </div>
//                     ) : (
//                       <p className="text-sm text-muted-foreground">No buyers available</p>
//                     )}
//                   </div>
//                   {fieldErrors.buyer_uids && <p className="text-sm text-red-600 mt-1">{fieldErrors.buyer_uids[0]}</p>}
//                 </div>

//                 {/* Image Upload */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">
//                     Project Images ({selectedProject.images?.length || 0})
//                   </label>
//                   <Button
//                     type="button"
//                     onClick={() => setImageUploadOpen(true)}
//                     className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
//                   >
//                     <Upload className="w-4 h-4" />
//                     Manage Images
//                   </Button>
//                 </div>

//                 {/* Submit Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleUpdateProject}
//                     disabled={isSaving}
//                     className="flex-1 bg-primary hover:bg-primary/90 text-white"
//                   >
//                     {isSaving ? (
//                       <>
//                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                         Updating...
//                       </>
//                     ) : (
//                       "Update"
//                     )}
//                   </Button>
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setSettingsModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Image Upload Modal */}
//       <ImageUploadModal
//         isOpen={imageUploadOpen}
//         onClose={() => setImageUploadOpen(false)}
//         existingImages={selectedProject?.images || []}
//         onImagesUpload={() => {
//           setImageUploadOpen(false)
//         }}
//       />

//       {/* Delete Confirmation Modal */}
//       {deleteConfirmModal && selectedProject && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Project</CardTitle>
//               <button onClick={() => setDeleteConfirmModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete project "{selectedProject.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleDeleteProject}
//                   disabled={isDeleting}
//                   className="flex-1 bg-red-600 hover:bg-red-700 text-white"
//                 >
//                   {isDeleting ? (
//                     <>
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                       Deleting...
//                     </>
//                   ) : (
//                     "Delete"
//                   )}
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="flex-1 bg-transparent"
//                   onClick={() => setDeleteConfirmModal(false)}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Plus, Eye, SettingsIcon, X, Upload, MoreVertical, Loader2, Trash2 } from "lucide-react"
import { getCookie, apiCall, getCurrentUserRole, canAccessFeature } from "@/lib/auth-utils"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation" // Import useRouter
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface ProjectImage {
  id: number
  uid: string
  file: string
  file_name: string
}

interface ProjectBuyer {
  id: number
  uid: string
  name: string
}

interface Project {
  id: number
  uid: string
  name: string
  company: Company
  started_at: string
  will_finish_at: string
  images: ProjectImage[]
  buyers: ProjectBuyer[]
}

interface Company {
  id: number
  uid: string
  name: string
}

interface Buyer {
  id: number
  uid: string
  name: string
}

interface ImageUploadModalProps {
  isOpen: boolean
  onClose: () => void
  existingImages: ProjectImage[]
  onImagesUpload: (uids: string[]) => void
}

function ImageUploadModal({ isOpen, onClose, existingImages, onImagesUpload }: ImageUploadModalProps) {
  const { toast } = useToast()
  const [uploadedImages, setUploadedImages] = useState<Array<{ uid: string; preview: string; isNew: boolean }>>([])
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const existingPreview = existingImages.map((img) => ({
        uid: img.uid,
        preview: img.file,
        isNew: false,
      }))
      setUploadedImages(existingPreview)
    }
  }, [isOpen, existingImages])

  const compressImage = async (file: File): Promise<Blob> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        const img = new Image()
        img.src = e.target?.result as string
        img.onload = () => {
          const canvas = document.createElement("canvas")
          let width = img.width
          let height = img.height
          let quality = 0.9

          while (
            (canvas.toBlob((blob) => { }, "image/jpeg", quality),
              canvas.toDataURL("image/jpeg", quality).length / 1024 > 999) &&
            quality > 0.1
          ) {
            quality -= 0.1
          }

          if (img.width > 1920 || img.height > 1920) {
            const maxDim = 1920
            if (width > height) {
              height = Math.round((height * maxDim) / width)
              width = maxDim
            } else {
              width = Math.round((width * maxDim) / height)
              height = maxDim
            }
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext("2d")
          ctx?.drawImage(img, 0, 0, width, height)

          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob)
            },
            "image/jpeg",
            quality,
          )
        }
      }
    })
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (!files) return

    setIsUploading(true)
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const compressedBlob = await compressImage(file)

        const formData = new FormData()
        formData.append("file", new File([compressedBlob], file.name, { type: "image/jpeg" }))

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/images/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getCookie("access_token")}`,
          },
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Failed to upload image")
        }

        const data = await response.json()
        const imagePreview = URL.createObjectURL(compressedBlob)

        setUploadedImages((prev) => [...prev, { uid: data.uid, preview: imagePreview, isNew: true }])
      }

      toast({
        title: "Success",
        description: `${files.length} image(s) uploaded successfully.`,
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to upload images. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = (uid: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.uid !== uid))
  }

  const handleConfirm = () => {
    const newImageUids = uploadedImages.filter((img) => img.isNew).map((img) => img.uid)
    const allImageUids = uploadedImages.map((img) => img.uid)

    if (newImageUids.length > 0 || allImageUids.length > 0) {
      localStorage.setItem("project_image_uids", JSON.stringify(allImageUids))
      onImagesUpload(allImageUids)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Manage Project Images</h2>
            <button onClick={onClose} className="p-1 hover:bg-muted rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="border-2 border-dashed border-border rounded-lg p-6 mb-6 text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-4">Add more images or click to select</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              disabled={isUploading}
              className="hidden"
              id="image-input-update"
            />
            <label htmlFor="image-input-update">
              <Button
                asChild
                disabled={isUploading}
                className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
              >
                <span>{isUploading ? "Uploading..." : "Select Images"}</span>
              </Button>
            </label>
          </div>

          {uploadedImages.length > 0 && (
            <div>
              <p className="text-sm font-medium text-foreground mb-3">Images ({uploadedImages.length})</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {uploadedImages.map((img) => (
                  <div key={img.uid} className="relative group">
                    <img
                      src={img.preview || "/placeholder.svg"}
                      alt="preview"
                      className="w-full h-32 object-cover rounded-lg border border-border"
                    />
                    <button
                      onClick={() => handleRemoveImage(img.uid)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleConfirm} className="flex-1 bg-primary hover:bg-primary/90 text-white">
                  Confirm Images
                </Button>
                <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function ProjectsPage() {
  const router = useRouter() // Initialize useRouter
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [allCompanies, setAllCompanies] = useState<Company[]>([])
  const [companyMap, setCompanyMap] = useState<Record<number, string>>({})
  const [allBuyers, setAllBuyers] = useState<Buyer[]>([])
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [detailsModal, setDetailsModal] = useState(false)
  const [settingsModal, setSettingsModal] = useState(false)
  const [imageUploadOpen, setImageUploadOpen] = useState(false)
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    started_at: "",
    will_finish_at: "",
    company_uid: "",
    buyer_uids: [] as string[],
  })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  useEffect(() => {
    const initializeData = async () => {
      try {
        const token = getCookie("access_token")
        if (!token) {
          router.push("/login")
          return
        }

        const role = await getCurrentUserRole()
        setUserRole(role)

        const companiesResponse = await apiCall("/organizations/my_companys/")
        if (companiesResponse.ok) {
          const companiesData = await companiesResponse.json()
          const companiesList = Array.isArray(companiesData) ? companiesData : companiesData.results || []
          setAllCompanies(companiesList)

          // Build company map for quick lookup by ID
          const map: Record<number, string> = {}
          companiesList.forEach((company: Company) => {
            map[company.id] = company.name
          })
          setCompanyMap(map)
        }

        // Fetch buyers
        const buyersResponse = await apiCall("/sample_manager/buyer/")
        if (buyersResponse.ok) {
          const buyersData = await buyersResponse.json()
          setAllBuyers(Array.isArray(buyersData) ? buyersData : buyersData.results || [])
        }

        // Fetch projects
        const projectsResponse = await apiCall("/sample_manager/project/")
        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json()
          setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
          setFilteredProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
        }

        setIsLoading(false)
      } catch (err) {
        console.error("Error initializing data:", err)
        setIsLoading(false)
      }
    }

    initializeData()
  }, [router]) // Added router to dependency array

  const handleSettingsClick = async (project: Project) => {
    setSelectedProject(project)
    try {
      const response = await apiCall(`/sample_manager/project/${project.uid}`)
      if (response.ok) {
        const data = await response.json()
        setSelectedProject(data)
        const convertToDatetimeLocal = (isoString: string) => {
          if (!isoString) return ""
          // const date = new Date(isoString)
          // const year = date.getFullYear()
          // const month = String(date.getMonth() + 1).padStart(2, "0")
          // const day = String(date.getDate()).padStart(2, "0")
          // const hours = String(date.getHours()).padStart(2, "0")
          // const minutes = String(date.getMinutes()).padStart(2, "0")
          // return `${year}-${month}-${day}T${hours}:${minutes}`
           return isoString.slice(0, 16);
        }
        setFormData({
          name: data.name,
          started_at: convertToDatetimeLocal(data.started_at),
          will_finish_at: convertToDatetimeLocal(data.will_finish_at),
          company_uid: data.company?.uid || "",
          buyer_uids: data.buyers?.map((b: ProjectBuyer) => b.uid) || [],
        })
        setSettingsModal(true)
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load project details",
        variant: "destructive",
      })
    }
  }

  const handleUpdateProject = async () => {
    if (!selectedProject) return
    setFieldErrors({})
    setIsSaving(true)

    try {
      const storedImageUids = localStorage.getItem("project_image_uids")
      const imageUids = storedImageUids ? JSON.parse(storedImageUids) : selectedProject.images.map((img) => img.uid)

      const convertToISO = (datetimeLocal: string) => {
        if (!datetimeLocal) return ""
       return datetimeLocal.slice(0, 16);
      }

      const submitData = {
        name: formData.name,
        started_at: convertToISO(formData.started_at),
        will_finish_at: convertToISO(formData.will_finish_at),
        ...(canAccessFeature(userRole, "company_selection") && { company_uid: formData.company_uid }),
        buyer_uids: formData.buyer_uids,
        image_uids: imageUids,
      }

      const response = await apiCall(`/sample_manager/project/${selectedProject.uid}`, {
        method: "PUT",
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (typeof data === "object" && !Array.isArray(data)) {
          setFieldErrors(data)
          toast({
            title: "Error",
            description: "Failed to update project",
            variant: "destructive",
          })
        }
        return
      }

      localStorage.removeItem("project_image_uids")
      setSettingsModal(false)

      // Refresh project list
      const projectsResponse = await apiCall("/sample_manager/project/")
      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json()
        setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
        setFilteredProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || []) // Update filteredProjects too
      }

      toast({
        title: "Success",
        description: "Project updated successfully",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to update project",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteProject = async () => {
    if (!selectedProject) return
    setIsDeleting(true)

    try {
      const response = await apiCall(`/sample_manager/project/${selectedProject.uid}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete project")
      }

      setDeleteConfirmModal(false)
      setSettingsModal(false)

      // Refresh project list
      const projectsResponse = await apiCall("/sample_manager/project/")
      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json()
        setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
        setFilteredProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || []) // Update filteredProjects too
      }

      toast({
        title: "Success",
        description: "Project deleted successfully",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to delete project",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBuyerToggle = (buyerUid: string) => {
    setFormData((prev) => {
      const current = prev.buyer_uids
      if (current.includes(buyerUid)) {
        return { ...prev, buyer_uids: current.filter((uid) => uid !== buyerUid) }
      } else {
        return { ...prev, buyer_uids: [...current, buyerUid] }
      }
    })
  }

  // Handle search term change and update filteredProjects
  useEffect(() => {
    setFilteredProjects(projects.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase())))
  }, [searchTerm, projects])

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  const formatDatetimeAMPM = (isoString: string) => {
  if (!isoString) return "";
  const [datePart, timePart] = isoString.split("T"); // "YYYY-MM-DD" and "HH:MM:SS"
  if (!timePart) return datePart;

  let [hours, minutes] = timePart.split(":");
  let h = parseInt(hours, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12; // convert 0->12 for 12 AM
  return `${datePart} ${h}:${minutes} ${ampm}`;
};

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage and monitor sample projects</p>
        </div>
        <Link href="/projects/add" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Project
          </Button>
        </Link>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.uid} className="border-border hover:shadow-lg transition-all relative">
            <div className="absolute top-3 right-3 z-10">
              <button
                onClick={() => setMenuOpen(menuOpen === project.uid ? null : project.uid)}
                className="p-2 hover:bg-muted rounded-full transition"
              >
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </button>
              {menuOpen === project.uid && (
                <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg">
                  <button
                    onClick={() => {
                      setSelectedProject(project)
                      setDeleteConfirmModal(true)
                      setMenuOpen(null)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg line-clamp-2">{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Company</p>
                  <p className="text-sm font-medium text-foreground">{project.company.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Images</p>
                  <p className="text-sm font-medium text-foreground">{project.images?.length || 0} image(s)</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Buyers</p>
                  <p className="text-sm font-medium text-foreground">{project.buyers?.length || 0} buyer(s)</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-border">
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
                  onClick={() => handleSettingsClick(project)}
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
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Project Name</p>
                    <p className="text-base sm:text-lg font-semibold text-foreground">{selectedProject.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Company</p>
                    <p className="text-base sm:text-lg font-semibold text-foreground">
                      {selectedProject.company.name || ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Started At</p>
                    <p className="text-base sm:text-lg font-semibold text-foreground">
                      {formatDatetimeAMPM(selectedProject.started_at)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Will Finish At</p>
                    <p className="text-base sm:text-lg font-semibold text-foreground">
                      {formatDatetimeAMPM(selectedProject.will_finish_at)}
                    </p>
                  </div>
                </div>

                {selectedProject.images && selectedProject.images.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-3">Images ({selectedProject.images.length})</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedProject.images.map((img) => (
                        <div key={img.uid} className="relative group">
                          <img
                            src={img.file || "/placeholder.svg"}
                            alt={img.file_name}
                            className="w-full h-24 object-cover rounded-lg border border-border"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.buyers && selectedProject.buyers.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Buyers</p>
                    <div className="space-y-1">
                      {selectedProject.buyers.map((buyer) => (
                        <p key={buyer.uid} className="text-sm text-foreground">
                          {buyer.name}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Settings Modal */}
      {settingsModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-3xl border-border max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-lg sm:text-xl line-clamp-2">Update Project - {selectedProject.name}</CardTitle>
              <button onClick={() => setSettingsModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Project Name */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Project Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                      }`}
                  />
                  {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name[0]}</p>}
                </div>

                {/* Started Date */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Started Date</label>
                  <input
                    type="datetime-local"
                    name="started_at"
                    value={formData.started_at}
                    onChange={handleFormChange}
                    className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${fieldErrors.started_at ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                      }`}
                  />
                  {fieldErrors.started_at && <p className="text-sm text-red-600 mt-1">{fieldErrors.started_at[0]}</p>}
                </div>

                {/* Finish Date */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Finish Date</label>
                  <input
                    type="datetime-local"
                    name="will_finish_at"
                    value={formData.will_finish_at}
                    onChange={handleFormChange}
                    className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${fieldErrors.will_finish_at
                        ? "border-red-500 focus:ring-red-500"
                        : "border-border focus:ring-primary"
                      }`}
                  />
                  {fieldErrors.will_finish_at && (
                    <p className="text-sm text-red-600 mt-1">{fieldErrors.will_finish_at[0]}</p>
                  )}
                </div>

                {/* Company - Only for SUPER_ADMIN */}
                {canAccessFeature(userRole, "company_selection") && (
                  <div className="relative">
                    <label className="text-sm font-medium text-foreground block mb-2">Company</label>
                    <span className="pointer-events-none absolute right-4 top-11.5 -translate-y-1/2 text-gray-500 text-sm">
                      <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </span>
                    <select
                      name="company_uid"
                      value={formData.company_uid}
                      onChange={handleFormChange}
                      className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground appearance-none focus:outline-none focus:ring-2 focus:border-transparent transition ${fieldErrors.company_uid
                          ? "border-red-500 focus:ring-red-500"
                          : "border-border focus:ring-primary"
                        }`}
                    >
                      <option value="">Select a company</option>
                      {allCompanies.map((company) => (
                        <option key={company.uid} value={company.uid}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.company_uid && (
                      <p className="text-sm text-red-600 mt-1">{fieldErrors.company_uid[0]}</p>
                    )}
                  </div>
                )}

                {/* Buyers - Dropdown Multi Select with Checkboxes */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Buyers</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground text-left flex items-center justify-between hover:bg-muted/30 transition focus:outline-none focus:ring-2 focus:border-transparent ${fieldErrors.buyer_uids
                            ? "border-red-500 focus:ring-red-500"
                            : "border-border focus:ring-primary"
                          }`}
                      >
                        <span className={formData.buyer_uids.length > 0 ? "text-foreground" : "text-muted-foreground"}>
                          {formData.buyer_uids.length > 0
                            ? `${formData.buyer_uids.length} buyer(s) selected`
                            : "Select buyers..."}
                        </span>
                        <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      {allBuyers.length > 0 ? (
                        <div>
                          {allBuyers.map((buyer) => (
                            <DropdownMenuCheckboxItem
                              key={buyer.uid}
                              checked={formData.buyer_uids.includes(buyer.uid)}
                              onCheckedChange={() => handleBuyerToggle(buyer.uid)}
                            >
                              {buyer.name}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </div>
                      ) : (
                        <div className="p-2 text-sm text-muted-foreground">No buyers available</div>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {fieldErrors.buyer_uids && <p className="text-sm text-red-600 mt-1">{fieldErrors.buyer_uids[0]}</p>}
                </div>

                {/* Image Upload */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Project Images ({selectedProject.images?.length || 0})
                  </label>
                  <Button
                    type="button"
                    onClick={() => setImageUploadOpen(true)}
                    className="w-88 bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Manage Images
                  </Button>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                  <Button
                    onClick={handleUpdateProject}
                    disabled={isSaving}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update"
                    )}
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setSettingsModal(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Image Upload Modal */}
      <ImageUploadModal
        isOpen={imageUploadOpen}
        onClose={() => setImageUploadOpen(false)}
        existingImages={selectedProject?.images || []}
        onImagesUpload={() => {
          setImageUploadOpen(false)
        }}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-border">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-lg">Delete Project</CardTitle>
              <button onClick={() => setDeleteConfirmModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-foreground mb-6">
                Are you sure you want to delete project "{selectedProject.name}"? This action cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleDeleteProject}
                  disabled={isDeleting}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setDeleteConfirmModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
