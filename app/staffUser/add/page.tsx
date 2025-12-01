"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft,Loader2 } from "lucide-react"
import { apiCall, getCurrentUserRole } from "@/lib/auth-utils"
import { useToast } from "@/hooks/use-toast"

interface Company {
  id: number
  uid: string
  name: string
}

export default function AddStaffUserPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [companiesLoading, setCompaniesLoading] = useState(true)
  const [companies, setCompanies] = useState<Company[]>([])
  const [userRole, setUserRole] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    role: "MANAGER",
    //company_uid: "",
  })

  const roleOptions = [
    { value: "MANAGER", label: "Manager" },
    { value: "ACCOUNTANT", label: "Accountant" },
    { value: "MERCHANDISER", label: "Merchandiser" },
    { value: "STAFF", label: "Staff" },
  ]

  useEffect(() => {
    const checkAccessAndFetchData = async () => {
      // Get current user role
      const role = await getCurrentUserRole()
      setUserRole(role)

      // Fetch companies
      try {
        const response = await apiCall("/organizations/my_companys/")
        if (response.ok) {
          const data = await response.json()
          setCompanies(data.results || [])
        } else if (response.status === 401) {
          toast({
            title: "Unauthorized",
            description: "Please login to access this page.",
            variant: "destructive",
          })
          router.push("/login")
        } else {
          throw new Error("Failed to fetch companies")
        }
      } catch (error) {
        console.error("Error fetching companies:", error)
        toast({
          title: "Error",
          description: "Failed to load companies. Please try again.",
          variant: "destructive",
        })
      } finally {
        setCompaniesLoading(false)
      }
    }

    checkAccessAndFetchData()
  }, [router, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      const response = await apiCall("/organizations/users/", {
        method: "POST",
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "User created successfully.",
        })
        router.push("/staffUser")
      } else if (response.status === 401) {
        toast({
          title: "Unauthorized",
          description: "Your session has expired. Please login again.",
          variant: "destructive",
        })
        router.push("/login")
      } else {
        const data = await response.json()
        if (typeof data === "object" && !Array.isArray(data)) {
          const newErrors: Record<string, string> = {}
          Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              newErrors[key] = value.join(", ")
            } else if (typeof value === "string") {
              newErrors[key] = value
            }
          })
          setErrors(newErrors)

          // Show toast with error message
          const errorMessages = Object.values(newErrors).join("; ")
          toast({
            title: "Validation Error",
            description: errorMessages,
            variant: "destructive",
          })
        } else {
          throw new Error("Failed to create user")
        }
      }
    } catch (error) {
      console.error("Error creating user:", error)
      toast({
        title: "Error",
        description: "Failed to create user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (companiesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-background">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/staffUser" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Staff Users
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Create New Staff User</h1>
          <p className="text-muted-foreground mt-1">Add a new staff member to the system</p>
        </div>

        {/* Form */}
        <div className="bg-white border border-border rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? "border-red-500" : "border-border"
                }`}
                placeholder="user@example.com"
                required
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* First Name */}
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-foreground mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.first_name ? "border-red-500" : "border-border"
                }`}
                placeholder="John"
                required
              />
              {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-foreground mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.last_name ? "border-red-500" : "border-border"
                }`}
                placeholder="Doe"
                required
              />
              {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.phone ? "border-red-500" : "border-border"
                }`}
                placeholder="+1234567890"
                required
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.password ? "border-red-500" : "border-border"
                }`}
                placeholder="Enter password"
                required
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.role ? "border-red-500" : "border-border"
                }`}
                required
              >
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            </div>

            {/* Company */}
            {/* <div>
              <label htmlFor="company_uid" className="block text-sm font-medium text-foreground mb-2">
                Company <span className="text-red-500">*</span>
              </label>
              <select
                id="company_uid"
                name="company_uid"
                value={formData.company_uid}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.company_uid ? "border-red-500" : "border-border"
                }`}
                required
              >
                <option value="">Select a company</option>
                {companies.map((company) => (
                  <option key={company.uid} value={company.uid}>
                    {company.name}
                  </option>
                ))}
              </select>
              {errors.company_uid && <p className="text-red-500 text-xs mt-1">{errors.company_uid}</p>}
            </div> */}

            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t border-border">
              <Link href="/staffUser">
                <button
                  type="button"
                  className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : ("Create User")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
