"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "../(context)/CartContext"
import { useAccount } from "../(context)/Account/AccountContext"

export const Navbar = () => {
  const { cartItems } = useCart()
  const { isAuthenticated } = useAccount()
  const router = useRouter()

  const handleAccountClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isAuthenticated) {
      router.push("/account")
    } else {
      router.push("/login")
    }
  }

  return (
    <nav className="">
      <div className="mx-auto container border-b border-slate-300">
        <div className="flex h-16 items-center justify-between">
          {/* Company Name */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-slate-950 text-2xl font-bold tracking-tight uppercase"
            >
              Fase24Col
            </Link>
          </div>
          {/* Nav Links */}
          <div className="flex space-x-6">
            <Link
              href="/products"
              className="text-slate-900 hover:text-slate-500 transition-colors font-medium"
            >
              Todos los productos
            </Link>
            {/* Account Link */}
            <a
              href="/account"
              onClick={handleAccountClick}
              className="text-slate-900 hover:text-slate-500 transition-colors font-medium cursor-pointer"
            >
              {isAuthenticated ? "Mi cuenta" : "Iniciar sesión"}
            </a>
            <Link
              href="/cart"
              className="text-slate-900 hover:text-slate-500 transition-colors font-medium"
            >
              Carrito{" "}
              {cartItems.length > 0 && (
                <span className="ml-1 rounded-full bg-slate-900 text-white px-2 text-xs">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
