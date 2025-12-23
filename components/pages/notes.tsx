"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Search, Plus, Eye, SettingsIcon, MoreVertical, Trash2, X } from "lucide-react"
import { apiCall, getCurrentUserRole, canAccessFeature } from "@/lib/auth-utils"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Note {
  uid: string
  id: number
  title: string
  description: string
  company: {
    id: number
    uid: string
    name: string
  }
  created_by: number
  status: string
}

interface FormData {
  company_uid: string
  title: string
  description: string
}

export default function Notes() {
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([])
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [userRole, setUserRole] = useState<string | null>(null)
  const [companies, setCompanies] = useState<any[]>([])
  const [companyMap, setCompanyMap] = useState<Record<number, string>>({})

  // Modal states
  const [detailsModal, setDetailsModal] = useState(false)
  const [settingsModal, setSettingsModal] = useState(false)
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  // Settings modal states
  const [formData, setFormData] = useState<FormData>({
    company_uid: "",
    title: "",
    description: "",
  })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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

  // Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true)
        const response = await apiCall("/sample_manager/note/")
        if (response.ok) {
          const data = await response.json()
          setNotes(data.results || data)
        } else {
          toast.error("Failed to fetch notes")
        }
      } catch (error) {
        console.error("Error fetching notes:", error)
        toast.error("Error fetching notes")
      } finally {
        setIsLoading(false)
      }
    }

    if (userRole) {
      fetchNotes()
    }
  }, [userRole])

  // Fetch companies and build map
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await apiCall("/organizations/my_companys/")
        if (response.ok) {
          const data = await response.json()
          const companiesList = data.results || data
          setCompanies(companiesList)

          const map: Record<number, string> = {}
          companiesList.forEach((company: any) => {
            map[company.id] = company.name
          })
          setCompanyMap(map)
        }
      } catch (error) {
        console.error("Error fetching companies:", error)
      }
    }

    if (userRole) {
      fetchCompanies()
    }
  }, [userRole])

  // Filter notes based on search
  useEffect(() => {
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredNotes(filtered)
  }, [searchTerm, notes])

  // Handle settings click - fetch full note data
  const handleSettingsClick = async (note: Note) => {
    try {
      const response = await apiCall(`/sample_manager/note/${note.uid}`)
      if (response.ok) {
        const data = await response.json()
        setSelectedNote(data)
        setFormData({
          company_uid: data.company?.uid || "",
          title: data.title,
          description: data.description,
        })
        setFieldErrors({})
        setSettingsModal(true)
      } else {
        toast.error("Failed to fetch note details")
      }
    } catch (error) {
      console.error("Error fetching note:", error)
      toast.error("Error fetching note details")
    }
  }

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle update note
  const handleUpdateNote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedNote) return

    try {
      setIsUpdating(true)
      const payload = {
        company_uid: formData.company_uid,
        title: formData.title,
        description: formData.description,
      }

      const response = await apiCall(`/sample_manager/note/${selectedNote.uid}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        toast.success("Note updated successfully")
        setSettingsModal(false)

        // Refresh notes list
        const listResponse = await apiCall("/sample_manager/note/")
        if (listResponse.ok) {
          const data = await listResponse.json()
          setNotes(data.results || data)
        }
      } else {
        const error = await response.json()
        setFieldErrors(error)
        toast.error("Failed to update note")
      }
    } catch (error) {
      console.error("Error updating note:", error)
      toast.error("Error updating note")
    } finally {
      setIsUpdating(false)
    }
  }

  // Handle delete note
  const handleDeleteNote = async () => {
    if (!selectedNote) return

    try {
      setIsDeleting(true)
      const response = await apiCall(`/sample_manager/note/${selectedNote.uid}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Note deleted successfully")
        setDeleteConfirmModal(false)

        // Refresh notes list
        const listResponse = await apiCall("/sample_manager/note/")
        if (listResponse.ok) {
          const data = await listResponse.json()
          setNotes(data.results || data)
        }
      } else {
        toast.error("Failed to delete note")
      }
    } catch (error) {
      console.error("Error deleting note:", error)
      toast.error("Error deleting note")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <main className="flex-1 overflow-auto bg-background p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Notes</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage your notes and updates</p>
        </div>
        <Button
          onClick={() => router.push("/notes/add")}
          className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Note
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2.5">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none text-sm"
          />
        </div>
      </div>

      {/* Notes Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredNotes.length === 0 ? (
        <Card className="border-border">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No notes found. Create one to get started!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredNotes.map((note) => (
            <Card key={note.uid} className="border-border hover:shadow-lg transition-all relative bg-gray-200">
              <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={() => setMenuOpen(menuOpen === note.uid ? null : note.uid)}
                  className="p-2 hover:bg-muted rounded-full transition"
                >
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
                {menuOpen === note.uid && (
                  <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg">
                    <button
                      onClick={() => {
                        setSelectedNote(note)
                        setDeleteConfirmModal(true)
                        setMenuOpen(null)
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-base sm:text-lg line-clamp-2">{note.title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="pb-2">
                  <p className="text-xs text-muted-foreground mb-1">Company</p>
                  <p className="text-sm font-medium text-foreground">{note.company?.name || "N/A"}</p>
                </div>

                <div className="pb-2">
                  <p className="text-xs text-muted-foreground mb-1">Description</p>
                  <p className="text-sm text-foreground line-clamp-2">{note.description}</p>
                </div>

                <div className="flex gap-2 pt-4 border-t border-primary">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-primary text-white text-xs sm:text-sm"
                    onClick={() => {
                      setSelectedNote(note)
                      setDetailsModal(true)
                    }}
                  >
                    <Eye className="w-3 sm:w-4 h-3 sm:h-4" />
                    Details
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-primary text-white text-xs sm:text-sm"
                    onClick={() => handleSettingsClick(note)}
                  >
                    <SettingsIcon className="w-3 sm:w-4 h-3 sm:h-4" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {detailsModal && selectedNote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-lg sm:text-xl line-clamp-1">{selectedNote.title}</CardTitle>
              <button onClick={() => setDetailsModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Title</p>
                    <p className="text-base sm:text-lg font-semibold text-foreground">{selectedNote.title}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Company</p>
                    <p className="text-base sm:text-lg font-semibold text-foreground">
                      {selectedNote.company?.name || "N/A"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Description</p>
                  <p className="text-sm text-foreground whitespace-pre-wrap">{selectedNote.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Settings Modal */}
      {settingsModal && selectedNote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-lg">Update Note</CardTitle>
              <button onClick={() => setSettingsModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleUpdateNote} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company *</label>
                  <select
                    name="company_uid"
                    value={formData.company_uid}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition ${
                      fieldErrors.company_uid ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  >
                    <option value="">Select a company</option>
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
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:border-transparent transition ${
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
                    rows={4}
                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:border-transparent transition resize-none ${
                      fieldErrors.description ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                    }`}
                  />
                  {fieldErrors.description && <p className="text-sm text-red-600 mt-1">{fieldErrors.description[0]}</p>}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isUpdating}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setSettingsModal(false)}
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
      {deleteConfirmModal && selectedNote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-border">
            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
              <CardTitle className="text-lg">Delete Note</CardTitle>
              <button onClick={() => setDeleteConfirmModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-foreground mb-6">
                Are you sure you want to delete note "{selectedNote.title}"? This action cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleDeleteNote}
                  disabled={isDeleting}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setDeleteConfirmModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  )
}
