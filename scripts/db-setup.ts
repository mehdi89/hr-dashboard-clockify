import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables
config();

async function setup() {
  console.log('Setting up database...');
  
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL environment variable is not set');
    process.exit(1);
  }
  
  // Create a PostgreSQL connection pool
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  });

  // Create a Drizzle instance
  const db = drizzle(pool);

  // Run migrations
  console.log('Running migrations...');
  try {
    const migrationsPath = path.join(process.cwd(), 'src', 'db', 'migrations');
    console.log('Migrations path:', migrationsPath);
    await migrate(db, { migrationsFolder: migrationsPath });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }

  // Close the pool
  await pool.end();
  console.log('Database setup completed');
}

// Run the setup
setup().catch((error) => {
  console.error('Database setup failed:', error);
  process.exit(1);
});
