"use client"

import { Button } from "@/components/ui/button"
import { Play, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Play className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-bold text-white">StreamSecure</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-white hover:text-purple-400">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="text-white border-white hover:bg-white hover:text-black bg-transparent"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:text-purple-400">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800 rounded-lg mt-2">
              {user ? (
                <>
                  <Link href="/dashboard" className="block">
                    <Button variant="ghost" className="w-full text-left text-white hover:text-purple-400">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="w-full text-white border-white hover:bg-white hover:text-black bg-transparent"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block">
                    <Button variant="ghost" className="w-full text-left text-white hover:text-purple-400">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register" className="block">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
