// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { useToast } from "@/hooks/use-toast"
// import { apiCall, getCookie } from "@/lib/auth-utils"
// import { Upload, X, Loader2 } from "lucide-react"
// import { useRouter } from "next/navigation"

// interface Buyer {
//   id: number
//   uid: string
//   name: string
//   status: string
// }

// interface Note {
//   id: number
//   uid: string
//   title: string
//   description: string
//   status: string
// }

// interface Project {
//   id: number
//   uid: string
//   name: string
//   status: string
// }

// interface SampleFormProps {
//   storageUid: string
//   buyers: Buyer[]
//   notes: Note[]
//   projects: Project[]
//   onSuccess: () => void
//   sampleData?: any
//   isEditMode?: boolean
// }

// export default function SampleForm({
//   storageUid,
//   buyers,
//   notes,
//   projects,
//   onSuccess,
//   sampleData,
//   isEditMode = false,
// }: SampleFormProps) {
//   const { toast } = useToast()
//   const router = useRouter()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [uploadedImages, setUploadedImages] = useState<Array<{ uid: string; preview: string; isNew: boolean }>>(
//     sampleData?.images?.map((img: any) => ({ uid: img.uid, preview: img.file, isNew: false })) || [],
//   )
//   const [isUploading, setIsUploading] = useState(false)

//   const [formData, setFormData] = useState({
//     name: sampleData?.name || "",
//     description: sampleData?.description || "",
//     arrival_date: sampleData?.arrival_date ? new Date(sampleData.arrival_date).toISOString().split("T")[0] : "",
//     style_no: sampleData?.style_no || "",
//     sku_no: sampleData?.sku_no || "",
//     item: sampleData?.item || "",
//     fabrication: sampleData?.fabrication || "",
//     weight: sampleData?.weight || "",
//     weight_type: sampleData?.weight_type || "GM",
//     size_type: sampleData?.size_type || "CENTIMETER",
//     types: sampleData?.types || "DEVELOPMENT",
//     color: sampleData?.color || "",
//     size: sampleData?.size || "",
//     comments: sampleData?.comments || "",
//     buyer_uids: sampleData?.buyers?.map((b: any) => b.uid) || [],
//     project_uids: sampleData?.projects?.map((p: any) => p.uid) || [],
//     note_uids: sampleData?.notes?.map((n: any) => n.uid) || [],
//   })

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

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.currentTarget.files
//     if (!files) return

//     setIsUploading(true)
//     try {
//       for (let i = 0; i < files.length; i++) {
//         const file = files[i]
//         const compressedBlob = await compressImage(file)

//         const imageFormData = new FormData()
//         imageFormData.append("file", new File([compressedBlob], file.name, { type: "image/jpeg" }))

//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/images/`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${getCookie("access_token")}`,
//           },
//           body: imageFormData,
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

//   const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

//   const handleNoteToggle = (noteUid: string) => {
//     setFormData((prev) => {
//       const current = prev.note_uids
//       if (current.includes(noteUid)) {
//         return { ...prev, note_uids: current.filter((uid) => uid !== noteUid) }
//       } else {
//         return { ...prev, note_uids: [...current, noteUid] }
//       }
//     })
//   }

//   const handleProjectToggle = (projectUid: string) => {
//     setFormData((prev) => {
//       const current = prev.project_uids
//       if (current.includes(projectUid)) {
//         return { ...prev, project_uids: current.filter((uid) => uid !== projectUid) }
//       } else {
//         return { ...prev, project_uids: [...current, projectUid] }
//       }
//     })
//   }

//   const handleSubmit = async () => {
//     if (!formData.name || !formData.style_no || !formData.sku_no) {
//       toast({
//         title: "Error",
//         description: "Please fill in all required fields",
//         variant: "destructive",
//       })
//       return
//     }

//     setIsSubmitting(true)

//     try {
//       const imageUids = uploadedImages.map((img) => img.uid)

//       const submitData = {
//         ...formData,
//         image_uids: imageUids,
//       }

