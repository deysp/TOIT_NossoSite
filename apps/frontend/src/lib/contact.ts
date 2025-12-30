export interface ContactPayload {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  projectDescription: string;
  preferredContactChannel: "whatsapp" | "email" | "phone";
  whatsappNumber?: string;
}

export interface ContactResponse {
  contactRequestId: string;
  createdAt: string;
}

const resolveApiBaseUrl = (): string => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("VITE_API_BASE_URL is not defined. Configure it in the deployment environment.");
  }
  return baseUrl.replace(/\/$/, "");
};

export const submitContactRequest = async (
  payload: ContactPayload
): Promise<ContactResponse> => {
  const response = await fetch(`${resolveApiBaseUrl()}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: "Unknown error" }));
    const errorMessage = errorBody?.message ?? "Falha ao enviar sua solicitação.";
    throw new Error(errorMessage);
  }

  const json = (await response.json()) as {
    status: string;
    data: ContactResponse;
  };

  return json.data;
};
