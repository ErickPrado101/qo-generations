import { BackToTop } from "@/components/BackToTop";
import { InteractiveCatalog } from "@/components/InteractiveCatalog";
import { NavbarClient } from "@/components/NavbarClient";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-black/70 dark:text-white/70">
      <span className="h-2 w-2 rounded-full bg-black/70 shadow-[0_0_18px_rgba(0,0,0,0.22)] dark:bg-white dark:shadow-[0_0_18px_rgba(255,255,255,0.65)]" />
      {children}
    </span>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <article className="glass rounded-3xl p-7 transition duration-200 hover:-translate-y-1 hover:border-black/20 dark:hover:border-white/20">
      <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-black/90 dark:text-white">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-black/70 dark:text-white/70">{desc}</p>
    </article>
  );
}

export default function Page() {
  return (
    <div>
      <NavbarClient />
      <BackToTop />

      <main>
        <section id="home" className="relative">
          <div className="container-x grid min-h-screen grid-cols-1 items-center gap-10 pb-16 pt-[120px] sm:pt-[140px] lg:grid-cols-2 lg:gap-12 lg:pb-20">
            <div className="relative">
              <Pill>Criação de marcas editáveis</Pill>
              <h1 className="mt-6 max-w-2xl animate-fadeUp text-balance text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.08em] text-black/90 dark:text-white sm:text-6xl lg:text-7xl">
                Empresas prontas para <span className="accent">nascer</span>.
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-black/70 dark:text-white/70 sm:text-base lg:text-lg">
                A Quality Originals cria conceitos de empresas, identidades visuais e marcas pré-prontas para
                empreendedores que desejam começar com estrutura, presença e potencial de crescimento.
              </p>

              <div className="mt-7 grid grid-cols-1 items-start gap-5 md:grid-cols-[auto,1fr]">
                <a className="btn-primary w-fit" href="#catalogo">
                  Monte seu negócio aqui
                </a>
                <p className="glass rounded-2xl p-4 text-sm leading-relaxed text-black/70 dark:text-white/70 sm:text-base">
                  Explore o catálogo para escolher o tipo de negócio, personalizar a estética da marca e adicionar
                  serviços de assistência, social media e suporte criativo.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="glass relative overflow-hidden rounded-[2.25rem]">
                <div className="absolute inset-4 rounded-[1.7rem] border border-[color:var(--line)]" />

                <div className="relative grid min-h-[420px] place-items-center px-8 sm:min-h-[520px] sm:px-10">
                  <div className="text-center">
                    <div className="mx-auto grid place-items-center">
                      <img
                        src="/image3.webp"
                        alt="Logo Quality Originals"
                        width={1200}
                        height={1200}
                        className="h-auto w-[380px] animate-float opacity-95 drop-shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_0_34px_rgba(255,255,255,0.18)] sm:w-[460px] lg:w-[560px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="glass absolute bottom-5 left-5 right-5 overflow-hidden rounded-2xl sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="flex w-[300%] animate-slide">
                    <div className="w-full px-6 py-5 text-sm leading-relaxed text-black/80 dark:text-white/90">
                      Criamos empresas e marcas com base estratégica para quem quer empreender sem começar do zero.
                    </div>
                    <div className="w-full px-6 py-5 text-sm leading-relaxed text-black/80 dark:text-white/90">
                      Editamos conceito, identidade visual, tom e apresentação para adaptar cada projeto ao seu público.
                    </div>
                    <div className="w-full px-6 py-5 text-sm leading-relaxed text-black/80 dark:text-white/90">
                      Reformamos ideias antigas em negócios modernos, profissionais e prontos para novas oportunidades.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="quem-somos" className="section">
          <div className="container-x">
            <h2 className="section-title">Quem <span className="accent">somos</span></h2>
            <p className="section-desc">
              Somos um estúdio de criação empresarial focado em transformar ideias em marcas estruturadas.
              Desenvolvemos negócios pré-prontos, editáveis e personalizáveis para empreendedores que desejam acelerar
              sua entrada no mercado.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              <Card
                title="Criar"
                desc="Desenvolvemos marcas do zero com nome, direção visual, proposta comercial e estrutura inicial para operação."
              />
              <Card
                title="Editar"
                desc="Adaptamos modelos de empresas para diferentes nichos, públicos, paletas, estilos e objetivos de mercado."
              />
              <Card
                title="Reformar"
                desc="Reposicionamos ideias, marcas e projetos para uma aparência mais moderna e comercialmente atraente."
              />
            </div>
          </div>
        </section>

        <section id="catalogo" className="section">
          <div className="container-x">
            <h2 className="section-title"><span className="accent">Catálogo</span></h2>
            <p className="section-desc">
              Navegue pelo processo de criação. Escolha o tipo de negócio, defina a estilização e adicione serviços
              complementares para montar uma marca alinhada ao seu objetivo.
            </p>

            <InteractiveCatalog />
          </div>
        </section>

        <section id="contato" className="section">
          <div className="container-x">
            <div className="glass rounded-[2.25rem] p-10 md:p-12">
              <div className="grid grid-cols-1 items-center gap-7 md:grid-cols-[1fr,auto]">
                <div>
                  <h2 className="section-title">Fale <span className="accent">conosco</span></h2>
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-black/70 dark:text-white/70 md:text-base">
                    Quer montar uma empresa com aparência profissional, identidade clara e base pronta para crescer?
                    Entre em contato e descubra qual modelo da Quality Originals combina com sua próxima oportunidade.
                  </p>
                </div>
                <a
                  className="btn-primary"
                  href="https://wa.me/5527981717462?text=Ol%C3%A1%21%20Quero%20falar%20com%20um%20agente%20para%20iniciar%20um%20projeto."
                  target="_blank"
                  rel="noreferrer"
                >
                  Falar com nosso agente
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-white/70 py-10 dark:bg-black/70">
        <div className="container-x flex flex-col justify-between gap-4 text-sm text-black/60 dark:text-white/60 md:flex-row">
          <span>© 2026 Quality Originals. Todos os direitos reservados.</span>
          <span>Criar · Editar · Reformar · Expandir</span>
        </div>
      </footer>
    </div>
  );
}
