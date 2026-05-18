"use client";

import { useTheme } from "@/components/ThemeProvider";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5 3.6 3.6M20.4 20.4 19 19M19 5l1.4-1.4M3.6 20.4 5 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M21 13.1A7.8 7.8 0 0 1 11 3a7.9 7.9 0 1 0 10 10.1Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Alternar tema"
      onClick={toggleTheme}
      className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-[0px] text-black/80 transition hover:border-white/25 hover:bg-white/10 dark:text-white/85"
      title={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
