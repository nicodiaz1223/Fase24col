"use client"
import { FC, useState } from "react"
import { useCart } from "@/app/(context)/CartContext"
import { Product } from "@/app/(services)/Products/products"
import Image from "next/image"
import Link from "next/link"
import { formatCOP } from "@/app/utils/helpers"

interface ProductDetailClientProps {
  product: Product
}

export const ProductDetailClient: FC<ProductDetailClientProps> = ({
  product,
}) => {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.nombre,
      precio: Number(product.precio),
      imagen: product.imagenUrl,
      quantity,
    })
  }

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Product Image */}
          <div className="flex-shrink-0 w-full md:w-1/2">
            <Image
              src={product.imagenUrl}
              alt={product.nombre}
              width={600}
              height={600}
              className="rounded-2xl object-cover w-full h-[400px] md:h-[600px] shadow-lg"
              priority
            />
          </div>
          {/* Product Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
              {product.nombre}
            </h1>
            <p className="text-slate-500 text-lg mb-6">{product.descripcion}</p>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-slate-900">
                {formatCOP(product.precio)}
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                {product.categoria}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <label htmlFor="quantity" className="text-slate-700 font-medium">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 border border-slate-300 rounded px-2 py-1 text-center"
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="px-8 py-3 rounded-full bg-slate-900 text-white font-semibold text-lg hover:bg-slate-700 transition mb-4"
            >
              Agregar al carrito
            </button>
            <div>
              <Link
                href="/products"
                className="text-slate-500 hover:text-slate-900 transition text-sm underline"
              >
                &larr; Volver a todos los productos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
