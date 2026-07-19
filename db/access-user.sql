INSERT INTO museum_auth_users (username, password_hash, first_name, last_name, role)
VALUES ('accesos@museo.gov', 'museum2026', 'Control', 'Accesos', 'registrar')
ON CONFLICT (username) DO UPDATE
SET is_active = true,
    role = EXCLUDED.role,
    updated_at = now();
