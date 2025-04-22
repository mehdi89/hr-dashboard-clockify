-- Add email field if it doesn't exist and make it required
ALTER TABLE employees
ADD COLUMN IF NOT EXISTS email VARCHAR(255);

-- Update existing employees with default email
UPDATE employees
SET email = CONCAT(LOWER(REPLACE(name, ' ', '.')), '@example.com')
WHERE email IS NULL;

-- Make email field required
ALTER TABLE employees
ALTER COLUMN email SET NOT NULL;
