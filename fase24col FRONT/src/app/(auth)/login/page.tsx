"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAccount } from "@/app/(context)/Account/AccountContext"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAccount()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const success = await login(email, password)
    setLoading(false)
    if (success) {
      router.push("/account")
    } else {
      setError("Correo o contraseña incorrectos")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-slate-900">
          Iniciar Sesión
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-900 text-white rounded-full py-3 font-semibold hover:bg-slate-700 transition disabled:opacity-60"
          >
            {loading ? "Cargando..." : "Entrar"}
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-700">
          ¿Todavía no tienes cuenta?{" "}
          <a
            href="/register"
            className="text-slate-900 underline hover:text-slate-700"
          >
            Regístrate aquí
          </a>
        </p>
      </div>
    </main>
  )
}
