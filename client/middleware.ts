import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if user is authenticated by looking for a token in cookies
  const access_token = request.cookies.get('access_token');
  
  // If trying to access login page while authenticated, allow it
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.next();
  }
  
  // If not authenticated and not on login page, redirect to login
  if (!access_token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // User is authenticated, allow access
  return NextResponse.next();
}

// Configure which routes to protect
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp).*)',
  ],
};
