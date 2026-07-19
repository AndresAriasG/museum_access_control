# Museo del Zocalo Control de Acceso

Interfaz React + Vite para control de acceso de museo, con backend Express preparado para PostgreSQL y Railway.

## Desarrollo

```bash
npm install
npm run dev
```

## Produccion

```bash
npm install
npm run build
npm start
```

El servidor Express sirve el frontend compilado desde `dist/` y expone endpoints bajo `/api`.

## Base de datos

Configura `DATABASE_URL` con una base PostgreSQL y ejecuta:

```bash
npm run db:schema
npm run db:seed
```

Ver mas detalles en `db/README.md`.

Usuario operativo para validar entradas:

```text
accesos@museo.gov
museum2026
```

## API conectada

- `POST /api/login`
- `GET /api/dashboard`
- `GET /api/rooms`
- `POST /api/rooms`
- `PUT /api/rooms/:id`
- `DELETE /api/rooms/:id`
- `GET /api/role-profiles`
- `GET /api/auth-users`
- `POST /api/auth-users`
- `PATCH /api/auth-users/:id`
- `DELETE /api/auth-users/:id`
- `POST /api/entries`
- `POST /api/qr/validate`
- `GET /api/history`
- `GET /api/reports`
- `GET /api/reports/accesses`
- `GET /api/audit-logs`
- `POST /api/audit-events`
- `POST /api/access-users/init`

Los visitantes guardan nombre, tipo de documento, documento y servicio como datos obligatorios; tipo de visitante usa `General` por defecto y email, telefono, pais y ciudad son opcionales en `museum_visitors`.
Los servicios se administran desde el modulo `Servicios` y se guardan en `museum_rooms`.
Los usuarios se separan por perfiles en `museum_role_profiles`: `admin` tiene todos los modulos y `registrar` ve Dashboard, Registrar Entrada, Validar QR, QR generados y Reportes.
El modulo `Auditoria` solo esta disponible para administradores y muestra acciones relevantes hechas por los usuarios.
La busqueda global se aplica con boton `Buscar` y filtra visitantes, servicios, QR, ciudad, pais, tipo, fecha y estado.
La campana muestra alertas operativas como servicios pendientes o visitantes dentro.
El modulo `Historial` tiene una busqueda propia visible y permite exportar los ingresos filtrados a CSV.
El modulo `Reportes` permite filtrar accesos por rango de fechas, ver rankings y exportar CSV.
El dashboard muestra primero ingresos por dia y debajo el detalle por hora con etiquetas visibles.
El registro valida que el nombre tenga solo letras; si se diligencia email o telefono, tambien valida su formato.
Cada registro de entrada genera un QR por persona, relacionado con `ticketId`, `ticketCode` y `entryId`, valido por 3 horas; los QR nuevos apuntan a `/?qr=CODIGO` para que la camara nativa del celular abra la validacion, y el modulo `Validar QR` tambien permite pegar el codigo o enlace manualmente.

## Railway

El archivo `railway.json` define:

- Build: `npm run build`
- Start: `npm start`

Variables requeridas:

- `DATABASE_URL`
- `NODE_ENV=production`
