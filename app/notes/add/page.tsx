"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft } from "lucide-react"
import { apiCall, getCurrentUserRole, canAccessFeature } from "@/lib/auth-utils"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface FormData {
  company_uid: string
  title: string
  description: string
}

export default function AddNotePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    company_uid: "",
    title: "",
    description: "",
  })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [companies, setCompanies] = useState<any[]>([])
  const [companiesLoading, setCompaniesLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)

  // Fetch user role
  useEffect(() => {
    const fetchRole = async () => {
      const role = await getCurrentUserRole()
      setUserRole(role)
      if (!role || !canAccessFeature(role, "notes_list")) {
        router.push("/")
      }
    }
    fetchRole()
  }, [router])

  // Fetch companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setCompaniesLoading(true)
        const response = await apiCall("/organizations/my_companys/")
        if (response.ok) {
          const data = await response.json()
          setCompanies(data.results || data)
        }
      } catch (error) {
        console.error("Error fetching companies:", error)
        toast.error("Error fetching companies")
      } finally {
        setCompaniesLoading(false)
      }
    }

    if (userRole) {
      fetchCompanies()
    }
  }, [userRole])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      setFieldErrors({})

      const payload = {
        company_uid: formData.company_uid,
        title: formData.title,
        description: formData.description,
      }

      const response = await apiCall("/sample_manager/note/", {
        method: "POST",
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        toast.success("Note created successfully")
        router.push("/notes")
      } else {
        const error = await response.json()
        setFieldErrors(error)
        toast.error("Failed to create note")
      }
    } catch (error) {
      console.error("Error creating note:", error)
      toast.error("Error creating note")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex-1 overflow-auto bg-background p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <button
          onClick={() => router.push("/notes")}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Notes
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create Note</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">Add a new note</p>
      </div>

      <div className="max-w-3xl">
        <Card className="border-border">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
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

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter note title"
                  className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                    fieldErrors.title ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                  }`}
                />
                {fieldErrors.title && <p className="text-sm text-red-600 mt-1">{fieldErrors.title[0]}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Enter note description"
                  rows={6}
                  className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition resize-none ${
                    fieldErrors.description ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                  }`}
                />
                {fieldErrors.description && <p className="text-sm text-red-600 mt-1">{fieldErrors.description[0]}</p>}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button type="submit" disabled={isLoading} className="flex-1 bg-primary hover:bg-primary/90 text-white">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Note"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => router.push("/notes")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
