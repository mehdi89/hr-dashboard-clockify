CREATE TABLE "employees" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"department" varchar(100) NOT NULL,
	"employment_type" varchar(50) NOT NULL,
	"weekly_committed_hours" integer NOT NULL,
	"start_date" date NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"clockify_name" varchar(255) NOT NULL,
	CONSTRAINT "employees_clockify_name_unique" UNIQUE("clockify_name")
);
--> statement-breakpoint
CREATE TABLE "import_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"import_date" timestamp DEFAULT now() NOT NULL,
	"status" varchar(20) NOT NULL,
	"file_name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "time_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"employee_id" integer NOT NULL,
	"date" date NOT NULL,
	"project" varchar(100) NOT NULL,
	"hours_worked" time NOT NULL,
	"import_batch_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "time_entries" ADD CONSTRAINT "time_entries_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "time_entries" ADD CONSTRAINT "time_entries_import_batch_id_import_logs_id_fk" FOREIGN KEY ("import_batch_id") REFERENCES "public"."import_logs"("id") ON DELETE no action ON UPDATE no action;