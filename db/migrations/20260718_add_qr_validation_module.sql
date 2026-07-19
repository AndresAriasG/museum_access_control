UPDATE museum_role_profiles
SET allowed_modules = '["dashboard","entrada","salas","usuarios","validar_qr","qr","historial","reportes","auditoria"]'::jsonb,
    updated_at = now()
WHERE code = 'admin';

UPDATE museum_role_profiles
SET description = 'Registra visitantes, valida QR y consulta indicadores operativos.',
    allowed_modules = '["dashboard","entrada","validar_qr","reportes"]'::jsonb,
    updated_at = now()
WHERE code IN ('registrar', 'operator');

UPDATE museum_qr_tickets
SET valid_until = LEAST(valid_until, valid_from + interval '3 hours')
WHERE status = 'active';
