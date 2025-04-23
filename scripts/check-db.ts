import { db } from '../src/db';
import { users } from '../src/db/schema/users';
import { sql } from 'drizzle-orm';

async function checkDatabase() {
  try {
    console.log('Checking database connection...');
    const connectionResult = await db.execute(sql`SELECT NOW() as now`);
    console.log('Database connection successful:', connectionResult.rows?.[0]?.now);
    
    console.log('\nQuerying users table...');
    const usersResult = await db.select().from(users).limit(5);
    console.log('Users found:', usersResult.length);
    console.log('User records:', JSON.stringify(usersResult, null, 2));
    
    process.exit(0);
  } catch (error) {
    console.error('Database error:', error);
    process.exit(1);
  }
}

checkDatabase();
