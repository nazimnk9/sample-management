// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Search, Plus, Eye, SettingsIcon, X } from "lucide-react"

// const companies = [
//   { id: 1, name: "TechStyle Co.", country: "USA", samples: 245, status: "Active" },
//   { id: 2, name: "Fashion Forward Inc.", country: "Canada", samples: 189, status: "Active" },
//   { id: 3, name: "Global Garments Ltd.", country: "UK", samples: 320, status: "Active" },
//   { id: 4, name: "Premium Textiles", country: "Germany", samples: 167, status: "Active" },
//   { id: 5, name: "Oriental Fabrics", country: "Vietnam", samples: 412, status: "Pending" },
// ]

// export default function CompanyPage() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedCompany, setSelectedCompany] = useState<any>(null)
//   const [detailsModal, setDetailsModal] = useState(false)
//   const [settingsModal, setSettingsModal] = useState(false)

//   const filteredCompanies = companies.filter((company) => company.name.toLowerCase().includes(searchTerm.toLowerCase()))

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
//       <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Companies</h1>
//           <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage and monitor all partner companies</p>
//         </div>
//         <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
//           <Plus className="w-4 h-4" />
//           Add New Company
//         </Button>
//       </div>

//       <div className="mb-6 relative">
//         <Search className="absolute left-3 top-2.5 sm:top-3 w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground" />
//         <input
//           type="text"
//           placeholder="Search companies..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//         />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//         {filteredCompanies.map((company) => (
//           <Card key={company.id} className="border-border hover:shadow-lg transition-all">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-base sm:text-lg line-clamp-2">{company.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3 mb-4">
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-1">Country</p>
//                   <p className="text-sm font-medium text-foreground">{company.country}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-1">Total Samples</p>
//                   <p className="text-sm font-medium text-foreground">{company.samples}</p>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between pt-4 border-t border-border mb-4">
//                 <span
//                   className={`text-xs font-medium px-2 py-1 rounded ${
//                     company.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
//                   }`}
//                 >
//                   {company.status}
//                 </span>
//               </div>
//               <div className="flex gap-2">
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-transparent text-xs sm:text-sm"
//                   onClick={() => {
//                     setSelectedCompany(company)
//                     setDetailsModal(true)
//                   }}
//                 >
//                   <Eye className="w-3 sm:w-4 h-3 sm:h-4" />
//                   Details
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-transparent text-xs sm:text-sm"
//                   onClick={() => {
//                     setSelectedCompany(company)
//                     setSettingsModal(true)
//                   }}
//                 >
//                   <SettingsIcon className="w-3 sm:w-4 h-3 sm:h-4" />
//                   Settings
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Details Modal */}
//       {detailsModal && selectedCompany && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl line-clamp-1">{selectedCompany.name}</CardTitle>
//               <button onClick={() => setDetailsModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-2">Company Name</p>
//                   <p className="text-base sm:text-lg font-semibold text-foreground">{selectedCompany.name}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-2">Country</p>
//                   <p className="text-base sm:text-lg font-semibold text-foreground">{selectedCompany.country}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-2">Status</p>
//                   <span
//                     className={`inline-block text-sm font-medium px-3 py-1 rounded ${
//                       selectedCompany.status === "Active"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {selectedCompany.status}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground mb-2">Total Samples</p>
//                   <p className="text-base sm:text-lg font-semibold text-foreground">{selectedCompany.samples}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Settings Modal */}
//       {settingsModal && selectedCompany && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex items-center justify-between border-b border-border pb-3">
//               <CardTitle className="text-lg sm:text-xl line-clamp-2">
//                 Company Settings - {selectedCompany.name}
//               </CardTitle>
//               <button onClick={() => setSettingsModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
//                 <X className="w-5 h-5" />
//               </button>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Company Name</label>
//                   <input
//                     type="text"
//                     defaultValue={selectedCompany.name}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Country</label>
//                   <input
//                     type="text"
//                     defaultValue={selectedCompany.country}
//                     className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-foreground block mb-2">Status</label>
//                   <select className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
//                     <option>Active</option>
//                     <option>Inactive</option>
//                     <option>Pending</option>
//                   </select>
//                 </div>
//                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
//                   <Button className="flex-1 bg-primary hover:bg-primary/90 text-white text-sm">Save Changes</Button>
//                   <Button
//                     variant="outline"
//                     className="flex-1 bg-transparent text-sm"
//                     onClick={() => setSettingsModal(false)}
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Plus, Eye, SettingsIcon, X, AlertCircle, Loader2 } from "lucide-react"
import { getCookie, apiCall } from "@/lib/auth-utils"

