"use client"

import { API_URL } from "@/app/utils/apiConsts"
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"

interface User {
  id: number
  nombre: string
  correo: string
  direccion: string
  rol: string
}

interface AccountContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AccountContext = createContext<AccountContextType | undefined>(undefined)

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) setUser(JSON.parse(stored))
  }, [])

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user))
    else localStorage.removeItem("user")
  }, [user])

  // In AccountContext.tsx

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(API_URL.LOGIN_USER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email, contrasena: password }),
      })
      if (!res.ok) return false
      const data = await res.json()
      // If login failed, backend returns a string
      if (typeof data === "string") return false
      // Save user info in context/localStorage
      setUser({
        id: data.id,
        nombre: data.nombre,
        correo: data.correo,
        direccion: data.direccion,
        rol: data.rol,
      })
      return true
    } catch {
      return false
    }
  }

  const logout = () => setUser(null)

  return (
    <AccountContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export const useAccount = () => {
  const ctx = useContext(AccountContext)
  if (!ctx) throw new Error("useAccount must be used within AccountProvider")
  return ctx
}
