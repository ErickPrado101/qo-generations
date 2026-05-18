import Link from "next/link";

export function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="container-x flex h-[78px] items-center justify-between">
        <Link href="#home" className="flex items-center gap-3" aria-label="Quality Originals Home">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 shadow-soft">
            <div className="h-5 w-5 rounded-full bg-white/90 shadow-[0_0_22px_rgba(255,255,255,0.55)]" />
          </div>
          <div className="hidden sm:block">
            <div className="text-[0.74rem] font-semibold uppercase tracking-[0.26em] text-white/70">
              Quality Originals
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-2" aria-label="Menu principal">
          <Link className="nav-link" href="#home">
            Home
          </Link>
          <Link className="nav-link" href="#quem-somos">
            Quem somos
          </Link>
          <Link className="nav-link" href="#contato">
            Fale conosco
          </Link>
          <Link className="nav-link" href="#catalogo">
            Catálogo
          </Link>
        </nav>
      </div>
    </header>
  );
}
