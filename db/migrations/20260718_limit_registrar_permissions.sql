UPDATE museum_role_profiles
SET description = 'Registra visitantes, valida QR y consulta indicadores operativos.',
    allowed_modules = '["dashboard","entrada","validar_qr","reportes"]'::jsonb,
    updated_at = now()
WHERE code IN ('registrar', 'operator');
