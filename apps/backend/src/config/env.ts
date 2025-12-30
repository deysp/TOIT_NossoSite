import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().min(1),
  DATABASE_URL: z.string().url(),
  ALLOWED_ORIGIN: z.string().min(1),
  DEFAULT_OFFICE_ID: z.string().min(1)
});

const parseEnvironment = () => {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const formatted = parsed.error.errors
      .map((error) => `${error.path.join(".")}: ${error.message}`)
      .join("; ");
    throw new Error(`Environment validation failed: ${formatted}`);
  }

  return parsed.data;
};

export const env = parseEnvironment();

export const isProduction = env.NODE_ENV === "production";
