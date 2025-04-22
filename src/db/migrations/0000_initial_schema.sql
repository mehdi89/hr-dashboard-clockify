-- Create employees table
CREATE TABLE IF NOT EXISTS "employees" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "department" VARCHAR(100) NOT NULL,
  "employmentType" VARCHAR(50) NOT NULL,
  "weeklyCommittedHours" INTEGER NOT NULL,
  "startDate" DATE NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "clockifyName" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255),
  "phone" VARCHAR(50),
  "position" VARCHAR(100),
  "joinDate" DATE,
  "bio" TEXT,
  "avatarUrl" VARCHAR(255),
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create import_logs table
CREATE TABLE IF NOT EXISTS "import_logs" (
  "id" SERIAL PRIMARY KEY,
  "startDate" DATE NOT NULL,
  "endDate" DATE NOT NULL,
  "importDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "status" VARCHAR(50) NOT NULL,
  "fileName" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create time_entries table
CREATE TABLE IF NOT EXISTS "time_entries" (
  "id" SERIAL PRIMARY KEY,
  "employeeId" INTEGER NOT NULL REFERENCES "employees"("id") ON DELETE CASCADE,
  "date" DATE NOT NULL,
  "project" VARCHAR(255) NOT NULL,
  "client" VARCHAR(255),
  "description" TEXT,
  "task" VARCHAR(255),
  "group" VARCHAR(255),
  "email" VARCHAR(255),
  "tags" VARCHAR(255),
  "startDate" DATE NOT NULL,
  "startTime" VARCHAR(50) NOT NULL,
  "endDate" DATE NOT NULL,
  "endTime" VARCHAR(50) NOT NULL,
  "hoursWorked" VARCHAR(50) NOT NULL,
  "durationDecimal" VARCHAR(50) NOT NULL,
  "uniqueEntryId" VARCHAR(255) NOT NULL UNIQUE,
  "importBatchId" INTEGER NOT NULL REFERENCES "import_logs"("id") ON DELETE CASCADE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "time_entries_employee_id_idx" ON "time_entries"("employeeId");
CREATE INDEX IF NOT EXISTS "time_entries_date_idx" ON "time_entries"("date");
CREATE INDEX IF NOT EXISTS "time_entries_project_idx" ON "time_entries"("project");
CREATE INDEX IF NOT EXISTS "time_entries_import_batch_id_idx" ON "time_entries"("importBatchId");
