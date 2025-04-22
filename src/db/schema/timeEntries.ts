import { pgTable, serial, varchar, date, integer, time, boolean, decimal, text } from 'drizzle-orm/pg-core';

// Define the time entries table
export const timeEntries = pgTable('time_entries', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id').notNull().references(() => employees.id),
  date: date('date').notNull(),
  project: varchar('project', { length: 100 }).notNull(),
  client: varchar('client', { length: 100 }),
  description: text('description'),
  task: varchar('task', { length: 100 }),
  group: varchar('group', { length: 100 }),
  email: varchar('email', { length: 255 }),
  tags: varchar('tags', { length: 255 }),
  billable: boolean('billable'),
  startDate: date('start_date').notNull(),
  startTime: time('start_time').notNull(),
  endDate: date('end_date').notNull(),
  endTime: time('end_time').notNull(),
  hoursWorked: time('hours_worked').notNull(),
  durationDecimal: decimal('duration_decimal', { precision: 10, scale: 2 }),
  uniqueEntryId: varchar('unique_entry_id', { length: 255 }).notNull().unique(),
  importBatchId: integer('import_batch_id').notNull().references(() => importLogs.id),
});

// Export types
export type TimeEntry = typeof timeEntries.$inferSelect;
export type NewTimeEntry = typeof timeEntries.$inferInsert;

// Import the necessary tables
import { employees } from './employees';
import { importLogs } from './importLogs';
