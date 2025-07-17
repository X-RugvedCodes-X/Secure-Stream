import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Play, Users, Lock, Star, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 pt-20 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Secure Video Streaming
              <span className="block text-purple-400">Made Simple</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              Experience premium video content with enterprise-grade security, DRM protection, and seamless streaming
              across all your devices.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/register">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-black bg-transparent"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Why Choose Our Platform?</h2>
            <p className="mt-4 text-lg text-gray-300">Built with security and performance in mind</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <Shield className="h-10 w-10 text-purple-400 mb-4" />
                <CardTitle className="text-white">DRM Protection</CardTitle>
                <CardDescription className="text-gray-300">
                  Advanced Widevine and FairPlay DRM support for maximum content security
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <Play className="h-10 w-10 text-purple-400 mb-4" />
                <CardTitle className="text-white">HD Streaming</CardTitle>
                <CardDescription className="text-gray-300">
                  Adaptive bitrate streaming with support for 4K and HDR content
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <Users className="h-10 w-10 text-purple-400 mb-4" />
                <CardTitle className="text-white">User Management</CardTitle>
                <CardDescription className="text-gray-300">
                  Comprehensive user authentication and session management
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <Lock className="h-10 w-10 text-purple-400 mb-4" />
                <CardTitle className="text-white">Secure Access</CardTitle>
                <CardDescription className="text-gray-300">
                  JWT-based authentication with protected routes and watermarking
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <Star className="h-10 w-10 text-purple-400 mb-4" />
                <CardTitle className="text-white">Premium Quality</CardTitle>
                <CardDescription className="text-gray-300">
                  Crystal clear video with minimal buffering and fast load times
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-purple-400 mb-4" />
                <CardTitle className="text-white">Cross Platform</CardTitle>
                <CardDescription className="text-gray-300">
                  Works seamlessly across desktop, mobile, and tablet devices
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of users who trust our platform for secure video streaming
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
                Create Account
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white hover:text-black w-full sm:w-auto bg-transparent"
              >
                Sign In Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
