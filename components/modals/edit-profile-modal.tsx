"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiCall } from "@/lib/auth-utils"
import { X, Upload, Loader2, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserData {
    first_name: string
    last_name: string
    email: string
    phone: string | null
    profile_picture: string | null
    gender: string | null
    password?: string
    // Add other fields to ignore or keep
    [key: string]: any
}

interface EditProfileModalProps {
    isOpen: boolean
    onClose: () => void
    currentUser: UserData
    onSuccess: () => void
}

export default function EditProfileModal({ isOpen, onClose, currentUser, onSuccess }: EditProfileModalProps) {
    const [loading, setLoading] = useState(false)
    const [formDataState, setFormDataState] = useState<UserData>({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        profile_picture: null,
        gender: "MALE",
        password: "",
    })
    const [previewImage, setPreviewImage] = useState<string | null>(null)

    // Store the actual file or blob to send
    const [imageFile, setImageFile] = useState<File | Blob | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (currentUser) {
            setFormDataState({
                first_name: currentUser.first_name || "",
                last_name: currentUser.last_name || "",
                email: currentUser.email || "",
                phone: currentUser.phone || "",
                profile_picture: currentUser.profile_picture,
                gender: currentUser.gender || "MALE",
                password: "", // Don't prefill password
            })
            setPreviewImage(currentUser.profile_picture)
            setImageFile(null) // Reset new image file on external update
        }
    }, [currentUser])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormDataState((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (value: string) => {
        setFormDataState((prev) => ({ ...prev, gender: value }))
    }

    const compressImage = async (file: File): Promise<{ dataUrl: string, blob: Blob }> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (event) => {
                const img = new Image()
                img.src = event.target?.result as string
                img.onload = () => {
                    const canvas = document.createElement("canvas")
                    let width = img.width
                    let height = img.height

                    // Max dimensions (optional, but good for size control)
                    const MAX_WIDTH = 1200
                    const MAX_HEIGHT = 1200
                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width
                            width = MAX_WIDTH
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height
                            height = MAX_HEIGHT
                        }
                    }

                    canvas.width = width
                    canvas.height = height
                    const ctx = canvas.getContext("2d")
                    ctx?.drawImage(img, 0, 0, width, height)

                    let quality = 0.9
                    let dataUrl = canvas.toDataURL("image/jpeg", quality)

                    // Loop to reduce quality until under 999KB (approx 1022976 bytes)
                    while (dataUrl.length > 1360000 && quality > 0.1) { // dataUrl length is approx 1.33 * size in bytes
                        quality -= 0.1
                        dataUrl = canvas.toDataURL("image/jpeg", quality)
                    }

                    // Convert DataURL to Blob for upload
                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve({ dataUrl, blob })
                        } else {
                            reject(new Error("Canvas to Blob conversion failed"))
                        }
                    }, "image/jpeg", quality)
                }
                img.onerror = (error) => reject(error)
            }
            reader.onerror = (error) => reject(error)
        })
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            const { dataUrl, blob } = await compressImage(file)
            // Save dataUrl for preview
            setFormDataState((prev) => ({ ...prev, profile_picture: dataUrl }))
            setPreviewImage(dataUrl)
            // Save blob for upload
            setImageFile(blob)
        } catch (error) {
            console.error("Error compressing image:", error)
            alert("Failed to process image")
        }
    }

    const handleRemoveImage = () => {
        setFormDataState((prev) => ({ ...prev, profile_picture: null }))
        setPreviewImage(null)
        setImageFile(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData()
            let hasChanges = false

            // Check text fields
            if (formDataState.first_name !== (currentUser.first_name || "")) {
                formData.append("first_name", formDataState.first_name)
                hasChanges = true
            }
            if (formDataState.last_name !== (currentUser.last_name || "")) {
                formData.append("last_name", formDataState.last_name)
                hasChanges = true
            }
            if (formDataState.email !== (currentUser.email || "")) {
                formData.append("email", formDataState.email)
                hasChanges = true
            }
            // Phone: normalize null to empty string for comparison
            if (formDataState.phone !== (currentUser.phone || "")) {
                formData.append("phone", formDataState.phone || "")
                hasChanges = true
            }
            if (formDataState.gender !== (currentUser.gender || "")) {
                formData.append("gender", formDataState.gender || "")
                hasChanges = true
            }

            // Password - check if provided and not empty
            if (formDataState.password && formDataState.password.trim() !== "") {
                formData.append("password", formDataState.password)
                hasChanges = true
            }

            // Image
            if (imageFile) {
                formData.append("profile_picture", imageFile, "profile.jpg")
                hasChanges = true
            } else if (previewImage === null && currentUser.profile_picture) {
                // Image was explicitly removed (it exists in current user but preview is null)
                formData.append("profile_picture", "")
                hasChanges = true
            }

            // If no changes, just close
            if (!hasChanges) {
                onClose()
                return
            }

            const response = await apiCall("/me", {
                method: "PATCH",
                body: formData,
            })

            if (response.ok) {
                onSuccess()
                onClose()
            } else {
                console.error("Failed to update profile")
                alert("Failed to update profile")
            }
        } catch (error) {
            console.error("Error updating profile:", error)
            alert("Error updating profile")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload Section */}
                    <div className="flex flex-col items-center gap-4">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={previewImage || ""} />
                            <AvatarFallback className="text-2xl">{formDataState.first_name?.[0] || "U"}</AvatarFallback>
                        </Avatar>
                        <div className="flex gap-2">
                            <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                                <Upload className="w-4 h-4 mr-2" />
                                Upload Photo
                            </Button>
                            {previewImage && (
                                <Button type="button" variant="outline" size="sm" onClick={handleRemoveImage} className="text-destructive hover:text-destructive">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Remove
                                </Button>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                id="first_name"
                                name="first_name"
                                value={formDataState.first_name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input
                                id="last_name"
                                name="last_name"
                                value={formDataState.last_name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formDataState.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={formDataState.phone || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select value={formDataState.gender || ""} onValueChange={handleSelectChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MALE">Male</SelectItem>
                                    <SelectItem value="FEMALE">Female</SelectItem>
                                    <SelectItem value="OTHER">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">New Password (Optional)</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formDataState.password}
                                onChange={handleInputChange}
                                placeholder="Leave blank to keep current"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Update Profile
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
