CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS museum_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id UUID REFERENCES museum_auth_users(id) ON DELETE SET NULL,
  actor_username TEXT,
  actor_role TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_museum_audit_logs_created_at
  ON museum_audit_logs (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_museum_audit_logs_actor
  ON museum_audit_logs (actor_username, actor_role);

CREATE INDEX IF NOT EXISTS idx_museum_audit_logs_action
  ON museum_audit_logs (action);

UPDATE museum_role_profiles
SET allowed_modules = '["dashboard","entrada","salas","usuarios","qr","historial","reportes","auditoria"]'::jsonb,
    updated_at = now()
WHERE code = 'admin';
