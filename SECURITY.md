# Seguridad

## Autenticacion

La aplicacion usa sesiones con token firmado por el servidor. Despues del login, el frontend envia:

```text
Authorization: Bearer <token>
```

El rol no se toma desde cabeceras editables del navegador. El servidor valida la firma del token y usa ese usuario para autorizar cada accion.

Configura en Railway:

```text
APP_SECRET=<valor-largo-aleatorio>
```

Si `APP_SECRET` no existe, el servidor genera uno temporal al iniciar. Eso sirve para desarrollo, pero invalida sesiones en cada reinicio y no debe usarse como configuracion final.

## Contrasenas

Las contrasenas se guardan con hash `scrypt` usando `crypto` de Node.js. Los usuarios antiguos con contrasena en texto se migran automaticamente al primer login exitoso.

Reglas actuales:

- Minimo 8 caracteres para usuarios nuevos o cambio de contrasena.
- Rate limit basico de login: 5 fallos bloquean temporalmente por IP + usuario.

## Autorizacion

Los endpoints administrativos requieren rol `admin`. Los endpoints operativos aceptan `admin`, `registrar` u `operator` donde aplica.

Resumen:

- `admin`: administra usuarios, servicios, historial, auditoria, correcciones y anulaciones.
- `registrar`: registra entradas, valida QR, ve dashboard/reportes y QR generados.
- `operator`: compatibilidad con rol anterior; debe migrarse gradualmente a `registrar`.

## Auditoria

Las acciones importantes se registran en `museum_audit_logs`, incluyendo:

- Login exitoso/fallido.
- Cierre de sesion.
- Creacion/actualizacion/desactivacion de usuarios.
- Creacion/actualizacion/desactivacion de servicios.
- Registro de entrada.
- Validacion de QR.
- Correccion de visitante.
- Anulacion de acceso.

## Anulacion de accesos

Los accesos no se eliminan fisicamente. El administrador puede anular un acceso con motivo obligatorio:

- `museum_access_entries.status = 'voided'`
- `museum_access_entries.notes` guarda el motivo.
- Si hay QR asociado, `museum_qr_tickets.status = 'voided'`.
- La accion queda en auditoria.

## Endpoint de inicializacion

`POST /api/access-users/init` esta protegido por:

```text
SETUP_SECRET=<valor-largo-aleatorio>
```

Para usarlo, envia la cabecera:

```text
X-Setup-Secret: <SETUP_SECRET>
```

El cuerpo puede incluir:

```json
{
  "username": "admin@museo.gov",
  "password": "contrasena-temporal-segura",
  "firstName": "Administrador",
  "lastName": "Museo",
  "role": "admin"
}
```

La contrasena inicial se envia como `password` o se configura temporalmente en `ACCESS_USER_INITIAL_PASSWORD`.

No dejes este secreto expuesto. Usalo solo para inicializacion controlada.

## Pendientes recomendados

- Forzar HTTPS en produccion desde Railway/dominio.
- Rotacion periodica de contrasenas administrativas.
- Backups automaticos de PostgreSQL.
- Alertas ante multiples fallos de login.
- Politica formal de retencion de auditoria.
