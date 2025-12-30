BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS offices (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  office_id TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  project_description TEXT NOT NULL,
  preferred_contact_channel TEXT NOT NULL CHECK (preferred_contact_channel IN ('whatsapp', 'email', 'phone')),
  whatsapp_number TEXT,
  visitor_ip INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT contact_requests_office_fk FOREIGN KEY (office_id) REFERENCES offices (id) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS contact_requests_office_created_at_idx
  ON contact_requests (office_id, created_at DESC);

CREATE INDEX IF NOT EXISTS contact_requests_office_email_idx
  ON contact_requests (office_id, email);

CREATE TABLE IF NOT EXISTS contact_request_audit_log (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  contact_request_id UUID NOT NULL REFERENCES contact_requests (id) ON DELETE CASCADE,
  office_id TEXT NOT NULL,
  action TEXT NOT NULL,
  metadata JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS contact_request_audit_office_idx
  ON contact_request_audit_log (office_id, created_at DESC);

CREATE OR REPLACE FUNCTION touch_contact_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_touch_contact_requests_updated_at ON contact_requests;

CREATE TRIGGER trg_touch_contact_requests_updated_at
BEFORE UPDATE ON contact_requests
FOR EACH ROW
EXECUTE FUNCTION touch_contact_requests_updated_at();

COMMIT;
