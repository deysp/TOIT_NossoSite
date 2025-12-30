import { FormEvent, useMemo } from "react";
import { submitContactRequest } from "../lib/contact";
import { useContactForm } from "../hooks/useContactForm";

interface ContactFormProps {
  onSuccess: () => void;
}

const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const {
    values,
    isSubmitting,
    error,
    successId,
    updateField,
    resetForm,
    contactPayload,
    setSubmissionState,
    setErrorMessage,
    setSuccessIdentifier
  } = useContactForm();

  const whatsappHint = useMemo(() => {
    if (values.preferredContactChannel === "whatsapp") {
      return "Utilize DDI + DDD para acelerarmos o atendimento.";
    }
    return "Caso deseje contato por WhatsApp, selecione essa opção acima.";
  }, [values.preferredContactChannel]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessIdentifier(null);

    if (contactPayload.projectDescription.length < 30) {
      setErrorMessage("Descreva seu projeto com pelo menos 30 caracteres.");
      return;
    }

    if (contactPayload.preferredContactChannel === "whatsapp" && !contactPayload.whatsappNumber) {
      setErrorMessage("Informe o número de WhatsApp para continuarmos.");
      return;
    }

    setSubmissionState(true);

    try {
      const response = await submitContactRequest(contactPayload);
      setSuccessIdentifier(response.contactRequestId);
      resetForm();
      onSuccess();
    } catch (submissionError) {
      const message = submissionError instanceof Error ? submissionError.message : "Erro ao enviar formulário.";
      setErrorMessage(message);
    } finally {
      setSubmissionState(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/80 p-8 shadow-lg shadow-cyan-500/10">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/10 via-transparent to-indigo-600/20"></div>
      <h2 className="text-3xl font-semibold text-white">Descreva seu desafio</h2>
      <p className="mt-3 text-sm text-slate-300">
        Responda em menos de 2 minutos e receba um plano tático diretamente no seu canal favorito.
      </p>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-semibold text-slate-200">Nome completo</span>
            <input
              type="text"
              required
              minLength={3}
              value={values.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-semibold text-slate-200">E-mail corporativo</span>
            <input
              type="email"
              required
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-semibold text-slate-200">Telefone</span>
            <input
              type="tel"
              value={values.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-semibold text-slate-200">Empresa</span>
            <input
              type="text"
              value={values.company}
              onChange={(event) => updateField("company", event.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm">
          <span className="font-semibold text-slate-200">Contexto do projeto</span>
          <textarea
            required
            minLength={30}
            rows={5}
            value={values.projectDescription}
            onChange={(event) => updateField("projectDescription", event.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
          />
          <span className="text-xs text-slate-400">
            Detalhe o problema, metas de prazo e integrações críticas. Utilizamos essas informações para desenhar a primeira sprint.
          </span>
        </label>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-semibold text-slate-200">Canal preferencial</span>
            <select
              value={values.preferredContactChannel}
              onChange={(event) => updateField("preferredContactChannel", event.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none"
            >
              <option value="whatsapp">WhatsApp</option>
              <option value="email">E-mail</option>
              <option value="phone">Ligação</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-semibold text-slate-200">WhatsApp</span>
            <input
              type="tel"
              value={values.whatsappNumber}
              onChange={(event) => updateField("whatsappNumber", event.target.value)}
              disabled={values.preferredContactChannel !== "whatsapp"}
              required={values.preferredContactChannel === "whatsapp"}
              className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none disabled:cursor-not-allowed disabled:border-slate-800 disabled:text-slate-500"
            />
            <span className="text-xs text-slate-400">{whatsappHint}</span>
          </label>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="neon-border inline-flex items-center justify-center rounded-full bg-cyan-500/20 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-cyan-100 transition hover:bg-cyan-500/30 disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? "Enviando briefing..." : "Ativar contato especializado"}
          </button>
          {error && <span className="text-sm text-rose-400">{error}</span>}
          {successId && (
            <span className="text-sm text-emerald-400">
              Recebemos seu briefing. ID de rastreio: {successId}. Entraremos em contato em até 2 horas úteis.
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
