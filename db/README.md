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
