export const Footer = () => {
  return (
    <footer className="mt-8">
      <div className="mx-auto container dynamicPx border-t border-slate-300">
        <div className="flex h-16 items-center justify-between text-slate-600">
          <div className="flex-shrink-0 uppercase">
            &copy; {new Date().getFullYear()} Fase24Col
          </div>
          <div className="flex space-x-6">
            <a
              href="https://github.com/Git-Darkmoon/fase24col"
              className="underline underline-offset-2 hover:underline-offset-4 transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              Codigo fuente
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
