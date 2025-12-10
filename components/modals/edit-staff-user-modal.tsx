"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiCall } from "@/lib/auth-utils"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EditStaffUserModalProps {
    isOpen: boolean
    onClose: () => void
    userUid: string | null
    onSuccess: () => void
}

interface FetchedUserData {
    id: number
    user: {
        id: number
        role: string
        email: string
        first_name: string
        last_name: string
        phone: string | null
        [key: string]: any
    }
    role: string
    [key: string]: any
}

export default function EditStaffUserModal({ isOpen, onClose, userUid, onSuccess }: EditStaffUserModalProps) {
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)

    // Store original data for comparison
    const [originalData, setOriginalData] = useState<FetchedUserData | null>(null)

    // Form state
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        role: "",
        password: "",
    })

    // Fetch user details when modal opens with a uid
    useEffect(() => {
        if (isOpen && userUid) {
            const fetchUserDetails = async () => {
                setFetching(true)
                try {
                    const response = await apiCall(`/organizations/users/${userUid}`)
                    if (response.ok) {
                        const data: FetchedUserData = await response.json()
                        setOriginalData(data)

                        // Initialize form with fetched data
                        // Note: API structure shows nested user object for personal details, but root level also has role
                        // The prompt GET response example shows:
                        // "user": { ..., "first_name": "...", "role": "ADMINISTRATOR", ... }
                        // root: { ..., "role": "ADMINISTRATOR", ... }
                        // I'll grab fields from the nested `user` object primarily, as that seems to be where the profile data lives.
                        // Role is in both, but usually managed at listing level.

                        setFormData({
                            first_name: data.user.first_name || "",
                            last_name: data.user.last_name || "",
                            email: data.user.email || "",
                            phone: data.user.phone || "",
                            role: data.role || data.user.role || "", // Prefer root role if available
                            password: "",
                        })
                    } else {
                        toast({
                            title: "Error",
                            description: "Failed to fetch user details",
                            variant: "destructive"
                        })
                        onClose()
                    }
                } catch (error) {
                    console.error("Error fetching user:", error)
                    toast({
                        title: "Error",
                        description: "Error loading user data",
                        variant: "destructive"
                    })
                    onClose()
                } finally {
                    setFetching(false)
                }
            }
            fetchUserDetails()
        }
    }, [isOpen, userUid, onClose, toast])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, role: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!originalData || !userUid) return

        setLoading(true)

        try {
            const payload: any = {}
            let hasChanges = false

            // Check for changes
            if (formData.first_name !== (originalData.user.first_name || "")) {
                payload.first_name = formData.first_name
                hasChanges = true
            }
            if (formData.last_name !== (originalData.user.last_name || "")) {
                payload.last_name = formData.last_name
                hasChanges = true
            }
            if (formData.email !== (originalData.user.email || "")) {
                payload.email = formData.email
                hasChanges = true
            }
            // Normalize phone: API might return null, form has string
            const originalPhone = originalData.user.phone || ""
            const newPhone = formData.phone || ""
            if (newPhone !== originalPhone) {
                payload.phone = newPhone
                hasChanges = true
            }

            // Role check - compare with root role or user role
            const originalRole = originalData.role || originalData.user.role || ""
            if (formData.role !== originalRole) {
                payload.role = formData.role
                hasChanges = true
            }

            // Password check
            if (formData.password && formData.password.trim() !== "") {
                payload.password = formData.password
                hasChanges = true
            }

            if (!hasChanges) {
                onClose()
                return
            }

            const response = await apiCall(`/organizations/users/${userUid}`, {
                method: "PATCH",
                body: JSON.stringify(payload),
            })

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "User updated successfully"
                })
                onSuccess()
                onClose()
            } else {
                toast({
                    title: "Error",
                    description: "Failed to update user",
                    variant: "destructive"
                })
            }
        } catch (error) {
            console.error("Error updating user:", error)
            toast({
                title: "Error",
                description: "Error updating user",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>

                {fetching ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first_name">First Name</Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last_name">Last Name</Label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select value={formData.role} onValueChange={handleSelectChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ADMINISTRATOR">Administrator</SelectItem>
                                    <SelectItem value="MANAGER">Manager</SelectItem>
                                    <SelectItem value="ACCOUNTANT">Accountant</SelectItem>
                                    <SelectItem value="MERCHANDISER">Merchandiser</SelectItem>
                                    <SelectItem value="STAFF">Staff</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">New Password (Optional)</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Leave blank to keep current"
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit" disabled={loading}>
                                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                Update User
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}
