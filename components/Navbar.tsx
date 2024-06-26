'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import type { NavbarCopy } from '@/sanity/utils/navbar'

export default function Navbar({ copy }: { copy: NavbarCopy }) {
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
          <Link className="z-50 flex items-center font-semibold" href="/">
            <Image
              alt="logo"
              width={copy.imageData.width}
              height={copy.imageData.height}
              className="mr-2 size-8 rounded-md"
              src={copy.imageSrc}
            />
            <span>{copy.title}</span>
          </Link>
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
                {copy.navItems.map((link, index) => (
                  <li key={index} className="py-3">
                    <Link
                      className={`flex w-full items-center font-semibold ${link.highlight ? 'text-primary' : ''}`}
                      href={link.url}
                    >
                      {link.text}{' '}
                      {link.highlight && (
                        <ArrowRightIcon className="ml-1 size-5" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <div className="hidden items-center space-x-4 sm:flex">
            {copy.navItems.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className={`inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 ${link.highlight ? 'bg-primary text-white hover:bg-primary/90' : 'hover:bg-gray-light/80'}`}
              >
                {link.text}{' '}
                {link.highlight && <ArrowRightIcon className="ml-1 size-5" />}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
