import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';

// Load environment variables
config();

export default {
  schema: './src/db/schema/*',
  out: './src/db/migrations',
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/timetable',
} satisfies Config;
