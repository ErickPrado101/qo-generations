"use client";

import { useEffect, useMemo, useState } from "react";

type CatalogSelections = {
  tipo: string | null;
  estilo: string | null;
  assist: string[];
};

const TIPOS = ["Loja física", "Loja online", "Marca de roupa", "Estética e beleza", "Alimentação", "Startup digital"] as const;
const ESTILOS = ["Minimalista", "Luxo moderno", "Tecnológico", "Urbano", "Corporativo", "Premium metálico"] as const;
const ASSIST = [
  "Social media",
  "Posts de lançamento",
  "Apresentação comercial",
  "Rebranding",
  "Manual da marca",
  "Consultoria visual"
] as const;

type StepId = 1 | 2 | 3;

function OptionButton({
  selected,
  children,
  onClick
}: {
  selected: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "group rounded-2xl border p-4 text-left text-sm transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40 dark:focus-visible:outline-white/40 sm:p-5 " +
        (selected
          ? "border-black/15 bg-white/85 text-black shadow-[0_18px_60px_rgba(0,0,0,0.12)] dark:border-white/25 dark:bg-white/[0.08] dark:text-white"
          : "border-black/10 bg-white/70 text-black/80 hover:-translate-y-1 hover:border-black/25 hover:bg-white/90 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/85 dark:hover:border-white/20 dark:hover:bg-white/[0.07]")
      }
    >
      <div className="flex items-center justify-between gap-4">
        <span>{children}</span>
        <span
          className={
            "h-2.5 w-2.5 rounded-full transition " +
            (selected
              ? "bg-black/70 shadow-[0_0_18px_rgba(0,0,0,0.25)] dark:bg-white/80 dark:shadow-[0_0_18px_rgba(255,255,255,0.22)]"
              : "bg-black/20 group-hover:bg-black/35 dark:bg-white/15 dark:group-hover:bg-white/25")
          }
        />
      </div>
    </button>
  );
}

