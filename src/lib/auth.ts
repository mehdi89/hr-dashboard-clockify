import bcrypt from 'bcryptjs';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Salt rounds for bcrypt
const SALT_ROUNDS = 10;

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Define the user type without password hash
export type UserWithoutPassword = Omit<typeof users.$inferSelect, 'passwordHash'>;

// Define the authentication result type
export type AuthResult = 
  | { success: true; user: UserWithoutPassword }
  | { success: false; message: string };

/**
 * Authenticate a user with username and password
 */
export async function authenticateUser(username: string, password: string): Promise<AuthResult> {
  try {
    // Find the user by username
    const userResults = await db.select().from(users).where(eq(users.username, username)).limit(1);
    
    if (userResults.length === 0) {
      return { success: false, message: 'Invalid username or password' };
    }

    const user = userResults[0];
    
    // Verify the password
    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    
    if (!isPasswordValid) {
      return { success: false, message: 'Invalid username or password' };
    }
    
    // Return user data (excluding password hash)
    const { passwordHash, ...userData } = user;
    return { 
      success: true, 
      user: userData
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, message: 'An error occurred during authentication' };
  }
}

/**
 * Get user by ID
 */
export async function getUserById(userId: number) {
  try {
    const userResults = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    
    if (userResults.length === 0) {
      return null;
    }
    
    const { passwordHash, ...userData } = userResults[0];
    return userData;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return null;
  }
}
