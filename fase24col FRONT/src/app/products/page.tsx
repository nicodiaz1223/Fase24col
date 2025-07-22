"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Product } from "../(services)/Products/products"
import { useFetch } from "@/hooks/useFetch"
import { API_URL } from "../utils/apiConsts"
import { formatCOP } from "../utils/helpers"

export default function ProductsPage() {
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>(API_URL.PRODUCTS)

  // UI state for filtering/search
  const [filtered, setFiltered] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  useEffect(() => {
    if (products) {
      setFiltered(products)
      setCategories([
        "All",
        ...Array.from(new Set(products.map((p) => p.categoria))),
      ])
    }
  }, [products])

  useEffect(() => {
    if (!products) return
    let filteredProducts = products
    if (selectedCategory !== "All") {
      filteredProducts = filteredProducts.filter(
        (p) => p.categoria === selectedCategory
      )
    }
    if (search.trim()) {
      filteredProducts = filteredProducts.filter((p) =>
        p.nombre.toLowerCase().includes(search.toLowerCase())
      )
    }
    setFiltered(filteredProducts)
  }, [search, selectedCategory, products])

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">
          Productos
        </h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900 transition w-full md:w-1/3"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900 transition w-full md:w-1/5"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Loading/Error */}
        {loading && (
          <div className="text-center py-20 text-slate-400">
            Cargando mor...
          </div>
        )}
        {error && (
          <div className="text-center py-20 text-red-500 font-semibold">
            {error}
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.length === 0 && (
              <div className="col-span-full text-center text-slate-400">
                No se encontro nada parce.
              </div>
            )}
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition group flex flex-col"
              >
                <div className="overflow-hidden rounded-t-2xl">
                  <Image
                    width={500}
                    height={500}
                    src={product.imagenUrl}
                    alt={product.nombre}
                    className="object-cover w-full h-56 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between p-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 mb-1 truncate">
                      {product.nombre}
                    </h2>
                    <p className="text-slate-500 text-sm mb-2 line-clamp-2">
                      {product.descripcion}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-slate-900 font-bold text-lg">
                      {formatCOP(product.precio)}
                    </span>
                    <Link
                      href={`/products/${product.id}`}
                      className="px-4 py-1 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition"
                    >
                      Ver detallitos
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
