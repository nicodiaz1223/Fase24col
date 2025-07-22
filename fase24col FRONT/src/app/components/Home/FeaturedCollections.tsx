// components/FeaturedCollections.tsx
import { ROUTES } from "@/app/utils/frontendConsts"
import Image from "next/image"
import Link from "next/link"

export const FeaturedCollections = () => (
  <section className="py-12">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 text-slate-900">Lo mas top</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
          href={ROUTES.PRODUCTS}
          className="group block rounded-xl overflow-hidden shadow hover:shadow-lg transition"
        >
          <Image
            width={512}
            height={512}
            src="/HomePage/NewArrival.jpg"
            alt="New Arrivals"
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
          />
          <div className="p-4 bg-white">
            <h3 className="text-lg font-semibold text-slate-900">
              Ultimas cositas que nos llegaron
            </h3>
          </div>
        </Link>
        <Link
          href={ROUTES.PRODUCTS}
          className="group block rounded-xl overflow-hidden shadow hover:shadow-lg transition"
        >
          <Image
            width={512}
            height={512}
            src="/HomePage/BestSeller.jpg"
            alt="Best Sellers"
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
          />
          <div className="p-4 bg-white">
            <h3 className="text-lg font-semibold text-slate-900">
              Best Sellers
            </h3>
          </div>
        </Link>
        <Link
          href={ROUTES.PRODUCTS}
          className="group block rounded-xl overflow-hidden shadow hover:shadow-lg transition"
        >
          <Image
            width={512}
            height={512}
            src="/HomePage/SummerDrop.jpg"
            alt="Summer Drop"
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
          />
          <div className="p-4 bg-white">
            <h3 className="text-lg font-semibold text-slate-900">
              Pa&apos; verano mor
            </h3>
          </div>
        </Link>
      </div>
    </div>
  </section>
)
