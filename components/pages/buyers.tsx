"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Plus, Eye, SettingsIcon, X, AlertCircle, Loader2, MoreVertical, Trash } from "lucide-react"
import { getCookie, apiCall } from "@/lib/auth-utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface Buyer {
  id: number
  uid: string
  name: string
  street: string
  city: string
  state: string
  country: string
  status: string
  created_at: string
  updated_at: string
  created_by: number
  company: number
  company_uid?: string
}

interface Company {
  id: number
  uid: string
  name: string
}

export default function BuyersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [buyers, setBuyers] = useState<Buyer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null)

  // Modals
  const [detailsModal, setDetailsModal] = useState(false)
  const [settingsModal, setSettingsModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  // Data & Loading States
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [companies, setCompanies] = useState<Company[]>([])
  const [error, setError] = useState("")

  // Update Form State
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    company_uid: "",
    status: "ACTIVE"
  })

  // Helper to fetch list of buyers
  const fetchBuyers = async () => {
    try {
      const token = getCookie("access_token")
      if (!token) {
        router.push("/login")
        return
      }

      const response = await apiCall("/sample_manager/buyer/")
      if (!response.ok) {
        throw new Error("Failed to fetch buyers")
      }
      const data = await response.json()
      setBuyers(Array.isArray(data) ? data : data.results || [])
    } catch (err) {
      setError("Failed to load buyers. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBuyers()
  }, [router])

  // Fetch single buyer details for "Settings" (Update) modal
  const fetchBuyerDetails = async (uid: string) => {
    try {
      const response = await apiCall(`/sample_manager/buyer/${uid}`)
      if (response.ok) {
        const data = await response.json()
        setFormData({
          name: data.name || "",
          street: data.street || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "",
          company_uid: data.company.uid || "", // Assuming backend returns company_uid or similar
          status: data.status || "ACTIVE"
        })
      }
    } catch (error) {
      console.error("Failed to fetch buyer details", error)
    }
  }

  // Fetch companies for the dropdown in "Settings" modal
  const fetchCompanies = async () => {
    try {
      const response = await apiCall("/organizations/my_companys/")
      if (response.ok) {
        const data = await response.json()
        setCompanies(Array.isArray(data) ? data : data.results || [])
      }
    } catch (err) {
      console.error("Failed to fetch companies", err)
    }
  }

  // Handle opening settings modal
  const handleOpenSettings = async (buyer: Buyer) => {
    setSelectedBuyer(buyer)
    await fetchCompanies()
    await fetchBuyerDetails(buyer.uid)
    setSettingsModal(true)
  }

  // Handle opening details modal
  const handleOpenDetails = async (buyer: Buyer) => {
    // Optional: fetch fresh details if needed, otherwise use list data
    // For completeness, let's fetch fresh data same as update
    setSelectedBuyer(buyer)
    try {
      const response = await apiCall(`/sample_manager/buyer/${buyer.uid}`)
      if (response.ok) {
        const data = await response.json()
        // Merge with existing buyer data or just use it
        setSelectedBuyer({ ...buyer, ...data })
      }
    } catch (e) {
      // Fallback to list data if fetch fails
      console.error(e)
    }
    setDetailsModal(true)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedBuyer) return

    setIsSubmitting(true)
    try {
      const response = await apiCall(`/sample_manager/buyer/${selectedBuyer.uid}`, {
        method: "PUT", // or PATCH depending on API
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.detail || "Failed to update buyer")
      }

      toast({
        title: "Success",
        description: "Buyer updated successfully",
      })
      setSettingsModal(false)
      fetchBuyers() // Refresh list
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to update buyer",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedBuyer) return
    setIsSubmitting(true)
    try {
      const response = await apiCall(`/sample_manager/buyer/${selectedBuyer.uid}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete buyer")
      }

      toast({
        title: "Success",
        description: "Buyer deleted successfully",
      })
      setDeleteModal(false)
      fetchBuyers() // Refresh list
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete buyer",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredBuyers = buyers.filter((buyer) => buyer.name.toLowerCase().includes(searchTerm.toLowerCase()))

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
      {error && (
        <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Buyers</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage and track all buyer relationships</p>
        </div>
        <Link href="/buyers/add" className="w-full sm:w-auto">
          <Button className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Buyer
          </Button>
        </Link>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-2.5 sm:top-3 w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search buyers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredBuyers.map((buyer) => (
          <Card key={buyer.id} className="border-border hover:shadow-lg transition-all relative group bg-gray-200">
            {/* 3-dots Menu */}
            <div className="absolute top-2 right-2 opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="text-red-600 cursor-pointer"
                    onClick={() => {
                      setSelectedBuyer(buyer)
                      setDeleteModal(true)
                    }}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <CardHeader className="pb-3 pr-10"> {/* Added pr-10 to avoid overlap with menu icon */}
              <CardTitle className="text-base sm:text-lg line-clamp-2">{buyer.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">City</p>
                  <p className="text-xs sm:text-sm font-medium text-foreground">{buyer.city}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Country</p>
                  <p className="text-sm font-medium text-foreground">{buyer.country}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-primary mb-4">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${buyer.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {buyer.status}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-primary text-white text-xs sm:text-sm"
                  onClick={() => handleOpenDetails(buyer)}
                >
                  <Eye className="w-3 sm:w-4 h-3 sm:h-4" />
                  Details
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-primary text-white text-xs sm:text-sm"
                  onClick={() => handleOpenSettings(buyer)}
                >
                  <SettingsIcon className="w-3 sm:w-4 h-3 sm:h-4" />
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {detailsModal && selectedBuyer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-lg sm:text-xl line-clamp-1">{selectedBuyer.name}</CardTitle>
              <button onClick={() => setDetailsModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Buyer Name</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">{selectedBuyer.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">City</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">{selectedBuyer.city}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">State</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">{selectedBuyer.state}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Country</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">{selectedBuyer.country}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Street</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">{selectedBuyer.street}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Status</p>
                  <span
                    className={`inline-block text-sm font-medium px-3 py-1 rounded ${selectedBuyer.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {selectedBuyer.status}
                  </span>
                </div>
                {/* Additional details if available from fetched data */}
                {selectedBuyer.created_at && (
                  <div className="sm:col-span-2">
                    <p className="text-xs text-muted-foreground mb-2">Created At</p>
                    <p className="text-sm text-foreground">{new Date(selectedBuyer.created_at).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {settingsModal && selectedBuyer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-lg sm:text-xl line-clamp-2">Buyer Settings - {selectedBuyer.name}</CardTitle>
              <button onClick={() => setSettingsModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-foreground block mb-2">Buyer Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-foreground block mb-2">Company</label>
                    <select
                      value={formData.company_uid}
                      onChange={(e) => setFormData({ ...formData, company_uid: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    // required // Depends if company is editable or just display
                    >
                      <option value="">Select Company</option>
                      {companies.map(c => (
                        <option key={c.uid} value={c.uid}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-foreground block mb-2">Street</label>
                    <input
                      type="text"
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Country</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                      <option value="PENDING">PENDING</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90 text-white text-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent text-sm"
                    onClick={() => setSettingsModal(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && selectedBuyer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-border">
            <CardHeader>
              <CardTitle>Delete Buyer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Are you sure you want to delete <strong>{selectedBuyer.name}</strong>? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setDeleteModal(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
