const whatsappUrl =
  "https://wa.me/554796551998?text=Ol%C3%A1%20equipe%20TOIT!%20Quero%20acelerar%20um%20projeto%20digital.";

interface HeroSectionProps {
  onScrollToContact: () => void;
}

const HeroSection = ({ onScrollToContact }: HeroSectionProps) => {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 cyber-grid">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-violet-600/20"></div>
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-900/60 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-cyan-200/80">
          TOIT · Cyber Arcade Experience
        </span>
        <h1 className="mt-8 text-4xl font-semibold sm:text-5xl lg:text-6xl">
          Software de alta performance com estética que converte
        </h1>
        <p className="mt-6 text-lg text-slate-300">
          A TOIT transforma ambições digitais em plataformas vivas. Combinamos engenharia full-stack, UX
          responsivo e narrativa visual para criar produtos que capturam leads no primeiro contato.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="neon-border inline-flex items-center justify-center rounded-full bg-cyan-500/20 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-cyan-200 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-500/30"
          >
            Conectar no WhatsApp
          </a>
          <button
            onClick={onScrollToContact}
            className="inline-flex items-center justify-center rounded-full border border-slate-700 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-slate-200 transition hover:border-cyan-400 hover:text-cyan-200"
          >
            Agendar uma análise express
          </button>
        </div>
        <dl className="mt-14 grid grid-cols-1 gap-6 text-left sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-5">
            <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">Time-to-market</dt>
            <dd className="mt-3 text-2xl font-semibold text-cyan-200">Sprints quinzenais orientadas a métricas</dd>
          </div>
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-5">
            <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">Disponibilidade</dt>
            <dd className="mt-3 text-2xl font-semibold text-cyan-200">Railway com observabilidade contínua</dd>
          </div>
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-5">
            <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">Stack</dt>
            <dd className="mt-3 text-2xl font-semibold text-cyan-200">React · Node · PostgreSQL</dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default HeroSection;
