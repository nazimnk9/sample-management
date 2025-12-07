// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Loader2, ArrowLeft, Upload, X } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { apiCall, getCookie } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useRouter, useSearchParams } from "next/navigation"

// interface Buyer {
//   id: number
//   uid: string
//   name: string
// }

// interface Note {
//   id: number
//   uid: string
//   title: string
//   description: string
// }

// interface Project {
//   id: number
//   uid: string
//   name: string
// }

// interface UploadedImage {
//   uid: string
//   preview: string
// }

// export default function AddSamplePage() {
//   const { toast } = useToast()
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const storageUid = searchParams.get("storage_uid")

//   const [formData, setFormData] = useState({
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

//   const [buyers, setBuyers] = useState<Buyer[]>([])
//   const [notes, setNotes] = useState<Note[]>([])
//   const [projects, setProjects] = useState<Project[]>([])
//   const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [isUploading, setIsUploading] = useState(false)
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [buyersRes, notesRes, projectsRes] = await Promise.all([
//           apiCall("/sample_manager/buyer/"),
//           apiCall("/sample_manager/note/"),
//           apiCall("/sample_manager/project/"),
//         ])

//         if (buyersRes.ok) {
//           const buyersData = await buyersRes.json()
//           setBuyers(Array.isArray(buyersData) ? buyersData : buyersData.results || [])
//         }
//         if (notesRes.ok) {
//           const notesData = await notesRes.json()
//           setNotes(Array.isArray(notesData) ? notesData : notesData.results || [])
//         }
//         if (projectsRes.ok) {
//           const projectsData = await projectsRes.json()
//           setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err)
//       }
//     }
//     fetchData()
//   }, [])

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

//         const uploadFormData = new FormData()
//         uploadFormData.append("file", new File([compressedBlob], file.name, { type: "image/jpeg" }))

//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/images/`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${getCookie("access_token")}`,
//           },
//           body: uploadFormData,
//         })

//         if (!response.ok) {
//           throw new Error("Failed to upload image")
//         }

//         const data = await response.json()
//         const imagePreview = URL.createObjectURL(compressedBlob)

//         setUploadedImages((prev) => [...prev, { uid: data.uid, preview: imagePreview }])
//         const storedUids = localStorage.getItem("sample_image_uids")
//         const uids = storedUids ? JSON.parse(storedUids) : []
//         localStorage.setItem("sample_image_uids", JSON.stringify([...uids, data.uid]))
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
//     const storedUids = localStorage.getItem("sample_image_uids")
//     if (storedUids) {
//       const uids = JSON.parse(storedUids).filter((u: string) => u !== uid)
//       localStorage.setItem("sample_image_uids", JSON.stringify(uids))
//     }
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//     if (fieldErrors[name]) {
//       setFieldErrors((prev) => {
//         const newErrors = { ...prev }
//         delete newErrors[name]
//         return newErrors
//       })
//     }
//   }

//   const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>, fieldName: string) => {
//     const selected = Array.from(e.target.selectedOptions, (option) => option.value)
//     setFormData((prev) => ({ ...prev, [fieldName]: selected }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!storageUid) {
//       toast({ title: "Error", description: "Storage UID is missing", variant: "destructive" })
//       return
//     }

//     setFieldErrors({})
//     setIsLoading(true)

//     try {
//       const storedImageUids = localStorage.getItem("sample_image_uids")
//       const imageUids = storedImageUids ? JSON.parse(storedImageUids) : []

//       const submitData = {
//         ...formData,
//         image_uids: imageUids,
//         storage_uid: storageUid,
//       }

//       const response = await apiCall(`/sample_manager/sample/${storageUid}`, {
//         method: "POST",
//         body: JSON.stringify(submitData),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         if (typeof data === "object" && !Array.isArray(data)) {
//           setFieldErrors(data)
//         }
//         toast({ title: "Error", description: "Failed to create sample", variant: "destructive" })
//         return
//       }

//       localStorage.removeItem("sample_image_uids")
//       toast({ title: "Success", description: "Sample created successfully" })
//       router.push(`/space?parent_uid=${storageUid}`)
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to create sample", variant: "destructive" })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="max-w-4xl mx-auto">
//         <div className="mb-6 sm:mb-8 flex items-center gap-3">
//           <Link href={`/space${storageUid ? `?parent_uid=${storageUid}` : ""}`}>
//             <button className="p-2 hover:bg-muted rounded-lg transition">
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//           </Link>
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create New Sample</h1>
//             <p className="text-sm sm:text-base text-muted-foreground mt-2">Add a new sample with details and images</p>
//           </div>
//         </div>

//         <Card className="border-border">
//           <CardHeader className="pb-3 sm:pb-4">
//             <CardTitle className="text-base sm:text-lg">Sample Details</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Basic Information */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     placeholder="Sample name"
//                     className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name[0]}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Style No</label>
//                   <input
//                     type="text"
//                     name="style_no"
//                     value={formData.style_no}
//                     onChange={handleChange}
//                     placeholder="Style number"
//                     className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.style_no ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.style_no && <p className="text-sm text-red-600 mt-1">{fieldErrors.style_no[0]}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">SKU No</label>
//                   <input
//                     type="text"
//                     name="sku_no"
//                     value={formData.sku_no}
//                     onChange={handleChange}
//                     placeholder="SKU number"
//                     className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.sku_no ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.sku_no && <p className="text-sm text-red-600 mt-1">{fieldErrors.sku_no[0]}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Item</label>
//                   <input
//                     type="text"
//                     name="item"
//                     value={formData.item}
//                     onChange={handleChange}
//                     placeholder="Item description"
//                     className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.item ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.item && <p className="text-sm text-red-600 mt-1">{fieldErrors.item[0]}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Fabrication</label>
//                   <input
//                     type="text"
//                     name="fabrication"
//                     value={formData.fabrication}
//                     onChange={handleChange}
//                     placeholder="Fabric type"
//                     className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.fabrication ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.fabrication && <p className="text-sm text-red-600 mt-1">{fieldErrors.fabrication[0]}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Color</label>
//                   <input
//                     type="text"
//                     name="color"
//                     value={formData.color}
//                     onChange={handleChange}
//                     placeholder="Color"
//                     className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.color ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.color && <p className="text-sm text-red-600 mt-1">{fieldErrors.color[0]}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Size</label>
//                   <input
//                     type="text"
//                     name="size"
//                     value={formData.size}
//                     onChange={handleChange}
//                     placeholder="Size"
//                     className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.size ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.size && <p className="text-sm text-red-600 mt-1">{fieldErrors.size[0]}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Weight</label>
//                   <input
//                     type="text"
//                     name="weight"
//                     value={formData.weight}
//                     onChange={handleChange}
//                     placeholder="Weight"
//                     className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.weight ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.weight && <p className="text-sm text-red-600 mt-1">{fieldErrors.weight[0]}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Arrival Date</label>
//                   <input
//                     type="datetime-local"
//                     name="arrival_date"
//                     value={formData.arrival_date}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.arrival_date
//                         ? "border-red-500 focus:ring-red-500"
//                         : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.arrival_date && (
//                     <p className="text-sm text-red-600 mt-1">{fieldErrors.arrival_date[0]}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Description</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Sample description"
//                   className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                     fieldErrors.description ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                   }`}
//                   rows={3}
//                 />
//                 {fieldErrors.description && <p className="text-sm text-red-600 mt-1">{fieldErrors.description[0]}</p>}
//               </div>

//               {/* Comments */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Comments</label>
//                 <textarea
//                   name="comments"
//                   value={formData.comments}
//                   onChange={handleChange}
//                   placeholder="Additional comments"
//                   className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                     fieldErrors.comments ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                   }`}
//                   rows={2}
//                 />
//                 {fieldErrors.comments && <p className="text-sm text-red-600 mt-1">{fieldErrors.comments[0]}</p>}
//               </div>

//               {/* Multi-Select Fields */}
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Buyers</label>
//                   <select
//                     multiple
//                     name="buyer_uids"
//                     value={formData.buyer_uids}
//                     onChange={(e) => handleMultiSelect(e, "buyer_uids")}
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     size={4}
//                   >
//                     {buyers.map((buyer) => (
//                       <option key={buyer.uid} value={buyer.uid}>
//                         {buyer.name}
//                       </option>
//                     ))}
//                   </select>
//                   <p className="text-xs text-muted-foreground mt-1">Hold Ctrl/Cmd to select multiple</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Notes</label>
//                   <select
//                     multiple
//                     name="note_uids"
//                     value={formData.note_uids}
//                     onChange={(e) => handleMultiSelect(e, "note_uids")}
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     size={4}
//                   >
//                     {notes.map((note) => (
//                       <option key={note.uid} value={note.uid}>
//                         {note.title}
//                       </option>
//                     ))}
//                   </select>
//                   <p className="text-xs text-muted-foreground mt-1">Hold Ctrl/Cmd to select multiple</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Projects</label>
//                   <select
//                     multiple
//                     name="project_uids"
//                     value={formData.project_uids}
//                     onChange={(e) => handleMultiSelect(e, "project_uids")}
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     size={4}
//                   >
//                     {projects.map((project) => (
//                       <option key={project.uid} value={project.uid}>
//                         {project.name}
//                       </option>
//                     ))}
//                   </select>
//                   <p className="text-xs text-muted-foreground mt-1">Hold Ctrl/Cmd to select multiple</p>
//                 </div>
//               </div>

//               {/* Image Upload Section */}
//               <div className="border-t border-border pt-6">
//                 <label className="block text-sm font-medium text-foreground mb-4">Sample Images</label>

//                 <div className="border-2 border-dashed border-border rounded-lg p-6 mb-6 text-center">
//                   <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
//                   <p className="text-sm text-muted-foreground mb-4">
//                     Upload sample images (auto-compressed under 999kb)
//                   </p>
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     disabled={isUploading}
//                     className="hidden"
//                     id="image-input-sample"
//                   />
//                   <label htmlFor="image-input-sample">
//                     <Button
//                       type="button"
//                       asChild
//                       disabled={isUploading}
//                       className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
//                     >
//                       <span>{isUploading ? "Uploading..." : "Select Images"}</span>
//                     </Button>
//                   </label>
//                 </div>

//                 {uploadedImages.length > 0 && (
//                   <div>
//                     <p className="text-sm font-medium text-foreground mb-3">
//                       Uploaded Images ({uploadedImages.length})
//                     </p>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//                       {uploadedImages.map((img) => (
//                         <div key={img.uid} className="relative group">
//                           <img
//                             src={img.preview || "/placeholder.svg"}
//                             alt="preview"
//                             className="w-full h-32 object-cover rounded-lg border border-border"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => handleRemoveImage(img.uid)}
//                             className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Submit Buttons */}
//               <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
//                 <Button type="submit" disabled={isLoading} className="flex-1 bg-primary hover:bg-primary/90 text-white">
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                       Creating...
//                     </>
//                   ) : (
//                     "Create Sample"
//                   )}
//                 </Button>
//                 <Link href={`/space${storageUid ? `?parent_uid=${storageUid}` : ""}`} className="flex-1">
//                   <Button type="button" variant="outline" className="w-full bg-transparent">
//                     Cancel
//                   </Button>
//                 </Link>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Loader2, ArrowLeft, X, Upload } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { apiCall, getCookie } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useRouter, useSearchParams } from "next/navigation"

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

// interface ImagePreview {
//   uid: string
//   preview: string
// }

// export default function AddSamplePage() {
//   const { toast } = useToast()
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const storageUid = searchParams.get("storage_uid")

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     item: "",
//     style_no: "",
//     sku_no: "",
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

//   const [buyers, setBuyers] = useState<Buyer[]>([])
//   const [projects, setProjects] = useState<Project[]>([])
//   const [notes, setNotes] = useState<Note[]>([])
//   const [uploadedImages, setUploadedImages] = useState<ImagePreview[]>([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [isUploading, setIsUploading] = useState(false)
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

//   useEffect(() => {
//     if (!storageUid) {
//       toast({ title: "Error", description: "Storage ID is required", variant: "destructive" })
//       router.push("/space")
//       return
//     }
//     fetchDropdownData()
//   }, [storageUid])

//   const fetchDropdownData = async () => {
//     try {
//       const [buyersRes, projectsRes, notesRes] = await Promise.all([
//         apiCall("/sample_manager/buyer/"),
//         apiCall("/sample_manager/project/"),
//         apiCall("/sample_manager/note/"),
//       ])

//       if (buyersRes.ok) {
//         const data = await buyersRes.json()
//         setBuyers(Array.isArray(data) ? data : data.results || [])
//       }

//       if (projectsRes.ok) {
//         const data = await projectsRes.json()
//         setProjects(Array.isArray(data) ? data : data.results || [])
//       }

//       if (notesRes.ok) {
//         const data = await notesRes.json()
//         setNotes(Array.isArray(data) ? data : data.results || [])
//       }
//     } catch (err) {
//       console.error("Error fetching dropdown data:", err)
//       toast({ title: "Error", description: "Failed to load dropdown data", variant: "destructive" })
//     }
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
//           let quality = 0.9

//           // Resize if too large
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

//           // Compress to under 999kb
//           const compressRecursive = () => {
//             canvas.toBlob(
//               (blob) => {
//                 if (blob && blob.size < 999000) {
//                   resolve(blob)
//                 } else if (quality > 0.1) {
//                   quality -= 0.1
//                   compressRecursive()
//                 } else {
//                   resolve(blob || new Blob())
//                 }
//               },
//               "image/jpeg",
//               quality,
//             )
//           }
//           compressRecursive()
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

//         const formDataUpload = new FormData()
//         formDataUpload.append("file", new File([compressedBlob], file.name, { type: "image/jpeg" }))

//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/images/`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${getCookie("access_token")}`,
//           },
//           body: formDataUpload,
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

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//     if (fieldErrors[name]) {
//       setFieldErrors((prev) => {
//         const newErrors = { ...prev }
//         delete newErrors[name]
//         return newErrors
//       })
//     }
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

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setFieldErrors({})
//     setIsLoading(true)

//     try {
//       const imageUids = uploadedImages.map((img) => img.uid)

//       const submitData = {
//         ...formData,
//         image_uids: imageUids,
//         storage_uid: storageUid,
//       }

//       const response = await apiCall(`/sample_manager/sample/${storageUid}`, {
//         method: "POST",
//         body: JSON.stringify(submitData),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         if (typeof data === "object" && !Array.isArray(data)) {
//           setFieldErrors(data)
//         }
//         toast({ title: "Error", description: "Failed to create sample", variant: "destructive" })
//         return
//       }

//       toast({ title: "Success", description: "Sample created successfully" })
//       router.push("/space")
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to create sample", variant: "destructive" })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="max-w-4xl mx-auto">
//         <div className="mb-6 sm:mb-8 flex items-center gap-3">
//           <Link href="/space">
//             <button className="p-2 hover:bg-muted rounded-lg transition">
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//           </Link>
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create New Sample</h1>
//             <p className="text-sm sm:text-base text-muted-foreground mt-2">Add a new sample to the space</p>
//           </div>
//         </div>

//         <Card className="border-border">
//           <CardContent className="pt-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Basic Information */}
//               <div>
//                 <h3 className="text-lg font-semibold text-foreground mb-4">Basic Information</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       placeholder="Sample name"
//                       className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                         fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                       }`}
//                     />
//                     {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name[0]}</p>}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-foreground mb-2">Item</label>
//                     <input
//                       type="text"
//                       name="item"
//                       value={formData.item}
//                       onChange={handleChange}
//                       placeholder="Item"
//                       className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-foreground mb-2">Style No</label>
//                     <input
//                       type="text"
//                       name="style_no"
//                       value={formData.style_no}
//                       onChange={handleChange}
//                       placeholder="Style number"
//                       className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-foreground mb-2">SKU No</label>
//                     <input
//                       type="text"
//                       name="sku_no"
//                       value={formData.sku_no}
//                       onChange={handleChange}
//                       placeholder="SKU number"
//                       className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Description</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Sample description"
//                   className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   rows={3}
//                 />
//               </div>

//               {/* Fabrication Details */}
//               <div>
//                 <h3 className="text-lg font-semibold text-foreground mb-4">Fabrication Details</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-foreground mb-2">Fabrication</label>
//                     <input
//                       type="text"
//                       name="fabrication"
//                       value={formData.fabrication}
//                       onChange={handleChange}
//                       placeholder="Fabrication type"
//                       className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-foreground mb-2">Color</label>
//                     <input
//                       type="text"
//                       name="color"
//                       value={formData.color}
//                       onChange={handleChange}
//                       placeholder="Color"
//                       className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-foreground mb-2">Size</label>
//                     <input
//                       type="text"
//                       name="size"
//                       value={formData.size}
//                       onChange={handleChange}
//                       placeholder="Size"
//                       className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-foreground mb-2">Weight</label>
//                     <input
//                       type="text"
//                       name="weight"
//                       value={formData.weight}
//                       onChange={handleChange}
//                       placeholder="Weight"
//                       className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-foreground mb-2">Weight Type</label>
//                     <select
//                       name="weight_type"
//                       value={formData.weight_type}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     >
//                       <option value="GM">Gram (GM)</option>
//                       <option value="KG">Kilogram (KG)</option>
//                       <option value="LB">Pound (LB)</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-foreground mb-2">Size Type</label>
//                     <select
//                       name="size_type"
//                       value={formData.size_type}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     >
//                       <option value="CENTIMETER">Centimeter</option>
//                       <option value="INCH">Inch</option>
//                       <option value="METER">Meter</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-foreground mb-2">Type</label>
//                     <select
//                       name="types"
//                       value={formData.types}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     >
//                       <option value="DEVELOPMENT">Development</option>
//                       <option value="PRODUCTION">Production</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-foreground mb-2">Arrival Date</label>
//                     <input
//                       type="datetime-local"
//                       name="arrival_date"
//                       value={formData.arrival_date}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Comments */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Comments</label>
//                 <textarea
//                   name="comments"
//                   value={formData.comments}
//                   onChange={handleChange}
//                   placeholder="Additional comments"
//                   className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   rows={2}
//                 />
//               </div>

//               {/* Buyers Dropdown */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Buyers</label>
//                 <div className="border border-border rounded-lg p-4 bg-card max-h-48 overflow-y-auto">
//                   {buyers.length > 0 ? (
//                     <div className="space-y-2">
//                       {buyers.map((buyer) => (
//                         <label key={buyer.uid} className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={formData.buyer_uids.includes(buyer.uid)}
//                             onChange={() => handleBuyerToggle(buyer.uid)}
//                             className="w-4 h-4 rounded border-border"
//                           />
//                           <span className="text-sm text-foreground">{buyer.name}</span>
//                         </label>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-sm text-muted-foreground">No buyers available</p>
//                   )}
//                 </div>
//               </div>

//               {/* Projects Dropdown */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Projects</label>
//                 <div className="border border-border rounded-lg p-4 bg-card max-h-48 overflow-y-auto">
//                   {projects.length > 0 ? (
//                     <div className="space-y-2">
//                       {projects.map((project) => (
//                         <label key={project.uid} className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={formData.project_uids.includes(project.uid)}
//                             onChange={() => handleProjectToggle(project.uid)}
//                             className="w-4 h-4 rounded border-border"
//                           />
//                           <span className="text-sm text-foreground">{project.name}</span>
//                         </label>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-sm text-muted-foreground">No projects available</p>
//                   )}
//                 </div>
//               </div>

//               {/* Notes Dropdown */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Notes</label>
//                 <div className="border border-border rounded-lg p-4 bg-card max-h-48 overflow-y-auto">
//                   {notes.length > 0 ? (
//                     <div className="space-y-2">
//                       {notes.map((note) => (
//                         <label key={note.uid} className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={formData.note_uids.includes(note.uid)}
//                             onChange={() => handleNoteToggle(note.uid)}
//                             className="w-4 h-4 rounded border-border"
//                           />
//                           <span className="text-sm text-foreground">{note.title || note.uid}</span>
//                         </label>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-sm text-muted-foreground">No notes available</p>
//                   )}
//                 </div>
//               </div>

//               {/* Image Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Images</label>
//                 <div className="border-2 border-dashed border-border rounded-lg p-6 mb-4 text-center">
//                   <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
//                   <p className="text-sm text-muted-foreground mb-4">Upload images for the sample</p>
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     disabled={isUploading}
//                     className="hidden"
//                     id="sample-image-input"
//                   />
//                   <label htmlFor="sample-image-input">
//                     <Button
//                       type="button"
//                       asChild
//                       disabled={isUploading}
//                       className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
//                     >
//                       <span>{isUploading ? "Uploading..." : "Select Images"}</span>
//                     </Button>
//                   </label>
//                 </div>

//                 {uploadedImages.length > 0 && (
//                   <div>
//                     <p className="text-sm font-medium text-foreground mb-3">Images ({uploadedImages.length})</p>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
//                       {uploadedImages.map((img) => (
//                         <div key={img.uid} className="relative group">
//                           <img
//                             src={img.preview || "/placeholder.svg"}
//                             alt="preview"
//                             className="w-full h-32 object-cover rounded-lg border border-border"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => handleRemoveImage(img.uid)}
//                             className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Submit Buttons */}
//               <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
//                 <Button type="submit" disabled={isLoading} className="flex-1 bg-primary hover:bg-primary/90 text-white">
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                       Creating...
//                     </>
//                   ) : (
//                     "Create Sample"
//                   )}
//                 </Button>
//                 <Link href="/space" className="flex-1">
//                   <Button type="button" variant="outline" className="w-full bg-transparent">
//                     Cancel
//                   </Button>
//                 </Link>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Loader2, ArrowLeft, Upload, X } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { apiCall, getCookie } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useRouter, useSearchParams } from "next/navigation"

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

// export default function AddSamplePage() {
//   const { toast } = useToast()
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const storageUid = searchParams.get("storage_uid")

//   const [formData, setFormData] = useState({
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
//   })

//   const [buyers, setBuyers] = useState<Buyer[]>([])
//   const [projects, setProjects] = useState<Project[]>([])
//   const [notes, setNotes] = useState<Note[]>([])
//   const [selectedBuyers, setSelectedBuyers] = useState<string[]>([])
//   const [selectedProjects, setSelectedProjects] = useState<string[]>([])
//   const [selectedNotes, setSelectedNotes] = useState<string[]>([])

//   const [uploadedImages, setUploadedImages] = useState<Array<{ uid: string; preview: string }>>([])
//   const [isUploading, setIsUploading] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (!storageUid) {
//           toast({ title: "Error", description: "Storage UID is required", variant: "destructive" })
//           router.push("/space")
//           return
//         }

//         // Fetch buyers
//         const buyersResponse = await apiCall("/sample_manager/buyer/")
//         if (buyersResponse.ok) {
//           const buyersData = await buyersResponse.json()
//           setBuyers(Array.isArray(buyersData) ? buyersData : buyersData.results || [])
//         }

//         // Fetch projects
//         const projectsResponse = await apiCall("/sample_manager/project/")
//         if (projectsResponse.ok) {
//           const projectsData = await projectsResponse.json()
//           setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
//         }

//         // Fetch notes
//         const notesResponse = await apiCall("/sample_manager/note/")
//         if (notesResponse.ok) {
//           const notesData = await notesResponse.json()
//           setNotes(Array.isArray(notesData) ? notesData : notesData.results || [])
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err)
//         toast({ title: "Error", description: "Failed to load data", variant: "destructive" })
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchData()
//   }, [storageUid, router, toast])

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

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//     if (fieldErrors[name]) {
//       setFieldErrors((prev) => {
//         const newErrors = { ...prev }
//         delete newErrors[name]
//         return newErrors
//       })
//     }
//   }

//   const handleBuyerToggle = (buyerUid: string) => {
//     setSelectedBuyers((prev) =>
//       prev.includes(buyerUid) ? prev.filter((uid) => uid !== buyerUid) : [...prev, buyerUid],
//     )
//   }

//   const handleProjectToggle = (projectUid: string) => {
//     setSelectedProjects((prev) =>
//       prev.includes(projectUid) ? prev.filter((uid) => uid !== projectUid) : [...prev, projectUid],
//     )
//   }

//   const handleNoteToggle = (noteUid: string) => {
//     setSelectedNotes((prev) => (prev.includes(noteUid) ? prev.filter((uid) => uid !== noteUid) : [...prev, noteUid]))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setFieldErrors({})
//     setIsSubmitting(true)

//     try {
//       if (!formData.name) {
//         toast({ title: "Error", description: "Sample name is required", variant: "destructive" })
//         setIsSubmitting(false)
//         return
//       }

//       const submitData = {
//         ...formData,
//         storage_uid: storageUid,
//         buyer_uids: selectedBuyers,
//         project_uids: selectedProjects,
//         note_uids: selectedNotes,
//         image_uids: uploadedImages.map((img) => img.uid),
//       }

//       const response = await apiCall(`/sample_manager/sample/${storageUid}`, {
//         method: "POST",
//         body: JSON.stringify(submitData),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         if (typeof data === "object" && !Array.isArray(data)) {
//           setFieldErrors(data)
//         }
//         toast({ title: "Error", description: "Failed to create sample", variant: "destructive" })
//         return
//       }

//       toast({ title: "Success", description: "Sample created successfully" })
//       router.push("/space")
//     } catch (err) {
//       console.error("Error:", err)
//       toast({ title: "Error", description: "Failed to create sample", variant: "destructive" })
//     } finally {
//       setIsSubmitting(false)
//     }
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
//       <div className="max-w-4xl mx-auto">
//         <div className="mb-6 sm:mb-8 flex items-center gap-3">
//           <Link href="/space">
//             <button className="p-2 hover:bg-muted rounded-lg transition">
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//           </Link>
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create New Sample</h1>
//             <p className="text-sm sm:text-base text-muted-foreground mt-2">Add a new sample to your storage</p>
//           </div>
//         </div>

//         <Card className="border-border">
//           <CardHeader className="pb-3 sm:pb-4">
//             <CardTitle className="text-base sm:text-lg">Sample Details</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Basic Info */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Sample Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter sample name"
//                     className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name[0]}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Style Number</label>
//                   <input
//                     type="text"
//                     name="style_no"
//                     value={formData.style_no}
//                     onChange={handleChange}
//                     placeholder="Enter style number"
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">SKU Number</label>
//                   <input
//                     type="text"
//                     name="sku_no"
//                     value={formData.sku_no}
//                     onChange={handleChange}
//                     placeholder="Enter SKU number"
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Item</label>
//                   <input
//                     type="text"
//                     name="item"
//                     value={formData.item}
//                     onChange={handleChange}
//                     placeholder="Enter item name"
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Color</label>
//                   <input
//                     type="text"
//                     name="color"
//                     value={formData.color}
//                     onChange={handleChange}
//                     placeholder="Enter color"
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Size</label>
//                   <input
//                     type="text"
//                     name="size"
//                     value={formData.size}
//                     onChange={handleChange}
//                     placeholder="Enter size"
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>
//               </div>

//               {/* Details */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Fabrication</label>
//                   <input
//                     type="text"
//                     name="fabrication"
//                     value={formData.fabrication}
//                     onChange={handleChange}
//                     placeholder="Enter fabrication"
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Weight</label>
//                   <input
//                     type="text"
//                     name="weight"
//                     value={formData.weight}
//                     onChange={handleChange}
//                     placeholder="Enter weight"
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Weight Type</label>
//                   <select
//                     name="weight_type"
//                     value={formData.weight_type}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   >
//                     <option value="GM">GM</option>
//                     <option value="KG">KG</option>
//                     <option value="LB">LB</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Size Type</label>
//                   <select
//                     name="size_type"
//                     value={formData.size_type}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   >
//                     <option value="CENTIMETER">CENTIMETER</option>
//                     <option value="INCH">INCH</option>
//                     <option value="METER">METER</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Type</label>
//                   <select
//                     name="types"
//                     value={formData.types}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   >
//                     <option value="DEVELOPMENT">DEVELOPMENT</option>
//                     <option value="PRODUCTION">PRODUCTION</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Arrival Date</label>
//                   <input
//                     type="datetime-local"
//                     name="arrival_date"
//                     value={formData.arrival_date}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>
//               </div>

//               {/* Description and Comments */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Description</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Enter sample description"
//                   className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   rows={3}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Comments</label>
//                 <textarea
//                   name="comments"
//                   value={formData.comments}
//                   onChange={handleChange}
//                   placeholder="Enter additional comments"
//                   className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   rows={2}
//                 />
//               </div>

//               {/* Buyers Multi-Select */}
//               {buyers.length > 0 && (
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Buyers</label>
//                   <div className="space-y-2 border border-border rounded-lg p-3 bg-card max-h-40 overflow-y-auto">
//                     {buyers.map((buyer) => (
//                       <label key={buyer.uid} className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={selectedBuyers.includes(buyer.uid)}
//                           onChange={() => handleBuyerToggle(buyer.uid)}
//                           className="w-4 h-4 rounded border-border"
//                         />
//                         <span className="text-sm text-foreground">{buyer.name}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Projects Multi-Select */}
//               {projects.length > 0 && (
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Projects</label>
//                   <div className="space-y-2 border border-border rounded-lg p-3 bg-card max-h-40 overflow-y-auto">
//                     {projects.map((project) => (
//                       <label key={project.uid} className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={selectedProjects.includes(project.uid)}
//                           onChange={() => handleProjectToggle(project.uid)}
//                           className="w-4 h-4 rounded border-border"
//                         />
//                         <span className="text-sm text-foreground">{project.name}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Notes Multi-Select */}
//               {notes.length > 0 && (
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Notes</label>
//                   <div className="space-y-2 border border-border rounded-lg p-3 bg-card max-h-40 overflow-y-auto">
//                     {notes.map((note) => (
//                       <label key={note.uid} className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={selectedNotes.includes(note.uid)}
//                           onChange={() => handleNoteToggle(note.uid)}
//                           className="w-4 h-4 rounded border-border"
//                         />
//                         <span className="text-sm text-foreground">{note.title}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Image Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Images</label>
//                 <div className="border-2 border-dashed border-border rounded-lg p-6 mb-4 text-center">
//                   <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
//                   <p className="text-sm text-muted-foreground mb-4">Upload images or click to select</p>
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={handleFileSelect}
//                     disabled={isUploading}
//                     className="hidden"
//                     id="image-input"
//                   />
//                   <label htmlFor="image-input">
//                     <Button
//                       asChild
//                       disabled={isUploading}
//                       className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
//                     >
//                       <span>{isUploading ? "Uploading..." : "Select Images"}</span>
//                     </Button>
//                   </label>
//                 </div>

//                 {uploadedImages.length > 0 && (
//                   <div>
//                     <p className="text-sm font-medium text-foreground mb-3">Images ({uploadedImages.length})</p>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                       {uploadedImages.map((img) => (
//                         <div key={img.uid} className="relative group">
//                           <img
//                             src={img.preview || "/placeholder.svg"}
//                             alt="preview"
//                             className="w-full h-24 object-cover rounded-lg border border-border"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => handleRemoveImage(img.uid)}
//                             className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Submit Buttons */}
//               <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
//                 <Button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="flex-1 bg-primary hover:bg-primary/90 text-white"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                       Creating...
//                     </>
//                   ) : (
//                     "Create Sample"
//                   )}
//                 </Button>
//                 <Link href="/space" className="flex-1">
//                   <Button type="button" variant="outline" className="w-full bg-transparent">
//                     Cancel
//                   </Button>
//                 </Link>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }


// "use client"

// import { useState, useEffect } from "react"
// import { useSearchParams, useRouter } from "next/navigation"
// import { useToast } from "@/hooks/use-toast"
// import { apiCall } from "@/lib/auth-utils"
// import SampleForm from "@/components/pages/sample-form"
// import { ChevronLeft, Loader2 } from "lucide-react"

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

// interface SpaceBreadcrumb {
//   uid: string
//   name: string
// }

// export default function AddSamplePage() {
//   const router = useRouter()
//   const { toast } = useToast()
//   const searchParams = useSearchParams()
//   const storageUid = searchParams.get("storage_uid")

//   const [buyers, setBuyers] = useState<Buyer[]>([])
//   const [notes, setNotes] = useState<Note[]>([])
//   const [projects, setProjects] = useState<Project[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [spaceBreadcrumbs, setSpaceBreadcrumbs] = useState<SpaceBreadcrumb[]>([])

//   useEffect(() => {
//     if (!storageUid) {
//       router.push("/space")
//       return
//     }

//     const fetchData = async () => {
//       try {
//         // Fetch breadcrumb info
//         const spaceResponse = await apiCall(`/sample_manager/storage/${storageUid}`)
//         if (spaceResponse.ok) {
//           const spaceData = await spaceResponse.json()
//           setSpaceBreadcrumbs([{ uid: spaceData.uid, name: spaceData.name }])
//         }

//         // Fetch buyers
//         const buyersResponse = await apiCall("/sample_manager/buyer/")
//         if (buyersResponse.ok) {
//           const buyersData = await buyersResponse.json()
//           setBuyers(Array.isArray(buyersData) ? buyersData : buyersData.results || [])
//         }

//         // Fetch notes
//         const notesResponse = await apiCall("/sample_manager/note/")
//         if (notesResponse.ok) {
//           const notesData = await notesResponse.json()
//           setNotes(Array.isArray(notesData) ? notesData : notesData.results || [])
//         }

//         // Fetch projects
//         const projectsResponse = await apiCall("/sample_manager/project/")
//         if (projectsResponse.ok) {
//           const projectsData = await projectsResponse.json()
//           setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
//         }

//         setIsLoading(false)
//       } catch (err) {
//         console.error("Error fetching data:", err)
//         toast({
//           title: "Error",
//           description: "Failed to fetch required data",
//           variant: "destructive",
//         })
//         setIsLoading(false)
//       }
//     }

//     fetchData()
//   }, [storageUid, router, toast])

//   if (!storageUid) {
//     return null
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
//       {/* Header with Back Button */}
//       <div className="mb-6 sm:mb-8 flex items-center gap-3">
//         <button onClick={() => router.back()} className="p-2 hover:bg-muted rounded-lg transition">
//           <ChevronLeft className="w-5 h-5" />
//         </button>
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create Sample</h1>
//           {spaceBreadcrumbs.length > 0 && (
//             <p className="text-sm sm:text-base text-muted-foreground mt-2">Space: {spaceBreadcrumbs[0].name}</p>
//           )}
//         </div>
//       </div>

//       {/* Sample Form */}
//       <SampleForm
//         storageUid={storageUid}
//         buyers={buyers}
//         notes={notes}
//         projects={projects}
//         onSuccess={() => router.push(`/space?focus=${storageUid}`)}
//       />
//     </div>
//   )
// }


// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Loader2, ArrowLeft, Upload, X } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { apiCall, getCookie } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useRouter, useSearchParams } from "next/navigation"

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

// export default function AddSamplePage() {
//   const { toast } = useToast()
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const storageUid = searchParams.get("storage_uid")

//   const [formData, setFormData] = useState({
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
//   })

//   const [buyers, setBuyers] = useState<Buyer[]>([])
//   const [projects, setProjects] = useState<Project[]>([])
//   const [notes, setNotes] = useState<Note[]>([])
//   const [selectedBuyers, setSelectedBuyers] = useState<string[]>([])
//   const [selectedProjects, setSelectedProjects] = useState<string[]>([])
//   const [selectedNotes, setSelectedNotes] = useState<string[]>([])

//   const [uploadedImages, setUploadedImages] = useState<Array<{ uid: string; preview: string }>>([])
//   const [isUploading, setIsUploading] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (!storageUid) {
//           toast({ title: "Error", description: "Storage UID is required", variant: "destructive" })
//           router.push("/space")
//           return
//         }

//         // Fetch buyers
//         const buyersResponse = await apiCall("/sample_manager/buyer/")
//         if (buyersResponse.ok) {
//           const buyersData = await buyersResponse.json()
//           setBuyers(Array.isArray(buyersData) ? buyersData : buyersData.results || [])
//         }

//         // Fetch projects
//         const projectsResponse = await apiCall("/sample_manager/project/")
//         if (projectsResponse.ok) {
//           const projectsData = await projectsResponse.json()
//           setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
//         }

//         // Fetch notes
//         const notesResponse = await apiCall("/sample_manager/note/")
//         if (notesResponse.ok) {
//           const notesData = await notesResponse.json()
//           setNotes(Array.isArray(notesData) ? notesData : notesData.results || [])
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err)
//         toast({ title: "Error", description: "Failed to load data", variant: "destructive" })
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchData()
//   }, [storageUid, router, toast])

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

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//     if (fieldErrors[name]) {
//       setFieldErrors((prev) => {
//         const newErrors = { ...prev }
//         delete newErrors[name]
//         return newErrors
//       })
//     }
//   }

