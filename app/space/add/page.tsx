// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Loader2, ArrowLeft } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { getCookie,apiCall } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useRouter, useSearchParams } from "next/navigation"

// export default function AddSpacePage() {
//   const { toast } = useToast()
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const parentUid = searchParams.get("parent_uid")

//   const [formData, setFormData] = useState({ name: "", description: "" })
//   const [image, setImage] = useState<File | null>(null)
//   const [imagePreview, setImagePreview] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setImage(file)
//       const reader = new FileReader()
//       reader.onload = (e) => setImagePreview(e.target?.result as string)
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setFieldErrors({})
//     setIsLoading(true)

//     try {
//       const submitFormData = new FormData()
//       submitFormData.append("name", formData.name)
//       submitFormData.append("description", formData.description)
//       submitFormData.append("type", "SPACE")
//       if (image) {
//         submitFormData.append("image", image)
//       }
//       if (parentUid) {
//         submitFormData.append("parent_uid", parentUid)
//       }

//     //   const response = await apiCall("/sample_manager/storage/", {
//     //     method: "POST",
//     //     body: submitFormData,
//     //   })


//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/storage/`, {
//               method: "POST",
//               headers: {
//                 Authorization: `Bearer ${getCookie("access_token")}`,
//               },
//               body: submitFormData,
//             })

//       const data = await response.json()

//       if (!response.ok) {
//         if (typeof data === "object" && !Array.isArray(data)) {
//           setFieldErrors(data)
//         }
//         toast({ title: "Error", description: "Failed to create space", variant: "destructive" })
//         return
//       }

//       toast({ title: "Success", description: "Space created successfully" })
//       router.push("/space")
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to create space", variant: "destructive" })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="max-w-2xl mx-auto">
//         <div className="mb-6 sm:mb-8 flex items-center gap-3">
//           <Link href="/space">
//             <button className="p-2 hover:bg-muted rounded-lg transition">
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//           </Link>
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create New Space</h1>
//             <p className="text-sm sm:text-base text-muted-foreground mt-2">Add a new storage space</p>
//           </div>
//         </div>

//         <Card className="border-border">
//           <CardHeader className="pb-3 sm:pb-4">
//             <CardTitle className="text-base sm:text-lg">Space Details</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Space Name */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Space Name *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   placeholder="Enter space name"
//                   className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                     fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                   }`}
//                 />
//                 {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name[0]}</p>}
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Description</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Enter space description"
//                   className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                     fieldErrors.description ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                   }`}
//                   rows={4}
//                 />
//                 {fieldErrors.description && <p className="text-sm text-red-600 mt-1">{fieldErrors.description[0]}</p>}
//               </div>

//               {/* Image Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Image</label>
//                 {imagePreview && (
//                   <div className="mb-3">
//                     <img
//                       src={imagePreview || "/placeholder.svg"}
//                       alt="Preview"
//                       className="w-full h-40 object-cover rounded-lg border border-border"
//                     />
//                   </div>
//                 )}
//                 <input
//                   type="file"
//                   onChange={handleImageChange}
//                   accept="image/*"
//                   className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                 />
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
//                     "Create Space"
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

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Loader2, ArrowLeft, X } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { apiCall } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useRouter, useSearchParams } from "next/navigation"

// export default function AddSpacePage() {
//   const { toast } = useToast()
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const parentUid = searchParams.get("parent_uid")

//   const [formData, setFormData] = useState({ name: "", description: "" })
//   const [image, setImage] = useState<File | null>(null)
//   const [imagePreview, setImagePreview] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setImage(file)
//       const reader = new FileReader()
//       reader.onload = (e) => setImagePreview(e.target?.result as string)
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setFieldErrors({})
//     setIsLoading(true)

//     try {
//       const submitFormData = new FormData()
//       submitFormData.append("name", formData.name)
//       submitFormData.append("description", formData.description)
//       submitFormData.append("type", "SPACE")
//       if (image) {
//         submitFormData.append("image", image)
//       }
//       if (parentUid) {
//         submitFormData.append("parent_uid", parentUid)
//       }

//       const response = await apiCall("/sample_manager/storage/", {
//         method: "POST",
//         body: submitFormData,
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         if (typeof data === "object" && !Array.isArray(data)) {
//           setFieldErrors(data)
//         }
//         toast({ title: "Error", description: "Failed to create space", variant: "destructive" })
//         return
//       }

//       toast({ title: "Success", description: "Space created successfully" })
//       router.push("/space")
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to create space", variant: "destructive" })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="max-w-2xl mx-auto">
//         <div className="mb-6 sm:mb-8 flex items-center gap-3">
//           <Link href="/space">
//             <button className="p-2 hover:bg-muted rounded-lg transition">
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//           </Link>
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create New Space</h1>
//             <p className="text-sm sm:text-base text-muted-foreground mt-2">Add a new storage space</p>
//           </div>
//         </div>

//         <Card className="border-border">
//           <CardHeader className="pb-3 sm:pb-4">
//             <CardTitle className="text-base sm:text-lg">Space Details</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Space Name */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Space Name *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   placeholder="Enter space name"
//                   className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                     fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                   }`}
//                 />
//                 {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name[0]}</p>}
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Description</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Enter space description"
//                   className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                     fieldErrors.description ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                   }`}
//                   rows={4}
//                 />
//                 {fieldErrors.description && <p className="text-sm text-red-600 mt-1">{fieldErrors.description[0]}</p>}
//               </div>

//               {/* Image Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Image</label>
//                 {imagePreview && (
//                   <div className="mb-3 relative">
//                     <img
//                       src={imagePreview || "/placeholder.svg"}
//                       alt="Preview"
//                       className="w-full h-40 object-cover rounded-lg border border-border"
//                     />
//                     <button
//                       onClick={() => {
//                         setImagePreview("")
//                         setImage(null)
//                       }}
//                       className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 )}
//                 <input
//                   type="file"
//                   onChange={handleImageChange}
//                   accept="image/*"
//                   className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                 />
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
//                     "Create Space"
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

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Loader2, ArrowLeft, X } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { apiCall } from "@/lib/auth-utils"
// import Link from "next/link"
// import { useRouter, useSearchParams } from "next/navigation"

