import { useRef } from "react";
import ContactForm from "./components/ContactForm";
import ExperienceHighlights from "./components/ExperienceHighlights";
import HeroSection from "./components/HeroSection";
import ServiceShowcase from "./components/ServiceShowcase";

const App = () => {
  const contactSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToContact = () => {
    contactSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleFormSuccess = () => {
    contactSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500"></span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">TOIT</p>
              <p className="text-xs text-slate-400">Ecossistema digital cyber-arcade</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 sm:flex">
            <button onClick={scrollToContact} className="hover:text-cyan-200">
              Atendimento imediato
            </button>
            <a href="https://wa.me/554796551998" target="_blank" rel="noreferrer" className="hover:text-cyan-200">
              WhatsApp
            </a>
          </nav>
        </div>
      </header>
      <main>
        <HeroSection onScrollToContact={scrollToContact} />
        <ExperienceHighlights />
        <ServiceShowcase />
        <section ref={contactSectionRef} className="px-6 py-24 sm:py-32">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.2fr,1fr]">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-white">Acesso direto ao squad TOIT</h2>
              <p className="text-sm text-slate-300">
                Ao enviar o briefing, você é direcionado para uma conversa estratégica com especialistas que atuam em
                projetos corporativos de alta complexidade. Todas as interações são auditadas e registradas.
              </p>
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400"></span>
                  Atendimento orquestrado pelo hub Railway com rotas seguras e monitoradas.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400"></span>
                  Logs de auditoria garantem rastreabilidade de cada proposta e movimentação de lead.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400"></span>
                  Todo contato respeita LGPD, com armazenamento criptografado no PostgreSQL multi-tenant.
                </li>
              </ul>
              <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-5 text-sm text-cyan-100">
                <p className="font-semibold uppercase tracking-[0.3em]">Canal direto</p>
                <p className="mt-2">
                  Precisa acelerar agora? WhatsApp: <strong>+55 47 9655-1998</strong>.
                </p>
              </div>
            </div>
            <ContactForm onSuccess={handleFormSuccess} />
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-800/80 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TOIT · OP Technology Ltda. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="mailto:contato@toit.com.br" className="hover:text-cyan-200">
              contato@toit.com.br
            </a>
            <a href="https://wa.me/554796551998" target="_blank" rel="noreferrer" className="hover:text-cyan-200">
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
