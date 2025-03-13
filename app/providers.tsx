'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import posthog from 'posthog-js'

// Extend Window interface to include posthog
declare global {
  interface Window {
    posthog?: typeof posthog
  }
}

// Debug helper
const debugLog = (message: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[PostHog Debug] ${message}`, data || '')
  }
}

// Initialize PostHog outside of component to prevent double initialization
if (typeof window !== 'undefined' && !window.posthog) {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

  debugLog('Initializing PostHog with config:', {
    api_host: apiHost,
    key: apiKey?.substring(0, 8) + '...'
  })

  posthog.init(apiKey as string, {
    api_host: apiHost,
    loaded: (posthog) => {
      debugLog('PostHog loaded successfully')
      if (process.env.NODE_ENV === 'development') {
        posthog.debug()
      }
    },
    bootstrap: {
      distinctID: 'debug-session-' + Date.now(),
    },
    persistence: 'localStorage',
    capture_pageview: false,
    disable_session_recording: true,
    disable_persistence: false,
    enable_recording_console_log: false
  })
}

function PageViewCapture() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      const url = window.origin + pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      debugLog('Capturing pageview:', { url })
      posthog.capture('$pageview', {
        $current_url: url
      })
    }
  }, [pathname, searchParams])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider client={posthog}>
      <PageViewCapture />
      {children}
    </PHProvider>
  )
} 