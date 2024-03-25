'use client'

import { useState, useEffect, Fragment } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FocusOn } from 'react-focus-on'
import useBreakpoints from '@/hooks/useBreakpoints'
import { Transition } from '@headlessui/react'
import PDFIcon from './PDFIcon'
import {
  Bars3Icon,
  QuestionMarkCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import ChatHistory from './ChatHistory'
import type { DashboardNavbarCopy } from '@/sanity/utils/dashboardNavbar'

function NavbarWithNoSSR({
  copy,
  chatHistory,
  // profilePicture,
  givenName,
  userId,
}: {
  copy: DashboardNavbarCopy
  chatHistory: any[]
  // profilePicture: string
  givenName: string
  userId: string
}) {
  const router = useRouter()
  const { isSm, isLg } = useBreakpoints()
  const [isSidebarOpen, setIsSidebarOpen] = useState(isLg)

  useEffect(() => {
    document
      .getElementById('main-content')
      ?.setAttribute('data-sidebar-open', isSidebarOpen.toString())
  }, [isSidebarOpen])

  useEffect(() => {
    const handleResize = () => {
      if (isSidebarOpen && !isLg) setIsSidebarOpen(false)
      else if (!isSidebarOpen && isLg) setIsSidebarOpen(true)
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [isSidebarOpen, isLg])

  return (
    <>
      <div
        className={`fixed z-10 m-4 transition-opacity hover:bg-gray/50 focus:bg-gray/50 ${isSidebarOpen ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'} ${!isSm ? 'rounded-2xl bg-secondary' : 'rounded-full'}`}
      >
        <button
          className="cursor-pointer rounded-full p-2"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Bars3Icon className="size-8" />
        </button>
      </div>

      <Transition.Root show={isSidebarOpen} as={Fragment}>
        <FocusOn
          enabled={!isLg}
          onEscapeKey={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen && !isLg && (
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="fixed inset-0 z-30 bg-black/25"
                onClick={() => setIsSidebarOpen(false)}
                aria-hidden="true"
              />
            </Transition.Child>
          )}

          <Transition.Child
            as={Fragment}
            enter="transform transition linear duration-100 sm:duration-150"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition linear duration-100 sm:duration-150"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <nav
              className={`fixed left-0 top-0 z-30 h-screen bg-gray-light transition-all ${isSidebarOpen ? '' : '-mx-64'} ${isSm && isLg ? 'w-64' : ''} ${isSm && !isLg ? 'w-72 pr-4' : ''} ${!isSm && !isLg ? 'w-screen pr-4' : ''}`}
            >
              <aside className="flex h-full flex-col justify-between p-4 pr-0">
                <div className="flex min-h-0 flex-grow flex-col">
                  <div className="flex items-center">
                    <button
                      className="mr-2 cursor-pointer rounded-full p-2 hover:bg-gray/50 focus:bg-gray/50"
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                      <Bars3Icon className="size-8" />
                    </button>
                    <h1 className="text-center text-3xl font-bold text-primary">
                      <Link href="/">{copy.navbarTitle}</Link>
                    </h1>
                  </div>
                  <hr className="my-4 border-gray-dark/25" />
                  <Link
                    className="mx-auto flex h-9 items-center justify-center rounded-md bg-primary px-3 text-base font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
                    href="/dashboard"
                  >
                    <PDFIcon className="mr-2 size-6" /> {copy.filesTitle}
                  </Link>
                  <hr className="my-4 border-gray-dark/25" />
                  <p className="mb-2 text-xl text-gray-dark">
                    {copy.chatHistoryTitle}
                  </p>
                  <ChatHistory
                    copy={copy}
                    chatHistory={chatHistory}
                    userId={userId}
                  />
                </div>
                <div className="text-center font-bold">{givenName}</div>
                <div className="flex items-end gap-1 text-center">
                  <Link href="/dashboard/account" className="mr-auto">
                    <UserIcon className="size-10 rounded-full" />
                  </Link>
                  <div>
                    <button
                      onClick={() => {
                        fetch('/api/auth/signout', {
                          method: 'POST',
                        })

                        router.push('/')
                      }}
                      className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-base font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
                    >
                      {copy.signOutButton}
                    </button>
                  </div>
                  <Link href="/dashboard/help" className="ml-auto">
                    <QuestionMarkCircleIcon className="mx-auto size-10" />
                  </Link>
                </div>
              </aside>
            </nav>
          </Transition.Child>
        </FocusOn>
      </Transition.Root>
    </>
  )
}

// This is a workaround to fix the issue with the navbar not being hydrated on the client side correctly
export default dynamic(() => Promise.resolve(NavbarWithNoSSR), {
  ssr: false,
})
