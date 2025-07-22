// components/SocialProof.tsx
export const SocialProof = () => (
  <section className="py-12 bg-slate-50">
    <div className="container mx-auto px-4 max-w-3xl">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 text-center">
        Que dicen de nosotros ?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-slate-700 mb-2">
            &ldquo;La calidad de la ropa una chimba!!! &rdquo;
          </p>
          <span className="text-slate-900 font-semibold">— Alexander R.</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-slate-700 mb-2">
            &ldquo;No se demoraron en entregar mi compra y todo super
            top.&rdquo;
          </p>
          <span className="text-slate-900 font-semibold">— Miguel L.</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-slate-700 mb-2">
            &ldquo;Se han vuelto la marca de ropa favorita pa&apos;mi.&rdquo;
          </p>
          <span className="text-slate-900 font-semibold">— Samantha K.</span>
        </div>
      </div>
    </div>
  </section>
)