//   const handleBuyerToggle = (buyerUid: string) => {
//     setSelectedBuyers((prev) =>
//       prev.includes(buyerUid) ? prev.filter((uid) => uid !== buyerUid) : [...prev, buyerUid],
//     )
//   }

//   const handleProjectToggle = (projectUid: string) => {
//     setSelectedProjects((prev) =>
//       prev.includes(projectUid) ? prev.filter((uid) => uid !== projectUid) : [...prev, projectUid],
//     )
//   }

//   const handleNoteToggle = (noteUid: string) => {
//     setSelectedNotes((prev) => (prev.includes(noteUid) ? prev.filter((uid) => uid !== noteUid) : [...prev, noteUid]))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setFieldErrors({})
//     setIsSubmitting(true)

//     try {
//       if (!formData.name) {
//         toast({ title: "Error", description: "Sample name is required", variant: "destructive" })
//         setIsSubmitting(false)
//         return
//       }

//       const submitData = {
//         ...formData,
//         storage_uid: storageUid,
//         buyer_uids: selectedBuyers,
//         project_uids: selectedProjects,
//         note_uids: selectedNotes,
//         image_uids: uploadedImages.map((img) => img.uid),
//       }

//       const response = await apiCall(`/sample_manager/sample/${storageUid}`, {
//         method: "POST",
//         body: JSON.stringify(submitData),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         if (typeof data === "object" && !Array.isArray(data)) {
//           setFieldErrors(data)
//         }
//         toast({ title: "Error", description: "Failed to create sample", variant: "destructive" })
//         return
//       }

