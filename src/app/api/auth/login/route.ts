import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth';

// Auth cookie name
const AUTH_COOKIE = 'auth_token';

// Cookie expiration time (7 days)
const COOKIE_EXPIRATION = 7 * 24 * 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { username, password } = body;
    
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    // Authenticate the user
    const result = await authenticateUser(username, password);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 401 }
      );
    }
    
    // Create the response
    const response = NextResponse.json(
      { success: true, user: { id: result.user.id, name: result.user.name, role: result.user.role } },
      { status: 200 }
    );
    
    // Set the auth cookie
    response.cookies.set({
      name: AUTH_COOKIE,
      value: result.user.id.toString(),
      httpOnly: true,
      path: '/',
      expires: new Date(Date.now() + COOKIE_EXPIRATION),
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
