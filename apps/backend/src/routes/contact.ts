import { Router } from "express";
import type { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { createContactRequest } from "../services/contact-service.js";
import { extractClientIp } from "../utils/request.js";
import { HttpError } from "../utils/http-error.js";

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    message: "Too many contact attempts from this IP. Please retry in a few minutes."
  }
});

const contactBaseSchema = z.object({
  fullName: z.string().min(3).max(120),
  email: z.string().email(),
  phone: z.string().min(8).max(20).optional(),
  company: z.string().min(2).max(120).optional(),
  projectDescription: z.string().min(30).max(2000),
  preferredContactChannel: z.enum(["whatsapp", "email", "phone"]),
  whatsappNumber: z.string().min(8).max(20).optional()
});

const contactSchema = contactBaseSchema.refine(
  (data: z.infer<typeof contactBaseSchema>) => {
    if (data.preferredContactChannel === "whatsapp") {
      return typeof data.whatsappNumber === "string" && data.whatsappNumber.trim().length > 0;
    }
    return true;
  },
  {
    message: "WhatsApp number is required when the preferred channel is WhatsApp.",
    path: ["whatsappNumber"]
  }
);

export const contactRouter = Router();

contactRouter.post("/contact", contactLimiter, async (request: Request, response: Response, next: NextFunction) => {
  try {
    const parsed = contactSchema.safeParse(request.body);

    if (!parsed.success) {
      throw new HttpError(422, "Invalid contact data", parsed.error.flatten());
    }

    const userAgentHeader = request.headers["user-agent"];
    const userAgent = Array.isArray(userAgentHeader) ? userAgentHeader[0] : userAgentHeader;

    const result = await createContactRequest(parsed.data, {
      ip: extractClientIp(request),
      userAgent
    });

    response.status(201).json({
      status: "success",
      data: {
        contactRequestId: result.id,
        createdAt: result.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
});
