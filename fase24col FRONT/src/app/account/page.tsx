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
  const { user, logout, isAuthenticated } = useAccount()
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDetailsId, setShowDetailsId] = useState<string | null>(null)

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
