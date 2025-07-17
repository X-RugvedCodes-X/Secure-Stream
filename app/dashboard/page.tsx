"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Play, Clock, Shield, User, LogOut } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"

const videoContent = [
  {
    id: "1",
    title: "Advanced Security Protocols",
    description: "Learn about enterprise-grade security implementations",
    duration: "45:30",
    thumbnail: "/placeholder.svg?height=200&width=300",
    status: "purchased",
  },
  {
    id: "2",
    title: "DRM Implementation Guide",
    description: "Complete guide to Digital Rights Management",
    duration: "32:15",
    thumbnail: "/placeholder.svg?height=200&width=300",
    status: "purchased",
  },
  {
    id: "3",
    title: "Streaming Architecture",
    description: "Building scalable video streaming platforms",
    duration: "28:45",
    thumbnail: "/placeholder.svg?height=200&width=300",
    status: "available",
  },
]

function DashboardContent() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      <div className="pt-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* User Profile Section */}
          <div className="mb-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-purple-600 text-white text-xl">
                        {user?.username?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-white text-2xl">Welcome back, {user?.username}!</CardTitle>
                      <CardDescription className="text-gray-300">{user?.email}</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="text-white border-white hover:bg-white hover:text-black bg-transparent"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-purple-400" />
                    <span className="text-gray-300">Active Session</span>
                    <Badge className="bg-green-600">Online</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-purple-400" />
                    <span className="text-gray-300">Security Level</span>
                    <Badge className="bg-purple-600">Premium</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Play className="h-5 w-5 text-purple-400" />
                    <span className="text-gray-300">Content Access</span>
                    <Badge className="bg-blue-600">Full</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Video Content Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Your Video Library</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoContent.map((video) => (
                <Card
                  key={video.id}
                  className="bg-slate-800 border-slate-700 hover:border-purple-500 transition-colors"
                >
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {video.duration}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white">{video.title}</CardTitle>
                    <CardDescription className="text-gray-300">{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge className={video.status === "purchased" ? "bg-green-600" : "bg-yellow-600"}>
                        {video.status === "purchased" ? "Owned" : "Available"}
                      </Badge>
                      {video.status === "purchased" ? (
                        <Link href={`/stream/${video.id}`}>
                          <Button className="bg-purple-600 hover:bg-purple-700">
                            <Play className="h-4 w-4 mr-2" />
                            Watch Now
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          variant="outline"
                          className="text-white border-white hover:bg-white hover:text-black bg-transparent"
                        >
                          Purchase
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
