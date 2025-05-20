'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { authenticateUser, getUserById } from '@/lib/auth';

// Cookie name for the auth token
export const AUTH_COOKIE_NAME = 'auth_token';

// Cookie expiration time (7 days)
const COOKIE_EXPIRATION = 7 * 24 * 60 * 60 * 1000;

/**
 * Login action
 */
export async function login(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  
  if (!username || !password) {
    return { success: false, message: 'Username and password are required' };
  }
  
  const result = await authenticateUser(username, password);
  
  if (result.success) {
    // Set the auth cookie
    const cookieStore = await cookies();
    cookieStore.set({
      name: AUTH_COOKIE_NAME,
      value: result.user.id.toString(),
      httpOnly: true,
      path: '/',
      expires: new Date(Date.now() + COOKIE_EXPIRATION),
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }
  
  return result;
}

/**
 * Logout action
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  redirect('/login');
}

/**
 * Get the current user from the auth cookie
 */
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME);
  
  if (!authCookie) {
    return null;
  }
  
  try {
    const userId = parseInt(authCookie.value);
    return await getUserById(userId);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Check if the user is authenticated
 */
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return user !== null;
}

/**
 * Require authentication
 * Redirects to login page if not authenticated
 */
export async function requireAuth() {
  const isAuthed = await isAuthenticated();
  
  if (!isAuthed) {
    redirect('/login');
  }
}
