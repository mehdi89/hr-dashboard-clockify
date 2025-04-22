-- Update time_entries table to use decimal for duration_decimal
ALTER TABLE time_entries
ALTER COLUMN duration_decimal TYPE DECIMAL(10, 2);