//       toast({ title: "Success", description: "Sample created successfully" })
//       router.push("/space")
//     } catch (err) {
//       console.error("Error:", err)
//       toast({ title: "Error", description: "Failed to create sample", variant: "destructive" })
//     } finally {
//       setIsSubmitting(false)
//     }
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
//       <div className="max-w-4xl mx-auto">
//         <div className="mb-6 sm:mb-8 flex items-center gap-3">
//           <Link href="/space">
//             <button className="p-2 hover:bg-muted rounded-lg transition">
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//           </Link>
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create New Sample</h1>
//             <p className="text-sm sm:text-base text-muted-foreground mt-2">Add a new sample to your storage</p>
//           </div>
//         </div>

//         <Card className="border-border">
//           <CardHeader className="pb-3 sm:pb-4">
//             <CardTitle className="text-base sm:text-lg">Sample Details</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Basic Info */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Sample Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter sample name"
//                     className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name[0]}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Style Number</label>
//                   <input
//                     type="text"
//                     name="style_no"
//                     value={formData.style_no}
//                     onChange={handleChange}
//                     placeholder="Enter style number"
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">SKU Number</label>
//                   <input
//                     type="text"
//                     name="sku_no"
//                     value={formData.sku_no}
//                     onChange={handleChange}
//                     placeholder="Enter SKU number"
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Item</label>
//                   <input
//                     type="text"
//                     name="item"
//                     value={formData.item}
//                     onChange={handleChange}
//                     placeholder="Enter item name"
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Color</label>
//                   <input
//                     type="text"
//                     name="color"
//                     value={formData.color}
//                     onChange={handleChange}
//                     placeholder="Enter color"
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Size</label>
//                   <input
//                     type="text"
//                     name="size"
//                     value={formData.size}
//                     onChange={handleChange}
//                     placeholder="Enter size"
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>
//               </div>

