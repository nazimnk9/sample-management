// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { AlertCircle, Mail, Lock, Loader2 } from "lucide-react"

// export default function LoginPage() {
//   const router = useRouter()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setIsLoading(true)

//     try {
//       const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
//       const response = await fetch(`${baseURL}/token`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//         }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         setError(data.message || data.detail || "Login failed. Please check your credentials.")
//         setIsLoading(false)
//         return
//       }

//       // Store tokens in session cookies
//       document.cookie = `access_token=${data.access}; path=/; Max-Age=3600; SameSite=Lax`
//       document.cookie = `refresh_token=${data.refresh}; path=/; Max-Age=86400; SameSite=Lax`

//       // Redirect to dashboard
//       router.push("/dashboard")
//     } catch (err) {
//       setError("Network error. Please try again.")
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
//       <Card className="w-full max-w-md border-border shadow-xl">
//         <CardHeader className="space-y-2 pb-6">
//           <CardTitle className="text-3xl font-bold text-foreground text-center">Welcome Back</CardTitle>
//           <CardDescription className="text-center text-base">Sign in to your account to continue</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {error && (
//               <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
//                 <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
//                 <p className="text-sm text-red-600">{error}</p>
//               </div>
//             )}

//             {/* Email Field */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-foreground">Email Address</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-foreground">Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                 <input
//                   type="password"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
//                 />
//               </div>
//             </div>

//             {/* Login Button */}
//             <Button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-lg font-medium transition disabled:opacity-50"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   Signing in...
//                 </>
//               ) : (
//                 "Sign In"
//               )}
//             </Button>
//           </form>

//           {/* Demo Credentials */}
//           {/* <div className="mt-6 pt-6 border-t border-border">
//             <p className="text-xs text-muted-foreground text-center mb-2">Demo Credentials:</p>
//             <div className="bg-muted/50 rounded-lg p-3 space-y-1">
//               <p className="text-xs text-foreground">
//                 <span className="font-semibold">Email:</span> nazimahmedprovat@gmail.com
//               </p>
//               <p className="text-xs text-foreground">
//                 <span className="font-semibold">Password:</span> nazim1234
//               </p>
//             </div>
//           </div> */}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Mail, Lock, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFieldErrors({})
    setIsLoading(true)

    try {
      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
      const response = await fetch(`${baseURL}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (typeof data === "object" && !Array.isArray(data)) {
          // Check if error is in field format like { "email": ["message"], "password": ["message"] }
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
            // Single error message
            toast({
              title: "Login Failed",
              description: data.message || data.detail || "Please check your credentials.",
              variant: "destructive",
            })
          }
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid email or password.",
            variant: "destructive",
          })
        }
        setIsLoading(false)
        return
      }

      document.cookie = `access_token=${data.access}; path=/; Max-Age=3600; SameSite=Lax`
      document.cookie = `refresh_token=${data.refresh}; path=/; Max-Age=86400; SameSite=Lax`

      toast({
        title: "Success",
        description: "You have been logged in successfully.",
        variant: "default",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border shadow-xl">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="text-3xl font-bold text-foreground text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center text-base">Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  //required
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:border-transparent transition ${
                    fieldErrors.email ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                  }`}
                />
              </div>
              {fieldErrors.email && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {fieldErrors.email[0]}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  //required
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:border-transparent transition ${
                    fieldErrors.password ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-primary"
                  }`}
                />
              </div>
              {fieldErrors.password && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {fieldErrors.password[0]}
                </p>
              )}
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-lg font-medium transition disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          {/* <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center mb-2">Demo Credentials:</p>
            <div className="bg-muted/50 rounded-lg p-3 space-y-1">
              <p className="text-xs text-foreground">
                <span className="font-semibold">Email:</span> nazimahmedprovat@gmail.com
              </p>
              <p className="text-xs text-foreground">
                <span className="font-semibold">Password:</span> nazim1234
              </p>
            </div>
          </div> */}
        </CardContent>
      </Card>
    </div>
  )
}
