import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { sql } from 'drizzle-orm';

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/timetable',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

// Create a Drizzle ORM instance
export const db = drizzle(pool, { schema });

// Helper function to check database connection
export async function checkConnection() {
  try {
    const result = await db.execute(sql`SELECT NOW()`);
    return { success: true, timestamp: result[0].now };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

// Export for use in migrations
export { schema };