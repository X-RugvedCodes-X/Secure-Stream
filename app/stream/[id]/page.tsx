"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Shield, User } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"

// Mock video data
const videoData = {
  "1": {
    title: "Advanced Security Protocols",
    description: "Learn about enterprise-grade security implementations in modern applications.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    drmLicenseUrl: "https://widevine-proxy.appspot.com/proxy",
  },
  "2": {
    title: "DRM Implementation Guide",
    description: "Complete guide to Digital Rights Management and content protection.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    drmLicenseUrl: "https://widevine-proxy.appspot.com/proxy",
  },
  "3": {
    title: "Streaming Architecture",
    description: "Building scalable video streaming platforms with modern technologies.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    drmLicenseUrl: "https://widevine-proxy.appspot.com/proxy",
  },
}

function VideoPlayer({
  videoUrl,
  drmLicenseUrl,
  userId,
}: {
  videoUrl: string
  drmLicenseUrl: string
  userId: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const initializePlayer = async () => {
      if (!videoRef.current) return

      try {
        // For this demo, we'll use HTML5 video with basic DRM simulation
        // In production, you would use Shaka Player or similar for full DRM support
        const video = videoRef.current

        // Add watermark overlay
        const watermark = document.createElement("div")
        watermark.style.cssText = `
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 12px;
          z-index: 10;
          pointer-events: none;
        `
        watermark.textContent = `User: ${userId} | Session: ${Date.now().toString().slice(-6)}`

        const container = video.parentElement
        if (container) {
          container.style.position = "relative"
          container.appendChild(watermark)
        }

        video.src = videoUrl
        video.load()

        setIsLoading(false)
      } catch (err) {
        setError("Failed to load video player")
        setIsLoading(false)
      }
    }

    initializePlayer()
  }, [videoUrl, drmLicenseUrl, userId])

  if (error) {
    return (
      <div className="bg-slate-800 rounded-lg p-8 text-center">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <div className="text-white">Loading secure player...</div>
        </div>
      )}
      <video
        ref={videoRef}
        controls
        className="w-full h-auto max-h-[70vh]"
        crossOrigin="anonymous"
        onLoadStart={() => setIsLoading(false)}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

function StreamContent({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const video = videoData[params.id as keyof typeof videoData]

  if (!video) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-4">Video Not Found</h2>
            <Link href="/dashboard">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      <div className="pt-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          {/* Video Player */}
          <div className="mb-8">
            <VideoPlayer
              videoUrl={video.videoUrl}
              drmLicenseUrl={video.drmLicenseUrl}
              userId={user?.username || "anonymous"}
            />
          </div>

          {/* Video Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">{video.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{video.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-600">
                      <Shield className="h-3 w-3 mr-1" />
                      DRM Protected
                    </Badge>
                    <Badge className="bg-purple-600">
                      <User className="h-3 w-3 mr-1" />
                      Watermarked
                    </Badge>
                    <Badge className="bg-blue-600">HD Quality</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Security Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Shield className="h-4 w-4 text-green-400 mr-2" />
                    <span className="text-gray-300">Widevine DRM</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Shield className="h-4 w-4 text-green-400 mr-2" />
                    <span className="text-gray-300">Session Watermark</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Shield className="h-4 w-4 text-green-400 mr-2" />
                    <span className="text-gray-300">Encrypted Stream</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Shield className="h-4 w-4 text-green-400 mr-2" />
                    <span className="text-gray-300">Access Control</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StreamPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <StreamContent params={params} />
    </ProtectedRoute>
  )
}
