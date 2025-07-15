import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { Database } from '@/types/database.types'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Protected API routes
  const protectedAPIRoutes = [
    '/api/billetera',
    '/api/marketing',
    '/api/marketing-requests',
    '/api/marketing-email',
    '/api/send-marketing-email',
    '/api/send-verification-email',
    '/api/send-withdrawal-request',
    '/api/create-user',
    '/api/admin',
  ]

  const isProtectedAPI = protectedAPIRoutes.some(route => pathname.startsWith(route))

  // Handle API routes
  if (isProtectedAPI && !user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // Handle page routes
  if (pathname === '/') {
    // Redirect root to appropriate page
    const redirectUrl = user ? '/home' : '/login'
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

  // Redirect authenticated users away from auth pages
  if (pathname === '/login' && user) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  // Protected paths
  const protectedPaths = ['/home', '/dashboard', '/profile', '/admin']
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))

  // Redirect unauthenticated users from protected paths
  if (isProtectedPath && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}