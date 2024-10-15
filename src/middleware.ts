import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/forgotpassword' || path === '/resetpassword'

  const token = request.cookies.get('token')?.value || ''

  // If the user is trying to access a public path but is already authenticated, redirect to home
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  // If the user is trying to access a protected path but is not authenticated, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
    '/forgotpassword',   // Added new path
    '/resetpassword'     // Added new path
  ]
}
