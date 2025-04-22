import { pgTable, serial, varchar, date, integer, boolean } from 'drizzle-orm/pg-core';

// Define employment types
export enum EmploymentType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
}

// Define the employees table
export const employees = pgTable('employees', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  department: varchar('department', { length: 100 }).notNull(),
  employmentType: varchar('employment_type', { length: 50 }).notNull().$type<EmploymentType>(),
  weeklyCommittedHours: integer('weekly_committed_hours').notNull(),
  startDate: date('start_date').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  clockifyName: varchar('clockify_name', { length: 255 }).notNull().unique(),
});

// Export types
export type Employee = typeof employees.$inferSelect;
export type NewEmployee = typeof employees.$inferInsert;