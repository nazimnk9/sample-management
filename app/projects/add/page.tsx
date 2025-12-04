// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { X, Upload, Loader2, AlertCircle, ImageIcon, Trash2 } from "lucide-react"
// import { getCookie, apiCall, getCurrentUserRole } from "@/lib/auth-utils"
// import { useToast } from "@/hooks/use-toast"

// interface Company {
//   uid: string
//   name: string
// }

// interface Buyer {
//   uid: string
//   name: string
// }

// interface UploadedImage {
//   uid: string
//   url: string
// }

// export default function AddProjectPage() {
//   const router = useRouter()
//   const { toast } = useToast()
//   const [userRole, setUserRole] = useState<string | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [showImageModal, setShowImageModal] = useState(false)
//   const [uploadingImages, setUploadingImages] = useState(false)
//   const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
//   const [companies, setCompanies] = useState<Company[]>([])
//   const [buyers, setBuyers] = useState<Buyer[]>([])
//   const [selectedBuyers, setSelectedBuyers] = useState<string[]>([])
//   const [formData, setFormData] = useState({
//     name: "",
//     started_at: "",
//     will_finish_at: "",
//     company_uid: "",
//   })
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = getCookie("access_token")
//         if (!token) {
//           router.push("/login")
//           return
//         }

//         const role = await getCurrentUserRole()
//         setUserRole(role)

//         const companiesRes = await apiCall("/organizations/my_companys/")
//         if (companiesRes.ok) {
//           const data = await companiesRes.json()
//           setCompanies(Array.isArray(data) ? data : data.results || [])
//         }

//         const buyersRes = await apiCall("/sample_manager/buyer/")
//         if (buyersRes.ok) {
//           const data = await buyersRes.json()
//           setBuyers(Array.isArray(data) ? data : data.results || [])
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error)
//       }
//     }

//     fetchData()
//   }, [router])

//   const compressImage = async (file: File): Promise<Blob> => {
//     return new Promise((resolve) => {
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         const img = new (window as any).Image()
//         img.onload = () => {
//           const canvas = document.createElement("canvas")
//           const { width, height } = img
//           let quality = 0.9

//           while (true) {
//             canvas.width = width
//             canvas.height = height
//             const ctx = canvas.getContext("2d")
//             ctx?.drawImage(img, 0, 0, width, height)

//             canvas.toBlob(
//               (blob) => {
//                 if (!blob) return
//                 if (blob.size < 999 * 1024 || quality <= 0.1) {
//                   resolve(blob)
//                 } else {
//                   quality -= 0.1
//                   compressImage(file).then(resolve)
//                 }
//               },
//               "image/jpeg",
//               quality,
//             )
//           }
//         }
//         img.src = e.target?.result as string
//       }
//       reader.readAsDataURL(file)
//     })
//   }

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files
//     if (!files) return

//     setUploadingImages(true)
//     try {
//       for (const file of files) {
//         if (!file.type.startsWith("image/")) {
//           toast({
//             title: "Error",
//             description: "Only image files are allowed",
//             variant: "destructive",
//           })
//           continue
//         }

//         const compressed = await compressImage(file)
//         const formData = new FormData()
//         formData.append("file", compressed, file.name)

//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/images/`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${getCookie("access_token")}`,
//           },
//           body: formData,
//         })

//         if (response.ok) {
//           const data = await response.json()
//           const imageUrl = typeof data === "string" ? data : data.url || data.file
//           const imageUid = data.uid || data.id || imageUrl.split("/").pop()

//           const reader = new FileReader()
//           reader.onload = (event) => {
//             setUploadedImages((prev) => [
//               ...prev,
//               {
//                 uid: imageUid,
//                 url: event.target?.result as string,
//               },
//             ])
//           }
//           reader.readAsDataURL(new File([compressed], file.name))

//           toast({
//             title: "Success",
//             description: "Image uploaded successfully",
//           })
//         } else {
//           toast({
//             title: "Error",
//             description: "Failed to upload image",
//             variant: "destructive",
//           })
//         }
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error)
//       toast({
//         title: "Error",
//         description: "Failed to upload image",
//         variant: "destructive",
//       })
//     } finally {
//       setUploadingImages(false)
//     }
//   }

//   const removeImage = (uid: string) => {
//     setUploadedImages((prev) => prev.filter((img) => img.uid !== uid))
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//     if (fieldErrors[name]) {
//       setFieldErrors((prev) => {
//         const newErrors = { ...prev }
//         delete newErrors[name]
//         return newErrors
//       })
//     }
//   }

//   const handleBuyerChange = (buyerUid: string, checked: boolean) => {
//     setSelectedBuyers((prev) => (checked ? [...prev, buyerUid] : prev.filter((b) => b !== buyerUid)))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setFieldErrors({})

//     try {
//       const token = getCookie("access_token")
//       if (!token) {
//         router.push("/login")
//         return
//       }

//       const projectData = {
//         name: formData.name,
//         started_at: formData.started_at,
//         will_finish_at: formData.will_finish_at,
//         company_uid: formData.company_uid || undefined,
//         image_uids: uploadedImages.map((img) => img.uid),
//         buyer_uids: selectedBuyers,
//       }

