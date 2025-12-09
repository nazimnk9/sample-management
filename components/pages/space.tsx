// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Plus, Trash2, Edit2, FolderOpen } from "lucide-react"

// const initialSpaces = [
//   { id: 1, name: "Ground Floor - A", capacity: 500, used: 345, status: "Active" },
//   { id: 2, name: "Ground Floor - B", capacity: 500, used: 412, status: "Active" },
//   { id: 3, name: "First Floor - A", capacity: 400, used: 256, status: "Active" },
//   { id: 4, name: "First Floor - B", capacity: 400, used: 180, status: "Available" },
// ]

// export default function SpacePage() {
//   const [spaces, setSpaces] = useState(initialSpaces)
//   const [newSpaceName, setNewSpaceName] = useState("")
//   const [newSpaceCapacity, setNewSpaceCapacity] = useState("")
//   const [editingId, setEditingId] = useState<number | null>(null)
//   const [editName, setEditName] = useState("")
//   const [editCapacity, setEditCapacity] = useState("")

//   const addSpace = () => {
//     if (newSpaceName && newSpaceCapacity) {
//       const newSpace = {
//         id: Math.max(...spaces.map((s) => s.id), 0) + 1,
//         name: newSpaceName,
//         capacity: Number.parseInt(newSpaceCapacity),
//         used: 0,
//         status: "Available",
//       }
//       setSpaces([...spaces, newSpace])
//       setNewSpaceName("")
//       setNewSpaceCapacity("")
//     }
//   }

//   const deleteSpace = (id: number) => {
//     setSpaces(spaces.filter((s) => s.id !== id))
//   }

//   const updateSpace = (id: number) => {
//     setSpaces(spaces.map((s) => (s.id === id ? { ...s, name: editName, capacity: Number.parseInt(editCapacity) } : s)))
//     setEditingId(null)
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="mb-6 sm:mb-8">
//         <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Sample Storage Spaces</h1>
//         <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage and organize your sample storage areas</p>
//       </div>

//       <Card className="border-border mb-6 sm:mb-8">
//         <CardHeader className="pb-3 sm:pb-4">
//           <CardTitle className="text-base sm:text-lg">Add New Storage Space</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//             <input
//               type="text"
//               placeholder="Space Name (e.g., Ground Floor - A)"
//               value={newSpaceName}
//               onChange={(e) => setNewSpaceName(e.target.value)}
//               className="flex-1 px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//             <input
//               type="number"
//               placeholder="Capacity"
//               value={newSpaceCapacity}
//               onChange={(e) => setNewSpaceCapacity(e.target.value)}
//               className="sm:w-32 px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//             <Button
//               onClick={addSpace}
//               className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 text-sm"
//             >
//               <Plus className="w-4 h-4" />
//               Add Space
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//         {spaces.map((space) => {
//           const usagePercent = (space.used / space.capacity) * 100
//           return (
//             <Card key={space.id} className="border-border hover:shadow-lg transition-all">
//               <CardHeader className="pb-2 sm:pb-3">
//                 <div className="flex items-start justify-between gap-2">
//                   <div className="flex items-center gap-2 min-w-0">
//                     <FolderOpen className="w-4 sm:w-5 h-4 sm:h-5 text-primary flex-shrink-0" />
//                     <CardTitle className="text-base sm:text-lg line-clamp-1">{space.name}</CardTitle>
//                   </div>
//                   <span
//                     className={`text-xs font-medium px-2 py-1 rounded flex-shrink-0 whitespace-nowrap ${
//                       space.status === "Active" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
//                     }`}
//                   >
//                     {space.status}
//                   </span>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4 mb-4">
//                   <div>
//                     <div className="flex items-center justify-between mb-2">
//                       <p className="text-xs text-muted-foreground">Capacity Usage</p>
//                       <p className="text-sm font-semibold text-foreground">{usagePercent.toFixed(0)}%</p>
//                     </div>
//                     <div className="w-full bg-muted rounded-full h-2">
//                       <div
//                         className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
//                         style={{ width: `${usagePercent}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-2 sm:gap-3">
//                     <div className="p-2 sm:p-3 bg-muted/30 rounded-lg">
//                       <p className="text-xs text-muted-foreground mb-1">Total Capacity</p>
//                       <p className="text-base sm:text-lg font-semibold text-foreground">{space.capacity}</p>
//                     </div>
//                     <div className="p-2 sm:p-3 bg-muted/30 rounded-lg">
//                       <p className="text-xs text-muted-foreground mb-1">Used</p>
//                       <p className="text-base sm:text-lg font-semibold text-foreground">{space.used}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {editingId === space.id ? (
//                   <div className="space-y-2 sm:space-y-3 pt-4 border-t border-border">
//                     <input
//                       type="text"
//                       value={editName}
//                       onChange={(e) => setEditName(e.target.value)}
//                       className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                     <input
//                       type="number"
//                       value={editCapacity}
//                       onChange={(e) => setEditCapacity(e.target.value)}
//                       className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                     <div className="flex gap-2">
//                       <Button
//                         size="sm"
//                         onClick={() => updateSpace(space.id)}
//                         className="flex-1 bg-primary hover:bg-primary/90 text-white text-xs"
//                       >
//                         Save
//                       </Button>
//                       <Button size="sm" variant="outline" onClick={() => setEditingId(null)} className="flex-1 text-xs">
//                         Cancel
//                       </Button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex gap-2 pt-4 border-t border-border">
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-transparent text-xs"
//                       onClick={() => {
//                         setEditingId(space.id)
//                         setEditName(space.name)
//                         setEditCapacity(space.capacity.toString())
//                       }}
//                     >
//                       <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                       Edit
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className="flex-1 flex items-center justify-center gap-1 sm:gap-2 text-destructive hover:bg-red-50 bg-transparent text-xs"
//                       onClick={() => deleteSpace(space.id)}
//                     >
//                       <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                       Delete
//                     </Button>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           )
//         })}
//       </div>
//     </div>
//   )
// }


// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Plus, Trash2, Edit2, FolderOpen, RectangleHorizontal, ChevronLeft, X, Loader2, MoreVertical } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { getCookie,apiCall } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// interface Space {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   status: string
//   type: string
//   company: number
//   created_by: number
//   parent: string | null
// }

// interface Sample {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   storage_uid: string
// }

// export default function SpacePage() {
//   const { toast } = useToast()
//   const router = useRouter()
//   const [spaces, setSpaces] = useState<Space[]>([])
//   const [samples, setSamples] = useState<Sample[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [parentStack, setParentStack] = useState<Array<{ uid: string; name: string }>>([])
//   const [currentParentUid, setCurrentParentUid] = useState<string | null>(null)

//   // Modals
//   const [editModal, setEditModal] = useState(false)
//   const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
//   const [menuOpen, setMenuOpen] = useState<string | null>(null)
//   const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)

//   // Edit form
//   const [editFormData, setEditFormData] = useState({ name: "", description: "" })
//   const [editImage, setEditImage] = useState<File | null>(null)
//   const [editImagePreview, setEditImagePreview] = useState<string>("")
//   const [isSaving, setIsSaving] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)

//   useEffect(() => {
//     fetchSpacesAndSamples()
//   }, [currentParentUid])

//   const fetchSpacesAndSamples = async () => {
//     setIsLoading(true)
//     try {
//       // Fetch spaces
//       const spacesUrl = currentParentUid
//         ? `/sample_manager/storage/?type=SPACE&parent_uid=${currentParentUid}`
//         : `/sample_manager/storage/?type=SPACE`

//       const spacesResponse = await apiCall(spacesUrl)
//       if (spacesResponse.ok) {
//         const spacesData = await spacesResponse.json()
//         setSpaces(Array.isArray(spacesData) ? spacesData : spacesData.results || [])
//       }

//       // Fetch samples if there's a current parent
//       if (currentParentUid) {
//         const samplesResponse = await apiCall(`/sample_manager/sample/${currentParentUid}`)
//         if (samplesResponse.ok) {
//           const samplesData = await samplesResponse.json()
//           setSamples(Array.isArray(samplesData) ? samplesData : samplesData.results || [])
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err)
//       toast({
//         title: "Error",
//         description: "Failed to fetch spaces and samples",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSpaceCardClick = (space: Space) => {
//     setParentStack([...parentStack, { uid: space.uid, name: space.name }])
//     setCurrentParentUid(space.uid)
//   }

//   const handleBackClick = () => {
//     if (parentStack.length > 0) {
//       const newStack = parentStack.slice(0, -1)
//       setParentStack(newStack)
//       setCurrentParentUid(newStack.length > 0 ? newStack[newStack.length - 1].uid : null)
//     }
//   }

//   const handleEditClick = async (space: Space) => {
//     setSelectedSpace(space)
//     try {
//       const response = await apiCall(`/sample_manager/storage/${space.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setEditFormData({ name: data.name, description: data.description })
//         if (data.image) {
//           setEditImagePreview(data.image)
//         }
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load space details", variant: "destructive" })
//     }
//     setEditModal(true)
//     setMenuOpen(null)
//   }

//   const handleSaveEdit = async () => {
//     if (!selectedSpace || !editFormData.name) return
//     setIsSaving(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", editFormData.name)
//       formData.append("description", editFormData.description)
//       formData.append("type", "SPACE")
//       if (editImage) {
//         formData.append("image", editImage)
//       }
//       if (currentParentUid) {
//         formData.append("parent_uid", currentParentUid)
//       }

//       // const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, {
//       //   method: "PUT",
//       //   body: formData,
//       // })

//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/storage/${selectedSpace.uid}`, {
//                     method: "PUT",
//                     headers: {
//                       Authorization: `Bearer ${getCookie("access_token")}`,
//                     },
//                     body: formData,
//                   })

//       if (!response.ok) {
//         throw new Error("Failed to update space")
//       }

//       toast({ title: "Success", description: "Space updated successfully" })
//       setEditModal(false)
//       setEditImage(null)
//       setEditImagePreview("")
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update space", variant: "destructive" })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleDeleteClick = (space: Space) => {
//     setSelectedSpace(space)
//     setDeleteConfirmModal(true)
//     setMenuOpen(null)
//   }

//   const handleConfirmDelete = async () => {
//     if (!selectedSpace) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, { method: "DELETE" })

//       if (!response.ok) {
//         throw new Error("Failed to delete space")
//       }

//       toast({ title: "Success", description: "Space deleted successfully" })
//       setDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete space", variant: "destructive" })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setEditImage(file)
//       const reader = new FileReader()
//       reader.onload = (e) => setEditImagePreview(e.target?.result as string)
//       reader.readAsDataURL(file)
//     }
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       {/* Header */}
//       <div className="mb-6 sm:mb-8 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           {parentStack.length > 0 && (
//             <button onClick={handleBackClick} className="p-2 hover:bg-muted rounded-lg transition">
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//           )}
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
//               {parentStack.length > 0 ? parentStack[parentStack.length - 1].name : "Storage Spaces"}
//             </h1>
//             <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage your storage spaces and samples</p>
//           </div>
//         </div>
//       </div>

//       {/* Add Buttons */}
//       <div className="flex gap-2 mb-6 sm:mb-8">
//         <Link href={`/space/add${currentParentUid ? `?parent_uid=${currentParentUid}` : ""}`}>
//           <Button className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
//             <Plus className="w-4 h-4" />
//             Add Space
//           </Button>
//         </Link>
//         {currentParentUid && (
//           <Link href={`/sample/add?storage_uid=${currentParentUid}`}>
//             <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent">
//               <Plus className="w-4 h-4" />
//               Add Sample
//             </Button>
//           </Link>
//         )}
//       </div>

