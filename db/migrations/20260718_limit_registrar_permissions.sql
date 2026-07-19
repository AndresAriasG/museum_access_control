UPDATE museum_role_profiles
SET description = 'Registra visitantes y consulta indicadores operativos.',
    allowed_modules = '["dashboard","entrada","reportes"]'::jsonb,
    updated_at = now()
WHERE code IN ('registrar', 'operator');
