-- Remove billable column from time_entries table
ALTER TABLE "time_entries" DROP COLUMN IF EXISTS "billable";
