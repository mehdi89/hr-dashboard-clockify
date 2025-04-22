import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env.production' });

// This script runs database migrations to ensure the database schema is up to date
async function setupDatabase() {
  console.log('Starting database setup...');
  
  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL environment variable not set!');
    process.exit(1);
  }
  
  // Create a PostgreSQL connection pool
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  // Create a Drizzle instance
  const db = drizzle(pool);

  try {
    // Run the migrations
    console.log('Running database migrations...');
    await migrate(db, { migrationsFolder: './src/db/migrations' });
    console.log('Migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }

  // Close the pool
  await pool.end();
  console.log('Database setup completed!');
}

// Run the setup
setupDatabase()
  .then(() => {
    console.log('Database is ready for use.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Unexpected error during database setup:', err);
    process.exit(1);
  });