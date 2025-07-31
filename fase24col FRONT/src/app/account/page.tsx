"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAccount } from "../(context)/Account/AccountContext"
import { API_URL } from "../utils/apiConsts"

interface Purchase {
  id: string
  date: string
  total: number
  items: { name: string; quantity: number; price: number }[]
}

export default function AccountPage() {
  const { user, setUser, logout, isAuthenticated} = useAccount()
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDetailsId, setShowDetailsId] = useState<string | null>(null)

  //Variables de edición

  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState(user?.nombre || "")
  const [editEmail, setEditEmail] = useState(user?.correo || "")
  const [editDireccion, setEditDireccion] = useState(user?.direccion || "")
  const [editPassword, setEditPassword] = useState("")
  const [editError, setEditError] = useState("")
  const [editLoading, setEditLoading] = useState(false)
  const [editSuccess, setEditSuccess] = useState(false)

  useEffect(() => {
    if (!user) return
    setLoading(true)
    fetch(API_URL.USERS + `/${user.id}/compras`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Error cargando historial")
        const data = await res.json()
        setPurchases(data)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [user])

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      setEditError("Usuario no autenticado")
      return
    }
    setEditLoading(true)
    setEditError("")
    setEditSuccess(false)
    try {
      const res = await fetch(API_URL.USERS + `/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: editName,
          correo: editEmail,
          direccion: editDireccion,
          contrasena: editPassword || undefined,
          rol: user.rol, // Mantener el rol actual
        }),
      })
      setEditLoading(false)
      if (res.ok) {
        const updated = await res.json()
        setUser(updated)
        setEditSuccess(true)
        setEditing(false)
      } else {
        const data = await res.json()
        setEditError(typeof data === "string" ? data : "No se pudo actualizar")
      }
    } catch {
      setEditLoading(false)
      setEditError("Error de red")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4">
        <p className="text-slate-700 text-lg">
          No has iniciado sesión. Por favor{" "}
          <Link href="/login" className="text-slate-900 underline">
            inicia sesión
          </Link>{" "}
          para ver tu cuenta.
        </p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Mi Cuenta
          </h1>
          <button
            onClick={() => logout()}
            className="bg-red-600 text-white rounded-full px-5 py-2 hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Información básica */}
        <section className="mb-12 bg-slate-50 rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Información Básica
          </h2>
          {!editing ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700">
                <div>
                  <span className="font-medium">Nombre:</span> {user?.nombre}
                </div>
                <div>
                  <span className="font-medium">Correo:</span> {user?.correo}
                </div>
                <div>
                  <span className="font-medium">Dirección:</span> {user?.direccion}
                </div>
                <div>
                  <span className="font-medium">Rol:</span> {user?.rol}
                </div>
              </div>
              <button
                onClick={() => setEditing(true)}
                className="mt-4 bg-slate-900 text-white rounded-full px-5 py-2 hover:bg-slate-700 transition"
              >
                Editar
              </button>
              {editSuccess && (
                <div className="text-emerald-600 text-sm mt-2">
                  ¡Datos actualizados correctamente!
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleEdit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nombre completo"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
                className="border border-slate-300 rounded px-4 py-2"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                required
                className="border border-slate-300 rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="Dirección"
                value={editDireccion}
                onChange={(e) => setEditDireccion(e.target.value)}
                required
                className="border border-slate-300 rounded px-4 py-2"
              />
              <input
                type="password"
                placeholder="Nueva contraseña (opcional)"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
                className="border border-slate-300 rounded px-4 py-2"
              />
              {editError && (
                <div className="text-red-500 text-sm">{editError}</div>
              )}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={editLoading}
                  className="bg-slate-900 text-white rounded-full px-5 py-2 hover:bg-slate-700 transition disabled:opacity-60"
                >
                  {editLoading ? "Guardando..." : "Guardar"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="bg-slate-200 text-slate-900 rounded-full px-5 py-2 hover:bg-slate-300 transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </section>

        {/* Historial de compras */}
        <section className="bg-slate-50 rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Historial de Compras
          </h2>
          {loading && (
            <p className="text-center text-slate-500">Cargando historial...</p>
          )}
          {error && (
            <p className="text-center text-red-500 font-semibold">{error}</p>
          )}
          {!loading && !error && purchases.length === 0 && (
            <p className="text-slate-500 text-center">
              No hay historial de compras.
            </p>
          )}
          {!loading && !error && purchases.length > 0 && (
            <ul className="space-y-4">
              {purchases.map((purchase) => (
                <li
                  key={purchase.id}
                  className="bg-white rounded-lg shadow p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold text-slate-900">
                      Pedido #{purchase.id}
                    </div>
                    <div className="text-sm text-slate-500">
                      {new Date(purchase.date).toLocaleDateString()}
                    </div>
                    <div className="font-bold text-slate-900">
                      ${purchase.total.toFixed(2)}
                    </div>
                  </div>
                  <button
                    className="text-slate-700 text-sm underline"
                    onClick={() =>
                      setShowDetailsId(
                        showDetailsId === purchase.id ? null : purchase.id
                      )
                    }
                  >
                    {showDetailsId === purchase.id
                      ? "Ocultar Detalles"
                      : "Ver Detalles"}
                  </button>
                  {showDetailsId === purchase.id && (
                    <ul className="mt-2 text-slate-700 text-sm">
                      {purchase.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>
                            {item.name} x{item.quantity}
                          </span>
                          <span>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}
