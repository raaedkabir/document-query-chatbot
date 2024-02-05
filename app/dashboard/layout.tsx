'use client'

import { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import useBreakpoints from '@/hooks/useBreakpoints'
import dynamic from 'next/dynamic'
import { Transition } from '@headlessui/react'
import StoreProvider from '@/app/StoreProvider'
import FloatingWindow from '@/components/FloatingWindow'
import { FocusOn } from 'react-focus-on'
import PDFIcon from '@/components/PDFIcon'
import {
  Bars3Icon,
  ChatBubbleLeftRightIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { Worker } from '@react-pdf-viewer/core'
import packageJson from '@/package.json'

const pdfjsVersion = packageJson.dependencies['pdfjs-dist']

function DashboardLayoutWithNoSSR({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isSm, isLg } = useBreakpoints()
  const [isSidebarOpen, setIsSidebarOpen] = useState(isLg)

  useEffect(() => {
    const handleResize = () => {
      if (isSidebarOpen && !isLg) setIsSidebarOpen(false)
      else if (!isSidebarOpen && isLg) setIsSidebarOpen(true)
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [isSidebarOpen, isLg])

  async function handleSubmit() {
    await fetch('/api/auth/signout', {
      method: 'POST',
    })

    router.push('/')
  }

  return (
    <StoreProvider>
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
      />

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
                      DOCQA
                    </h1>
                  </div>
                  <hr className="my-4 border-gray-dark/25" />
                  <a
                    className="mx-auto flex h-9 items-center justify-center rounded-md bg-primary px-3 text-base font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
                    href="/dashboard"
                  >
                    <PDFIcon className="mr-2 size-6" /> Files
                  </a>
                  <hr className="my-4 border-gray-dark/25" />
                  <p className="mb-2 text-xl text-gray-dark">Chat History</p>
                  <div className="flex flex-grow flex-col gap-1 overflow-y-auto text-gray-dark">
                    {[...Array(15)].map((_, i) => (
                      <div
                        className="flex items-center rounded-lg p-1 hover:bg-secondary"
                        key={i}
                      >
                        <ChatBubbleLeftRightIcon className="mr-1 size-5" />
                        <span>DocQA Outline</span>
                        <FloatingWindow
                          title={<EllipsisVerticalIcon className="size-5" />}
                        >
                          <div className="flex w-fit flex-col">
                            <div className="flex">
                              <PencilIcon className="mr-2 size-5" /> Rename
                            </div>
                            <hr className="my-1.5 border-white" />
                            <div className="flex">
                              <TrashIcon className="mr-2 size-5" /> Delete
                            </div>
                          </div>
                        </FloatingWindow>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center font-bold">John Doe</div>
                <div className="flex items-end gap-1 text-center">
                  <div className="mr-auto">
                    <UserIcon className="size-10 rounded-full" />
                  </div>
                  <div>
                    <button
                      onClick={handleSubmit}
                      className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-base font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
                    >
                      Sign Out
                    </button>
                  </div>
                  <div className="ml-auto">
                    <QuestionMarkCircleIcon className="mx-auto size-10" />
                  </div>
                </div>
              </aside>
            </nav>
          </Transition.Child>
        </FocusOn>
      </Transition.Root>

      <main
        className={`transition-all sm:pl-20 ${isSidebarOpen ? 'lg:ml-64 lg:pl-4' : 'lg:ml-0 lg:pl-20'}`}
      >
        {children}
      </main>
    </StoreProvider>
  )
}

export default dynamic(() => Promise.resolve(DashboardLayoutWithNoSSR), {
  ssr: false,
})
