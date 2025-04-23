import { NextRequest, NextResponse } from 'next/server';

// Auth cookie name
const AUTH_COOKIE = 'auth_token';

export async function POST(request: NextRequest) {
  try {
    // Create the response
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );
    
    // Delete the auth cookie
    response.cookies.delete(AUTH_COOKIE);
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during logout' },
      { status: 500 }
    );
  }
}
