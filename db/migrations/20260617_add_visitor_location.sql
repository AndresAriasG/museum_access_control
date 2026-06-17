ALTER TABLE museum_visitors
  ADD COLUMN IF NOT EXISTS country TEXT,
  ADD COLUMN IF NOT EXISTS city TEXT;

CREATE INDEX IF NOT EXISTS idx_museum_visitors_country_city
  ON museum_visitors (country, city);