export function InteractiveCatalog() {
  const [sel, setSel] = useState<CatalogSelections>({ tipo: null, estilo: null, assist: [] });
  const [step, setStep] = useState<StepId>(1);

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#", "");
      if (h === "tipo-negocio") setStep(1);
      if (h === "estilizacao") setStep(2);
      if (h === "assistencia") setStep(3);
    };

    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const summary = useMemo(() => {
    const parts: string[] = [];
    if (sel.tipo) parts.push(`Tipo: ${sel.tipo}`);
    if (sel.estilo) parts.push(`Estilo: ${sel.estilo}`);
    if (sel.assist.length) parts.push(`Assistência: ${sel.assist.join(", ")}`);
    return parts.length ? parts.join(" · ") : "Selecione opções para montar sua marca.";
  }, [sel.assist, sel.estilo, sel.tipo]);

  const whatsappHref = useMemo(() => {
    const msg =
      `Olá! Quero montar um projeto com as opções:%0A` +
      `- Tipo: ${encodeURIComponent(sel.tipo ?? "(não definido)")}%0A` +
      `- Estilo: ${encodeURIComponent(sel.estilo ?? "(não definido)")}%0A` +
      `- Assistência: ${encodeURIComponent(sel.assist.length ? sel.assist.join(", ") : "(nenhuma)")}%0A%0A` +
      `Pode me orientar nos próximos passos?`;

    return `https://wa.me/5527981717462?text=${msg}`;
  }, [sel.assist, sel.estilo, sel.tipo]);

  const progress = useMemo(() => {
    let done = 0;
    if (sel.tipo) done += 1;
    if (sel.estilo) done += 1;
    if (sel.assist.length) done += 1;
    return Math.round((done / 3) * 100);
  }, [sel.assist.length, sel.estilo, sel.tipo]);

  const canGoNext = useMemo(() => {
    if (step === 1) return Boolean(sel.tipo);
    if (step === 2) return Boolean(sel.estilo);
    return true;
  }, [sel.estilo, sel.tipo, step]);

  const stepTitle = step === 1 ? "1 · Tipo de negócio" : step === 2 ? "2 · Estilo" : "3 · Assistência";

  function goTo(next: StepId) {
    setStep(next);
    const hash = next === 1 ? "#tipo-negocio" : next === 2 ? "#estilizacao" : "#assistencia";
    if (typeof window !== "undefined") window.history.replaceState(null, "", hash);
  }

  function Badge({ label }: { label: string }) {
    return (
      <span className="inline-flex items-center rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-semibold text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
        {label}
      </span>
    );
  }

  function StepChip({ id, label }: { id: StepId; label: string }) {
    const active = id === step;
    return (
      <button
        type="button"
        onClick={() => goTo(id)}
        className={
          "rounded-full border px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] transition " +
          (active
            ? "border-black/20 bg-white/80 text-black/80 dark:border-white/25 dark:bg-white/[0.08] dark:text-white"
            : "border-black/10 bg-white/60 text-black/60 hover:border-black/25 hover:bg-white/80 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/70 dark:hover:bg-white/[0.07]")
        }
      >
        {label}
      </button>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-7 lg:grid-cols-[1fr,360px]">
      <div className="rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05] dark:shadow-glass sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-black/70 dark:text-white/70">
              Monte sua marca em 3 passos
            </div>
            <div className="mt-2 text-sm text-black/65 dark:text-white/65">{stepTitle}</div>
          </div>

          <div className="flex flex-wrap gap-2">
            <StepChip id={1} label="Tipo" />
            <StepChip id={2} label="Estilo" />
            <StepChip id={3} label="Assistência" />
          </div>
        </div>

        <div className="mt-5 h-2 w-full overflow-hidden rounded-full border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-black/40 transition-all dark:bg-white/60"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-6">
          <section id="tipo-negocio" className={step === 1 ? "block" : "hidden"}>
            <h3 className="text-2xl font-extrabold uppercase tracking-[-0.04em] text-black/90 dark:text-white">
              Escolha o tipo de negócio
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/65 dark:text-white/65 md:text-base">
              Selecione o segmento principal. Isso define o conceito base e a estrutura inicial.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {TIPOS.map((opt) => (
                <OptionButton
                  key={opt}
                  selected={sel.tipo === opt}
                  onClick={() => setSel((s) => ({ ...s, tipo: opt }))}
                >
                  {opt}
                </OptionButton>
              ))}
            </div>
          </section>

          <section id="estilizacao" className={step === 2 ? "block" : "hidden"}>
            <h3 className="text-2xl font-extrabold uppercase tracking-[-0.04em] text-black/90 dark:text-white">
              Defina o estilo
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/65 dark:text-white/65 md:text-base">
              Escolha a direção visual. Isso guia logo, paleta, tipografia e linguagem.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ESTILOS.map((opt) => (
                <OptionButton
                  key={opt}
                  selected={sel.estilo === opt}
                  onClick={() => setSel((s) => ({ ...s, estilo: opt }))}
                >
                  {opt}
                </OptionButton>
              ))}
            </div>
          </section>

          <section id="assistencia" className={step === 3 ? "block" : "hidden"}>
            <h3 className="text-2xl font-extrabold uppercase tracking-[-0.04em] text-black/90 dark:text-white">
              Escolha assistências (opcional)
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/65 dark:text-white/65 md:text-base">
              Selecione o que você precisa para lançar mais rápido. Você pode escolher mais de um.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ASSIST.map((opt) => {
                const selected = sel.assist.includes(opt);
                return (
                  <OptionButton
                    key={opt}
                    selected={selected}
                    onClick={() =>
                      setSel((s) => ({
                        ...s,
                        assist: selected ? s.assist.filter((x) => x !== opt) : [...s.assist, opt]
                      }))
                    }
                  >
                    {opt}
                  </OptionButton>
                );
              })}
            </div>
          </section>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => goTo((step === 1 ? 1 : (step - 1)) as StepId)}
            disabled={step === 1}
            className={
              "rounded-2xl border px-5 py-3 text-xs font-extrabold uppercase tracking-[0.12em] transition " +
              (step === 1
                ? "border-black/10 bg-black/5 text-black/35 dark:border-white/10 dark:bg-white/5 dark:text-white/35"
                : "border-black/10 bg-white/70 text-black/70 hover:border-black/25 hover:bg-white/90 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-black/45")
            }
          >
            Voltar
          </button>

          <button
            type="button"
            onClick={() => goTo((step === 3 ? 3 : (step + 1)) as StepId)}
            disabled={step === 3 || !canGoNext}
            className={
              "rounded-2xl border px-5 py-3 text-xs font-extrabold uppercase tracking-[0.12em] transition " +
              (step === 3 || !canGoNext
                ? "border-black/10 bg-black/5 text-black/35 dark:border-white/10 dark:bg-white/5 dark:text-white/35"
                : "border-black/10 bg-white/70 text-black/70 hover:border-black/25 hover:bg-white/90 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-black/45")
            }
          >
            Próximo
          </button>
        </div>
      </div>

      <aside className="glass h-fit rounded-[2rem] p-4 sm:p-5 lg:sticky lg:top-[96px]">
        <div className="rounded-2xl border border-black/10 bg-white/70 p-4 shadow-soft dark:border-white/10 dark:bg-white/[0.05] sm:p-5">
          <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-black/70 dark:text-white/70">
            Sua seleção
          </div>
          <div className="mt-3 text-sm leading-relaxed text-black/65 dark:text-white/70">{summary}</div>

          <div className="mt-4 flex flex-wrap gap-2">
            {sel.tipo ? <Badge label={sel.tipo} /> : null}
            {sel.estilo ? <Badge label={sel.estilo} /> : null}
            {sel.assist.map((a) => (
              <Badge key={a} label={a} />
            ))}
          </div>

          <div className="mt-6 grid gap-3">
            <a className="btn-primary w-full justify-center" href={whatsappHref} target="_blank" rel="noreferrer">
              Falar com nosso agente
            </a>
            <button
              type="button"
              onClick={() => {
                setSel({ tipo: null, estilo: null, assist: [] });
                goTo(1);
              }}
              className="rounded-2xl border border-black/10 bg-white/70 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-black/70 transition hover:border-black/25 hover:bg-white/90 dark:border-white/10 dark:bg-white/5 dark:text-white/75"
            >
              Recomeçar
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-black/10 bg-white/80 p-4 text-sm text-black/65 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/70">
            Dica: se você quiser lançar rápido, selecione pelo menos 1 item de assistência.
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-black/10 bg-white/80 p-4 text-sm text-black/65 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/70">
          Precisa de ajuda para escolher? Comece pelo tipo e eu adapto o resto com base no seu público.
        </div>
      </aside>
    </div>
  );
}
