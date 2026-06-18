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
- `POST /api/entries`
- `POST /api/qr/validate`
- `GET /api/history`
- `GET /api/reports`
- `POST /api/access-users/init`

Los visitantes guardan pais y ciudad en `museum_visitors.country` y `museum_visitors.city`.

## Railway

El archivo `railway.json` define:

- Build: `npm run build`
- Start: `npm start`

Variables requeridas:

- `DATABASE_URL`
- `NODE_ENV=production`
