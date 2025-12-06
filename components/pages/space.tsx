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


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit2, FolderOpen, ChevronLeft, X, Loader2, MoreVertical } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { apiCall } from "@/lib/auth-utils"
import Link from "next/link"
import { useRouter } from "next/navigation"

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

interface SampleImage {
  id: number
  uid: string
  file: string
  file_name: string
}

interface SampleBuyer {
  id: number
  uid: string
  name: string
}

interface SampleProject {
  id: number
  uid: string
  name: string
}

interface SampleNote {
  id: number
  uid: string
  title: string
}

interface Sample {
  id: number
  uid: string
  name: string
  description: string
  style_no: string
  sku_no: string
  item: string
  fabrication: string
  weight: string
  color: string
  size: string
  comments: string
  arrival_date: string
  images: SampleImage[]
  buyers: SampleBuyer[]
  projects: SampleProject[]
  notes: SampleNote[]
}

export default function SpacePage() {
  const { toast } = useToast()
  const router = useRouter()
  const [spaces, setSpaces] = useState<Space[]>([])
  const [samples, setSamples] = useState<Sample[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [parentStack, setParentStack] = useState<Array<{ uid: string; name: string }>>([])
  const [currentParentUid, setCurrentParentUid] = useState<string | null>(null)

  // Modals
  const [editModal, setEditModal] = useState(false)
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
  const [sampleEditModal, setSampleEditModal] = useState(false)
  const [sampleDeleteConfirmModal, setSampleDeleteConfirmModal] = useState(false)
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const [sampleMenuOpen, setSampleMenuOpen] = useState<string | null>(null)
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null)

  // Edit form
  const [editFormData, setEditFormData] = useState({ name: "", description: "" })
  const [editImage, setEditImage] = useState<File | null>(null)
  const [editImagePreview, setEditImagePreview] = useState<string>("")
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Sample edit form
  const [sampleEditFormData, setSampleEditFormData] = useState({
    name: "",
    description: "",
    style_no: "",
    sku_no: "",
    item: "",
    fabrication: "",
    weight: "",
    color: "",
    size: "",
    comments: "",
    arrival_date: "",
  })
  const [selectedSampleBuyers, setSelectedSampleBuyers] = useState<string[]>([])
  const [selectedSampleProjects, setSelectedSampleProjects] = useState<string[]>([])
  const [selectedSampleNotes, setSelectedSampleNotes] = useState<string[]>([])
  const [buyers, setBuyers] = useState<SampleBuyer[]>([])
  const [projects, setProjects] = useState<SampleProject[]>([])
  const [notes, setNotes] = useState<SampleNote[]>([])
  const [isSavingSample, setIsSavingSample] = useState(false)
  const [isDeletingSample, setIsDeletingSample] = useState(false)

  useEffect(() => {
    fetchSpacesAndSamples()
  }, [currentParentUid])

  const fetchSpacesAndSamples = async () => {
    setIsLoading(true)
    try {
      // Fetch spaces
      const spacesUrl = currentParentUid
        ? `/sample_manager/storage/?type=SPACE&parent_uid=${currentParentUid}`
        : `/sample_manager/storage/?type=SPACE`

      const spacesResponse = await apiCall(spacesUrl)
      if (spacesResponse.ok) {
        const spacesData = await spacesResponse.json()
        setSpaces(Array.isArray(spacesData) ? spacesData : spacesData.results || [])
      }

      // Fetch samples if there's a current parent
      if (currentParentUid) {
        const samplesResponse = await apiCall(`/sample_manager/sample/${currentParentUid}`)
        if (samplesResponse.ok) {
          const samplesData = await samplesResponse.json()
          setSamples(Array.isArray(samplesData) ? samplesData : samplesData.results || [])
        }
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
  }

  const handleBackClick = () => {
    if (parentStack.length > 0) {
      const newStack = parentStack.slice(0, -1)
      setParentStack(newStack)
      setCurrentParentUid(newStack.length > 0 ? newStack[newStack.length - 1].uid : null)
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

      const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, {
        method: "PUT",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to update space")
      }

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

  const handleEditSampleClick = async (sample: Sample) => {
    setSelectedSample(sample)
    try {
      const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${sample.uid}`)
      if (response.ok) {
        const data = await response.json()
        setSampleEditFormData({
          name: data.name,
          description: data.description,
          style_no: data.style_no,
          sku_no: data.sku_no,
          item: data.item,
          fabrication: data.fabrication,
          weight: data.weight,
          color: data.color,
          size: data.size,
          comments: data.comments,
          arrival_date: data.arrival_date,
        })
        setSelectedSampleBuyers(data.buyers?.map((b: SampleBuyer) => b.uid) || [])
        setSelectedSampleProjects(data.projects?.map((p: SampleProject) => p.uid) || [])
        setSelectedSampleNotes(data.notes?.map((n: SampleNote) => n.uid) || [])

        // Fetch buyers, projects, and notes for the modal
        const buyersResp = await apiCall("/sample_manager/buyer/")
        if (buyersResp.ok) {
          const buyersData = await buyersResp.json()
          setBuyers(Array.isArray(buyersData) ? buyersData : buyersData.results || [])
        }

        const projectsResp = await apiCall("/sample_manager/project/")
        if (projectsResp.ok) {
          const projectsData = await projectsResp.json()
          setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
        }

        const notesResp = await apiCall("/sample_manager/note/")
        if (notesResp.ok) {
          const notesData = await notesResp.json()
          setNotes(Array.isArray(notesData) ? notesData : notesData.results || [])
        }
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
    }
    setSampleEditModal(true)
    setSampleMenuOpen(null)
  }

  const handleSaveSampleEdit = async () => {
    if (!selectedSample || !currentParentUid || !sampleEditFormData.name) return
    setIsSavingSample(true)

    try {
      const submitData = {
        ...sampleEditFormData,
        buyer_uids: selectedSampleBuyers,
        project_uids: selectedSampleProjects,
        note_uids: selectedSampleNotes,
        image_uids: selectedSample.images.map((img) => img.uid),
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
      setIsSavingSample(false)
    }
  }

  const handleDeleteSampleClick = (sample: Sample) => {
    setSelectedSample(sample)
    setSampleDeleteConfirmModal(true)
    setSampleMenuOpen(null)
  }

  const handleConfirmDeleteSample = async () => {
    if (!selectedSample || !currentParentUid) return
    setIsDeletingSample(true)

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
      setIsDeletingSample(false)
    }
  }

  const handleSampleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSampleEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSampleBuyerToggle = (buyerUid: string) => {
    setSelectedSampleBuyers((prev) =>
      prev.includes(buyerUid) ? prev.filter((uid) => uid !== buyerUid) : [...prev, buyerUid],
    )
  }

  const handleSampleProjectToggle = (projectUid: string) => {
    setSelectedSampleProjects((prev) =>
      prev.includes(projectUid) ? prev.filter((uid) => uid !== projectUid) : [...prev, projectUid],
    )
  }

  const handleSampleNoteToggle = (noteUid: string) => {
    setSelectedSampleNotes((prev) =>
      prev.includes(noteUid) ? prev.filter((uid) => uid !== noteUid) : [...prev, noteUid],
    )
  }

  const getBreadcrumbText = () => {
    if (parentStack.length === 0) return "Storage Spaces"
    return parentStack.map((item) => item.name).join(" > ")
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {parentStack.length > 0 && (
            <button onClick={handleBackClick} className="p-2 hover:bg-muted rounded-lg transition">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {parentStack.length > 0 ? parentStack[parentStack.length - 1].name : "Storage Spaces"}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">
              {parentStack.length > 0
                ? "Manage spaces and samples in this location"
                : "Manage your storage spaces and samples"}
            </p>
            {parentStack.length > 1 && (
              <p className="text-xs text-muted-foreground mt-1">
                Path: {parentStack.map((item) => item.name).join(" > ")}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Add Buttons */}
      <div className="flex gap-2 mb-6 sm:mb-8">
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
                        <button
                          onClick={() => setMenuOpen(menuOpen === space.uid ? null : space.uid)}
                          className="p-2 hover:bg-muted rounded-full transition"
                        >
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </button>
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

          {/* Samples Grid */}
          {samples.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Samples</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {samples.map((sample) => (
                  <Card key={sample.uid} className="border-border hover:shadow-lg transition-all overflow-hidden">
                    <div className="relative h-48 bg-muted overflow-hidden group cursor-pointer">
                      {sample.images && sample.images.length > 0 ? (
                        <img
                          src={sample.images[0].file || "/placeholder.svg"}
                          alt={sample.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <FolderOpen className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3 z-10">
                        <button
                          onClick={() => setSampleMenuOpen(sampleMenuOpen === sample.uid ? null : sample.uid)}
                          className="p-2 hover:bg-muted rounded-full transition"
                        >
                          <MoreVertical className="w-4 h-4 text-white bg-black/50 rounded-full p-1 w-6 h-6" />
                        </button>
                        {sampleMenuOpen === sample.uid && (
                          <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-20">
                            <button
                              onClick={() => handleEditSampleClick(sample)}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
                            >
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteSampleClick(sample)}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-base sm:text-lg line-clamp-1">{sample.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{sample.style_no && `Style: ${sample.style_no}`}</p>
                    </CardHeader>

                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                        {sample.description || "No description"}
                      </p>

                      <div className="flex gap-2 pt-4 border-t border-border">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
                          onClick={() => handleEditSampleClick(sample)}
                        >
                          <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
                          onClick={() => handleDeleteSampleClick(sample)}
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

      {/* Edit Space Modal */}
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
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
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

      {/* Delete Space Confirmation Modal */}
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

      {sampleEditModal && selectedSample && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-lg sm:text-xl">Edit Sample - {selectedSample.name}</CardTitle>
              <button onClick={() => setSampleEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Sample Name</label>
                    <input
                      type="text"
                      name="name"
                      value={sampleEditFormData.name}
                      onChange={handleSampleFormChange}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Style Number</label>
                    <input
                      type="text"
                      name="style_no"
                      value={sampleEditFormData.style_no}
                      onChange={handleSampleFormChange}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">SKU Number</label>
                    <input
                      type="text"
                      name="sku_no"
                      value={sampleEditFormData.sku_no}
                      onChange={handleSampleFormChange}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Item</label>
                    <input
                      type="text"
                      name="item"
                      value={sampleEditFormData.item}
                      onChange={handleSampleFormChange}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Color</label>
                    <input
                      type="text"
                      name="color"
                      value={sampleEditFormData.color}
                      onChange={handleSampleFormChange}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Size</label>
                    <input
                      type="text"
                      name="size"
                      value={sampleEditFormData.size}
                      onChange={handleSampleFormChange}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Fabrication</label>
                    <input
                      type="text"
                      name="fabrication"
                      value={sampleEditFormData.fabrication}
                      onChange={handleSampleFormChange}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Weight</label>
                    <input
                      type="text"
                      name="weight"
                      value={sampleEditFormData.weight}
                      onChange={handleSampleFormChange}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Description</label>
                  <textarea
                    name="description"
                    value={sampleEditFormData.description}
                    onChange={handleSampleFormChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Comments</label>
                  <textarea
                    name="comments"
                    value={sampleEditFormData.comments}
                    onChange={handleSampleFormChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={2}
                  />
                </div>

                {buyers.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Buyers</label>
                    <div className="space-y-2 border border-border rounded-lg p-3 bg-card max-h-32 overflow-y-auto">
                      {buyers.map((buyer) => (
                        <label key={buyer.uid} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedSampleBuyers.includes(buyer.uid)}
                            onChange={() => handleSampleBuyerToggle(buyer.uid)}
                            className="w-4 h-4 rounded border-border"
                          />
                          <span className="text-sm text-foreground">{buyer.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {projects.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Projects</label>
                    <div className="space-y-2 border border-border rounded-lg p-3 bg-card max-h-32 overflow-y-auto">
                      {projects.map((project) => (
                        <label key={project.uid} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedSampleProjects.includes(project.uid)}
                            onChange={() => handleSampleProjectToggle(project.uid)}
                            className="w-4 h-4 rounded border-border"
                          />
                          <span className="text-sm text-foreground">{project.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {notes.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Notes</label>
                    <div className="space-y-2 border border-border rounded-lg p-3 bg-card max-h-32 overflow-y-auto">
                      {notes.map((note) => (
                        <label key={note.uid} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedSampleNotes.includes(note.uid)}
                            onChange={() => handleSampleNoteToggle(note.uid)}
                            className="w-4 h-4 rounded border-border"
                          />
                          <span className="text-sm text-foreground">{note.title}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSample.images.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Images ({selectedSample.images.length})
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedSample.images.map((img) => (
                        <img
                          key={img.uid}
                          src={img.file || "/placeholder.svg"}
                          alt={img.file_name}
                          className="w-full h-20 object-cover rounded-lg border border-border"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                  <Button
                    onClick={handleSaveSampleEdit}
                    disabled={isSavingSample}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  >
                    {isSavingSample ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update"
                    )}
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setSampleEditModal(false)}>
                    Cancel
                  </Button>
                </div>
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
                  onClick={handleConfirmDeleteSample}
                  disabled={isDeletingSample}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  {isDeletingSample ? (
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
