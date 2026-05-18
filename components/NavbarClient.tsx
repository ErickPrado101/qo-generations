"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

type Item = { id: string; label: string };

const items: Item[] = [
  { id: "home", label: "Home" },
  { id: "quem-somos", label: "Quem somos" },
  { id: "catalogo", label: "Catálogo" },
  { id: "contato", label: "Fale conosco" }
];

export function NavbarClient() {
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);

  const hashItems = useMemo(() => items.map((x) => ({ ...x, href: `#${x.id}` })), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const ids = items.map((x) => x.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0.1, 0.2, 0.35] }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="container-x flex h-[78px] items-center justify-between">
        <Link
          href="#home"
          className="flex items-center gap-3"
          aria-label="Quality Originals Home"
          onClick={() => setOpen(false)}
        >
          <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-soft">
            <Image src="/Icon_q.o.webp" alt="Ícone Quality Originals" width={44} height={44} priority />
          </div>
          <div className="hidden sm:block">
            <div className="text-[0.74rem] font-semibold uppercase tracking-[0.26em] text-black/65 dark:text-white/70">
              Quality Originals
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Menu principal">
          {hashItems.map((it) => (
            <Link
              key={it.id}
              className={
                "nav-link relative " + (active === it.id ? "text-white" : "")
              }
              href={it.href}
            >
              {it.label}
              <span
                className={
                  "pointer-events-none absolute -bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-white/70 transition-all duration-200 " +
                  (active === it.id ? "w-6" : "")
                }
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-xs font-extrabold uppercase tracking-[0.12em] text-white/80 transition hover:border-white/25 hover:bg-white/10 md:hidden"
          >
            Menu
          </button>
        </div>
      </div>

      <div className={"md:hidden " + (open ? "block" : "hidden")}
        aria-label="Menu mobile"
      >
        <div className="container-x pb-5">
          <div className="glass rounded-3xl p-3">
            {hashItems.map((it) => (
              <Link
                key={it.id}
                href={it.href}
                onClick={() => setOpen(false)}
                className={
                  "block rounded-2xl px-4 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/5 " +
                  (active === it.id ? "bg-white/5" : "")
                }
              >
                {it.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
