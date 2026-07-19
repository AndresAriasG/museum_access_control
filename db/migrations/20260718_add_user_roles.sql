UPDATE museum_auth_users
SET role = 'registrar',
    updated_at = now()
WHERE role = 'operator';

INSERT INTO museum_auth_users (username, password_hash, first_name, last_name, role, is_active)
VALUES
  ('admin@museo.gov', 'museum2026', 'Administrador', 'Museo', 'admin', true),
  ('accesos@museo.gov', 'museum2026', 'Control', 'Accesos', 'registrar', true)
ON CONFLICT (username) DO UPDATE
SET role = EXCLUDED.role,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    is_active = true,
    updated_at = now();
