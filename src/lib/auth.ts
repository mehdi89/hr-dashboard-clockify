import bcrypt from 'bcryptjs';
import { prisma } from '@/db';

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

// Define the user type for our application
export type User = {
  id: number;
  username: string;
  passwordHash: string;
  name: string | null;
  email: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

// Define the user type without password hash
export type UserWithoutPassword = Omit<User, 'passwordHash'>;

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
    const user = await prisma.users.findUnique({
      where: { username }
    });
    
    if (!user) {
      return { success: false, message: 'Invalid username or password' };
    }
    
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
    const user = await prisma.users.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      return null;
    }
    
    const { passwordHash, ...userData } = user;
    return userData;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return null;
  }
}
