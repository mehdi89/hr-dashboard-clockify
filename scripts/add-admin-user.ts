import { db } from '../src/db';
import { users } from '../src/db/schema/users';
import { hashPassword } from '../src/lib/auth';
import { sql } from 'drizzle-orm';

async function addAdminUser() {
  try {
    console.log('Adding admin user...');
    
    // Check if admin user already exists
    const existingUsers = await db.select().from(users).where(sql`username = 'admin'`).limit(1);
    
    if (existingUsers.length > 0) {
      console.log('Admin user already exists');
      
      // Update the admin user's password
      const passwordHash = await hashPassword('admin123');
      await db.update(users)
        .set({ passwordHash })
        .where(sql`username = 'admin'`);
      
      console.log('Admin user password updated');
    } else {
      // Create the admin user
      const passwordHash = await hashPassword('admin123');
      await db.insert(users).values({
        username: 'admin',
        passwordHash,
        name: 'Administrator',
        email: 'admin@example.com',
        role: 'admin',
      });
      
      console.log('Admin user created successfully');
    }
    
    // Verify the user was created/updated
    const adminUser = await db.select().from(users).where(sql`username = 'admin'`).limit(1);
    console.log('Admin user:', adminUser[0]);
    
    process.exit(0);
  } catch (error) {
    console.error('Error adding admin user:', error);
    process.exit(1);
  }
}

addAdminUser();
