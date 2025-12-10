"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit2, FolderOpen, FileText, ChevronLeft, X, Loader2, MoreVertical, ChevronDown, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getCookie, apiCall } from "@/lib/auth-utils"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Drawer {
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

interface FileItem {
  id: number
  uid: string
  file_id: string
  name: string
  comments: string
  image_uids: string[]
  note_uids: string[]
  project_uids: string[]
  buyer_uids: string[]
  storage: number
  images?: { uid: string; file: string; file_name?: string }[]
  // These fields might be returned by API, adding them for completeness in edit form
  style_no?: string
  sku_no?: string
  item?: string
  fabrication?: string
  weight?: string
  weight_type?: string
  size_type?: string
  types?: string
  color?: string
  size?: string
  arrival_date?: string
}

interface Buyer {
  id: number
  uid: string
  name: string
}

interface Note {
  id: number
  uid: string
  title: string
}

interface Project {
  id: number
  uid: string
  name: string
}


export default function DrawersPage() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryParentUid = searchParams.get("parent_uid")

  // Data State
  const [drawers, setDrawers] = useState<Drawer[]>([])
  const [files, setFiles] = useState<FileItem[]>([])
  const [buyers, setBuyers] = useState<Buyer[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [notes, setNotes] = useState<Note[]>([])

  // Navigation State
  const [parentStack, setParentStack] = useState<Array<{ uid: string; name: string }>>([])
  const [currentParentUid, setCurrentParentUid] = useState<string | null>(queryParentUid)

  // Loading State
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  // Modals & Menu State
  const [drawerEditModal, setDrawerEditModal] = useState(false)
  const [drawerDeleteModal, setDrawerDeleteModal] = useState(false)
  const [fileEditModal, setFileEditModal] = useState(false)
  const [fileDeleteModal, setFileDeleteModal] = useState(false)
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const [fileMenuOpen, setFileMenuOpen] = useState<string | null>(null)

  const [selectedDrawer, setSelectedDrawer] = useState<Drawer | null>(null)
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)

  // Drawer Edit Form
  const [drawerFormData, setDrawerFormData] = useState({ name: "", description: "" })
  const [drawerImage, setDrawerImage] = useState<File | null>(null)
  const [drawerImagePreview, setDrawerImagePreview] = useState<string>("")

  // File Edit Form
  const [fileFormData, setFileFormData] = useState({
    file_id: "",
    name: "",
    comments: "",
    buyer_uids: [] as string[],
    project_uids: [] as string[],
    note_uids: [] as string[],
    // Extra fields to match Sample structure if needed, keeping mostly to requested File structure
  })
  const [fileImages, setFileImages] = useState<{ uid: string; file: string; file_name?: string; preview?: string }[]>([])
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>({})


  // useEffect(() => {
  //   // If URL has parent_uid, respect it (initial load)
  //   if (queryParentUid && parentStack.length === 0) {
  //     // We might want to fetch parent details to fill stack correctly, but simple approach:
  //     // We'll trust the currentParentUid state. 
  //   }
  // }, [queryParentUid])

  useEffect(() => {
      const buildParentStack = async () => {
        if (queryParentUid && parentStack.length === 1) {
          try {
            // Fetch the current space details to build the parent stack
            const response = await apiCall(`/sample_manager/storage/${queryParentUid}`)
            if (response.ok) {
              const drawerData = await response.json()
              // For simplicity, just add this space to the stack
              // In a real implementation, you'd want to fetch the full hierarchy
              setParentStack([{ uid: drawerData.uid, name: drawerData.name }])
            }
          } catch (err) {
            console.error("Error building parent stack:", err)
          }
        }
      }
  
      buildParentStack()
    }, [queryParentUid, parentStack.length])

  useEffect(() => {
    fetchDrawersAndFiles()
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
        const data = await buyersRes.json()
        setBuyers(Array.isArray(data) ? data : data.results || [])
      }
      if (projectsRes.ok) {
        const data = await projectsRes.json()
        setProjects(Array.isArray(data) ? data : data.results || [])
      }
      if (notesRes.ok) {
        const data = await notesRes.json()
        setNotes(Array.isArray(data) ? data : data.results || [])
      }
    } catch (err) {
      console.error("Error fetching dropdown data", err)
    }
  }

  const fetchDrawersAndFiles = async () => {
    setIsLoading(true)
    try {
      // Fetch Drawers
      const drawersUrl = currentParentUid
        ? `/sample_manager/storage/?type=DRAWER&parent_uid=${currentParentUid}`
        : `/sample_manager/storage/?type=DRAWER`

      const drawersRes = await apiCall(drawersUrl)
      if (drawersRes.ok) {
        const data = await drawersRes.json()
        setDrawers(Array.isArray(data) ? data : data.results || [])
      }

      // Fetch Files if in a drawer
      if (currentParentUid) {
        const filesRes = await apiCall(`/sample_manager/storage_file/${currentParentUid}`)
        if (filesRes.ok) {
          const data = await filesRes.json()
          setFiles(Array.isArray(data) ? data : data.results || [])
        }
      } else {
        setFiles([])
      }

      // Update URL to match state
      const url = currentParentUid ? `/drawers?parent_uid=${currentParentUid}` : "/drawers"
      window.history.replaceState(null, "", url)

    } catch (err) {
      console.error("Error fetching data", err)
      toast({ title: "Error", description: "Failed to load content", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  // --- Navigation ---
  const handleDrawerClick = (drawer: Drawer) => {
    setParentStack([...parentStack, { uid: drawer.uid, name: drawer.name }])
    setCurrentParentUid(drawer.uid)
    const newUrl = `/drawers?currentParentUid=${drawer.uid}`
    router.push(newUrl)
  }

  const handleBackClick = () => {
    if (parentStack.length > 0) {
      const newStack = parentStack.slice(0, -1)
      setParentStack(newStack)
      setCurrentParentUid(newStack.length > 0 ? newStack[newStack.length - 1].uid : null)
      setFiles([])
    } else {
      setCurrentParentUid(null)
    }
  }

  const handleCrumbClick = (index: number) => {
    const newStack = parentStack.slice(0, index + 1)
    setParentStack(newStack)
    setCurrentParentUid(newStack[newStack.length - 1].uid)
    setFiles([])
  }

  const handleRootClick = () => {
    setParentStack([])
    setCurrentParentUid(null)
    setFiles([])
  }

  // --- Drawer Actions ---

  const handleEditDrawerClick = async (drawer: Drawer) => {
    setSelectedDrawer(drawer)
    try {
      const response = await apiCall(`/sample_manager/storage/${drawer.uid}`)
      if (response.ok) {
        const data = await response.json()
        setDrawerFormData({ name: data.name, description: data.description })
        setDrawerImagePreview(data.image || "")
        setDrawerImage(null)
        setDrawerEditModal(true)
        setMenuOpen(null)
      }
    } catch (e) {
      toast({ title: "Error", description: "Failed to load drawer details", variant: "destructive" })
    }
  }

  const handleSaveDrawer = async () => {
    if (!selectedDrawer) return
    setIsSaving(true)
    try {
      const formData = new FormData()
      formData.append("name", drawerFormData.name)
      formData.append("description", drawerFormData.description)
      formData.append("type", "DRAWER")
      if (drawerImage) {
        formData.append("image", drawerImage)
      } else if (drawerImagePreview === "") {
        // Handle image removal if needed, depends on backend handling of empty image
        // Assuming sending empty 'image' or not sending it might work, or backend doesn't support explicit clear easily without a flag.
        // But for now we just follow the pattern. 
        // If we really want to remove, we might need to send something specific or the backend handles empty keys.
      }

      if (currentParentUid) {
        formData.append("parent_uid", currentParentUid)
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/storage/${selectedDrawer.uid}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
        body: formData,
      })

      if (!response.ok) throw new Error("Failed to update drawer")

      toast({ title: "Success", description: "Drawer updated successfully" })
      setDrawerEditModal(false)
      fetchDrawersAndFiles()
    } catch (err) {
      toast({ title: "Error", description: "Failed to update drawer", variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteDrawerClick = (drawer: Drawer) => {
    setSelectedDrawer(drawer)
    setDrawerDeleteModal(true)
    setMenuOpen(null)
  }

  const handleConfirmDeleteDrawer = async () => {
    if (!selectedDrawer) return
    setIsDeleting(true)
    try {
      const response = await apiCall(`/sample_manager/storage/${selectedDrawer.uid}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete")

      toast({ title: "Success", description: "Drawer deleted successfully" })
      setDrawerDeleteModal(false)
      fetchDrawersAndFiles()
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete drawer", variant: "destructive" })
    } finally {
      setIsDeleting(false)
    }
  }


  // --- File Actions ---

  const handleEditFileClick = async (file: FileItem) => {
    setSelectedFile(file)
    try {
      const response = await apiCall(`/sample_manager/storage_file/${currentParentUid}/${file.uid}`)
      if (response.ok) {
        const data = await response.json()
        setFileFormData({
          file_id: data.file_id || "",
          name: data.name || "",
          comments: data.comments || "",
          buyer_uids: data.buyer_uids || (data.buyers ? data.buyers.map((b: any) => b.uid) : []),
          project_uids: data.project_uids || (data.projects ? data.projects.map((p: any) => p.uid) : []),
          note_uids: data.note_uids || (data.notes ? data.notes.map((n: any) => n.uid) : []),
        })
        // Map existing images
        const imgs = data.images ? data.images.map((img: any) => ({
          uid: img.uid,
          file: img.file,
          file_name: img.file_name,
          preview: img.file // Adding preview key for consistency with snippet
        })) : []
        setFileImages(imgs)

        // Sync with local storage just in case we need to track state there as requested
        localStorage.setItem("file_edit_image_uids", JSON.stringify(imgs.map((i: any) => i.uid)))

        setFileEditModal(true)
        setFileMenuOpen(null)
      }
    } catch (e) {
      toast({ title: "Error", description: "Failed to load file details", variant: "destructive" })
    }
  }

  const handleSaveFile = async () => {
    if (!selectedFile || !currentParentUid) return
    setIsSaving(true)
    try {
      const storedImageUids = localStorage.getItem("file_edit_image_uids")
      const imageUids = storedImageUids ? JSON.parse(storedImageUids) : []

      // Ensure we merge or use the up-to-date image UIDs from state/local storage
      // logic: The updated fileImages state should be the source of truth, 
      // but we also used local storage for uploads. 
      // Let's use imageUids from local storage as it accumulates new uploads + initially existing.

      const dataToSubmit = {
        ...fileFormData,
        image_uids: imageUids,
        storage_uid: currentParentUid
      }

      const response = await apiCall(`/sample_manager/storage_file/${currentParentUid}/${selectedFile.uid}`, {
        method: "PUT",
        body: JSON.stringify(dataToSubmit),
      })

      if (!response.ok) throw new Error("Failed to update file")

      localStorage.removeItem("file_edit_image_uids")
      toast({ title: "Success", description: "File updated successfully" })
      setFileEditModal(false)
      fetchDrawersAndFiles()

    } catch (err) {
      toast({ title: "Error", description: "Failed to update file", variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteFileClick = (file: FileItem) => {
    setSelectedFile(file)
    setFileDeleteModal(true)
    setFileMenuOpen(null)
  }

  const handleConfirmDeleteFile = async () => {
    if (!selectedFile || !currentParentUid) return
    setIsDeleting(true)
    try {
      const response = await apiCall(`/sample_manager/storage_file/${currentParentUid}/${selectedFile.uid}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete")

      toast({ title: "Success", description: "File deleted successfully" })
      setFileDeleteModal(false)
      fetchDrawersAndFiles()
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete file", variant: "destructive" })
    } finally {
      setIsDeleting(false)
    }
  }

  // --- Helpers ---
  const handleDrawerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setDrawerImage(file)
      const reader = new FileReader()
      reader.onload = (e) => setDrawerImagePreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

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

          if (width > 1920 || height > 1920) {
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

          const compressRecursive = () => {
            canvas.toBlob((blob) => {
              if (blob && blob.size < 999000) {
                resolve(blob)
              } else if (quality > 0.1) {
                quality -= 0.1
                compressRecursive()
              } else {
                resolve(blob || new Blob())
              }
            }, "image/jpeg", quality)
          }
          compressRecursive()
        }
      }
    })
  }

  // Updated Image Upload Logic (matching snippet + keeping backend integration)
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.currentTarget.files
    if (!selectedFiles) return

    setIsUploading(true)

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        const compressedBlob = await compressImage(file)

        const formData = new FormData()
        formData.append("file", new File([compressedBlob], file.name, { type: "image/jpeg" }))

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/images/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getCookie("access_token")}`,
          },
          body: formData
        })

        if (!response.ok) throw new Error("Failed to upload")

        const data = await response.json()
        const preview = URL.createObjectURL(compressedBlob)

        setFileImages((prev) => [...prev, { uid: data.uid, file: preview, preview: preview, file_name: file.name }])

        // Store in local storage to persist for save
        const storedUids = localStorage.getItem("file_edit_image_uids")
        const uids = storedUids ? JSON.parse(storedUids) : []
        localStorage.setItem("file_edit_image_uids", JSON.stringify([...uids, data.uid]))
      }
      toast({ title: "Success", description: "Images uploaded" })
    } catch (err) {
      toast({ title: "Error", description: "Failed to upload images", variant: "destructive" })
    } finally {
      setIsUploading(false)
    }
  }

  // Renaming to match snippet convention (but keeping functionality)
  const handleRemoveImage = (uid: string) => {
    setFileImages((prev) => prev.filter((img) => img.uid !== uid))
    const storedUids = localStorage.getItem("file_edit_image_uids")
    if (storedUids) {
      const uids = JSON.parse(storedUids).filter((u: string) => u !== uid)
      localStorage.setItem("file_edit_image_uids", JSON.stringify(uids))
    }
  }

  // Handlers for Multi-Select Toggles
  const handleBuyerToggle = (uid: string) => {
    setFileFormData((prev) => {
      const current = prev.buyer_uids
      const updated = current.includes(uid)
        ? current.filter((id) => id !== uid)
        : [...current, uid]
      return { ...prev, buyer_uids: updated }
    })
  }

  const handleProjectToggle = (uid: string) => {
    setFileFormData((prev) => {
      const current = prev.project_uids
      const updated = current.includes(uid)
        ? current.filter((id) => id !== uid)
        : [...current, uid]
      return { ...prev, project_uids: updated }
    })
  }

  const handleNoteToggle = (uid: string) => {
    setFileFormData((prev) => {
      const current = prev.note_uids
      const updated = current.includes(uid)
        ? current.filter((id) => id !== uid)
        : [...current, uid]
      return { ...prev, note_uids: updated }
    })
  }


  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
      {/* Breadcrumbs - Copying design from space.tsx */}
      <div className="mb-2 sm:mb-3 text-xs sm:text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
        <span className="cursor-pointer hover:text-foreground" onClick={handleRootClick}>
          Drawers
        </span>
        {parentStack.map((drawer, index) => (
          <div key={drawer.uid} className="flex items-center gap-2">
            <span>/</span>
            <span
              className="cursor-pointer hover:text-foreground"
              onClick={() => handleCrumbClick(index)}
            >
              {drawer.name}
            </span>
          </div>
        ))}
      </div>

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
              {parentStack.length > 0 ? parentStack[parentStack.length - 1].name : "Drawers"}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage your storage drawers and files</p>
          </div>
        </div>
      </div>

      {/* Add Buttons */}
      <div className="flex gap-2 mb-6 sm:mb-8">
        <Link href={`/drawers/add${currentParentUid ? `?parent_uid=${currentParentUid}` : ""}`}>
          <Button className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add Drawer
          </Button>
        </Link>
        {currentParentUid && (
          <Link href={`/files/add?storage_uid=${currentParentUid}`}>
            <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent">
              <Plus className="w-4 h-4" />
              Add File
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
          {/* Drawers Grid */}
          {drawers.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">Drawers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {drawers.map((drawer) => (
                  <Card key={drawer.uid} className="border-border hover:shadow-lg transition-all overflow-hidden cursor-pointer group">
                    <div className="relative h-48 bg-muted overflow-hidden" onClick={() => handleDrawerClick(drawer)}>
                      {drawer.image ? (
                        <img src={drawer.image} alt={drawer.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
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
                      <CardTitle className="text-base sm:text-lg line-clamp-1">{drawer.name}</CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                        {drawer.description || "No description"}
                      </p>

                      {/* 3-dots */}
                      <div className="relative mb-4">
                        <button
                          onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === drawer.uid ? null : drawer.uid); }}
                          className="p-2 hover:bg-muted rounded-full transition absolute -top-32 right-0 bg-white shadow-sm"
                        >
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </button>
                        {menuOpen === drawer.uid && (
                          <div className="absolute -top-24 right-0 bg-card border border-border rounded-lg shadow-lg z-10 w-32">
                            <button onClick={(e) => { e.stopPropagation(); handleEditDrawerClick(drawer); }} className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2">
                              <Edit2 className="w-4 h-4" /> Edit
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); handleDeleteDrawerClick(drawer); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2">
                              <Trash2 className="w-4 h-4" /> Delete
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-4 border-t border-border">
                        <Button size="sm" variant="outline" className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm" onClick={() => handleEditDrawerClick(drawer)}>
                          <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" /> Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm" onClick={() => handleDeleteDrawerClick(drawer)}>
                          <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" /> Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Files Grid */}
          {files.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Files</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {files.map((file) => (
                  <Card key={file.uid} className="border-border hover:shadow-lg transition-all overflow-hidden">
                    <div className="relative h-48 bg-muted overflow-hidden">
                      {file.images && file.images.length > 0 ? (
                        <img src={file.images[0].file} alt={file.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <FileText className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-base sm:text-lg line-clamp-1">{file.name}</CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                        {file.comments || "No comments"}
                      </p>

                      <div className="relative mb-4">
                        <button
                          onClick={(e) => { e.stopPropagation(); setFileMenuOpen(fileMenuOpen === file.uid ? null : file.uid); }}
                          className="p-2 hover:bg-muted rounded-full transition"
                        >
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </button>
                        {fileMenuOpen === file.uid && (
                          <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg z-10 w-32">
                            <button onClick={(e) => { e.stopPropagation(); handleEditFileClick(file); }} className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2">
                              <Edit2 className="w-4 h-4" /> Edit
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); handleDeleteFileClick(file); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2">
                              <Trash2 className="w-4 h-4" /> Delete
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-border">
                        <Button size="sm" variant="outline" className="flex-1 flex items-center justify-center gap-1 bg-transparent text-xs sm:text-sm" onClick={() => handleEditFileClick(file)}>
                          <Edit2 className="w-3 sm:w-4 h-3 sm:h-4" /> Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 flex items-center justify-center gap-1 text-destructive hover:bg-red-50 bg-transparent text-xs sm:text-sm" onClick={() => handleDeleteFileClick(file)}>
                          <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" /> Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {drawers.length === 0 && files.length === 0 && (
            <div className="text-center py-12">
              <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No drawers or files found</p>
            </div>
          )}
        </>
      )}

      {/* Drawer Edit Modal */}
      {drawerEditModal && selectedDrawer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-lg sm:text-xl">Edit Drawer - {selectedDrawer.name}</CardTitle>
              <button onClick={() => setDrawerEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0"><X className="w-5 h-5" /></button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Drawer Name</label>
                  <input type="text" value={drawerFormData.name} onChange={(e) => setDrawerFormData({ ...drawerFormData, name: e.target.value })} className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Description</label>
                  <textarea value={drawerFormData.description} onChange={(e) => setDrawerFormData({ ...drawerFormData, description: e.target.value })} className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary" rows={3} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Image</label>
                  {drawerImagePreview ? (
                    <div className="mb-3 relative">
                      <img src={drawerImagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => {
                          setDrawerImagePreview("")
                          setDrawerImage(null)
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <input type="file" onChange={handleDrawerImageChange} accept="image/*" className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                  )}
                </div>
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button onClick={handleSaveDrawer} disabled={isSaving} className="flex-1 bg-primary hover:bg-primary/90 text-white">{isSaving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Updating...</> : "Update"}</Button>
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setDrawerEditModal(false)}>Cancel</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Drawer Delete Modal */}
      {drawerDeleteModal && selectedDrawer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-border">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-lg">Delete Drawer</CardTitle>
              <button onClick={() => setDrawerDeleteModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0"><X className="w-5 h-5" /></button>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-foreground mb-6">Are you sure you want to delete "{selectedDrawer.name}"? This action cannot be undone.</p>
              <div className="flex gap-3">
                <Button onClick={handleConfirmDeleteDrawer} disabled={isDeleting} className="flex-1 bg-red-600 hover:bg-red-700 text-white">{isDeleting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Deleting...</> : "Delete"}</Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setDrawerDeleteModal(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* File Edit Modal at USER Request */}
      {fileEditModal && selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl border-border max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-lg">Edit File - {selectedFile.name}</CardTitle>
              <button onClick={() => setFileEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0"><X className="w-5 h-5" /></button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Name</label>
                    <input type="text" value={fileFormData.name} onChange={(e) => setFileFormData({ ...fileFormData, name: e.target.value })} className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">File ID</label>
                    <input type="text" value={fileFormData.file_id} onChange={(e) => setFileFormData({ ...fileFormData, file_id: e.target.value })} className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Comments</label>
                  <textarea value={fileFormData.comments} onChange={(e) => setFileFormData({ ...fileFormData, comments: e.target.value })} className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary" rows={2} />
                </div>

                {/* Relationships (User Snippet 1) */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Relationships</h3>
                  <div className="space-y-4">
                    {/* Buyers Multi-Select */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">Buyers</label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground text-left flex items-center justify-between hover:bg-muted/30 transition focus:outline-none focus:ring-2 focus:border-transparent ${fieldErrors.buyer_uids
                                ? "border-red-500 focus:ring-red-500"
                                : "border-border focus:ring-primary"
                              }`}
                          >
                            <span
                              className={fileFormData.buyer_uids.length > 0 ? "text-foreground" : "text-muted-foreground"}
                            >
                              {fileFormData.buyer_uids.length > 0
                                ? `${fileFormData.buyer_uids.length} buyer(s) selected`
                                : "Select buyers..."}
                            </span>
                            <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-full min-w-56">
                          {buyers.length > 0 ? (
                            buyers.map((buyer) => (
                              <DropdownMenuCheckboxItem
                                key={buyer.uid}
                                checked={fileFormData.buyer_uids.includes(buyer.uid)}
                                onCheckedChange={() => handleBuyerToggle(buyer.uid)}
                              >
                                {buyer.name}
                              </DropdownMenuCheckboxItem>
                            ))
                          ) : (
                            <div className="p-2 text-sm text-muted-foreground">No buyers available</div>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Projects Multi-Select */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">Projects</label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground text-left flex items-center justify-between hover:bg-muted/30 transition focus:outline-none focus:ring-2 focus:border-transparent ${fieldErrors.project_uids
                                ? "border-red-500 focus:ring-red-500"
                                : "border-border focus:ring-primary"
                              }`}
                          >
                            <span
                              className={fileFormData.project_uids.length > 0 ? "text-foreground" : "text-muted-foreground"}
                            >
                              {fileFormData.project_uids.length > 0
                                ? `${fileFormData.project_uids.length} project(s) selected`
                                : "Select projects..."}
                            </span>
                            <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-full min-w-56">
                          {projects.length > 0 ? (
                            projects.map((project) => (
                              <DropdownMenuCheckboxItem
                                key={project.uid}
                                checked={fileFormData.project_uids.includes(project.uid)}
                                onCheckedChange={() => handleProjectToggle(project.uid)}
                              >
                                {project.name}
                              </DropdownMenuCheckboxItem>
                            ))
                          ) : (
                            <div className="p-2 text-sm text-muted-foreground">No projects available</div>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Notes Multi-Select */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">Notes</label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground text-left flex items-center justify-between hover:bg-muted/30 transition focus:outline-none focus:ring-2 focus:border-transparent ${fieldErrors.note_uids
                                ? "border-red-500 focus:ring-red-500"
                                : "border-border focus:ring-primary"
                              }`}
                          >
                            <span className={fileFormData.note_uids.length > 0 ? "text-foreground" : "text-muted-foreground"}>
                              {fileFormData.note_uids.length > 0
                                ? `${fileFormData.note_uids.length} note(s) selected`
                                : "Select notes..."}
                            </span>
                            <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-full min-w-56">
                          {notes.length > 0 ? (
                            notes.map((note) => (
                              <DropdownMenuCheckboxItem
                                key={note.uid}
                                checked={fileFormData.note_uids.includes(note.uid)}
                                onCheckedChange={() => handleNoteToggle(note.uid)}
                              >
                                {note.title}
                              </DropdownMenuCheckboxItem>
                            ))
                          ) : (
                            <div className="p-2 text-sm text-muted-foreground">No notes available</div>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>


                {/* Images (User Snippet 2) */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Images</h3>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center mb-4">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">Drag and drop images here or click to select</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileSelect}
                      disabled={isUploading}
                      className="hidden"
                      id="image-input"
                    />
                    <label htmlFor="image-input">
                      <Button
                        type="button"
                        disabled={isUploading}
                        className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
                        asChild
                      >
                        <span>{isUploading ? "Uploading..." : "Select Images"}</span>
                      </Button>
                    </label>
                    <p className="text-xs text-muted-foreground mt-2">Images will be auto-compressed to under 999KB</p>
                  </div>

                  {fileImages.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-foreground mb-3">
                        Uploaded Images ({fileImages.length})
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {fileImages.map((img) => (
                          <div key={img.uid} className="relative group">
                            {img.preview ? (
                              <img
                                src={img.preview || "/placeholder.svg"}
                                alt="preview"
                                className="w-full h-32 object-cover rounded-lg border border-border"
                              />
                            ) : (
                              <div className="w-full h-32 bg-muted rounded-lg border border-border flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">Loading...</span>
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(img.uid)}
                              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button onClick={handleSaveFile} disabled={isSaving} className="flex-1 bg-primary hover:bg-primary/90 text-white">{isSaving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Updating...</> : "Update"}</Button>
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setFileEditModal(false)}>Cancel</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* File Delete Modal */}
      {fileDeleteModal && selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-border">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-lg">Delete File</CardTitle>
              <button onClick={() => setFileDeleteModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0"><X className="w-5 h-5" /></button>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-foreground mb-6">Are you sure you want to delete "{selectedFile.name}"? This action cannot be undone.</p>
              <div className="flex gap-3">
                <Button onClick={handleConfirmDeleteFile} disabled={isDeleting} className="flex-1 bg-red-600 hover:bg-red-700 text-white">{isDeleting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Deleting...</> : "Delete"}</Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setFileDeleteModal(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  )
}
