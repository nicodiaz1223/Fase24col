"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { API_URL } from "@/app/utils/apiConsts"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [direccion, setDireccion] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function validatePassword(password: string): string | null {
    if (password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres."
    }
    if (!/[A-Z]/.test(password)) {
      return "La contraseña debe contener al menos una letra mayúscula."
    }
    if (!/[a-z]/.test(password)) {
      return "La contraseña debe contener al menos una letra minúscula."
    }
    if (!/[0-9]/.test(password)) {
      return "La contraseña debe contener al menos un número."
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      return "La contraseña debe contener al menos un símbolo."
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const passwordError = validatePassword(password)
    if (passwordError) {
      setError(passwordError)
      return
    }
    setLoading(true)
    setError("")
    setSuccess(false)
    try {
      const res = await fetch(API_URL.REGISTER_USER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: name,
          correo: email,
          contrasena: password,
          direccion: direccion,
          rol: "CLIENTE",
        }),
      })
      setLoading(false)
      if (res.ok) {
        setSuccess(true)
        setTimeout(() => router.push("/login"), 1500)
      } else {
        const data = await res.json()
        setError(
          typeof data === "string" ? data : "No se pudo registrar el usuario"
        )
      }
    } catch {
      setLoading(false)
      setError("Error de red")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-slate-900">Crear Cuenta</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          <input
            type="text"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
            className="border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && (
            <div className="text-emerald-600 text-sm">
              ¡Registro exitoso! Redirigiendo...
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-900 text-white rounded-full py-3 font-semibold hover:bg-slate-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Cargando..." : "Crear cuenta"}
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-700">
          ¿Ya tienes cuenta?{" "}
          <a
            href="/login"
            className="text-slate-900 underline hover:text-slate-700"
          >
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </main>
  )
}
