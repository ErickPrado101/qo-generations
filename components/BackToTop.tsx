"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Voltar ao topo"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={
        "fixed bottom-6 right-6 z-50 rounded-2xl border border-white/10 bg-white/70 px-4 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-black/80 shadow-soft backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:border-white/25 hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 dark:bg-black/50 dark:text-white/85 dark:hover:bg-white/5 " +
        (visible ? "opacity-100" : "pointer-events-none opacity-0")
      }
    >
      Topo
    </button>
  );
}
