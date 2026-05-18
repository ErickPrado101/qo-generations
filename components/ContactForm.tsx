"use client";

import { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Status = "idle" | "sending" | "sent";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function ContactForm() {
  const [state, setState] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!state.name.trim()) e.name = "Informe seu nome.";
    if (!state.email.trim()) e.email = "Informe seu e-mail.";
    else if (!isEmail(state.email)) e.email = "E-mail inválido.";
    if (state.message.trim().length < 10) e.message = "Escreva uma mensagem com pelo menos 10 caracteres.";
    return e;
  }, [state.email, state.message, state.name]);

  const canSubmit = status !== "sending" && Object.keys(errors).length === 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("sending");
    await new Promise((r) => setTimeout(r, 650));

    const subject = encodeURIComponent("Novo contato — Quality Originals");
    const body = encodeURIComponent(
      `Nome: ${state.name}\nE-mail: ${state.email}\n\nMensagem:\n${state.message}`
    );

    window.location.href = `mailto:contato@qualityoriginals.com?subject=${subject}&body=${body}`;

    setStatus("sent");
    setTimeout(() => setStatus("idle"), 1800);
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-white/80">Nome</span>
          <input
            value={state.name}
            onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
            className="h-12 rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white/90 outline-none transition focus:border-white/30 focus:bg-black/40"
            placeholder="Seu nome"
            autoComplete="name"
          />
          {errors.name ? <span className="text-xs text-white/55">{errors.name}</span> : null}
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-white/80">E-mail</span>
          <input
            value={state.email}
            onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
            className="h-12 rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white/90 outline-none transition focus:border-white/30 focus:bg-black/40"
            placeholder="voce@exemplo.com"
            autoComplete="email"
            inputMode="email"
          />
          {errors.email ? <span className="text-xs text-white/55">{errors.email}</span> : null}
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-white/80">Mensagem</span>
        <textarea
          value={state.message}
          onChange={(e) => setState((s) => ({ ...s, message: e.target.value }))}
          className="min-h-[130px] resize-y rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/30 focus:bg-black/40"
          placeholder="Me conte o que você quer criar/editar/reformar..."
        />
        {errors.message ? <span className="text-xs text-white/55">{errors.message}</span> : null}
      </label>

      <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
        <button type="submit" className={"btn-primary " + (canSubmit ? "" : "opacity-60") } disabled={!canSubmit}>
          {status === "sending" ? "Enviando..." : status === "sent" ? "Pronto" : "Enviar"}
        </button>
        <span className="text-sm text-white/55">
          Ou envie direto: <a className="text-white/80 underline decoration-white/20 underline-offset-4" href="mailto:contato@qualityoriginals.com">contato@qualityoriginals.com</a>
        </span>
      </div>
    </form>
  );
}
