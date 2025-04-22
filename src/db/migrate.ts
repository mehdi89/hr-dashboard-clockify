import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import { schema } from './schema';

// This script runs database migrations to ensure the database schema is up to date
async function runMigration() {
  // Create a PostgreSQL connection pool
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/timetable',
  });

  // Create a Drizzle instance
  const db = drizzle(pool);

  // Run the migrations
  console.log('Running migrations...');
  
  try {
    await migrate(db, { migrationsFolder: './src/db/migrations' });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }

  // Close the pool
  await pool.end();
}

// Run the migration
runMigration();