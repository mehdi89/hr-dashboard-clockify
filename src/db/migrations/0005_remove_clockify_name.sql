-- Make email unique if it's not already
ALTER TABLE "employees" ADD CONSTRAINT "employees_email_unique" UNIQUE ("email");

-- Remove unique constraint from clockify_name
ALTER TABLE "employees" DROP CONSTRAINT IF EXISTS "employees_clockify_name_unique";

-- Make clockify_name nullable (as a first step before removal)
ALTER TABLE "employees" ALTER COLUMN "clockify_name" DROP NOT NULL;
