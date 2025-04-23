import { db } from '../src/db';
import { sql } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

async function createUsersTable() {
  try {
    console.log('Creating users table...');
    
    // Create the users table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" SERIAL PRIMARY KEY,
        "username" VARCHAR(255) NOT NULL UNIQUE,
        "password_hash" VARCHAR(255) NOT NULL,
        "name" VARCHAR(255),
        "email" VARCHAR(255),
        "role" VARCHAR(50) DEFAULT 'user',
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Users table created successfully');
    
    // Check if admin user already exists
    const existingUsers = await db.execute(sql`
      SELECT * FROM "users" WHERE "username" = 'admin' LIMIT 1;
    `);
    
    if (existingUsers.rows && existingUsers.rows.length > 0) {
      console.log('Admin user already exists');
    } else {
      // Insert admin user
      // The password hash is for 'admin123' using bcrypt
      await db.execute(sql`
        INSERT INTO "users" ("username", "password_hash", "name", "email", "role")
        VALUES ('admin', '$2a$10$JwRBQfUQvYrKRQgJDyOj8.W.L9ZP2Pmhd5bpxagxEzXXqrE0LgCZi', 'Administrator', 'admin@example.com', 'admin');
      `);
      
      console.log('Admin user created successfully');
    }
    
    // Verify the user was created
    const users = await db.execute(sql`SELECT * FROM "users";`);
    console.log('Users in database:', users.rows);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating users table:', error);
    process.exit(1);
  }
}

createUsersTable();