//       const response = await apiCall("/sample_manager/project/", {
//         method: "POST",
//         body: JSON.stringify(projectData),
//       })

//       if (response.ok) {
//         localStorage.removeItem("project_images")
//         toast({
//           title: "Success",
//           description: "Project created successfully",
//         })
//         router.push("/projects")
//       } else {
//         const data = await response.json()
//         if (typeof data === "object" && data !== null) {
//           setFieldErrors(data)
//           const errorMessages = Object.entries(data)
//             .map(([key, value]) => {
//               if (Array.isArray(value)) {
//                 return `${key}: ${value.join(", ")}`
//               }
//               return `${key}: ${value}`
//             })
//             .join("\n")
//           toast({
//             title: "Error",
//             description: errorMessages || "Failed to create project",
//             variant: "destructive",
//           })
//         } else {
//           toast({
//             title: "Error",
//             description: "Failed to create project",
//             variant: "destructive",
//           })
//         }
//       }
//     } catch (error) {
//       console.error("Error creating project:", error)
//       toast({
//         title: "Error",
//         description: "Failed to create project",
//         variant: "destructive",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="max-w-2xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create Project</h1>
//           <p className="text-sm sm:text-base text-muted-foreground mt-2">
//             Add a new sample project with details and images
//           </p>
//         </div>

//         <Card className="border-border">
//           <CardHeader className="border-b border-border pb-4">
//             <CardTitle>Project Details</CardTitle>
//           </CardHeader>
//           <CardContent className="pt-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Project Name */}
//               <div>
//                 <label className="text-sm font-medium text-foreground block mb-2">
//                   Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="Enter project name"
//                   className={`w-full px-4 py-2 text-sm border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
//                     fieldErrors.name ? "border-red-500" : "border-border"
//                   }`}
//                 />
//                 {fieldErrors.name && (
//                   <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
//                     <AlertCircle className="w-4 h-4" />
//                     {fieldErrors.name[0]}
//                   </p>
//                 )}
//               </div>

//               {/* Started Date */}
//               <div>
//                 <label className="text-sm font-medium text-foreground block mb-2">
//                   Started Date <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="datetime-local"
//                   name="started_at"
//                   value={formData.started_at}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
//                     fieldErrors.started_at ? "border-red-500" : "border-border"
//                   }`}
//                 />
//                 {fieldErrors.started_at && (
//                   <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
//                     <AlertCircle className="w-4 h-4" />
//                     {fieldErrors.started_at[0]}
//                   </p>
//                 )}
//               </div>

//               {/* Finish Date */}
//               <div>
//                 <label className="text-sm font-medium text-foreground block mb-2">
//                   Finish Date <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="datetime-local"
//                   name="will_finish_at"
//                   value={formData.will_finish_at}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
//                     fieldErrors.will_finish_at ? "border-red-500" : "border-border"
//                   }`}
//                 />
//                 {fieldErrors.will_finish_at && (
//                   <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
//                     <AlertCircle className="w-4 h-4" />
//                     {fieldErrors.will_finish_at[0]}
//                   </p>
//                 )}
//               </div>

//               {/* Company - Only for SUPER_ADMIN */}
//               {userRole === "SUPER_ADMIN" && (
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">
//                     Company <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="company_uid"
//                     value={formData.company_uid}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-2 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
//                       fieldErrors.company_uid ? "border-red-500" : "border-border"
//                     }`}
//                   >
//                     <option value="">Select a company</option>
//                     {companies.map((company) => (
//                       <option key={company.uid} value={company.uid}>
//                         {company.name}
//                       </option>
//                     ))}
//                   </select>
//                   {fieldErrors.company_uid && (
//                     <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
//                       <AlertCircle className="w-4 h-4" />
//                       {fieldErrors.company_uid[0]}
//                     </p>
//                   )}
//                 </div>
//               )}

//               {/* Buyers - Multi Select */}
//               <div>
//                 <label className="text-sm font-medium text-foreground block mb-2">Buyers</label>
//                 <div className="space-y-2 max-h-40 overflow-y-auto border border-border rounded-lg p-4 bg-card">
//                   {buyers.length > 0 ? (
//                     buyers.map((buyer) => (
//                       <label key={buyer.uid} className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={selectedBuyers.includes(buyer.uid)}
//                           onChange={(e) => handleBuyerChange(buyer.uid, e.target.checked)}
//                           className="w-4 h-4 rounded border-border cursor-pointer"
//                         />
//                         <span className="text-sm text-foreground">{buyer.name}</span>
//                       </label>
//                     ))
//                   ) : (
//                     <p className="text-sm text-muted-foreground">No buyers available</p>
//                   )}
//                 </div>
//               </div>

