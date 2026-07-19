ALTER TABLE museum_visitors
  ADD COLUMN IF NOT EXISTS document_type TEXT NOT NULL DEFAULT 'Cedula de ciudadania';

CREATE INDEX IF NOT EXISTS idx_museum_visitors_document_type_number
  ON museum_visitors (document_type, document_number);
