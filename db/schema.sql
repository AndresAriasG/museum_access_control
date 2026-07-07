BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS museum_auth_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'operator',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS museum_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS museum_visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  document_number TEXT,
  visitor_type TEXT NOT NULL DEFAULT 'General',
  email TEXT,
  phone TEXT,
  country TEXT,
  city TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS museum_qr_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_code TEXT NOT NULL UNIQUE,
  visitor_id UUID REFERENCES museum_visitors(id) ON DELETE SET NULL,
  valid_from TIMESTAMPTZ NOT NULL DEFAULT now(),
  valid_until TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  signature TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS museum_access_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id UUID NOT NULL REFERENCES museum_visitors(id) ON DELETE CASCADE,
  room_id UUID REFERENCES museum_rooms(id) ON DELETE SET NULL,
  ticket_id UUID REFERENCES museum_qr_tickets(id) ON DELETE SET NULL,
  entered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  exited_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'inside',
  validated_by UUID REFERENCES museum_auth_users(id) ON DELETE SET NULL,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_museum_access_entries_entered_at
  ON museum_access_entries (entered_at DESC);

CREATE INDEX IF NOT EXISTS idx_museum_access_entries_status
  ON museum_access_entries (status);

CREATE INDEX IF NOT EXISTS idx_museum_qr_tickets_code
  ON museum_qr_tickets (ticket_code);

CREATE OR REPLACE VIEW museum_daily_kpis AS
SELECT
  CURRENT_DATE AS report_date,
  COUNT(*) FILTER (WHERE entered_at::date = CURRENT_DATE) AS visitors_today,
  COUNT(*) FILTER (WHERE entered_at::date = CURRENT_DATE AND ticket_id IS NOT NULL) AS qr_validations_today,
  COUNT(*) FILTER (WHERE status = 'inside') AS visitors_inside
FROM museum_access_entries;

COMMIT;
