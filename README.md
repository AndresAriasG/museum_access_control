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
- `GET /api/auth-users`
- `POST /api/auth-users`
- `PATCH /api/auth-users/:id`
- `DELETE /api/auth-users/:id`
- `POST /api/entries`
- `GET /api/history`
- `GET /api/reports`
- `GET /api/reports/accesses`
- `POST /api/access-users/init`

Los visitantes guardan tipo de documento, documento, telefono, pais y ciudad en `museum_visitors`.
Los servicios se administran desde el modulo `Servicios` y se guardan en `museum_rooms`.
Los usuarios se separan por rol: `admin` tiene todos los modulos y `registrar` carga/registra visitantes.
La busqueda global se aplica con boton `Buscar` y filtra visitantes, servicios, QR, ciudad, pais, tipo, fecha y estado.
La campana muestra alertas operativas como servicios pendientes o visitantes dentro.
El modulo `Historial` tiene una busqueda propia visible y permite exportar los ingresos filtrados a CSV.
El modulo `Reportes` permite filtrar accesos por rango de fechas, ver rankings y exportar CSV.
El dashboard muestra primero ingresos por dia y debajo el detalle por hora con etiquetas visibles.
El registro valida que el nombre tenga solo letras y que el email tenga formato de correo.
Cada registro de entrada genera un QR por persona, relacionado con `ticketId`, `ticketCode` y `entryId`; el modulo `QR generados` muestra una lista por visitante y permite imprimir los ultimos codigos emitidos.

## Railway

El archivo `railway.json` define:

- Build: `npm run build`
- Start: `npm start`

Variables requeridas:

- `DATABASE_URL`
- `NODE_ENV=production`