//       const url = isEditMode
//         ? `/sample_manager/sample/${storageUid}/${sampleData.uid}`
//         : `/sample_manager/sample/${storageUid}`

//       const method = isEditMode ? "PUT" : "POST"

//       const response = await apiCall(url, {
//         method,
//         body: JSON.stringify(submitData),
//       })

//       if (!response.ok) {
//         throw new Error(isEditMode ? "Failed to update sample" : "Failed to create sample")
//       }

//       toast({
//         title: "Success",
//         description: isEditMode ? "Sample updated successfully" : "Sample created successfully",
//       })

//       localStorage.removeItem("sample_image_uids")
//       onSuccess()
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: err instanceof Error ? err.message : "An error occurred",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <Card className="border-border max-w-4xl">
//       <CardHeader className="border-b border-border">
//         <CardTitle>{isEditMode ? "Edit Sample" : "Create New Sample"}</CardTitle>
//       </CardHeader>
//       <CardContent className="pt-6">
//         <div className="space-y-6">
//           {/* Basic Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm font-medium text-foreground block mb-2">Sample Name *</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleFormChange}
//                 placeholder="Enter sample name"
//                 className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium text-foreground block mb-2">Style No. *</label>
//               <input
//                 type="text"
//                 name="style_no"
//                 value={formData.style_no}
//                 onChange={handleFormChange}
//                 placeholder="Enter style number"
//                 className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium text-foreground block mb-2">SKU No. *</label>
//               <input
//                 type="text"
//                 name="sku_no"
//                 value={formData.sku_no}
//                 onChange={handleFormChange}
//                 placeholder="Enter SKU number"
//                 className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium text-foreground block mb-2">Item</label>
//               <input
//                 type="text"
//                 name="item"
//                 value={formData.item}
//                 onChange={handleFormChange}
//                 placeholder="Enter item name"
//                 className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium text-foreground block mb-2">Arrival Date</label>
//               <input
//                 type="date"
//                 name="arrival_date"
//                 value={formData.arrival_date}
//                 onChange={handleFormChange}
//                 className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium text-foreground block mb-2">Color</label>
//               <input
//                 type="text"
//                 name="color"
//                 value={formData.color}
//                 onChange={handleFormChange}
//                 placeholder="Enter color"
//                 className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium text-foreground block mb-2">Size</label>
//               <input
//                 type="text"
//                 name="size"
//                 value={formData.size}
//                 onChange={handleFormChange}
//                 placeholder="Enter size"
//                 className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium text-foreground block mb-2">Fabrication</label>
//               <input
//                 type="text"
//                 name="fabrication"
//                 value={formData.fabrication}
//                 onChange={handleFormChange}
//                 placeholder="Enter fabrication details"
//                 className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium text-foreground block mb-2">Weight</label>
//               <input
//                 type="text"
//                 name="weight"
//                 value={formData.weight}
//                 onChange={handleFormChange}
//                 placeholder="Enter weight"
//                 className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium text-foreground block mb-2">Weight Type</label>
//               <select
//                 name="weight_type"
//                 value={formData.weight_type}
//                 onChange={handleFormChange}
//                 className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               >
//                 <option value="GM">Grams (GM)</option>
//                 <option value="KG">Kilograms (KG)</option>
//                 <option value="LBS">Pounds (LBS)</option>
//               </select>
//             </div>
//             <div>
//               <label className="text-sm font-medium text-foreground block mb-2">Size Type</label>
//               <select
//                 name="size_type"
//                 value={formData.size_type}
//                 onChange={handleFormChange}
//                 className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               >
//                 <option value="CENTIMETER">Centimeter</option>
//                 <option value="INCH">Inch</option>
//                 <option value="METER">Meter</option>
//               </select>
//             </div>
//             <div>
//               <label className="text-sm font-medium text-foreground block mb-2">Type</label>
//               <select
//                 name="types"
//                 value={formData.types}
//                 onChange={handleFormChange}
//                 className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               >
//                 <option value="DEVELOPMENT">Development</option>
//                 <option value="PRODUCTION">Production</option>
//                 <option value="PROTOTYPE">Prototype</option>
//               </select>
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="text-sm font-medium text-foreground block mb-2">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleFormChange}
//               placeholder="Enter sample description"
//               rows={3}
//               className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>

