"use client"

import { useEffect, useState } from "react"
import { apiCall } from "@/lib/auth-utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Edit, Mail, Phone, MapPin, Building, Calendar, User as UserIcon } from "lucide-react"
import EditProfileModal from "@/components/modals/edit-profile-modal"
import { Badge } from "@/components/ui/badge"

export default function ProfileView() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    const fetchProfile = async () => {
        try {
            const response = await apiCall("/me")
            if (response.ok) {
                const data = await response.json()
                setUser(data)
            } else {
                console.error("Failed to fetch profile")
            }
        } catch (error) {
            console.error("Error fetching profile:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    if (loading) {
        return (
            <div className="grid gap-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                    </div>
                </div>
                <Skeleton className="h-[200px] w-full" />
            </div>
        )
    }

    if (!user) return <div>Failed to load profile.</div>

    return (
        <div className="grid gap-6 max-w-4xl">
            {/* Header Section */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                            <AvatarImage src={user.profile_picture} />
                            <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                                {user.first_name?.[0] || user.username?.[0] || "U"}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 text-center md:text-left space-y-2">
                            <div>
                                <h2 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
                                    {user.first_name} {user.last_name}
                                    <Badge variant={user.status === "ACTIVE" ? "default" : "destructive"} className="ml-2">
                                        {user.status}
                                    </Badge>
                                </h2>
                                {/* <p className="text-muted-foreground">{user.username}</p> */}
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground justify-center md:justify-start">
                                <div className="flex items-center gap-1">
                                    <Building className="w-4 h-4" />
                                    {user.company?.name || "No Company"}
                                </div>
                                <div className="flex items-center gap-1">
                                    <UserIcon className="w-4 h-4" />
                                    {user.role}
                                </div>
                            </div>
                        </div>

                        <Button onClick={() => setIsEditModalOpen(true)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profile
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Details Section */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Email</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Phone className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Phone</p>
                                <p className="text-sm text-muted-foreground">{user.phone || "Not provided"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <UserIcon className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Gender</p>
                                <p className="text-sm text-muted-foreground">{user.gender}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Account Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Joined Date</p>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(user.date_joined).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <UserIcon className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">User ID</p>
                                <p className="text-sm text-muted-foreground break-all">{user.uid}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Building className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Company Status</p>
                                <p className="text-sm text-muted-foreground">{user.company?.status || "N/A"}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                currentUser={user}
                onSuccess={fetchProfile}
            />
        </div>
    )
}
