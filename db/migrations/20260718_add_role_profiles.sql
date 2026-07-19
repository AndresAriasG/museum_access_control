CREATE TABLE IF NOT EXISTS museum_role_profiles (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  allowed_modules JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO museum_role_profiles (code, name, description, allowed_modules)
VALUES
  ('admin', 'Administrador', 'Acceso completo a administracion, reportes, servicios, usuarios y registros.', '["dashboard","entrada","salas","usuarios","qr","historial","reportes","auditoria"]'::jsonb),
  ('registrar', 'Registro', 'Registra visitantes y consulta indicadores operativos.', '["dashboard","entrada","reportes"]'::jsonb),
  ('operator', 'Registro', 'Perfil legado compatible con usuarios operativos existentes.', '["dashboard","entrada","reportes"]'::jsonb)
ON CONFLICT (code) DO UPDATE
SET name = EXCLUDED.name,
    description = EXCLUDED.description,
    allowed_modules = EXCLUDED.allowed_modules,
    is_active = true,
    updated_at = now();

ALTER TABLE museum_auth_users
  ALTER COLUMN role SET DEFAULT 'registrar';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'museum_auth_users_role_fkey'
      AND conrelid = 'museum_auth_users'::regclass
  ) THEN
    ALTER TABLE museum_auth_users
      ADD CONSTRAINT museum_auth_users_role_fkey
      FOREIGN KEY (role) REFERENCES museum_role_profiles(code)
      NOT VALID;
  END IF;
END $$;

ALTER TABLE museum_auth_users
  VALIDATE CONSTRAINT museum_auth_users_role_fkey;
