import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { afterLoginUrl } from './app-config'

export const sessionService = {
  getSessionId: () => {
    return cookies().get('auth_session')?.value
  },

  isAuthenticated: () => {
    return !!sessionService.getSessionId()
  }
}

export async function middleware(request: NextRequest) {

  if (sessionService.isAuthenticated() && request.nextUrl.pathname.startsWith('/signin')) {
    return NextResponse.redirect(new URL(afterLoginUrl, request.url))
  }
  if (!sessionService.isAuthenticated() && !request.nextUrl.pathname.startsWith('/signin')) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }


// You might want to add additional validation here,
// but remember that middleware runs on the Edge runtime
// which has limitations on what operations can be performed

return NextResponse.next()
}

export const config = {
matcher: [
  '/((?!api|_next/static|_next/image|favicon.ico).*)',
],
}