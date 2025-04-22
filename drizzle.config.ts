import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema/*',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'timetable',
    ssl: false,
  },
} satisfies Config;
