import { pgTable, serial, varchar, date, timestamp, boolean } from 'drizzle-orm/pg-core';

// Define import status types
export enum ImportStatus {
  SUCCESS = 'successful',
  FAILED = 'failed',
}

// Define the import logs table
export const importLogs = pgTable('import_logs', {
  id: serial('id').primaryKey(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  importDate: timestamp('import_date').defaultNow().notNull(),
  status: varchar('status', { length: 20 }).notNull().$type<ImportStatus>(),
  fileName: varchar('file_name', { length: 255 }).notNull(),
});

// Export types
export type ImportLog = typeof importLogs.$inferSelect;
export type NewImportLog = typeof importLogs.$inferInsert;