// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { ArrowLeft, AlertCircle, Loader2 } from "lucide-react"
// import { getCookie, apiCall } from "@/lib/auth-utils"

// interface Company {
//   id: number
//   uid: string
//   name: string
// }

// export default function AddBuyerPage() {
//   const router = useRouter()
//   const [companies, setCompanies] = useState<Company[]>([])
//   const [formData, setFormData] = useState({
//     name: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//     company_uid: "",
//   })
//   const [error, setError] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [companiesLoading, setCompaniesLoading] = useState(true)

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const token = getCookie("access_token")
//         if (!token) {
//           router.push("/login")
//           return
//         }

//         const response = await apiCall("/organizations/my_companys/")
//         if (!response.ok) {
//           throw new Error("Failed to fetch companies")
//         }
//         const data = await response.json()
//         setCompanies(Array.isArray(data) ? data : data.results || [])
//       } catch (err) {
//         setError("Failed to load companies. Please try again.")
//       } finally {
//         setCompaniesLoading(false)
//       }
//     }

//     fetchCompanies()
//   }, [router])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setIsLoading(true)

//     try {
//       const token = getCookie("access_token")
//       if (!token) {
//         router.push("/login")
//         return
//       }

//       const response = await apiCall("/sample_manager/buyer/", {
//         method: "POST",
//         body: JSON.stringify(formData),
//       })

//       if (!response.ok) {
//         const data = await response.json()
//         throw new Error(data.detail || "Failed to create buyer")
//       }

//       router.push("/buyers")
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred")
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="mb-6 flex items-center gap-3">
//         <Link href="/buyers">
//           <Button variant="outline" size="sm" className="gap-2 bg-transparent">
//             <ArrowLeft className="w-4 h-4" />
//             Back
//           </Button>
//         </Link>
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Add New Buyer</h1>
//           <p className="text-sm sm:text-base text-muted-foreground mt-1">Fill in the buyer details below</p>
//         </div>
//       </div>

//       <div className="max-w-3xl">
//         <Card className="border-border">
//           <CardContent className="pt-6">
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {error && (
//                 <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
//                   <AlertCircle className="w-5 h-5 text-red-600" />
//                   <p className="text-sm text-red-600">{error}</p>
//                 </div>
//               )}

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {/* Buyer Name */}
//                 <div className="sm:col-span-2">
//                   <label className="block text-sm font-medium text-foreground mb-2">Buyer Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter buyer name"
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 {/* Company Selection */}
//                 <div className="sm:col-span-2">
//                   <label className="block text-sm font-medium text-foreground mb-2">Company *</label>
//                   <select
//                     name="company_uid"
//                     value={formData.company_uid}
//                     onChange={handleChange}
//                     required
//                     disabled={companiesLoading}
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
//                   >
//                     <option value="">{companiesLoading ? "Loading companies..." : "Select a company"}</option>
//                     {companies.map((company) => (
//                       <option key={company.uid} value={company.uid}>
//                         {company.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Street */}
//                 <div className="sm:col-span-2">
//                   <label className="block text-sm font-medium text-foreground mb-2">Street *</label>
//                   <input
//                     type="text"
//                     name="street"
//                     value={formData.street}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter street address"
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 {/* City */}
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">City *</label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter city"
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 {/* State */}
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">State *</label>
//                   <input
//                     type="text"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter state"
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 {/* Country */}
//                 <div className="sm:col-span-2">
//                   <label className="block text-sm font-medium text-foreground mb-2">Country *</label>
//                   <input
//                     type="text"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter country"
//                     className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
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
//                     "Create Buyer"
//                   )}
//                 </Button>
//                 <Link href="/buyers" className="flex-1">
//                   <Button variant="outline" className="w-full bg-transparent">
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
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { getCookie, apiCall } from "@/lib/auth-utils"
import { useToast } from "@/hooks/use-toast"

interface Company {
  id: number
  uid: string
  name: string
}

export default function AddBuyerPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [companies, setCompanies] = useState<Company[]>([])
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    company_uid: "",
  })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [companiesLoading, setCompaniesLoading] = useState(true)

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

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = getCookie("access_token")
        if (!token) {
          toast({
            title: "Unauthorized",
            description: "You need to be logged in to view companies.",
            variant: "destructive",
          })
          router.push("/login")
          return
        }

        const response = await apiCall("/organizations/my_companys/")
        if (!response.ok) {
          throw new Error("Failed to fetch companies")
        }
        const data = await response.json()
        setCompanies(Array.isArray(data) ? data : data.results || [])
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to load companies. Please try again.",
          variant: "destructive",
        })
      } finally {
        setCompaniesLoading(false)
      }
    }

    fetchCompanies()
  }, [router, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
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
          description: "You need to be logged in to create a buyer.",
          variant: "destructive",
        })
        router.push("/login")
        return
      }

      const response = await apiCall("/sample_manager/buyer/", {
        method: "POST",
        body: JSON.stringify(formData),
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
              description: data.detail || "Failed to create buyer",
              variant: "destructive",
            })
          }
        } else {
          toast({
            title: "Error",
            description: "Failed to create buyer. Please try again.",
            variant: "destructive",
          })
        }
        setIsLoading(false)
        return
      }

      toast({
        title: "Success",
        description: "Buyer created successfully.",
        variant: "default",
      })
      router.push("/buyers")
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
        <Link href="/buyers">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Add New Buyer</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Fill in the buyer details below</p>
        </div>
      </div>

      <div className="max-w-3xl">
        <Card className="border-border">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Buyer Name */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Buyer Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter buyer name"
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                  {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name[0]}</p>}
                </div>

                {/* Company Selection */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Company *</label>
                  <select
                    name="company_uid"
                    value={formData.company_uid}
                    onChange={handleChange}
                    required
                    disabled={companiesLoading}
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition disabled:opacity-50 ${
                      fieldErrors.company_uid ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  >
                    <option value="">{companiesLoading ? "Loading companies..." : "Select a company"}</option>
                    {companies.map((company) => (
                      <option key={company.uid} value={company.uid}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.company_uid && <p className="text-sm text-red-600 mt-1">{fieldErrors.company_uid[0]}</p>}
                </div>

                {/* Street */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Street *</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    placeholder="Enter street address"
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.street ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                  {fieldErrors.street && <p className="text-sm text-red-600 mt-1">{fieldErrors.street[0]}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Enter city"
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.city ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                  {fieldErrors.city && <p className="text-sm text-red-600 mt-1">{fieldErrors.city[0]}</p>}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    placeholder="Enter state"
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.state ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                  {fieldErrors.state && <p className="text-sm text-red-600 mt-1">{fieldErrors.state[0]}</p>}
                </div>

                {/* Country */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    placeholder="Enter country"
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.country ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                  {fieldErrors.country && <p className="text-sm text-red-600 mt-1">{fieldErrors.country[0]}</p>}
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
                    "Create Buyer"
                  )}
                </Button>
                <Link href="/buyers" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
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
