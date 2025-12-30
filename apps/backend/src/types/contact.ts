export interface ContactRequestInput {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  projectDescription: string;
  preferredContactChannel: "whatsapp" | "email" | "phone";
  whatsappNumber?: string;
}

export interface ContactRequestRecord {
  id: string;
  createdAt: string;
}