//           {/* Comments */}
//           <div>
//             <label className="text-sm font-medium text-foreground block mb-2">Comments</label>
//             <textarea
//               name="comments"
//               value={formData.comments}
//               onChange={handleFormChange}
//               placeholder="Enter additional comments"
//               rows={2}
//               className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="text-sm font-medium text-foreground block mb-2">Sample Images</label>
//             <div className="border-2 border-dashed border-border rounded-lg p-6 mb-4 text-center">
//               <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
//               <p className="text-sm text-muted-foreground mb-4">Click to upload images</p>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 disabled={isUploading}
//                 className="hidden"
//                 id="sample-image-input"
//               />
//               <label htmlFor="sample-image-input">
//                 <Button
//                   asChild
//                   disabled={isUploading}
//                   className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
//                 >
//                   <span>{isUploading ? "Uploading..." : "Select Images"}</span>
//                 </Button>
//               </label>
//             </div>

//             {uploadedImages.length > 0 && (
//               <div>
//                 <p className="text-sm font-medium text-foreground mb-3">Images ({uploadedImages.length})</p>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
//                   {uploadedImages.map((img) => (
//                     <div key={img.uid} className="relative group">
//                       <img
//                         src={img.preview || "/placeholder.svg"}
//                         alt="preview"
//                         className="w-full h-32 object-cover rounded-lg border border-border"
//                       />
//                       <button
//                         onClick={() => handleRemoveImage(img.uid)}
//                         className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Buyers Dropdown */}
//           <div>
//             <label className="text-sm font-medium text-foreground block mb-2">Buyers (Multi-select)</label>
//             <div className="border border-border rounded-lg p-4 bg-card max-h-48 overflow-y-auto">
//               {buyers.length > 0 ? (
//                 buyers.map((buyer) => (
//                   <label key={buyer.uid} className="flex items-center gap-2 mb-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={formData.buyer_uids.includes(buyer.uid)}
//                       onChange={() => handleBuyerToggle(buyer.uid)}
//                       className="rounded border-border"
//                     />
//                     <span className="text-sm text-foreground">{buyer.name}</span>
//                   </label>
//                 ))
//               ) : (
//                 <p className="text-sm text-muted-foreground">No buyers available</p>
//               )}
//             </div>
//           </div>

//           {/* Notes Dropdown */}
//           <div>
//             <label className="text-sm font-medium text-foreground block mb-2">Notes (Multi-select)</label>
//             <div className="border border-border rounded-lg p-4 bg-card max-h-48 overflow-y-auto">
//               {notes.length > 0 ? (
//                 notes.map((note) => (
//                   <label key={note.uid} className="flex items-center gap-2 mb-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={formData.note_uids.includes(note.uid)}
//                       onChange={() => handleNoteToggle(note.uid)}
//                       className="rounded border-border"
//                     />
//                     <span className="text-sm text-foreground">{note.title}</span>
//                   </label>
//                 ))
//               ) : (
//                 <p className="text-sm text-muted-foreground">No notes available</p>
//               )}
//             </div>
//           </div>

//           {/* Projects Dropdown */}
//           <div>
//             <label className="text-sm font-medium text-foreground block mb-2">Projects (Multi-select)</label>
//             <div className="border border-border rounded-lg p-4 bg-card max-h-48 overflow-y-auto">
//               {projects.length > 0 ? (
//                 projects.map((project) => (
//                   <label key={project.uid} className="flex items-center gap-2 mb-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={formData.project_uids.includes(project.uid)}
//                       onChange={() => handleProjectToggle(project.uid)}
//                       className="rounded border-border"
//                     />
//                     <span className="text-sm text-foreground">{project.name}</span>
//                   </label>
//                 ))
//               ) : (
//                 <p className="text-sm text-muted-foreground">No projects available</p>
//               )}
//             </div>
//           </div>

