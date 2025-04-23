import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the auth cookie name
const AUTH_COOKIE = 'auth_token';

// Define public paths that don't require authentication
const publicPaths = ['/login', '/api/auth/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is public
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // Check if the user is authenticated
  const authCookie = request.cookies.get(AUTH_COOKIE);
  
  if (!authCookie) {
    // Redirect to login page if not authenticated
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    // Match all paths except for static files, api routes, and _next
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