//               {/* Details */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Fabrication</label>
//                   <input
//                     type="text"
//                     name="fabrication"
//                     value={formData.fabrication}
//                     onChange={handleChange}
//                     placeholder="Enter fabrication"
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Weight</label>
//                   <input
//                     type="text"
//                     name="weight"
//                     value={formData.weight}
//                     onChange={handleChange}
//                     placeholder="Enter weight"
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Weight Type</label>
//                   <select
//                     name="weight_type"
//                     value={formData.weight_type}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   >
//                     <option value="GM">GM</option>
//                     <option value="KG">KG</option>
//                     <option value="LB">LB</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Size Type</label>
//                   <select
//                     name="size_type"
//                     value={formData.size_type}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   >
//                     <option value="CENTIMETER">CENTIMETER</option>
//                     <option value="INCH">INCH</option>
//                     <option value="METER">METER</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Type</label>
//                   <select
//                     name="types"
//                     value={formData.types}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   >
//                     <option value="DEVELOPMENT">DEVELOPMENT</option>
//                     <option value="PRODUCTION">PRODUCTION</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Arrival Date</label>
//                   <input
//                     type="datetime-local"
//                     name="arrival_date"
//                     value={formData.arrival_date}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>
//               </div>

//               {/* Description and Comments */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Description</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Enter sample description"
//                   className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   rows={3}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Comments</label>
//                 <textarea
//                   name="comments"
//                   value={formData.comments}
//                   onChange={handleChange}
//                   placeholder="Enter additional comments"
//                   className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   rows={2}
//                 />
//               </div>

