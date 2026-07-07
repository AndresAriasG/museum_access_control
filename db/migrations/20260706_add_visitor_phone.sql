ALTER TABLE museum_visitors
  ADD COLUMN IF NOT EXISTS phone TEXT;

CREATE INDEX IF NOT EXISTS idx_museum_visitors_phone
  ON museum_visitors (phone);
