const serviceTracks = [
  {
    title: "Discovery imersivo",
    description:
      "Workshops de estratégia e product framing para alinhar objetivos de negócio com arquitetura técnica e KPIs de conversão.",
    badge: "Semana 01",
    highlights: ["Mapeamento de stakeholders", "Canvas de features criticas", "Roadmap priorizado"]
  },
  {
    title: "Desenvolvimento full-stack",
    description:
      "Entrega contínua com React + Tailwind no front, Node + Express no backend e PostgreSQL com isolamento multi-tenant.",
    badge: "Sprint 02-04",
    highlights: ["CI/CD conectado ao Railway", "Logs auditáveis", "Integrações em tempo real"]
  },
  {
    title: "Growth e suporte",
    description:
      "Monitoramento ativo, otimização de performance e squads disponíveis para evoluções sob demanda sem fricção.",
    badge: "Escala",
    highlights: ["Observabilidade 24/7", "Playbooks de expansão", "Backlog colaborativo"]
  }
];

const ServiceShowcase = () => {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">Stack estratégica ponta a ponta</h2>
            <p className="mt-4 max-w-2xl text-base text-slate-300">
              Cada fase foi projetada para reduzir riscos e elevar a experiência de quem contrata software. Tomamos decisões
              baseadas em dados, sempre alinhadas à estética cyber-arcade da marca TOIT.
            </p>
          </div>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {serviceTracks.map((track) => (
            <article
              key={track.title}
              className="group relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/70 p-8 transition duration-300 hover:border-cyan-400/50"
            >
              <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="h-full w-full bg-gradient-to-br from-cyan-500/15 via-transparent to-indigo-500/20" />
              </div>
              <span className="inline-flex items-center rounded-full border border-cyan-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200/80">
                {track.badge}
              </span>
              <h3 className="mt-6 text-2xl font-semibold text-white">{track.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">{track.description}</p>
              <ul className="mt-6 space-y-2 text-sm text-slate-200">
                {track.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
          <article className="overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-900/30 p-8 sm:col-span-2">
            <h3 className="text-2xl font-semibold text-white">Experiência dirigida por dados reais</h3>
            <p className="mt-4 text-sm text-slate-300">
              Instrumentamos toda a jornada com analytics proprietários, dashboards operacionais e rotinas de revisão quinzenal.
              Cada insight alimenta um backlog de evolução contínua, mantendo o ecossistema vibrante e orientado à conversão.
            </p>
            <div className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-800/40 bg-slate-900/60 p-4">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500">SLA</span>
                <p className="mt-2 text-lg font-semibold text-cyan-200">Resolução crítica em até 2h</p>
              </div>
              <div className="rounded-2xl border border-slate-800/40 bg-slate-900/60 p-4">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Quality Gate</span>
                <p className="mt-2 text-lg font-semibold text-cyan-200">Pipeline automatizado</p>
              </div>
              <div className="rounded-2xl border border-slate-800/40 bg-slate-900/60 p-4">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Security</span>
                <p className="mt-2 text-lg font-semibold text-cyan-200">Auditoria multi-tenant</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ServiceShowcase;
