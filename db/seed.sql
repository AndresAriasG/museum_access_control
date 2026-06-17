BEGIN;

INSERT INTO museum_auth_users (username, password_hash, first_name, last_name, role)
VALUES
  ('admin@museo.gov', 'museum2026', 'Administrador', 'Museo', 'admin'),
  ('operador@museo.gov', 'museum2026', 'Operador', 'Accesos', 'operator'),
  ('accesos@museo.gov', 'museum2026', 'Control', 'Accesos', 'operator')
ON CONFLICT (username) DO NOTHING;

INSERT INTO museum_rooms (name, capacity)
VALUES
  ('Arte Moderno', 180),
  ('Galeria Colonial', 140),
  ('Ciencias Naturales', 120),
  ('Auditorio', 260)
ON CONFLICT (name) DO NOTHING;

WITH visitor_seed AS (
  INSERT INTO museum_visitors (full_name, document_number, visitor_type, email)
  VALUES
    ('Camila Rojas', 'CC-1001', 'General', 'camila@example.com'),
    ('Andres Morales', 'CC-1002', 'VIP', 'andres@example.com'),
    ('Lucia Benitez', 'TI-1003', 'Estudiante', 'lucia@example.com'),
    ('Mateo Vargas', 'CC-1004', 'Grupo', 'mateo@example.com')
  RETURNING id, full_name
),
ticket_seed AS (
  INSERT INTO museum_qr_tickets (ticket_code, visitor_id, valid_until, status, signature)
  SELECT
    'MAC-' || upper(substr(replace(v.id::text, '-', ''), 1, 8)),
    v.id,
    now() + interval '8 hours',
    'active',
    'QR-SHA256'
  FROM visitor_seed v
  ON CONFLICT (ticket_code) DO NOTHING
  RETURNING id, visitor_id
)
INSERT INTO museum_access_entries (visitor_id, room_id, ticket_id, status, notes)
SELECT
  t.visitor_id,
  r.id,
  t.id,
  'inside',
  'Seed inicial para dashboard'
FROM ticket_seed t
CROSS JOIN LATERAL (
  SELECT id FROM museum_rooms ORDER BY name LIMIT 1
) r;

COMMIT;
