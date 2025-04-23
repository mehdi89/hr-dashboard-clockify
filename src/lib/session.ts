import { IronSessionOptions } from 'iron-session';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';

// Define the session data structure
export interface SessionData {
  userId?: number;
  isLoggedIn: boolean;
}

// Iron session configuration
export const sessionOptions: IronSessionOptions = {
  password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long',
  cookieName: 'timetable_auth_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

// Get the session from the request
export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  
  // Initialize the session if it's new
  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
  }
  
  return session;
}
