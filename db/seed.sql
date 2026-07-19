BEGIN;

INSERT INTO museum_role_profiles (code, name, description, allowed_modules)
VALUES
  ('admin', 'Administrador', 'Acceso completo a administracion, reportes, servicios, usuarios y registros.', '["dashboard","entrada","salas","usuarios","validar_qr","qr","historial","reportes","auditoria"]'::jsonb),
  ('registrar', 'Registro', 'Registra visitantes, valida QR, consulta QR generados y revisa indicadores operativos.', '["dashboard","entrada","validar_qr","qr","reportes"]'::jsonb)
ON CONFLICT (code) DO UPDATE
SET name = EXCLUDED.name,
    description = EXCLUDED.description,
    allowed_modules = EXCLUDED.allowed_modules,
    is_active = true,
    updated_at = now();

INSERT INTO museum_rooms (name, capacity)
VALUES
  ('Recorridos', 80),
  ('Eventos', 120),
  ('Fotografia del Zocalo', 50),
  ('Sala ludica', 60)
ON CONFLICT (name) DO NOTHING;

WITH visitor_seed AS (
  INSERT INTO museum_visitors (full_name, document_type, document_number, visitor_type, email, phone, country, city)
  VALUES
    ('Camila Rojas', 'Cedula de ciudadania', 'CC-1001', 'General', 'camila@example.com', '+57 300 000 0001', 'Colombia', 'Bogota'),
    ('Andres Morales', 'Cedula de ciudadania', 'CC-1002', 'VIP', 'andres@example.com', '+57 300 000 0002', 'Colombia', 'Medellin'),
    ('Lucia Benitez', 'Tarjeta de identidad', 'TI-1003', 'Estudiante', 'lucia@example.com', '+52 55 0000 0003', 'Mexico', 'Ciudad de Mexico'),
    ('Mateo Vargas', 'Pasaporte', 'PP-1004', 'Grupo', 'mateo@example.com', '+57 300 000 0004', 'Colombia', 'Cali')
  RETURNING id, full_name
),
ticket_seed AS (
  INSERT INTO museum_qr_tickets (ticket_code, visitor_id, valid_until, status, signature)
  SELECT
    'MAC-' || upper(substr(replace(v.id::text, '-', ''), 1, 8)),
    v.id,
    now() + interval '3 hours',
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