//               {/* Images Section */}
//               <div>
//                 <label className="text-sm font-medium text-foreground block mb-2">Project Images</label>
//                 {uploadedImages.length > 0 && (
//                   <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
//                     {uploadedImages.map((image) => (
//                       <div key={image.uid} className="relative group rounded-lg overflow-hidden border border-border">
//                         <img src={image.url || "/placeholder.svg"} alt="Project" className="w-full h-32 object-cover" />
//                         <button
//                           type="button"
//                           onClick={() => removeImage(image.uid)}
//                           className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//                 <button
//                   type="button"
//                   onClick={() => setShowImageModal(true)}
//                   className="w-full px-4 py-3 border-2 border-dashed border-border rounded-lg text-center text-foreground hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
//                 >
//                   <Upload className="w-5 h-5" />
//                   Upload Images
//                 </button>
//               </div>

//               {/* Submit Buttons */}
//               <div className="flex flex-col sm:flex-row gap-3 pt-6">
//                 <Button
//                   type="submit"
//                   disabled={loading}
//                   className="flex-1 bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
//                 >
//                   {loading && <Loader2 className="w-4 h-4 animate-spin" />}
//                   Create Project
//                 </Button>
//                 <Button type="button" onClick={() => router.back()} variant="outline" className="flex-1 bg-transparent">
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Image Upload Modal */}
//       {showImageModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md border-border">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle>Upload Project Images</CardTitle>
//               <button onClick={() => setShowImageModal(false)} className="p-1 hover:bg-muted rounded">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
//                   <label className="cursor-pointer block">
//                     <div className="flex flex-col items-center justify-center gap-2">
//                       {uploadingImages ? (
//                         <>
//                           <Loader2 className="w-8 h-8 animate-spin text-primary" />
//                           <p className="text-sm text-muted-foreground">Uploading images...</p>
//                         </>
//                       ) : (
//                         <>
//                           <ImageIcon className="w-8 h-8 text-muted-foreground" />
//                           <p className="text-sm font-medium text-foreground">Click to select images</p>
//                           <p className="text-xs text-muted-foreground">(Auto-compressed under 999KB)</p>
//                         </>
//                       )}
//                     </div>
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       disabled={uploadingImages}
//                       className="hidden"
//                     />
//                   </label>
//                 </div>
//                 <Button
//                   onClick={() => setShowImageModal(false)}
//                   className="w-full bg-primary hover:bg-primary/90 text-white"
//                 >
//                   Done
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
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { ArrowLeft, Loader2, Upload, X } from "lucide-react"
// import { getCookie, apiCall, getCurrentUserRole, canAccessFeature } from "@/lib/auth-utils"
// import { useToast } from "@/hooks/use-toast"

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
//   onImagesUpload: (uids: string[]) => void
// }

// function ImageUploadModal({ isOpen, onClose, onImagesUpload }: ImageUploadModalProps) {
//   const { toast } = useToast()
//   const [uploadedImages, setUploadedImages] = useState<Array<{ uid: string; preview: string }>>([])
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

//           // Calculate dimensions to compress
//           while (
//             (canvas.toBlob((blob) => {}, "image/jpeg", quality),
//             canvas.toDataURL("image/jpeg", quality).length / 1024 > 999) &&
//             quality > 0.1
//           ) {
//             quality -= 0.1
//           }

//           // Resize if still too large
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
//     if (uids.length > 0) {
//       localStorage.setItem("project_image_uids", JSON.stringify(uids))
//       onImagesUpload(uids)
//       onClose()
//     }
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//         <CardContent className="pt-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-foreground">Upload Project Images</h2>
//             <button onClick={onClose} className="p-1 hover:bg-muted rounded">
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           <div className="border-2 border-dashed border-border rounded-lg p-6 mb-6 text-center">
//             <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
//             <p className="text-sm text-muted-foreground mb-4">Drag and drop images here or click to select</p>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleFileSelect}
//               disabled={isUploading}
//               className="hidden"
//               id="image-input"
//             />
//             <label htmlFor="image-input">
//               <Button
//                 asChild
//                 disabled={isUploading}
//                 className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
//               >
//                 <span>{isUploading ? "Uploading..." : "Select Images"}</span>
//               </Button>
//             </label>
//             {/* <p className="text-xs text-muted-foreground mt-2">Images will be auto-compressed to under 999KB</p> */}
//           </div>

//           {uploadedImages.length > 0 && (
//             <div>
//               <p className="text-sm font-medium text-foreground mb-3">Uploaded Images ({uploadedImages.length})</p>
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

// export default function AddProjectPage() {
//   const router = useRouter()
//   const { toast } = useToast()
//   const [userRole, setUserRole] = useState<string | null>(null)
//   const [companies, setCompanies] = useState<Company[]>([])
//   const [buyers, setBuyers] = useState<Buyer[]>([])
//   const [imageUids, setImageUids] = useState<string[]>([])
//   const [imageUploadOpen, setImageUploadOpen] = useState(false)

//   const [formData, setFormData] = useState({
//     name: "",
//     started_at: "",
//     will_finish_at: "",
//     company_uid: "",
//     buyer_uids: [] as string[],
//   })

//   const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
//   const [isLoading, setIsLoading] = useState(false)
//   const [companiesLoading, setCompaniesLoading] = useState(true)
//   const [buyersLoading, setBuyersLoading] = useState(true)

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

