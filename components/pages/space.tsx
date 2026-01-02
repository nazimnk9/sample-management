"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit2, FolderOpen, ChevronLeft, ChevronRight, X, Loader2, MoreVertical, Upload, RectangleHorizontal, Search, Folder } from "lucide-react"

import { useToast } from "@/hooks/use-toast"
import { apiCall, getCookie } from "@/lib/auth-utils"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Filter, Eye } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Space {
    id: number
    uid: string
    name: string
    description: string
    image: string | null
    status: string
    type: string
    company: number
    created_by: number
    parent: string | null
}

interface Sample {
    id: number
    uid: string
    name: string
    description: string
    image: string | null
    storage_uid: string
    storage?: {
        uid: string
        name: string
        type: string
    }
    images?: Array<{ id: number; uid: string; file: string }>
}

interface Buyer {
    id: number
    uid: string
    name: string
}

interface Project {
    id: number
    uid: string
    name: string
}

interface Note {
    id: number
    uid: string
    title: string
}

interface ImageUploadModalProps {
    isOpen: boolean
    onClose: () => void
    existingImages: Array<{ uid: string; file: string }>
    onImagesUpload: (uids: string[]) => void
}

function SampleImageUploadModal({ isOpen, onClose, existingImages, onImagesUpload }: ImageUploadModalProps) {
    const { toast } = useToast()
    const [uploadedImages, setUploadedImages] = useState<Array<{ uid: string; preview: string; isNew: boolean }>>([])
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        if (isOpen) {
            const existingPreview = existingImages.map((img) => ({
                uid: img.uid,
                preview: img.file,
                isNew: false,
            }))
            setUploadedImages(existingPreview)
        }
    }, [isOpen, existingImages])

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

                    while (
                        (canvas.toBlob((blob) => { }, "image/jpeg", quality),
                            canvas.toDataURL("image/jpeg", quality).length / 1024 > 999) &&
                        quality > 0.1
                    ) {
                        quality -= 0.1
                    }

                    if (img.width > 1920 || img.height > 1920) {
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

                    canvas.toBlob(
                        (blob) => {
                            if (blob) resolve(blob)
                        },
                        "image/jpeg",
                        quality,
                    )
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

                const formData = new FormData()
                formData.append("file", new File([compressedBlob], file.name, { type: "image/jpeg" }))

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/images/`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${getCookie("access_token")}`,
                    },
                    body: formData,
                })

                if (!response.ok) {
                    throw new Error("Failed to upload image")
                }

                const data = await response.json()
                const imagePreview = URL.createObjectURL(compressedBlob)

                setUploadedImages((prev) => [...prev, { uid: data.uid, preview: imagePreview, isNew: true }])
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
    }

    const handleConfirm = () => {
        const allImageUids = uploadedImages.map((img) => img.uid)
        if (allImageUids.length > 0) {
            onImagesUpload(allImageUids)
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-foreground">Manage Sample Images</h2>
                        <button onClick={onClose} className="p-1 hover:bg-muted rounded">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="border-2 border-dashed border-border rounded-lg p-6 mb-6 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-4">Add more images or click to select</p>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileSelect}
                            disabled={isUploading}
                            className="hidden"
                            id="sample-image-input-update"
                        />
                        <label htmlFor="sample-image-input-update">
                            <Button
                                asChild
                                disabled={isUploading}
                                className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
                            >
                                <span>{isUploading ? "Uploading..." : "Select Images"}</span>
                            </Button>
                        </label>
                        {/* <p className="text-xs text-muted-foreground mt-2">Images will be auto-compressed to under 999KB</p> */}
                    </div>

                    {uploadedImages.length > 0 && (
                        <div>
                            <p className="text-sm font-medium text-foreground mb-3">Images ({uploadedImages.length})</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                                {uploadedImages.map((img) => (
                                    <div key={img.uid} className="relative group">
                                        <img
                                            src={img.preview || "/placeholder.svg"}
                                            alt="preview"
                                            className="w-full h-32 object-cover rounded-lg border border-border"
                                        />
                                        <button
                                            onClick={() => handleRemoveImage(img.uid)}
                                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-100 group-hover:opacity-100 transition"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button onClick={handleConfirm} className="flex-1 bg-primary hover:bg-primary/90 text-white">
                                    Confirm Images
                                </Button>
                                <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default function SpacePage() {
    const { toast } = useToast()
    const router = useRouter()
    const searchParams = useSearchParams()

    // Read currentParentUid from URL parameters
    const urlCurrentParentUid = searchParams.get("currentParentUid")

    const [spaces, setSpaces] = useState<Space[]>([])
    const [spacePreviewModal, setSpacePreviewModal] = useState(false)
    const [previewSpace, setPreviewSpace] = useState<Space | null>(null)
    const [previewLoading, setPreviewLoading] = useState(false)

    const handlePreviewClick = async (space: Space, e: React.MouseEvent) => {
        e.stopPropagation()
        setPreviewLoading(true)
        setSpacePreviewModal(true)
        try {
            const response = await apiCall(`/sample_manager/storage/${space.uid}`)
            if (response.ok) {
                const data = await response.json()
                setPreviewSpace(data)
            } else {
                toast({ title: "Error", description: "Failed to load space details", variant: "destructive" })
                setSpacePreviewModal(false)
            }
        } catch (err) {
            toast({ title: "Error", description: "Failed to load space details", variant: "destructive" })
            setSpacePreviewModal(false)
        } finally {
            setPreviewLoading(false)
        }
    }
    const [samples, setSamples] = useState<Sample[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [parentStack, setParentStack] = useState<Array<{ uid: string; name: string }>>([])
    const [currentParentUid, setCurrentParentUid] = useState<string | null>(urlCurrentParentUid)

    // Modals
    const [editModal, setEditModal] = useState(false)
    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
    const [sampleEditModal, setSampleEditModal] = useState(false)
    const [sampleDeleteConfirmModal, setSampleDeleteConfirmModal] = useState(false)
    const [imageUploadOpen, setImageUploadOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState<string | null>(null)
    const [sampleMenuOpen, setSampleMenuOpen] = useState<string | null>(null)
    const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
    const [selectedSample, setSelectedSample] = useState<Sample | null>(null)
    const [sampleDetailsModal, setSampleDetailsModal] = useState(false)
    const [sampleDetails, setSampleDetails] = useState<any>(null)
    const [sampleDetailsLoading, setSampleDetailsLoading] = useState(false)
    const [isFiltered, setIsFiltered] = useState(false)

    // Search specific state
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<{ spaces: Space[]; samples: Sample[] }>({ spaces: [], samples: [] })
    const [isSearchLoading, setIsSearchLoading] = useState(false)
    const [showSearchDropdown, setShowSearchDropdown] = useState(false)
    const searchContainerRef = useRef<HTMLDivElement>(null)

    // Handle click outside to close search dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setShowSearchDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Edit form
    const [editFormData, setEditFormData] = useState({ name: "", description: "" })
    const [editImage, setEditImage] = useState<File | null>(null)
    const [editImagePreview, setEditImagePreview] = useState<string>("")
    const [isSaving, setIsSaving] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    // Sample edit
    const [sampleEditData, setSampleEditData] = useState<any>(null)
    const [sampleEditImages, setSampleEditImages] = useState<any[]>([])
    const [sampleIsSaving, setSampleIsSaving] = useState(false)
    const [sampleIsDeleting, setSampleIsDeleting] = useState(false)
    const [sampleEditLoading, setSampleEditLoading] = useState(false)

    // Sample data
    const [buyers, setBuyers] = useState<Buyer[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [notes, setNotes] = useState<Note[]>([])

    // Filter State
    const [weightRange, setWeightRange] = useState<[number, number]>([0, 2000])
    const [ageRange, setAgeRange] = useState<[number, number]>([0, 100])
    const [sizeRangeTypes, setSizeRangeTypes] = useState<string[]>([])
    const [letterRangeMin, setLetterRangeMin] = useState<string>("")
    const [letterRangeMax, setLetterRangeMax] = useState<string>("")
    const [ageRangeYear, setAgeRangeYear] = useState<[number, number]>([1, 100])
    const [ageRangeMonth, setAgeRangeMonth] = useState<[number, number]>([1, 12])
    const [selectedColor, setSelectedColor] = useState<string>("")
    const [sampleType, setSampleType] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [subCategory, setSubCategory] = useState<string>("")
    const [selectedBuyer, setSelectedBuyer] = useState<string>("")
    const [selectedProject, setSelectedProject] = useState<string>("")
    const [ordering, setOrdering] = useState<string>("")
    const [filterSheetOpen, setFilterSheetOpen] = useState(false)

    // Build parent stack when currentParentUid is set from URL
    useEffect(() => {
        const buildParentStack = async () => {
            if (urlCurrentParentUid && parentStack.length === 1) {
                try {
                    // Fetch the current space details to build the parent stack
                    const response = await apiCall(`/sample_manager/storage/${urlCurrentParentUid}`)
                    if (response.ok) {
                        const spaceData = await response.json()
                        // For simplicity, just add this space to the stack
                        // In a real implementation, you'd want to fetch the full hierarchy
                        setParentStack([{ uid: spaceData.uid, name: spaceData.name }])
                    }
                } catch (err) {
                    console.error("Error building parent stack:", err)
                }
            }
        }

        buildParentStack()
    }, [urlCurrentParentUid, parentStack.length])

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery.trim()) {
                setIsSearchLoading(true)
                try {
                    const [spacesRes, samplesRes] = await Promise.all([
                        apiCall(`/sample_manager/storage/?type=SPACE&search=${searchQuery}`),
                        apiCall(`/sample_manager/sample/?search=${searchQuery}`)
                    ])

                    const spacesData = spacesRes.ok ? await spacesRes.json() : []
                    const samplesData = samplesRes.ok ? await samplesRes.json() : []

                    setSearchResults({
                        spaces: Array.isArray(spacesData) ? spacesData : spacesData.results || [],
                        samples: Array.isArray(samplesData) ? samplesData : samplesData.results || []
                    })
                } catch (error) {
                    console.error("Search error:", error)
                } finally {
                    setIsSearchLoading(false)
                }
            } else {
                setSearchResults({ spaces: [], samples: [] })
            }
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchQuery])

    useEffect(() => {
        fetchSpacesAndSamples()
        fetchDropdownData()
    }, [currentParentUid])

    const fetchDropdownData = async () => {
        try {
            const [buyersRes, projectsRes, notesRes] = await Promise.all([
                apiCall("/sample_manager/buyer/"),
                apiCall("/sample_manager/project/"),
                apiCall("/sample_manager/note/"),
            ])

            if (buyersRes.ok) {
                const buyersData = await buyersRes.json()
                setBuyers(Array.isArray(buyersData) ? buyersData : buyersData.results || [])
            }

            if (projectsRes.ok) {
                const projectsData = await projectsRes.json()
                setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || [])
            }

            if (notesRes.ok) {
                const notesData = await notesRes.json()
                setNotes(Array.isArray(notesData) ? notesData : notesData.results || [])
            }
        } catch (err) {
            console.error("Error fetching dropdown data:", err)
        }
    }

    const fetchSpacesAndSamples = async () => {
        setIsFiltered(false)
        setIsLoading(true)
        try {
            const spacesUrl = currentParentUid
                ? `/sample_manager/storage/?type=SPACE&parent_uid=${currentParentUid}`
                : `/sample_manager/storage/?type=SPACE`

            const spacesResponse = await apiCall(spacesUrl)
            if (spacesResponse.ok) {
                const spacesData = await spacesResponse.json()
                setSpaces(Array.isArray(spacesData) ? spacesData : spacesData.results || [])
            }

            if (currentParentUid) {
                const samplesResponse = await apiCall(`/sample_manager/sample/${currentParentUid}`)
                if (samplesResponse.ok) {
                    const samplesData = await samplesResponse.json()
                    setSamples(Array.isArray(samplesData) ? samplesData : samplesData.results || [])
                }
            } else {
                setSamples([]) // Clear samples if not in a specific space
            }
        } catch (err) {
            console.error("Error fetching data:", err)
            toast({
                title: "Error",
                description: "Failed to fetch spaces and samples",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleSearchSampleClick = async (sample: Sample) => {
        setSampleDetailsLoading(true)
        try {
            const response = await apiCall(`/sample_manager/sample/search/${sample.uid}`)
            if (response.ok) {
                const data = await response.json()
                setSampleDetails(data)
                setSampleDetailsModal(true)
            } else {
                toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
            }
        } catch (err) {
            toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
        } finally {
            setSampleDetailsLoading(false)
        }
    }

    const handleSpaceCardClick = (space: Space) => {
        setParentStack([...parentStack, { uid: space.uid, name: space.name }])
        setCurrentParentUid(space.uid)
        // Update URL to maintain the current state
        const newUrl = `/space?currentParentUid=${space.uid}`
        router.push(newUrl)
    }

    const handleBackClick = () => {
        if (parentStack.length > 0) {
            const newStack = parentStack.slice(0, -1)
            setParentStack(newStack)
            const newParentUid = newStack.length > 0 ? newStack[newStack.length - 1].uid : null
            setCurrentParentUid(newParentUid)
            setSamples([])

            // Update URL to reflect the new state
            const newUrl = newParentUid ? `/space?currentParentUid=${newParentUid}` : '/space'
            router.push(newUrl)
        }
    }

    const handleEditClick = async (space: Space) => {
        setSelectedSpace(space)
        try {
            const response = await apiCall(`/sample_manager/storage/${space.uid}`)
            if (response.ok) {
                const data = await response.json()
                setEditFormData({ name: data.name, description: data.description })
                if (data.image) {
                    setEditImagePreview(data.image)
                }
            }
        } catch (err) {
            toast({ title: "Error", description: "Failed to load space details", variant: "destructive" })
        }
        setEditModal(true)
        setMenuOpen(null)
    }

    const handleSaveEdit = async () => {
        if (!selectedSpace || !editFormData.name) return
        setIsSaving(true)

        try {
            const formData = new FormData()
            formData.append("name", editFormData.name)
            formData.append("description", editFormData.description)
            formData.append("type", "SPACE")
            if (editImage) {
                formData.append("image", editImage)
            }
            if (currentParentUid) {
                formData.append("parent_uid", currentParentUid)
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sample_manager/storage/${selectedSpace.uid}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${getCookie("access_token")}`,
                },
                body: formData,
            })

            if (!response.ok) {
                throw new Error("Failed to update space")
            }

            const data = await response.json()

            toast({ title: "Success", description: "Space updated successfully" })
            setEditModal(false)
            setEditImage(null)
            setEditImagePreview("")
            fetchSpacesAndSamples()
        } catch (err) {
            toast({ title: "Error", description: "Failed to update space", variant: "destructive" })
        } finally {
            setIsSaving(false)
        }
    }

    const handleDeleteClick = (space: Space) => {
        setSelectedSpace(space)
        setDeleteConfirmModal(true)
        setMenuOpen(null)
    }

    const handleConfirmDelete = async () => {
        if (!selectedSpace) return
        setIsDeleting(true)

        try {
            const response = await apiCall(`/sample_manager/storage/${selectedSpace.uid}`, { method: "DELETE" })

            if (!response.ok) {
                throw new Error("Failed to delete space")
            }

            toast({ title: "Success", description: "Space deleted successfully" })
            setDeleteConfirmModal(false)
            fetchSpacesAndSamples()
        } catch (err) {
            toast({ title: "Error", description: "Failed to delete space", variant: "destructive" })
        } finally {
            setIsDeleting(false)
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setEditImage(file)
            const reader = new FileReader()
            reader.onload = (e) => setEditImagePreview(e.target?.result as string)
            reader.readAsDataURL(file)
        }
    }

    const handleSampleEditClick = async (sample: Sample) => {
        setSelectedSample(sample)
        setSampleEditLoading(true)

        // Determine the correct storage UID:
        // 1. sample.storage.uid (from filter API)
        // 2. sample.storage_uid (flat field)
        // 3. currentParentUid (context)
        const storageUid = sample.storage?.uid || sample.storage_uid || currentParentUid

        if (!storageUid) {
            toast({ title: "Error", description: "Could not determine storage location for this sample", variant: "destructive" })
            setSampleEditLoading(false)
            return
        }

        try {
            const response = await apiCall(`/sample_manager/sample/${storageUid}/${sample.uid}`)
            if (response.ok) {
                const data = await response.json()
                setSampleEditData(data)
                setSampleEditImages(data.images || [])
            } else {
                throw new Error("Failed to load")
            }
        } catch (err) {
            toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
        } finally {
            setSampleEditLoading(false)
        }
        setSampleEditModal(true)
        setSampleMenuOpen(null)
    }

    const handleSampleSaveEdit = async () => {
        if (!selectedSample || !sampleEditData) return

        const storageUid = selectedSample.storage?.uid || selectedSample.storage_uid || currentParentUid
        if (!storageUid) {
            toast({ title: "Error", description: "Missing storage information", variant: "destructive" })
            return
        }

        setSampleIsSaving(true)

        try {
            const submitData: any = {
                arrival_date: sampleEditData.arrival_date,
                style_no: sampleEditData.style_no,
                sku_no: sampleEditData.sku_no,
                item: sampleEditData.item,
                fabrication: sampleEditData.fabrication,
                weight: sampleEditData.weight,
                weight_type: sampleEditData.weight_type,
                size_range_type: sampleEditData.size_range_type,
                types: sampleEditData.types,
                category: sampleEditData.category,
                sub_category: sampleEditData.sub_category,
                color: sampleEditData.color,
                //size_range: sampleEditData.size_range,
                comments: sampleEditData.comments,
                name: sampleEditData.name,
                description: sampleEditData.description,
                image_uids: sampleEditImages.map((img) => img.uid),
                buyer_uids: sampleEditData.buyers?.map((b: any) => b.uid) || [],
                project_uids: sampleEditData.projects?.map((p: any) => p.uid) || [],
                note_uids: sampleEditData.notes?.map((n: any) => n.uid) || [],
                storage_uid: storageUid,
            }

            if (sampleEditData.size_range_type === "LETTER_RANGE") {
                submitData.letter_range_min = Number(sampleEditData.letter_range_min)
                submitData.letter_range_max = Number(sampleEditData.letter_range_max)
            } else if (sampleEditData.size_range_type === "AGE_RANGE_YEAR") {
                submitData.age_range_year_min = sampleEditData.age_range_year_min
                submitData.age_range_year_max = sampleEditData.age_range_year_max
            } else if (sampleEditData.size_range_type === "AGE_RANGE_MONTH") {
                submitData.age_range_month_min = sampleEditData.age_range_month_min
                submitData.age_range_month_max = sampleEditData.age_range_month_max
            }

            const response = await apiCall(`/sample_manager/sample/${storageUid}/${selectedSample.uid}`, {
                method: "PUT",
                body: JSON.stringify(submitData),
            })

            if (!response.ok) {
                throw new Error("Failed to update sample")
            }

            toast({ title: "Success", description: "Sample updated successfully" })
            setSampleEditModal(false)

            // Refresh logic: if filtered/search is active, refresh that; otherwise refresh current space
            if (isFiltered || searchQuery) {
                if (isFiltered) {
                    handleFilterSearch()
                } else if (searchQuery) {
                    // Re-trigger search
                    const event = { key: "Enter" } as React.KeyboardEvent<HTMLInputElement>
                    handleSearchKeyDown(event)
                }
            } else {
                fetchSpacesAndSamples()
            }

        } catch (err) {
            toast({ title: "Error", description: "Failed to update sample", variant: "destructive" })
        } finally {
            setSampleIsSaving(false)
        }
    }

    const handleSampleDeleteClick = (sample: Sample) => {
        setSelectedSample(sample)
        setSampleDeleteConfirmModal(true)
        setSampleMenuOpen(null)
    }

    const handleSampleConfirmDelete = async () => {
        if (!selectedSample) return

        const storageUid = selectedSample.storage?.uid || selectedSample.storage_uid || currentParentUid
        if (!storageUid) {
            toast({ title: "Error", description: "Missing storage information", variant: "destructive" })
            return
        }

        setSampleIsDeleting(true)

        try {
            const response = await apiCall(`/sample_manager/sample/${storageUid}/${selectedSample.uid}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error("Failed to delete sample")
            }

            toast({ title: "Success", description: "Sample deleted successfully" })
            setSampleDeleteConfirmModal(false)

            // Refresh logic
            if (isFiltered || searchQuery) {
                if (isFiltered) {
                    handleFilterSearch()
                } else if (searchQuery) {
                    // Re-trigger search manually for now
                    // Ideally we extract search logic to a reusable function
                    // For now triggering via enter key simulation is tricky, let's copy the logic or ensure effect triggers
                    // Actually simpler: 
                    const [spacesRes, samplesRes] = await Promise.all([
                        apiCall(`/sample_manager/storage/?type=SPACE&search=${searchQuery}`),
                        apiCall(`/sample_manager/sample/?search=${searchQuery}`)
                    ])
                    if (samplesRes.ok) {
                        const samplesData = await samplesRes.json()
                        setSearchResults(prev => ({
                            ...prev,
                            samples: Array.isArray(samplesData) ? samplesData : samplesData.results || []
                        }))
                        // Also update main samples list if we are showing search results
                        setSamples(Array.isArray(samplesData) ? samplesData : samplesData.results || [])
                    }
                }
            } else {
                fetchSpacesAndSamples()
            }
        } catch (err) {
            toast({ title: "Error", description: "Failed to delete sample", variant: "destructive" })
        } finally {
            setSampleIsDeleting(false)
        }
    }

    const handleSampleImageRemove = (imageUid: string) => {
        setSampleEditImages((prev) => prev.filter((img) => img.uid !== imageUid))
    }

    const handleSampleImagesUpload = (uids: string[]) => {
        const newImages = uids.map((uid) => {
            const existingImage = sampleEditImages.find((img) => img.uid === uid)
            return existingImage || { uid, file: "" }
        })
        setSampleEditImages(newImages)
    }

    const handleSampleDetailsClick = async (sample: Sample) => {
        if (isFiltered) {
            return handleSearchSampleClick(sample)
        }
        setSampleDetailsLoading(true)
        try {
            const response = await apiCall(`/sample_manager/sample/${currentParentUid}/${sample.uid}`)
            if (response.ok) {
                const data = await response.json()
                setSampleDetails(data)
            } else {
                toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
            }
        } catch (err) {
            toast({ title: "Error", description: "Failed to load sample details", variant: "destructive" })
        } finally {
            setSampleDetailsLoading(false)
            setSampleDetailsModal(true)
        }
    }

    // Image Viewer State and Handlers
    const [imageViewOpen, setImageViewOpen] = useState(false)
    const [viewImages, setViewImages] = useState<any[]>([])
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const handleImageClick = (index: number, images: any[]) => {
        setViewImages(images)
        setCurrentImageIndex(index)
        setImageViewOpen(true)
    }

    const handleCloseImageViewer = () => {
        setImageViewOpen(false)
        setViewImages([])
        setCurrentImageIndex(0)
    }

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % viewImages.length)
    }

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + viewImages.length) % viewImages.length)
    }

    const FILTER_COLORS = ["AOP", "ARMY", "AVIO", "BLACK", "BLUE", "BROWN", "CAMEL", "CHARCOAL", "CREAM", "DENIM", "GOLD", "GREY", "GREEN", "KHAKI", "MULTI", "NAVY", "OFF WHITE", "OLIVE", "ORANGE", "PINK", "PURPLE", "RED", "ROSE", "RUST", "SILVER", "STONE", "TAN", "TAUPE", "TEAL", "WHITE", "YELLOW"]
    const FILTER_TYPES = ["DEVELOPMENT", "SALESMAN", "STYLING", "TOP OF PRODUCTION", "PRE-PRODUCTION", "SMS", "VINTAGE"]
    const FILTER_CATEGORIES = ["CIRCULAR_KNIT", "FLAT_KNIT", "WOVEN"]
    const FILTER_SUB_CATEGORIES = ["MENS", "JR_LADIES", "WOMEN", "JUNIOR_BOYS", "SENIOR_BOYS", "TODDLER_BOYS", "JUNIOR_GIRLS", "SENIOR_GIRLS", "TODDLER_GIRLS", "KIDS"]
    const LETTER_SIZES = ["XS", "S", "M", "L", "XL", "XXL"]

    const LETTER_SIZES_MAPPING = [
        { label: "XXS", value: 1 },
        { label: "XS", value: 2 },
        { label: "S", value: 3 },
        { label: "M", value: 4 },
        { label: "L", value: 5 },
        { label: "XL", value: 6 },
        { label: "XXL", value: 7 },
        { label: "2XL", value: 8 },
        { label: "3XL", value: 9 },
        { label: "4XL", value: 10 },
        { label: "5XL", value: 11 },
    ]

    // Sort options as per user request
    const SORT_OPTIONS = [
        { label: "Color for ASC", value: "color" },
        { label: "Color for DSC", value: "-color" },
        { label: "Arrival Date for ASC", value: "arrival_date" },
        { label: "Arrival Date for DSC", value: "-arrival_date" },
        { label: "Name for ASC", value: "name" },
        { label: "Name for DSC", value: "-name" },
    ]

    const LETTER_VALUE_TO_LABEL: { [key: number]: string } = {
        1: "XXS",
        2: "XS",
        3: "S",
        4: "M",
        5: "L",
        6: "XL",
        7: "XXL",
        8: "2XL",
        9: "3XL",
        10: "4XL",
        11: "5XL"
    }

    const getLetterSizeLabel = (val: any) => {
        if (!val) return ""
        const numericVal = Number(val)
        if (!isNaN(numericVal) && LETTER_VALUE_TO_LABEL[numericVal]) {
            return LETTER_VALUE_TO_LABEL[numericVal]
        }
        return val
    }

    const handleFilterSearch = async () => {
        setIsLoading(true)
        try {
            const params = new URLSearchParams()
            // Always constrain by weight if modified from defaults (or just send them)
            // User requirement: "Two-Point Range Slider... weight_min, weight_max parameters"
            params.append("weight_min", weightRange[0].toString())
            params.append("weight_max", weightRange[1].toString())
            params.append("age_range_min", ageRange[0].toString())
            params.append("age_range_max", ageRange[1].toString())

            // Size Range Types logic
            if (sizeRangeTypes.length > 0) {
                sizeRangeTypes.forEach(type => {
                    params.append("size_range_type", type)
                })
            }

            if (sizeRangeTypes.includes("LETTER_RANGE")) {
                if (letterRangeMin) params.append("letter_range_min", letterRangeMin)
                if (letterRangeMax) params.append("letter_range_max", letterRangeMax)
            }

            if (sizeRangeTypes.includes("AGE_RANGE_YEAR")) {
                params.append("age_range_year_min", ageRangeYear[0].toString())
                params.append("age_range_year_max", ageRangeYear[1].toString())
            }

            if (sizeRangeTypes.includes("AGE_RANGE_MONTH")) {
                params.append("age_range_month_min", ageRangeMonth[0].toString())
                params.append("age_range_month_max", ageRangeMonth[1].toString())
            }

            if (selectedColor && selectedColor !== "all") params.append("color", selectedColor)
            if (sampleType && sampleType !== "all") params.append("types", sampleType)
            if (category && category !== "all") params.append("category", category)
            if (subCategory && subCategory !== "all") params.append("sub_category", subCategory)
            if (selectedBuyer && selectedBuyer !== "all") params.append("buyer", selectedBuyer)
            if (selectedProject && selectedProject !== "all") params.append("project", selectedProject)
            if (ordering) params.append("ordering", ordering)

            const response = await apiCall(`/sample_manager/sample/?${params.toString()}`)
            if (response.ok) {
                const data = await response.json()
                setSamples(Array.isArray(data) ? data : data.results || [])
                setIsFiltered(true)
            }
        } catch (error) {
            console.error("Filter search error:", error)
            toast({ title: "Error", description: "Failed to filter samples", variant: "destructive" })
        } finally {
            setIsLoading(false)
            setFilterSheetOpen(false)
        }
    }

    const handleReset = () => {
        setSearchQuery("")
        setOrdering("")
        setWeightRange([0, 2000])
        setAgeRange([0, 100])
        setSizeRangeTypes([])
        setLetterRangeMin("")
        setLetterRangeMax("")
        setAgeRangeYear([1, 100])
        setAgeRangeMonth([1, 12])
        setSelectedColor("")
        setSampleType("")
        setCategory("")
        setSubCategory("")
        setSelectedBuyer("")
        setSelectedProject("")
        setIsFiltered(false)

        setTimeout(() => {
            fetchSpacesAndSamples()
        }, 0)
    }

    // Trigger search when ordering changes
    useEffect(() => {
        if (ordering) {
            handleFilterSearch()
        }
    }, [ordering])

    const getBreadcrumbText = () => {
        if (parentStack.length === 0) return "Storage Spaces"
        return parentStack.map((item) => item.name).join(" / ")
    }

    const handleSearchKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setShowSearchDropdown(false)
            setIsLoading(true)
            try {
                const [spacesRes, samplesRes] = await Promise.all([
                    apiCall(`/sample_manager/storage/?type=SPACE&search=${searchQuery}`),
                    apiCall(`/sample_manager/sample/?search=${searchQuery}`)
                ])

                if (spacesRes.ok) {
                    const spacesData = await spacesRes.json()
                    setSpaces(Array.isArray(spacesData) ? spacesData : spacesData.results || [])
                }

                if (samplesRes.ok) {
                    const samplesData = await samplesRes.json()
                    setSamples(Array.isArray(samplesData) ? samplesData : samplesData.results || [])
                    setIsFiltered(true)
                }
            } catch (error) {
                console.error("Search on Enter error:", error)
                toast({ title: "Error", description: "Failed to fetch search results", variant: "destructive" })
            } finally {
                setIsLoading(false)
            }
        }
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen w-full overflow-y-auto">
            <div className="mb-6 sm:mb-8 flex items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    {parentStack.length > 0 && (
                        <button onClick={handleBackClick} className="p-2 hover:bg-muted rounded-lg transition">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    )}
                    {/* <div>
            {/* <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {parentStack.length > 0 ? parentStack[parentStack.length - 1].name : "Storage Spaces"}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {parentStack.length > 0 && `Path: ${getBreadcrumbPath()}`}
            </p>

            <span className="cursor-pointer hover:text-foreground" onClick={() => setCurrentParentUid(null)}>
          Storage Spaces
        </span>
        {parentStack.map((space, index) => (
          <div key={space.uid} className="flex items-center gap-2">
            <span>/</span>
            <span
              className="cursor-pointer hover:text-foreground"
              onClick={() => {
                const newStack = parentStack.slice(0, index + 1)
                setParentStack(newStack)
                setCurrentParentUid(newStack[newStack.length - 1].uid)
              }}
            >
              {space.name}
            </span>
          </div>
        ))}
            <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage your storage spaces and samples</p>
          </div> */}
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                            {getBreadcrumbText()}
                        </h1>
                        <p className="text-sm sm:text-base text-muted-foreground mt-2">
                            {parentStack.length > 0
                                ? "Manage spaces and samples in this location"
                                : "Manage your storage spaces and samples"}
                        </p>
                        {parentStack.length > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                                Path: {parentStack.map((item) => item.name).join(" > ")}
                            </p>
                        )}
                    </div>
                </div>

                {/* Add Buttons */}
                <div className="flex flex-row gap-2 mb-2 sm:mb-4">
                    <Link href={`/space/add${currentParentUid ? `?parent_uid=${currentParentUid}` : ""}`}>
                        <Button className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2">
                            <Plus className="w-4 h-4" />
                            Add Space
                        </Button>
                    </Link>
                    {currentParentUid && (
                        <Link href={`/sample/add?storage_uid=${currentParentUid}`}>
                            <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent">
                                <Plus className="w-4 h-4" />
                                Add Sample
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Global Search Option */}
            {/* Global Search & Filter */}
            <div className="flex flex-col lg:flex-row items-center flex-1 justify-start gap-3 w-full mb-6 sm:mb-8">
                <div className="relative w-full lg:w-[600px]" ref={searchContainerRef}>
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        placeholder="Search spaces & samples..."
                        value={searchQuery}
                        onKeyDown={handleSearchKeyDown}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            if (e.target.value) setShowSearchDropdown(true)
                        }}
                        onFocus={() => {
                            if (searchQuery) setShowSearchDropdown(true)
                        }}
                        className="pl-8 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />

                    {/* Search Filter List Dropdown */}
                    {showSearchDropdown && searchQuery && (
                        <div className="absolute top-10 right-0 w-full z-50 bg-card border border-border rounded-lg shadow-xl overflow-hidden max-h-[80vh] overflow-y-auto">
                            {isSearchLoading ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                </div>
                            ) : (
                                <div className="flex flex-row divide-x border-border">
                                    {/* Left Side: Spaces */}
                                    <div className="flex-1 p-1.5 lg:p-4">
                                        <h3 className="text-[10px] lg:text-sm font-semibold mb-1.5 lg:mb-3 text-muted-foreground uppercase">Spaces</h3>
                                        <div className="space-y-1">
                                            {searchResults.spaces.map((space) => (
                                                <div
                                                    key={space.uid}
                                                    onClick={() => {
                                                        handleSpaceCardClick(space)
                                                        setSearchQuery("")
                                                    }}
                                                    className="p-1 lg:p-2 rounded hover:bg-muted cursor-pointer flex items-center gap-1.5 lg:gap-2 transition-colors"
                                                >
                                                    <FolderOpen className="w-3 h-3 lg:w-4 lg:h-4 text-primary flex-shrink-0" />
                                                    <span className="text-[10px] lg:text-sm font-medium">{space.name}</span>
                                                </div>
                                            ))}
                                            {searchResults.spaces.length === 0 && (
                                                <p className="text-[10px] lg:text-xs text-muted-foreground">No spaces found</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right Side: Samples */}
                                    <div className="flex-1 p-1.5 lg:p-4 bg-muted/10">
                                        <h3 className="text-[10px] lg:text-sm font-semibold mb-1.5 lg:mb-3 text-muted-foreground uppercase">Samples</h3>
                                        <div className="space-y-1 lg:space-y-2">
                                            {searchResults.samples.map((sample) => (
                                                <div
                                                    key={sample.uid}
                                                    onClick={() => handleSearchSampleClick(sample)}
                                                    className="p-1 lg:p-2 border border-primary bg-card rounded hover:shadow-sm cursor-pointer flex items-center gap-1.5 lg:gap-2 transition-all"
                                                >
                                                    <div className="w-5 h-5 lg:w-8 lg:h-8 rounded bg-muted overflow-hidden flex-shrink-0 border border-border">
                                                        {sample.images && sample.images.length > 0 ? (
                                                            <img
                                                                src={sample.images[0].file}
                                                                alt={sample.name}
                                                                className="w-full h-full object-fixed"
                                                            />
                                                        ) : (
                                                            <RectangleHorizontal className="w-full h-full p-0.5 lg:p-2 text-muted-foreground" />
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-[10px] lg:text-sm font-medium">{sample.name}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            {searchResults.samples.length === 0 && (
                                                <p className="text-xs text-muted-foreground">No samples found</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3 w-full lg:w-auto justify-start lg:justify-start">
                    <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="h-9 w-20 flex-shrink-0 border-black">
                                <Filter className="h-4 w-4" /> Filter
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>Filter Samples</SheetTitle>
                                <SheetDescription>
                                    Apply filters to narrow down the sample list.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="py-6 px-6 space-y-6">
                                {/* Category Filter */}
                                <div className="space-y-3">
                                    <Label>Category</Label>
                                    <div className="relative">
                                        <Select value={category} onValueChange={setCategory}>
                                            <SelectTrigger className="pr-8">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Categories</SelectItem>
                                                {FILTER_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        {category && category !== "all" && (
                                            <X
                                                className="absolute left-38 top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground z-10"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setCategory("all")
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Sub Category Filter */}
                                <div className="space-y-3">
                                    <Label>Sub Category</Label>
                                    <div className="relative">
                                        <Select value={subCategory} onValueChange={setSubCategory}>
                                            <SelectTrigger className="pr-8">
                                                <SelectValue placeholder="Select sub category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Sub Categories</SelectItem>
                                                {FILTER_SUB_CATEGORIES.map(sc => <SelectItem key={sc} value={sc}>{sc}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        {subCategory && subCategory !== "all" && (
                                            <X
                                                className="absolute left-38 top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground z-10"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setSubCategory("all")
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                                {/* Weight Filter */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Label>Weight Range</Label>
                                        <span className="text-xs text-muted-foreground">{weightRange[0]} - {weightRange[1]}</span>
                                    </div>
                                    <Slider
                                        value={weightRange}
                                        min={0}
                                        max={2000}
                                        step={1}
                                        onValueChange={(val: any) => setWeightRange(val)}
                                        className="py-2"
                                    />
                                </div>

                                {/* Age Range Filter */}
                                {/* <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Label>Age Range</Label>
                                        <span className="text-xs text-muted-foreground">{ageRange[0]} - {ageRange[1]}</span>
                                    </div>
                                    <Slider
                                        value={ageRange}
                                        min={0}
                                        max={100}
                                        step={1}
                                        onValueChange={(val: any) => setAgeRange(val)}
                                        className="py-2"
                                    />
                                </div> */}

                                {/* Size Range Type Filter */}
                                <div className="space-y-3">
                                    <Label className="block">Size Range Type</Label>
                                    <div className="flex flex-col gap-2">
                                        {/* LETTER_RANGE Checkbox */}
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="range-letter"
                                                checked={sizeRangeTypes.includes("LETTER_RANGE")}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setSizeRangeTypes([...sizeRangeTypes, "LETTER_RANGE"])
                                                    } else {
                                                        setSizeRangeTypes(sizeRangeTypes.filter(t => t !== "LETTER_RANGE"))
                                                    }
                                                }}
                                            />
                                            <Label htmlFor="range-letter" className="cursor-pointer">LETTER RANGE</Label>
                                        </div>
                                        {sizeRangeTypes.includes("LETTER_RANGE") && (
                                            <div className="pl-6 space-y-2">
                                                <div>
                                                    <Label className="text-xs text-muted-foreground">Letter Range Min</Label>
                                                    <div className="relative">
                                                        <Select
                                                            value={letterRangeMin}
                                                            onValueChange={setLetterRangeMin}
                                                        >
                                                            <SelectTrigger className="w-full mt-1 h-8 text-xs pr-8">
                                                                <SelectValue placeholder="Select Min" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL', '4XL', '5XL'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                                            </SelectContent>
                                                        </Select>
                                                        {letterRangeMin && (
                                                            <X
                                                                className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 cursor-pointer text-muted-foreground hover:text-foreground z-10"
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    setLetterRangeMin("")
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label className="text-xs text-muted-foreground">Letter Range Max</Label>
                                                    <div className="relative">
                                                        <Select
                                                            value={letterRangeMax}
                                                            onValueChange={setLetterRangeMax}
                                                        >
                                                            <SelectTrigger className="w-full mt-1 h-8 text-xs pr-8">
                                                                <SelectValue placeholder="Select Max" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL', '4XL', '5XL'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                                            </SelectContent>
                                                        </Select>
                                                        {letterRangeMax && (
                                                            <X
                                                                className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 cursor-pointer text-muted-foreground hover:text-foreground z-10"
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    setLetterRangeMax("")
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* AGE_RANGE_YEAR Checkbox */}
                                        <div className="flex items-center space-x-2 mt-2">
                                            <Checkbox
                                                id="range-year"
                                                checked={sizeRangeTypes.includes("AGE_RANGE_YEAR")}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setSizeRangeTypes([...sizeRangeTypes, "AGE_RANGE_YEAR"])
                                                    } else {
                                                        setSizeRangeTypes(sizeRangeTypes.filter(t => t !== "AGE_RANGE_YEAR"))
                                                    }
                                                }}
                                            />
                                            <Label htmlFor="range-year" className="cursor-pointer">AGE RANGE YEAR</Label>
                                        </div>
                                        {sizeRangeTypes.includes("AGE_RANGE_YEAR") && (
                                            <div className="pl-6 pt-2">
                                                <div className="flex items-center justify-between mb-2">
                                                    <Label className="text-xs text-muted-foreground">Year Range ({ageRangeYear[0]} - {ageRangeYear[1]})</Label>
                                                </div>
                                                <Slider
                                                    value={ageRangeYear}
                                                    min={1}
                                                    max={100}
                                                    step={1}
                                                    onValueChange={(val: any) => setAgeRangeYear(val)}
                                                />
                                            </div>
                                        )}

                                        {/* AGE_RANGE_MONTH Checkbox */}
                                        <div className="flex items-center space-x-2 mt-2">
                                            <Checkbox
                                                id="range-month"
                                                checked={sizeRangeTypes.includes("AGE_RANGE_MONTH")}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setSizeRangeTypes([...sizeRangeTypes, "AGE_RANGE_MONTH"])
                                                    } else {
                                                        setSizeRangeTypes(sizeRangeTypes.filter(t => t !== "AGE_RANGE_MONTH"))
                                                    }
                                                }}
                                            />
                                            <Label htmlFor="range-month" className="cursor-pointer">AGE RANGE MONTH</Label>
                                        </div>
                                        {sizeRangeTypes.includes("AGE_RANGE_MONTH") && (
                                            <div className="pl-6 pt-2">
                                                <div className="flex items-center justify-between mb-2">
                                                    <Label className="text-xs text-muted-foreground">Month Range ({ageRangeMonth[0]} - {ageRangeMonth[1]})</Label>
                                                </div>
                                                <Slider
                                                    value={ageRangeMonth}
                                                    min={1}
                                                    max={12}
                                                    step={1}
                                                    onValueChange={(val: any) => setAgeRangeMonth(val)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Color Filter */}
                                <div className="space-y-3">
                                    <Label>Color</Label>
                                    <div className="relative">
                                        <Select value={selectedColor} onValueChange={setSelectedColor}>
                                            <SelectTrigger className="pr-8">
                                                <SelectValue placeholder="Select color" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Colors</SelectItem>
                                                {FILTER_COLORS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        {selectedColor && selectedColor !== "all" && (
                                            <X
                                                className="absolute left-29 top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground z-10"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setSelectedColor("all")
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Sample Type Filter */}
                                <div className="space-y-3">
                                    <Label>Sample Type</Label>
                                    <div className="relative">
                                        <Select value={sampleType} onValueChange={setSampleType}>
                                            <SelectTrigger className="pr-8">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Types</SelectItem>
                                                {FILTER_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        {sampleType && sampleType !== "all" && (
                                            <X
                                                className="absolute left-46 top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground z-10"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setSampleType("all")
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Buyer Filter */}
                                <div className="space-y-3">
                                    <Label>Buyer</Label>
                                    <div className="relative">
                                        <Select value={selectedBuyer} onValueChange={setSelectedBuyer}>
                                            <SelectTrigger className="pr-8">
                                                <SelectValue placeholder="Select buyer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Buyers</SelectItem>
                                                {buyers.map(b => <SelectItem key={b.uid} value={b.uid}>{b.name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        {selectedBuyer && selectedBuyer !== "all" && (
                                            <X
                                                className="absolute left-27 top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground z-10"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setSelectedBuyer("all")
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Project Filter */}
                                <div className="space-y-3">
                                    <Label>Project</Label>
                                    <div className="relative">
                                        <Select value={selectedProject} onValueChange={setSelectedProject}>
                                            <SelectTrigger className="pr-8">
                                                <SelectValue placeholder="Select project" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Projects</SelectItem>
                                                {projects.map(p => <SelectItem key={p.uid} value={p.uid}>{p.name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        {selectedProject && selectedProject !== "all" && (
                                            <X
                                                className="absolute left-32 top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground z-10"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setSelectedProject("all")
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <SheetFooter className="gap-2">
                                <Button className="flex-1" onClick={handleFilterSearch} disabled={isLoading}>
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
                                </Button>
                                <SheetClose asChild>
                                    <Button variant="outline" className="flex-1">Close</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>

                    {/* Sort By Dropdown */}
                    {/* Sort By Dropdown */}
                    <div className="relative">
                        <Select value={ordering} onValueChange={setOrdering}>
                            <SelectTrigger className="w-[180px] pr-8 border-black">
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>
                            <SelectContent>
                                {SORT_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {ordering && (
                            <X
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground z-10"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setOrdering("")
                                }}
                            />
                        )}
                    </div>

                    {/* Reset Button */}
                    <div className="relative">
                        <Button
                            variant="outline"
                            className="bg-transparent border-black h-10 w-24 hover:bg-black hover:text-white transition-colors"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
                <>

                    {samples.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-lg font-semibold text-foreground mb-4">Samples</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                {samples.map((sample) => (
                                    <Card key={sample.uid} className="border-border hover:shadow-lg transition-all overflow-hidden group bg-gray-200 border-1 border-black/20">
                                        <div className="flex items-center justify-between p-3 border-b border-primary">
                                            <h3 className="font-semibold text-sm sm:text-base line-clamp-1" title={sample.name}>{sample.name}</h3>
                                            <div onClick={(e) => e.stopPropagation()}>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <button className="p-1.5 hover:bg-muted rounded-full transition text-muted-foreground cursor-pointer">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleSampleEditClick(sample)} className="cursor-pointer">
                                                            <Edit2 className="w-4 h-4 mr-2" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleSampleDeleteClick(sample)} className="text-red-600 cursor-pointer">
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>

                                        <div className="relative overflow-hidden cursor-pointer" onClick={() => handleSampleDetailsClick(sample)}>
                                            {sample.images && sample.images.length > 0 ? (
                                                <img
                                                    src={sample.images[0].file || "/placeholder.svg"}
                                                    alt={sample.name}
                                                    className="w-full h-full object-contain hover:scale-105 transition-transform"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-muted">
                                                    <RectangleHorizontal className="w-12 h-12 text-muted-foreground" />
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* Spaces Grid */}
                    {spaces.length > 0 && (
                        <div>
                            <h2 className="text-lg font-semibold text-foreground mb-4">Spaces</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                                {spaces.map((space) => (
                                    <Card
                                        key={space.uid}
                                        className="border-border hover:shadow-lg transition-all overflow-hidden group bg-gray-200 border-1 border-black/20"
                                    >
                                        <div className="relative overflow-hidden">
                                            <div onClick={() => handleSpaceCardClick(space)} className="w-full h-full cursor-pointer flex justify-center items-center">
                                                <img
                                                    src="/space.png"
                                                    alt={space.name}
                                                    className="w-40 h-40 object-contain group-hover:scale-105 transition-transform"
                                                />
                                            </div>
                                            <div className="absolute top-3 right-3 z-10" onClick={(e) => e.stopPropagation()}>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <button className="p-2 hover:bg-black/20 rounded-full transition text-black cursor-pointer">
                                                            <MoreVertical className="w-5 h-5" />
                                                        </button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={(e) => handlePreviewClick(space, e)} className="cursor-pointer">
                                                            <Eye className="w-4 h-4 mr-2 cursor-pointer" />
                                                            Preview
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleEditClick(space); }} className="cursor-pointer">
                                                            <Edit2 className="w-4 h-4 mr-2 cursor-pointer" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleDeleteClick(space); }} className="text-red-600 cursor-pointer">
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>

                                        <CardHeader className="pb-4 pt-2">
                                            <CardTitle className="text-base sm:text-lg line-clamp-1 text-center">{space.name}</CardTitle>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {spaces.length === 0 && samples.length === 0 && (
                        <div className="text-center py-12">
                            <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">No spaces or samples found</p>
                        </div>
                    )}
                </>
            )}



            {/* Existing modals */}
            {
                editModal && selectedSpace && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
                            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
                                <CardTitle className="text-lg sm:text-xl">Edit Space - {selectedSpace.name}</CardTitle>
                                <button onClick={() => setEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
                                    <X className="w-5 h-5" />
                                </button>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-foreground block mb-2">Space Name</label>
                                        <input
                                            type="text"
                                            value={editFormData.name}
                                            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                            className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-foreground block mb-2">Description</label>
                                        <textarea
                                            value={editFormData.description}
                                            onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                                            className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                            rows={3}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-foreground block mb-2">Image</label>
                                        {editImagePreview && (
                                            <div className="mb-3 relative">
                                                <img
                                                    src={editImagePreview || "/placeholder.svg"}
                                                    alt="Preview"
                                                    className="w-full h-40 object-fixed rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setEditImagePreview("")
                                                        setEditImage(null)
                                                    }}
                                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                                        <Button
                                            onClick={handleSaveEdit}
                                            disabled={isSaving}
                                            className="flex-1 bg-primary hover:bg-primary/90 text-white"
                                        >
                                            {isSaving ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Updating...
                                                </>
                                            ) : (
                                                "Update"
                                            )}
                                        </Button>
                                        <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setEditModal(false)}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )
            }


            {
                spacePreviewModal && previewSpace && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <Card className="w-full max-w-lg border-border max-h-[90vh] overflow-y-auto">
                            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
                                <CardTitle className="text-lg sm:text-xl">Space Preview</CardTitle>
                                <button onClick={() => setSpacePreviewModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0">
                                    <X className="w-5 h-5" />
                                </button>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div className="h-full w-full overflow-hidden">
                                        <img
                                            src={previewSpace.image || "/placeholder.svg"}
                                            alt={previewSpace.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold pt-2">{previewSpace.name}</h3>
                                        <p className="text-sm text-muted-foreground pt-4">{previewSpace.description || "No description provided."}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                                        <div>
                                            <span className="font-medium">Type:</span> {previewSpace.type}
                                        </div>
                                        <div>
                                            <span className="font-medium">Status:</span> {previewSpace.status}
                                        </div>
                                        {/* Add more fields if needed */}
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        <Button onClick={() => setSpacePreviewModal(false)}>Close</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )
            }

            {
                sampleEditModal && selectedSample && sampleEditData && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <Card className="w-full max-w-2xl border-border max-h-[100vh] overflow-y-auto">
                            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
                                <CardTitle className="text-lg sm:text-xl">Edit Sample - {selectedSample.name}</CardTitle>
                                <button onClick={() => setSampleEditModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0 cursor-pointer">
                                    <X className="w-5 h-5" />
                                </button>
                            </CardHeader>
                            <CardContent className="pt-6">
                                {sampleEditLoading ? (
                                    <div className="flex items-center justify-center py-6">
                                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                    </div>
                                ) : (
                                    <div className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
                                        <div>
                                            <label className="text-sm font-medium text-foreground block mb-2">Sample Name</label>
                                            <input
                                                type="text"
                                                value={sampleEditData.name}
                                                onChange={(e) => setSampleEditData({ ...sampleEditData, name: e.target.value })}
                                                className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-foreground block mb-2">Description</label>
                                            <textarea
                                                value={sampleEditData.description}
                                                onChange={(e) => setSampleEditData({ ...sampleEditData, description: e.target.value })}
                                                className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                rows={3}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Style No */}
                                            <div>
                                                <label className="text-sm font-medium text-foreground block mb-2">Style No</label>
                                                <input
                                                    type="text"
                                                    value={sampleEditData.style_no}
                                                    onChange={(e) => setSampleEditData({ ...sampleEditData, style_no: e.target.value })}
                                                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                />
                                            </div>

                                            {/* SKU No */}
                                            <div>
                                                <label className="text-sm font-medium text-foreground block mb-2">SKU No</label>
                                                <input
                                                    type="text"
                                                    value={sampleEditData.sku_no}
                                                    onChange={(e) => setSampleEditData({ ...sampleEditData, sku_no: e.target.value })}
                                                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                />
                                            </div>

                                            {/* Category */}
                                            <div>
                                                <label className="text-sm font-medium text-foreground block mb-2">Category</label>
                                                <select
                                                    value={sampleEditData.category}
                                                    onChange={(e) => {
                                                        const newCategory = e.target.value
                                                        setSampleEditData({
                                                            ...sampleEditData,
                                                            category: newCategory,
                                                            sub_category: newCategory === "WOVEN" ? "DENIM" : "MENS"
                                                        })
                                                    }}
                                                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                >
                                                    <option value="CIRCULAR_KNIT">CIRCULAR_KNIT</option>
                                                    <option value="FLAT_KNIT">FLAT_KNIT</option>
                                                    <option value="WOVEN">WOVEN</option>
                                                </select>
                                            </div>

                                            {/* Sub Category */}
                                            <div>
                                                <label className="text-sm font-medium text-foreground block mb-2">Sub Category</label>
                                                <select
                                                    value={sampleEditData.sub_category}
                                                    onChange={(e) => setSampleEditData({ ...sampleEditData, sub_category: e.target.value })}
                                                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                >
                                                    {sampleEditData.category === "WOVEN" ? (
                                                        <>
                                                            <option value="DENIM">DENIM</option>
                                                            <option value="NON_DENIM">NON_DENIM</option>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <option value="MENS">MENS</option>
                                                            <option value="JR_LADIES">JR_LADIES</option>
                                                            <option value="WOMEN">WOMEN</option>
                                                            <option value="JUNIOR_BOYS">JUNIOR_BOYS</option>
                                                            <option value="SENIOR_BOYS">SENIOR_BOYS</option>
                                                            <option value="TODDLER_BOYS">TODDLER_BOYS</option>
                                                            <option value="JUNIOR_GIRLS">JUNIOR_GIRLS</option>
                                                            <option value="SENIOR_GIRLS">SENIOR_GIRLS</option>
                                                            <option value="TODDLER_GIRLS">TODDLER_GIRLS</option>
                                                            <option value="KIDS">KIDS</option>
                                                        </>
                                                    )}
                                                </select>
                                            </div>

                                            {/* Item */}
                                            {/* Item - Removed */}

                                            {/* Color */}
                                            <div>
                                                <label className="text-sm font-medium text-foreground block mb-2">Color</label>
                                                <input
                                                    type="text"
                                                    value={sampleEditData.color}
                                                    onChange={(e) => setSampleEditData({ ...sampleEditData, color: e.target.value })}
                                                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-sm font-medium text-foreground block mb-2">Size Range Type</label>
                                                <select
                                                    value={sampleEditData.size_range_type || "LETTER_RANGE"}
                                                    onChange={(e) => setSampleEditData({ ...sampleEditData, size_range_type: e.target.value })}
                                                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                >
                                                    <option value="LETTER_RANGE">LETTER_RANGE</option>
                                                    <option value="AGE_RANGE_YEAR">AGE_RANGE_YEAR</option>
                                                    <option value="AGE_RANGE_MONTH">AGE_RANGE_MONTH</option>
                                                </select>
                                            </div>

                                            {/* Letter Range */}
                                            {sampleEditData.size_range_type === "LETTER_RANGE" && (
                                                <>
                                                    <div>
                                                        <label className="text-sm font-medium text-foreground block mb-2">Letter Range Min</label>
                                                        <select
                                                            value={sampleEditData.letter_range_min || ""}
                                                            onChange={(e) => setSampleEditData({ ...sampleEditData, letter_range_min: e.target.value })}
                                                            className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                        >
                                                            <option value="">Select Min</option>
                                                            {LETTER_SIZES_MAPPING.map((size, index) => (
                                                                <option key={`${size.label}-${index}`} value={size.value}>{size.label}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-foreground block mb-2">Letter Range Max</label>
                                                        <select
                                                            value={sampleEditData.letter_range_max || ""}
                                                            onChange={(e) => setSampleEditData({ ...sampleEditData, letter_range_max: e.target.value })}
                                                            className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                        >
                                                            <option value="">Select Max</option>
                                                            {LETTER_SIZES_MAPPING.map((size, index) => (
                                                                <option key={`${size.label}-${index}`} value={size.value}>{size.label}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </>
                                            )}

                                            {/* Age Range Year */}
                                            {sampleEditData.size_range_type === "AGE_RANGE_YEAR" && (
                                                <>
                                                    <div>
                                                        <label className="text-sm font-medium text-foreground block mb-2">Age Range Year Min</label>
                                                        <select
                                                            value={sampleEditData.age_range_year_min || ""}
                                                            onChange={(e) => setSampleEditData({ ...sampleEditData, age_range_year_min: e.target.value })}
                                                            className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                        >
                                                            <option value="">Select Min</option>
                                                            {Array.from({ length: 100 }, (_, i) => i + 1).map((age) => (
                                                                <option key={age} value={age}>{age}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-foreground block mb-2">Age Range Year Max</label>
                                                        <select
                                                            value={sampleEditData.age_range_year_max || ""}
                                                            onChange={(e) => setSampleEditData({ ...sampleEditData, age_range_year_max: e.target.value })}
                                                            className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                        >
                                                            <option value="">Select Max</option>
                                                            {Array.from({ length: 100 }, (_, i) => i + 1).map((age) => (
                                                                <option key={age} value={age}>{age}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </>
                                            )}

                                            {/* Age Range Month */}
                                            {sampleEditData.size_range_type === "AGE_RANGE_MONTH" && (
                                                <>
                                                    <div>
                                                        <label className="text-sm font-medium text-foreground block mb-2">Age Range Month Min</label>
                                                        <select
                                                            value={sampleEditData.age_range_month_min || ""}
                                                            onChange={(e) => setSampleEditData({ ...sampleEditData, age_range_month_min: e.target.value })}
                                                            className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                        >
                                                            <option value="">Select Min</option>
                                                            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                                                <option key={month} value={month}>{month}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-foreground block mb-2">Age Range Month Max</label>
                                                        <select
                                                            value={sampleEditData.age_range_month_max || ""}
                                                            onChange={(e) => setSampleEditData({ ...sampleEditData, age_range_month_max: e.target.value })}
                                                            className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                        >
                                                            <option value="">Select Max</option>
                                                            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                                                <option key={month} value={month}>{month}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </>
                                            )}


                                            {/* Fabrication */}
                                            <div>
                                                <label className="text-sm font-medium text-foreground block mb-2">Fabrication</label>
                                                <input
                                                    type="text"
                                                    value={sampleEditData.fabrication}
                                                    onChange={(e) => setSampleEditData({ ...sampleEditData, fabrication: e.target.value })}
                                                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                />
                                            </div>

                                            {/* Weight */}
                                            <div>
                                                <label className="text-sm font-medium text-foreground block mb-2">Weight</label>
                                                <input
                                                    type="text"
                                                    value={sampleEditData.weight}
                                                    onChange={(e) => setSampleEditData({ ...sampleEditData, weight: e.target.value })}
                                                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                />
                                            </div>

                                            {/* Weight Type */}
                                            <div>
                                                <label className="text-sm font-medium text-foreground block mb-2">Weight Type</label>
                                                <select
                                                    value={sampleEditData.weight_type}
                                                    onChange={(e) => setSampleEditData({ ...sampleEditData, weight_type: e.target.value })}
                                                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                >
                                                    <option value="GM">GM</option>
                                                    <option value="KG">KG</option>
                                                    <option value="GSM">GSM</option>
                                                </select>
                                            </div>

                                            {/* Sample Type */}
                                            <div>
                                                <label className="text-sm font-medium text-foreground block mb-2">Sample Type</label>
                                                <select
                                                    value={sampleEditData.types}
                                                    onChange={(e) => setSampleEditData({ ...sampleEditData, types: e.target.value })}
                                                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                >
                                                    <option value="DEVELOPMENT">DEVELOPMENT</option>
                                                    <option value="SALESMAN">SALESMAN</option>
                                                    <option value="STYLING">STYLING</option>
                                                    <option value="SHIPPING">SHIPPING</option>
                                                    <option value="FIT">FIT</option>
                                                    <option value="PRODUCTION">PRODUCTION</option>
                                                    <option value="PRE_PRODUCTION">PRE_PRODUCTION</option>
                                                    <option value="COUNTER">COUNTER</option>
                                                    <option value="SIZE_SET">SIZE_SET</option>
                                                    <option value="ORIGINAL">ORIGINAL</option>
                                                </select>
                                            </div>

                                            {/* Arrival Date */}
                                            <div>
                                                <label className="text-sm font-medium text-foreground block mb-2">Arrival Date</label>
                                                <input
                                                    type="datetime-local"
                                                    value={sampleEditData.arrival_date ? sampleEditData.arrival_date.slice(0, 16) : ""}
                                                    onChange={(e) => setSampleEditData({ ...sampleEditData, arrival_date: e.target.value })}
                                                    className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                />
                                            </div>
                                        </div>

                                        {/* Age Range */}
                                        {/* <div>
                                            <label className="text-sm font-medium text-foreground block mb-2">Age Range</label>
                                            <input
                                                type="text"
                                                value={sampleEditData.size_range || ""}
                                                onChange={(e) => setSampleEditData({ ...sampleEditData, size_range: e.target.value })}
                                                className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </div> */}

                                        <div>
                                            <label className="text-sm font-medium text-foreground block mb-2">Comments</label>
                                            <textarea
                                                value={sampleEditData.comments}
                                                onChange={(e) => setSampleEditData({ ...sampleEditData, comments: e.target.value })}
                                                className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                                rows={2}
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-foreground block mb-2">Buyers</label>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button
                                                        type="button"
                                                        className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground text-left flex items-center justify-between hover:bg-muted/30 transition focus:outline-none focus:ring-2 focus:ring-primary"
                                                    >
                                                        <span
                                                            className={sampleEditData.buyers?.length > 0 ? "text-foreground" : "text-muted-foreground"}
                                                        >
                                                            {sampleEditData.buyers?.length > 0
                                                                ? `${sampleEditData.buyers.length} buyer(s) selected`
                                                                : "Select buyers..."}
                                                        </span>
                                                        <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start" className="w-56">
                                                    {buyers.length > 0 ? (
                                                        <div>
                                                            {buyers.map((buyer) => (
                                                                <DropdownMenuCheckboxItem
                                                                    key={buyer.uid}
                                                                    checked={sampleEditData.buyers?.some((b: any) => b.uid === buyer.uid)}
                                                                    onCheckedChange={() => {
                                                                        const current = sampleEditData.buyers || []
                                                                        const isSelected = current.some((b: any) => b.uid === buyer.uid)
                                                                        setSampleEditData({
                                                                            ...sampleEditData,
                                                                            buyers: isSelected
                                                                                ? current.filter((b: any) => b.uid !== buyer.uid)
                                                                                : [...current, buyer],
                                                                        })
                                                                    }}
                                                                >
                                                                    {buyer.name}
                                                                </DropdownMenuCheckboxItem>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="p-2 text-sm text-muted-foreground">No buyers available</div>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-foreground block mb-2">Projects</label>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button
                                                        type="button"
                                                        className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground text-left flex items-center justify-between hover:bg-muted/30 transition focus:outline-none focus:ring-2 focus:ring-primary"
                                                    >
                                                        <span
                                                            className={
                                                                sampleEditData.projects?.length > 0 ? "text-foreground" : "text-muted-foreground"
                                                            }
                                                        >
                                                            {sampleEditData.projects?.length > 0
                                                                ? `${sampleEditData.projects.length} project(s) selected`
                                                                : "Select projects..."}
                                                        </span>
                                                        <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start" className="w-56">
                                                    {projects.length > 0 ? (
                                                        <div>
                                                            {projects.map((project) => (
                                                                <DropdownMenuCheckboxItem
                                                                    key={project.uid}
                                                                    checked={sampleEditData.projects?.some((p: any) => p.uid === project.uid)}
                                                                    onCheckedChange={() => {
                                                                        const current = sampleEditData.projects || []
                                                                        const isSelected = current.some((p: any) => p.uid === project.uid)
                                                                        setSampleEditData({
                                                                            ...sampleEditData,
                                                                            projects: isSelected
                                                                                ? current.filter((p: any) => p.uid !== project.uid)
                                                                                : [...current, project],
                                                                        })
                                                                    }}
                                                                >
                                                                    {project.name}
                                                                </DropdownMenuCheckboxItem>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="p-2 text-sm text-muted-foreground">No projects available</div>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-foreground block mb-2">Notes</label>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button
                                                        type="button"
                                                        className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-card text-foreground text-left flex items-center justify-between hover:bg-muted/30 transition focus:outline-none focus:ring-2 focus:ring-primary"
                                                    >
                                                        <span
                                                            className={sampleEditData.notes?.length > 0 ? "text-foreground" : "text-muted-foreground"}
                                                        >
                                                            {sampleEditData.notes?.length > 0
                                                                ? `${sampleEditData.notes.length} note(s) selected`
                                                                : "Select notes..."}
                                                        </span>
                                                        <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start" className="w-56">
                                                    {notes.length > 0 ? (
                                                        <div>
                                                            {notes.map((note) => (
                                                                <DropdownMenuCheckboxItem
                                                                    key={note.uid}
                                                                    checked={sampleEditData.notes?.some((n: any) => n.uid === note.uid)}
                                                                    onCheckedChange={() => {
                                                                        const current = sampleEditData.notes || []
                                                                        const isSelected = current.some((n: any) => n.uid === note.uid)
                                                                        setSampleEditData({
                                                                            ...sampleEditData,
                                                                            notes: isSelected
                                                                                ? current.filter((n: any) => n.uid !== note.uid)
                                                                                : [...current, note],
                                                                        })
                                                                    }}
                                                                >
                                                                    {note.title}
                                                                </DropdownMenuCheckboxItem>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="p-2 text-sm text-muted-foreground">No notes available</div>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-foreground block mb-2">
                                                Sample Images ({sampleEditImages.length})
                                            </label>
                                            <Button
                                                type="button"
                                                onClick={() => setImageUploadOpen(true)}
                                                className="cursor-pointer w-full bg-[#00FFFF] hover:bg-[#00FFFF] text-black flex items-center justify-center gap-2"
                                            >
                                                <Upload className="w-4 h-4" />
                                                Manage Images
                                            </Button>
                                        </div>

                                        {/* {sampleEditImages.length > 0 && (
                                            <div>
                                                <label className="text-sm font-medium text-foreground block mb-2">
                                                    Current Images ({sampleEditImages.length})
                                                </label>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                    {sampleEditImages.map((img) => (
                                                        <div key={img.uid} className="relative group">
                                                            <img
                                                                src={img.file || "/placeholder.svg"}
                                                                alt="sample"
                                                                className="w-full h-24 object-fixed rounded-lg border border-border"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleSampleImageRemove(img.uid)}
                                                                className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded opacity-100 group-hover:opacity-100 transition"
                                                            >
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )} */}

                                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                                            <Button
                                                onClick={handleSampleSaveEdit}
                                                disabled={sampleIsSaving}
                                                className="flex-1 bg-primary hover:bg-primary/90 text-white cursor-pointer"
                                            >
                                                {sampleIsSaving ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                        Updating...
                                                    </>
                                                ) : (
                                                    "Update"
                                                )}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="flex-1 bg-transparent cursor-pointer"
                                                onClick={() => setSampleEditModal(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )
            }

            <SampleImageUploadModal
                isOpen={imageUploadOpen}
                onClose={() => setImageUploadOpen(false)}
                existingImages={sampleEditImages}
                onImagesUpload={handleSampleImagesUpload}
            />

            {
                sampleDetailsModal && sampleDetails && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <Card className="w-full max-w-2xl border-border max-h-[90vh] overflow-y-auto">
                            <CardHeader className="flex items-center justify-between border-b border-border pb-3 sticky top-0 bg-background z-20">
                                <CardTitle className="text-lg sm:text-xl">{sampleDetails.name}</CardTitle>
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="gap-2 cursor-pointer"
                                        onClick={() => {
                                            setSampleDetailsModal(false)
                                            handleSampleEditClick(sampleDetails)
                                        }}
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        className="gap-2 cursor-pointer"
                                        onClick={() => {
                                            setSampleDetailsModal(false)
                                            handleSampleDeleteClick(sampleDetails)
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </Button>
                                    <button onClick={() => setSampleDetailsModal(false)} className="p-1 hover:bg-muted rounded flex-shrink-0 ml-2 cursor-pointer">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-1 space-y-4">
                                {sampleDetailsLoading ? (
                                    <div className="flex items-center justify-center py-8">
                                        <div className="w-8 h-8 border-2 border-muted-foreground border-t-foreground rounded-full animate-spin"></div>
                                    </div>
                                ) : (
                                    <>

                                        {sampleDetails.storage.name && (

                                            <button className="flex flex-row gap-2 border-2 border-grey p-3"><Folder />{sampleDetails.storage.name}</button>
                                        )}
                                        {/* Images Section */}
                                        {sampleDetails.images && sampleDetails.images.length > 0 && (
                                            <div>
                                                <h3 className="font-semibold text-foreground mb-2">Images</h3>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                    {sampleDetails.images.map((image: any, index: number) => (
                                                        <img
                                                            key={image.uid}
                                                            src={image.file || "/placeholder.svg"}
                                                            alt={image.file_name}
                                                            onClick={() => handleImageClick(index, sampleDetails.images)}
                                                            className="w-full h-32 object-fixed rounded border border-border cursor-pointer hover:opacity-90 transition"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Basic Information */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-t border-b border-border">
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase">Style No</label>
                                                <p className="text-foreground">{sampleDetails.style_no || "-"}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase">SKU No</label>
                                                <p className="text-foreground">{sampleDetails.sku_no || "-"}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase">Item</label>
                                                <p className="text-foreground">{sampleDetails.item || "-"}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase">Fabrication</label>
                                                <p className="text-foreground">{sampleDetails.fabrication || "-"}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase">Color</label>
                                                <p className="text-foreground">{sampleDetails.color || "-"}</p>
                                            </div>
                                            {/* <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase">Size</label>
                                                <p className="text-foreground">{sampleDetails.size || "-"}</p>
                                            </div> */}
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase">Weight</label>
                                                <p className="text-foreground">
                                                    {sampleDetails.weight} {sampleDetails.weight_type || "-"}
                                                </p>
                                            </div>
                                            {/* <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase">Size Type</label>
                                                <p className="text-foreground">{sampleDetails.size_type || "-"}</p>
                                            </div> */}
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase">Size Range Type</label>
                                                <p className="text-foreground">{sampleDetails.size_range_type || "-"}</p>
                                            </div>
                                            {sampleDetails.size_range_type === "LETTER_RANGE" && (
                                                <>
                                                    <div>
                                                        <label className="text-xs font-semibold text-muted-foreground uppercase">Letter Range Min</label>
                                                        <p className="text-foreground">{getLetterSizeLabel(sampleDetails.letter_range_min) || "-"}</p>
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-semibold text-muted-foreground uppercase">Letter Range Max</label>
                                                        <p className="text-foreground">{getLetterSizeLabel(sampleDetails.letter_range_max) || "-"}</p>
                                                    </div>
                                                </>
                                            )}
                                            {sampleDetails.size_range_type === "AGE_RANGE_YEAR" && (
                                                <>
                                                    <div>
                                                        <label className="text-xs font-semibold text-muted-foreground uppercase">Age Range Year Min</label>
                                                        <p className="text-foreground">{sampleDetails.age_range_year_min || "-"}</p>
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-semibold text-muted-foreground uppercase">Age Range Year Max</label>
                                                        <p className="text-foreground">{sampleDetails.age_range_year_max || "-"}</p>
                                                    </div>
                                                </>
                                            )}
                                            {sampleDetails.size_range_type === "AGE_RANGE_MONTH" && (
                                                <>
                                                    <div>
                                                        <label className="text-xs font-semibold text-muted-foreground uppercase">Age Range Month Min</label>
                                                        <p className="text-foreground">{sampleDetails.age_range_month_min || "-"}</p>
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-semibold text-muted-foreground uppercase">Age Range Month Max</label>
                                                        <p className="text-foreground">{sampleDetails.age_range_month_max || "-"}</p>
                                                    </div>
                                                </>
                                            )}
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase">Type</label>
                                                <p className="text-foreground">{sampleDetails.types || "-"}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase">Arrival Date</label>
                                                <p className="text-foreground">
                                                    {sampleDetails.arrival_date ? new Date(sampleDetails.arrival_date).toLocaleDateString() : "-"}
                                                </p>
                                            </div>
                                            {/* <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase">Age Range</label>
                                                <p className="text-foreground">{sampleDetails.size_range || "-"}</p>
                                            </div> */}
                                        </div>

                                        {/* Description */}
                                        {sampleDetails.description && (
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase">Description</label>
                                                <p className="text-foreground text-sm">{sampleDetails.description}</p>
                                            </div>
                                        )}

                                        {/* Comments */}
                                        {sampleDetails.comments && (
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase">Comments</label>
                                                <p className="text-foreground text-sm">{sampleDetails.comments}</p>
                                            </div>
                                        )}
                                        {sampleDetails.category && (
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase">Category</label>
                                                <p className="text-foreground text-sm">{sampleDetails.category}</p>
                                            </div>
                                        )}
                                        {sampleDetails.sub_category && (
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase">Sub Category</label>
                                                <p className="text-foreground text-sm">{sampleDetails.sub_category}</p>
                                            </div>
                                        )}

                                        {/* Buyers Section */}
                                        {sampleDetails.buyers && sampleDetails.buyers.length > 0 && (
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase">Buyers</label>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {sampleDetails.buyers.map((buyer: any) => (
                                                        <div key={buyer.uid} className="bg-muted px-2 py-1 rounded text-xs text-foreground">
                                                            {buyer.name || buyer.uid}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Projects Section */}
                                        {sampleDetails.projects && sampleDetails.projects.length > 0 && (
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase">Projects</label>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {sampleDetails.projects.map((project: any) => (
                                                        <div key={project.uid} className="bg-muted px-2 py-1 rounded text-xs text-foreground">
                                                            {project.name || project.uid}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Notes Section */}
                                        {sampleDetails.notes && sampleDetails.notes.length > 0 && (
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase">Notes</label>
                                                <div className="space-y-1 mt-1">
                                                    {sampleDetails.notes.map((note: any) => (
                                                        <div key={note.uid} className="bg-muted p-2 rounded text-xs text-foreground">
                                                            {note.title || note.uid}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Status */}
                                        <div className="pt-4 border-t border-border">
                                            <label className="text-xs font-semibold text-muted-foreground uppercase mr-2">Status</label>
                                            <p className="text-foreground inline-block bg-muted px-2 py-1 rounded text-sm">
                                                {sampleDetails.status || "-"}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </CardContent>

                            <CardFooter className="border-t border-border flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setSampleDetailsModal(false)} className="cursor-pointer">
                                    Close
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                )
            }

            {
                sampleDeleteConfirmModal && selectedSample && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <Card className="w-full max-w-md border-border">
                            <CardHeader className="flex items-center justify-between border-b border-border pb-3">
                                <CardTitle className="text-lg">Delete Sample</CardTitle>
                                <button
                                    onClick={() => setSampleDeleteConfirmModal(false)}
                                    className="p-1 hover:bg-muted rounded flex-shrink-0"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <p className="text-sm text-foreground mb-6">
                                    Are you sure you want to delete sample "{selectedSample.name}"? This action cannot be undone.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button
                                        onClick={handleSampleConfirmDelete}
                                        disabled={sampleIsDeleting}
                                        className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
                                    >
                                        {sampleIsDeleting ? (
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
                                        onClick={() => setSampleDeleteConfirmModal(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )
            }

            {/* Image Viewer Modal */}
            {
                imageViewOpen && viewImages.length > 0 && (
                    <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4">
                        <button
                            onClick={handleCloseImageViewer}
                            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition z-[70]"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="relative w-full h-full flex items-center justify-center">
                            {viewImages.length > 1 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handlePrevImage()
                                    }}
                                    className="absolute left-2 md:left-8 text-white p-2 hover:bg-white/10 rounded-full transition z-[70]"
                                >
                                    <ChevronLeft className="w-10 h-10" />
                                </button>
                            )}

                            <div className="max-w-[90vw] max-h-[90vh] relative">
                                <img
                                    src={viewImages[currentImageIndex].file || "/placeholder.svg"}
                                    alt="Full view"
                                    className="max-w-full max-h-[90vh] object-contain"
                                />
                                <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 text-white text-sm">
                                    {currentImageIndex + 1} / {viewImages.length}
                                </div>
                            </div>

                            {viewImages.length > 1 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleNextImage()
                                    }}
                                    className="absolute right-2 md:right-8 text-white p-2 hover:bg-white/10 rounded-full transition z-[70]"
                                >
                                    <ChevronRight className="w-10 h-10" />
                                </button>
                            )}
                        </div>
                    </div>
                )
            }
        </div >
    )
}