//               {/* Buyers Multi-Select */}
//               {buyers.length > 0 && (
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Buyers</label>
//                   <div className="space-y-2 border border-border rounded-lg p-3 bg-card max-h-40 overflow-y-auto">
//                     {buyers.map((buyer) => (
//                       <label key={buyer.uid} className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={selectedBuyers.includes(buyer.uid)}
//                           onChange={() => handleBuyerToggle(buyer.uid)}
//                           className="w-4 h-4 rounded border-border"
//                         />
//                         <span className="text-sm text-foreground">{buyer.name}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Projects Multi-Select */}
//               {projects.length > 0 && (
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Projects</label>
//                   <div className="space-y-2 border border-border rounded-lg p-3 bg-card max-h-40 overflow-y-auto">
//                     {projects.map((project) => (
//                       <label key={project.uid} className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={selectedProjects.includes(project.uid)}
//                           onChange={() => handleProjectToggle(project.uid)}
//                           className="w-4 h-4 rounded border-border"
//                         />
//                         <span className="text-sm text-foreground">{project.name}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Notes Multi-Select */}
//               {notes.length > 0 && (
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Notes</label>
//                   <div className="space-y-2 border border-border rounded-lg p-3 bg-card max-h-40 overflow-y-auto">
//                     {notes.map((note) => (
//                       <label key={note.uid} className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={selectedNotes.includes(note.uid)}
//                           onChange={() => handleNoteToggle(note.uid)}
//                           className="w-4 h-4 rounded border-border"
//                         />
//                         <span className="text-sm text-foreground">{note.title}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Image Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Images</label>
//                 <div className="border-2 border-dashed border-border rounded-lg p-6 mb-4 text-center">
//                   <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
//                   <p className="text-sm text-muted-foreground mb-4">Upload images or click to select</p>
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={handleFileSelect}
//                     disabled={isUploading}
//                     className="hidden"
//                     id="image-input"
//                   />
//                   <label htmlFor="image-input">
//                     <Button
//                       asChild
//                       disabled={isUploading}
//                       className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
//                     >
//                       <span>{isUploading ? "Uploading..." : "Select Images"}</span>
//                     </Button>
//                   </label>
//                 </div>

