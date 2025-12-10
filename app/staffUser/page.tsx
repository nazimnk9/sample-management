"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Plus, Trash2, Edit } from "lucide-react"
import { apiCall, getCurrentUserRole, canAccessFeature } from "@/lib/auth-utils"
import { useToast } from "@/hooks/use-toast"
import EditStaffUserModal from "@/components/modals/edit-staff-user-modal"

interface Company {
  id: number
  name: string
  // Add other fields if needed for display, but name is primary
}

interface UserDetails {
  id: number
  role: string
  company: Company | null
  email: string
  first_name: string
  last_name: string
  phone: string | null
  profile_picture: string | null
  status: string
  gender: string
}

interface StaffUserResult {
  id: number
  uid: string
  user: UserDetails
  role: string
  is_active: boolean
  status: string
  created_at: string
  company: number // The ID reference
  created_by: number
}

export default function StaffUserPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [users, setUsers] = useState<StaffUserResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedUserUid, setSelectedUserUid] = useState<string | null>(null)

  const fetchUsers = async () => {
    try {
      const response = await apiCall("/organizations/users/")
      if (response.ok) {
        const data = await response.json()
        setUsers(data.results || [])
      } else {
        throw new Error("Failed to fetch users")
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  useEffect(() => {
    const checkAccessAndFetchUsers = async () => {
      // Get current user role
      const role = await getCurrentUserRole()
      setUserRole(role)

      // Check if user can access staff user list
      if (!canAccessFeature(role, "staff_user_list")) {
        toast({
          title: "Access Denied",
          description: "You do not have permission to access staff users.",
          variant: "destructive",
        })
        router.push("/dashboard")
        return
      }

      // Fetch users
      setIsLoading(true)
      try {
        await fetchUsers()
      } catch (error) {
        console.error("Error fetching users:", error)
        toast({
          title: "Error",
          description: "Failed to load users. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    checkAccessAndFetchUsers()
  }, [router, toast])

  const handleDelete = async (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await apiCall(`/organizations/users/${userId}/`, {
          method: "DELETE",
        })
        if (response.ok) {
          setUsers(users.filter((u) => u.id !== userId))
          toast({
            title: "Success",
            description: "User deleted successfully.",
          })
        } else {
          throw new Error("Failed to delete user")
        }
      } catch (error) {
        console.error("Error deleting user:", error)
        toast({
          title: "Error",
          description: "Failed to delete user. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleEdit = (uid: string) => {
    setSelectedUserUid(uid)
    setIsEditModalOpen(true)
  }

  const handleEditSuccess = () => {
    fetchUsers() // Refresh list
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Staff Users</h1>
            <p className="text-muted-foreground mt-1">Manage staff members and their roles</p>
          </div>
          <Link href="/staffUser/add">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
              <Plus className="w-5 h-5" />
              Add New User
            </button>
          </Link>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Company</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.length > 0 ? (
                  users.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {item.user.first_name} {item.user.last_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{item.user.email}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{item.user.phone || "-"}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {item.user.company?.name || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {item.role}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${item.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(item.uid)}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="Edit user"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete user"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <EditStaffUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userUid={selectedUserUid}
        onSuccess={handleEditSuccess}
      />
    </div>
  )
}