//           {/* Submit Buttons */}
//           <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
//             <Button
//               onClick={handleSubmit}
//               disabled={isSubmitting}
//               className="flex-1 bg-primary hover:bg-primary/90 text-white"
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   {isEditMode ? "Updating..." : "Creating..."}
//                 </>
//               ) : isEditMode ? (
//                 "Update Sample"
//               ) : (
//                 "Create Sample"
//               )}
//             </Button>
//             <Button variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
//               Cancel
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { apiCall, getCookie } from "@/lib/auth-utils"
import { Upload, X, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Buyer {
  id: number
  uid: string
  name: string
  status: string
}

interface Note {
  id: number
  uid: string
  title: string
  description: string
  status: string
}

interface Project {
  id: number
  uid: string
  name: string
  status: string
}

interface SampleFormProps {
  storageUid: string
  buyers: Buyer[]
  notes: Note[]
  projects: Project[]
  onSuccess: () => void
  sampleData?: any
  isEditMode?: boolean
}

export default function SampleForm({
  storageUid,
  buyers,
  notes,
  projects,
  onSuccess,
  sampleData,
  isEditMode = false,
}: SampleFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<Array<{ uid: string; preview: string; isNew: boolean }>>(
    sampleData?.images?.map((img: any) => ({ uid: img.uid, preview: img.file, isNew: false })) || [],
  )
  const [isUploading, setIsUploading] = useState(false)

  const [formData, setFormData] = useState({
    name: sampleData?.name || "",
    description: sampleData?.description || "",
    arrival_date: sampleData?.arrival_date ? new Date(sampleData.arrival_date).toISOString().split("T")[0] : "",
    style_no: sampleData?.style_no || "",
    sku_no: sampleData?.sku_no || "",
    item: sampleData?.item || "",
    fabrication: sampleData?.fabrication || "",
    weight: sampleData?.weight || "",
    weight_type: sampleData?.weight_type || "GM",
    size_type: sampleData?.size_type || "CENTIMETER",
    types: sampleData?.types || "DEVELOPMENT",
    color: sampleData?.color || "",
    size: sampleData?.size || "",
    comments: sampleData?.comments || "",
    buyer_uids: sampleData?.buyers?.map((b: any) => b.uid) || [],
    project_uids: sampleData?.projects?.map((p: any) => p.uid) || [],
    note_uids: sampleData?.notes?.map((n: any) => n.uid) || [],
  })

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (!files) return

    setIsUploading(true)
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const compressedBlob = await compressImage(file)

        const imageFormData = new FormData()
        imageFormData.append("file", new File([compressedBlob], file.name, { type: "image/jpeg" }))

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/images/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getCookie("access_token")}`,
          },
          body: imageFormData,
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleSubmit = async () => {
    if (!formData.name || !formData.style_no || !formData.sku_no) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const imageUids = uploadedImages.map((img) => img.uid)

      const submitData = {
        ...formData,
        image_uids: imageUids,
        storage_uid: storageUid,
      }

      const url = isEditMode
        ? `/sample_manager/sample/${storageUid}/${sampleData.uid}`
        : `/sample_manager/sample/${storageUid}`

      const method = isEditMode ? "PUT" : "POST"

      const response = await apiCall(url, {
        method,
        body: JSON.stringify(submitData),
      })

      if (!response.ok) {
        throw new Error(isEditMode ? "Failed to update sample" : "Failed to create sample")
      }

      toast({
        title: "Success",
        description: isEditMode ? "Sample updated successfully" : "Sample created successfully",
      })

      localStorage.removeItem("sample_image_uids")
      onSuccess()
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-border max-w-4xl">
      <CardHeader className="border-b border-border">
        <CardTitle>{isEditMode ? "Edit Sample" : "Create New Sample"}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Sample Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Enter sample name"
                className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Style No. *</label>
              <input
                type="text"
                name="style_no"
                value={formData.style_no}
                onChange={handleFormChange}
                placeholder="Enter style number"
                className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">SKU No. *</label>
              <input
                type="text"
                name="sku_no"
                value={formData.sku_no}
                onChange={handleFormChange}
                placeholder="Enter SKU number"
                className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Item</label>
              <input
                type="text"
                name="item"
                value={formData.item}
                onChange={handleFormChange}
                placeholder="Enter item name"
                className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Arrival Date</label>
              <input
                type="date"
                name="arrival_date"
                value={formData.arrival_date}
                onChange={handleFormChange}
                className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleFormChange}
                placeholder="Enter color"
                className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Size</label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleFormChange}
                placeholder="Enter size"
                className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Fabrication</label>
              <input
                type="text"
                name="fabrication"
                value={formData.fabrication}
                onChange={handleFormChange}
                placeholder="Enter fabrication details"
                className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Weight</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleFormChange}
                placeholder="Enter weight"
                className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Weight Type</label>
              <select
                name="weight_type"
                value={formData.weight_type}
                onChange={handleFormChange}
                className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="GM">Grams (GM)</option>
                <option value="KG">Kilograms (KG)</option>
                <option value="LBS">Pounds (LBS)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Size Type</label>
              <select
                name="size_type"
                value={formData.size_type}
                onChange={handleFormChange}
                className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="CENTIMETER">Centimeter</option>
                <option value="INCH">Inch</option>
                <option value="METER">Meter</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Type</label>
              <select
                name="types"
                value={formData.types}
                onChange={handleFormChange}
                className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="DEVELOPMENT">Development</option>
                <option value="PRODUCTION">Production</option>
                <option value="PROTOTYPE">Prototype</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              placeholder="Enter sample description"
              rows={3}
              className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Comments */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Comments</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleFormChange}
              placeholder="Enter additional comments"
              rows={2}
              className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Sample Images</label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 mb-4 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-4">Click to upload images</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="hidden"
                id="sample-image-input"
              />
              <label htmlFor="sample-image-input">
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
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
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
              </div>
            )}
          </div>

          {/* Buyers Dropdown */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Buyers (Multi-select)</label>
            <div className="border border-border rounded-lg p-4 bg-card max-h-48 overflow-y-auto">
              {buyers.length > 0 ? (
                buyers.map((buyer) => (
                  <label key={buyer.uid} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.buyer_uids.includes(buyer.uid)}
                      onChange={() => handleBuyerToggle(buyer.uid)}
                      className="rounded border-border"
                    />
                    <span className="text-sm text-foreground">{buyer.name}</span>
                  </label>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No buyers available</p>
              )}
            </div>
          </div>

          {/* Notes Dropdown */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Notes (Multi-select)</label>
            <div className="border border-border rounded-lg p-4 bg-card max-h-48 overflow-y-auto">
              {notes.length > 0 ? (
                notes.map((note) => (
                  <label key={note.uid} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.note_uids.includes(note.uid)}
                      onChange={() => handleNoteToggle(note.uid)}
                      className="rounded border-border"
                    />
                    <span className="text-sm text-foreground">{note.title}</span>
                  </label>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No notes available</p>
              )}
            </div>
          </div>

          {/* Projects Dropdown */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Projects (Multi-select)</label>
            <div className="border border-border rounded-lg p-4 bg-card max-h-48 overflow-y-auto">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <label key={project.uid} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.project_uids.includes(project.uid)}
                      onChange={() => handleProjectToggle(project.uid)}
                      className="rounded border-border"
                    />
                    <span className="text-sm text-foreground">{project.name}</span>
                  </label>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No projects available</p>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-primary hover:bg-primary/90 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : isEditMode ? (
                "Update Sample"
              ) : (
                "Create Sample"
              )}
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