//                 {uploadedImages.length > 0 && (
//                   <div>
//                     <p className="text-sm font-medium text-foreground mb-3">Images ({uploadedImages.length})</p>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                       {uploadedImages.map((img) => (
//                         <div key={img.uid} className="relative group">
//                           <img
//                             src={img.preview || "/placeholder.svg"}
//                             alt="preview"
//                             className="w-full h-24 object-cover rounded-lg border border-border"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => handleRemoveImage(img.uid)}
//                             className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Submit Buttons */}
//               <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
//                 <Button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="flex-1 bg-primary hover:bg-primary/90 text-white"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                       Creating...
//                     </>
//                   ) : (
//                     "Create Sample"
//                   )}
//                 </Button>
//                 <Link href="/space" className="flex-1">
//                   <Button type="button" variant="outline" className="w-full bg-transparent">
//                     Cancel
//                   </Button>
//                 </Link>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, Upload, X } from "lucide-react"
import { getCookie, apiCall } from "@/lib/auth-utils"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

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
  description: string
}

interface ImageUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onImagesUpload: (uids: string[]) => void
}

function ImageUploadModal({ isOpen, onClose, onImagesUpload }: ImageUploadModalProps) {
  const { toast } = useToast()
  const [uploadedImages, setUploadedImages] = useState<Array<{ uid: string; preview: string }>>([])
  const [isUploading, setIsUploading] = useState(false)

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

  const handleConfirm = () => {
    const uids = uploadedImages.map((img) => img.uid)
    if (uids.length > 0) {
      localStorage.setItem("sample_image_uids", JSON.stringify(uids))
      onImagesUpload(uids)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Upload Sample Images</h2>
            <button onClick={onClose} className="p-1 hover:bg-muted rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="border-2 border-dashed border-border rounded-lg p-6 mb-6 text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-4">Drag and drop images here or click to select</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
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
            <p className="text-xs text-muted-foreground mt-2">Images will be auto-compressed to under 999KB</p>
          </div>

          {uploadedImages.length > 0 && (
            <div>
              <p className="text-sm font-medium text-foreground mb-3">Uploaded Images ({uploadedImages.length})</p>
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

export default function AddSamplePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const storageUid = searchParams.get("storage_uid")

  const [buyers, setBuyers] = useState<Buyer[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [imageUids, setImageUids] = useState<string[]>([])
  const [imageUploadOpen, setImageUploadOpen] = useState(false)

  const [formData, setFormData] = useState({
    arrival_date: "",
    style_no: "",
    sku_no: "",
    item: "",
    fabrication: "",
    weight: "",
    weight_type: "GM",
    size_type: "CENTIMETER",
    types: "DEVELOPMENT",
    color: "",
    size: "",
    comments: "",
    name: "",
    description: "",
    buyer_uids: [] as string[],
    project_uids: [] as string[],
    note_uids: [] as string[],
  })

  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!storageUid) {
      toast({
        title: "Error",
        description: "Storage UID is required",
        variant: "destructive",
      })
      router.push("/space")
      return
    }

    const initializeData = async () => {
      try {
        const token = getCookie("access_token")
        if (!token) {
          router.push("/login")
          return
        }

        // Fetch buyers
        const buyersResponse = await apiCall("/sample_manager/buyer/")
        if (buyersResponse.ok) {
          const buyersData = await buyersResponse.json()
          setBuyers(Array.isArray(buyersData) ? buyersData : buyersData.results || [])
        }

        // Fetch projects
        const projectsResponse = await apiCall("/sample_manager/project/")
        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json()
          setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
        }

        // Fetch notes
        const notesResponse = await apiCall("/sample_manager/note/")
        if (notesResponse.ok) {
          const notesData = await notesResponse.json()
          setNotes(Array.isArray(notesData) ? notesData : notesData.results || [])
        }

        // Load stored image UIDs
        const storedUids = localStorage.getItem("sample_image_uids")
        if (storedUids) {
          setImageUids(JSON.parse(storedUids))
        }

        setIsLoading(false)
      } catch (err) {
        console.error("Error initializing data:", err)
        toast({
          title: "Error",
          description: "Failed to load data",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    initializeData()
  }, [storageUid, router, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

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
      const submitData = {
        ...formData,
        image_uids: imageUids,
      }

      const response = await apiCall(`/sample_manager/sample/${storageUid}/`, {
        method: "POST",
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (typeof data === "object" && !Array.isArray(data)) {
          setFieldErrors(data)
        }
        toast({
          title: "Error",
          description: data.detail || "Failed to create sample",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      localStorage.removeItem("sample_image_uids")
      toast({
        title: "Success",
        description: "Sample created successfully",
      })
      router.push("/space")
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to create sample",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
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
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/space">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create New Sample</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Fill in the sample details below</p>
          </div>
        </div>

        <Card className="border-border">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Sample Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Arrival Date, Style No, SKU No */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Arrival Date</label>
                  <input
                    type="datetime-local"
                    name="arrival_date"
                    value={formData.arrival_date}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.arrival_date
                        ? "border-red-500 focus:ring-red-500"
                        : "border-border focus:ring-primary"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Style No</label>
                  <input
                    type="text"
                    name="style_no"
                    value={formData.style_no}
                    onChange={handleChange}
                    placeholder="e.g., ST-2025-001"
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.style_no ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">SKU No</label>
                  <input
                    type="text"
                    name="sku_no"
                    value={formData.sku_no}
                    onChange={handleChange}
                    placeholder="e.g., SKU-8899"
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.sku_no ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                </div>
              </div>

              {/* Row 2: Item, Fabrication */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Item *</label>
                  <input
                    type="text"
                    name="item"
                    value={formData.item}
                    onChange={handleChange}
                    required
                    placeholder="e.g., T-Shirt"
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.item ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Fabrication</label>
                  <input
                    type="text"
                    name="fabrication"
                    value={formData.fabrication}
                    onChange={handleChange}
                    placeholder="e.g., 100% Cotton"
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.fabrication ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                </div>
              </div>

              {/* Row 3: Weight, Weight Type, Size Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Weight</label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="180"
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.weight ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                </div>
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
                    <option value="LB">LB</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Size Type</label>
                  <select
                    name="size_type"
                    value={formData.size_type}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="CENTIMETER">CENTIMETER</option>
                    <option value="INCH">INCH</option>
                    <option value="METER">METER</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Type, Color, Size */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Type</label>
                  <select
                    name="types"
                    value={formData.types}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="DEVELOPMENT">DEVELOPMENT</option>
                    <option value="PRODUCTION">PRODUCTION</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Color</label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="e.g., Black"
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.color ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Size</label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="e.g., M"
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.size ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                </div>
              </div>

              {/* Name and Description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Sample Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Men's Cotton T-Shirt"
                  className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                    fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter sample description"
                  className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                    fieldErrors.description ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                  }`}
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Comments</label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Enter any additional comments"
                  className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                    fieldErrors.comments ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                  }`}
                  rows={2}
                />
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Sample Images</label>
                {imageUids.length > 0 && (
                  <p className="text-sm text-muted-foreground mb-3">{imageUids.length} image(s) selected</p>
                )}
                <Button
                  type="button"
                  onClick={() => setImageUploadOpen(true)}
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {imageUids.length > 0 ? "Change Images" : "Upload Images"}
                </Button>
              </div>

              {/* Buyers */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Buyers</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="w-full px-4 py-2.5 text-sm border border-border rounded-lg bg-card text-foreground text-left flex items-center justify-between hover:bg-muted/30 transition focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <span className={formData.buyer_uids.length > 0 ? "text-foreground" : "text-muted-foreground"}>
                        {formData.buyer_uids.length > 0
                          ? `${formData.buyer_uids.length} buyer(s) selected`
                          : "Select buyers..."}
                      </span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-full">
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

              {/* Projects */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Projects</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="w-full px-4 py-2.5 text-sm border border-border rounded-lg bg-card text-foreground text-left flex items-center justify-between hover:bg-muted/30 transition focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <span className={formData.project_uids.length > 0 ? "text-foreground" : "text-muted-foreground"}>
                        {formData.project_uids.length > 0
                          ? `${formData.project_uids.length} project(s) selected`
                          : "Select projects..."}
                      </span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-full">
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

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Notes</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="w-full px-4 py-2.5 text-sm border border-border rounded-lg bg-card text-foreground text-left flex items-center justify-between hover:bg-muted/30 transition focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <span className={formData.note_uids.length > 0 ? "text-foreground" : "text-muted-foreground"}>
                        {formData.note_uids.length > 0
                          ? `${formData.note_uids.length} note(s) selected`
                          : "Select notes..."}
                      </span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-full">
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

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
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
                <Link href="/space" className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <ImageUploadModal
        isOpen={imageUploadOpen}
        onClose={() => setImageUploadOpen(false)}
        onImagesUpload={setImageUids}
      />
    </div>
  )
}
