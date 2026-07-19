-- Los usuarios operativos deben crearse desde el modulo Usuarios o desde
-- POST /api/access-users/init con SETUP_SECRET y una contrasena temporal segura.
SELECT 'Usa el endpoint protegido o el modulo Usuarios para crear accesos operativos.' AS notice;
