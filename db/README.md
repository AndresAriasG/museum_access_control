# Base de datos

Este proyecto esta preparado para PostgreSQL en Railway mediante la variable `DATABASE_URL`.

## Despliegue en Railway

1. Crear un servicio PostgreSQL en Railway.
2. Copiar la variable `DATABASE_URL` del servicio PostgreSQL.
3. Agregar esa variable al servicio web `museum_access_control`.
4. Ejecutar el schema y seed desde una terminal autenticada en Railway o desde local:

```bash
npm run db:schema
npm run db:seed
```

Tambien puedes ejecutar todo junto:

```bash
npm run db:reset
```

Para asegurar el usuario operativo que valida entradas:

```bash
npm run db:access-user
```

Para separar usuarios por roles en una base existente:

```sql
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
```

Si tu base ya existia antes de capturar pais y ciudad, ejecuta:

```sql
ALTER TABLE museum_visitors
  ADD COLUMN IF NOT EXISTS country TEXT,
  ADD COLUMN IF NOT EXISTS city TEXT;

CREATE INDEX IF NOT EXISTS idx_museum_visitors_country_city
  ON museum_visitors (country, city);
```

Para capturar telefono en una base existente:

```sql
ALTER TABLE museum_visitors
  ADD COLUMN IF NOT EXISTS phone TEXT;

CREATE INDEX IF NOT EXISTS idx_museum_visitors_phone
  ON museum_visitors (phone);
```

Para capturar el tipo de documento en una base existente:

```sql
ALTER TABLE museum_visitors
  ADD COLUMN IF NOT EXISTS document_type TEXT NOT NULL DEFAULT 'Cedula de ciudadania';

CREATE INDEX IF NOT EXISTS idx_museum_visitors_document_type_number
  ON museum_visitors (document_type, document_number);
```

Para agregar los servicios iniciales en una base existente:

```sql
INSERT INTO museum_rooms (name, capacity, is_active)
VALUES
  ('Recorridos', 80, true),
  ('Eventos', 120, true),
  ('Fotografia del Zocalo', 50, true),
  ('Sala ludica', 60, true)
ON CONFLICT (name) DO UPDATE
SET is_active = true;
```

## Usuario inicial

```text
Usuario: admin@museo.gov
Password: museum2026
```

Usuario operativo:

```text
Usuario: accesos@museo.gov
Password: museum2026
```

La columna se llama `password_hash` para dejar listo el cambio a bcrypt/JWT, pero el MVP conserva comparacion directa para coincidir con el backend existente.
