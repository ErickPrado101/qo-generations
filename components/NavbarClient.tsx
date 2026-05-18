"use client";

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
  const [active, setActive] = useState<string | null>(null);
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

    if (!sections.length) return;

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
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[color:var(--line)] bg-white shadow-soft dark:bg-black">
      <div className="container-x flex h-[78px] items-center justify-between">
        <Link
          href="#home"
          className="flex items-center gap-3"
          aria-label="Quality Originals Home"
          onClick={() => setOpen(false)}
        >
          <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-[color:var(--line)] bg-transparent">
            <img
              src="/Icon_q.o.webp"
              alt="Ícone Quality Originals"
              width={34}
              height={34}
              className="h-9 w-9 rounded-full object-cover"
            />
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
              className="nav-link relative"
              href={it.href}
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-[color:var(--line)] bg-transparent text-xs font-extrabold uppercase tracking-[0.12em] text-black/80 transition hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/10 md:hidden"
          >
            <span className="sr-only">Menu</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="opacity-90"
            >
              <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className={"md:hidden " + (open ? "block" : "hidden")}
        aria-label="Menu mobile"
      >
        <div className="container-x pb-5">
          <div className="rounded-3xl border border-[color:var(--line)] bg-white p-2 shadow-soft dark:bg-black">
            {hashItems.map((it) => (
              <Link
                key={it.id}
                href={it.href}
                onClick={() => setOpen(false)}
                className={
                  "block rounded-2xl px-4 py-3 text-sm font-semibold text-black/80 transition hover:bg-black/5 dark:text-white/85 dark:hover:bg-white/10 " +
                  (active === it.id ? "" : "")
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
