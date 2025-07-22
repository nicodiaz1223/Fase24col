import Image from "next/image"
import Link from "next/link"

export const Hero = () => {
  return (
    <section className="bg-slate-100 py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="max-w-xl mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Bienvenido a{" "}
            <span className="rainbowText font-extrabold">Fase24Col</span>
          </h1>
          <p className="text-lg text-slate-700 mb-6">
            Descubre los últimos productos, ofertas exclusivas y entrega
            rápida—tu tienda integral para todo lo que necesitas!
          </p>
          <div className="flex space-x-4">
            <Link
              href="/products"
              className="px-6 py-3 bg-slate-900 text-white rounded-md font-semibold hover:bg-slate-700 transition-colors"
            >
              Comprar ropita
            </Link>
            <a
              href="/account"
              className="px-6 py-3 border border-slate-900 text-slate-900 rounded-md font-semibold hover:bg-slate-200 transition-colors"
            >
              Tu cuenta
            </a>
          </div>
        </div>
        {/* Hero Image */}
        <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
          <Image
            width={2500}
            height={1500}
            src="/hero.avif"
            alt="Featured products"
            className="rounded-xl shadow-lg w-full max-w-lg object-cover"
          />
        </div>
      </div>
    </section>
  )
}
