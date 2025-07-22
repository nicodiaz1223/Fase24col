"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "../(context)/CartContext"
import { formatCOP } from "../utils/helpers"

export default function CartPage() {
  const {
    cartItems,
    incrementItem,
    decrementItem,
    removeFromCart,
    clearCart,
    getCartTotal,
  } = useCart()
  const [step, setStep] = useState<"cart" | "payment" | "success">("cart")
  const shipping = 47_000

  const stockMessage = (qty: number) =>
    qty < 3 ? (
      <span className="text-emerald-600 text-xs">Quedan pocas unidades!</span>
    ) : null

  const warningMessage = (
    <span className="text-red-500 text-xs">
      Este item se enviará por separado
    </span>
  )

  const PaymentUI = () => (
    <div className="bg-white rounded-xl shadow p-8 mx-auto">
      <h2 className="text-xl font-bold mb-6 text-slate-900">Pago</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setStep("success")
          clearCart()
        }}
        className="flex flex-col gap-4"
      >
        <input
          type="number"
          minLength={12}
          maxLength={12}
          required
          placeholder="Numero en la tarjeta"
          className="border border-slate-300 rounded px-4 py-2"
        />
        <input
          type="text"
          required
          placeholder="Tarjetahabiente"
          className="border border-slate-300 rounded px-4 py-2"
        />
        <div className="flex gap-2">
          <input
            type="month"
            inputMode="numeric"
            required
            placeholder="MM"
            className="border border-slate-300 rounded px-4 py-2 w-1/2"
            maxLength={5}
            minLength={5}
          />
          <input
            type="number"
            inputMode="numeric"
            required
            placeholder="CVV"
            className="border border-slate-300 rounded px-4 py-2 w-1/2"
            maxLength={3}
            minLength={3}
          />
        </div>
        <button
          type="submit"
          className="bg-slate-900 text-white font-semibold rounded-full py-3 mt-4 hover:bg-slate-700 transition"
        >
          Pagaaaar
        </button>
      </form>
    </div>
  )

  // Success UI placeholder
  const SuccessUI = () => (
    <div className="bg-white rounded-xl shadow p-8 max-w-lg mx-auto text-center">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        Gracias por tu compra parce!
      </h2>
      <p className="text-slate-600 mb-6">Orden creada con exito.</p>
      <Link href="/products" className="text-slate-900 underline font-medium">
        Seguir comprando
      </Link>
    </div>
  )

  // Main Cart UI
  return (
    <main className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        {step === "cart" && (
          <section className="flex-1">
            <h1 className="text-2xl font-bold mb-6 text-slate-900">
              Carrito de compras
            </h1>
            {cartItems.length === 0 ? (
              <div className="text-slate-500">Tu carrito esta vacio.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-4">
                  <thead>
                    <tr className="text-left text-slate-500 text-xs uppercase">
                      <th className="w-32"></th>
                      <th>Item</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Precio Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="align-top">
                        <td>
                          <Image
                            src={item.imagen}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover border"
                          />
                        </td>
                        <td className="pr-4">
                          <div className="font-semibold text-slate-900">
                            {item.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            Talla: UNICA
                          </div>
                          <div className="text-xs text-slate-500">
                            Color: original
                          </div>
                          <div className="flex flex-col gap-1 mt-2">
                            {stockMessage(item.quantity)}
                            {warningMessage}
                          </div>
                        </td>
                        <td className="text-slate-900 font-medium">
                          {formatCOP(item.precio)}
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => decrementItem(item.id)}
                              className="border border-slate-300 rounded px-2 py-1 text-slate-900 hover:bg-slate-100"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => incrementItem(item.id)}
                              className="border border-slate-300 rounded px-2 py-1 text-slate-900 hover:bg-slate-100"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="text-slate-900 font-semibold">
                          {formatCOP(item.precio * item.quantity)}
                        </td>
                        <td>
                          <button
                            aria-label="Remove item"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 text-xs underline hover:text-red-700"
                          >
                            Remover
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Order Summary / Payment */}
        <aside className="w-full lg:w-96">
          {step === "cart" && (
            <div className="bg-slate-50 rounded-xl shadow p-6 sticky top-8">
              <h2 className="text-lg font-bold mb-4 text-slate-900">
                Resumen de compra
              </h2>
              <div className="flex justify-between text-slate-700 mb-2">
                <span>Subtotal</span>
                <span>{formatCOP(getCartTotal())}</span>
              </div>
              <div className="flex justify-between text-slate-700 mb-2">
                <span>Costo de envio</span>
                <span>{formatCOP(shipping)}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-semibold text-base mb-6 border-t border-slate-200 pt-4">
                <span>Total</span>
                <span>{formatCOP(getCartTotal() + shipping)}</span>
              </div>
              <button
                onClick={() => setStep("payment")}
                disabled={cartItems.length === 0}
                className="w-full bg-slate-900 text-white font-semibold rounded-full py-3 mb-3 hover:bg-slate-700 transition disabled:opacity-60"
              >
                Continuar al pago
              </button>
              <button
                className="w-full border border-slate-300 rounded-full py-3 mb-2 flex items-center justify-center gap-2 hover:bg-slate-100 transition"
                disabled
              >
                {/* PayPal SVG Icon */}
                <svg width="24" height="24" fill="none" viewBox="0 0 48 48">
                  <rect width="48" height="48" rx="8" fill="#fff" />
                  <path
                    fill="#003087"
                    d="M24 10c-7.732 0-14 6.268-14 14s6.268 14 14 14 14-6.268 14-14-6.268-14-14-14zm0 26c-6.627 0-12-5.373-12-12S17.373 12 24 12s12 5.373 12 12-5.373 12-12 12z"
                  />
                  <path
                    fill="#009cde"
                    d="M24 14c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
                  />
                </svg>
                PSE
              </button>
              <input
                type="text"
                placeholder="Cupon de descuento"
                className="w-full border border-slate-300 rounded px-4 py-2 mt-2 uppercase"
                maxLength={6}
              />
            </div>
          )}
          {step === "payment" && <PaymentUI />}
          {step === "success" && <SuccessUI />}
        </aside>
      </div>
    </main>
  )
}
