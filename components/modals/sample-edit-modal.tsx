"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Upload, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { apiCall, getCookie } from "@/lib/auth-utils"
import { useSearchParams } from "next/navigation"

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

interface SampleImage {
  uid: string
  file: string
}

interface SampleEditModalProps {
  isOpen: boolean
  onClose: () => void
  sampleUid: string
  storageUid: string
  onSuccess: () => void
}

export default function SampleEditModal({ isOpen, onClose, sampleUid, storageUid, onSuccess }: SampleEditModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    item: "",
    style_no: "",
    sku_no: "",
    fabrication: "",
    weight: "",
    weight_type: "GM",
    size_type: "CENTIMETER",
    types: "DEVELOPMENT",
    color: "",
    size: "",
    comments: "",
    arrival_date: "",
    buyer_uids: [] as string[],
    project_uids: [] as string[],
    note_uids: [] as string[],
  })

  const [buyers, setBuyers] = useState<Buyer[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [uploadedImages, setUploadedImages] = useState<Array<{ uid: string; preview: string }>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const searchParams = useSearchParams()
   const currentParentUid = searchParams.get("storage_uid")

  useEffect(() => {
    if (isOpen && sampleUid && storageUid) {
      loadSampleData()
      fetchDropdownData()
    }
  }, [isOpen, sampleUid, storageUid])

  const loadSampleData = async () => {
    setIsLoading(true)
    try {
      const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${sampleUid}`)
      if (response.ok) {
        const data = await response.json()
        setFormData({
          name: data.name || "",
          description: data.description || "",
          item: data.item || "",
          style_no: data.style_no || "",
          sku_no: data.sku_no || "",
          fabrication: data.fabrication || "",
          weight: data.weight || "",
          weight_type: data.weight_type || "GM",
          size_type: data.size_type || "CENTIMETER",
          types: data.types || "DEVELOPMENT",
          color: data.color || "",
          size: data.size || "",
          comments: data.comments || "",
          arrival_date: data.arrival_date ? data.arrival_date.slice(0, 16) : "",
          buyer_uids: data.buyer_uids || [],
          project_uids: data.project_uids || [],
          note_uids: data.note_uids || [],
        })

        const imagePreview =
          data.images?.map((img: SampleImage) => ({
            uid: img.uid,
            preview: img.file,
          })) || []
        setUploadedImages(imagePreview)
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

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
      console.error("Error fetching dropdown data:", err)
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
            canvas.toBlob(
              (blob) => {
                if (blob && blob.size < 999000) {
                  resolve(blob)
                } else if (quality > 0.1) {
                  quality -= 0.1
                  compressRecursive()
                } else {
                  resolve(blob || new Blob())
                }
              },
              "image/jpeg",
              quality,
            )
          }
          compressRecursive()
        }
      }
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (!files) return

    setIsUploading(true)
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const compressedBlob = await compressImage(file)

        const formDataUpload = new FormData()
        formDataUpload.append("file", new File([compressedBlob], file.name, { type: "image/jpeg" }))

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/images/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getCookie("access_token")}`,
          },
          body: formDataUpload,
        })

        if (!response.ok) {
          throw new Error("Failed to upload image")
        }

        const data = await response.json()
        const imagePreview = URL.createObjectURL(compressedBlob)
        setUploadedImages((prev) => [...prev, { uid: data.uid, preview: imagePreview }])
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleProjectToggle = (projectUid: string) => {
    setFormData((prev) => {
      const current = prev.project_uids
      if (current.includes(projectUid)) {
        return { ...prev, project_uids: current.filter((uid) => uid !== projectUid) }
      } else {
        return { ...prev, project_uids: [...current, projectUid] }
      }
    })
  }

  const handleNoteToggle = (noteUid: string) => {
    setFormData((prev) => {
      const current = prev.note_uids
      if (current.includes(noteUid)) {
        return { ...prev, note_uids: current.filter((uid) => uid !== noteUid) }
      } else {
        return { ...prev, note_uids: [...current, noteUid] }
      }
    })
  }

  const handleSave = async () => {
    setFieldErrors({})
    setIsSaving(true)

    try {
      const imageUids = uploadedImages.map((img) => img.uid)

      const submitData = {
        ...formData,
        image_uids: imageUids,
      }

      const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${sampleUid}`, {
        method: "PUT",
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (typeof data === "object" && !Array.isArray(data)) {
          setFieldErrors(data)
        }
        toast({ title: "Error", description: "Failed to update sample", variant: "destructive" })
        return
      }

      toast({ title: "Success", description: "Sample updated successfully" })
      onClose()
      onSuccess()
    } catch (err) {
      toast({ title: "Error", description: "Failed to update sample", variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex items-center justify-between border-b border-border pb-3 sticky top-0 bg-card">
          <CardTitle className="text-lg sm:text-xl">Edit Sample</CardTitle>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </CardHeader>

        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Item</label>
                  <input
                    type="text"
                    name="item"
                    value={formData.item}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Style No</label>
                  <input
                    type="text"
                    name="style_no"
                    value={formData.style_no}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">SKU No</label>
                  <input
                    type="text"
                    name="sku_no"
                    value={formData.sku_no}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={2}
                />
              </div>

              {/* Fabrication Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Fabrication</label>
                  <input
                    type="text"
                    name="fabrication"
                    value={formData.fabrication}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Color</label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Size</label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Weight</label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Weight Type</label>
                  <select
                    name="weight_type"
                    value={formData.weight_type}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="GM">Gram (GM)</option>
                    <option value="KG">Kilogram (KG)</option>
                    <option value="LB">Pound (LB)</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Size Type</label>
                  <select
                    name="size_type"
                    value={formData.size_type}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="CENTIMETER">Centimeter</option>
                    <option value="INCH">Inch</option>
                    <option value="METER">Meter</option>
                  </select>
                </div>
              </div>

              <div className="text-sm font-medium text-foreground block mb-2">Buyers</div>
              <div className="border border-border rounded-lg p-3 bg-card max-h-32 overflow-y-auto">
                {buyers.length > 0 ? (
                  <div className="space-y-1">
                    {buyers.map((buyer) => (
                      <label key={buyer.uid} className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="checkbox"
                          checked={formData.buyer_uids.includes(buyer.uid)}
                          onChange={() => handleBuyerToggle(buyer.uid)}
                          className="w-4 h-4 rounded border-border"
                        />
                        <span className="text-foreground">{buyer.name}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No buyers available</p>
                )}
              </div>

              <div className="text-sm font-medium text-foreground block mb-2">Projects</div>
              <div className="border border-border rounded-lg p-3 bg-card max-h-32 overflow-y-auto">
                {projects.length > 0 ? (
                  <div className="space-y-1">
                    {projects.map((project) => (
                      <label key={project.uid} className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="checkbox"
                          checked={formData.project_uids.includes(project.uid)}
                          onChange={() => handleProjectToggle(project.uid)}
                          className="w-4 h-4 rounded border-border"
                        />
                        <span className="text-foreground">{project.name}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No projects available</p>
                )}
              </div>

              <div className="text-sm font-medium text-foreground block mb-2">Notes</div>
              <div className="border border-border rounded-lg p-3 bg-card max-h-32 overflow-y-auto">
                {notes.length > 0 ? (
                  <div className="space-y-1">
                    {notes.map((note) => (
                      <label key={note.uid} className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="checkbox"
                          checked={formData.note_uids.includes(note.uid)}
                          onChange={() => handleNoteToggle(note.uid)}
                          className="w-4 h-4 rounded border-border"
                        />
                        <span className="text-foreground">{note.title || note.uid}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No notes available</p>
                )}
              </div>

              {/* Images */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Images</label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 mb-3 text-center">
                  <Upload className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground mb-2">Upload more images</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                    id="sample-edit-image-input"
                  />
                  <label htmlFor="sample-edit-image-input">
                    <Button
                      type="button"
                      asChild
                      disabled={isUploading}
                      className="bg-primary hover:bg-primary/90 text-white cursor-pointer text-xs"
                    >
                      <span>{isUploading ? "Uploading..." : "Select Images"}</span>
                    </Button>
                  </label>
                </div>

                {uploadedImages.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-foreground mb-2">Images ({uploadedImages.length})</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {uploadedImages.map((img) => (
                        <div key={img.uid} className="relative group">
                          <img
                            src={img.preview || "/placeholder.svg"}
                            alt="preview"
                            className="w-full h-24 object-cover rounded border border-border"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(img.uid)}
                            className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                <Button
                  onClick={handleSave}
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
