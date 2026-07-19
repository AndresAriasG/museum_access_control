UPDATE museum_role_profiles
SET description = 'Registra visitantes, valida QR, consulta QR generados y revisa indicadores operativos.',
    allowed_modules = '["dashboard","entrada","validar_qr","qr","reportes"]'::jsonb,
    updated_at = now()
WHERE code IN ('registrar', 'operator');
