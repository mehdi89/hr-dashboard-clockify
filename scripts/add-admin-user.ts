import { db } from '../src/db';
import { users } from '../src/db/schema/users';
import { hashPassword } from '../src/lib/auth';
import { eq } from 'drizzle-orm';
import { config } from 'dotenv';

// Load environment variables
config();

async function createAdminUser() {
  try {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    
    console.log(`Creating admin user: ${username}`);
    
    // Hash the password
    const passwordHash = await hashPassword(password);
    
    // Check if admin user already exists
    const existingUser = await db.select().from(users).where(eq(users.username, username)).limit(1);
    
    if (existingUser.length > 0) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    
    // Create admin user
    await db.insert(users).values({
      username,
      passwordHash,
      name: 'Administrator',
      email,
      role: 'admin',
    });
    
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

// Run the function
createAdminUser().catch((error) => {
  console.error('Failed to create admin user:', error);
  process.exit(1);
});
