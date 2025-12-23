"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft, Upload, X, ChevronDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { apiCall, getCookie } from "@/lib/auth-utils"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Buyer {
    id: number
    uid: string
    name: string
}

interface Note {
    id: number
    uid: string
    title: string
    description: string
}

interface Project {
    id: number
    uid: string
    name: string
}

interface UploadedImage {
    uid: string
    preview: string
}

export default function AddFilePage() {
    const { toast } = useToast()
    const router = useRouter()
    const searchParams = useSearchParams()
    const storageUid = searchParams.get("storage_uid")

    const [formData, setFormData] = useState({
        file_id: "",
        name: "",
        comments: "",
        buyer_uids: [] as string[],
        project_uids: [] as string[],
        note_uids: [] as string[],
    })

    const [buyers, setBuyers] = useState<Buyer[]>([])
    const [notes, setNotes] = useState<Note[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [buyersRes, notesRes, projectsRes] = await Promise.all([
                    apiCall("/sample_manager/buyer/"),
                    apiCall("/sample_manager/note/"),
                    apiCall("/sample_manager/project/"),
                ])

                if (buyersRes.ok) {
                    const buyersData = await buyersRes.json()
                    setBuyers(Array.isArray(buyersData) ? buyersData : buyersData.results || [])
                }
                if (notesRes.ok) {
                    const notesData = await notesRes.json()
                    setNotes(Array.isArray(notesData) ? notesData : notesData.results || [])
                }
                if (projectsRes.ok) {
                    const projectsData = await projectsRes.json()
                    setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
                }
            } catch (err) {
                console.error("Error fetching data:", err)
            }
        }
        fetchData()
    }, [])

    const compressImage = async (file: File): Promise<Blob> => {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                const img = new Image()
                img.src = e.target?.result as string
                img.onload = () => {
                    const canvas = document.createElement("canvas")
                    let width = img.width
                    let height = img.height
                    let quality = 0.9

                    // Initial check
                    if (width > 1920 || height > 1920) {
                        const maxDim = 1920
                        if (width > height) {
                            height = Math.round((height * maxDim) / width)
                            width = maxDim
                        } else {
                            width = Math.round((width * maxDim) / height)
                            height = maxDim
                        }
                    }

                    canvas.width = width
                    canvas.height = height
                    const ctx = canvas.getContext("2d")
                    ctx?.drawImage(img, 0, 0, width, height)

                    const compressRecursive = () => {
                        canvas.toBlob((blob) => {
                            if (blob && blob.size < 999000) {
                                resolve(blob)
                            } else if (quality > 0.1) {
                                quality -= 0.1
                                compressRecursive()
                            } else {
                                resolve(blob || new Blob())
                            }
                        }, "image/jpeg", quality)
                    }
                    compressRecursive()
                }
            }
        })
    }

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files
        if (!files) return

        setIsUploading(true)
        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                const compressedBlob = await compressImage(file)

                const uploadFormData = new FormData()
                uploadFormData.append("file", new File([compressedBlob], file.name, { type: "image/jpeg" }))

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/images/`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${getCookie("access_token")}`,
                    },
                    body: uploadFormData,
                })

                if (!response.ok) {
                    throw new Error("Failed to upload image")
                }

                const data = await response.json()
                const imagePreview = URL.createObjectURL(compressedBlob)

                setUploadedImages((prev) => [...prev, { uid: data.uid, preview: imagePreview }])
                const storedUids = localStorage.getItem("file_image_uids")
                const uids = storedUids ? JSON.parse(storedUids) : []
                localStorage.setItem("file_image_uids", JSON.stringify([...uids, data.uid]))
            }

            toast({
                title: "Success",
                description: `${files.length} image(s) uploaded successfully.`,
            })
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to upload images. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsUploading(false)
        }
    }

    const handleRemoveImage = (uid: string) => {
        setUploadedImages((prev) => prev.filter((img) => img.uid !== uid))
        const storedUids = localStorage.getItem("file_image_uids")
        if (storedUids) {
            const uids = JSON.parse(storedUids).filter((u: string) => u !== uid)
            localStorage.setItem("file_image_uids", JSON.stringify(uids))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (fieldErrors[name]) {
            setFieldErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }

    // Toggle Handlers required for DropdownMenu
    const handleBuyerToggle = (uid: string) => {
        setFormData((prev) => {
            const current = prev.buyer_uids
            const updated = current.includes(uid)
                ? current.filter((id) => id !== uid)
                : [...current, uid]
            return { ...prev, buyer_uids: updated }
        })
    }

    const handleProjectToggle = (uid: string) => {
        setFormData((prev) => {
            const current = prev.project_uids
            const updated = current.includes(uid)
                ? current.filter((id) => id !== uid)
                : [...current, uid]
            return { ...prev, project_uids: updated }
        })
    }

    const handleNoteToggle = (uid: string) => {
        setFormData((prev) => {
            const current = prev.note_uids
            const updated = current.includes(uid)
                ? current.filter((id) => id !== uid)
                : [...current, uid]
            return { ...prev, note_uids: updated }
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!storageUid) {
            toast({ title: "Error", description: "Storage UID is missing", variant: "destructive" })
            return
        }

        setFieldErrors({})
        setIsLoading(true)

        try {
            const storedImageUids = localStorage.getItem("file_image_uids")
            const imageUids = storedImageUids ? JSON.parse(storedImageUids) : []

            const submitData = {
                ...formData,
                image_uids: imageUids,
                storage_uid: storageUid,
            }

            const response = await apiCall(`/sample_manager/storage_file/${storageUid}`, {
                method: "POST",
                body: JSON.stringify(submitData),
            })

            const data = await response.json()

            if (!response.ok) {
                if (typeof data === "object" && !Array.isArray(data)) {
                    setFieldErrors(data)
                }
                toast({ title: "Error", description: "Failed to create file", variant: "destructive" })
                return
            }

            localStorage.removeItem("file_image_uids")
            toast({ title: "Success", description: "File created successfully" })

            if (storageUid) {
                router.push(`/drawers?parent_uid=${storageUid}`)
            } else {
                router.push("/drawers")
            }
        } catch (err) {
            toast({ title: "Error", description: "Failed to create file", variant: "destructive" })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6 sm:mb-8 flex items-center gap-3">
                    <Link href={`/drawers${storageUid ? `?parent_uid=${storageUid}` : ""}`}>
                        <button className="p-2 hover:bg-muted rounded-lg transition">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create New File</h1>
                        <p className="text-sm sm:text-base text-muted-foreground mt-2">Add a new file with details and images</p>
                    </div>
                </div>

                <Card className="border-border">
                    <CardHeader className="pb-3 sm:pb-4">
                        <CardTitle className="text-base sm:text-lg">File Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="File name"
                                        className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:border-transparent transition ${fieldErrors.name ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                                            }`}
                                    />
                                    {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name[0]}</p>}
                                </div>

                                {/* File ID */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">File ID</label>
                                    <input
                                        type="text"
                                        name="file_id"
                                        value={formData.file_id}
                                        onChange={handleChange}
                                        placeholder="File ID"
                                        className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:border-transparent transition ${fieldErrors.file_id ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                                            }`}
                                    />
                                    {fieldErrors.file_id && <p className="text-sm text-red-600 mt-1">{fieldErrors.file_id[0]}</p>}
                                </div>
                            </div>

                            {/* Comments */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Comments</label>
                                <textarea
                                    name="comments"
                                    value={formData.comments}
                                    onChange={handleChange}
                                    placeholder="Additional comments"
                                    className={`w-full px-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:border-transparent transition ${fieldErrors.comments ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                                        }`}
                                    rows={3}
                                />
                                {fieldErrors.comments && <p className="text-sm text-red-600 mt-1">{fieldErrors.comments[0]}</p>}
                            </div>

                            {/* Relationships (Snippet 1) */}
                            <div>
                                <h3 className="text-sm font-semibold text-foreground mb-4">Relationships</h3>
                                <div className="space-y-4">
                                    {/* Buyers Multi-Select */}
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-3">Buyers</label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button
                                                    type="button"
                                                    className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground text-left flex items-center justify-between hover:bg-muted/30 transition focus:outline-none focus:ring-2 focus:border-transparent ${fieldErrors.buyer_uids
                                                            ? "border-red-500 focus:ring-red-500"
                                                            : "border-border focus:ring-primary"
                                                        }`}
                                                >
                                                    <span
                                                        className={formData.buyer_uids.length > 0 ? "text-foreground" : "text-muted-foreground"}
                                                    >
                                                        {formData.buyer_uids.length > 0
                                                            ? `${formData.buyer_uids.length} buyer(s) selected`
                                                            : "Select buyers..."}
                                                    </span>
                                                    <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="w-full min-w-56">
                                                {buyers.length > 0 ? (
                                                    buyers.map((buyer) => (
                                                        <DropdownMenuCheckboxItem
                                                            key={buyer.uid}
                                                            checked={formData.buyer_uids.includes(buyer.uid)}
                                                            onCheckedChange={() => handleBuyerToggle(buyer.uid)}
                                                        >
                                                            {buyer.name}
                                                        </DropdownMenuCheckboxItem>
                                                    ))
                                                ) : (
                                                    <div className="p-2 text-sm text-muted-foreground">No buyers available</div>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Projects Multi-Select */}
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-3">Projects</label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button
                                                    type="button"
                                                    className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground text-left flex items-center justify-between hover:bg-muted/30 transition focus:outline-none focus:ring-2 focus:border-transparent ${fieldErrors.project_uids
                                                            ? "border-red-500 focus:ring-red-500"
                                                            : "border-border focus:ring-primary"
                                                        }`}
                                                >
                                                    <span
                                                        className={formData.project_uids.length > 0 ? "text-foreground" : "text-muted-foreground"}
                                                    >
                                                        {formData.project_uids.length > 0
                                                            ? `${formData.project_uids.length} project(s) selected`
                                                            : "Select projects..."}
                                                    </span>
                                                    <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="w-full min-w-56">
                                                {projects.length > 0 ? (
                                                    projects.map((project) => (
                                                        <DropdownMenuCheckboxItem
                                                            key={project.uid}
                                                            checked={formData.project_uids.includes(project.uid)}
                                                            onCheckedChange={() => handleProjectToggle(project.uid)}
                                                        >
                                                            {project.name}
                                                        </DropdownMenuCheckboxItem>
                                                    ))
                                                ) : (
                                                    <div className="p-2 text-sm text-muted-foreground">No projects available</div>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Notes Multi-Select */}
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-3">Notes</label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button
                                                    type="button"
                                                    className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-card text-foreground text-left flex items-center justify-between hover:bg-muted/30 transition focus:outline-none focus:ring-2 focus:border-transparent ${fieldErrors.note_uids
                                                            ? "border-red-500 focus:ring-red-500"
                                                            : "border-border focus:ring-primary"
                                                        }`}
                                                >
                                                    <span className={formData.note_uids.length > 0 ? "text-foreground" : "text-muted-foreground"}>
                                                        {formData.note_uids.length > 0
                                                            ? `${formData.note_uids.length} note(s) selected`
                                                            : "Select notes..."}
                                                    </span>
                                                    <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="w-full min-w-56">
                                                {notes.length > 0 ? (
                                                    notes.map((note) => (
                                                        <DropdownMenuCheckboxItem
                                                            key={note.uid}
                                                            checked={formData.note_uids.includes(note.uid)}
                                                            onCheckedChange={() => handleNoteToggle(note.uid)}
                                                        >
                                                            {note.title}
                                                        </DropdownMenuCheckboxItem>
                                                    ))
                                                ) : (
                                                    <div className="p-2 text-sm text-muted-foreground">No notes available</div>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>


                            {/* Image Upload Section (Snippet 2) */}
                            <div>
                                <h3 className="text-sm font-semibold text-foreground mb-4">Images</h3>
                                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center mb-4">
                                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground mb-4">Drag and drop images here or click to select</p>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        disabled={isUploading}
                                        className="hidden"
                                        id="image-input"
                                    />
                                    <label htmlFor="image-input">
                                        <Button
                                            type="button"
                                            disabled={isUploading}
                                            className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
                                            asChild
                                        >
                                            <span>{isUploading ? "Uploading..." : "Select Images"}</span>
                                        </Button>
                                    </label>
                                    {/* <p className="text-xs text-muted-foreground mt-2">Images will be auto-compressed to under 999KB</p> */}
                                </div>

                                {uploadedImages.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium text-foreground mb-3">
                                            Uploaded Images ({uploadedImages.length})
                                        </p>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {uploadedImages.map((img) => (
                                                <div key={img.uid} className="relative group">
                                                    {img.preview ? (
                                                        <img
                                                            src={img.preview || "/placeholder.svg"}
                                                            alt="preview"
                                                            className="w-full h-32 object-fixed rounded-lg border border-border"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-32 bg-muted rounded-lg border border-border flex items-center justify-center">
                                                            <span className="text-xs text-muted-foreground">Loading...</span>
                                                        </div>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveImage(img.uid)}
                                                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-100 group-hover:opacity-100 transition"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
                                <Button type="submit" disabled={isLoading} className="flex-1 bg-primary hover:bg-primary/90 text-white">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        "Create File"
                                    )}
                                </Button>
                                <Link href={`/drawers${storageUid ? `?parent_uid=${storageUid}` : ""}`} className="flex-1">
                                    <Button type="button" variant="outline" className="w-full bg-transparent">
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
