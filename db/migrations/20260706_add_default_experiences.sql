INSERT INTO museum_rooms (name, capacity, is_active)
VALUES
  ('Recorridos', 80, true),
  ('Eventos', 120, true),
  ('Fotografia del Zocalo', 50, true),
  ('Sala ludica', 60, true)
ON CONFLICT (name) DO UPDATE
SET is_active = true;