//       {isLoading ? (
//         <div className="flex items-center justify-center py-12">
//           <Loader2 className="w-8 h-8 animate-spin text-primary" />
//         </div>
//       ) : (
//         <>
//           {/* Spaces Grid */}
//           {spaces.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Spaces</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
//                 {spaces.map((space) => (
//                   <Card
//                     key={space.uid}
//                     className="border-border hover:shadow-lg transition-all overflow-hidden cursor-pointer group"
//                   >
//                     <div className="relative h-48 bg-muted overflow-hidden" onClick={() => handleSpaceCardClick(space)}>
//                       {space.image ? (
//                         <img
//                           src={space.image || "/placeholder.svg"}
//                           alt={space.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                       {/* Folder Icon */}
//                       <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-lg">
//                         <FolderOpen className="w-5 h-5 text-white" />
//                       </div>
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{space.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {space.description || "No description"}
//                       </p>

//                       {/* Three Dots Menu */}
//                       <div className="relative mb-4">
//                         <button
//                           onClick={() => setMenuOpen(menuOpen === space.uid ? null : space.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-muted-foreground" />
//                         </button>
//                         {menuOpen === space.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
//                             <button
//                               onClick={() => handleEditClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       {/* Edit and Delete Buttons */}
//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleEditClick(space)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleDeleteClick(space)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Samples Grid */}
//           {samples.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Samples</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                 {samples.map((sample) => (
//                   <Card key={sample.uid} className="border-border hover:shadow-lg transition-all overflow-hidden">
//                     <div className="relative h-48 bg-muted overflow-hidden">
//                       {sample.image ? (
//                         <img
//                           src={sample.image || "/placeholder.svg"}
//                           alt={sample.name}
//                           className="w-full h-full object-cover hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <RectangleHorizontal className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{sample.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {sample.description || "No description"}
//                       </p>

//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {spaces.length === 0 && samples.length === 0 && (
//             <div className="text-center py-12">
//               <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//               <p className="text-muted-foreground">No spaces or samples found</p>
//             </div>
//           )}
//         </>
//       )}

//       {/* Edit Modal */}
//       {editModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Space - {selectedSpace.name}</CardTitle>
//               <button onClick={() => setEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 {/* Name */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Space Name</label>
//                   <input
//                     type="text"
//                     value={editFormData.name}
//                     onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                   <textarea
//                     value={editFormData.description}
//                     onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={3}
//                   />
//                 </div>

//                 {/* Image */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Image</label>
//                   {editImagePreview && (
//                     <div className="mb-3 relative">
//                       <img
//                         src={editImagePreview || "/placeholder.svg"}
//                         alt="Preview"
//                         className="w-full h-40 object-cover rounded-lg"
//                       />
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 {/* Submit Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleSaveEdit}
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
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setEditModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {deleteConfirmModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Space</CardTitle>
//               <button onClick={() => setDeleteConfirmModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete space "{selectedSpace.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleConfirmDelete}
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
// import { Plus, Trash2, Edit2, FolderOpen, ChevronLeft, X, Loader2, MoreVertical } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { apiCall } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// interface Space {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   status: string
//   type: string
//   company: number
//   created_by: number
//   parent: string | null
// }

// interface Sample {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   storage_uid: string
// }

// interface SampleImage {
//   id: number
//   uid: string
//   file: string
//   file_name: string
// }

// export default function SpacePage() {
//   const { toast } = useToast()
//   const router = useRouter()
//   const [spaces, setSpaces] = useState<Space[]>([])
//   const [samples, setSamples] = useState<Sample[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [parentStack, setParentStack] = useState<Array<{ uid: string; name: string }>>([])
//   const [currentParentUid, setCurrentParentUid] = useState<string | null>(null)

//   // Modals
//   const [editModal, setEditModal] = useState(false)
//   const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
//   const [sampleEditModal, setSampleEditModal] = useState(false)
//   const [sampleDeleteConfirmModal, setSampleDeleteConfirmModal] = useState(false)
//   const [menuOpen, setMenuOpen] = useState<string | null>(null)
//   const [sampleMenuOpen, setSampleMenuOpen] = useState<string | null>(null)
//   const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
//   const [selectedSample, setSelectedSample] = useState<Sample | null>(null)

//   // Edit form
//   const [editFormData, setEditFormData] = useState({ name: "", description: "" })
//   const [editImage, setEditImage] = useState<File | null>(null)
//   const [editImagePreview, setEditImagePreview] = useState<string>("")
//   const [isSaving, setIsSaving] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)
//   const [sampleEditFormData, setSampleEditFormData] = useState({
//     name: "",
//     description: "",
//     style_no: "",
//     sku_no: "",
//     item: "",
//     fabrication: "",
//     weight: "",
//     weight_type: "GM",
//     size_type: "CENTIMETER",
//     types: "DEVELOPMENT",
//     color: "",
//     size: "",
//     comments: "",
//     arrival_date: "",
//     buyer_uids: [] as string[],
//     project_uids: [] as string[],
//     note_uids: [] as string[],
//   })
//   const [sampleImages, setSampleImages] = useState<SampleImage[]>([])

//   useEffect(() => {
//     fetchSpacesAndSamples()
//   }, [currentParentUid])

//   const fetchSpacesAndSamples = async () => {
//     setIsLoading(true)
//     try {
//       // Fetch spaces
//       const spacesUrl = currentParentUid
//         ? `/sample_manager/storage/?type=SPACE&parent_uid=${currentParentUid}`
//         : `/sample_manager/storage/?type=SPACE`

//       const spacesResponse = await apiCall(spacesUrl)
//       if (spacesResponse.ok) {
//         const spacesData = await spacesResponse.json()
//         setSpaces(Array.isArray(spacesData) ? spacesData : spacesData.results || [])
//       }

//       // Fetch samples if there's a current parent
//       if (currentParentUid) {
//         const samplesResponse = await apiCall(`/sample_manager/sample/${currentParentUid}`)
//         if (samplesResponse.ok) {
//           const samplesData = await samplesResponse.json()
//           setSamples(Array.isArray(samplesData) ? samplesData : samplesData.results || [])
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err)
//       toast({
//         title: "Error",
//         description: "Failed to fetch spaces and samples",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSpaceCardClick = (space: Space) => {
//     setParentStack([...parentStack, { uid: space.uid, name: space.name }])
//     setCurrentParentUid(space.uid)
//   }

//   const handleBackClick = () => {
//     if (parentStack.length > 0) {
//       const newStack = parentStack.slice(0, -1)
//       setParentStack(newStack)
//       setCurrentParentUid(newStack.length > 0 ? newStack[newStack.length - 1].uid : null)
//     }
//   }

//   const handleEditClick = async (space: Space) => {
//     setSelectedSpace(space)
//     try {
//       const response = await apiCall(`/sample_manager/storage/${space.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setEditFormData({ name: data.name, description: data.description })
//         if (data.image) {
//           setEditImagePreview(data.image)
//         }
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load space details", variant: "destructive" })
//     }
//     setEditModal(true)
//     setMenuOpen(null)
//   }

//   const handleSaveEdit = async () => {
//     if (!selectedSpace || !editFormData.name) return
//     setIsSaving(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", editFormData.name)
//       formData.append("description", editFormData.description)
//       formData.append("type", "SPACE")
//       if (editImage) {
//         formData.append("image", editImage)
//       }
//       if (currentParentUid) {
//         formData.append("parent_uid", currentParentUid)
//       }

//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, {
//         method: "PUT",
//         body: formData,
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update space")
//       }

//       toast({ title: "Success", description: "Space updated successfully" })
//       setEditModal(false)
//       setEditImage(null)
//       setEditImagePreview("")
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update space", variant: "destructive" })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleDeleteClick = (space: Space) => {
//     setSelectedSpace(space)
//     setDeleteConfirmModal(true)
//     setMenuOpen(null)
//   }

//   const handleConfirmDelete = async () => {
//     if (!selectedSpace) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, { method: "DELETE" })

//       if (!response.ok) {
//         throw new Error("Failed to delete space")
//       }

//       toast({ title: "Success", description: "Space deleted successfully" })
//       setDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete space", variant: "destructive" })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const handleSampleEditClick = async (sample: Sample) => {
//     setSelectedSample(sample)
//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${sample.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setSampleEditFormData({
//           name: data.name || "",
//           description: data.description || "",
//           style_no: data.style_no || "",
//           sku_no: data.sku_no || "",
//           item: data.item || "",
//           fabrication: data.fabrication || "",
//           weight: data.weight || "",
//           weight_type: data.weight_type || "GM",
//           size_type: data.size_type || "CENTIMETER",
//           types: data.types || "DEVELOPMENT",
//           color: data.color || "",
//           size: data.size || "",
//           comments: data.comments || "",
//           arrival_date: data.arrival_date || "",
//           buyer_uids: data.buyer_uids || [],
//           project_uids: data.project_uids || [],
//           note_uids: data.note_uids || [],
//         })
//         setSampleImages(data.images || [])
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
//     }
//     setSampleEditModal(true)
//     setSampleMenuOpen(null)
//   }

//   const handleSampleUpdate = async () => {
//     if (!selectedSample || !currentParentUid) return
//     setIsSaving(true)

//     try {
//       const submitData = {
//         ...sampleEditFormData,
//         image_uids: sampleImages.map((img) => img.uid),
//       }

//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//         method: "PUT",
//         body: JSON.stringify(submitData),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update sample")
//       }

//       toast({ title: "Success", description: "Sample updated successfully" })
//       setSampleEditModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update sample", variant: "destructive" })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleSampleDeleteClick = (sample: Sample) => {
//     setSelectedSample(sample)
//     setSampleDeleteConfirmModal(true)
//     setSampleMenuOpen(null)
//   }

//   const handleSampleConfirmDelete = async () => {
//     if (!selectedSample || !currentParentUid) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete sample")
//       }

//       toast({ title: "Success", description: "Sample deleted successfully" })
//       setSampleDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete sample", variant: "destructive" })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setEditImage(file)
//       const reader = new FileReader()
//       reader.onload = (e) => setEditImagePreview(e.target?.result as string)
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSampleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       // Handle image upload similar to space image
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         setSampleImages((prev) => [
//           ...prev,
//           {
//             id: Math.random(),
//             uid: Math.random().toString(),
//             file: e.target?.result as string,
//             file_name: file.name,
//           },
//         ])
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       {/* Header */}
//       <div className="mb-6 sm:mb-8 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           {parentStack.length > 0 && (
//             <button onClick={handleBackClick} className="p-2 hover:bg-muted rounded-lg transition">
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//           )}
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
//               {parentStack.length > 0 ? parentStack[parentStack.length - 1].name : "Storage Spaces"}
//             </h1>
//             <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage your storage spaces and samples</p>
//           </div>
//         </div>
//       </div>

//       {/* Add Buttons */}
//       <div className="flex gap-2 mb-6 sm:mb-8">
//         <Link href={`/space/add${currentParentUid ? `?parent_uid=${currentParentUid}` : ""}`}>
//           <Button className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
//             <Plus className="w-4 h-4" />
//             Add Space
//           </Button>
//         </Link>
//         {currentParentUid && (
//           <Link href={`/sample/add?storage_uid=${currentParentUid}`}>
//             <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent">
//               <Plus className="w-4 h-4" />
//               Add Sample
//             </Button>
//           </Link>
//         )}
//       </div>

//       {isLoading ? (
//         <div className="flex items-center justify-center py-12">
//           <Loader2 className="w-8 h-8 animate-spin text-primary" />
//         </div>
//       ) : (
//         <>
//           {/* Spaces Grid */}
//           {spaces.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Spaces</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
//                 {spaces.map((space) => (
//                   <Card
//                     key={space.uid}
//                     className="border-border hover:shadow-lg transition-all overflow-hidden cursor-pointer group"
//                   >
//                     <div className="relative h-48 bg-muted overflow-hidden" onClick={() => handleSpaceCardClick(space)}>
//                       {space.image ? (
//                         <img
//                           src={space.image || "/placeholder.svg"}
//                           alt={space.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                       {/* Folder Icon */}
//                       <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-lg">
//                         <FolderOpen className="w-5 h-5 text-white" />
//                       </div>
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{space.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {space.description || "No description"}
//                       </p>

//                       {/* Three Dots Menu */}
//                       <div className="relative mb-4">
//                         <button
//                           onClick={() => setMenuOpen(menuOpen === space.uid ? null : space.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-muted-foreground" />
//                         </button>
//                         {menuOpen === space.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
//                             <button
//                               onClick={() => handleEditClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       {/* Edit and Delete Buttons */}
//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleEditClick(space)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleDeleteClick(space)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Samples Grid */}
//           {samples.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Samples</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                 {samples.map((sample) => (
//                   <Card key={sample.uid} className="border-border hover:shadow-lg transition-all overflow-hidden">
//                     <div className="relative h-48 bg-muted overflow-hidden">
//                       {sample.image ? (
//                         <img
//                           src={sample.image || "/placeholder.svg"}
//                           alt={sample.name}
//                           className="w-full h-full object-cover hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{sample.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {sample.description || "No description"}
//                       </p>

//                       <div className="relative mb-4">
//                         <button
//                           onClick={() => setSampleMenuOpen(sampleMenuOpen === sample.uid ? null : sample.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-muted-foreground" />
//                         </button>
//                         {sampleMenuOpen === sample.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
//                             <button
//                               onClick={() => handleSampleEditClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleSampleDeleteClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleSampleEditClick(sample)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleSampleDeleteClick(sample)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {spaces.length === 0 && samples.length === 0 && (
//             <div className="text-center py-12">
//               <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//               <p className="text-muted-foreground">No spaces or samples found</p>
//             </div>
//           )}
//         </>
//       )}

//       {/* Edit Modal */}
//       {editModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Space - {selectedSpace.name}</CardTitle>
//               <button onClick={() => setEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 {/* Name */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Space Name</label>
//                   <input
//                     type="text"
//                     value={editFormData.name}
//                     onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                   <textarea
//                     value={editFormData.description}
//                     onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={3}
//                   />
//                 </div>

//                 {/* Image */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Image</label>
//                   {editImagePreview && (
//                     <div className="mb-3 relative">
//                       <img
//                         src={editImagePreview || "/placeholder.svg"}
//                         alt="Preview"
//                         className="w-full h-40 object-cover rounded-lg"
//                       />
//                       <button
//                         onClick={() => {
//                           setEditImagePreview("")
//                           setEditImage(null)
//                         }}
//                         className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 {/* Submit Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleSaveEdit}
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
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setEditModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {deleteConfirmModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Space</CardTitle>
//               <button onClick={() => setDeleteConfirmModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete space "{selectedSpace.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleConfirmDelete}
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

//       {sampleEditModal && selectedSample && currentParentUid && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Sample - {selectedSample.name}</CardTitle>
//               <button onClick={() => setSampleEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 {/* Basic Fields */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-1">Name</label>
//                     <input
//                       type="text"
//                       value={sampleEditFormData.name}
//                       onChange={(e) => setSampleEditFormData({ ...sampleEditFormData, name: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-1">Style No</label>
//                     <input
//                       type="text"
//                       value={sampleEditFormData.style_no}
//                       onChange={(e) => setSampleEditFormData({ ...sampleEditFormData, style_no: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-1">Description</label>
//                   <textarea
//                     value={sampleEditFormData.description}
//                     onChange={(e) => setSampleEditFormData({ ...sampleEditFormData, description: e.target.value })}
//                     className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={2}
//                   />
//                 </div>

//                 {/* Sample images display and remove */}
//                 {sampleImages.length > 0 && (
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Sample Images</label>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                       {sampleImages.map((img) => (
//                         <div key={img.uid} className="relative group">
//                           <img
//                             src={img.file || "/placeholder.svg"}
//                             alt="sample"
//                             className="w-full h-24 object-cover rounded-lg border border-border"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setSampleImages((prev) => prev.filter((i) => i.uid !== img.uid))}
//                             className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
//                           >
//                             <X className="w-3 h-3" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Submit Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleSampleUpdate}
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
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setSampleEditModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {sampleDeleteConfirmModal && selectedSample && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Sample</CardTitle>
//               <button
//                 onClick={() => setSampleDeleteConfirmModal(false)}
//                 className="p-1 hover:bg-muted rounded flex-shrink-0"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete sample "{selectedSample.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleSampleConfirmDelete}
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
//                   onClick={() => setSampleDeleteConfirmModal(false)}
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
// import { Plus, Trash2, Edit2, FolderOpen, ChevronLeft, X, Loader2, MoreVertical } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { apiCall } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// interface Space {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   status: string
//   type: string
//   company: number
//   created_by: number
//   parent: string | null
// }

// interface Sample {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   storage_uid: string
// }

// interface SampleImage {
//   id: number
//   uid: string
//   file: string
//   file_name: string
// }

// export default function SpacePage() {
//   const { toast } = useToast()
//   const router = useRouter()
//   const [spaces, setSpaces] = useState<Space[]>([])
//   const [samples, setSamples] = useState<Sample[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [parentStack, setParentStack] = useState<Array<{ uid: string; name: string }>>([])
//   const [currentParentUid, setCurrentParentUid] = useState<string | null>(null)

//   // Modals
//   const [editModal, setEditModal] = useState(false)
//   const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
//   const [sampleEditModal, setSampleEditModal] = useState(false)
//   const [sampleDeleteConfirmModal, setSampleDeleteConfirmModal] = useState(false)
//   const [menuOpen, setMenuOpen] = useState<string | null>(null)
//   const [sampleMenuOpen, setSampleMenuOpen] = useState<string | null>(null)
//   const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
//   const [selectedSample, setSelectedSample] = useState<Sample | null>(null)

//   // Edit form
//   const [editFormData, setEditFormData] = useState({ name: "", description: "" })
//   const [editImage, setEditImage] = useState<File | null>(null)
//   const [editImagePreview, setEditImagePreview] = useState<string>("")
//   const [isSaving, setIsSaving] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)
//   const [sampleEditFormData, setSampleEditFormData] = useState({
//     name: "",
//     description: "",
//     style_no: "",
//     sku_no: "",
//     item: "",
//     fabrication: "",
//     weight: "",
//     weight_type: "GM",
//     size_type: "CENTIMETER",
//     types: "DEVELOPMENT",
//     color: "",
//     size: "",
//     comments: "",
//     arrival_date: "",
//     buyer_uids: [] as string[],
//     project_uids: [] as string[],
//     note_uids: [] as string[],
//   })
//   const [sampleImages, setSampleImages] = useState<SampleImage[]>([])

//   useEffect(() => {
//     fetchSpacesAndSamples()
//   }, [currentParentUid])

//   const fetchSpacesAndSamples = async () => {
//     setIsLoading(true)
//     try {
//       // Fetch spaces
//       const spacesUrl = currentParentUid
//         ? `/sample_manager/storage/?type=SPACE&parent_uid=${currentParentUid}`
//         : `/sample_manager/storage/?type=SPACE`

//       const spacesResponse = await apiCall(spacesUrl)
//       if (spacesResponse.ok) {
//         const spacesData = await spacesResponse.json()
//         setSpaces(Array.isArray(spacesData) ? spacesData : spacesData.results || [])
//       }

//       // Fetch samples if there's a current parent
//       if (currentParentUid) {
//         const samplesResponse = await apiCall(`/sample_manager/sample/${currentParentUid}`)
//         if (samplesResponse.ok) {
//           const samplesData = await samplesResponse.json()
//           setSamples(Array.isArray(samplesData) ? samplesData : samplesData.results || [])
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err)
//       toast({
//         title: "Error",
//         description: "Failed to fetch spaces and samples",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSpaceCardClick = (space: Space) => {
//     setParentStack([...parentStack, { uid: space.uid, name: space.name }])
//     setCurrentParentUid(space.uid)
//   }

//   const handleBackClick = () => {
//     if (parentStack.length > 0) {
//       const newStack = parentStack.slice(0, -1)
//       setParentStack(newStack)
//       setCurrentParentUid(newStack.length > 0 ? newStack[newStack.length - 1].uid : null)
//     }
//   }

//   const handleEditClick = async (space: Space) => {
//     setSelectedSpace(space)
//     try {
//       const response = await apiCall(`/sample_manager/storage/${space.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setEditFormData({ name: data.name, description: data.description })
//         if (data.image) {
//           setEditImagePreview(data.image)
//         }
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load space details", variant: "destructive" })
//     }
//     setEditModal(true)
//     setMenuOpen(null)
//   }

//   const handleSaveEdit = async () => {
//     if (!selectedSpace || !editFormData.name) return
//     setIsSaving(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", editFormData.name)
//       formData.append("description", editFormData.description)
//       formData.append("type", "SPACE")
//       if (editImage) {
//         formData.append("image", editImage)
//       }
//       if (currentParentUid) {
//         formData.append("parent_uid", currentParentUid)
//       }

//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, {
//         method: "PUT",
//         body: formData,
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update space")
//       }

//       toast({ title: "Success", description: "Space updated successfully" })
//       setEditModal(false)
//       setEditImage(null)
//       setEditImagePreview("")
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update space", variant: "destructive" })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleDeleteClick = (space: Space) => {
//     setSelectedSpace(space)
//     setDeleteConfirmModal(true)
//     setMenuOpen(null)
//   }

//   const handleConfirmDelete = async () => {
//     if (!selectedSpace) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, { method: "DELETE" })

//       if (!response.ok) {
//         throw new Error("Failed to delete space")
//       }

//       toast({ title: "Success", description: "Space deleted successfully" })
//       setDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete space", variant: "destructive" })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const handleSampleEditClick = async (sample: Sample) => {
//     setSelectedSample(sample)
//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${sample.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setSampleEditFormData({
//           name: data.name || "",
//           description: data.description || "",
//           style_no: data.style_no || "",
//           sku_no: data.sku_no || "",
//           item: data.item || "",
//           fabrication: data.fabrication || "",
//           weight: data.weight || "",
//           weight_type: data.weight_type || "GM",
//           size_type: data.size_type || "CENTIMETER",
//           types: data.types || "DEVELOPMENT",
//           color: data.color || "",
//           size: data.size || "",
//           comments: data.comments || "",
//           arrival_date: data.arrival_date || "",
//           buyer_uids: data.buyer_uids || [],
//           project_uids: data.project_uids || [],
//           note_uids: data.note_uids || [],
//         })
//         setSampleImages(data.images || [])
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
//     }
//     setSampleEditModal(true)
//     setSampleMenuOpen(null)
//   }

//   const handleSampleUpdate = async () => {
//     if (!selectedSample || !currentParentUid) return
//     setIsSaving(true)

//     try {
//       const submitData = {
//         ...sampleEditFormData,
//         image_uids: sampleImages.map((img) => img.uid),
//       }

//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//         method: "PUT",
//         body: JSON.stringify(submitData),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update sample")
//       }

//       toast({ title: "Success", description: "Sample updated successfully" })
//       setSampleEditModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update sample", variant: "destructive" })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleSampleDeleteClick = (sample: Sample) => {
//     setSelectedSample(sample)
//     setSampleDeleteConfirmModal(true)
//     setSampleMenuOpen(null)
//   }

//   const handleSampleConfirmDelete = async () => {
//     if (!selectedSample || !currentParentUid) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete sample")
//       }

//       toast({ title: "Success", description: "Sample deleted successfully" })
//       setSampleDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete sample", variant: "destructive" })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setEditImage(file)
//       const reader = new FileReader()
//       reader.onload = (e) => setEditImagePreview(e.target?.result as string)
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSampleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       // Handle image upload similar to space image
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         setSampleImages((prev) => [
//           ...prev,
//           {
//             id: Math.random(),
//             uid: Math.random().toString(),
//             file: e.target?.result as string,
//             file_name: file.name,
//           },
//         ])
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="mb-2 sm:mb-3 text-xs sm:text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
//         <span className="cursor-pointer hover:text-foreground" onClick={() => setCurrentParentUid(null)}>
//           Storage Spaces
//         </span>
//         {parentStack.map((space, index) => (
//           <div key={space.uid} className="flex items-center gap-2">
//             <span>/</span>
//             <span
//               className="cursor-pointer hover:text-foreground"
//               onClick={() => {
//                 const newStack = parentStack.slice(0, index + 1)
//                 setParentStack(newStack)
//                 setCurrentParentUid(newStack[newStack.length - 1].uid)
//               }}
//             >
//               {space.name}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Header */}
//       <div className="mb-6 sm:mb-8 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           {parentStack.length > 0 && (
//             <button onClick={handleBackClick} className="p-2 hover:bg-muted rounded-lg transition">
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//           )}
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
//               {parentStack.length > 0 ? parentStack[parentStack.length - 1].name : "Storage Spaces"}
//             </h1>
//             <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage your storage spaces and samples</p>
//           </div>
//         </div>
//       </div>

//       {/* Add Buttons */}
//       <div className="flex gap-2 mb-6 sm:mb-8">
//         <Link href={`/space/add${currentParentUid ? `?parent_uid=${currentParentUid}` : ""}`}>
//           <Button className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
//             <Plus className="w-4 h-4" />
//             Add Space
//           </Button>
//         </Link>
//         {currentParentUid && (
//           <Link href={`/sample/add?storage_uid=${currentParentUid}`}>
//             <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent">
//               <Plus className="w-4 h-4" />
//               Add Sample
//             </Button>
//           </Link>
//         )}
//       </div>

//       {isLoading ? (
//         <div className="flex items-center justify-center py-12">
//           <Loader2 className="w-8 h-8 animate-spin text-primary" />
//         </div>
//       ) : (
//         <>
//           {/* Spaces Grid */}
//           {spaces.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Spaces</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
//                 {spaces.map((space) => (
//                   <Card
//                     key={space.uid}
//                     className="border-border hover:shadow-lg transition-all overflow-hidden cursor-pointer group"
//                   >
//                     <div className="relative h-48 bg-muted overflow-hidden" onClick={() => handleSpaceCardClick(space)}>
//                       {space.image ? (
//                         <img
//                           src={space.image || "/placeholder.svg"}
//                           alt={space.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                       {/* Folder Icon */}
//                       <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-lg">
//                         <FolderOpen className="w-5 h-5 text-white" />
//                       </div>
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{space.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {space.description || "No description"}
//                       </p>

//                       {/* Three Dots Menu */}
//                       <div className="relative mb-4">
//                         <button
//                           onClick={() => setMenuOpen(menuOpen === space.uid ? null : space.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-muted-foreground" />
//                         </button>
//                         {menuOpen === space.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
//                             <button
//                               onClick={() => handleEditClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       {/* Edit and Delete Buttons */}
//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleEditClick(space)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleDeleteClick(space)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Samples Grid */}
//           {samples.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Samples</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                 {samples.map((sample) => (
//                   <Card key={sample.uid} className="border-border hover:shadow-lg transition-all overflow-hidden">
//                     <div className="relative h-48 bg-muted overflow-hidden">
//                       {sample.image ? (
//                         <img
//                           src={sample.image || "/placeholder.svg"}
//                           alt={sample.name}
//                           className="w-full h-full object-cover hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{sample.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {sample.description || "No description"}
//                       </p>

//                       <div className="relative mb-4">
//                         <button
//                           onClick={() => setSampleMenuOpen(sampleMenuOpen === sample.uid ? null : sample.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-muted-foreground" />
//                         </button>
//                         {sampleMenuOpen === sample.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
//                             <button
//                               onClick={() => handleSampleEditClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleSampleDeleteClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleSampleEditClick(sample)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleSampleDeleteClick(sample)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {spaces.length === 0 && samples.length === 0 && (
//             <div className="text-center py-12">
//               <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//               <p className="text-muted-foreground">No spaces or samples found</p>
//             </div>
//           )}
//         </>
//       )}

//       {/* Edit Modal */}
//       {editModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Space - {selectedSpace.name}</CardTitle>
//               <button onClick={() => setEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 {/* Name */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Space Name</label>
//                   <input
//                     type="text"
//                     value={editFormData.name}
//                     onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                   <textarea
//                     value={editFormData.description}
//                     onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={3}
//                   />
//                 </div>

//                 {/* Image */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Image</label>
//                   {editImagePreview && (
//                     <div className="mb-3 relative">
//                       <img
//                         src={editImagePreview || "/placeholder.svg"}
//                         alt="Preview"
//                         className="w-full h-40 object-cover rounded-lg"
//                       />
//                       <button
//                         onClick={() => {
//                           setEditImagePreview("")
//                           setEditImage(null)
//                         }}
//                         className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 {/* Submit Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleSaveEdit}
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
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setEditModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {deleteConfirmModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Space</CardTitle>
//               <button onClick={() => setDeleteConfirmModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete space "{selectedSpace.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleConfirmDelete}
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

//       {/* Edit Modal - Sample Edit Modal with all fields */}
//       {sampleEditModal && selectedSample && currentParentUid && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-4xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3 sticky top-0 bg-card">
//               <CardTitle className="text-lg sm:text-xl">Edit Sample - {selectedSample.name}</CardTitle>
//               <button onClick={() => setSampleEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 {/* Basic Information */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-1">Name</label>
//                     <input
//                       type="text"
//                       value={sampleEditFormData.name}
//                       onChange={(e) => setSampleEditFormData({ ...sampleEditFormData, name: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-1">Style No</label>
//                     <input
//                       type="text"
//                       value={sampleEditFormData.style_no}
//                       onChange={(e) => setSampleEditFormData({ ...sampleEditFormData, style_no: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-1">SKU No</label>
//                     <input
//                       type="text"
//                       value={sampleEditFormData.sku_no}
//                       onChange={(e) => setSampleEditFormData({ ...sampleEditFormData, sku_no: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-1">Item</label>
//                     <input
//                       type="text"
//                       value={sampleEditFormData.item}
//                       onChange={(e) => setSampleEditFormData({ ...sampleEditFormData, item: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-1">Fabrication</label>
//                     <input
//                       type="text"
//                       value={sampleEditFormData.fabrication}
//                       onChange={(e) => setSampleEditFormData({ ...sampleEditFormData, fabrication: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-1">Color</label>
//                     <input
//                       type="text"
//                       value={sampleEditFormData.color}
//                       onChange={(e) => setSampleEditFormData({ ...sampleEditFormData, color: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-1">Size</label>
//                     <input
//                       type="text"
//                       value={sampleEditFormData.size}
//                       onChange={(e) => setSampleEditFormData({ ...sampleEditFormData, size: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-1">Weight</label>
//                     <input
//                       type="text"
//                       value={sampleEditFormData.weight}
//                       onChange={(e) => setSampleEditFormData({ ...sampleEditFormData, weight: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-1">Arrival Date</label>
//                     <input
//                       type="datetime-local"
//                       value={sampleEditFormData.arrival_date}
//                       onChange={(e) => setSampleEditFormData({ ...sampleEditFormData, arrival_date: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-1">Description</label>
//                   <textarea
//                     value={sampleEditFormData.description}
//                     onChange={(e) => setSampleEditFormData({ ...sampleEditFormData, description: e.target.value })}
//                     className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={2}
//                   />
//                 </div>

//                 {/* Comments */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-1">Comments</label>
//                   <textarea
//                     value={sampleEditFormData.comments}
//                     onChange={(e) => setSampleEditFormData({ ...sampleEditFormData, comments: e.target.value })}
//                     className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={2}
//                   />
//                 </div>

//                 {/* Multi-Select Fields */}
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-1">Buyers</label>
//                     <select
//                       multiple
//                       value={sampleEditFormData.buyer_uids}
//                       onChange={(e) => {
//                         const selected = Array.from(e.target.selectedOptions, (option) => option.value)
//                         setSampleEditFormData({ ...sampleEditFormData, buyer_uids: selected })
//                       }}
//                       className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                       size={3}
//                     >
//                       <option value="">Select buyers...</option>
//                       {/* Note: You may want to fetch buyers here or pass them as props */}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-1">Notes</label>
//                     <select
//                       multiple
//                       value={sampleEditFormData.note_uids}
//                       onChange={(e) => {
//                         const selected = Array.from(e.target.selectedOptions, (option) => option.value)
//                         setSampleEditFormData({ ...sampleEditFormData, note_uids: selected })
//                       }}
//                       className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                       size={3}
//                     >
//                       <option value="">Select notes...</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-1">Projects</label>
//                     <select
//                       multiple
//                       value={sampleEditFormData.project_uids}
//                       onChange={(e) => {
//                         const selected = Array.from(e.target.selectedOptions, (option) => option.value)
//                         setSampleEditFormData({ ...sampleEditFormData, project_uids: selected })
//                       }}
//                       className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                       size={3}
//                     >
//                       <option value="">Select projects...</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Sample images display and remove */}
//                 {sampleImages.length > 0 && (
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Sample Images</label>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                       {sampleImages.map((img) => (
//                         <div key={img.uid} className="relative group">
//                           <img
//                             src={img.file || "/placeholder.svg"}
//                             alt="sample"
//                             className="w-full h-24 object-cover rounded-lg border border-border"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setSampleImages((prev) => prev.filter((i) => i.uid !== img.uid))}
//                             className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
//                           >
//                             <X className="w-3 h-3" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Submit Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleSampleUpdate}
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
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setSampleEditModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {sampleDeleteConfirmModal && selectedSample && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Sample</CardTitle>
//               <button
//                 onClick={() => setSampleDeleteConfirmModal(false)}
//                 className="p-1 hover:bg-muted rounded flex-shrink-0"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete sample "{selectedSample.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleSampleConfirmDelete}
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
//                   onClick={() => setSampleDeleteConfirmModal(false)}
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
// import { Plus, Trash2, Edit2, FolderOpen, ChevronLeft, X, Loader2, MoreVertical } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { apiCall } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import SampleEditModal from "@/components/modals/sample-edit-modal"

// interface Space {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   status: string
//   type: string
//   company: number
//   created_by: number
//   parent: string | null
// }

// interface Sample {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   storage_uid: string
// }

// export default function SpacePage() {
//   const { toast } = useToast()
//   const router = useRouter()
//   const [spaces, setSpaces] = useState<Space[]>([])
//   const [samples, setSamples] = useState<Sample[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [parentStack, setParentStack] = useState<Array<{ uid: string; name: string }>>([])
//   const [currentParentUid, setCurrentParentUid] = useState<string | null>(null)

//   // Modals
//   const [editModal, setEditModal] = useState(false)
//   const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
//   const [menuOpen, setMenuOpen] = useState<string | null>(null)
//   const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
//   const [sampleEditModal, setSampleEditModal] = useState(false)
//   const [selectedSample, setSelectedSample] = useState<Sample | null>(null)
//   const [sampleDeleteConfirmModal, setSampleDeleteConfirmModal] = useState(false)
//   const [sampleMenuOpen, setSampleMenuOpen] = useState<string | null>(null)

//   // Edit form
//   const [editFormData, setEditFormData] = useState({ name: "", description: "" })
//   const [editImage, setEditImage] = useState<File | null>(null)
//   const [editImagePreview, setEditImagePreview] = useState<string>("")
//   const [isSaving, setIsSaving] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)

//   useEffect(() => {
//     fetchSpacesAndSamples()
//   }, [currentParentUid])

//   const fetchSpacesAndSamples = async () => {
//     setIsLoading(true)
//     try {
//       const spacesUrl = currentParentUid
//         ? `/sample_manager/storage/?type=SPACE&parent_uid=${currentParentUid}`
//         : `/sample_manager/storage/?type=SPACE`

//       const spacesResponse = await apiCall(spacesUrl)
//       if (spacesResponse.ok) {
//         const spacesData = await spacesResponse.json()
//         setSpaces(Array.isArray(spacesData) ? spacesData : spacesData.results || [])
//       }

//       if (currentParentUid) {
//         const samplesResponse = await apiCall(`/sample_manager/sample/${currentParentUid}`)
//         if (samplesResponse.ok) {
//           const samplesData = await samplesResponse.json()
//           setSamples(Array.isArray(samplesData) ? samplesData : samplesData.results || [])
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err)
//       toast({
//         title: "Error",
//         description: "Failed to fetch spaces and samples",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSpaceCardClick = (space: Space) => {
//     setParentStack([...parentStack, { uid: space.uid, name: space.name }])
//     setCurrentParentUid(space.uid)
//   }

//   const handleBackClick = () => {
//     if (parentStack.length > 0) {
//       const newStack = parentStack.slice(0, -1)
//       setParentStack(newStack)
//       setCurrentParentUid(newStack.length > 0 ? newStack[newStack.length - 1].uid : null)
//     }
//   }

//   const handleEditClick = async (space: Space) => {
//     setSelectedSpace(space)
//     try {
//       const response = await apiCall(`/sample_manager/storage/${space.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setEditFormData({ name: data.name, description: data.description })
//         if (data.image) {
//           setEditImagePreview(data.image)
//         }
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load space details", variant: "destructive" })
//     }
//     setEditModal(true)
//     setMenuOpen(null)
//   }

//   const handleSaveEdit = async () => {
//     if (!selectedSpace || !editFormData.name) return
//     setIsSaving(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", editFormData.name)
//       formData.append("description", editFormData.description)
//       formData.append("type", "SPACE")
//       if (editImage) {
//         formData.append("image", editImage)
//       }
//       if (currentParentUid) {
//         formData.append("parent_uid", currentParentUid)
//       }

//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, {
//         method: "PUT",
//         body: formData,
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update space")
//       }

//       toast({ title: "Success", description: "Space updated successfully" })
//       setEditModal(false)
//       setEditImage(null)
//       setEditImagePreview("")
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update space", variant: "destructive" })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleDeleteClick = (space: Space) => {
//     setSelectedSpace(space)
//     setDeleteConfirmModal(true)
//     setMenuOpen(null)
//   }

//   const handleConfirmDelete = async () => {
//     if (!selectedSpace) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, { method: "DELETE" })

//       if (!response.ok) {
//         throw new Error("Failed to delete space")
//       }

//       toast({ title: "Success", description: "Space deleted successfully" })
//       setDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete space", variant: "destructive" })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setEditImage(file)
//       const reader = new FileReader()
//       reader.onload = (e) => setEditImagePreview(e.target?.result as string)
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSampleEditClick = (sample: Sample) => {
//     setSelectedSample(sample)
//     setSampleEditModal(true)
//     setSampleMenuOpen(null)
//   }

//   const handleSampleDeleteClick = (sample: Sample) => {
//     setSelectedSample(sample)
//     setSampleDeleteConfirmModal(true)
//     setSampleMenuOpen(null)
//   }

//   const handleConfirmSampleDelete = async () => {
//     if (!selectedSample || !currentParentUid) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete sample")
//       }

//       toast({ title: "Success", description: "Sample deleted successfully" })
//       setSampleDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete sample", variant: "destructive" })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const handleRemoveSpaceImage = () => {
//     setEditImage(null)
//     setEditImagePreview("")
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       {/* Header */}
//       <div className="mb-6 sm:mb-8 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           {parentStack.length > 0 && (
//             <button onClick={handleBackClick} className="p-2 hover:bg-muted rounded-lg transition">
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//           )}
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
//               {parentStack.length > 0 ? parentStack[parentStack.length - 1].name : "Storage Spaces"}
//             </h1>
//             <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage your storage spaces and samples</p>
//           </div>
//         </div>
//       </div>

//       {/* Add Buttons */}
//       <div className="flex gap-2 mb-6 sm:mb-8">
//         <Link href={`/space/add${currentParentUid ? `?parent_uid=${currentParentUid}` : ""}`}>
//           <Button className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
//             <Plus className="w-4 h-4" />
//             Add Space
//           </Button>
//         </Link>
//         {currentParentUid && (
//           <Link href={`/sample/add?storage_uid=${currentParentUid}`}>
//             <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent">
//               <Plus className="w-4 h-4" />
//               Add Sample
//             </Button>
//           </Link>
//         )}
//       </div>

//       {isLoading ? (
//         <div className="flex items-center justify-center py-12">
//           <Loader2 className="w-8 h-8 animate-spin text-primary" />
//         </div>
//       ) : (
//         <>
//           {/* Spaces Grid */}
//           {spaces.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Spaces</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
//                 {spaces.map((space) => (
//                   <Card
//                     key={space.uid}
//                     className="border-border hover:shadow-lg transition-all overflow-hidden cursor-pointer group"
//                   >
//                     <div className="relative h-48 bg-muted overflow-hidden" onClick={() => handleSpaceCardClick(space)}>
//                       {space.image ? (
//                         <img
//                           src={space.image || "/placeholder.svg"}
//                           alt={space.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                       {/* Folder Icon */}
//                       <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-lg">
//                         <FolderOpen className="w-5 h-5 text-white" />
//                       </div>
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{space.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {space.description || "No description"}
//                       </p>

//                       {/* Three Dots Menu */}
//                       <div className="relative mb-4">
//                         <button
//                           onClick={() => setMenuOpen(menuOpen === space.uid ? null : space.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-muted-foreground" />
//                         </button>
//                         {menuOpen === space.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
//                             <button
//                               onClick={() => handleEditClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       {/* Edit and Delete Buttons */}
//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleEditClick(space)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleDeleteClick(space)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Samples Grid */}
//           {samples.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Samples</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                 {samples.map((sample) => (
//                   <Card key={sample.uid} className="border-border hover:shadow-lg transition-all overflow-hidden">
//                     <div className="relative h-48 bg-muted overflow-hidden">
//                       {sample.image ? (
//                         <img
//                           src={sample.image || "/placeholder.svg"}
//                           alt={sample.name}
//                           className="w-full h-full object-cover hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                       <div className="absolute top-3 right-3">
//                         <button
//                           onClick={() => setSampleMenuOpen(sampleMenuOpen === sample.uid ? null : sample.uid)}
//                           className="p-2 hover:bg-black/50 rounded-full transition bg-black/30"
//                         >
//                           <MoreVertical className="w-4 h-4 text-white" />
//                         </button>
//                         {sampleMenuOpen === sample.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
//                             <button
//                               onClick={() => handleSampleEditClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleSampleDeleteClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{sample.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {sample.description || "No description"}
//                       </p>

//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleSampleEditClick(sample)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleSampleDeleteClick(sample)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {spaces.length === 0 && samples.length === 0 && (
//             <div className="text-center py-12">
//               <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//               <p className="text-muted-foreground">No spaces or samples found</p>
//             </div>
//           )}
//         </>
//       )}

//       {/* Edit Space Modal */}
//       {editModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Space - {selectedSpace.name}</CardTitle>
//               <button onClick={() => setEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 {/* Name */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Space Name</label>
//                   <input
//                     type="text"
//                     value={editFormData.name}
//                     onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                   <textarea
//                     value={editFormData.description}
//                     onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={3}
//                   />
//                 </div>

//                 {/* Image */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Image</label>
//                   {editImagePreview && (
//                     <div className="mb-3 relative">
//                       <img
//                         src={editImagePreview || "/placeholder.svg"}
//                         alt="Preview"
//                         className="w-full h-40 object-cover rounded-lg"
//                       />
//                       <button
//                         type="button"
//                         onClick={handleRemoveSpaceImage}
//                         className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 {/* Submit Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleSaveEdit}
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
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setEditModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Delete Space Confirmation Modal */}
//       {deleteConfirmModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Space</CardTitle>
//               <button onClick={() => setDeleteConfirmModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete space "{selectedSpace.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleConfirmDelete}
//                   disabled={isDeleting}
//                   className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
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

//       {/* Sample Edit Modal */}
//       {sampleEditModal && selectedSample && currentParentUid && (
//         <SampleEditModal
//           isOpen={sampleEditModal}
//           onClose={() => setSampleEditModal(false)}
//           sampleUid={selectedSample.uid}
//           storageUid={currentParentUid}
//           onSuccess={fetchSpacesAndSamples}
//         />
//       )}

//       {/* Delete Sample Confirmation Modal */}
//       {sampleDeleteConfirmModal && selectedSample && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Sample</CardTitle>
//               <button
//                 onClick={() => setSampleDeleteConfirmModal(false)}
//                 className="p-1 hover:bg-muted rounded flex-shrink-0"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete sample "{selectedSample.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleConfirmSampleDelete}
//                   disabled={isDeleting}
//                   className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
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
//                   onClick={() => setSampleDeleteConfirmModal(false)}
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
// import { Plus, Trash2, Edit2, FolderOpen, ChevronLeft, X, Loader2, MoreVertical } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { apiCall } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// interface Space {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   status: string
//   type: string
//   company: number
//   created_by: number
//   parent: string | null
// }

// interface SampleImage {
//   id: number
//   uid: string
//   file: string
//   file_name: string
// }

// interface SampleBuyer {
//   id: number
//   uid: string
//   name: string
// }

// interface SampleProject {
//   id: number
//   uid: string
//   name: string
// }

// interface SampleNote {
//   id: number
//   uid: string
//   title: string
// }

// interface Sample {
//   id: number
//   uid: string
//   name: string
//   description: string
//   style_no: string
//   sku_no: string
//   item: string
//   fabrication: string
//   weight: string
//   color: string
//   size: string
//   comments: string
//   arrival_date: string
//   images: SampleImage[]
//   buyers: SampleBuyer[]
//   projects: SampleProject[]
//   notes: SampleNote[]
// }

// export default function SpacePage() {
//   const { toast } = useToast()
//   const router = useRouter()
//   const [spaces, setSpaces] = useState<Space[]>([])
//   const [samples, setSamples] = useState<Sample[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [parentStack, setParentStack] = useState<Array<{ uid: string; name: string }>>([])
//   const [currentParentUid, setCurrentParentUid] = useState<string | null>(null)

//   // Modals
//   const [editModal, setEditModal] = useState(false)
//   const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
//   const [sampleEditModal, setSampleEditModal] = useState(false)
//   const [sampleDeleteConfirmModal, setSampleDeleteConfirmModal] = useState(false)
//   const [menuOpen, setMenuOpen] = useState<string | null>(null)
//   const [sampleMenuOpen, setSampleMenuOpen] = useState<string | null>(null)
//   const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
//   const [selectedSample, setSelectedSample] = useState<Sample | null>(null)

//   // Edit form
//   const [editFormData, setEditFormData] = useState({ name: "", description: "" })
//   const [editImage, setEditImage] = useState<File | null>(null)
//   const [editImagePreview, setEditImagePreview] = useState<string>("")
//   const [isSaving, setIsSaving] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)

//   // Sample edit form
//   const [sampleEditFormData, setSampleEditFormData] = useState({
//     name: "",
//     description: "",
//     style_no: "",
//     sku_no: "",
//     item: "",
//     fabrication: "",
//     weight: "",
//     color: "",
//     size: "",
//     comments: "",
//     arrival_date: "",
//   })
//   const [selectedSampleBuyers, setSelectedSampleBuyers] = useState<string[]>([])
//   const [selectedSampleProjects, setSelectedSampleProjects] = useState<string[]>([])
//   const [selectedSampleNotes, setSelectedSampleNotes] = useState<string[]>([])
//   const [buyers, setBuyers] = useState<SampleBuyer[]>([])
//   const [projects, setProjects] = useState<SampleProject[]>([])
//   const [notes, setNotes] = useState<SampleNote[]>([])
//   const [isSavingSample, setIsSavingSample] = useState(false)
//   const [isDeletingSample, setIsDeletingSample] = useState(false)

//   useEffect(() => {
//     fetchSpacesAndSamples()
//   }, [currentParentUid])

//   const fetchSpacesAndSamples = async () => {
//     setIsLoading(true)
//     try {
//       // Fetch spaces
//       const spacesUrl = currentParentUid
//         ? `/sample_manager/storage/?type=SPACE&parent_uid=${currentParentUid}`
//         : `/sample_manager/storage/?type=SPACE`

//       const spacesResponse = await apiCall(spacesUrl)
//       if (spacesResponse.ok) {
//         const spacesData = await spacesResponse.json()
//         setSpaces(Array.isArray(spacesData) ? spacesData : spacesData.results || [])
//       }

//       // Fetch samples if there's a current parent
//       if (currentParentUid) {
//         const samplesResponse = await apiCall(`/sample_manager/sample/${currentParentUid}`)
//         if (samplesResponse.ok) {
//           const samplesData = await samplesResponse.json()
//           setSamples(Array.isArray(samplesData) ? samplesData : samplesData.results || [])
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err)
//       toast({
//         title: "Error",
//         description: "Failed to fetch spaces and samples",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSpaceCardClick = (space: Space) => {
//     setParentStack([...parentStack, { uid: space.uid, name: space.name }])
//     setCurrentParentUid(space.uid)
//   }

//   const handleBackClick = () => {
//     if (parentStack.length > 0) {
//       const newStack = parentStack.slice(0, -1)
//       setParentStack(newStack)
//       setCurrentParentUid(newStack.length > 0 ? newStack[newStack.length - 1].uid : null)
//     }
//   }

//   const handleEditClick = async (space: Space) => {
//     setSelectedSpace(space)
//     try {
//       const response = await apiCall(`/sample_manager/storage/${space.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setEditFormData({ name: data.name, description: data.description })
//         if (data.image) {
//           setEditImagePreview(data.image)
//         }
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load space details", variant: "destructive" })
//     }
//     setEditModal(true)
//     setMenuOpen(null)
//   }

//   const handleSaveEdit = async () => {
//     if (!selectedSpace || !editFormData.name) return
//     setIsSaving(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", editFormData.name)
//       formData.append("description", editFormData.description)
//       formData.append("type", "SPACE")
//       if (editImage) {
//         formData.append("image", editImage)
//       }
//       if (currentParentUid) {
//         formData.append("parent_uid", currentParentUid)
//       }

//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, {
//         method: "PUT",
//         body: formData,
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update space")
//       }

//       toast({ title: "Success", description: "Space updated successfully" })
//       setEditModal(false)
//       setEditImage(null)
//       setEditImagePreview("")
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update space", variant: "destructive" })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleDeleteClick = (space: Space) => {
//     setSelectedSpace(space)
//     setDeleteConfirmModal(true)
//     setMenuOpen(null)
//   }

//   const handleConfirmDelete = async () => {
//     if (!selectedSpace) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, { method: "DELETE" })

//       if (!response.ok) {
//         throw new Error("Failed to delete space")
//       }

//       toast({ title: "Success", description: "Space deleted successfully" })
//       setDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete space", variant: "destructive" })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setEditImage(file)
//       const reader = new FileReader()
//       reader.onload = (e) => setEditImagePreview(e.target?.result as string)
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleEditSampleClick = async (sample: Sample) => {
//     setSelectedSample(sample)
//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${sample.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setSampleEditFormData({
//           name: data.name,
//           description: data.description,
//           style_no: data.style_no,
//           sku_no: data.sku_no,
//           item: data.item,
//           fabrication: data.fabrication,
//           weight: data.weight,
//           color: data.color,
//           size: data.size,
//           comments: data.comments,
//           arrival_date: data.arrival_date,
//         })
//         setSelectedSampleBuyers(data.buyers?.map((b: SampleBuyer) => b.uid) || [])
//         setSelectedSampleProjects(data.projects?.map((p: SampleProject) => p.uid) || [])
//         setSelectedSampleNotes(data.notes?.map((n: SampleNote) => n.uid) || [])

//         // Fetch buyers, projects, and notes for the modal
//         const buyersResp = await apiCall("/sample_manager/buyer/")
//         if (buyersResp.ok) {
//           const buyersData = await buyersResp.json()
//           setBuyers(Array.isArray(buyersData) ? buyersData : buyersData.results || [])
//         }

//         const projectsResp = await apiCall("/sample_manager/project/")
//         if (projectsResp.ok) {
//           const projectsData = await projectsResp.json()
//           setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
//         }

//         const notesResp = await apiCall("/sample_manager/note/")
//         if (notesResp.ok) {
//           const notesData = await notesResp.json()
//           setNotes(Array.isArray(notesData) ? notesData : notesData.results || [])
//         }
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
//     }
//     setSampleEditModal(true)
//     setSampleMenuOpen(null)
//   }

//   const handleSaveSampleEdit = async () => {
//     if (!selectedSample || !currentParentUid || !sampleEditFormData.name) return
//     setIsSavingSample(true)

//     try {
//       const submitData = {
//         ...sampleEditFormData,
        
//         buyer_uids: selectedSampleBuyers,
//         project_uids: selectedSampleProjects,
//         note_uids: selectedSampleNotes,
//         image_uids: selectedSample.images.map((img) => img.uid),
//       }

//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//         method: "PUT",
//         body: JSON.stringify(submitData),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update sample")
//       }

//       toast({ title: "Success", description: "Sample updated successfully" })
//       setSampleEditModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update sample", variant: "destructive" })
//     } finally {
//       setIsSavingSample(false)
//     }
//   }

//   const handleDeleteSampleClick = (sample: Sample) => {
//     setSelectedSample(sample)
//     setSampleDeleteConfirmModal(true)
//     setSampleMenuOpen(null)
//   }

//   const handleConfirmDeleteSample = async () => {
//     if (!selectedSample || !currentParentUid) return
//     setIsDeletingSample(true)

//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete sample")
//       }

//       toast({ title: "Success", description: "Sample deleted successfully" })
//       setSampleDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete sample", variant: "destructive" })
//     } finally {
//       setIsDeletingSample(false)
//     }
//   }

//   const handleSampleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setSampleEditFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSampleBuyerToggle = (buyerUid: string) => {
//     setSelectedSampleBuyers((prev) =>
//       prev.includes(buyerUid) ? prev.filter((uid) => uid !== buyerUid) : [...prev, buyerUid],
//     )
//   }

//   const handleSampleProjectToggle = (projectUid: string) => {
//     setSelectedSampleProjects((prev) =>
//       prev.includes(projectUid) ? prev.filter((uid) => uid !== projectUid) : [...prev, projectUid],
//     )
//   }

//   const handleSampleNoteToggle = (noteUid: string) => {
//     setSelectedSampleNotes((prev) =>
//       prev.includes(noteUid) ? prev.filter((uid) => uid !== noteUid) : [...prev, noteUid],
//     )
//   }

//   const getBreadcrumbText = () => {
//     if (parentStack.length === 0) return "Storage Spaces"
//     return parentStack.map((item) => item.name).join(" > ")
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       {/* Header */}
//       <div className="mb-6 sm:mb-8 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           {parentStack.length > 0 && (
//             <button onClick={handleBackClick} className="p-2 hover:bg-muted rounded-lg transition">
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//           )}
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
//               {parentStack.length > 0 ? parentStack[parentStack.length - 1].name : "Storage Spaces"}
//             </h1>
//             <p className="text-sm sm:text-base text-muted-foreground mt-2">
//               {parentStack.length > 0
//                 ? "Manage spaces and samples in this location"
//                 : "Manage your storage spaces and samples"}
//             </p>
//             {parentStack.length > 1 && (
//               <p className="text-xs text-muted-foreground mt-1">
//                 Path: {parentStack.map((item) => item.name).join(" > ")}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Add Buttons */}
//       <div className="flex gap-2 mb-6 sm:mb-8">
//         <Link href={`/space/add${currentParentUid ? `?parent_uid=${currentParentUid}` : ""}`}>
//           <Button className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
//             <Plus className="w-4 h-4" />
//             Add Space
//           </Button>
//         </Link>
//         {currentParentUid && (
//           <Link href={`/sample/add?storage_uid=${currentParentUid}`}>
//             <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent">
//               <Plus className="w-4 h-4" />
//               Add Sample
//             </Button>
//           </Link>
//         )}
//       </div>

//       {isLoading ? (
//         <div className="flex items-center justify-center py-12">
//           <Loader2 className="w-8 h-8 animate-spin text-primary" />
//         </div>
//       ) : (
//         <>
//           {/* Spaces Grid */}
//           {spaces.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Spaces</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
//                 {spaces.map((space) => (
//                   <Card
//                     key={space.uid}
//                     className="border-border hover:shadow-lg transition-all overflow-hidden cursor-pointer group"
//                   >
//                     <div className="relative h-48 bg-muted overflow-hidden" onClick={() => handleSpaceCardClick(space)}>
//                       {space.image ? (
//                         <img
//                           src={space.image || "/placeholder.svg"}
//                           alt={space.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                       <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-lg">
//                         <FolderOpen className="w-5 h-5 text-white" />
//                       </div>
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{space.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {space.description || "No description"}
//                       </p>

//                       <div className="relative mb-4">
//                         <button
//                           onClick={() => setMenuOpen(menuOpen === space.uid ? null : space.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-muted-foreground" />
//                         </button>
//                         {menuOpen === space.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
//                             <button
//                               onClick={() => handleEditClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleEditClick(space)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleDeleteClick(space)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Samples Grid */}
//           {samples.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Samples</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                 {samples.map((sample) => (
//                   <Card key={sample.uid} className="border-border hover:shadow-lg transition-all overflow-hidden">
//                     <div className="relative h-48 bg-muted overflow-hidden group cursor-pointer">
//                       {sample.images && sample.images.length > 0 ? (
//                         <img
//                           src={sample.images[0].file || "/placeholder.svg"}
//                           alt={sample.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                       <div className="absolute top-3 right-3 z-10">
//                         <button
//                           onClick={() => setSampleMenuOpen(sampleMenuOpen === sample.uid ? null : sample.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-white bg-black/50 rounded-full p-1 w-6 h-6" />
//                         </button>
//                         {sampleMenuOpen === sample.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-20">
//                             <button
//                               onClick={() => handleEditSampleClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteSampleClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{sample.name}</CardTitle>
//                       <p className="text-xs text-muted-foreground">{sample.style_no && `Style: ${sample.style_no}`}</p>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {sample.description || "No description"}
//                       </p>

//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleEditSampleClick(sample)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleDeleteSampleClick(sample)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {spaces.length === 0 && samples.length === 0 && (
//             <div className="text-center py-12">
//               <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//               <p className="text-muted-foreground">No spaces or samples found</p>
//             </div>
//           )}
//         </>
//       )}

//       {/* Edit Space Modal */}
//       {editModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Space - {selectedSpace.name}</CardTitle>
//               <button onClick={() => setEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Space Name</label>
//                   <input
//                     type="text"
//                     value={editFormData.name}
//                     onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                   <textarea
//                     value={editFormData.description}
//                     onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={3}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Image</label>
//                   {editImagePreview && (
//                     <div className="mb-3 relative">
//                       <img
//                         src={editImagePreview || "/placeholder.svg"}
//                         alt="Preview"
//                         className="w-full h-40 object-cover rounded-lg"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setEditImagePreview("")
//                           setEditImage(null)
//                         }}
//                         className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleSaveEdit}
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
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setEditModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Delete Space Confirmation Modal */}
//       {deleteConfirmModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Space</CardTitle>
//               <button onClick={() => setDeleteConfirmModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete space "{selectedSpace.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleConfirmDelete}
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

//       {sampleEditModal && selectedSample && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Sample - {selectedSample.name}</CardTitle>
//               <button onClick={() => setSampleEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Sample Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={sampleEditFormData.name}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Style Number</label>
//                     <input
//                       type="text"
//                       name="style_no"
//                       value={sampleEditFormData.style_no}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">SKU Number</label>
//                     <input
//                       type="text"
//                       name="sku_no"
//                       value={sampleEditFormData.sku_no}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Item</label>
//                     <input
//                       type="text"
//                       name="item"
//                       value={sampleEditFormData.item}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Color</label>
//                     <input
//                       type="text"
//                       name="color"
//                       value={sampleEditFormData.color}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Size</label>
//                     <input
//                       type="text"
//                       name="size"
//                       value={sampleEditFormData.size}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Fabrication</label>
//                     <input
//                       type="text"
//                       name="fabrication"
//                       value={sampleEditFormData.fabrication}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Weight</label>
//                     <input
//                       type="text"
//                       name="weight"
//                       value={sampleEditFormData.weight}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                   <textarea
//                     name="description"
//                     value={sampleEditFormData.description}
//                     onChange={handleSampleFormChange}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={2}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Comments</label>
//                   <textarea
//                     name="comments"
//                     value={sampleEditFormData.comments}
//                     onChange={handleSampleFormChange}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={2}
//                   />
//                 </div>

//                 {buyers.length > 0 && (
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Buyers</label>
//                     <div className="space-y-2 border border-border rounded-lg p-3 bg-card max-h-32 overflow-y-auto">
//                       {buyers.map((buyer) => (
//                         <label key={buyer.uid} className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={selectedSampleBuyers.includes(buyer.uid)}
//                             onChange={() => handleSampleBuyerToggle(buyer.uid)}
//                             className="w-4 h-4 rounded border-border"
//                           />
//                           <span className="text-sm text-foreground">{buyer.name}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {projects.length > 0 && (
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Projects</label>
//                     <div className="space-y-2 border border-border rounded-lg p-3 bg-card max-h-32 overflow-y-auto">
//                       {projects.map((project) => (
//                         <label key={project.uid} className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={selectedSampleProjects.includes(project.uid)}
//                             onChange={() => handleSampleProjectToggle(project.uid)}
//                             className="w-4 h-4 rounded border-border"
//                           />
//                           <span className="text-sm text-foreground">{project.name}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {notes.length > 0 && (
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Notes</label>
//                     <div className="space-y-2 border border-border rounded-lg p-3 bg-card max-h-32 overflow-y-auto">
//                       {notes.map((note) => (
//                         <label key={note.uid} className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={selectedSampleNotes.includes(note.uid)}
//                             onChange={() => handleSampleNoteToggle(note.uid)}
//                             className="w-4 h-4 rounded border-border"
//                           />
//                           <span className="text-sm text-foreground">{note.title}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {selectedSample.images.length > 0 && (
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">
//                       Images ({selectedSample.images.length})
//                     </label>
//                     <div className="grid grid-cols-3 gap-3">
//                       {selectedSample.images.map((img) => (
//                         <img
//                           key={img.uid}
//                           src={img.file || "/placeholder.svg"}
//                           alt={img.file_name}
//                           className="w-full h-20 object-cover rounded-lg border border-border"
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleSaveSampleEdit}
//                     disabled={isSavingSample}
//                     className="flex-1 bg-primary hover:bg-primary/90 text-white"
//                   >
//                     {isSavingSample ? (
//                       <>
//                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                         Updating...
//                       </>
//                     ) : (
//                       "Update"
//                     )}
//                   </Button>
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setSampleEditModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {sampleDeleteConfirmModal && selectedSample && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Sample</CardTitle>
//               <button
//                 onClick={() => setSampleDeleteConfirmModal(false)}
//                 className="p-1 hover:bg-muted rounded flex-shrink-0"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete sample "{selectedSample.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleConfirmDeleteSample}
//                   disabled={isDeletingSample}
//                   className="flex-1 bg-red-600 hover:bg-red-700 text-white"
//                 >
//                   {isDeletingSample ? (
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
//                   onClick={() => setSampleDeleteConfirmModal(false)}
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
// import { Plus, Trash2, Edit2, FolderOpen, ChevronLeft, X, Loader2, MoreVertical } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { apiCall } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useRouter, useSearchParams } from "next/navigation"
// import SampleDetailsModal from "./sample-details-modal"
// import SampleForm from "./sample-form"

// interface Space {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   status: string
//   type: string
//   company: number
//   created_by: number
//   parent: string | null
// }

// interface Sample {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   storage_uid: string
// }

// export default function SpacePage() {
//   const { toast } = useToast()
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const [spaces, setSpaces] = useState<Space[]>([])
//   const [samples, setSamples] = useState<Sample[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [parentStack, setParentStack] = useState<Array<{ uid: string; name: string }>>([])
//   const [currentParentUid, setCurrentParentUid] = useState<string | null>(null)

//   // Modals
//   const [editModal, setEditModal] = useState(false)
//   const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
//   const [menuOpen, setMenuOpen] = useState<string | null>(null)
//   const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
//   const [sampleDetailsModal, setSampleDetailsModal] = useState(false)
//   const [selectedSample, setSelectedSample] = useState<any>(null)
//   const [deleteConfirmSampleModal, setDeleteConfirmSampleModal] = useState(false)
//   const [sampleMenuOpen, setSampleMenuOpen] = useState<string | null>(null)
//   const [editSampleModal, setEditSampleModal] = useState(false)

//   // Edit form
//   const [editFormData, setEditFormData] = useState({ name: "", description: "" })
//   const [editImage, setEditImage] = useState<File | null>(null)
//   const [editImagePreview, setEditImagePreview] = useState<string>("")
//   const [isSaving, setIsSaving] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)

//   useEffect(() => {
//     const focus = searchParams.get("focus")
//     if (focus) {
//       setCurrentParentUid(focus)
//     }
//     fetchSpacesAndSamples()
//   }, [currentParentUid])

//   const fetchSpacesAndSamples = async () => {
//     setIsLoading(true)
//     try {
//       const spacesUrl = currentParentUid
//         ? `/sample_manager/storage/?type=SPACE&parent_uid=${currentParentUid}`
//         : `/sample_manager/storage/?type=SPACE`

//       const spacesResponse = await apiCall(spacesUrl)
//       if (spacesResponse.ok) {
//         const spacesData = await spacesResponse.json()
//         setSpaces(Array.isArray(spacesData) ? spacesData : spacesData.results || [])
//       }

//       if (currentParentUid) {
//         const samplesResponse = await apiCall(`/sample_manager/sample/${currentParentUid}`)
//         if (samplesResponse.ok) {
//           const samplesData = await samplesResponse.json()
//           setSamples(Array.isArray(samplesData) ? samplesData : samplesData.results || [])
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err)
//       toast({
//         title: "Error",
//         description: "Failed to fetch spaces and samples",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSpaceCardClick = (space: Space) => {
//     setParentStack([...parentStack, { uid: space.uid, name: space.name }])
//     setCurrentParentUid(space.uid)
//   }

//   const handleBackClick = () => {
//     if (parentStack.length > 0) {
//       const newStack = parentStack.slice(0, -1)
//       setParentStack(newStack)
//       setCurrentParentUid(newStack.length > 0 ? newStack[newStack.length - 1].uid : null)
//     }
//   }

//   const handleEditClick = async (space: Space) => {
//     setSelectedSpace(space)
//     try {
//       const response = await apiCall(`/sample_manager/storage/${space.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setEditFormData({ name: data.name, description: data.description })
//         if (data.image) {
//           setEditImagePreview(data.image)
//         }
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load space details", variant: "destructive" })
//     }
//     setEditModal(true)
//     setMenuOpen(null)
//   }

//   const handleSaveEdit = async () => {
//     if (!selectedSpace || !editFormData.name) return
//     setIsSaving(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", editFormData.name)
//       formData.append("description", editFormData.description)
//       formData.append("type", "SPACE")
//       if (editImage) {
//         formData.append("image", editImage)
//       }
//       if (currentParentUid) {
//         formData.append("parent_uid", currentParentUid)
//       }

//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, {
//         method: "PUT",
//         body: formData,
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update space")
//       }

//       toast({ title: "Success", description: "Space updated successfully" })
//       setEditModal(false)
//       setEditImage(null)
//       setEditImagePreview("")
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update space", variant: "destructive" })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleDeleteClick = (space: Space) => {
//     setSelectedSpace(space)
//     setDeleteConfirmModal(true)
//     setMenuOpen(null)
//   }

//   const handleConfirmDelete = async () => {
//     if (!selectedSpace) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, { method: "DELETE" })

//       if (!response.ok) {
//         throw new Error("Failed to delete space")
//       }

//       toast({ title: "Success", description: "Space deleted successfully" })
//       setDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete space", variant: "destructive" })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setEditImage(file)
//       const reader = new FileReader()
//       reader.onload = (e) => setEditImagePreview(e.target?.result as string)
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSampleDetailsClick = async (sample: Sample) => {
//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${sample.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setSelectedSample(data)
//         setSampleDetailsModal(true)
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
//     }
//   }

//   const handleEditSampleClick = async (sample: Sample) => {
//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${sample.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setSelectedSample(data)
//         setEditSampleModal(true)
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load sample", variant: "destructive" })
//     }
//     setSampleMenuOpen(null)
//   }

//   const handleDeleteSampleClick = (sample: Sample) => {
//     setSelectedSample(sample)
//     setDeleteConfirmSampleModal(true)
//     setSampleMenuOpen(null)
//   }

//   const handleConfirmDeleteSample = async () => {
//     if (!selectedSample || !currentParentUid) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete sample")
//       }

//       toast({ title: "Success", description: "Sample deleted successfully" })
//       setDeleteConfirmSampleModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete sample", variant: "destructive" })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       {/* Header */}
//       <div className="mb-6 sm:mb-8 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           {parentStack.length > 0 && (
//             <button onClick={handleBackClick} className="p-2 hover:bg-muted rounded-lg transition">
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//           )}
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
//               {parentStack.length > 0 ? parentStack[parentStack.length - 1].name : "Storage Spaces"}
//             </h1>
//             <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage your storage spaces and samples</p>
//           </div>
//         </div>
//       </div>

//       {/* Add Buttons */}
//       <div className="flex gap-2 mb-6 sm:mb-8">
//         <Link href={`/space/add${currentParentUid ? `?parent_uid=${currentParentUid}` : ""}`}>
//           <Button className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
//             <Plus className="w-4 h-4" />
//             Add Space
//           </Button>
//         </Link>
//         {currentParentUid && (
//           <Link href={`/sample/add?storage_uid=${currentParentUid}`}>
//             <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent">
//               <Plus className="w-4 h-4" />
//               Add Sample
//             </Button>
//           </Link>
//         )}
//       </div>

//       {isLoading ? (
//         <div className="flex items-center justify-center py-12">
//           <Loader2 className="w-8 h-8 animate-spin text-primary" />
//         </div>
//       ) : (
//         <>
//           {/* Spaces Grid */}
//           {spaces.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Spaces</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
//                 {spaces.map((space) => (
//                   <Card
//                     key={space.uid}
//                     className="border-border hover:shadow-lg transition-all overflow-hidden cursor-pointer group"
//                   >
//                     <div className="relative h-48 bg-muted overflow-hidden" onClick={() => handleSpaceCardClick(space)}>
//                       {space.image ? (
//                         <img
//                           src={space.image || "/placeholder.svg"}
//                           alt={space.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                       {/* Folder Icon */}
//                       <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-lg">
//                         <FolderOpen className="w-5 h-5 text-white" />
//                       </div>
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{space.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {space.description || "No description"}
//                       </p>

//                       {/* Three Dots Menu */}
//                       <div className="relative mb-4">
//                         <button
//                           onClick={() => setMenuOpen(menuOpen === space.uid ? null : space.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-muted-foreground" />
//                         </button>
//                         {menuOpen === space.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
//                             <button
//                               onClick={() => handleEditClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       {/* Edit and Delete Buttons */}
//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleEditClick(space)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleDeleteClick(space)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {samples.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Samples</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                 {samples.map((sample) => (
//                   <Card key={sample.uid} className="border-border hover:shadow-lg transition-all overflow-hidden">
//                     <div
//                       className="relative h-48 bg-muted overflow-hidden cursor-pointer"
//                       onClick={() => handleSampleDetailsClick(sample)}
//                     >
//                       {sample.image ? (
//                         <img
//                           src={sample.image || "/placeholder.svg"}
//                           alt={sample.name}
//                           className="w-full h-full object-cover hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{sample.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {sample.description || "No description"}
//                       </p>

//                       {/* Three Dots Menu */}
//                       <div className="relative mb-4">
//                         <button
//                           onClick={() => setSampleMenuOpen(sampleMenuOpen === sample.uid ? null : sample.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-muted-foreground" />
//                         </button>
//                         {sampleMenuOpen === sample.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
//                             <button
//                               onClick={() => handleEditSampleClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteSampleClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleEditSampleClick(sample)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleDeleteSampleClick(sample)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {spaces.length === 0 && samples.length === 0 && (
//             <div className="text-center py-12">
//               <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//               <p className="text-muted-foreground">No spaces or samples found</p>
//             </div>
//           )}
//         </>
//       )}

//       {/* Edit Modal */}
//       {editModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Space - {selectedSpace.name}</CardTitle>
//               <button onClick={() => setEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 {/* Name */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Space Name</label>
//                   <input
//                     type="text"
//                     value={editFormData.name}
//                     onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                   <textarea
//                     value={editFormData.description}
//                     onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={3}
//                   />
//                 </div>

//                 {/* Image */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Image</label>
//                   {editImagePreview && (
//                     <div className="mb-3 relative">
//                       <img
//                         src={editImagePreview || "/placeholder.svg"}
//                         alt="Preview"
//                         className="w-full h-40 object-cover rounded-lg"
//                       />
//                       <button
//                         onClick={() => {
//                           setEditImagePreview("")
//                           setEditImage(null)
//                         }}
//                         className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 {/* Submit Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleSaveEdit}
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
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setEditModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {deleteConfirmModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Space</CardTitle>
//               <button onClick={() => setDeleteConfirmModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete space "{selectedSpace.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleConfirmDelete}
//                   disabled={isDeleting}
//                   className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
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

//       <SampleDetailsModal
//         isOpen={sampleDetailsModal}
//         onClose={() => setSampleDetailsModal(false)}
//         sample={selectedSample}
//       />

//       {editSampleModal && selectedSample && currentParentUid && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
//           <div className="py-6">
//             <Card className="w-full max-w-4xl border-border max-h-[90vh] overflow-y-auto">
//               <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//                 <CardTitle className="text-lg sm:text-xl">Edit Sample - {selectedSample.name}</CardTitle>
//                 <button onClick={() => setEditSampleModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                   <X className="w-5 h-5" />
//                 </button>
//               </CardHeader>
//               <CardContent className="pt-6">
//                 <SampleForm
//                   storageUid={currentParentUid}
//                   buyers={[]}
//                   notes={[]}
//                   projects={[]}
//                   sampleData={selectedSample}
//                   isEditMode={true}
//                   onSuccess={() => {
//                     setEditSampleModal(false)
//                     fetchSpacesAndSamples()
//                   }}
//                 />
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       )}

//       {deleteConfirmSampleModal && selectedSample && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Sample</CardTitle>
//               <button
//                 onClick={() => setDeleteConfirmSampleModal(false)}
//                 className="p-1 hover:bg-muted rounded flex-shrink-0"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete sample "{selectedSample.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleConfirmDeleteSample}
//                   disabled={isDeleting}
//                   className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
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
//                   onClick={() => setDeleteConfirmSampleModal(false)}
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
// import { ChevronLeft, Plus, MoreVertical, Edit, Trash2, X, Loader2 } from "lucide-react"
// import Link from "next/link"
// import { useToast } from "@/hooks/use-toast"
// import { apiCall } from "@/lib/auth-utils"
// import SampleDetailsModal from "./sample-details-modal"
// import SampleEditModal from "./sample-edit-modal"

// interface Space {
//   uid: string
//   name: string
//   description?: string
//   image?: string
// }

// interface Sample {
//   uid: string
//   name: string
//   storage_id: number
//   style_no: string
//   sku_no: string
//   item: string
//   color: string
//   size: string
//   types: string
//   arrival_date?: string
//   images?: Array<{ uid: string; file: string; file_name: string }>
// }

// interface EditFormData {
//   name: string
//   description: string
// }

// export default function SpaceComponent() {
//   const { toast } = useToast()

//   const [spaces, setSpaces] = useState<Space[]>([])
//   const [samples, setSamples] = useState<Sample[]>([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [menuOpen, setMenuOpen] = useState<string | null>(null)
//   const [selectedSample, setSelectedSample] = useState<Sample | null>(null)
//   const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)
//   const [isSaving, setIsSaving] = useState(false)

//   const [parentStack, setParentStack] = useState<Array<{ uid: string; name: string }>>([])
//   const [currentParentUid, setCurrentParentUid] = useState<string | null>(null)

//   // Edit modal states
//   const [editModal, setEditModal] = useState(false)
//   const [editFormData, setEditFormData] = useState<EditFormData>({ name: "", description: "" })
//   const [editImage, setEditImage] = useState<File | null>(null)
//   const [editImagePreview, setEditImagePreview] = useState("")

//   // Sample details modal states
//   const [showSampleDetails, setShowSampleDetails] = useState(false)

//   const [showSampleEditModal, setShowSampleEditModal] = useState(false)
//   const [selectedSampleForEdit, setSelectedSampleForEdit] = useState<Sample | null>(null)

//   useEffect(() => {
//     fetchSpacesAndSamples()
//   }, [currentParentUid])

//   const fetchSpacesAndSamples = async () => {
//     setIsLoading(true)
//     try {
//       let spacesUrl = "/sample_manager/storage/?type=SPACE"
//       if (currentParentUid) {
//         spacesUrl = `${spacesUrl}&parent_uid=${currentParentUid}`
//       }

//       const spacesResponse = await apiCall(spacesUrl)
//       if (spacesResponse.ok) {
//         const spacesData = await spacesResponse.json()
//         setSpaces(Array.isArray(spacesData) ? spacesData : spacesData.results || [])
//       }

//       const samplesUrl = currentParentUid ? `/sample_manager/sample/${currentParentUid}` : ""
//       if (samplesUrl) {
//         const samplesResponse = await apiCall(samplesUrl)
//         if (samplesResponse.ok) {
//           const samplesData = await samplesResponse.json()
//           setSamples(Array.isArray(samplesData) ? samplesData : samplesData.results || [])
//         }
//       } else {
//         setSamples([])
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err)
//       toast({
//         title: "Error",
//         description: "Failed to fetch data",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSpaceCardClick = (space: Space) => {
//     setParentStack([...parentStack, { uid: space.uid, name: space.name }])
//     setCurrentParentUid(space.uid)
//   }

//   const handleBackClick = () => {
//     if (parentStack.length > 0) {
//       const newStack = parentStack.slice(0, -1)
//       setParentStack(newStack)
//       setCurrentParentUid(newStack.length > 0 ? newStack[newStack.length - 1].uid : null)
//     }
//   }

//   const handleEditSpace = (space: Space) => {
//     setSelectedSpace(space)
//     try {
//       apiCall(`/sample_manager/storage/${space.uid}`).then((response) => {
//         if (response.ok) {
//           response.json().then((data) => {
//             setEditFormData({ name: data.name, description: data.description })
//             if (data.image) {
//               setEditImagePreview(data.image)
//             }
//           })
//         }
//       })
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load space details", variant: "destructive" })
//     }
//     setEditModal(true)
//     setMenuOpen(null)
//   }

//   const handleSaveEdit = async () => {
//     if (!selectedSpace || !editFormData.name) return
//     setIsSaving(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", editFormData.name)
//       formData.append("description", editFormData.description)
//       formData.append("type", "SPACE")
//       if (editImage) {
//         formData.append("image", editImage)
//       }
//       if (currentParentUid) {
//         formData.append("parent_uid", currentParentUid)
//       }

//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, {
//         method: "PUT",
//         body: formData,
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update space")
//       }

//       toast({ title: "Success", description: "Space updated successfully" })
//       setEditModal(false)
//       setEditImage(null)
//       setEditImagePreview("")
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update space", variant: "destructive" })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleDeleteClick = (space: Space) => {
//     setSelectedSpace(space)
//     setShowDeleteConfirm(true)
//     setMenuOpen(null)
//   }

//   const handleDeleteConfirm = async () => {
//     if (!selectedSpace) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete space")
//       }

//       toast({ title: "Success", description: "Space deleted successfully" })
//       setShowDeleteConfirm(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete space", variant: "destructive" })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const handleEditSample = (sample: Sample) => {
//     setSelectedSampleForEdit(sample)
//     setShowSampleEditModal(true)
//     setMenuOpen(null)
//   }

//   const handleDeleteSample = async (sample: Sample) => {
//     if (!currentParentUid) return

//     setIsDeleting(true)
//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${sample.uid}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete sample")
//       }

//       toast({ title: "Success", description: "Sample deleted successfully" })
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete sample", variant: "destructive" })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setEditImage(file)
//       const reader = new FileReader()
//       reader.onload = (e) => setEditImagePreview(e.target?.result as string)
//       reader.readAsDataURL(file)
//     }
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="mb-6 sm:mb-8 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           {parentStack.length > 0 && (
//             <button onClick={handleBackClick} className="p-2 hover:bg-muted rounded-lg transition">
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//           )}
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
//               {parentStack.length > 0 ? parentStack[parentStack.length - 1].name : "Storage Spaces"}
//             </h1>
//             {parentStack.length > 1 && (
//               <p className="text-sm sm:text-base text-muted-foreground mt-1">
//                 From:{" "}
//                 {parentStack
//                   .slice(0, -1)
//                   .map((s) => s.name)
//                   .join(" > ")}
//               </p>
//             )}
//             {parentStack.length === 0 && (
//               <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage your storage spaces and samples</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Add Buttons */}
//       <div className="flex gap-2 mb-6 sm:mb-8 flex-wrap">
//         <Link href={`/space/add${currentParentUid ? `?parent_uid=${currentParentUid}` : ""}`}>
//           <Button className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
//             <Plus className="w-4 h-4" />
//             Add Space
//           </Button>
//         </Link>
//         {currentParentUid && (
//           <Link href={`/sample/add?storage_uid=${currentParentUid}`}>
//             <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent">
//               <Plus className="w-4 h-4" />
//               Add Sample
//             </Button>
//           </Link>
//         )}
//       </div>

//       {/* Loading State */}
//       {isLoading && (
//         <div className="flex items-center justify-center py-12">
//           <Loader2 className="w-8 h-8 animate-spin text-primary" />
//         </div>
//       )}

//       {!isLoading && (
//         <>
//           {/* Spaces Grid */}
//           {spaces.length > 0 && (
//             <>
//               <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Spaces</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//                 {spaces.map((space) => (
//                   <Card
//                     key={space.uid}
//                     className="border-border hover:shadow-md transition cursor-pointer group"
//                     onClick={() => handleSpaceCardClick(space)}
//                   >
//                     <CardContent className="p-4 sm:p-6">
//                       <div className="flex items-start justify-between mb-3">
//                         <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition flex-1">
//                           {space.name}
//                         </h3>
//                         <div className="relative" onClick={(e) => e.stopPropagation()}>
//                           <button
//                             onClick={() => setMenuOpen(menuOpen === space.uid ? null : space.uid)}
//                             className="p-1 hover:bg-muted rounded-lg transition"
//                           >
//                             <MoreVertical className="w-4 h-4" />
//                           </button>
//                           {menuOpen === space.uid && (
//                             <div className="absolute top-8 right-0 bg-card border border-border rounded-lg shadow-lg z-10 w-32">
//                               <button
//                                 onClick={() => handleEditSpace(space)}
//                                 className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                               >
//                                 <Edit className="w-4 h-4" />
//                                 Edit
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteClick(space)}
//                                 className="w-full text-left px-4 py-2 text-sm hover:bg-muted text-red-600 flex items-center gap-2"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                                 Delete
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       {space.description && (
//                         <p className="text-sm text-muted-foreground line-clamp-2">{space.description}</p>
//                       )}
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </>
//           )}

//           {/* Samples Grid */}
//           {samples.length > 0 && (
//             <>
//               <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Samples</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {samples.map((sample) => (
//                   <Card key={sample.uid} className="border-border overflow-hidden hover:shadow-md transition">
//                     {sample.images && sample.images.length > 0 && (
//                       <div className="relative h-40 sm:h-48 overflow-hidden">
//                         <img
//                           src={sample.images[0].file || "/placeholder.svg"}
//                           alt={sample.images[0].file_name}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     )}
//                     <CardContent className="p-4 sm:p-6">
//                       <div className="flex items-start justify-between mb-2">
//                         <div>
//                           <h3 className="text-base sm:text-lg font-semibold text-foreground">{sample.name}</h3>
//                           <p className="text-xs sm:text-sm text-muted-foreground">Style: {sample.style_no}</p>
//                         </div>
//                         <div className="relative">
//                           <button
//                             onClick={() => setMenuOpen(menuOpen === sample.uid ? null : sample.uid)}
//                             className="p-1 hover:bg-muted rounded-lg transition flex-shrink-0"
//                           >
//                             <MoreVertical className="w-4 h-4" />
//                           </button>
//                           {menuOpen === sample.uid && (
//                             <div className="absolute top-8 right-0 bg-card border border-border rounded-lg shadow-lg z-10 w-32">
//                               <button
//                                 onClick={() => {
//                                   setSelectedSample(sample)
//                                   setShowSampleDetails(true)
//                                   setMenuOpen(null)
//                                 }}
//                                 className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                               >
//                                 View Details
//                               </button>
//                               <button
//                                 onClick={() => handleEditSample(sample)}
//                                 className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                               >
//                                 <Edit className="w-4 h-4" />
//                                 Edit
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteSample(sample)}
//                                 className="w-full text-left px-4 py-2 text-sm hover:bg-muted text-red-600 flex items-center gap-2"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                                 Delete
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       <div className="space-y-1 text-xs">
//                         <p className="text-muted-foreground">SKU: {sample.sku_no}</p>
//                         <p className="text-muted-foreground">Item: {sample.item}</p>
//                         <p className="text-muted-foreground">Color: {sample.color}</p>
//                         <p className="text-muted-foreground">Size: {sample.size}</p>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </>
//           )}

//           {/* Empty State */}
//           {spaces.length === 0 && samples.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-muted-foreground mb-4">
//                 {currentParentUid
//                   ? "No spaces or samples found in this location."
//                   : "No storage spaces found. Create one to get started."}
//               </p>
//             </div>
//           )}
//         </>
//       )}

//       {/* Sample Details Modal */}
//       {selectedSample && (
//         <SampleDetailsModal
//           isOpen={showSampleDetails}
//           onClose={() => setShowSampleDetails(false)}
//           sample={selectedSample}
//         />
//       )}

//       {selectedSampleForEdit && currentParentUid && (
//         <SampleEditModal
//           isOpen={showSampleEditModal}
//           onClose={() => {
//             setShowSampleEditModal(false)
//             setSelectedSampleForEdit(null)
//           }}
//           sample={selectedSampleForEdit}
//           storageUid={currentParentUid}
//           onSuccess={fetchSpacesAndSamples}
//         />
//       )}

//       {editModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Space - {selectedSpace.name}</CardTitle>
//               <button onClick={() => setEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 {/* Name */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Space Name</label>
//                   <input
//                     type="text"
//                     value={editFormData.name}
//                     onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                   <textarea
//                     value={editFormData.description}
//                     onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={3}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Image</label>
//                   {editImagePreview && (
//                     <div className="mb-3 relative">
//                       <img
//                         src={editImagePreview || "/placeholder.svg"}
//                         alt="Preview"
//                         className="w-full h-40 object-cover rounded-lg border border-border"
//                       />
//                       <button
//                         onClick={() => {
//                           setEditImagePreview("")
//                           setEditImage(null)
//                         }}
//                         className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 {/* Submit Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleSaveEdit}
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
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setEditModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-sm border-border">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-lg">Delete Space</CardTitle>
//             </CardHeader>
//             <CardContent className="pt-0">
//               <p className="text-sm text-muted-foreground mb-6">
//                 Are you sure you want to delete "{selectedSpace.name}"? This action cannot be undone.
//               </p>
//               <div className="flex gap-3">
//                 <Button
//                   onClick={handleDeleteConfirm}
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
//                 <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowDeleteConfirm(false)}>
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
// import { Plus, Trash2, Edit2, FolderOpen, ChevronLeft, X, Loader2, MoreVertical } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { apiCall } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// interface Space {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   status: string
//   type: string
//   company: number
//   created_by: number
//   parent: string | null
// }

// interface SampleImage {
//   id: number
//   uid: string
//   file: string
//   file_name: string
// }

// interface SampleBuyer {
//   id: number
//   uid: string
//   name: string
// }

// interface SampleProject {
//   id: number
//   uid: string
//   name: string
// }

// interface SampleNote {
//   id: number
//   uid: string
//   title: string
// }

// interface Sample {
//   id: number
//   uid: string
//   name: string
//   description: string
//   style_no: string
//   sku_no: string
//   item: string
//   fabrication: string
//   weight: string
//   color: string
//   size: string
//   comments: string
//   arrival_date: string
//   images: SampleImage[]
//   buyers: SampleBuyer[]
//   projects: SampleProject[]
//   notes: SampleNote[]
// }

// export default function SpacePage() {
//   const { toast } = useToast()
//   const router = useRouter()
//   const [spaces, setSpaces] = useState<Space[]>([])
//   const [samples, setSamples] = useState<Sample[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [parentStack, setParentStack] = useState<Array<{ uid: string; name: string }>>([])
//   const [currentParentUid, setCurrentParentUid] = useState<string | null>(null)

//   // Modals
//   const [editModal, setEditModal] = useState(false)
//   const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
//   const [sampleEditModal, setSampleEditModal] = useState(false)
//   const [sampleDeleteConfirmModal, setSampleDeleteConfirmModal] = useState(false)
//   const [menuOpen, setMenuOpen] = useState<string | null>(null)
//   const [sampleMenuOpen, setSampleMenuOpen] = useState<string | null>(null)
//   const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
//   const [selectedSample, setSelectedSample] = useState<Sample | null>(null)

//   // Edit form
//   const [editFormData, setEditFormData] = useState({ name: "", description: "" })
//   const [editImage, setEditImage] = useState<File | null>(null)
//   const [editImagePreview, setEditImagePreview] = useState<string>("")
//   const [isSaving, setIsSaving] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)

//   // Sample edit form
//   const [sampleEditFormData, setSampleEditFormData] = useState({
//     name: "",
//     description: "",
//     style_no: "",
//     sku_no: "",
//     item: "",
//     fabrication: "",
//     weight: "",
//     color: "",
//     size: "",
//     comments: "",
//     arrival_date: "",
//   })
//   const [selectedSampleBuyers, setSelectedSampleBuyers] = useState<string[]>([])
//   const [selectedSampleProjects, setSelectedSampleProjects] = useState<string[]>([])
//   const [selectedSampleNotes, setSelectedSampleNotes] = useState<string[]>([])
//   const [buyers, setBuyers] = useState<SampleBuyer[]>([])
//   const [projects, setProjects] = useState<SampleProject[]>([])
//   const [notes, setNotes] = useState<SampleNote[]>([])
//   const [isSavingSample, setIsSavingSample] = useState(false)
//   const [isDeletingSample, setIsDeletingSample] = useState(false)

//   useEffect(() => {
//     fetchSpacesAndSamples()
//   }, [currentParentUid])

//   const fetchSpacesAndSamples = async () => {
//     setIsLoading(true)
//     try {
//       // Fetch spaces
//       const spacesUrl = currentParentUid
//         ? `/sample_manager/storage/?type=SPACE&parent_uid=${currentParentUid}`
//         : `/sample_manager/storage/?type=SPACE`

//       const spacesResponse = await apiCall(spacesUrl)
//       if (spacesResponse.ok) {
//         const spacesData = await spacesResponse.json()
//         setSpaces(Array.isArray(spacesData) ? spacesData : spacesData.results || [])
//       }

//       // Fetch samples if there's a current parent
//       if (currentParentUid) {
//         const samplesResponse = await apiCall(`/sample_manager/sample/${currentParentUid}`)
//         if (samplesResponse.ok) {
//           const samplesData = await samplesResponse.json()
//           setSamples(Array.isArray(samplesData) ? samplesData : samplesData.results || [])
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err)
//       toast({
//         title: "Error",
//         description: "Failed to fetch spaces and samples",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSpaceCardClick = (space: Space) => {
//     setParentStack([...parentStack, { uid: space.uid, name: space.name }])
//     setCurrentParentUid(space.uid)
//   }

//   const handleBackClick = () => {
//     if (parentStack.length > 0) {
//       const newStack = parentStack.slice(0, -1)
//       setParentStack(newStack)
//       setCurrentParentUid(newStack.length > 0 ? newStack[newStack.length - 1].uid : null)
//     }
//   }

//   const handleEditClick = async (space: Space) => {
//     setSelectedSpace(space)
//     try {
//       const response = await apiCall(`/sample_manager/storage/${space.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setEditFormData({ name: data.name, description: data.description })
//         if (data.image) {
//           setEditImagePreview(data.image)
//         }
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load space details", variant: "destructive" })
//     }
//     setEditModal(true)
//     setMenuOpen(null)
//   }

//   const handleSaveEdit = async () => {
//     if (!selectedSpace || !editFormData.name) return
//     setIsSaving(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", editFormData.name)
//       formData.append("description", editFormData.description)
//       formData.append("type", "SPACE")
//       if (editImage) {
//         formData.append("image", editImage)
//       }
//       if (currentParentUid) {
//         formData.append("parent_uid", currentParentUid)
//       }

//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, {
//         method: "PUT",
//         body: formData,
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update space")
//       }

//       toast({ title: "Success", description: "Space updated successfully" })
//       setEditModal(false)
//       setEditImage(null)
//       setEditImagePreview("")
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update space", variant: "destructive" })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleDeleteClick = (space: Space) => {
//     setSelectedSpace(space)
//     setDeleteConfirmModal(true)
//     setMenuOpen(null)
//   }

//   const handleConfirmDelete = async () => {
//     if (!selectedSpace) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, { method: "DELETE" })

//       if (!response.ok) {
//         throw new Error("Failed to delete space")
//       }

//       toast({ title: "Success", description: "Space deleted successfully" })
//       setDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete space", variant: "destructive" })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setEditImage(file)
//       const reader = new FileReader()
//       reader.onload = (e) => setEditImagePreview(e.target?.result as string)
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleEditSampleClick = async (sample: Sample) => {
//     setSelectedSample(sample)
//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${sample.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setSampleEditFormData({
//           name: data.name,
//           description: data.description,
//           style_no: data.style_no,
//           sku_no: data.sku_no,
//           item: data.item,
//           fabrication: data.fabrication,
//           weight: data.weight,
//           color: data.color,
//           size: data.size,
//           comments: data.comments,
//           arrival_date: data.arrival_date,
//         })
//         setSelectedSampleBuyers(data.buyers?.map((b: SampleBuyer) => b.uid) || [])
//         setSelectedSampleProjects(data.projects?.map((p: SampleProject) => p.uid) || [])
//         setSelectedSampleNotes(data.notes?.map((n: SampleNote) => n.uid) || [])

//         // Fetch buyers, projects, and notes for the modal
//         const buyersResp = await apiCall("/sample_manager/buyer/")
//         if (buyersResp.ok) {
//           const buyersData = await buyersResp.json()
//           setBuyers(Array.isArray(buyersData) ? buyersData : buyersData.results || [])
//         }

//         const projectsResp = await apiCall("/sample_manager/project/")
//         if (projectsResp.ok) {
//           const projectsData = await projectsResp.json()
//           setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
//         }

//         const notesResp = await apiCall("/sample_manager/note/")
//         if (notesResp.ok) {
//           const notesData = await notesResp.json()
//           setNotes(Array.isArray(notesData) ? notesData : notesData.results || [])
//         }
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
//     }
//     setSampleEditModal(true)
//     setSampleMenuOpen(null)
//   }

//   const handleSaveSampleEdit = async () => {
//     if (!selectedSample || !currentParentUid || !sampleEditFormData.name) return
//     setIsSavingSample(true)

//     try {
//       const submitData = {
//         ...sampleEditFormData,
//         buyer_uids: selectedSampleBuyers,
//         project_uids: selectedSampleProjects,
//         note_uids: selectedSampleNotes,
//         image_uids: selectedSample.images.map((img) => img.uid),
//       }

//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//         method: "PUT",
//         body: JSON.stringify(submitData),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update sample")
//       }

//       toast({ title: "Success", description: "Sample updated successfully" })
//       setSampleEditModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update sample", variant: "destructive" })
//     } finally {
//       setIsSavingSample(false)
//     }
//   }

//   const handleDeleteSampleClick = (sample: Sample) => {
//     setSelectedSample(sample)
//     setSampleDeleteConfirmModal(true)
//     setSampleMenuOpen(null)
//   }

//   const handleConfirmDeleteSample = async () => {
//     if (!selectedSample || !currentParentUid) return
//     setIsDeletingSample(true)

//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete sample")
//       }

//       toast({ title: "Success", description: "Sample deleted successfully" })
//       setSampleDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete sample", variant: "destructive" })
//     } finally {
//       setIsDeletingSample(false)
//     }
//   }

//   const handleSampleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setSampleEditFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSampleBuyerToggle = (buyerUid: string) => {
//     setSelectedSampleBuyers((prev) =>
//       prev.includes(buyerUid) ? prev.filter((uid) => uid !== buyerUid) : [...prev, buyerUid],
//     )
//   }

//   const handleSampleProjectToggle = (projectUid: string) => {
//     setSelectedSampleProjects((prev) =>
//       prev.includes(projectUid) ? prev.filter((uid) => uid !== projectUid) : [...prev, projectUid],
//     )
//   }

//   const handleSampleNoteToggle = (noteUid: string) => {
//     setSelectedSampleNotes((prev) =>
//       prev.includes(noteUid) ? prev.filter((uid) => uid !== noteUid) : [...prev, noteUid],
//     )
//   }

//   const getBreadcrumbText = () => {
//     if (parentStack.length === 0) return "Storage Spaces"
//     return parentStack.map((item) => item.name).join(" > ")
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       {/* Header */}
//       <div className="mb-6 sm:mb-8 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           {parentStack.length > 0 && (
//             <button onClick={handleBackClick} className="p-2 hover:bg-muted rounded-lg transition">
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//           )}
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
//               {parentStack.length > 0 ? parentStack[parentStack.length - 1].name : "Storage Spaces"}
//             </h1>
//             <p className="text-sm sm:text-base text-muted-foreground mt-2">
//               {parentStack.length > 0
//                 ? "Manage spaces and samples in this location"
//                 : "Manage your storage spaces and samples"}
//             </p>
//             {parentStack.length > 1 && (
//               <p className="text-xs text-muted-foreground mt-1">
//                 Path: {parentStack.map((item) => item.name).join(" > ")}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Add Buttons */}
//       <div className="flex gap-2 mb-6 sm:mb-8">
//         <Link href={`/space/add${currentParentUid ? `?parent_uid=${currentParentUid}` : ""}`}>
//           <Button className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
//             <Plus className="w-4 h-4" />
//             Add Space
//           </Button>
//         </Link>
//         {currentParentUid && (
//           <Link href={`/sample/add?storage_uid=${currentParentUid}`}>
//             <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent">
//               <Plus className="w-4 h-4" />
//               Add Sample
//             </Button>
//           </Link>
//         )}
//       </div>

//       {isLoading ? (
//         <div className="flex items-center justify-center py-12">
//           <Loader2 className="w-8 h-8 animate-spin text-primary" />
//         </div>
//       ) : (
//         <>
//           {/* Spaces Grid */}
//           {spaces.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Spaces</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
//                 {spaces.map((space) => (
//                   <Card
//                     key={space.uid}
//                     className="border-border hover:shadow-lg transition-all overflow-hidden cursor-pointer group"
//                   >
//                     <div className="relative h-48 bg-muted overflow-hidden" onClick={() => handleSpaceCardClick(space)}>
//                       {space.image ? (
//                         <img
//                           src={space.image || "/placeholder.svg"}
//                           alt={space.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                       <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-lg">
//                         <FolderOpen className="w-5 h-5 text-white" />
//                       </div>
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{space.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {space.description || "No description"}
//                       </p>

//                       <div className="relative mb-4">
//                         <button
//                           onClick={() => setMenuOpen(menuOpen === space.uid ? null : space.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-muted-foreground" />
//                         </button>
//                         {menuOpen === space.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
//                             <button
//                               onClick={() => handleEditClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleEditClick(space)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleDeleteClick(space)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Samples Grid */}
//           {samples.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Samples</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                 {samples.map((sample) => (
//                   <Card key={sample.uid} className="border-border hover:shadow-lg transition-all overflow-hidden">
//                     <div className="relative h-48 bg-muted overflow-hidden group cursor-pointer">
//                       {sample.images && sample.images.length > 0 ? (
//                         <img
//                           src={sample.images[0].file || "/placeholder.svg"}
//                           alt={sample.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                       <div className="absolute top-3 right-3 z-10">
//                         <button
//                           onClick={() => setSampleMenuOpen(sampleMenuOpen === sample.uid ? null : sample.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-white bg-black/50 rounded-full p-1 w-6 h-6" />
//                         </button>
//                         {sampleMenuOpen === sample.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-20">
//                             <button
//                               onClick={() => handleEditSampleClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteSampleClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{sample.name}</CardTitle>
//                       <p className="text-xs text-muted-foreground">{sample.style_no && `Style: ${sample.style_no}`}</p>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {sample.description || "No description"}
//                       </p>

//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleEditSampleClick(sample)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleDeleteSampleClick(sample)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {spaces.length === 0 && samples.length === 0 && (
//             <div className="text-center py-12">
//               <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//               <p className="text-muted-foreground">No spaces or samples found</p>
//             </div>
//           )}
//         </>
//       )}

//       {/* Edit Space Modal */}
//       {editModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Space - {selectedSpace.name}</CardTitle>
//               <button onClick={() => setEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Space Name</label>
//                   <input
//                     type="text"
//                     value={editFormData.name}
//                     onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                   <textarea
//                     value={editFormData.description}
//                     onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={3}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Image</label>
//                   {editImagePreview && (
//                     <div className="mb-3 relative">
//                       <img
//                         src={editImagePreview || "/placeholder.svg"}
//                         alt="Preview"
//                         className="w-full h-40 object-cover rounded-lg"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setEditImagePreview("")
//                           setEditImage(null)
//                         }}
//                         className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleSaveEdit}
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
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setEditModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Delete Space Confirmation Modal */}
//       {deleteConfirmModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Space</CardTitle>
//               <button onClick={() => setDeleteConfirmModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete space "{selectedSpace.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleConfirmDelete}
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

//       {sampleEditModal && selectedSample && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Sample - {selectedSample.name}</CardTitle>
//               <button onClick={() => setSampleEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Sample Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={sampleEditFormData.name}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Style Number</label>
//                     <input
//                       type="text"
//                       name="style_no"
//                       value={sampleEditFormData.style_no}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">SKU Number</label>
//                     <input
//                       type="text"
//                       name="sku_no"
//                       value={sampleEditFormData.sku_no}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Item</label>
//                     <input
//                       type="text"
//                       name="item"
//                       value={sampleEditFormData.item}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Color</label>
//                     <input
//                       type="text"
//                       name="color"
//                       value={sampleEditFormData.color}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Size</label>
//                     <input
//                       type="text"
//                       name="size"
//                       value={sampleEditFormData.size}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Fabrication</label>
//                     <input
//                       type="text"
//                       name="fabrication"
//                       value={sampleEditFormData.fabrication}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Weight</label>
//                     <input
//                       type="text"
//                       name="weight"
//                       value={sampleEditFormData.weight}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                   <textarea
//                     name="description"
//                     value={sampleEditFormData.description}
//                     onChange={handleSampleFormChange}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={2}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Comments</label>
//                   <textarea
//                     name="comments"
//                     value={sampleEditFormData.comments}
//                     onChange={handleSampleFormChange}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={2}
//                   />
//                 </div>

//                 {buyers.length > 0 && (
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Buyers</label>
//                     <div className="space-y-2 border border-border rounded-lg p-3 bg-card max-h-32 overflow-y-auto">
//                       {buyers.map((buyer) => (
//                         <label key={buyer.uid} className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={selectedSampleBuyers.includes(buyer.uid)}
//                             onChange={() => handleSampleBuyerToggle(buyer.uid)}
//                             className="w-4 h-4 rounded border-border"
//                           />
//                           <span className="text-sm text-foreground">{buyer.name}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {projects.length > 0 && (
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Projects</label>
//                     <div className="space-y-2 border border-border rounded-lg p-3 bg-card max-h-32 overflow-y-auto">
//                       {projects.map((project) => (
//                         <label key={project.uid} className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={selectedSampleProjects.includes(project.uid)}
//                             onChange={() => handleSampleProjectToggle(project.uid)}
//                             className="w-4 h-4 rounded border-border"
//                           />
//                           <span className="text-sm text-foreground">{project.name}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {notes.length > 0 && (
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Notes</label>
//                     <div className="space-y-2 border border-border rounded-lg p-3 bg-card max-h-32 overflow-y-auto">
//                       {notes.map((note) => (
//                         <label key={note.uid} className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={selectedSampleNotes.includes(note.uid)}
//                             onChange={() => handleSampleNoteToggle(note.uid)}
//                             className="w-4 h-4 rounded border-border"
//                           />
//                           <span className="text-sm text-foreground">{note.title}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {selectedSample.images.length > 0 && (
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">
//                       Images ({selectedSample.images.length})
//                     </label>
//                     <div className="grid grid-cols-3 gap-3">
//                       {selectedSample.images.map((img) => (
//                         <img
//                           key={img.uid}
//                           src={img.file || "/placeholder.svg"}
//                           alt={img.file_name}
//                           className="w-full h-20 object-cover rounded-lg border border-border"
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleSaveSampleEdit}
//                     disabled={isSavingSample}
//                     className="flex-1 bg-primary hover:bg-primary/90 text-white"
//                   >
//                     {isSavingSample ? (
//                       <>
//                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                         Updating...
//                       </>
//                     ) : (
//                       "Update"
//                     )}
//                   </Button>
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setSampleEditModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {sampleDeleteConfirmModal && selectedSample && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Sample</CardTitle>
//               <button
//                 onClick={() => setSampleDeleteConfirmModal(false)}
//                 className="p-1 hover:bg-muted rounded flex-shrink-0"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete sample "{selectedSample.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleConfirmDeleteSample}
//                   disabled={isDeletingSample}
//                   className="flex-1 bg-red-600 hover:bg-red-700 text-white"
//                 >
//                   {isDeletingSample ? (
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
//                   onClick={() => setSampleDeleteConfirmModal(false)}
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
// import { Plus, Trash2, Edit2, FolderOpen, ChevronLeft, X, Loader2, MoreVertical } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { apiCall, getCookie } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// interface Space {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   status: string
//   type: string
//   company: number
//   created_by: number
//   parent: string | null
// }

// interface SampleImage {
//   id: number
//   uid: string
//   file: string
//   file_name: string
// }

// interface SampleBuyer {
//   id: number
//   uid: string
//   name: string
// }

// interface SampleProject {
//   id: number
//   uid: string
//   name: string
// }

// interface SampleNote {
//   id: number
//   uid: string
//   title: string
// }

// interface Sample {
//   id: number
//   uid: string
//   name: string
//   description: string
//   style_no: string
//   sku_no: string
//   item: string
//   fabrication: string
//   weight: string
//   color: string
//   size: string
//   comments: string
//   arrival_date: string
//   images: SampleImage[]
//   buyers: SampleBuyer[]
//   projects: SampleProject[]
//   notes: SampleNote[]
// }

// export default function SpacePage() {
//   const { toast } = useToast()
//   const router = useRouter()
//   const [spaces, setSpaces] = useState<Space[]>([])
//   const [samples, setSamples] = useState<Sample[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [parentStack, setParentStack] = useState<Array<{ uid: string; name: string }>>([])
//   const [currentParentUid, setCurrentParentUid] = useState<string | null>(null)

//   // Modals
//   const [editModal, setEditModal] = useState(false)
//   const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
//   const [sampleEditModal, setSampleEditModal] = useState(false)
//   const [sampleDeleteConfirmModal, setSampleDeleteConfirmModal] = useState(false)
//   const [menuOpen, setMenuOpen] = useState<string | null>(null)
//   const [sampleMenuOpen, setSampleMenuOpen] = useState<string | null>(null)
//   const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
//   const [selectedSample, setSelectedSample] = useState<Sample | null>(null)

//   // Edit form
//   const [editFormData, setEditFormData] = useState({ name: "", description: "" })
//   const [editImage, setEditImage] = useState<File | null>(null)
//   const [editImagePreview, setEditImagePreview] = useState<string>("")
//   const [isSaving, setIsSaving] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)

//   // Sample edit form
//   const [sampleEditFormData, setSampleEditFormData] = useState({
//     name: "",
//     description: "",
//     style_no: "",
//     sku_no: "",
//     item: "",
//     fabrication: "",
//     weight: "",
//     color: "",
//     size: "",
//     comments: "",
//     arrival_date: "",
//   })
//   const [sampleUploadedImages, setSampleUploadedImages] = useState<Array<{ uid: string; preview: string }>>([])
//   const [sampleIsUploading, setSampleIsUploading] = useState(false)
//   const [selectedSampleBuyers, setSelectedSampleBuyers] = useState<string[]>([])
//   const [selectedSampleProjects, setSelectedSampleProjects] = useState<string[]>([])
//   const [selectedSampleNotes, setSelectedSampleNotes] = useState<string[]>([])
//   const [buyers, setBuyers] = useState<SampleBuyer[]>([])
//   const [projects, setProjects] = useState<SampleProject[]>([])
//   const [notes, setNotes] = useState<SampleNote[]>([])
//   const [isSavingSample, setIsSavingSample] = useState(false)
//   const [isDeletingSample, setIsDeletingSample] = useState(false)

//   useEffect(() => {
//     fetchSpacesAndSamples()
//   }, [currentParentUid])

//   const fetchSpacesAndSamples = async () => {
//     setIsLoading(true)
//     try {
//       // Fetch spaces
//       const spacesUrl = currentParentUid
//         ? `/sample_manager/storage/?type=SPACE&parent_uid=${currentParentUid}`
//         : `/sample_manager/storage/?type=SPACE`

//       const spacesResponse = await apiCall(spacesUrl)
//       if (spacesResponse.ok) {
//         const spacesData = await spacesResponse.json()
//         setSpaces(Array.isArray(spacesData) ? spacesData : spacesData.results || [])
//       }

//       // Fetch samples if there's a current parent
//       if (currentParentUid) {
//         const samplesResponse = await apiCall(`/sample_manager/sample/${currentParentUid}`)
//         if (samplesResponse.ok) {
//           const samplesData = await samplesResponse.json()
//           setSamples(Array.isArray(samplesData) ? samplesData : samplesData.results || [])
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err)
//       toast({
//         title: "Error",
//         description: "Failed to fetch spaces and samples",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSpaceCardClick = (space: Space) => {
//     setParentStack([...parentStack, { uid: space.uid, name: space.name }])
//     setCurrentParentUid(space.uid)
//   }

//   const handleBackClick = () => {
//     if (parentStack.length > 0) {
//       const newStack = parentStack.slice(0, -1)
//       setParentStack(newStack)
//       setCurrentParentUid(newStack.length > 0 ? newStack[newStack.length - 1].uid : null)
//     }
//   }

//   const handleEditClick = async (space: Space) => {
//     setSelectedSpace(space)
//     try {
//       const response = await apiCall(`/sample_manager/storage/${space.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setEditFormData({ name: data.name, description: data.description })
//         if (data.image) {
//           setEditImagePreview(data.image)
//         }
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load space details", variant: "destructive" })
//     }
//     setEditModal(true)
//     setMenuOpen(null)
//   }

//   const handleSaveEdit = async () => {
//     if (!selectedSpace || !editFormData.name) return
//     setIsSaving(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", editFormData.name)
//       formData.append("description", editFormData.description)
//       formData.append("type", "SPACE")
//       if (editImage) {
//         formData.append("image", editImage)
//       }
//       if (currentParentUid) {
//         formData.append("parent_uid", currentParentUid)
//       }

//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, {
//         method: "PUT",
//         body: formData,
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update space")
//       }

//       toast({ title: "Success", description: "Space updated successfully" })
//       setEditModal(false)
//       setEditImage(null)
//       setEditImagePreview("")
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update space", variant: "destructive" })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleDeleteClick = (space: Space) => {
//     setSelectedSpace(space)
//     setDeleteConfirmModal(true)
//     setMenuOpen(null)
//   }

//   const handleConfirmDelete = async () => {
//     if (!selectedSpace) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, { method: "DELETE" })

//       if (!response.ok) {
//         throw new Error("Failed to delete space")
//       }

//       toast({ title: "Success", description: "Space deleted successfully" })
//       setDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete space", variant: "destructive" })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setEditImage(file)
//       const reader = new FileReader()
//       reader.onload = (e) => setEditImagePreview(e.target?.result as string)
//       reader.readAsDataURL(file)
//     }
//   }

//   const compressSampleImage = async (file: File): Promise<Blob> => {
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

//   const handleSampleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.currentTarget.files
//     if (!files || !currentParentUid) return

//     setSampleIsUploading(true)
//     try {
//       for (let i = 0; i < files.length; i++) {
//         const file = files[i]
//         const compressedBlob = await compressSampleImage(file)

//         const formDataForUpload = new FormData()
//         formDataForUpload.append("file", new File([compressedBlob], file.name, { type: "image/jpeg" }))

//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/images/`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${getCookie("access_token")}`,
//           },
//           body: formDataForUpload,
//         })

//         if (!response.ok) {
//           throw new Error("Failed to upload image")
//         }

//         const data = await response.json()
//         const imagePreview = URL.createObjectURL(compressedBlob)

//         setSampleUploadedImages((prev) => [...prev, { uid: data.uid, preview: imagePreview }])
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
//       setSampleIsUploading(false)
//     }
//   }

//   const handleRemoveSampleImage = (uid: string) => {
//     setSampleUploadedImages((prev) => prev.filter((img) => img.uid !== uid))
//   }

//   const handleEditSpaceClick = async (space: Space) => {
//     setSelectedSpace(space)
//     try {
//       const response = await apiCall(`/sample_manager/storage/${space.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setEditFormData({ name: data.name, description: data.description })
//         if (data.image) {
//           setEditImagePreview(data.image)
//         }
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load space details", variant: "destructive" })
//     }
//     setEditModal(true)
//     setMenuOpen(null)
//   }

//   const handleEditSampleClick = async (sample: Sample) => {
//     setSelectedSample(sample)
//     setSampleUploadedImages([])
//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${sample.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setSampleEditFormData({
//           name: data.name,
//           description: data.description,
//           style_no: data.style_no,
//           sku_no: data.sku_no,
//           item: data.item,
//           fabrication: data.fabrication,
//           weight: data.weight,
//           color: data.color,
//           size: data.size,
//           comments: data.comments,
//           arrival_date: data.arrival_date,
//         })
//         setSelectedSampleBuyers(data.buyers?.map((b: SampleBuyer) => b.uid) || [])
//         setSelectedSampleProjects(data.projects?.map((p: SampleProject) => p.uid) || [])
//         setSelectedSampleNotes(data.notes?.map((n: SampleNote) => n.uid) || [])

//         // Fetch buyers, projects, and notes for the modal
//         const buyersResp = await apiCall("/sample_manager/buyer/")
//         if (buyersResp.ok) {
//           const buyersData = await buyersResp.json()
//           setBuyers(Array.isArray(buyersData) ? buyersData : buyersData.results || [])
//         }

//         const projectsResp = await apiCall("/sample_manager/project/")
//         if (projectsResp.ok) {
//           const projectsData = await projectsResp.json()
//           setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
//         }

//         const notesResp = await apiCall("/sample_manager/note/")
//         if (notesResp.ok) {
//           const notesData = await notesResp.json()
//           setNotes(Array.isArray(notesData) ? notesData : notesData.results || [])
//         }
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
//     }
//     setSampleEditModal(true)
//     setSampleMenuOpen(null)
//   }

//   const handleSaveSampleEdit = async () => {
//     if (!selectedSample || !currentParentUid || !sampleEditFormData.name) return
//     setIsSavingSample(true)

//     try {
//       const existingImageUids = selectedSample.images.map((img) => img.uid)
//       const allImageUids = [...existingImageUids, ...sampleUploadedImages.map((img) => img.uid)]

//       const submitData = {
//         ...sampleEditFormData,
//         storage_uid: currentParentUid,
//         buyer_uids: selectedSampleBuyers,
//         project_uids: selectedSampleProjects,
//         note_uids: selectedSampleNotes,
//         image_uids: allImageUids,
//       }

//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//         method: "PUT",
//         body: JSON.stringify(submitData),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update sample")
//       }

//       toast({ title: "Success", description: "Sample updated successfully" })
//       setSampleEditModal(false)
//       setSampleUploadedImages([])
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update sample", variant: "destructive" })
//     } finally {
//       setIsSavingSample(false)
//     }
//   }

//   const handleDeleteSampleClick = (sample: Sample) => {
//     setSelectedSample(sample)
//     setSampleDeleteConfirmModal(true)
//     setSampleMenuOpen(null)
//   }

//   const handleConfirmDeleteSample = async () => {
//     if (!selectedSample || !currentParentUid) return
//     setIsDeletingSample(true)

//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete sample")
//       }

//       toast({ title: "Success", description: "Sample deleted successfully" })
//       setSampleDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete sample", variant: "destructive" })
//     } finally {
//       setIsDeletingSample(false)
//     }
//   }

//   const handleSampleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setSampleEditFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSampleBuyerToggle = (buyerUid: string) => {
//     setSelectedSampleBuyers((prev) =>
//       prev.includes(buyerUid) ? prev.filter((uid) => uid !== buyerUid) : [...prev, buyerUid],
//     )
//   }

//   const handleSampleProjectToggle = (projectUid: string) => {
//     setSelectedSampleProjects((prev) =>
//       prev.includes(projectUid) ? prev.filter((uid) => uid !== projectUid) : [...prev, projectUid],
//     )
//   }

//   const handleSampleNoteToggle = (noteUid: string) => {
//     setSelectedSampleNotes((prev) =>
//       prev.includes(noteUid) ? prev.filter((uid) => uid !== noteUid) : [...prev, noteUid],
//     )
//   }

//   const getBreadcrumbText = () => {
//     if (parentStack.length === 0) return "Storage Spaces"
//     return parentStack.map((item) => item.name).join(" > ")
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       {/* Header */}
//       <div className="mb-6 sm:mb-8 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           {parentStack.length > 0 && (
//             <button onClick={handleBackClick} className="p-2 hover:bg-muted rounded-lg transition">
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//           )}
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
//               {parentStack.length > 0 ? parentStack[parentStack.length - 1].name : "Storage Spaces"}
//             </h1>
//             <p className="text-sm sm:text-base text-muted-foreground mt-2">
//               {parentStack.length > 0
//                 ? "Manage spaces and samples in this location"
//                 : "Manage your storage spaces and samples"}
//             </p>
//             {parentStack.length > 1 && (
//               <p className="text-xs text-muted-foreground mt-1">
//                 Path: {parentStack.map((item) => item.name).join(" > ")}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Add Buttons */}
//       <div className="flex gap-2 mb-6 sm:mb-8">
//         <Link href={`/space/add${currentParentUid ? `?parent_uid=${currentParentUid}` : ""}`}>
//           <Button className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
//             <Plus className="w-4 h-4" />
//             Add Space
//           </Button>
//         </Link>
//         {currentParentUid && (
//           <Link href={`/sample/add?storage_uid=${currentParentUid}`}>
//             <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent">
//               <Plus className="w-4 h-4" />
//               Add Sample
//             </Button>
//           </Link>
//         )}
//       </div>

//       {isLoading ? (
//         <div className="flex items-center justify-center py-12">
//           <Loader2 className="w-8 h-8 animate-spin text-primary" />
//         </div>
//       ) : (
//         <>
//           {/* Spaces Grid */}
//           {spaces.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Spaces</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
//                 {spaces.map((space) => (
//                   <Card
//                     key={space.uid}
//                     className="border-border hover:shadow-lg transition-all overflow-hidden cursor-pointer group"
//                   >
//                     <div className="relative h-48 bg-muted overflow-hidden" onClick={() => handleSpaceCardClick(space)}>
//                       {space.image ? (
//                         <img
//                           src={space.image || "/placeholder.svg"}
//                           alt={space.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                       <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-lg">
//                         <FolderOpen className="w-5 h-5 text-white" />
//                       </div>
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{space.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {space.description || "No description"}
//                       </p>

//                       <div className="relative mb-4">
//                         <button
//                           onClick={() => setMenuOpen(menuOpen === space.uid ? null : space.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-muted-foreground" />
//                         </button>
//                         {menuOpen === space.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
//                             <button
//                               onClick={() => handleEditClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleEditClick(space)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleDeleteClick(space)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Samples Grid */}
//           {samples.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Samples</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                 {samples.map((sample) => (
//                   <Card key={sample.uid} className="border-border hover:shadow-lg transition-all overflow-hidden">
//                     <div className="relative h-48 bg-muted overflow-hidden group cursor-pointer">
//                       {sample.images && sample.images.length > 0 ? (
//                         <img
//                           src={sample.images[0].file || "/placeholder.svg"}
//                           alt={sample.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                       <div className="absolute top-3 right-3 z-10">
//                         <button
//                           onClick={() => setSampleMenuOpen(sampleMenuOpen === sample.uid ? null : sample.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-white bg-black/50 rounded-full p-1 w-6 h-6" />
//                         </button>
//                         {sampleMenuOpen === sample.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-20">
//                             <button
//                               onClick={() => handleEditSampleClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteSampleClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{sample.name}</CardTitle>
//                       <p className="text-xs text-muted-foreground">{sample.style_no && `Style: ${sample.style_no}`}</p>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {sample.description || "No description"}
//                       </p>

//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleEditSampleClick(sample)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleDeleteSampleClick(sample)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {spaces.length === 0 && samples.length === 0 && (
//             <div className="text-center py-12">
//               <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//               <p className="text-muted-foreground">No spaces or samples found</p>
//             </div>
//           )}
//         </>
//       )}

//       {/* Edit Space Modal */}
//       {editModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Space - {selectedSpace.name}</CardTitle>
//               <button onClick={() => setEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Space Name</label>
//                   <input
//                     type="text"
//                     value={editFormData.name}
//                     onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                   <textarea
//                     value={editFormData.description}
//                     onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={3}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Image</label>
//                   {editImagePreview && (
//                     <div className="mb-3 relative">
//                       <img
//                         src={editImagePreview || "/placeholder.svg"}
//                         alt="Preview"
//                         className="w-full h-40 object-cover rounded-lg"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setEditImagePreview("")
//                           setEditImage(null)
//                         }}
//                         className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleSaveEdit}
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
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setEditModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Delete Space Confirmation Modal */}
//       {deleteConfirmModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Space</CardTitle>
//               <button onClick={() => setDeleteConfirmModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete space "{selectedSpace.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleConfirmDelete}
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

//       {sampleEditModal && selectedSample && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Sample - {selectedSample.name}</CardTitle>
//               <button onClick={() => setSampleEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Sample Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={sampleEditFormData.name}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Style Number</label>
//                     <input
//                       type="text"
//                       name="style_no"
//                       value={sampleEditFormData.style_no}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">SKU Number</label>
//                     <input
//                       type="text"
//                       name="sku_no"
//                       value={sampleEditFormData.sku_no}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Item</label>
//                     <input
//                       type="text"
//                       name="item"
//                       value={sampleEditFormData.item}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Color</label>
//                     <input
//                       type="text"
//                       name="color"
//                       value={sampleEditFormData.color}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Size</label>
//                     <input
//                       type="text"
//                       name="size"
//                       value={sampleEditFormData.size}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Fabrication</label>
//                     <input
//                       type="text"
//                       name="fabrication"
//                       value={sampleEditFormData.fabrication}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Weight</label>
//                     <input
//                       type="text"
//                       name="weight"
//                       value={sampleEditFormData.weight}
//                       onChange={handleSampleFormChange}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                   <textarea
//                     name="description"
//                     value={sampleEditFormData.description}
//                     onChange={handleSampleFormChange}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={2}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Comments</label>
//                   <textarea
//                     name="comments"
//                     value={sampleEditFormData.comments}
//                     onChange={handleSampleFormChange}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={2}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Arrival Date</label>
//                   <input
//                     type="date"
//                     name="arrival_date"
//                     value={sampleEditFormData.arrival_date}
//                     onChange={handleSampleFormChange}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 {buyers.length > 0 && (
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Buyers</label>
//                     <div className="space-y-2 border border-border rounded-lg p-3 bg-card max-h-32 overflow-y-auto">
//                       {buyers.map((buyer) => (
//                         <label key={buyer.uid} className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={selectedSampleBuyers.includes(buyer.uid)}
//                             onChange={() => handleSampleBuyerToggle(buyer.uid)}
//                             className="w-4 h-4 rounded border-border"
//                           />
//                           <span className="text-sm text-foreground">{buyer.name}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {projects.length > 0 && (
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Projects</label>
//                     <div className="space-y-2 border border-border rounded-lg p-3 bg-card max-h-32 overflow-y-auto">
//                       {projects.map((project) => (
//                         <label key={project.uid} className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={selectedSampleProjects.includes(project.uid)}
//                             onChange={() => handleSampleProjectToggle(project.uid)}
//                             className="w-4 h-4 rounded border-border"
//                           />
//                           <span className="text-sm text-foreground">{project.name}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {notes.length > 0 && (
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Notes</label>
//                     <div className="space-y-2 border border-border rounded-lg p-3 bg-card max-h-32 overflow-y-auto">
//                       {notes.map((note) => (
//                         <label key={note.uid} className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={selectedSampleNotes.includes(note.uid)}
//                             onChange={() => handleSampleNoteToggle(note.uid)}
//                             className="w-4 h-4 rounded border-border"
//                           />
//                           <span className="text-sm text-foreground">{note.title}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {selectedSample.images.length > 0 && (
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">
//                       Existing Images ({selectedSample.images.length})
//                     </label>
//                     <div className="grid grid-cols-3 gap-3">
//                       {selectedSample.images.map((img) => (
//                         <img
//                           key={img.uid}
//                           src={img.file || "/placeholder.svg"}
//                           alt={img.file_name}
//                           className="w-full h-20 object-cover rounded-lg border border-border"
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Add New Images</label>
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={handleSampleFileSelect}
//                     disabled={sampleIsUploading}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
//                   />
//                   {sampleIsUploading && (
//                     <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                       Uploading images...
//                     </p>
//                   )}
//                 </div>

//                 {sampleUploadedImages.length > 0 && (
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">
//                       New Images ({sampleUploadedImages.length})
//                     </label>
//                     <div className="grid grid-cols-3 gap-3">
//                       {sampleUploadedImages.map((img) => (
//                         <div key={img.uid} className="relative">
//                           <img
//                             src={img.preview || "/placeholder.svg"}
//                             alt="New upload"
//                             className="w-full h-20 object-cover rounded-lg border border-border"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => handleRemoveSampleImage(img.uid)}
//                             className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
//                           >
//                             <X className="w-3 h-3" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleSaveSampleEdit}
//                     disabled={isSavingSample}
//                     className="flex-1 bg-primary hover:bg-primary/90 text-white"
//                   >
//                     {isSavingSample ? (
//                       <>
//                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                         Updating...
//                       </>
//                     ) : (
//                       "Update"
//                     )}
//                   </Button>
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setSampleEditModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {sampleDeleteConfirmModal && selectedSample && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Sample</CardTitle>
//               <button
//                 onClick={() => setSampleDeleteConfirmModal(false)}
//                 className="p-1 hover:bg-muted rounded flex-shrink-0"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete sample "{selectedSample.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleConfirmDeleteSample}
//                   disabled={isDeletingSample}
//                   className="flex-1 bg-red-600 hover:bg-red-700 text-white"
//                 >
//                   {isDeletingSample ? (
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
//                   onClick={() => setSampleDeleteConfirmModal(false)}
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
// import { Plus, Trash2, Edit2, FolderOpen, ChevronLeft, X, Loader2, MoreVertical } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { getCookie,apiCall } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// interface Space {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   status: string
//   type: string
//   company: number
//   created_by: number
//   parent: string | null
// }

// interface Sample {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   storage_uid: string
// }

// export default function SpacePage() {
//   const { toast } = useToast()
//   const router = useRouter()
//   const [spaces, setSpaces] = useState<Space[]>([])
//   const [samples, setSamples] = useState<Sample[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [parentStack, setParentStack] = useState<Array<{ uid: string; name: string }>>([])
//   const [currentParentUid, setCurrentParentUid] = useState<string | null>(null)

//   // Modals
//   const [editModal, setEditModal] = useState(false)
//   const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
//   const [sampleEditModal, setSampleEditModal] = useState(false)
//   const [sampleDeleteConfirmModal, setSampleDeleteConfirmModal] = useState(false)
//   const [menuOpen, setMenuOpen] = useState<string | null>(null)
//   const [sampleMenuOpen, setSampleMenuOpen] = useState<string | null>(null)
//   const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
//   const [selectedSample, setSelectedSample] = useState<Sample | null>(null)
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

//   const [sampleFormData, setSampleFormData] = useState({
//     arrival_date: "",
//     style_no: "",
//     sku_no: "",
//     item: "",
//     fabrication: "",
//     weight: "",
//     weight_type: "GM",
//     size_type: "CENTIMETER",
//     types: "DEVELOPMENT",
//     color: "",
//     size: "",
//     comments: "",
//     name: "",
//     description: "",
//     buyer_uids: [] as string[],
//     project_uids: [] as string[],
//     note_uids: [] as string[],
//   })

//   // Edit form
//   const [editFormData, setEditFormData] = useState({ name: "", description: "" })
//   const [editImage, setEditImage] = useState<File | null>(null)
//   const [editImagePreview, setEditImagePreview] = useState<string>("")
//   const [isSaving, setIsSaving] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)
//   const [isSavingSample, setIsSavingSample] = useState(false)
//   const [isDeletingSample, setIsDeletingSample] = useState(false)

//   useEffect(() => {
//     fetchSpacesAndSamples()
//   }, [currentParentUid])

//   const fetchSpacesAndSamples = async () => {
//     setIsLoading(true)
//     try {
//       // Fetch spaces
//       const spacesUrl = currentParentUid
//         ? `/sample_manager/storage/?type=SPACE&parent_uid=${currentParentUid}`
//         : `/sample_manager/storage/?type=SPACE`

//       const spacesResponse = await apiCall(spacesUrl)
//       if (spacesResponse.ok) {
//         const spacesData = await spacesResponse.json()
//         setSpaces(Array.isArray(spacesData) ? spacesData : spacesData.results || [])
//       }

//       // Fetch samples if there's a current parent
//       if (currentParentUid) {
//         const samplesResponse = await apiCall(`/sample_manager/sample/${currentParentUid}`)
//         if (samplesResponse.ok) {
//           const samplesData = await samplesResponse.json()
//           setSamples(Array.isArray(samplesData) ? samplesData : samplesData.results || [])
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err)
//       toast({
//         title: "Error",
//         description: "Failed to fetch spaces and samples",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSpaceCardClick = (space: Space) => {
//     setParentStack([...parentStack, { uid: space.uid, name: space.name }])
//     setCurrentParentUid(space.uid)
//   }

//   const handleBackClick = () => {
//     if (parentStack.length > 0) {
//       const newStack = parentStack.slice(0, -1)
//       setParentStack(newStack)
//       setCurrentParentUid(newStack.length > 0 ? newStack[newStack.length - 1].uid : null)
//     }
//   }

//   const handleEditClick = async (space: Space) => {
//     setSelectedSpace(space)
//     try {
//       const response = await apiCall(`/sample_manager/storage/${space.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setEditFormData({ name: data.name, description: data.description })
//         if (data.image) {
//           setEditImagePreview(data.image)
//         }
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load space details", variant: "destructive" })
//     }
//     setEditModal(true)
//     setMenuOpen(null)
//   }

//   const handleEditSampleClick = async (sample: Sample) => {
//     setSelectedSample(sample)
//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${sample.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setSampleFormData({
//           arrival_date: data.arrival_date || "",
//           style_no: data.style_no || "",
//           sku_no: data.sku_no || "",
//           item: data.item || "",
//           fabrication: data.fabrication || "",
//           weight: data.weight || "",
//           weight_type: data.weight_type || "GM",
//           size_type: data.size_type || "CENTIMETER",
//           types: data.types || "DEVELOPMENT",
//           color: data.color || "",
//           size: data.size || "",
//           comments: data.comments || "",
//           name: data.name || "",
//           description: data.description || "",
//           buyer_uids: data.buyer_uids || [],
//           project_uids: data.project_uids || [],
//           note_uids: data.note_uids || [],
//         })
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
//     }
//     setSampleEditModal(true)
//     setSampleMenuOpen(null)
//   }

//   const handleSaveEdit = async () => {
//     if (!selectedSpace || !editFormData.name) return
//     setIsSaving(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", editFormData.name)
//       formData.append("description", editFormData.description)
//       formData.append("type", "SPACE")
//       if (editImage) {
//         formData.append("image", editImage)
//       }
//       if (currentParentUid) {
//         formData.append("parent_uid", currentParentUid)
//       }

//       // const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, {
//       //   method: "PUT",
//       //   body: formData,
//       // })

//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/storage/${selectedSpace.uid}`, {
//               method: "PUT",
//               headers: {
//                 Authorization: `Bearer ${getCookie("access_token")}`,
//               },
//               body: formData,
//             })

//             const data = await response.json()

//       if (!response.ok) {
//         if (typeof data === "object" && !Array.isArray(data)) {
//           setFieldErrors(data)
//         }
//         toast({ title: "Error", description: "Failed to create space", variant: "destructive" })
//         return
//       }

//       toast({ title: "Success", description: "Space updated successfully" })
//       setEditModal(false)
//       setEditImage(null)
//       setEditImagePreview("")
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update space", variant: "destructive" })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleSaveSample = async () => {
//     if (!selectedSample || !currentParentUid) return
//     setIsSavingSample(true)

//     try {
//       const submitData = {
//         ...sampleFormData,
//         storage_uid: currentParentUid,
//         image_uids: sampleFormData.buyer_uids, // Use existing images
//       }

//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//         method: "PUT",
//         body: JSON.stringify(submitData),
//       })

//       // const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//       //               method: "PUT",
//       //               headers: {
//       //                 Authorization: `Bearer ${getCookie("access_token")}`,
//       //               },
//       //               body: submitData,
//       //             })

//       if (!response.ok) {
//         throw new Error("Failed to update sample")
//       }

//       toast({ title: "Success", description: "Sample updated successfully" })
//       setSampleEditModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update sample", variant: "destructive" })
//     } finally {
//       setIsSavingSample(false)
//     }
//   }

//   const handleDeleteClick = (space: Space) => {
//     setSelectedSpace(space)
//     setDeleteConfirmModal(true)
//     setMenuOpen(null)
//   }

//   const handleDeleteSampleClick = (sample: Sample) => {
//     setSelectedSample(sample)
//     setSampleDeleteConfirmModal(true)
//     setSampleMenuOpen(null)
//   }

//   const handleConfirmDelete = async () => {
//     if (!selectedSpace) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, { method: "DELETE" })

//       if (!response.ok) {
//         throw new Error("Failed to delete space")
//       }

//       toast({ title: "Success", description: "Space deleted successfully" })
//       setDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete space", variant: "destructive" })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const handleConfirmDeleteSample = async () => {
//     if (!selectedSample || !currentParentUid) return
//     setIsDeletingSample(true)

//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete sample")
//       }

//       toast({ title: "Success", description: "Sample deleted successfully" })
//       setSampleDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete sample", variant: "destructive" })
//     } finally {
//       setIsDeletingSample(false)
//     }
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setEditImage(file)
//       const reader = new FileReader()
//       reader.onload = (e) => setEditImagePreview(e.target?.result as string)
//       reader.readAsDataURL(file)
//     }
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       {/* Header */}
//       <div className="mb-6 sm:mb-8 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           {parentStack.length > 0 && (
//             <button onClick={handleBackClick} className="p-2 hover:bg-muted rounded-lg transition">
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//           )}
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
//               {parentStack.length > 0 ? parentStack[parentStack.length - 1].name : "Storage Spaces"}
//             </h1>
//             <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage your storage spaces and samples</p>
//           </div>
//         </div>
//       </div>

//       {/* Add Buttons */}
//       <div className="flex gap-2 mb-6 sm:mb-8">
//         <Link href={`/space/add${currentParentUid ? `?parent_uid=${currentParentUid}` : ""}`}>
//           <Button className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
//             <Plus className="w-4 h-4" />
//             Add Space
//           </Button>
//         </Link>
//         {currentParentUid && (
//           <Link href={`/sample/add?storage_uid=${currentParentUid}`}>
//             <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent">
//               <Plus className="w-4 h-4" />
//               Add Sample
//             </Button>
//           </Link>
//         )}
//       </div>

//       {isLoading ? (
//         <div className="flex items-center justify-center py-12">
//           <Loader2 className="w-8 h-8 animate-spin text-primary" />
//         </div>
//       ) : (
//         <>
//           {/* Spaces Grid */}
//           {spaces.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Spaces</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
//                 {spaces.map((space) => (
//                   <Card
//                     key={space.uid}
//                     className="border-border hover:shadow-lg transition-all overflow-hidden cursor-pointer group"
//                   >
//                     <div className="relative h-48 bg-muted overflow-hidden" onClick={() => handleSpaceCardClick(space)}>
//                       {space.image ? (
//                         <img
//                           src={space.image || "/placeholder.svg"}
//                           alt={space.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                       {/* Folder Icon */}
//                       <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-lg">
//                         <FolderOpen className="w-5 h-5 text-white" />
//                       </div>
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{space.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {space.description || "No description"}
//                       </p>

//                       {/* Three Dots Menu */}
//                       <div className="relative mb-4">
//                         <button
//                           onClick={() => setMenuOpen(menuOpen === space.uid ? null : space.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-muted-foreground" />
//                         </button>
//                         {menuOpen === space.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
//                             <button
//                               onClick={() => handleEditClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       {/* Edit and Delete Buttons */}
//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleEditClick(space)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleDeleteClick(space)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Samples Grid */}
//           {samples.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Samples</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                 {samples.map((sample) => (
//                   <Card key={sample.uid} className="border-border hover:shadow-lg transition-all overflow-hidden">
//                     <div className="relative h-48 bg-muted overflow-hidden">
//                       {sample.image ? (
//                         <img
//                           src={sample.image || "/placeholder.svg"}
//                           alt={sample.name}
//                           className="w-full h-full object-cover hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                       <div className="absolute top-3 right-3">
//                         <button
//                           onClick={() => setSampleMenuOpen(sampleMenuOpen === sample.uid ? null : sample.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition bg-black/50 text-white"
//                         >
//                           <MoreVertical className="w-4 h-4" />
//                         </button>
//                         {sampleMenuOpen === sample.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
//                             <button
//                               onClick={() => handleEditSampleClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteSampleClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{sample.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {sample.description || "No description"}
//                       </p>

//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleEditSampleClick(sample)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleDeleteSampleClick(sample)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {spaces.length === 0 && samples.length === 0 && (
//             <div className="text-center py-12">
//               <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//               <p className="text-muted-foreground">No spaces or samples found</p>
//             </div>
//           )}
//         </>
//       )}

//       {/* Edit Space Modal */}
//       {editModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Space - {selectedSpace.name}</CardTitle>
//               <button onClick={() => setEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 {/* Name */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Space Name</label>
//                   <input
//                     type="text"
//                     value={editFormData.name}
//                     onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                   <textarea
//                     value={editFormData.description}
//                     onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={3}
//                   />
//                 </div>

//                 {/* Image */}
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Image</label>
//                   {editImagePreview && (
//                     <div className="mb-3 relative">
//                       <img
//                         src={editImagePreview || "/placeholder.svg"}
//                         alt="Preview"
//                         className="w-full h-40 object-cover rounded-lg"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setEditImagePreview("")}
//                         className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 {/* Submit Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleSaveEdit}
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
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setEditModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {deleteConfirmModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Space</CardTitle>
//               <button onClick={() => setDeleteConfirmModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete space "{selectedSpace.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleConfirmDelete}
//                   disabled={isDeleting}
//                   className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
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

//       {sampleEditModal && selectedSample && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Sample - {selectedSample.name}</CardTitle>
//               <button onClick={() => setSampleEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Sample Name</label>
//                   <input
//                     type="text"
//                     value={sampleFormData.name}
//                     onChange={(e) => setSampleFormData({ ...sampleFormData, name: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                   <textarea
//                     value={sampleFormData.description}
//                     onChange={(e) => setSampleFormData({ ...sampleFormData, description: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={3}
//                   />
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleSaveSample}
//                     disabled={isSavingSample}
//                     className="flex-1 bg-primary hover:bg-primary/90 text-white"
//                   >
//                     {isSavingSample ? (
//                       <>
//                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                         Updating...
//                       </>
//                     ) : (
//                       "Update"
//                     )}
//                   </Button>
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setSampleEditModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {sampleDeleteConfirmModal && selectedSample && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Sample</CardTitle>
//               <button
//                 onClick={() => setSampleDeleteConfirmModal(false)}
//                 className="p-1 hover:bg-muted rounded flex-shrink-0"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete sample "{selectedSample.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleConfirmDeleteSample}
//                   disabled={isDeletingSample}
//                   className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
//                 >
//                   {isDeletingSample ? (
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
//                   onClick={() => setSampleDeleteConfirmModal(false)}
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
// import { Plus, Trash2, Edit2, FolderOpen, ChevronLeft, X, Loader2, MoreVertical } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { apiCall } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// interface Space {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   status: string
//   type: string
//   company: number
//   created_by: number
//   parent: string | null
// }

// interface Sample {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   storage_uid: string
//   images?: Array<{ id: number; file: string }>
// }

// export default function SpacePage() {
//   const { toast } = useToast()
//   const router = useRouter()
//   const [spaces, setSpaces] = useState<Space[]>([])
//   const [samples, setSamples] = useState<Sample[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [parentStack, setParentStack] = useState<Array<{ uid: string; name: string }>>([])
//   const [currentParentUid, setCurrentParentUid] = useState<string | null>(null)

//   // Modals
//   const [editModal, setEditModal] = useState(false)
//   const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
//   const [sampleEditModal, setSampleEditModal] = useState(false)
//   const [sampleDeleteConfirmModal, setSampleDeleteConfirmModal] = useState(false)
//   const [menuOpen, setMenuOpen] = useState<string | null>(null)
//   const [sampleMenuOpen, setSampleMenuOpen] = useState<string | null>(null)
//   const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
//   const [selectedSample, setSelectedSample] = useState<Sample | null>(null)

//   // Edit form
//   const [editFormData, setEditFormData] = useState({ name: "", description: "" })
//   const [editImage, setEditImage] = useState<File | null>(null)
//   const [editImagePreview, setEditImagePreview] = useState<string>("")
//   const [isSaving, setIsSaving] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)

//   // Sample edit
//   const [sampleEditData, setSampleEditData] = useState<any>(null)
//   const [sampleEditImages, setSampleEditImages] = useState<any[]>([])
//   const [sampleIsSaving, setSampleIsSaving] = useState(false)
//   const [sampleIsDeleting, setSampleIsDeleting] = useState(false)
//   const [sampleEditLoading, setSampleEditLoading] = useState(false)

//   useEffect(() => {
//     fetchSpacesAndSamples()
//   }, [currentParentUid])

//   const fetchSpacesAndSamples = async () => {
//     setIsLoading(true)
//     try {
//       const spacesUrl = currentParentUid
//         ? `/sample_manager/storage/?type=SPACE&parent_uid=${currentParentUid}`
//         : `/sample_manager/storage/?type=SPACE`

//       const spacesResponse = await apiCall(spacesUrl)
//       if (spacesResponse.ok) {
//         const spacesData = await spacesResponse.json()
//         setSpaces(Array.isArray(spacesData) ? spacesData : spacesData.results || [])
//       }

//       if (currentParentUid) {
//         const samplesResponse = await apiCall(`/sample_manager/sample/${currentParentUid}`)
//         if (samplesResponse.ok) {
//           const samplesData = await samplesResponse.json()
//           setSamples(Array.isArray(samplesData) ? samplesData : samplesData.results || [])
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err)
//       toast({
//         title: "Error",
//         description: "Failed to fetch spaces and samples",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSpaceCardClick = (space: Space) => {
//     setParentStack([...parentStack, { uid: space.uid, name: space.name }])
//     setCurrentParentUid(space.uid)
//   }

//   const handleBackClick = () => {
//     if (parentStack.length > 0) {
//       const newStack = parentStack.slice(0, -1)
//       setParentStack(newStack)
//       setCurrentParentUid(newStack.length > 0 ? newStack[newStack.length - 1].uid : null)
//     }
//   }

//   const handleEditClick = async (space: Space) => {
//     setSelectedSpace(space)
//     try {
//       const response = await apiCall(`/sample_manager/storage/${space.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setEditFormData({ name: data.name, description: data.description })
//         if (data.image) {
//           setEditImagePreview(data.image)
//         }
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load space details", variant: "destructive" })
//     }
//     setEditModal(true)
//     setMenuOpen(null)
//   }

//   const handleSaveEdit = async () => {
//     if (!selectedSpace || !editFormData.name) return
//     setIsSaving(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", editFormData.name)
//       formData.append("description", editFormData.description)
//       formData.append("type", "SPACE")
//       if (editImage) {
//         formData.append("image", editImage)
//       }
//       if (currentParentUid) {
//         formData.append("parent_uid", currentParentUid)
//       }

//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, {
//         method: "PUT",
//         body: formData,
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update space")
//       }

//       toast({ title: "Success", description: "Space updated successfully" })
//       setEditModal(false)
//       setEditImage(null)
//       setEditImagePreview("")
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update space", variant: "destructive" })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleDeleteClick = (space: Space) => {
//     setSelectedSpace(space)
//     setDeleteConfirmModal(true)
//     setMenuOpen(null)
//   }

//   const handleConfirmDelete = async () => {
//     if (!selectedSpace) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, { method: "DELETE" })

//       if (!response.ok) {
//         throw new Error("Failed to delete space")
//       }

//       toast({ title: "Success", description: "Space deleted successfully" })
//       setDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete space", variant: "destructive" })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setEditImage(file)
//       const reader = new FileReader()
//       reader.onload = (e) => setEditImagePreview(e.target?.result as string)
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSampleEditClick = async (sample: Sample) => {
//     setSelectedSample(sample)
//     setSampleEditLoading(true)
//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${sample.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setSampleEditData(data)
//         setSampleEditImages(data.images || [])
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
//     } finally {
//       setSampleEditLoading(false)
//     }
//     setSampleEditModal(true)
//     setSampleMenuOpen(null)
//   }

//   const handleSampleSaveEdit = async () => {
//     if (!selectedSample || !currentParentUid || !sampleEditData) return
//     setSampleIsSaving(true)

//     try {
//       const submitData = {
//         arrival_date: sampleEditData.arrival_date,
//         style_no: sampleEditData.style_no,
//         sku_no: sampleEditData.sku_no,
//         item: sampleEditData.item,
//         fabrication: sampleEditData.fabrication,
//         weight: sampleEditData.weight,
//         weight_type: sampleEditData.weight_type,
//         size_type: sampleEditData.size_type,
//         types: sampleEditData.types,
//         color: sampleEditData.color,
//         size: sampleEditData.size,
//         comments: sampleEditData.comments,
//         name: sampleEditData.name,
//         description: sampleEditData.description,
//         image_uids: sampleEditImages.map((img) => img.uid),
//         buyer_uids: sampleEditData.buyers?.map((b: any) => b.uid) || [],
//         project_uids: sampleEditData.projects?.map((p: any) => p.uid) || [],
//         note_uids: sampleEditData.notes?.map((n: any) => n.uid) || [],
//       }

//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//         method: "PUT",
//         body: JSON.stringify(submitData),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update sample")
//       }

//       toast({ title: "Success", description: "Sample updated successfully" })
//       setSampleEditModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update sample", variant: "destructive" })
//     } finally {
//       setSampleIsSaving(false)
//     }
//   }

//   const handleSampleDeleteClick = (sample: Sample) => {
//     setSelectedSample(sample)
//     setSampleDeleteConfirmModal(true)
//     setSampleMenuOpen(null)
//   }

//   const handleSampleConfirmDelete = async () => {
//     if (!selectedSample || !currentParentUid) return
//     setSampleIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete sample")
//       }

//       toast({ title: "Success", description: "Sample deleted successfully" })
//       setSampleDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete sample", variant: "destructive" })
//     } finally {
//       setSampleIsDeleting(false)
//     }
//   }

//   const handleSampleImageRemove = (imageUid: string) => {
//     setSampleEditImages((prev) => prev.filter((img) => img.uid !== imageUid))
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="mb-6 sm:mb-8 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           {parentStack.length > 0 && (
//             <button onClick={handleBackClick} className="p-2 hover:bg-muted rounded-lg transition">
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//           )}
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
//               {parentStack.length > 0 ? parentStack[parentStack.length - 1].name : "Storage Spaces"}
//             </h1>
//             {parentStack.length > 1 && (
//               <p className="text-xs sm:text-sm text-muted-foreground mt-1">
//                 Previous: {parentStack[parentStack.length - 2]?.name}
//               </p>
//             )}
//             <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage your storage spaces and samples</p>
//           </div>
//         </div>
//       </div>

//       {/* Add Buttons */}
//       <div className="flex gap-2 mb-6 sm:mb-8 flex-wrap">
//         <Link href={`/space/add${currentParentUid ? `?parent_uid=${currentParentUid}` : ""}`}>
//           <Button className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
//             <Plus className="w-4 h-4" />
//             Add Space
//           </Button>
//         </Link>
//         {currentParentUid && (
//           <Link href={`/sample/add?storage_uid=${currentParentUid}`}>
//             <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent">
//               <Plus className="w-4 h-4" />
//               Add Sample
//             </Button>
//           </Link>
//         )}
//       </div>

//       {isLoading ? (
//         <div className="flex items-center justify-center py-12">
//           <Loader2 className="w-8 h-8 animate-spin text-primary" />
//         </div>
//       ) : (
//         <>
//           {/* Spaces Grid */}
//           {spaces.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Spaces</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
//                 {spaces.map((space) => (
//                   <Card
//                     key={space.uid}
//                     className="border-border hover:shadow-lg transition-all overflow-hidden cursor-pointer group"
//                   >
//                     <div className="relative h-48 bg-muted overflow-hidden" onClick={() => handleSpaceCardClick(space)}>
//                       {space.image ? (
//                         <img
//                           src={space.image || "/placeholder.svg"}
//                           alt={space.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                       <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-lg">
//                         <FolderOpen className="w-5 h-5 text-white" />
//                       </div>
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{space.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {space.description || "No description"}
//                       </p>

//                       <div className="relative mb-4">
//                         <button
//                           onClick={() => setMenuOpen(menuOpen === space.uid ? null : space.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-muted-foreground" />
//                         </button>
//                         {menuOpen === space.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
//                             <button
//                               onClick={() => handleEditClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleEditClick(space)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleDeleteClick(space)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {samples.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Samples</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                 {samples.map((sample) => (
//                   <Card key={sample.uid} className="border-border hover:shadow-lg transition-all overflow-hidden">
//                     <div className="relative h-48 bg-muted overflow-hidden">
//                       {sample.images && sample.images.length > 0 ? (
//                         <img
//                           src={sample.images[0].file || "/placeholder.svg"}
//                           alt={sample.name}
//                           className="w-full h-full object-cover hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{sample.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {sample.description || "No description"}
//                       </p>

//                       <div className="relative mb-4">
//                         <button
//                           onClick={() => setSampleMenuOpen(sampleMenuOpen === sample.uid ? null : sample.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-muted-foreground" />
//                         </button>
//                         {sampleMenuOpen === sample.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
//                             <button
//                               onClick={() => handleSampleEditClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleSampleDeleteClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleSampleEditClick(sample)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleSampleDeleteClick(sample)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {spaces.length === 0 && samples.length === 0 && (
//             <div className="text-center py-12">
//               <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//               <p className="text-muted-foreground">No spaces or samples found</p>
//             </div>
//           )}
//         </>
//       )}

//       {editModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Space - {selectedSpace.name}</CardTitle>
//               <button onClick={() => setEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Space Name</label>
//                   <input
//                     type="text"
//                     value={editFormData.name}
//                     onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                   <textarea
//                     value={editFormData.description}
//                     onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={3}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Image</label>
//                   {editImagePreview && (
//                     <div className="mb-3 relative">
//                       <img
//                         src={editImagePreview || "/placeholder.svg"}
//                         alt="Preview"
//                         className="w-full h-40 object-cover rounded-lg"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setEditImagePreview("")
//                           setEditImage(null)
//                         }}
//                         className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleSaveEdit}
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
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setEditModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {sampleEditModal && selectedSample && sampleEditData && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Sample - {selectedSample.name}</CardTitle>
//               <button onClick={() => setSampleEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               {sampleEditLoading ? (
//                 <div className="flex items-center justify-center py-6">
//                   <Loader2 className="w-6 h-6 animate-spin text-primary" />
//                 </div>
//               ) : (
//                 <div className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Sample Name</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.name}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, name: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                     <textarea
//                       value={sampleEditData.description}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, description: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                       rows={3}
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Style No</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.style_no}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, style_no: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">SKU No</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.sku_no}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, sku_no: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Item</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.item}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, item: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Color</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.color}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, color: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Fabrication</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.fabrication}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, fabrication: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Weight</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.weight}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, weight: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Comments</label>
//                     <textarea
//                       value={sampleEditData.comments}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, comments: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                       rows={2}
//                     />
//                   </div>

//                   {sampleEditImages.length > 0 && (
//                     <div>
//                       <label className="text-sm font-medium text-foreground block mb-2">
//                         Images ({sampleEditImages.length})
//                       </label>
//                       <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                         {sampleEditImages.map((img) => (
//                           <div key={img.uid} className="relative group">
//                             <img
//                               src={img.file || "/placeholder.svg"}
//                               alt="sample"
//                               className="w-full h-24 object-cover rounded-lg border border-border"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => handleSampleImageRemove(img.uid)}
//                               className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded opacity-0 group-hover:opacity-100 transition"
//                             >
//                               <X className="w-3 h-3" />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                     <Button
//                       onClick={handleSampleSaveEdit}
//                       disabled={sampleIsSaving}
//                       className="flex-1 bg-primary hover:bg-primary/90 text-white"
//                     >
//                       {sampleIsSaving ? (
//                         <>
//                           <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                           Updating...
//                         </>
//                       ) : (
//                         "Update"
//                       )}
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="flex-1 bg-transparent"
//                       onClick={() => setSampleEditModal(false)}
//                     >
//                       Cancel
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {deleteConfirmModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Space</CardTitle>
//               <button onClick={() => setDeleteConfirmModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete space "{selectedSpace.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleConfirmDelete}
//                   disabled={isDeleting}
//                   className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
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

//       {sampleDeleteConfirmModal && selectedSample && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Sample</CardTitle>
//               <button
//                 onClick={() => setSampleDeleteConfirmModal(false)}
//                 className="p-1 hover:bg-muted rounded flex-shrink-0"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete sample "{selectedSample.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleSampleConfirmDelete}
//                   disabled={sampleIsDeleting}
//                   className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
//                 >
//                   {sampleIsDeleting ? (
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
//                   onClick={() => setSampleDeleteConfirmModal(false)}
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
// import { Plus, Trash2, Edit2, FolderOpen, ChevronLeft, X, Loader2, MoreVertical } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { apiCall } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// interface Space {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   status: string
//   type: string
//   company: number
//   created_by: number
//   parent: string | null
// }

// interface Sample {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   storage_uid: string
//   images?: Array<{ id: number; file: string }>
// }

// export default function SpacePage() {
//   const { toast } = useToast()
//   const router = useRouter()
//   const [spaces, setSpaces] = useState<Space[]>([])
//   const [samples, setSamples] = useState<Sample[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [parentStack, setParentStack] = useState<Array<{ uid: string; name: string }>>([])
//   const [currentParentUid, setCurrentParentUid] = useState<string | null>(null)

//   // Modals
//   const [editModal, setEditModal] = useState(false)
//   const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
//   const [sampleEditModal, setSampleEditModal] = useState(false)
//   const [sampleDeleteConfirmModal, setSampleDeleteConfirmModal] = useState(false)
//   const [menuOpen, setMenuOpen] = useState<string | null>(null)
//   const [sampleMenuOpen, setSampleMenuOpen] = useState<string | null>(null)
//   const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
//   const [selectedSample, setSelectedSample] = useState<Sample | null>(null)
//   const [sampleViewModal, setSampleViewModal] = useState(false)
//   const [sampleUploadingImages, setSampleUploadingImages] = useState(false)

//   // Edit form
//   const [editFormData, setEditFormData] = useState({ name: "", description: "" })
//   const [editImage, setEditImage] = useState<File | null>(null)
//   const [editImagePreview, setEditImagePreview] = useState<string>("")
//   const [isSaving, setIsSaving] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)

//   // Sample edit
//   const [sampleEditData, setSampleEditData] = useState<any>(null)
//   const [sampleEditImages, setSampleEditImages] = useState<any[]>([])
//   const [sampleIsSaving, setSampleIsSaving] = useState(false)
//   const [sampleIsDeleting, setSampleIsDeleting] = useState(false)
//   const [sampleEditLoading, setSampleEditLoading] = useState(false)

//   useEffect(() => {
//     fetchSpacesAndSamples()
//   }, [currentParentUid])

//   const fetchSpacesAndSamples = async () => {
//     setIsLoading(true)
//     try {
//       const spacesUrl = currentParentUid
//         ? `/sample_manager/storage/?type=SPACE&parent_uid=${currentParentUid}`
//         : `/sample_manager/storage/?type=SPACE`

//       const spacesResponse = await apiCall(spacesUrl)
//       if (spacesResponse.ok) {
//         const spacesData = await spacesResponse.json()
//         setSpaces(Array.isArray(spacesData) ? spacesData : spacesData.results || [])
//       }

//       if (currentParentUid) {
//         const samplesResponse = await apiCall(`/sample_manager/sample/${currentParentUid}`)
//         if (samplesResponse.ok) {
//           const samplesData = await samplesResponse.json()
//           setSamples(Array.isArray(samplesData) ? samplesData : samplesData.results || [])
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err)
//       toast({
//         title: "Error",
//         description: "Failed to fetch spaces and samples",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSpaceCardClick = (space: Space) => {
//     setParentStack([...parentStack, { uid: space.uid, name: space.name }])
//     setCurrentParentUid(space.uid)
//   }

//   const handleBackClick = () => {
//     if (parentStack.length > 0) {
//       const newStack = parentStack.slice(0, -1)
//       setParentStack(newStack)
//       setCurrentParentUid(newStack.length > 0 ? newStack[newStack.length - 1].uid : null)
//     }
//   }

//   const handleEditClick = async (space: Space) => {
//     setSelectedSpace(space)
//     try {
//       const response = await apiCall(`/sample_manager/storage/${space.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setEditFormData({ name: data.name, description: data.description })
//         if (data.image) {
//           setEditImagePreview(data.image)
//         }
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load space details", variant: "destructive" })
//     }
//     setEditModal(true)
//     setMenuOpen(null)
//   }

//   const handleSaveEdit = async () => {
//     if (!selectedSpace || !editFormData.name) return
//     setIsSaving(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", editFormData.name)
//       formData.append("description", editFormData.description)
//       formData.append("type", "SPACE")
//       if (editImage) {
//         formData.append("image", editImage)
//       }
//       if (currentParentUid) {
//         formData.append("parent_uid", currentParentUid)
//       }

//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, {
//         method: "PUT",
//         body: formData,
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update space")
//       }

//       toast({ title: "Success", description: "Space updated successfully" })
//       setEditModal(false)
//       setEditImage(null)
//       setEditImagePreview("")
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update space", variant: "destructive" })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleDeleteClick = (space: Space) => {
//     setSelectedSpace(space)
//     setDeleteConfirmModal(true)
//     setMenuOpen(null)
//   }

//   const handleConfirmDelete = async () => {
//     if (!selectedSpace) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, { method: "DELETE" })

//       if (!response.ok) {
//         throw new Error("Failed to delete space")
//       }

//       toast({ title: "Success", description: "Space deleted successfully" })
//       setDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete space", variant: "destructive" })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setEditImage(file)
//       const reader = new FileReader()
//       reader.onload = (e) => setEditImagePreview(e.target?.result as string)
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSampleEditClick = async (sample: Sample) => {
//     setSelectedSample(sample)
//     setSampleEditLoading(true)
//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${sample.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setSampleEditData(data)
//         setSampleEditImages(data.images || [])
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
//     } finally {
//       setSampleEditLoading(false)
//     }
//     setSampleEditModal(true)
//     setSampleMenuOpen(null)
//   }

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
//           const quality = 0.9

//           if (width > 1920 || height > 1920) {
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

//   const handleSampleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.currentTarget.files
//     if (!files) return

//     setSampleUploadingImages(true)
//     try {
//       for (let i = 0; i < files.length; i++) {
//         const file = files[i]
//         const compressedBlob = await compressImage(file)

//         const formDataUpload = new FormData()
//         formDataUpload.append("file", new File([compressedBlob], file.name, { type: "image/jpeg" }))

//         const response = await apiCall("/sample_manager/images/", {
//           method: "POST",
//           body: formDataUpload,
//           headers: {},
//         })

//         if (!response.ok) {
//           throw new Error("Failed to upload image")
//         }

//         const data = await response.json()
//         const imagePreview = URL.createObjectURL(compressedBlob)

//         setSampleEditImages((prev) => [...prev, { uid: data.uid, file: imagePreview, id: data.id }])
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
//       setSampleUploadingImages(false)
//     }
//   }

//   const handleSampleSaveEdit = async () => {
//     if (!selectedSample || !currentParentUid || !sampleEditData) return
//     setSampleIsSaving(true)

//     try {
//       const submitData = {
//         arrival_date: sampleEditData.arrival_date,
//         style_no: sampleEditData.style_no,
//         sku_no: sampleEditData.sku_no,
//         item: sampleEditData.item,
//         fabrication: sampleEditData.fabrication,
//         weight: sampleEditData.weight,
//         weight_type: sampleEditData.weight_type,
//         size_type: sampleEditData.size_type,
//         types: sampleEditData.types,
//         color: sampleEditData.color,
//         size: sampleEditData.size,
//         comments: sampleEditData.comments,
//         name: sampleEditData.name,
//         description: sampleEditData.description,
//         image_uids: sampleEditImages.map((img) => img.uid),
//         buyer_uids: sampleEditData.buyers?.map((b: any) => b.uid) || [],
//         project_uids: sampleEditData.projects?.map((p: any) => p.uid) || [],
//         note_uids: sampleEditData.notes?.map((n: any) => n.uid) || [],
//       }

//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//         method: "PUT",
//         body: JSON.stringify(submitData),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update sample")
//       }

//       toast({ title: "Success", description: "Sample updated successfully" })
//       setSampleEditModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update sample", variant: "destructive" })
//     } finally {
//       setSampleIsSaving(false)
//     }
//   }

//   const handleSampleDeleteClick = (sample: Sample) => {
//     setSelectedSample(sample)
//     setSampleDeleteConfirmModal(true)
//     setSampleMenuOpen(null)
//   }

//   const handleSampleConfirmDelete = async () => {
//     if (!selectedSample || !currentParentUid) return
//     setSampleIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete sample")
//       }

//       toast({ title: "Success", description: "Sample deleted successfully" })
//       setSampleDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete sample", variant: "destructive" })
//     } finally {
//       setSampleIsDeleting(false)
//     }
//   }

//   const handleSampleImageRemove = (imageUid: string) => {
//     setSampleEditImages((prev) => prev.filter((img) => img.uid !== imageUid))
//   }

//   const handleSampleViewClick = (sample: Sample) => {
//     setSelectedSample(sample)
//     setSampleViewModal(true)
//     setSampleMenuOpen(null)
//   }

//   const getBreadcrumbPath = () => {
//     if (parentStack.length === 0) return "Storage Spaces"
//     return parentStack.map((item) => item.name).join(" / ")
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="mb-6 sm:mb-8">
//         <div className="flex items-center gap-3">
//           {parentStack.length > 0 && (
//             <button onClick={handleBackClick} className="p-2 hover:bg-muted rounded-lg transition flex-shrink-0">
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//           )}
//           <div className="flex-1">
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
//               {parentStack.length > 0 ? parentStack[parentStack.length - 1].name : "Storage Spaces"}
//             </h1>
//             <p className="text-xs sm:text-sm text-muted-foreground mt-1">{getBreadcrumbPath()}</p>
//             <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage your storage spaces and samples</p>
//           </div>
//         </div>
//       </div>

//       {/* Add Buttons */}
//       <div className="flex gap-2 mb-6 sm:mb-8 flex-wrap">
//         <Link href={`/space/add${currentParentUid ? `?parent_uid=${currentParentUid}` : ""}`}>
//           <Button className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
//             <Plus className="w-4 h-4" />
//             Add Space
//           </Button>
//         </Link>
//         {currentParentUid && (
//           <Link href={`/sample/add?storage_uid=${currentParentUid}`}>
//             <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent">
//               <Plus className="w-4 h-4" />
//               Add Sample
//             </Button>
//           </Link>
//         )}
//       </div>

//       {isLoading ? (
//         <div className="flex items-center justify-center py-12">
//           <Loader2 className="w-8 h-8 animate-spin text-primary" />
//         </div>
//       ) : (
//         <>
//           {/* Spaces Grid */}
//           {spaces.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Spaces</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
//                 {spaces.map((space) => (
//                   <Card
//                     key={space.uid}
//                     className="border-border hover:shadow-lg transition-all overflow-hidden cursor-pointer group"
//                   >
//                     <div className="relative h-48 bg-muted overflow-hidden" onClick={() => handleSpaceCardClick(space)}>
//                       {space.image ? (
//                         <img
//                           src={space.image || "/placeholder.svg"}
//                           alt={space.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                       <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-lg">
//                         <FolderOpen className="w-5 h-5 text-white" />
//                       </div>
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{space.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {space.description || "No description"}
//                       </p>

//                       <div className="relative mb-4">
//                         <button
//                           onClick={() => setMenuOpen(menuOpen === space.uid ? null : space.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-muted-foreground" />
//                         </button>
//                         {menuOpen === space.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
//                             <button
//                               onClick={() => handleEditClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleEditClick(space)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleDeleteClick(space)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {samples.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Samples</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                 {samples.map((sample) => (
//                   <Card key={sample.uid} className="border-border hover:shadow-lg transition-all overflow-hidden">
//                     <div
//                       className="relative h-48 bg-muted overflow-hidden cursor-pointer"
//                       onClick={() => handleSampleViewClick(sample)}
//                     >
//                       {sample.images && sample.images.length > 0 ? (
//                         <img
//                           src={sample.images[0].file || "/placeholder.svg"}
//                           alt={sample.name}
//                           className="w-full h-full object-cover hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{sample.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {sample.description || "No description"}
//                       </p>

//                       <div className="relative mb-4">
//                         <button
//                           onClick={() => setSampleMenuOpen(sampleMenuOpen === sample.uid ? null : sample.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-muted-foreground" />
//                         </button>
//                         {sampleMenuOpen === sample.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
//                             <button
//                               onClick={() => handleSampleViewClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               View
//                             </button>
//                             <button
//                               onClick={() => handleSampleEditClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleSampleDeleteClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleSampleViewClick(sample)}
//                         >
//                           <FolderOpen className="w-3 sm:w-4 h-3 sm:h-4" />
//                           View
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleSampleEditClick(sample)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleSampleDeleteClick(sample)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {spaces.length === 0 && samples.length === 0 && (
//             <div className="text-center py-12">
//               <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//               <p className="text-foreground font-semibold mb-2">No spaces or samples yet</p>
//               <p className="text-sm text-muted-foreground mb-4">Create your first space to get started</p>
//             </div>
//           )}
//         </>
//       )}

//       {/* Space Edit Modal */}
//       {editModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Space - {selectedSpace.name}</CardTitle>
//               <button onClick={() => setEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Space Name</label>
//                   <input
//                     type="text"
//                     value={editFormData.name}
//                     onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                   <textarea
//                     value={editFormData.description}
//                     onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={3}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Image</label>
//                   {editImagePreview && (
//                     <div className="mb-3 relative">
//                       <img
//                         src={editImagePreview || "/placeholder.svg"}
//                         alt="Preview"
//                         className="w-full h-40 object-cover rounded-lg"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setEditImagePreview("")
//                           setEditImage(null)
//                         }}
//                         className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleSaveEdit}
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
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setEditModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {sampleEditModal && selectedSample && sampleEditData && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Sample - {selectedSample.name}</CardTitle>
//               <button onClick={() => setSampleEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               {sampleEditLoading ? (
//                 <div className="flex items-center justify-center py-6">
//                   <Loader2 className="w-6 h-6 animate-spin text-primary" />
//                 </div>
//               ) : (
//                 <div className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Sample Name</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.name}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, name: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                     <textarea
//                       value={sampleEditData.description}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, description: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                       rows={3}
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Style No</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.style_no}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, style_no: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">SKU No</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.sku_no}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, sku_no: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Item</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.item}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, item: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Color</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.color}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, color: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Fabrication</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.fabrication}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, fabrication: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Weight</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.weight}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, weight: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Comments</label>
//                     <textarea
//                       value={sampleEditData.comments}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, comments: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                       rows={2}
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Upload Images</label>
//                     <input
//                       type="file"
//                       multiple
//                       onChange={handleSampleImageUpload}
//                       disabled={sampleUploadingImages}
//                       accept="image/*"
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                     {sampleUploadingImages && <p className="text-xs text-muted-foreground mt-2">Uploading images...</p>}
//                   </div>

//                   {sampleEditImages.length > 0 && (
//                     <div>
//                       <label className="text-sm font-medium text-foreground block mb-2">
//                         Images ({sampleEditImages.length})
//                       </label>
//                       <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                         {sampleEditImages.map((img) => (
//                           <div key={img.uid} className="relative group">
//                             <img
//                               src={img.file || "/placeholder.svg"}
//                               alt="sample"
//                               className="w-full h-24 object-cover rounded-lg border border-border"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => handleSampleImageRemove(img.uid)}
//                               className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded opacity-0 group-hover:opacity-100 transition"
//                             >
//                               <X className="w-3 h-3" />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                     <Button
//                       onClick={handleSampleSaveEdit}
//                       disabled={sampleIsSaving}
//                       className="flex-1 bg-primary hover:bg-primary/90 text-white"
//                     >
//                       {sampleIsSaving ? (
//                         <>
//                           <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                           Updating...
//                         </>
//                       ) : (
//                         "Update"
//                       )}
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="flex-1 bg-transparent"
//                       onClick={() => setSampleEditModal(false)}
//                     >
//                       Cancel
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {sampleViewModal && selectedSample && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Sample Details - {selectedSample.name}</CardTitle>
//               <button onClick={() => setSampleViewModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               {selectedSample && (
//                 <div className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Name</label>
//                     <p className="text-sm text-foreground bg-muted p-3 rounded-lg">{selectedSample.name}</p>
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                     <p className="text-sm text-foreground bg-muted p-3 rounded-lg">
//                       {selectedSample.description || "No description"}
//                     </p>
//                   </div>

//                   {selectedSample.images && selectedSample.images.length > 0 && (
//                     <div>
//                       <label className="text-sm font-medium text-foreground block mb-2">
//                         Images ({selectedSample.images.length})
//                       </label>
//                       <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                         {selectedSample.images.map((img) => (
//                           <img
//                             key={img.id}
//                             src={img.file || "/placeholder.svg"}
//                             alt="sample"
//                             className="w-full h-24 object-cover rounded-lg border border-border"
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex gap-2 pt-4 border-t border-border">
//                     <Button
//                       onClick={() => {
//                         setSampleViewModal(false)
//                         handleSampleEditClick(selectedSample)
//                       }}
//                       className="flex-1 bg-primary hover:bg-primary/90 text-white"
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="flex-1 bg-transparent"
//                       onClick={() => setSampleViewModal(false)}
//                     >
//                       Close
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {deleteConfirmModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Space</CardTitle>
//               <button onClick={() => setDeleteConfirmModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete space "{selectedSpace.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleConfirmDelete}
//                   disabled={isDeleting}
//                   className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
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

//       {sampleDeleteConfirmModal && selectedSample && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Sample</CardTitle>
//               <button
//                 onClick={() => setSampleDeleteConfirmModal(false)}
//                 className="p-1 hover:bg-muted rounded flex-shrink-0"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete sample "{selectedSample.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleSampleConfirmDelete}
//                   disabled={sampleIsDeleting}
//                   className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
//                 >
//                   {sampleIsDeleting ? (
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
//                   onClick={() => setSampleDeleteConfirmModal(false)}
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
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Plus, Trash2, Edit2, FolderOpen, ChevronLeft, X, Loader2, MoreVertical, Upload, RectangleHorizontal } from "lucide-react"

// import { useToast } from "@/hooks/use-toast"
// import { apiCall, getCookie } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuCheckboxItem,
// } from "@/components/ui/dropdown-menu"
// import { ChevronDown } from "lucide-react"

// interface Space {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   status: string
//   type: string
//   company: number
//   created_by: number
//   parent: string | null
// }

// interface Sample {
//   id: number
//   uid: string
//   name: string
//   description: string
//   image: string | null
//   storage_uid: string
//   images?: Array<{ id: number; uid: string; file: string }>
// }

// interface Buyer {
//   id: number
//   uid: string
//   name: string
// }

// interface Project {
//   id: number
//   uid: string
//   name: string
// }

// interface Note {
//   id: number
//   uid: string
//   title: string
// }

// interface ImageUploadModalProps {
//   isOpen: boolean
//   onClose: () => void
//   existingImages: Array<{ uid: string; file: string }>
//   onImagesUpload: (uids: string[]) => void
// }

// function SampleImageUploadModal({ isOpen, onClose, existingImages, onImagesUpload }: ImageUploadModalProps) {
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
//     const allImageUids = uploadedImages.map((img) => img.uid)
//     if (allImageUids.length > 0) {
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
//             <h2 className="text-xl font-bold text-foreground">Manage Sample Images</h2>
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
//               id="sample-image-input-update"
//             />
//             <label htmlFor="sample-image-input-update">
//               <Button
//                 asChild
//                 disabled={isUploading}
//                 className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
//               >
//                 <span>{isUploading ? "Uploading..." : "Select Images"}</span>
//               </Button>
//             </label>
//             <p className="text-xs text-muted-foreground mt-2">Images will be auto-compressed to under 999KB</p>
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

// export default function SpacePage() {
//   const { toast } = useToast()
//   const router = useRouter()
//   const [spaces, setSpaces] = useState<Space[]>([])
//   const [samples, setSamples] = useState<Sample[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [parentStack, setParentStack] = useState<Array<{ uid: string; name: string }>>([])
//   const [currentParentUid, setCurrentParentUid] = useState<string | null>(null)

//   // Modals
//   const [editModal, setEditModal] = useState(false)
//   const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
//   const [sampleEditModal, setSampleEditModal] = useState(false)
//   const [sampleDeleteConfirmModal, setSampleDeleteConfirmModal] = useState(false)
//   const [imageUploadOpen, setImageUploadOpen] = useState(false)
//   const [menuOpen, setMenuOpen] = useState<string | null>(null)
//   const [sampleMenuOpen, setSampleMenuOpen] = useState<string | null>(null)
//   const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
//   const [selectedSample, setSelectedSample] = useState<Sample | null>(null)
//   const [sampleDetailsModal, setSampleDetailsModal] = useState(false)
//   const [sampleDetails, setSampleDetails] = useState<any>(null)
//   const [sampleDetailsLoading, setSampleDetailsLoading] = useState(false)

//   // Edit form
//   const [editFormData, setEditFormData] = useState({ name: "", description: "" })
//   const [editImage, setEditImage] = useState<File | null>(null)
//   const [editImagePreview, setEditImagePreview] = useState<string>("")
//   const [isSaving, setIsSaving] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)

//   // Sample edit
//   const [sampleEditData, setSampleEditData] = useState<any>(null)
//   const [sampleEditImages, setSampleEditImages] = useState<any[]>([])
//   const [sampleIsSaving, setSampleIsSaving] = useState(false)
//   const [sampleIsDeleting, setSampleIsDeleting] = useState(false)
//   const [sampleEditLoading, setSampleEditLoading] = useState(false)

//   // Sample data
//   const [buyers, setBuyers] = useState<Buyer[]>([])
//   const [projects, setProjects] = useState<Project[]>([])
//   const [notes, setNotes] = useState<Note[]>([])

//   useEffect(() => {
//     fetchSpacesAndSamples()
//     fetchDropdownData()
//   }, [currentParentUid])

//   const fetchDropdownData = async () => {
//     try {
//       const [buyersRes, projectsRes, notesRes] = await Promise.all([
//         apiCall("/sample_manager/buyer/"),
//         apiCall("/sample_manager/project/"),
//         apiCall("/sample_manager/note/"),
//       ])

//       if (buyersRes.ok) {
//         const buyersData = await buyersRes.json()
//         setBuyers(Array.isArray(buyersData) ? buyersData : buyersData.results || [])
//       }

//       if (projectsRes.ok) {
//         const projectsData = await projectsRes.json()
//         setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
//       }

//       if (notesRes.ok) {
//         const notesData = await notesRes.json()
//         setNotes(Array.isArray(notesData) ? notesData : notesData.results || [])
//       }
//     } catch (err) {
//       console.error("Error fetching dropdown data:", err)
//     }
//   }

//   const fetchSpacesAndSamples = async () => {
//     setIsLoading(true)
//     try {
//       const spacesUrl = currentParentUid
//         ? `/sample_manager/storage/?type=SPACE&parent_uid=${currentParentUid}`
//         : `/sample_manager/storage/?type=SPACE`

//       const spacesResponse = await apiCall(spacesUrl)
//       if (spacesResponse.ok) {
//         const spacesData = await spacesResponse.json()
//         setSpaces(Array.isArray(spacesData) ? spacesData : spacesData.results || [])
//       }

//       if (currentParentUid) {
//         const samplesResponse = await apiCall(`/sample_manager/sample/${currentParentUid}`)
//         if (samplesResponse.ok) {
//           const samplesData = await samplesResponse.json()
//           setSamples(Array.isArray(samplesData) ? samplesData : samplesData.results || [])
//         }
//       } else {
//         setSamples([]) // Clear samples if not in a specific space
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err)
//       toast({
//         title: "Error",
//         description: "Failed to fetch spaces and samples",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSpaceCardClick = (space: Space) => {
//     setParentStack([...parentStack, { uid: space.uid, name: space.name }])
//     setCurrentParentUid(space.uid)
//   }

//   const handleBackClick = () => {
//     if (parentStack.length > 0) {
//       const newStack = parentStack.slice(0, -1)
//       setParentStack(newStack)
//       setCurrentParentUid(newStack.length > 0 ? newStack[newStack.length - 1].uid : null)
//       setSamples([])
//     }
//   }

//   const handleEditClick = async (space: Space) => {
//     setSelectedSpace(space)
//     try {
//       const response = await apiCall(`/sample_manager/storage/${space.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setEditFormData({ name: data.name, description: data.description })
//         if (data.image) {
//           setEditImagePreview(data.image)
//         }
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load space details", variant: "destructive" })
//     }
//     setEditModal(true)
//     setMenuOpen(null)
//   }

//   const handleSaveEdit = async () => {
//     if (!selectedSpace || !editFormData.name) return
//     setIsSaving(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", editFormData.name)
//       formData.append("description", editFormData.description)
//       formData.append("type", "SPACE")
//       if (editImage) {
//         formData.append("image", editImage)
//       }
//       if (currentParentUid) {
//         formData.append("parent_uid", currentParentUid)
//       }

//       // const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, {
//       //   method: "PUT",
//       //   body: formData,
//       // })

// const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/storage/${selectedSpace.uid}`, {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${getCookie("access_token")}`,
//           },
//           body: formData,
//         })


//       if (!response.ok) {
//         throw new Error("Failed to update space")
//       }

//       const data = await response.json()

//       toast({ title: "Success", description: "Space updated successfully" })
//       setEditModal(false)
//       setEditImage(null)
//       setEditImagePreview("")
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update space", variant: "destructive" })
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleDeleteClick = (space: Space) => {
//     setSelectedSpace(space)
//     setDeleteConfirmModal(true)
//     setMenuOpen(null)
//   }

//   const handleConfirmDelete = async () => {
//     if (!selectedSpace) return
//     setIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, { method: "DELETE" })

//       if (!response.ok) {
//         throw new Error("Failed to delete space")
//       }

//       toast({ title: "Success", description: "Space deleted successfully" })
//       setDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete space", variant: "destructive" })
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setEditImage(file)
//       const reader = new FileReader()
//       reader.onload = (e) => setEditImagePreview(e.target?.result as string)
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSampleEditClick = async (sample: Sample) => {
//     setSelectedSample(sample)
//     setSampleEditLoading(true)
//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${sample.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setSampleEditData(data)
//         setSampleEditImages(data.images || [])
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
//     } finally {
//       setSampleEditLoading(false)
//     }
//     setSampleEditModal(true)
//     setSampleMenuOpen(null)
//   }

//   const handleSampleSaveEdit = async () => {
//     if (!selectedSample || !currentParentUid || !sampleEditData) return
//     setSampleIsSaving(true)

//     try {
//       const submitData = {
//         arrival_date: sampleEditData.arrival_date,
//         style_no: sampleEditData.style_no,
//         sku_no: sampleEditData.sku_no,
//         item: sampleEditData.item,
//         fabrication: sampleEditData.fabrication,
//         weight: sampleEditData.weight,
//         weight_type: sampleEditData.weight_type,
//         size_type: sampleEditData.size_type,
//         types: sampleEditData.types,
//         color: sampleEditData.color,
//         size: sampleEditData.size,
//         comments: sampleEditData.comments,
//         name: sampleEditData.name,
//         description: sampleEditData.description,
//         image_uids: sampleEditImages.map((img) => img.uid),
//         buyer_uids: sampleEditData.buyers?.map((b: any) => b.uid) || [],
//         project_uids: sampleEditData.projects?.map((p: any) => p.uid) || [],
//         note_uids: sampleEditData.notes?.map((n: any) => n.uid) || [],
//         storage_uid: currentParentUid,
//       }

//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//         method: "PUT",
//         body: JSON.stringify(submitData),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update sample")
//       }

//       toast({ title: "Success", description: "Sample updated successfully" })
//       setSampleEditModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update sample", variant: "destructive" })
//     } finally {
//       setSampleIsSaving(false)
//     }
//   }

//   const handleSampleDeleteClick = (sample: Sample) => {
//     setSelectedSample(sample)
//     setSampleDeleteConfirmModal(true)
//     setSampleMenuOpen(null)
//   }

//   const handleSampleConfirmDelete = async () => {
//     if (!selectedSample || !currentParentUid) return
//     setSampleIsDeleting(true)

//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete sample")
//       }

//       toast({ title: "Success", description: "Sample deleted successfully" })
//       setSampleDeleteConfirmModal(false)
//       fetchSpacesAndSamples()
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete sample", variant: "destructive" })
//     } finally {
//       setSampleIsDeleting(false)
//     }
//   }

//   const handleSampleImageRemove = (imageUid: string) => {
//     setSampleEditImages((prev) => prev.filter((img) => img.uid !== imageUid))
//   }

//   const handleSampleImagesUpload = (uids: string[]) => {
//     const newImages = uids.map((uid) => {
//       const existingImage = sampleEditImages.find((img) => img.uid === uid)
//       return existingImage || { uid, file: "" }
//     })
//     setSampleEditImages(newImages)
//   }

//   const handleSampleDetailsClick = async (sample: Sample) => {
//     setSampleDetailsLoading(true)
//     try {
//       const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${sample.uid}`)
//       if (response.ok) {
//         const data = await response.json()
//         setSampleDetails(data)
//       } else {
//         toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
//     } finally {
//       setSampleDetailsLoading(false)
//       setSampleDetailsModal(true)
//     }
//   }

//   const getBreadcrumbPath = () => {
//     if (parentStack.length === 0) return "Storage Spaces"
//     const names = parentStack.map((item) => item.name)
//     return names.join(" / ")
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="mb-6 sm:mb-8 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           {parentStack.length > 0 && (
//             <button onClick={handleBackClick} className="p-2 hover:bg-muted rounded-lg transition">
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//           )}
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
//               {parentStack.length > 0 ? parentStack[parentStack.length - 1].name : "Storage Spaces"}
//             </h1>
//             <p className="text-xs sm:text-sm text-muted-foreground mt-1">
//               {parentStack.length > 1 && `Path: ${getBreadcrumbPath()}`}
//             </p>
//             <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage your storage spaces and samples</p>
//           </div>
//         </div>
//       </div>

//       {/* Add Buttons */}
//       <div className="flex gap-2 mb-6 sm:mb-8 flex-wrap">
//         <Link href={`/space/add${currentParentUid ? `?parent_uid=${currentParentUid}` : ""}`}>
//           <Button className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
//             <Plus className="w-4 h-4" />
//             Add Space
//           </Button>
//         </Link>
//         {currentParentUid && (
//           <Link href={`/sample/add?storage_uid=${currentParentUid}`}>
//             <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent">
//               <Plus className="w-4 h-4" />
//               Add Sample
//             </Button>
//           </Link>
//         )}
//       </div>

//       {isLoading ? (
//         <div className="flex items-center justify-center py-12">
//           <Loader2 className="w-8 h-8 animate-spin text-primary" />
//         </div>
//       ) : (
//         <>
//           {/* Spaces Grid */}
//           {spaces.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Spaces</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
//                 {spaces.map((space) => (
//                   <Card
//                     key={space.uid}
//                     className="border-border hover:shadow-lg transition-all overflow-hidden cursor-pointer group"
//                   >
//                     <div className="relative h-48 bg-muted overflow-hidden" onClick={() => handleSpaceCardClick(space)}>
//                       {space.image ? (
//                         <img
//                           src={space.image || "/placeholder.svg"}
//                           alt={space.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <FolderOpen className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                       <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-lg">
//                         <FolderOpen className="w-5 h-5 text-white" />
//                       </div>
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{space.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {space.description || "No description"}
//                       </p>

//                       <div className="relative mb-4">
//                         {/* <button
//                           onClick={() => setMenuOpen(menuOpen === space.uid ? null : space.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-muted-foreground" />
//                         </button> */}
//                         {menuOpen === space.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
//                             <button
//                               onClick={() => handleEditClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteClick(space)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleEditClick(space)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleDeleteClick(space)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {samples.length > 0 && (
//             <div>
//               <h2 className="text-lg font-semibold text-foreground mb-4">Samples</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                 {samples.map((sample) => (
//                   <Card key={sample.uid} className="border-border hover:shadow-lg transition-all overflow-hidden cursor-pointer"
//                   >
//                     <div className="relative h-48 bg-muted overflow-hidden" onClick={() => handleSampleDetailsClick(sample)}>
//                       {sample.images && sample.images.length > 0 ? (
//                         <img
//                           src={sample.images[0].file || "/placeholder.svg"}
//                           alt={sample.name}
//                           className="w-full h-full object-cover hover:scale-105 transition-transform"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-muted">
//                           <RectangleHorizontal className="w-12 h-12 text-muted-foreground" />
//                         </div>
//                       )}
//                     </div>

//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base sm:text-lg line-clamp-1">{sample.name}</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                       <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
//                         {sample.description || "No description"}
//                       </p>

//                       <div className="relative mb-4">
//                         {/* <button
//                           onClick={() => setSampleMenuOpen(sampleMenuOpen === sample.uid ? null : sample.uid)}
//                           className="p-2 hover:bg-muted rounded-full transition"
//                         >
//                           <MoreVertical className="w-4 h-4 text-muted-foreground" />
//                         </button> */}
//                         {sampleMenuOpen === sample.uid && (
//                           <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
//                             <button
//                               onClick={() => handleSampleEditClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleSampleDeleteClick(sample)}
//                               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex gap-2 pt-4 border-t border-border">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleSampleEditClick(sample)}
//                         >
//                           <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
//                           onClick={() => handleSampleDeleteClick(sample)}
//                         >
//                           <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
//                           Delete
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {spaces.length === 0 && samples.length === 0 && (
//             <div className="text-center py-12">
//               <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//               <p className="text-muted-foreground">No spaces or samples found</p>
//             </div>
//           )}
//         </>
//       )}

//       {/* Existing modals */}
//       {editModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Space - {selectedSpace.name}</CardTitle>
//               <button onClick={() => setEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Space Name</label>
//                   <input
//                     type="text"
//                     value={editFormData.name}
//                     onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                   <textarea
//                     value={editFormData.description}
//                     onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     rows={3}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Image</label>
//                   {editImagePreview && (
//                     <div className="mb-3 relative">
//                       <img
//                         src={editImagePreview || "/placeholder.svg"}
//                         alt="Preview"
//                         className="w-full h-40 object-cover rounded-lg"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setEditImagePreview("")
//                           setEditImage(null)
//                         }}
//                         className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                   <Button
//                     onClick={handleSaveEdit}
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
//                   <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setEditModal(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {sampleEditModal && selectedSample && sampleEditData && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[100vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl">Edit Sample - {selectedSample.name}</CardTitle>
//               <button onClick={() => setSampleEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               {sampleEditLoading ? (
//                 <div className="flex items-center justify-center py-6">
//                   <Loader2 className="w-6 h-6 animate-spin text-primary" />
//                 </div>
//               ) : (
//                 <div className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Sample Name</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.name}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, name: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//                     <textarea
//                       value={sampleEditData.description}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, description: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                       rows={3}
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Style No</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.style_no}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, style_no: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">SKU No</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.sku_no}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, sku_no: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Item</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.item}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, item: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Color</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.color}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, color: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Fabrication</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.fabrication}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, fabrication: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Weight</label>
//                     <input
//                       type="text"
//                       value={sampleEditData.weight}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, weight: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Comments</label>
//                     <textarea
//                       value={sampleEditData.comments}
//                       onChange={(e) => setSampleEditData({ ...sampleEditData, comments: e.target.value })}
//                       className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                       rows={2}
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Buyers</label>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <button
//                           type="button"
//                           className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground text-left flex items-center justify-between hover:bg-muted/30 transition focus:outline-none focus:ring-2 focus:ring-primary"
//                         >
//                           <span
//                             className={sampleEditData.buyers?.length > 0 ? "text-foreground" : "text-muted-foreground"}
//                           >
//                             {sampleEditData.buyers?.length > 0
//                               ? `${sampleEditData.buyers.length} buyer(s) selected`
//                               : "Select buyers..."}
//                           </span>
//                           <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//                         </button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="start" className="w-56">
//                         {buyers.length > 0 ? (
//                           <div>
//                             {buyers.map((buyer) => (
//                               <DropdownMenuCheckboxItem
//                                 key={buyer.uid}
//                                 checked={sampleEditData.buyers?.some((b: any) => b.uid === buyer.uid)}
//                                 onCheckedChange={() => {
//                                   const current = sampleEditData.buyers || []
//                                   const isSelected = current.some((b: any) => b.uid === buyer.uid)
//                                   setSampleEditData({
//                                     ...sampleEditData,
//                                     buyers: isSelected
//                                       ? current.filter((b: any) => b.uid !== buyer.uid)
//                                       : [...current, buyer],
//                                   })
//                                 }}
//                               >
//                                 {buyer.name}
//                               </DropdownMenuCheckboxItem>
//                             ))}
//                           </div>
//                         ) : (
//                           <div className="p-2 text-sm text-muted-foreground">No buyers available</div>
//                         )}
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Projects</label>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <button
//                           type="button"
//                           className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground text-left flex items-center justify-between hover:bg-muted/30 transition focus:outline-none focus:ring-2 focus:ring-primary"
//                         >
//                           <span
//                             className={
//                               sampleEditData.projects?.length > 0 ? "text-foreground" : "text-muted-foreground"
//                             }
//                           >
//                             {sampleEditData.projects?.length > 0
//                               ? `${sampleEditData.projects.length} project(s) selected`
//                               : "Select projects..."}
//                           </span>
//                           <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//                         </button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="start" className="w-56">
//                         {projects.length > 0 ? (
//                           <div>
//                             {projects.map((project) => (
//                               <DropdownMenuCheckboxItem
//                                 key={project.uid}
//                                 checked={sampleEditData.projects?.some((p: any) => p.uid === project.uid)}
//                                 onCheckedChange={() => {
//                                   const current = sampleEditData.projects || []
//                                   const isSelected = current.some((p: any) => p.uid === project.uid)
//                                   setSampleEditData({
//                                     ...sampleEditData,
//                                     projects: isSelected
//                                       ? current.filter((p: any) => p.uid !== project.uid)
//                                       : [...current, project],
//                                   })
//                                 }}
//                               >
//                                 {project.name}
//                               </DropdownMenuCheckboxItem>
//                             ))}
//                           </div>
//                         ) : (
//                           <div className="p-2 text-sm text-muted-foreground">No projects available</div>
//                         )}
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">Notes</label>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <button
//                           type="button"
//                           className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground text-left flex items-center justify-between hover:bg-muted/30 transition focus:outline-none focus:ring-2 focus:ring-primary"
//                         >
//                           <span
//                             className={sampleEditData.notes?.length > 0 ? "text-foreground" : "text-muted-foreground"}
//                           >
//                             {sampleEditData.notes?.length > 0
//                               ? `${sampleEditData.notes.length} note(s) selected`
//                               : "Select notes..."}
//                           </span>
//                           <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//                         </button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="start" className="w-56">
//                         {notes.length > 0 ? (
//                           <div>
//                             {notes.map((note) => (
//                               <DropdownMenuCheckboxItem
//                                 key={note.uid}
//                                 checked={sampleEditData.notes?.some((n: any) => n.uid === note.uid)}
//                                 onCheckedChange={() => {
//                                   const current = sampleEditData.notes || []
//                                   const isSelected = current.some((n: any) => n.uid === note.uid)
//                                   setSampleEditData({
//                                     ...sampleEditData,
//                                     notes: isSelected
//                                       ? current.filter((n: any) => n.uid !== note.uid)
//                                       : [...current, note],
//                                   })
//                                 }}
//                               >
//                                 {note.title}
//                               </DropdownMenuCheckboxItem>
//                             ))}
//                           </div>
//                         ) : (
//                           <div className="p-2 text-sm text-muted-foreground">No notes available</div>
//                         )}
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-foreground block mb-2">
//                       Sample Images ({sampleEditImages.length})
//                     </label>
//                     <Button
//                       type="button"
//                       onClick={() => setImageUploadOpen(true)}
//                       className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
//                     >
//                       <Upload className="w-4 h-4" />
//                       Manage Images
//                     </Button>
//                   </div>

//                   {sampleEditImages.length > 0 && (
//                     <div>
//                       <label className="text-sm font-medium text-foreground block mb-2">
//                         Current Images ({sampleEditImages.length})
//                       </label>
//                       <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                         {sampleEditImages.map((img) => (
//                           <div key={img.uid} className="relative group">
//                             <img
//                               src={img.file || "/placeholder.svg"}
//                               alt="sample"
//                               className="w-full h-24 object-cover rounded-lg border border-border"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => handleSampleImageRemove(img.uid)}
//                               className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded opacity-0 group-hover:opacity-100 transition"
//                             >
//                               <X className="w-3 h-3" />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//                     <Button
//                       onClick={handleSampleSaveEdit}
//                       disabled={sampleIsSaving}
//                       className="flex-1 bg-primary hover:bg-primary/90 text-white"
//                     >
//                       {sampleIsSaving ? (
//                         <>
//                           <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                           Updating...
//                         </>
//                       ) : (
//                         "Update"
//                       )}
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="flex-1 bg-transparent"
//                       onClick={() => setSampleEditModal(false)}
//                     >
//                       Cancel
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       <SampleImageUploadModal
//         isOpen={imageUploadOpen}
//         onClose={() => setImageUploadOpen(false)}
//         existingImages={sampleEditImages}
//         onImagesUpload={handleSampleImagesUpload}
//       />

//       {sampleDetailsModal && sampleDetails && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3 sticky top-0 bg-background">
//               <CardTitle className="text-lg sm:text-xl">{sampleDetails.name}</CardTitle>
//               <button onClick={() => setSampleDetailsModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>

//             <CardContent className="pt-4 space-y-4">
//               {sampleDetailsLoading ? (
//                 <div className="flex items-center justify-center py-8">
//                   <div className="w-8 h-8 border-2 border-muted-foreground border-t-foreground rounded-full animate-spin"></div>
//                 </div>
//               ) : (
//                 <>
//                   {/* Images Section */}
//                   {sampleDetails.images && sampleDetails.images.length > 0 && (
//                     <div>
//                       <h3 className="font-semibold text-foreground mb-2">Images</h3>
//                       <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//                         {sampleDetails.images.map((image: any) => (
//                           <img
//                             key={image.uid}
//                             src={image.file || "/placeholder.svg"}
//                             alt={image.file_name}
//                             className="w-full h-32 object-cover rounded border border-border"
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Basic Information */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-t border-b border-border">
//                     <div>
//                       <label className="text-xs font-semibold text-muted-foreground uppercase">Style No</label>
//                       <p className="text-foreground">{sampleDetails.style_no || "-"}</p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-semibold text-muted-foreground uppercase">SKU No</label>
//                       <p className="text-foreground">{sampleDetails.sku_no || "-"}</p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-semibold text-muted-foreground uppercase">Item</label>
//                       <p className="text-foreground">{sampleDetails.item || "-"}</p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-semibold text-muted-foreground uppercase">Fabrication</label>
//                       <p className="text-foreground">{sampleDetails.fabrication || "-"}</p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-semibold text-muted-foreground uppercase">Color</label>
//                       <p className="text-foreground">{sampleDetails.color || "-"}</p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-semibold text-muted-foreground uppercase">Size</label>
//                       <p className="text-foreground">{sampleDetails.size || "-"}</p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-semibold text-muted-foreground uppercase">Weight</label>
//                       <p className="text-foreground">
//                         {sampleDetails.weight} {sampleDetails.weight_type || "-"}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-semibold text-muted-foreground uppercase">Size Type</label>
//                       <p className="text-foreground">{sampleDetails.size_type || "-"}</p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-semibold text-muted-foreground uppercase">Type</label>
//                       <p className="text-foreground">{sampleDetails.types || "-"}</p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-semibold text-muted-foreground uppercase">Arrival Date</label>
//                       <p className="text-foreground">
//                         {sampleDetails.arrival_date ? new Date(sampleDetails.arrival_date).toLocaleDateString() : "-"}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Description */}
//                   {sampleDetails.description && (
//                     <div>
//                       <label className="text-xs font-semibold text-muted-foreground uppercase">Description</label>
//                       <p className="text-foreground text-sm">{sampleDetails.description}</p>
//                     </div>
//                   )}

//                   {/* Comments */}
//                   {sampleDetails.comments && (
//                     <div>
//                       <label className="text-xs font-semibold text-muted-foreground uppercase">Comments</label>
//                       <p className="text-foreground text-sm">{sampleDetails.comments}</p>
//                     </div>
//                   )}

//                   {/* Buyers Section */}
//                   {sampleDetails.buyers && sampleDetails.buyers.length > 0 && (
//                     <div>
//                       <label className="text-xs font-semibold text-muted-foreground uppercase">Buyers</label>
//                       <div className="flex flex-wrap gap-2 mt-1">
//                         {sampleDetails.buyers.map((buyer: any) => (
//                           <div key={buyer.uid} className="bg-muted px-2 py-1 rounded text-xs text-foreground">
//                             {buyer.name || buyer.uid}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Projects Section */}
//                   {sampleDetails.projects && sampleDetails.projects.length > 0 && (
//                     <div>
//                       <label className="text-xs font-semibold text-muted-foreground uppercase">Projects</label>
//                       <div className="flex flex-wrap gap-2 mt-1">
//                         {sampleDetails.projects.map((project: any) => (
//                           <div key={project.uid} className="bg-muted px-2 py-1 rounded text-xs text-foreground">
//                             {project.name || project.uid}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Notes Section */}
//                   {sampleDetails.notes && sampleDetails.notes.length > 0 && (
//                     <div>
//                       <label className="text-xs font-semibold text-muted-foreground uppercase">Notes</label>
//                       <div className="space-y-1 mt-1">
//                         {sampleDetails.notes.map((note: any) => (
//                           <div key={note.uid} className="bg-muted p-2 rounded text-xs text-foreground">
//                             {note.title || note.uid}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Status */}
//                   <div className="pt-4 border-t border-border">
//                     <label className="text-xs font-semibold text-muted-foreground uppercase mr-2">Status</label>
//                     <p className="text-foreground inline-block bg-muted px-2 py-1 rounded text-sm">
//                       {sampleDetails.status || "-"}
//                     </p>
//                   </div>
//                 </>
//               )}
//             </CardContent>

//             <CardFooter className="border-t border-border flex justify-end gap-2">
//               <Button variant="outline" onClick={() => setSampleDetailsModal(false)}>
//                 Close
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>
//       )}

//       {/* Delete Confirmation Modals */}
//       {deleteConfirmModal && selectedSpace && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Space</CardTitle>
//               <button onClick={() => setDeleteConfirmModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete space "{selectedSpace.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleConfirmDelete}
//                   disabled={isDeleting}
//                   className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
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

//       {sampleDeleteConfirmModal && selectedSample && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg">Delete Sample</CardTitle>
//               <button
//                 onClick={() => setSampleDeleteConfirmModal(false)}
//                 className="p-1 hover:bg-muted rounded flex-shrink-0"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <p className="text-sm text-foreground mb-6">
//                 Are you sure you want to delete sample "{selectedSample.name}"? This action cannot be undone.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button
//                   onClick={handleSampleConfirmDelete}
//                   disabled={sampleIsDeleting}
//                   className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
//                 >
//                   {sampleIsDeleting ? (
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
//                   onClick={() => setSampleDeleteConfirmModal(false)}
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
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, CreditCard as Edit2, FolderOpen, ChevronLeft, X, Loader2, MoreVertical, Upload, RectangleHorizontal } from "lucide-react"

import { useToast } from "@/hooks/use-toast"
import { apiCall, getCookie } from "@/lib/auth-utils"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface Space {
  id: number
  uid: string
  name: string
  description: string
  image: string | null
  status: string
  type: string
  company: number
  created_by: number
  parent: string | null
}

interface Sample {
  id: number
  uid: string
  name: string
  description: string
  image: string | null
  storage_uid: string
  images?: Array<{ id: number; uid: string; file: string }>
}

interface Buyer {
  id: number
  uid: string
  name: string
}

interface Project {
  id: number
  uid: string
  name: string
}

interface Note {
  id: number
  uid: string
  title: string
}

interface ImageUploadModalProps {
  isOpen: boolean
  onClose: () => void
  existingImages: Array<{ uid: string; file: string }>
  onImagesUpload: (uids: string[]) => void
}

function SampleImageUploadModal({ isOpen, onClose, existingImages, onImagesUpload }: ImageUploadModalProps) {
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
            (canvas.toBlob((blob) => {}, "image/jpeg", quality),
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
    const allImageUids = uploadedImages.map((img) => img.uid)
    if (allImageUids.length > 0) {
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
            <h2 className="text-xl font-bold text-foreground">Manage Sample Images</h2>
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
              id="sample-image-input-update"
            />
            <label htmlFor="sample-image-input-update">
              <Button
                asChild
                disabled={isUploading}
                className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
              >
                <span>{isUploading ? "Uploading..." : "Select Images"}</span>
              </Button>
            </label>
            <p className="text-xs text-muted-foreground mt-2">Images will be auto-compressed to under 999KB</p>
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

export default function SpacePage() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Read currentParentUid from URL parameters
  const urlCurrentParentUid = searchParams.get("currentParentUid")
  
  const [spaces, setSpaces] = useState<Space[]>([])
  const [samples, setSamples] = useState<Sample[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [parentStack, setParentStack] = useState<Array<{ uid: string; name: string }>>([])
  const [currentParentUid, setCurrentParentUid] = useState<string | null>(urlCurrentParentUid)

  // Modals
  const [editModal, setEditModal] = useState(false)
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
  const [sampleEditModal, setSampleEditModal] = useState(false)
  const [sampleDeleteConfirmModal, setSampleDeleteConfirmModal] = useState(false)
  const [imageUploadOpen, setImageUploadOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const [sampleMenuOpen, setSampleMenuOpen] = useState<string | null>(null)
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null)
  const [sampleDetailsModal, setSampleDetailsModal] = useState(false)
  const [sampleDetails, setSampleDetails] = useState<any>(null)
  const [sampleDetailsLoading, setSampleDetailsLoading] = useState(false)

  // Edit form
  const [editFormData, setEditFormData] = useState({ name: "", description: "" })
  const [editImage, setEditImage] = useState<File | null>(null)
  const [editImagePreview, setEditImagePreview] = useState<string>("")
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Sample edit
  const [sampleEditData, setSampleEditData] = useState<any>(null)
  const [sampleEditImages, setSampleEditImages] = useState<any[]>([])
  const [sampleIsSaving, setSampleIsSaving] = useState(false)
  const [sampleIsDeleting, setSampleIsDeleting] = useState(false)
  const [sampleEditLoading, setSampleEditLoading] = useState(false)

  // Sample data
  const [buyers, setBuyers] = useState<Buyer[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [notes, setNotes] = useState<Note[]>([])

  // Build parent stack when currentParentUid is set from URL
  useEffect(() => {
    const buildParentStack = async () => {
      if (urlCurrentParentUid && parentStack.length === 1) {
        try {
          // Fetch the current space details to build the parent stack
          const response = await apiCall(`/sample_manager/storage/${urlCurrentParentUid}`)
          if (response.ok) {
            const spaceData = await response.json()
            // For simplicity, just add this space to the stack
            // In a real implementation, you'd want to fetch the full hierarchy
            setParentStack([{ uid: spaceData.uid, name: spaceData.name }])
          }
        } catch (err) {
          console.error("Error building parent stack:", err)
        }
      }
    }

    buildParentStack()
  }, [urlCurrentParentUid, parentStack.length])

  useEffect(() => {
    fetchSpacesAndSamples()
    fetchDropdownData()
  }, [currentParentUid])

  const fetchDropdownData = async () => {
    try {
      const [buyersRes, projectsRes, notesRes] = await Promise.all([
        apiCall("/sample_manager/buyer/"),
        apiCall("/sample_manager/project/"),
        apiCall("/sample_manager/note/"),
      ])

      if (buyersRes.ok) {
        const buyersData = await buyersRes.json()
        setBuyers(Array.isArray(buyersData) ? buyersData : buyersData.results || [])
      }

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json()
        setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
      }

      if (notesRes.ok) {
        const notesData = await notesRes.json()
        setNotes(Array.isArray(notesData) ? notesData : notesData.results || [])
      }
    } catch (err) {
      console.error("Error fetching dropdown data:", err)
    }
  }

  const fetchSpacesAndSamples = async () => {
    setIsLoading(true)
    try {
      const spacesUrl = currentParentUid
        ? `/sample_manager/storage/?type=SPACE&parent_uid=${currentParentUid}`
        : `/sample_manager/storage/?type=SPACE`

      const spacesResponse = await apiCall(spacesUrl)
      if (spacesResponse.ok) {
        const spacesData = await spacesResponse.json()
        setSpaces(Array.isArray(spacesData) ? spacesData : spacesData.results || [])
      }

      if (currentParentUid) {
        const samplesResponse = await apiCall(`/sample_manager/sample/${currentParentUid}`)
        if (samplesResponse.ok) {
          const samplesData = await samplesResponse.json()
          setSamples(Array.isArray(samplesData) ? samplesData : samplesData.results || [])
        }
      } else {
        setSamples([]) // Clear samples if not in a specific space
      }
    } catch (err) {
      console.error("Error fetching data:", err)
      toast({
        title: "Error",
        description: "Failed to fetch spaces and samples",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSpaceCardClick = (space: Space) => {
    setParentStack([...parentStack, { uid: space.uid, name: space.name }])
    setCurrentParentUid(space.uid)
    // Update URL to maintain the current state
    const newUrl = `/space?currentParentUid=${space.uid}`
    router.push(newUrl)
  }

  const handleBackClick = () => {
    if (parentStack.length > 0) {
      const newStack = parentStack.slice(0, -1)
      setParentStack(newStack)
      const newParentUid = newStack.length > 0 ? newStack[newStack.length - 1].uid : null
      setCurrentParentUid(newParentUid)
      setSamples([])
      
      // Update URL to reflect the new state
      const newUrl = newParentUid ? `/space?currentParentUid=${newParentUid}` : '/space'
      router.push(newUrl)
    }
  }

  const handleEditClick = async (space: Space) => {
    setSelectedSpace(space)
    try {
      const response = await apiCall(`/sample_manager/storage/${space.uid}`)
      if (response.ok) {
        const data = await response.json()
        setEditFormData({ name: data.name, description: data.description })
        if (data.image) {
          setEditImagePreview(data.image)
        }
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to load space details", variant: "destructive" })
    }
    setEditModal(true)
    setMenuOpen(null)
  }

  const handleSaveEdit = async () => {
    if (!selectedSpace || !editFormData.name) return
    setIsSaving(true)

    try {
      const formData = new FormData()
      formData.append("name", editFormData.name)
      formData.append("description", editFormData.description)
      formData.append("type", "SPACE")
      if (editImage) {
        formData.append("image", editImage)
      }
      if (currentParentUid) {
        formData.append("parent_uid", currentParentUid)
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/storage/${selectedSpace.uid}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${getCookie("access_token")}`,
          },
          body: formData,
        })

      if (!response.ok) {
        throw new Error("Failed to update space")
      }

      const data = await response.json()

      toast({ title: "Success", description: "Space updated successfully" })
      setEditModal(false)
      setEditImage(null)
      setEditImagePreview("")
      fetchSpacesAndSamples()
    } catch (err) {
      toast({ title: "Error", description: "Failed to update space", variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteClick = (space: Space) => {
    setSelectedSpace(space)
    setDeleteConfirmModal(true)
    setMenuOpen(null)
  }

  const handleConfirmDelete = async () => {
    if (!selectedSpace) return
    setIsDeleting(true)

    try {
      const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, { method: "DELETE" })

      if (!response.ok) {
        throw new Error("Failed to delete space")
      }

      toast({ title: "Success", description: "Space deleted successfully" })
      setDeleteConfirmModal(false)
      fetchSpacesAndSamples()
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete space", variant: "destructive" })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setEditImage(file)
      const reader = new FileReader()
      reader.onload = (e) => setEditImagePreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSampleEditClick = async (sample: Sample) => {
    setSelectedSample(sample)
    setSampleEditLoading(true)
    try {
      const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${sample.uid}`)
      if (response.ok) {
        const data = await response.json()
        setSampleEditData(data)
        setSampleEditImages(data.images || [])
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
    } finally {
      setSampleEditLoading(false)
    }
    setSampleEditModal(true)
    setSampleMenuOpen(null)
  }

  const handleSampleSaveEdit = async () => {
    if (!selectedSample || !currentParentUid || !sampleEditData) return
    setSampleIsSaving(true)

    try {
      const submitData = {
        arrival_date: sampleEditData.arrival_date,
        style_no: sampleEditData.style_no,
        sku_no: sampleEditData.sku_no,
        item: sampleEditData.item,
        fabrication: sampleEditData.fabrication,
        weight: sampleEditData.weight,
        weight_type: sampleEditData.weight_type,
        size_type: sampleEditData.size_type,
        types: sampleEditData.types,
        color: sampleEditData.color,
        size: sampleEditData.size,
        comments: sampleEditData.comments,
        name: sampleEditData.name,
        description: sampleEditData.description,
        image_uids: sampleEditImages.map((img) => img.uid),
        buyer_uids: sampleEditData.buyers?.map((b: any) => b.uid) || [],
        project_uids: sampleEditData.projects?.map((p: any) => p.uid) || [],
        note_uids: sampleEditData.notes?.map((n: any) => n.uid) || [],
        storage_uid: currentParentUid,
      }

      const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
        method: "PUT",
        body: JSON.stringify(submitData),
      })

      if (!response.ok) {
        throw new Error("Failed to update sample")
      }

      toast({ title: "Success", description: "Sample updated successfully" })
      setSampleEditModal(false)
      fetchSpacesAndSamples()
    } catch (err) {
      toast({ title: "Error", description: "Failed to update sample", variant: "destructive" })
    } finally {
      setSampleIsSaving(false)
    }
  }

  const handleSampleDeleteClick = (sample: Sample) => {
    setSelectedSample(sample)
    setSampleDeleteConfirmModal(true)
    setSampleMenuOpen(null)
  }

  const handleSampleConfirmDelete = async () => {
    if (!selectedSample || !currentParentUid) return
    setSampleIsDeleting(true)

    try {
      const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${selectedSample.uid}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete sample")
      }

      toast({ title: "Success", description: "Sample deleted successfully" })
      setSampleDeleteConfirmModal(false)
      fetchSpacesAndSamples()
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete sample", variant: "destructive" })
    } finally {
      setSampleIsDeleting(false)
    }
  }

  const handleSampleImageRemove = (imageUid: string) => {
    setSampleEditImages((prev) => prev.filter((img) => img.uid !== imageUid))
  }

  const handleSampleImagesUpload = (uids: string[]) => {
    const newImages = uids.map((uid) => {
      const existingImage = sampleEditImages.find((img) => img.uid === uid)
      return existingImage || { uid, file: "" }
    })
    setSampleEditImages(newImages)
  }

  const handleSampleDetailsClick = async (sample: Sample) => {
    setSampleDetailsLoading(true)
    try {
      const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${sample.uid}`)
      if (response.ok) {
        const data = await response.json()
        setSampleDetails(data)
      } else {
        toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
    } finally {
      setSampleDetailsLoading(false)
      setSampleDetailsModal(true)
    }
  }

   const getBreadcrumbText = () => {
    if (parentStack.length === 0) return "Storage Spaces"
    return parentStack.map((item) => item.name).join(" / ")
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
      <div className="mb-6 sm:mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {parentStack.length > 0 && (
            <button onClick={handleBackClick} className="p-2 hover:bg-muted rounded-lg transition">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {/* <div>
            {/* <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {parentStack.length > 0 ? parentStack[parentStack.length - 1].name : "Storage Spaces"}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {parentStack.length > 0 && `Path: ${getBreadcrumbPath()}`}
            </p>

            <span className="cursor-pointer hover:text-foreground" onClick={() => setCurrentParentUid(null)}>
          Storage Spaces
        </span>
        {parentStack.map((space, index) => (
          <div key={space.uid} className="flex items-center gap-2">
            <span>/</span>
            <span
              className="cursor-pointer hover:text-foreground"
              onClick={() => {
                const newStack = parentStack.slice(0, index + 1)
                setParentStack(newStack)
                setCurrentParentUid(newStack[newStack.length - 1].uid)
              }}
            >
              {space.name}
            </span>
          </div>
        ))}
            <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage your storage spaces and samples</p>
          </div> */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {getBreadcrumbText()}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">
              {parentStack.length > 0
                ? "Manage spaces and samples in this location"
                : "Manage your storage spaces and samples"}
            </p>
            {parentStack.length > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                Path: {parentStack.map((item) => item.name).join(" > ")}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Add Buttons */}
      <div className="flex gap-2 mb-6 sm:mb-8 flex-wrap">
        <Link href={`/space/add${currentParentUid ? `?parent_uid=${currentParentUid}` : ""}`}>
          <Button className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add Space
          </Button>
        </Link>
        {currentParentUid && (
          <Link href={`/sample/add?storage_uid=${currentParentUid}`}>
            <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent">
              <Plus className="w-4 h-4" />
              Add Sample
            </Button>
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Spaces Grid */}
          {spaces.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Spaces</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {spaces.map((space) => (
                  <Card
                    key={space.uid}
                    className="border-border hover:shadow-lg transition-all overflow-hidden cursor-pointer group"
                  >
                    <div className="relative h-48 bg-muted overflow-hidden" onClick={() => handleSpaceCardClick(space)}>
                      {space.image ? (
                        <img
                          src={space.image || "/placeholder.svg"}
                          alt={space.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <FolderOpen className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-lg">
                        <FolderOpen className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-base sm:text-lg line-clamp-1">{space.name}</CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                        {space.description || "No description"}
                      </p>

                      <div className="relative mb-4">
                        {menuOpen === space.uid && (
                          <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
                            <button
                              onClick={() => handleEditClick(space)}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
                            >
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteClick(space)}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-border">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
                          onClick={() => handleEditClick(space)}
                        >
                          <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
                          onClick={() => handleDeleteClick(space)}
                        >
                          <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {samples.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Samples</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {samples.map((sample) => (
                  <Card key={sample.uid} className="border-border hover:shadow-lg transition-all overflow-hidden cursor-pointer"
                  >
                    <div className="relative h-48 bg-muted overflow-hidden" onClick={() => handleSampleDetailsClick(sample)}>
                      {sample.images && sample.images.length > 0 ? (
                        <img
                          src={sample.images[0].file || "/placeholder.svg"}
                          alt={sample.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <RectangleHorizontal className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-base sm:text-lg line-clamp-1">{sample.name}</CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                        {sample.description || "No description"}
                      </p>

                      <div className="relative mb-4">
                        {sampleMenuOpen === sample.uid && (
                          <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10">
                            <button
                              onClick={() => handleSampleEditClick(sample)}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
                            >
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleSampleDeleteClick(sample)}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-border">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
                          onClick={() => handleSampleEditClick(sample)}
                        >
                          <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
                          onClick={() => handleSampleDeleteClick(sample)}
                        >
                          <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {spaces.length === 0 && samples.length === 0 && (
            <div className="text-center py-12">
              <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No spaces or samples found</p>
            </div>
          )}
        </>
      )}

      {/* Existing modals */}
      {editModal && selectedSpace && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-lg sm:text-xl">Edit Space - {selectedSpace.name}</CardTitle>
              <button onClick={() => setEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Space Name</label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Description</label>
                  <textarea
                    value={editFormData.description}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Image</label>
                  {editImagePreview && (
                    <div className="mb-3 relative">
                      <img
                        src={editImagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setEditImagePreview("")
                          setEditImage(null)
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                  <Button
                    onClick={handleSaveEdit}
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
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setEditModal(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {sampleEditModal && selectedSample && sampleEditData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl border-border max-h-[100vh] overflow-y-auto">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-lg sm:text-xl">Edit Sample - {selectedSample.name}</CardTitle>
              <button onClick={() => setSampleEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              {sampleEditLoading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : (
                <div className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Sample Name</label>
                    <input
                      type="text"
                      value={sampleEditData.name}
                      onChange={(e) => setSampleEditData({ ...sampleEditData, name: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Description</label>
                    <textarea
                      value={sampleEditData.description}
                      onChange={(e) => setSampleEditData({ ...sampleEditData, description: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Style No</label>
                    <input
                      type="text"
                      value={sampleEditData.style_no}
                      onChange={(e) => setSampleEditData({ ...sampleEditData, style_no: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">SKU No</label>
                    <input
                      type="text"
                      value={sampleEditData.sku_no}
                      onChange={(e) => setSampleEditData({ ...sampleEditData, sku_no: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Item</label>
                    <input
                      type="text"
                      value={sampleEditData.item}
                      onChange={(e) => setSampleEditData({ ...sampleEditData, item: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Color</label>
                    <input
                      type="text"
                      value={sampleEditData.color}
                      onChange={(e) => setSampleEditData({ ...sampleEditData, color: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Fabrication</label>
                    <input
                      type="text"
                      value={sampleEditData.fabrication}
                      onChange={(e) => setSampleEditData({ ...sampleEditData, fabrication: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Weight</label>
                    <input
                      type="text"
                      value={sampleEditData.weight}
                      onChange={(e) => setSampleEditData({ ...sampleEditData, weight: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Comments</label>
                    <textarea
                      value={sampleEditData.comments}
                      onChange={(e) => setSampleEditData({ ...sampleEditData, comments: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Buyers</label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground text-left flex items-center justify-between hover:bg-muted/30 transition focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <span
                            className={sampleEditData.buyers?.length > 0 ? "text-foreground" : "text-muted-foreground"}
                          >
                            {sampleEditData.buyers?.length > 0
                              ? `${sampleEditData.buyers.length} buyer(s) selected`
                              : "Select buyers..."}
                          </span>
                          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56">
                        {buyers.length > 0 ? (
                          <div>
                            {buyers.map((buyer) => (
                              <DropdownMenuCheckboxItem
                                key={buyer.uid}
                                checked={sampleEditData.buyers?.some((b: any) => b.uid === buyer.uid)}
                                onCheckedChange={() => {
                                  const current = sampleEditData.buyers || []
                                  const isSelected = current.some((b: any) => b.uid === buyer.uid)
                                  setSampleEditData({
                                    ...sampleEditData,
                                    buyers: isSelected
                                      ? current.filter((b: any) => b.uid !== buyer.uid)
                                      : [...current, buyer],
                                  })
                                }}
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
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Projects</label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground text-left flex items-center justify-between hover:bg-muted/30 transition focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <span
                            className={
                              sampleEditData.projects?.length > 0 ? "text-foreground" : "text-muted-foreground"
                            }
                          >
                            {sampleEditData.projects?.length > 0
                              ? `${sampleEditData.projects.length} project(s) selected`
                              : "Select projects..."}
                          </span>
                          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56">
                        {projects.length > 0 ? (
                          <div>
                            {projects.map((project) => (
                              <DropdownMenuCheckboxItem
                                key={project.uid}
                                checked={sampleEditData.projects?.some((p: any) => p.uid === project.uid)}
                                onCheckedChange={() => {
                                  const current = sampleEditData.projects || []
                                  const isSelected = current.some((p: any) => p.uid === project.uid)
                                  setSampleEditData({
                                    ...sampleEditData,
                                    projects: isSelected
                                      ? current.filter((p: any) => p.uid !== project.uid)
                                      : [...current, project],
                                  })
                                }}
                              >
                                {project.name}
                              </DropdownMenuCheckboxItem>
                            ))}
                          </div>
                        ) : (
                          <div className="p-2 text-sm text-muted-foreground">No projects available</div>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Notes</label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground text-left flex items-center justify-between hover:bg-muted/30 transition focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <span
                            className={sampleEditData.notes?.length > 0 ? "text-foreground" : "text-muted-foreground"}
                          >
                            {sampleEditData.notes?.length > 0
                              ? `${sampleEditData.notes.length} note(s) selected`
                              : "Select notes..."}
                          </span>
                          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56">
                        {notes.length > 0 ? (
                          <div>
                            {notes.map((note) => (
                              <DropdownMenuCheckboxItem
                                key={note.uid}
                                checked={sampleEditData.notes?.some((n: any) => n.uid === note.uid)}
                                onCheckedChange={() => {
                                  const current = sampleEditData.notes || []
                                  const isSelected = current.some((n: any) => n.uid === note.uid)
                                  setSampleEditData({
                                    ...sampleEditData,
                                    notes: isSelected
                                      ? current.filter((n: any) => n.uid !== note.uid)
                                      : [...current, note],
                                  })
                                }}
                              >
                                {note.title}
                              </DropdownMenuCheckboxItem>
                            ))}
                          </div>
                        ) : (
                          <div className="p-2 text-sm text-muted-foreground">No notes available</div>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Sample Images ({sampleEditImages.length})
                    </label>
                    <Button
                      type="button"
                      onClick={() => setImageUploadOpen(true)}
                      className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Manage Images
                    </Button>
                  </div>

                  {sampleEditImages.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">
                        Current Images ({sampleEditImages.length})
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {sampleEditImages.map((img) => (
                          <div key={img.uid} className="relative group">
                            <img
                              src={img.file || "/placeholder.svg"}
                              alt="sample"
                              className="w-full h-24 object-cover rounded-lg border border-border"
                            />
                            <button
                              type="button"
                              onClick={() => handleSampleImageRemove(img.uid)}
                              className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded opacity-0 group-hover:opacity-100 transition"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                    <Button
                      onClick={handleSampleSaveEdit}
                      disabled={sampleIsSaving}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white"
                    >
                      {sampleIsSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setSampleEditModal(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <SampleImageUploadModal
        isOpen={imageUploadOpen}
        onClose={() => setImageUploadOpen(false)}
        existingImages={sampleEditImages}
        onImagesUpload={handleSampleImagesUpload}
      />

      {sampleDetailsModal && sampleDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3 sticky top-0 bg-background">
              <CardTitle className="text-lg sm:text-xl">{sampleDetails.name}</CardTitle>
              <button onClick={() => setSampleDetailsModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>

            <CardContent className="pt-4 space-y-4">
              {sampleDetailsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-2 border-muted-foreground border-t-foreground rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  {/* Images Section */}
                  {sampleDetails.images && sampleDetails.images.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Images</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {sampleDetails.images.map((image: any) => (
                          <img
                            key={image.uid}
                            src={image.file || "/placeholder.svg"}
                            alt={image.file_name}
                            className="w-full h-32 object-cover rounded border border-border"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-t border-b border-border">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Style No</label>
                      <p className="text-foreground">{sampleDetails.style_no || "-"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase">SKU No</label>
                      <p className="text-foreground">{sampleDetails.sku_no || "-"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Item</label>
                      <p className="text-foreground">{sampleDetails.item || "-"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Fabrication</label>
                      <p className="text-foreground">{sampleDetails.fabrication || "-"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Color</label>
                      <p className="text-foreground">{sampleDetails.color || "-"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Size</label>
                      <p className="text-foreground">{sampleDetails.size || "-"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Weight</label>
                      <p className="text-foreground">
                        {sampleDetails.weight} {sampleDetails.weight_type || "-"}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Size Type</label>
                      <p className="text-foreground">{sampleDetails.size_type || "-"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Type</label>
                      <p className="text-foreground">{sampleDetails.types || "-"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Arrival Date</label>
                      <p className="text-foreground">
                        {sampleDetails.arrival_date ? new Date(sampleDetails.arrival_date).toLocaleDateString() : "-"}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  {sampleDetails.description && (
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Description</label>
                      <p className="text-foreground text-sm">{sampleDetails.description}</p>
                    </div>
                  )}

                  {/* Comments */}
                  {sampleDetails.comments && (
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Comments</label>
                      <p className="text-foreground text-sm">{sampleDetails.comments}</p>
                    </div>
                  )}

                  {/* Buyers Section */}
                  {sampleDetails.buyers && sampleDetails.buyers.length > 0 && (
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Buyers</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {sampleDetails.buyers.map((buyer: any) => (
                          <div key={buyer.uid} className="bg-muted px-2 py-1 rounded text-xs text-foreground">
                            {buyer.name || buyer.uid}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects Section */}
                  {sampleDetails.projects && sampleDetails.projects.length > 0 && (
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Projects</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {sampleDetails.projects.map((project: any) => (
                          <div key={project.uid} className="bg-muted px-2 py-1 rounded text-xs text-foreground">
                            {project.name || project.uid}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes Section */}
                  {sampleDetails.notes && sampleDetails.notes.length > 0 && (
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Notes</label>
                      <div className="space-y-1 mt-1">
                        {sampleDetails.notes.map((note: any) => (
                          <div key={note.uid} className="bg-muted p-2 rounded text-xs text-foreground">
                            {note.title || note.uid}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Status */}
                  <div className="pt-4 border-t border-border">
                    <label className="text-xs font-semibold text-muted-foreground uppercase mr-2">Status</label>
                    <p className="text-foreground inline-block bg-muted px-2 py-1 rounded text-sm">
                      {sampleDetails.status || "-"}
                    </p>
                  </div>
                </>
              )}
            </CardContent>

            <CardFooter className="border-t border-border flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSampleDetailsModal(false)}>
                Close
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modals */}
      {deleteConfirmModal && selectedSpace && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-border">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-lg">Delete Space</CardTitle>
              <button onClick={() => setDeleteConfirmModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-foreground mb-6">
                Are you sure you want to delete space "{selectedSpace.name}"? This action cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
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

      {sampleDeleteConfirmModal && selectedSample && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-border">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-lg">Delete Sample</CardTitle>
              <button
                onClick={() => setSampleDeleteConfirmModal(false)}
                className="p-1 hover:bg-muted rounded flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-foreground mb-6">
                Are you sure you want to delete sample "{selectedSample.name}"? This action cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleSampleConfirmDelete}
                  disabled={sampleIsDeleting}
                  className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
                >
                  {sampleIsDeleting ? (
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
                  onClick={() => setSampleDeleteConfirmModal(false)}
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