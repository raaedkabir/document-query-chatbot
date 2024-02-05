'use client'

import { useState, useEffect } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (isOpen) document.body.style.setProperty('overflow', 'hidden')
    else document.body.style.removeProperty('overflow')
  }, [isOpen])

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-gray-dark/25 bg-white/75 backdrop-blur-lg transition-all">
      <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        <div className="flex h-14 items-center justify-between">
          <a className="z-50 flex font-semibold" href="/">
            <span>Bento DocQA</span>
          </a>
          <button
            onClick={handleClick}
            className="z-50 flex flex-col items-center justify-center sm:hidden"
          >
            <span
              className={`
              block h-0.5 w-6 rounded-sm bg-current 
                transition-all duration-300 ease-out ${
                  isOpen ? 'translate-y-1 rotate-45' : '-translate-y-0.5'
                }`}
            />
            <span
              className={`my-0.5 block h-0.5 w-6 rounded-sm 
                bg-current transition-all duration-300 ease-out ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-sm bg-current 
                 transition-all duration-300 ease-out ${
                   isOpen ? '-translate-y-1 -rotate-45' : 'translate-y-0.5'
                 }`}
            />
          </button>
          {isOpen && (
            <div
              onClick={() => setIsOpen(!isOpen)}
              aria-hidden="true"
              className="absolute left-0 top-0 z-30 h-screen w-full bg-gray-dark/50"
            ></div>
          )}
          <aside
            className={`fixed left-0 top-0 z-30 h-screen w-64 transform overflow-auto bg-white transition-all duration-300 ease-in-out ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="fixed inset-0 w-full">
              <ul className="grid grid-cols-1 divide-y px-10 pb-8 pt-20">
                <li className="py-3">
                  <a
                    className="flex w-full items-center font-semibold text-primary"
                    href="/pricing"
                  >
                    Get started <ArrowRightIcon className="ml-1 size-5" />
                  </a>
                </li>
                <li className="py-3">
                  <a
                    className="flex w-full items-center font-semibold"
                    href="/login"
                  >
                    Login
                  </a>
                </li>
                <li className="py-3">
                  <a
                    className="flex w-full items-center font-semibold"
                    href="/pricing"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
          </aside>
          <div className="hidden items-center space-x-4 sm:flex">
            <a
              href="/"
              className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-gray-light/80 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
            >
              Home
            </a>
            <a
              href="/contact"
              className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-gray-light/80 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
            >
              Contact
            </a>
            <a
              className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-gray-light/80 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
              href="/pricing"
            >
              Pricing
            </a>
            <a
              href="/login"
              className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-gray-light/80 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
            >
              Login
            </a>
            <a
              href="/pricing"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
            >
              Get started <ArrowRightIcon className="ml-1 size-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
