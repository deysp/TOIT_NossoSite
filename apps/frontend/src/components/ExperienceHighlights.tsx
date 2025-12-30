const highlights = [
  {
    title: "Cyber-arcade responsivo",
    description:
      "Layout adaptativo que preserva o impacto visual em desktops ultrawide e mobile, com microinterações controladas.",
    metric: "UI neon + glitch controlado"
  },
  {
    title: "Conversão sem atrito",
    description:
      "CTA direto para WhatsApp integrado a automações de qualificação e atribuição de leads em tempo real.",
    metric: "Zero cliques supérfluos"
  },
  {
    title: "Arquitetura confiável",
    description:
      "Backend Express instrumentado com rate limiting, logs auditáveis e PostgreSQL com isolamento multi-tenant.",
    metric: "Enterprise-ready"
  }
];

const ExperienceHighlights = () => {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-semibold sm:text-4xl">Experiência pensada para encantar e converter</h2>
        <p className="mt-4 text-base text-slate-300">
          Cada elemento reforça a autoridade tecnológica da TOIT, guiando o visitante do brilho neon à conversa especializada
          com o time. Nada de passos redundantes: o foco é iniciar projetos sólidos imediatamente.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {highlights.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6 transition hover:border-cyan-400/50"
          >
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{item.description}</p>
            <p className="mt-5 text-xs uppercase tracking-[0.3em] text-cyan-200">{item.metric}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ExperienceHighlights;
