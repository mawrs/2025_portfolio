import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // We're not going to proxy requests anymore - instead redirect to PostHog
  const url = request.nextUrl.clone()
  
  // Determine the correct hostname
  const hostname = url.pathname.startsWith("/ingest/static/") 
    ? 'us-assets.i.posthog.com' 
    : 'us.i.posthog.com'

  // Create the new URL
  const newUrl = new URL(url.pathname.replace(/^\/ingest/, ''), `https://${hostname}`)
  
  // Copy over search params
  newUrl.search = url.search

  // Debug log
  console.log(`[PostHog Middleware] Redirecting to: ${newUrl.toString()}`)

  // Return redirect response
  return NextResponse.redirect(newUrl, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': '*'
    }
  })
}

export const config = {
  matcher: '/ingest/:path*',
} 