import { useCallback, useMemo, useState } from "react";
import type { ContactPayload } from "../lib/contact";

interface ContactFormState extends ContactPayload {}

const createInitialState = (): ContactFormState => ({
  fullName: "",
  email: "",
  phone: "",
  company: "",
  projectDescription: "",
  preferredContactChannel: "whatsapp",
  whatsappNumber: ""
});

export const useContactForm = () => {
  const [values, setValues] = useState<ContactFormState>(createInitialState);
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setValues(createInitialState());
  }, []);

  const updateField = useCallback(
    (field: keyof ContactFormState, value: string) => {
      setValues((prev: ContactFormState) => ({ ...prev, [field]: value }));
    },
    []
  );

  const contactPayload = useMemo<ContactPayload>(() => {
    const payload: ContactPayload = {
      fullName: values.fullName.trim(),
      email: values.email.trim().toLowerCase(),
      phone: values.phone?.trim() || undefined,
      company: values.company?.trim() || undefined,
      projectDescription: values.projectDescription.trim(),
      preferredContactChannel: values.preferredContactChannel,
      whatsappNumber: values.whatsappNumber?.trim() || undefined
    };

    if (payload.preferredContactChannel !== "whatsapp") {
      delete payload.whatsappNumber;
    }

    return payload;
  }, [values]);

  const setSubmissionState = useCallback((submitting: boolean) => {
    setSubmitting(submitting);
  }, []);

  const setErrorMessage = useCallback((message: string | null) => {
    setError(message);
  }, []);

  const setSuccessIdentifier = useCallback((identifier: string | null) => {
    setSuccessId(identifier);
  }, []);

  return {
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
  };
};
