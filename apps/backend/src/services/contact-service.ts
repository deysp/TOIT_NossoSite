import { env } from "../config/index.js";
import { pool } from "../db/pool.js";
import { logger } from "../logging/logger.js";
import type { ContactRequestInput, ContactRequestRecord } from "../types/contact.js";
import { HttpError } from "../utils/http-error.js";

interface ContactRequestContext {
  ip: string | null;
  userAgent: string | undefined;
}

const INSERT_CONTACT_REQUEST = `
  INSERT INTO contact_requests (
    office_id,
    full_name,
    email,
    phone,
    company,
    project_description,
    preferred_contact_channel,
    whatsapp_number,
    visitor_ip,
    user_agent
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  RETURNING id, created_at
`;

const INSERT_AUDIT_LOG = `
  INSERT INTO contact_request_audit_log (
    contact_request_id,
    office_id,
    action,
    metadata
  )
  VALUES ($1, $2, $3, $4)
`;

export const createContactRequest = async (
  payload: ContactRequestInput,
  context: ContactRequestContext
): Promise<ContactRequestRecord> => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const contactValues = [
      env.DEFAULT_OFFICE_ID,
      payload.fullName,
      payload.email,
      payload.phone ?? null,
      payload.company ?? null,
      payload.projectDescription,
      payload.preferredContactChannel,
      payload.whatsappNumber ?? null,
      context.ip,
      context.userAgent ?? null
    ];

    const insertedContact = await client.query(INSERT_CONTACT_REQUEST, contactValues);
    const contactRow = insertedContact.rows[0];

    if (!contactRow) {
      throw new HttpError(500, "Failed to persist contact request");
    }

    const auditMetadata = {
      preferredContactChannel: payload.preferredContactChannel,
      submittedEmail: payload.email,
      clientIp: context.ip,
      userAgent: context.userAgent ?? null
    };

    await client.query(INSERT_AUDIT_LOG, [
      contactRow.id,
      env.DEFAULT_OFFICE_ID,
      "created",
      JSON.stringify(auditMetadata)
    ]);

    await client.query("COMMIT");

    const createdAtValue = contactRow.created_at instanceof Date
      ? contactRow.created_at
      : new Date(contactRow.created_at);

    return {
      id: contactRow.id,
      createdAt: createdAtValue.toISOString()
    };
  } catch (error) {
    await client.query("ROLLBACK");
    logger.error({ err: error }, "Failed to create contact request");
    if (error instanceof HttpError) {
      throw error;
    }
    throw new HttpError(500, "Unexpected error while creating contact request");
  } finally {
    client.release();
  }
};
