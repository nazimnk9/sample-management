"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { getCookie, apiCall } from "@/lib/auth-utils"
import { useToast } from "@/hooks/use-toast"

export default function AddCompanyPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    zip_code: "",
    state: "",
    country: "",
    trade_licence_no: "",
    tax_code: "",
    domain_name: "",
    domain_platform: "NAMECHEAP",
  })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [isLoading, setIsLoading] = useState(false)

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
          description: "You need to be logged in to create a company.",
          variant: "destructive",
        })
        router.push("/login")
        return
      }

      const response = await apiCall("/organizations/my_companys/", {
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
              description: data.detail || "Failed to create company",
              variant: "destructive",
            })
          }
        } else {
          toast({
            title: "Error",
            description: "Failed to create company. Please try again.",
            variant: "destructive",
          })
        }
        setIsLoading(false)
        return
      }

      toast({
        title: "Success",
        description: "Company created successfully.",
        variant: "default",
      })
      router.push("/company")
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
        <Link href="/company">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Add New Company</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Fill in the company details below</p>
        </div>
      </div>

      <div className="max-w-3xl">
        <Card className="border-border">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company Name */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Company Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter company name"
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                  {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name[0]}</p>}
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
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:border-transparent transition ${
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
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:border-transparent transition ${
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
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.state ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                  {fieldErrors.state && <p className="text-sm text-red-600 mt-1">{fieldErrors.state[0]}</p>}
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    placeholder="Enter country"
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.country ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                  {fieldErrors.country && <p className="text-sm text-red-600 mt-1">{fieldErrors.country[0]}</p>}
                </div>

                {/* Zip Code */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Zip Code *</label>
                  <input
                    type="text"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleChange}
                    required
                    placeholder="Enter zip code"
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.zip_code ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                  {fieldErrors.zip_code && <p className="text-sm text-red-600 mt-1">{fieldErrors.zip_code[0]}</p>}
                </div>

                {/* Trade Licence No */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Trade Licence No *</label>
                  <input
                    type="text"
                    name="trade_licence_no"
                    value={formData.trade_licence_no}
                    onChange={handleChange}
                    required
                    placeholder="Enter trade licence number"
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.trade_licence_no
                        ? "border-red-500 focus:ring-red-500"
                        : "border-border focus:ring-primary"
                    }`}
                  />
                  {fieldErrors.trade_licence_no && (
                    <p className="text-sm text-red-600 mt-1">{fieldErrors.trade_licence_no[0]}</p>
                  )}
                </div>

                {/* Tax Code */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Tax Code *</label>
                  <input
                    type="text"
                    name="tax_code"
                    value={formData.tax_code}
                    onChange={handleChange}
                    required
                    placeholder="Enter tax code"
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.tax_code ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                  {fieldErrors.tax_code && <p className="text-sm text-red-600 mt-1">{fieldErrors.tax_code[0]}</p>}
                </div>

                {/* Domain Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Domain Name *</label>
                  <input
                    type="text"
                    name="domain_name"
                    value={formData.domain_name}
                    onChange={handleChange}
                    required
                    placeholder="Enter domain name"
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.domain_name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                  {fieldErrors.domain_name && <p className="text-sm text-red-600 mt-1">{fieldErrors.domain_name[0]}</p>}
                </div>

                {/* Domain Platform */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Domain Platform *</label>
                  <select
                    name="domain_platform"
                    value={formData.domain_platform}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.domain_platform
                        ? "border-red-500 focus:ring-red-500"
                        : "border-border focus:ring-primary"
                    }`}
                  >
                    <option value="NAMECHEAP">NAMECHEAP</option>
                    <option value="GoDaddy">GoDaddy</option>
                    <option value="Bluehost">Bluehost</option>
                  </select>
                  {fieldErrors.domain_platform && (
                    <p className="text-sm text-red-600 mt-1">{fieldErrors.domain_platform[0]}</p>
                  )}
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
                    "Create Company"
                  )}
                </Button>
                <Link href="/company" className="flex-1">
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
