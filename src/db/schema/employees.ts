import { pgTable, serial, varchar, date, integer, boolean, text } from 'drizzle-orm/pg-core';

// Define employment types
export enum EmploymentType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  FREELANCE = 'freelance',
}

// Define the employees table
export const employees = pgTable('employees', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  position: varchar('position', { length: 100 }),
  department: varchar('department', { length: 100 }).notNull(),
  employmentType: varchar('employment_type', { length: 50 }).notNull().$type<EmploymentType>(),
  weeklyCommittedHours: integer('weekly_committed_hours').notNull(),
  startDate: date('start_date').notNull(),
  joinDate: date('join_date'),
  isActive: boolean('is_active').default(true).notNull(),
  clockifyName: varchar('clockify_name', { length: 255 }).notNull().unique(),
  bio: text('bio'),
  avatarUrl: varchar('avatar_url', { length: 255 }),
});

// Export types
export type Employee = typeof employees.$inferSelect;
export type NewEmployee = typeof employees.$inferInsert;
