# Operacion

## Variables de entorno

Configura estas variables en Railway:

```text
DATABASE_URL=postgresql://...
APP_SECRET=<valor-largo-aleatorio>
SETUP_SECRET=<valor-largo-aleatorio>
NODE_ENV=production
```

Opcional:

```text
SESSION_TTL_MS=28800000
ACCESS_USER_INITIAL_PASSWORD=<contrasena-temporal-segura>
```

`SESSION_TTL_MS` controla la duracion de la sesion. El valor por defecto es 8 horas.
`ACCESS_USER_INITIAL_PASSWORD` solo aplica si se usa el endpoint protegido de inicializacion de usuario.

## Roles operativos

- `admin`: control total de administracion.
- `registrar`: registro de visitantes, QR, dashboard y reportes.
- `operator`: rol anterior compatible; se recomienda migrarlo a `registrar`.

## Primer usuario

Para una instalacion nueva, crea el primer administrador con el endpoint protegido `POST /api/access-users/init`, enviando `X-Setup-Secret` y un cuerpo como:

```json
{
  "username": "admin@museo.gov",
  "password": "contrasena-temporal-segura",
  "firstName": "Administrador",
  "lastName": "Museo",
  "role": "admin"
}
```

Luego crea los demas usuarios desde el modulo `Usuarios`.

## Flujo diario

1. El usuario inicia sesion.
2. Registra una entrada manual o por carga masiva.
3. La aplicacion genera un QR por visitante.
4. El QR tiene vigencia de 3 horas.
5. El QR se puede ampliar, descargar como PNG, imprimir o validar desde el modulo `Validar QR`.
6. Reportes e historial se actualizan con los accesos registrados.

El dashboard operativo considera actividad vigente de 3 horas para `Visitantes dentro`, `Servicios activos`, `Servicios en uso` y `Ultimos ingresos`.

## Entrega de QR al visitante

Desde `QR generados`:

- Click en el QR o boton `Ver` para abrirlo grande.
- `Descargar PNG` para guardarlo y enviarlo por WhatsApp, correo manual o cualquier canal.
- `Imprimir` para entrega fisica.

El envio automatico por correo requiere configurar un proveedor SMTP o API transaccional. Para Gmail gratuito se recomienda usar una contrasena de aplicacion con verificacion en dos pasos, o dejarlo para una fase posterior con un proveedor dedicado.

## Carga masiva

Columnas obligatorias:

- `Nombre`
- `Tipo documento`
- `Documento`
- `Pais`
- `Ciudad`

Columnas opcionales:

- `Email`
- `Telefono`
- `Tipo visitante`
- `Servicio`

Si `Servicio` no viene en el archivo, se asigna `Eventos`.

La aplicacion valida antes de registrar:

- Email con formato valido si viene diligenciado.
- Telefono con formato valido si viene diligenciado.
- Nombre solo texto.
- Tipo de documento permitido.
- Campos obligatorios completos.

## Correcciones y anulaciones

Solo `admin` puede corregir datos de visitantes o anular accesos desde `Historial`.

No se eliminan registros fisicamente. Las anulaciones cambian el estado del acceso y del QR asociado, y quedan registradas en auditoria con motivo.

## Despliegue

Despues de subir cambios a GitHub:

```bash
git push origin main
```

Railway debe iniciar un nuevo deploy automaticamente si el proyecto esta conectado al repositorio.

## Verificacion despues de deploy

1. Abrir la aplicacion.
2. Iniciar sesion con un usuario activo.
3. Registrar una entrada de prueba.
4. Confirmar que aparece en Dashboard.
5. Confirmar que el QR aparece en `QR generados`.
6. Validar el QR desde `Validar QR`.
7. Revisar `Auditoria` con usuario admin.