//         // Fetch companies
//         const companyResponse = await apiCall("/organizations/my_companys/")
//         if (companyResponse.ok) {
//           const companyData = await companyResponse.json()
//           setCompanies(Array.isArray(companyData) ? companyData : companyData.results || [])
//         }
//         setCompaniesLoading(false)

//         // Fetch buyers
//         const buyerResponse = await apiCall("/sample_manager/buyer/")
//         if (buyerResponse.ok) {
//           const buyerData = await buyerResponse.json()
//           setBuyers(Array.isArray(buyerData) ? buyerData : buyerData.results || [])
//         }
//         setBuyersLoading(false)

//         const storedUids = localStorage.getItem("project_image_uids")
//         if (storedUids) {
//           setImageUids(JSON.parse(storedUids))
//         }
//       } catch (err) {
//         console.error("Error initializing data:", err)
//         setCompaniesLoading(false)
//         setBuyersLoading(false)
//       }
//     }

//     initializeData()
//   }, [router])

//   const formatErrorMessage = (errors: Record<string, string[]>) => {
//     const errorMessages: string[] = []
//     Object.entries(errors).forEach(([field, messages]) => {
//       if (Array.isArray(messages)) {
//         messages.forEach((msg) => {
//           errorMessages.push(`${field}: ${msg}`)
//         })
//       }
//     })
//     return errorMessages.join(", ")
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     if (name === "buyer_uids") {
//       // Handle multi-select
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

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setFieldErrors({})
//     setIsLoading(true)

//     try {
//       const token = getCookie("access_token")
//       if (!token) {
//         toast({
//           title: "Unauthorized",
//           description: "You need to be logged in to create a project.",
//           variant: "destructive",
//         })
//         router.push("/login")
//         return
//       }

//       const submitData = {
//         ...formData,
//         image_uids: imageUids,
//       }

//       const response = await apiCall("/sample_manager/project/", {
//         method: "POST",
//         body: JSON.stringify(submitData),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         if (typeof data === "object" && !Array.isArray(data)) {
//           const hasFieldErrors = Object.keys(data).some((key) => Array.isArray(data[key]))
//           if (hasFieldErrors) {
//             setFieldErrors(data)
//             const formattedError = formatErrorMessage(data)
//             toast({
//               title: "Validation Error",
//               description: formattedError,
//               variant: "destructive",
//             })
//           } else {
//             toast({
//               title: "Error",
//               description: data.detail || "Failed to create project",
//               variant: "destructive",
//             })
//           }
//         } else {
//           toast({
//             title: "Error",
//             description: "Failed to create project. Please try again.",
//             variant: "destructive",
//           })
//         }
//         setIsLoading(false)
//         return
//       }

//       localStorage.removeItem("project_image_uids")
//       toast({
//         title: "Success",
//         description: "Project created successfully.",
//         variant: "default",
//       })
//       router.push("/projects")
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: err instanceof Error ? err.message : "An error occurred",
//         variant: "destructive",
//       })
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="mb-6 flex items-center gap-3">
//         <Link href="/projects">
//           <Button variant="outline" size="sm" className="gap-2 bg-transparent">
//             <ArrowLeft className="w-4 h-4" />
//             Back
//           </Button>
//         </Link>
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create New Project</h1>
//           <p className="text-sm sm:text-base text-muted-foreground mt-1">Fill in the project details below</p>
//         </div>
//       </div>

//       <div className="max-w-3xl">
//         <Card className="border-border">
//           <CardContent className="pt-6">
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {/* Project Name */}
//                 <div className="sm:col-span-2">
//                   <label className="block text-sm font-medium text-foreground mb-2">Project Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter project name"
//                     className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name[0]}</p>}
//                 </div>

//                 {/* Started Date */}
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Started Date *</label>
//                   <input
//                     type="datetime-local"
//                     name="started_at"
//                     value={formData.started_at}
//                     onChange={handleChange}
//                     required
//                     className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.started_at ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.started_at && <p className="text-sm text-red-600 mt-1">{fieldErrors.started_at[0]}</p>}
//                 </div>

//                 {/* Finish Date */}
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Finish Date *</label>
//                   <input
//                     type="datetime-local"
//                     name="will_finish_at"
//                     value={formData.will_finish_at}
//                     onChange={handleChange}
//                     required
//                     className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.will_finish_at
//                         ? "border-red-500 focus:ring-red-500"
//                         : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.will_finish_at && (
//                     <p className="text-sm text-red-600 mt-1">{fieldErrors.will_finish_at[0]}</p>
//                   )}
//                 </div>

//                 {/* Company - Only visible for SUPER_ADMIN */}
//                 {canAccessFeature(userRole, "company_selection") && (
//                   <div className="sm:col-span-2">
//                     <label className="block text-sm font-medium text-foreground mb-2">Company *</label>
//                     <select
//                       name="company_uid"
//                       value={formData.company_uid}
//                       onChange={handleChange}
//                       required
//                       disabled={companiesLoading}
//                       className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition disabled:opacity-50 ${
//                         fieldErrors.company_uid
//                           ? "border-red-500 focus:ring-red-500"
//                           : "border-border focus:ring-primary"
//                       }`}
//                     >
//                       <option value="">{companiesLoading ? "Loading companies..." : "Select a company"}</option>
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

//                 {/* Buyers - Multi Select */}
//                 <div className="sm:col-span-2">
//                   <label className="block text-sm font-medium text-foreground mb-2">Buyers *</label>
//                   <select
//                     name="buyer_uids"
//                     multiple
//                     value={formData.buyer_uids}
//                     onChange={handleChange}
//                     disabled={buyersLoading}
//                     className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition disabled:opacity-50 ${
//                       fieldErrors.buyer_uids ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   >
//                     <option disabled value="">
//                       {buyersLoading ? "Loading buyers..." : "Select buyers (hold Ctrl/Cmd to select multiple)"}
//                     </option>
//                     {buyers.map((buyer) => (
//                       <option key={buyer.uid} value={buyer.uid}>
//                         {buyer.name}
//                       </option>
//                     ))}
//                   </select>
//                   {fieldErrors.buyer_uids && <p className="text-sm text-red-600 mt-1">{fieldErrors.buyer_uids[0]}</p>}
//                 </div>

//                 {/* Image Upload */}
//                 <div className="sm:col-span-2">
//                   <label className="block text-sm font-medium text-foreground mb-2">Project Images</label>
//                   <Button
//                     type="button"
//                     onClick={() => setImageUploadOpen(true)}
//                     className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
//                   >
//                     <Upload className="w-4 h-4" />
//                     Upload Images ({imageUids.length})
//                   </Button>
//                 </div>
//               </div>

//               {/* Submit Buttons */}
//               <div className="flex flex-col sm:flex-row gap-3 pt-6">
//                 <Button type="submit" disabled={isLoading} className="flex-1 bg-primary hover:bg-primary/90 text-white">
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                       Creating...
//                     </>
//                   ) : (
//                     "Create Project"
//                   )}
//                 </Button>
//                 <Link href="/projects" className="flex-1">
//                   <Button variant="outline" className="w-full bg-transparent">
//                     Cancel
//                   </Button>
//                 </Link>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>

//       <ImageUploadModal
//         isOpen={imageUploadOpen}
//         onClose={() => setImageUploadOpen(false)}
//         onImagesUpload={setImageUids}
//       />
//     </div>
//   )
// }


// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { ArrowLeft, Loader2, Upload, X } from "lucide-react"
// import { getCookie, apiCall, getCurrentUserRole, canAccessFeature } from "@/lib/auth-utils"
// import { useToast } from "@/hooks/use-toast"

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
//   onImagesUpload: (uids: string[]) => void
// }

// function ImageUploadModal({ isOpen, onClose, onImagesUpload }: ImageUploadModalProps) {
//   const { toast } = useToast()
//   const [uploadedImages, setUploadedImages] = useState<Array<{ uid: string; preview: string }>>([])
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

//           // Calculate dimensions to compress
//           while (
//             (canvas.toBlob((blob) => {}, "image/jpeg", quality),
//             canvas.toDataURL("image/jpeg", quality).length / 1024 > 999) &&
//             quality > 0.1
//           ) {
//             quality -= 0.1
//           }

//           // Resize if still too large
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
//     if (uids.length > 0) {
//       localStorage.setItem("project_image_uids", JSON.stringify(uids))
//       onImagesUpload(uids)
//       onClose()
//     }
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//         <CardContent className="pt-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-foreground">Upload Project Images</h2>
//             <button onClick={onClose} className="p-1 hover:bg-muted rounded">
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           <div className="border-2 border-dashed border-border rounded-lg p-6 mb-6 text-center">
//             <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
//             <p className="text-sm text-muted-foreground mb-4">Drag and drop images here or click to select</p>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleFileSelect}
//               disabled={isUploading}
//               className="hidden"
//               id="image-input"
//             />
//             <label htmlFor="image-input">
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
//               <p className="text-sm font-medium text-foreground mb-3">Uploaded Images ({uploadedImages.length})</p>
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

// export default function AddProjectPage() {
//   const router = useRouter()
//   const { toast } = useToast()
//   const [userRole, setUserRole] = useState<string | null>(null)
//   const [companies, setCompanies] = useState<Company[]>([])
//   const [buyers, setBuyers] = useState<Buyer[]>([])
//   const [imageUids, setImageUids] = useState<string[]>([])
//   const [imageUploadOpen, setImageUploadOpen] = useState(false)

//   const [formData, setFormData] = useState({
//     name: "",
//     started_at: "",
//     will_finish_at: "",
//     company_uid: "",
//     buyer_uids: [] as string[],
//   })

//   const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
//   const [isLoading, setIsLoading] = useState(false)
//   const [companiesLoading, setCompaniesLoading] = useState(true)
//   const [buyersLoading, setBuyersLoading] = useState(true)

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

//         // Fetch companies
//         const companyResponse = await apiCall("/organizations/my_companys/")
//         if (companyResponse.ok) {
//           const companyData = await companyResponse.json()
//           setCompanies(Array.isArray(companyData) ? companyData : companyData.results || [])
//         }
//         setCompaniesLoading(false)

//         // Fetch buyers
//         const buyerResponse = await apiCall("/sample_manager/buyer/")
//         if (buyerResponse.ok) {
//           const buyerData = await buyerResponse.json()
//           setBuyers(Array.isArray(buyerData) ? buyerData : buyerData.results || [])
//         }
//         setBuyersLoading(false)

//         const storedUids = localStorage.getItem("project_image_uids")
//         if (storedUids) {
//           setImageUids(JSON.parse(storedUids))
//         }
//       } catch (err) {
//         console.error("Error initializing data:", err)
//         setCompaniesLoading(false)
//         setBuyersLoading(false)
//       }
//     }

//     initializeData()
//   }, [router])

//   const formatErrorMessage = (errors: Record<string, string[]>) => {
//     const errorMessages: string[] = []
//     Object.entries(errors).forEach(([field, messages]) => {
//       if (Array.isArray(messages)) {
//         messages.forEach((msg) => {
//           errorMessages.push(`${field}: ${msg}`)
//         })
//       }
//     })
//     return errorMessages.join(", ")
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     if (name === "buyer_uids") {
//       // Handle multi-select
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

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setFieldErrors({})
//     setIsLoading(true)

//     try {
//       const token = getCookie("access_token")
//       if (!token) {
//         toast({
//           title: "Unauthorized",
//           description: "You need to be logged in to create a project.",
//           variant: "destructive",
//         })
//         router.push("/login")
//         return
//       }

//       const submitData = {
//         ...formData,
//         image_uids: imageUids,
//       }

//       const response = await apiCall("/sample_manager/project/", {
//         method: "POST",
//         body: JSON.stringify(submitData),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         if (typeof data === "object" && !Array.isArray(data)) {
//           const hasFieldErrors = Object.keys(data).some((key) => Array.isArray(data[key]))
//           if (hasFieldErrors) {
//             setFieldErrors(data)
//             const formattedError = formatErrorMessage(data)
//             toast({
//               title: "Validation Error",
//               description: formattedError,
//               variant: "destructive",
//             })
//           } else {
//             toast({
//               title: "Error",
//               description: data.detail || "Failed to create project",
//               variant: "destructive",
//             })
//           }
//         } else {
//           toast({
//             title: "Error",
//             description: "Failed to create project. Please try again.",
//             variant: "destructive",
//           })
//         }
//         setIsLoading(false)
//         return
//       }

//       localStorage.removeItem("project_image_uids")
//       toast({
//         title: "Success",
//         description: "Project created successfully.",
//         variant: "default",
//       })
//       router.push("/projects")
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: err instanceof Error ? err.message : "An error occurred",
//         variant: "destructive",
//       })
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="mb-6 flex items-center gap-3">
//         <Link href="/projects">
//           <Button variant="outline" size="sm" className="gap-2 bg-transparent">
//             <ArrowLeft className="w-4 h-4" />
//             Back
//           </Button>
//         </Link>
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create New Project</h1>
//           <p className="text-sm sm:text-base text-muted-foreground mt-1">Fill in the project details below</p>
//         </div>
//       </div>

//       <div className="max-w-3xl">
//         <Card className="border-border">
//           <CardContent className="pt-6">
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {/* Project Name */}
//                 <div className="sm:col-span-2">
//                   <label className="block text-sm font-medium text-foreground mb-2">Project Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter project name"
//                     className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name[0]}</p>}
//                 </div>

//                 {/* Started Date */}
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Started Date *</label>
//                   <input
//                     type="datetime-local"
//                     name="started_at"
//                     value={formData.started_at}
//                     onChange={handleChange}
//                     required
//                     className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.started_at ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.started_at && <p className="text-sm text-red-600 mt-1">{fieldErrors.started_at[0]}</p>}
//                 </div>

//                 {/* Finish Date */}
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Finish Date *</label>
//                   <input
//                     type="datetime-local"
//                     name="will_finish_at"
//                     value={formData.will_finish_at}
//                     onChange={handleChange}
//                     required
//                     className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                       fieldErrors.will_finish_at
//                         ? "border-red-500 focus:ring-red-500"
//                         : "border-border focus:ring-primary"
//                     }`}
//                   />
//                   {fieldErrors.will_finish_at && (
//                     <p className="text-sm text-red-600 mt-1">{fieldErrors.will_finish_at[0]}</p>
//                   )}
//                 </div>

//                 {/* Company - Only visible for SUPER_ADMIN */}
//                 {canAccessFeature(userRole, "company_selection") && (
//                   <div className="sm:col-span-2">
//                     <label className="block text-sm font-medium text-foreground mb-2">Company *</label>
//                     <select
//                       name="company_uid"
//                       value={formData.company_uid}
//                       onChange={handleChange}
//                       required
//                       disabled={companiesLoading}
//                       className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition disabled:opacity-50 ${
//                         fieldErrors.company_uid
//                           ? "border-red-500 focus:ring-red-500"
//                           : "border-border focus:ring-primary"
//                       }`}
//                     >
//                       <option value="">{companiesLoading ? "Loading companies..." : "Select a company"}</option>
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

//                 {/* Buyers - Multi Select with Checkboxes */}
//                 <div className="sm:col-span-2">
//                   <label className="block text-sm font-medium text-foreground mb-3">Buyers *</label>
//                   <div
//                     className={`border rounded-lg bg-card p-4 max-h-48 overflow-y-auto ${
//                       fieldErrors.buyer_uids ? "border-red-500" : "border-border"
//                     }`}
//                   >
//                     {buyersLoading ? (
//                       <p className="text-sm text-muted-foreground">Loading buyers...</p>
//                     ) : buyers.length > 0 ? (
//                       <div className="space-y-2">
//                         {buyers.map((buyer) => (
//                           <label
//                             key={buyer.uid}
//                             className="flex items-center gap-3 cursor-pointer hover:bg-muted p-2 rounded transition"
//                           >
//                             <input
//                               type="checkbox"
//                               checked={formData.buyer_uids.includes(buyer.uid)}
//                               onChange={(e) => {
//                                 if (e.target.checked) {
//                                   setFormData((prev) => ({
//                                     ...prev,
//                                     buyer_uids: [...prev.buyer_uids, buyer.uid],
//                                   }))
//                                 } else {
//                                   setFormData((prev) => ({
//                                     ...prev,
//                                     buyer_uids: prev.buyer_uids.filter((uid) => uid !== buyer.uid),
//                                   }))
//                                 }
//                                 if (fieldErrors.buyer_uids) {
//                                   setFieldErrors((prev) => {
//                                     const newErrors = { ...prev }
//                                     delete newErrors.buyer_uids
//                                     return newErrors
//                                   })
//                                 }
//                               }}
//                               className="w-4 h-4 cursor-pointer accent-primary"
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
//                   {formData.buyer_uids.length > 0 && (
//                     <p className="text-xs text-muted-foreground mt-2">{formData.buyer_uids.length} buyer(s) selected</p>
//                   )}
//                 </div>

//                 {/* Image Upload */}
//                 <div className="sm:col-span-2">
//                   <label className="block text-sm font-medium text-foreground mb-2">Project Images</label>
//                   <Button
//                     type="button"
//                     onClick={() => setImageUploadOpen(true)}
//                     className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
//                   >
//                     <Upload className="w-4 h-4" />
//                     Upload Images ({imageUids.length})
//                   </Button>
//                 </div>
//               </div>

//               {/* Submit Buttons */}
//               <div className="flex flex-col sm:flex-row gap-3 pt-6">
//                 <Button type="submit" disabled={isLoading} className="flex-1 bg-primary hover:bg-primary/90 text-white">
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                       Creating...
//                     </>
//                   ) : (
//                     "Create Project"
//                   )}
//                 </Button>
//                 <Link href="/projects" className="flex-1">
//                   <Button variant="outline" className="w-full bg-transparent">
//                     Cancel
//                   </Button>
//                 </Link>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>

//       <ImageUploadModal
//         isOpen={imageUploadOpen}
//         onClose={() => setImageUploadOpen(false)}
//         onImagesUpload={setImageUids}
//       />
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, Upload, X } from "lucide-react"
import { getCookie, apiCall, getCurrentUserRole, canAccessFeature } from "@/lib/auth-utils"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

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

          // Calculate dimensions to compress
          while (
            (canvas.toBlob((blob) => {}, "image/jpeg", quality),
            canvas.toDataURL("image/jpeg", quality).length / 1024 > 999) &&
            quality > 0.1
          ) {
            quality -= 0.1
          }

          // Resize if still too large
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
      localStorage.setItem("project_image_uids", JSON.stringify(uids))
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
            <h2 className="text-xl font-bold text-foreground">Upload Project Images</h2>
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
              id="image-input"
            />
            <label htmlFor="image-input">
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

export default function AddProjectPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [userRole, setUserRole] = useState<string | null>(null)
  const [companies, setCompanies] = useState<Company[]>([])
  const [buyers, setBuyers] = useState<Buyer[]>([])
  const [imageUids, setImageUids] = useState<string[]>([])
  const [imageUploadOpen, setImageUploadOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    started_at: "",
    will_finish_at: "",
    company_uid: "",
    buyer_uids: [] as string[],
  })

  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [companiesLoading, setCompaniesLoading] = useState(true)
  const [buyersLoading, setBuyersLoading] = useState(true)

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

        // Fetch companies
        const companyResponse = await apiCall("/organizations/my_companys/")
        if (companyResponse.ok) {
          const companyData = await companyResponse.json()
          setCompanies(Array.isArray(companyData) ? companyData : companyData.results || [])
        }
        setCompaniesLoading(false)

        // Fetch buyers
        const buyerResponse = await apiCall("/sample_manager/buyer/")
        if (buyerResponse.ok) {
          const buyerData = await buyerResponse.json()
          setBuyers(Array.isArray(buyerData) ? buyerData : buyerData.results || [])
        }
        setBuyersLoading(false)

        const storedUids = localStorage.getItem("project_image_uids")
        if (storedUids) {
          setImageUids(JSON.parse(storedUids))
        }
      } catch (err) {
        console.error("Error initializing data:", err)
        setCompaniesLoading(false)
        setBuyersLoading(false)
      }
    }

    initializeData()
  }, [router])

  const formatErrorMessage = (errors: Record<string, string[]>) => {
    const errorMessages: string[] = []
    Object.entries(errors).forEach(([field, messages]) => {
      if (Array.isArray(messages)) {
        messages.forEach((msg) => {
          errorMessages.push(`${field}: ${msg}`)
        })
      }
    })
    return errorMessages.join(", ")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === "buyer_uids") {
      // Handle multi-select
      const selectedOptions = Array.from((e.target as HTMLSelectElement).selectedOptions, (option) => option.value)
      setFormData((prev) => ({ ...prev, buyer_uids: selectedOptions }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFieldErrors({})
    setIsLoading(true)

    try {
      const token = getCookie("access_token")
      if (!token) {
        toast({
          title: "Unauthorized",
          description: "You need to be logged in to create a project.",
          variant: "destructive",
        })
        router.push("/login")
        return
      }

      const submitData = {
        ...formData,
        image_uids: imageUids,
      }

      const response = await apiCall("/sample_manager/project/", {
        method: "POST",
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (typeof data === "object" && !Array.isArray(data)) {
          const hasFieldErrors = Object.keys(data).some((key) => Array.isArray(data[key]))
          if (hasFieldErrors) {
            setFieldErrors(data)
            const formattedError = formatErrorMessage(data)
            toast({
              title: "Validation Error",
              description: formattedError,
              variant: "destructive",
            })
          } else {
            toast({
              title: "Error",
              description: data.detail || "Failed to create project",
              variant: "destructive",
            })
          }
        } else {
          toast({
            title: "Error",
            description: "Failed to create project. Please try again.",
            variant: "destructive",
          })
        }
        setIsLoading(false)
        return
      }

      localStorage.removeItem("project_image_uids")
      toast({
        title: "Success",
        description: "Project created successfully.",
        variant: "default",
      })
      router.push("/projects")
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "An error occurred",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/projects">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create New Project</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Fill in the project details below</p>
        </div>
      </div>

      <div className="max-w-3xl">
        <Card className="border-border">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Project Name */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Project Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter project name"
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                  {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name[0]}</p>}
                </div>

                {/* Started Date */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Started Date *</label>
                  <input
                    type="datetime-local"
                    name="started_at"
                    value={formData.started_at}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.started_at ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                  {fieldErrors.started_at && <p className="text-sm text-red-600 mt-1">{fieldErrors.started_at[0]}</p>}
                </div>

                {/* Finish Date */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Finish Date *</label>
                  <input
                    type="datetime-local"
                    name="will_finish_at"
                    value={formData.will_finish_at}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.will_finish_at
                        ? "border-red-500 focus:ring-red-500"
                        : "border-border focus:ring-primary"
                    }`}
                  />
                  {fieldErrors.will_finish_at && (
                    <p className="text-sm text-red-600 mt-1">{fieldErrors.will_finish_at[0]}</p>
                  )}
                </div>

                {/* Company - Only visible for SUPER_ADMIN */}
                {canAccessFeature(userRole, "company_selection") && (
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Company *</label>
                    <select
                      name="company_uid"
                      value={formData.company_uid}
                      onChange={handleChange}
                      required
                      disabled={companiesLoading}
                      className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition disabled:opacity-50 ${
                        fieldErrors.company_uid
                          ? "border-red-500 focus:ring-red-500"
                          : "border-border focus:ring-primary"
                      }`}
                    >
                      <option value="">{companiesLoading ? "Loading companies..." : "Select a company"}</option>
                      {companies.map((company) => (
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
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-3">Buyers *</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground text-left flex items-center justify-between hover:bg-muted/30 transition focus:outline-none focus:ring-2 focus:border-transparent ${
                          fieldErrors.buyer_uids
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
                      {buyersLoading ? (
                        <div className="p-2 text-sm text-muted-foreground">Loading buyers...</div>
                      ) : buyers.length > 0 ? (
                        <div>
                          {buyers.map((buyer) => (
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
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Project Images</label>
                  <Button
                    type="button"
                    onClick={() => setImageUploadOpen(true)}
                    className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Images ({imageUids.length})
                  </Button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button type="submit" disabled={isLoading} className="flex-1 bg-primary hover:bg-primary/90 text-white">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Project"
                  )}
                </Button>
                <Link href="/projects" className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Image Upload Modal */}
      <ImageUploadModal
        isOpen={imageUploadOpen}
        onClose={() => setImageUploadOpen(false)}
        onImagesUpload={(uids) => setImageUids(uids)}
      />
    </div>
  )
}