interface Company {
  id: number
  uid: string
  name: string
  street: string
  city: string
  state: string
  country: string
  zip_code: string
  trade_licence_no: string
  tax_code: string
  domain_name: string
  domain_platform: string
  custom_domain_platform: string | null
  status: string
  created_at: string
  updated_at: string
}

export default function CompanyPage() {
  const router = useRouter()
  const [companies, setCompanies] = useState<Company[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [detailsModal, setDetailsModal] = useState(false)
  const [settingsModal, setSettingsModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = getCookie("access_token")
        if (!token) {
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
        setError("Failed to load companies. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompanies()
  }, [router])

  const filteredCompanies = companies.filter((company) => company.name.toLowerCase().includes(searchTerm.toLowerCase()))

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
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Companies</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage and monitor all partner companies</p>
        </div>
        <Link href="/company/add" className="w-full sm:w-auto">
          <Button className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Company
          </Button>
        </Link>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-2.5 sm:top-3 w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="border-border hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg line-clamp-2">{company.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Country</p>
                  <p className="text-sm font-medium text-foreground">{company.country}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">City</p>
                  <p className="text-sm font-medium text-foreground">{company.city}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border mb-4">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    company.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {company.status}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-transparent text-xs sm:text-sm"
                  onClick={() => {
                    setSelectedCompany(company)
                    setDetailsModal(true)
                  }}
                >
                  <Eye className="w-3 sm:w-4 h-3 sm:h-4" />
                  Details
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-transparent text-xs sm:text-sm"
                  onClick={() => {
                    setSelectedCompany(company)
                    setSettingsModal(true)
                  }}
                >
                  <SettingsIcon className="w-3 sm:w-4 h-3 sm:h-4" />
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details Modal */}
      {detailsModal && selectedCompany && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-lg sm:text-xl line-clamp-1">{selectedCompany.name}</CardTitle>
              <button onClick={() => setDetailsModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Company Name</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">{selectedCompany.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Country</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">{selectedCompany.country}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">City</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">{selectedCompany.city}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">State</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">{selectedCompany.state}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Street</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">{selectedCompany.street}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Zip Code</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">{selectedCompany.zip_code}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Trade Licence No</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">
                    {selectedCompany.trade_licence_no}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Tax Code</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">{selectedCompany.tax_code}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Domain Name</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">{selectedCompany.domain_name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Status</p>
                  <span
                    className={`inline-block text-sm font-medium px-3 py-1 rounded ${
                      selectedCompany.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {selectedCompany.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Settings Modal */}
      {settingsModal && selectedCompany && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-lg sm:text-xl line-clamp-2">
                Company Settings - {selectedCompany.name}
              </CardTitle>
              <button onClick={() => setSettingsModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Company Name</label>
                  <input
                    type="text"
                    defaultValue={selectedCompany.name}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Country</label>
                  <input
                    type="text"
                    defaultValue={selectedCompany.country}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Status</label>
                  <select className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>ACTIVE</option>
                    <option>INACTIVE</option>
                    <option>PENDING</option>
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-white text-sm">Save Changes</Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent text-sm"
                    onClick={() => setSettingsModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
