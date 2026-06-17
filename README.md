# Museum Access Control

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

## Railway

El archivo `railway.json` define:

- Build: `npm run build`
- Start: `npm start`

Variables requeridas:

- `DATABASE_URL`
- `NODE_ENV=production`
