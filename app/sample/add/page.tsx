"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, Upload, X, ChevronDown } from "lucide-react"
import { getCookie, apiCall } from "@/lib/auth-utils"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

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

export default function AddSamplePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const storageUid = searchParams.get("storage_uid")

  const [formData, setFormData] = useState({
    arrival_date: "",
    style_no: "",
    sku_no: "",
    // item: "", // Removed
    fabrication: "",
    weight: "",
    weight_type: "GM",
    size_type: "CENTIMETER",
    types: "DEVELOPMENT",
    category: "CIRCULAR_KNIT",
    sub_category: "MENS",
    color: "",
    size: "",
    comments: "",
    name: "",
    description: "",
    buyer_uids: [] as string[],
    project_uids: [] as string[],
    note_uids: [] as string[],
  })

  const [buyers, setBuyers] = useState<Buyer[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [uploadedImages, setUploadedImages] = useState<Array<{ uid: string; preview: string }>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  useEffect(() => {
    const initializeData = async () => {
      if (!storageUid) {
        toast({ title: "Error", description: "Storage UID is required", variant: "destructive" })
        router.push("/space")
        return
      }

      try {
        const token = getCookie("access_token")
        if (!token) {
          router.push("/login")
          return
        }

        // Fetch buyers, projects, and notes in parallel
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

        // Check for stored image UIDs
        const storedImageUids = localStorage.getItem("sample_image_uids")
        if (storedImageUids) {
          const uids = JSON.parse(storedImageUids)
          // Fetch image previews if needed
          setUploadedImages(uids.map((uid: string) => ({ uid, preview: "" })))
        }
      } catch (err) {
        console.error("Error initializing data:", err)
        toast({ title: "Error", description: "Failed to load form data", variant: "destructive" })
      } finally {
        setIsLoading(false)
      }
    }

    initializeData()
  }, [storageUid, router, toast])

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
          const quality = 0.9

          // Resize if dimensions are too large
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

        // Store in localStorage
        const existingUids = localStorage.getItem("sample_image_uids")
        const uids = existingUids ? JSON.parse(existingUids) : []
        localStorage.setItem("sample_image_uids", JSON.stringify([...uids, data.uid]))
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
    const existingUids = localStorage.getItem("sample_image_uids")
    if (existingUids) {
      const uids = JSON.parse(existingUids).filter((u: string) => u !== uid)
      localStorage.setItem("sample_image_uids", JSON.stringify(uids))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updates: any = { [name]: value }

      // Reset sub_category if category changes
      if (name === "category") {
        if (value === "WOVEN") {
          updates.sub_category = "DENIM"
        } else {
          updates.sub_category = "MENS"
        }
      }

      return { ...prev, ...updates }
    })
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFieldErrors({})
    setIsSubmitting(true)

    try {
      const token = getCookie("access_token")
      if (!token) {
        toast({ title: "Unauthorized", description: "You need to be logged in", variant: "destructive" })
        router.push("/login")
        return
      }

      if (!storageUid) {
        toast({ title: "Error", description: "Storage UID is required", variant: "destructive" })
        return
      }

      // Get image UIDs from localStorage
      const storedImageUids = localStorage.getItem("sample_image_uids")
      const imageUids = storedImageUids ? JSON.parse(storedImageUids) : []

      const submitData = {
        ...formData,
        storage_uid: storageUid,
        image_uids: imageUids,
      }

      const response = await apiCall(`/sample_manager/sample/${storageUid}`, {
        method: "POST",
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (typeof data === "object" && !Array.isArray(data)) {
          const hasFieldErrors = Object.keys(data).some((key) => Array.isArray(data[key]))
          if (hasFieldErrors) {
            setFieldErrors(data)
            const errorMessages = Object.entries(data)
              .map(
                ([field, messages]: [string, any]) => `${field}: ${Array.isArray(messages) ? messages[0] : messages}`,
              )
              .join(", ")
            toast({
              title: "Validation Error",
              description: errorMessages,
              variant: "destructive",
            })
          } else {
            toast({
              title: "Error",
              description: data.detail || "Failed to create sample",
              variant: "destructive",
            })
          }
        }
        setIsSubmitting(false)
        return
      }

      // Clear localStorage and redirect to the space where the sample was created
      localStorage.removeItem("sample_image_uids")
      toast({ title: "Success", description: "Sample created successfully" })
      router.push(`/space?currentParentUid=${storageUid}`)
    } catch (err) {
      console.error("Error creating sample:", err)
      toast({ title: "Error", description: "Failed to create sample", variant: "destructive" })
      setIsSubmitting(false)
    }
  }

  const getBackUrl = () => {
    return storageUid ? `/space?currentParentUid=${storageUid}` : "/space"
  }

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8 flex items-center gap-3">
          <Link href={getBackUrl()}>
            <button className="p-2 hover:bg-muted rounded-lg transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create New Sample</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">Add a new sample to this storage</p>
          </div>
        </div>

        <Card className="border-border">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Sample Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Sample Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter sample name"
                      className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                        }`}
                    />
                    {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name[0]}</p>}
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter sample description"
                      className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${fieldErrors.description
                        ? "border-red-500 focus:ring-red-500"
                        : "border-border focus:ring-primary"
                        }`}
                      rows={3}
                    />
                    {fieldErrors.description && (
                      <p className="text-sm text-red-600 mt-1">{fieldErrors.description[0]}</p>
                    )}
                  </div>

                  {/* Style No */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Style No</label>
                    <input
                      type="text"
                      name="style_no"
                      value={formData.style_no}
                      onChange={handleChange}
                      placeholder="e.g., ST-2025-001"
                      className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${fieldErrors.style_no ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                        }`}
                    />
                  </div>

                  {/* SKU No */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">SKU No</label>
                    <input
                      type="text"
                      name="sku_no"
                      value={formData.sku_no}
                      onChange={handleChange}
                      placeholder="e.g., SKU-8899"
                      className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${fieldErrors.sku_no ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                        }`}
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="CIRCULAR_KNIT">CIRCULAR_KNIT</option>
                      <option value="FLAT_KNIT">FLAT_KNIT</option>
                      <option value="WOVEN">WOVEN</option>
                    </select>
                  </div>

                  {/* Sub Category */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Sub Category</label>
                    <select
                      name="sub_category"
                      value={formData.sub_category}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {formData.category === "WOVEN" ? (
                        <>
                          <option value="DENIM">DENIM</option>
                          <option value="NON_DENIM">NON_DENIM</option>
                        </>
                      ) : (
                        <>
                          <option value="MENS">MENS</option>
                          <option value="JR_LADIES">JR_LADIES</option>
                          <option value="WOMEN">WOMEN</option>
                          <option value="JUNIOR_BOYS">JUNIOR_BOYS</option>
                          <option value="SENIOR_BOYS">SENIOR_BOYS</option>
                          <option value="TODDLER_BOYS">TODDLER_BOYS</option>
                          <option value="JUNIOR_GIRLS">JUNIOR_GIRLS</option>
                          <option value="SENIOR_GIRLS">SENIOR_GIRLS</option>
                          <option value="TODDLER_GIRLS">TODDLER_GIRLS</option>
                          <option value="KIDS">KIDS</option>
                        </>
                      )}
                    </select>
                  </div>

                  {/* Item - Removed */}
                  {/* Color */}
                  {/* <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Color</label>
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      placeholder="e.g., Black"
                      className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${fieldErrors.color ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                        }`}
                    />
                  </div> */}

                  {/* Size Type */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Size Type</label>
                    <select
                      name="size_type"
                      value={formData.size_type}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="CENTIMETER">CENTIMETER</option>
                      <option value="LETTER">LETTER</option>
                    </select>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Size</label>
                    {formData.size_type === "LETTER" ? (
                      <select
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${fieldErrors.size ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                          }`}
                      >
                        <option value="">Select Size</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        placeholder="e.g., 20"
                        className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${fieldErrors.size ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                          }`}
                      />
                    )}
                  </div>
                  {/* Color */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Color</label>
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      placeholder="e.g., Black"
                      className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${fieldErrors.color ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                        }`}
                    />
                  </div>

                  {/* Size */}
                  {/* <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Size</label>
                    <input
                      type="text"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      placeholder="e.g., M"
                      className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${fieldErrors.size ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                        }`}
                    />
                  </div> */}
                  {/* Size Type - moved above */}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Material & Weight</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Fabrication */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Fabrication</label>
                    <input
                      type="text"
                      name="fabrication"
                      value={formData.fabrication}
                      onChange={handleChange}
                      placeholder="e.g., 100% Cotton"
                      className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${fieldErrors.fabrication
                        ? "border-red-500 focus:ring-red-500"
                        : "border-border focus:ring-primary"
                        }`}
                    />
                  </div>

                  {/* Weight */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Weight</label>
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="e.g., 180"
                      className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${fieldErrors.weight ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                        }`}
                    />
                  </div>

                  {/* Weight Type */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Weight Type</label>
                    <select
                      name="weight_type"
                      value={formData.weight_type}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="GM">GM</option>
                      <option value="KG">KG</option>
                    </select>
                  </div>

                  {/* Sample Type */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Sample Type</label>
                    <select
                      name="types"
                      value={formData.types}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="DEVELOPMENT">DEVELOPMENT</option>
                      <option value="SALESMAN">SALESMAN</option>
                      <option value="STYLING">STYLING</option>
                      <option value="SHIPPING">SHIPPING</option>
                      <option value="FIT">FIT</option>
                      <option value="PRODUCTION">PRODUCTION</option>
                      <option value="PRE_PRODUCTION">PRE_PRODUCTION</option>
                      <option value="COUNTER">COUNTER</option>
                      <option value="SIZE_SET">SIZE_SET</option>
                      <option value="ORIGINAL">ORIGINAL</option>
                    </select>
                  </div>

                  {/* Arrival Date */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Arrival Date</label>
                    <input
                      type="datetime-local"
                      name="arrival_date"
                      value={formData.arrival_date}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${fieldErrors.arrival_date
                        ? "border-red-500 focus:ring-red-500"
                        : "border-border focus:ring-primary"
                        }`}
                    />
                  </div>

                  {/* Comments */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Comments</label>
                    <textarea
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      placeholder="Enter any additional comments"
                      className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${fieldErrors.comments ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                        }`}
                      rows={2}
                    />
                  </div>
                </div>
              </div>

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
                            className={formData.buyer_uids.length > 0 ? "text-foreground" : "text-muted-foreground"}
                          >
                            {formData.buyer_uids.length > 0
                              ? `${formData.buyer_uids.length} buyer(s) selected`
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
                              checked={formData.buyer_uids.includes(buyer.uid)}
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
                            className={formData.project_uids.length > 0 ? "text-foreground" : "text-muted-foreground"}
                          >
                            {formData.project_uids.length > 0
                              ? `${formData.project_uids.length} project(s) selected`
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
                              checked={formData.project_uids.includes(project.uid)}
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
                          <span className={formData.note_uids.length > 0 ? "text-foreground" : "text-muted-foreground"}>
                            {formData.note_uids.length > 0
                              ? `${formData.note_uids.length} note(s) selected`
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
                              checked={formData.note_uids.includes(note.uid)}
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

                {uploadedImages.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-foreground mb-3">
                      Uploaded Images ({uploadedImages.length})
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {uploadedImages.map((img) => (
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

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Sample"
                  )}
                </Button>
                <Link href={getBackUrl()} className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}