// export default function AddSpacePage() {
//   const { toast } = useToast()
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const parentUid = searchParams.get("parent_uid")

//   const [formData, setFormData] = useState({ name: "", description: "" })
//   const [image, setImage] = useState<File | null>(null)
//   const [imagePreview, setImagePreview] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setImage(file)
//       const reader = new FileReader()
//       reader.onload = (e) => setImagePreview(e.target?.result as string)
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleRemoveImage = () => {
//     setImage(null)
//     setImagePreview("")
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setFieldErrors({})
//     setIsLoading(true)

//     try {
//       const submitFormData = new FormData()
//       submitFormData.append("name", formData.name)
//       submitFormData.append("description", formData.description)
//       submitFormData.append("type", "SPACE")
//       if (image) {
//         submitFormData.append("image", image)
//       }
//       if (parentUid) {
//         submitFormData.append("parent_uid", parentUid)
//       }

//       const response = await apiCall("/sample_manager/storage/", {
//         method: "POST",
//         body: submitFormData,
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         if (typeof data === "object" && !Array.isArray(data)) {
//           setFieldErrors(data)
//         }
//         toast({ title: "Error", description: "Failed to create space", variant: "destructive" })
//         return
//       }

//       toast({ title: "Success", description: "Space created successfully" })
//       router.push("/space")
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to create space", variant: "destructive" })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="max-w-2xl mx-auto">
//         <div className="mb-6 sm:mb-8 flex items-center gap-3">
//           <Link href="/space">
//             <button className="p-2 hover:bg-muted rounded-lg transition">
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//           </Link>
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create New Space</h1>
//             <p className="text-sm sm:text-base text-muted-foreground mt-2">Add a new storage space</p>
//           </div>
//         </div>

//         <Card className="border-border">
//           <CardHeader className="pb-3 sm:pb-4">
//             <CardTitle className="text-base sm:text-lg">Space Details</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Space Name */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Space Name *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   placeholder="Enter space name"
//                   className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                     fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                   }`}
//                 />
//                 {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name[0]}</p>}
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Description</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Enter space description"
//                   className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
//                     fieldErrors.description ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
//                   }`}
//                   rows={4}
//                 />
//                 {fieldErrors.description && <p className="text-sm text-red-600 mt-1">{fieldErrors.description[0]}</p>}
//               </div>

//               {/* Image Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">Image</label>
//                 {imagePreview && (
//                   <div className="mb-3 relative">
//                     <img
//                       src={imagePreview || "/placeholder.svg"}
//                       alt="Preview"
//                       className="w-full h-40 object-cover rounded-lg border border-border"
//                     />
//                     <button
//                       type="button"
//                       onClick={handleRemoveImage}
//                       className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 )}
//                 <input
//                   type="file"
//                   onChange={handleImageChange}
//                   accept="image/*"
//                   className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                 />
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
//                     "Create Space"
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

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { apiCall } from "@/lib/auth-utils"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function AddSpacePage() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const parentUid = searchParams.get("parent_uid")

  const [formData, setFormData] = useState({ name: "", description: "" })
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFieldErrors({})
    setIsLoading(true)

    try {
      const submitFormData = new FormData()
      submitFormData.append("name", formData.name)
      submitFormData.append("description", formData.description)
      submitFormData.append("type", "SPACE")
      if (image) {
        submitFormData.append("image", image)
      }
      if (parentUid) {
        submitFormData.append("parent_uid", parentUid)
      }

      const response = await apiCall("/sample_manager/storage/", {
        method: "POST",
        body: submitFormData,
      })

      const data = await response.json()

      if (!response.ok) {
        if (typeof data === "object" && !Array.isArray(data)) {
          setFieldErrors(data)
        }
        toast({ title: "Error", description: "Failed to create space", variant: "destructive" })
        return
      }

      toast({ title: "Success", description: "Space created successfully" })
      router.push("/space")
    } catch (err) {
      toast({ title: "Error", description: "Failed to create space", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 sm:mb-8 flex items-center gap-3">
          <Link href="/space">
            <button className="p-2 hover:bg-muted rounded-lg transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create New Space</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">Add a new storage space</p>
          </div>
        </div>

        <Card className="border-border">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Space Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Space Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Space Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter space name"
                  className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                    fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                  }`}
                />
                {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name[0]}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter space description"
                  className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                    fieldErrors.description ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                  }`}
                  rows={4}
                />
                {fieldErrors.description && <p className="text-sm text-red-600 mt-1">{fieldErrors.description[0]}</p>}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Image</label>
                {imagePreview && (
                  <div className="mb-3 relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview("")
                        setImage(null)
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
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
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
                    "Create Space"
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
    </div>
  )
}
