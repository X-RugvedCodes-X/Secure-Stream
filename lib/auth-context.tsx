"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Mock JWT functions - in production, use proper JWT library
const createMockJWT = (user: User) => {
  return btoa(JSON.stringify({ user, exp: Date.now() + 24 * 60 * 60 * 1000 }))
}

const verifyMockJWT = (token: string): User | null => {
  try {
    const decoded = JSON.parse(atob(token))
    if (decoded.exp < Date.now()) {
      return null
    }
    return decoded.user
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session on mount
    const token = localStorage.getItem("auth_token")
    if (token) {
      const userData = verifyMockJWT(token)
      if (userData) {
        setUser(userData)
      } else {
        localStorage.removeItem("auth_token")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock authentication - in production, call your API
    const mockUsers = [
      { id: "1", username: "demo", email: "demo@example.com", password: "password" },
      { id: "2", username: "user", email: "user@example.com", password: "123456" },
    ]

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)
    if (!foundUser) {
      throw new Error("Invalid credentials")
    }

    const userData = { id: foundUser.id, username: foundUser.username, email: foundUser.email }
    const token = createMockJWT(userData)

    localStorage.setItem("auth_token", token)
    setUser(userData)
  }

  const register = async (username: string, email: string, password: string) => {
    // Mock registration - in production, call your API
    const userData = {
      id: Date.now().toString(),
      username,
      email,
    }

    const token = createMockJWT(userData)
    localStorage.setItem("auth_token", token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    setUser(null)
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}
