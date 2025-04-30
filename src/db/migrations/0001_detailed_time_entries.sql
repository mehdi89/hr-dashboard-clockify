-- Update time_entries table to use decimal for durationDecimal
ALTER TABLE time_entries
ALTER COLUMN "durationDecimal" TYPE DECIMAL(10, 2);
