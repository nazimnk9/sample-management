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


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit2, FolderOpen, ChevronLeft, X, Loader2, MoreVertical } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getCookie,apiCall } from "@/lib/auth-utils"
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

interface Sample {
  id: number
  uid: string
  name: string
  description: string
  image: string | null
  storage_uid: string
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
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)

  // Edit form
  const [editFormData, setEditFormData] = useState({ name: "", description: "" })
  const [editImage, setEditImage] = useState<File | null>(null)
  const [editImagePreview, setEditImagePreview] = useState<string>("")
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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
        const samplesResponse = await apiCall(`/sample_manager/sample/?storage_uid=${currentParentUid}`)
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

      // const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, {
      //   method: "PUT",
      //   body: formData,
      // })

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
            <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage your storage spaces and samples</p>
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
                      {/* Folder Icon */}
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

                      {/* Three Dots Menu */}
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

                      {/* Edit and Delete Buttons */}
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
                    <div className="relative h-48 bg-muted overflow-hidden">
                      {sample.image ? (
                        <img
                          src={sample.image || "/placeholder.svg"}
                          alt={sample.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <FolderOpen className="w-12 h-12 text-muted-foreground" />
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

                      <div className="flex gap-2 pt-4 border-t border-border">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm"
                        >
                          <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm"
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

      {/* Edit Modal */}
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
                {/* Name */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Space Name</label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Description</label>
                  <textarea
                    value={editFormData.description}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Image</label>
                  {editImagePreview && (
                    <div className="mb-3 relative">
                      <img
                        src={editImagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Submit Buttons */}
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

      {/* Delete Confirmation Modal */}
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
    </div>
  )
}
