-- Add new columns to time_entries table
ALTER TABLE "time_entries" ADD COLUMN "client" varchar(100);
ALTER TABLE "time_entries" ADD COLUMN "description" text;
ALTER TABLE "time_entries" ADD COLUMN "task" varchar(100);
ALTER TABLE "time_entries" ADD COLUMN "group" varchar(100);
ALTER TABLE "time_entries" ADD COLUMN "email" varchar(255);
ALTER TABLE "time_entries" ADD COLUMN "tags" varchar(255);
ALTER TABLE "time_entries" ADD COLUMN "billable" boolean;
ALTER TABLE "time_entries" ADD COLUMN "start_date" date NOT NULL;
ALTER TABLE "time_entries" ADD COLUMN "start_time" time NOT NULL;
ALTER TABLE "time_entries" ADD COLUMN "end_date" date NOT NULL;
ALTER TABLE "time_entries" ADD COLUMN "end_time" time NOT NULL;
ALTER TABLE "time_entries" ADD COLUMN "duration_decimal" decimal(10, 2);
ALTER TABLE "time_entries" ADD COLUMN "unique_entry_id" varchar(255) NOT NULL;

-- Add unique constraint to unique_entry_id
ALTER TABLE "time_entries" ADD CONSTRAINT "time_entries_unique_entry_id_unique" UNIQUE("unique_entry_id");
