'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import useSWR from 'swr'
import { getCookieConsentCopy } from '@/sanity/utils/cookieConsent'

function CookieConsentWithNoSSR() {
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const {
    data: copy,
    error,
    isLoading,
  } = useSWR('getCookieConsent', getCookieConsentCopy)

  if (
    typeof window === 'undefined' ||
    // Hide the banner on Sanity Studio
    window.location.pathname.startsWith('/admin') ||
    error ||
    isLoading
  ) {
    return null
  }

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
  }

  if (getCookie('cookiesConsentBanner') === 'seen' || isButtonClicked) {
    return null
  }

  return (
    <div className="fixed bottom-0 z-50 flex w-full items-center justify-center bg-gray-light">
      <section className="w-full bg-gray p-5 lg:px-24">
        <div className="-mx-3 items-center md:flex">
          <div className="mb-5 px-3 md:mb-0 md:flex-1">
            <p className="text-center leading-tight text-white md:pr-12 md:text-left">
              {copy!.cookieConsentDescription}
            </p>
          </div>
          <div className="px-3 text-center">
            <button
              onClick={() => {
                document.cookie = 'cookiesConsentBanner=seen; max-age=31536000'
                setIsButtonClicked(true)
              }}
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white transition-colors hover:bg-primary/80 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
            >
              {copy!.buttonText}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Disable server-side rendering for this component because it relies on the Browser Cookies
export default dynamic(() => Promise.resolve(CookieConsentWithNoSSR), {
  ssr: false,
})
