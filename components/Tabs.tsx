'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Tabs() {
  const [openTab, setOpenTab] = useState(1)

  const updateOpenTab = (number: number) => {
    setOpenTab(number)
  }

  return (
    <div className="mx-auto my-32 max-w-5xl sm:mt-56">
      <div className="mb-12 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-2 text-4xl font-bold sm:text-5xl">
            Start chatting in minutes
          </h2>
          <p className="mt-4 text-lg text-gray-dark">
            Chatting to your PDF files has never been easier than with Bento
            DocQA.
          </p>
        </div>
      </div>
      <ol className="my-8 space-y-4 px-6 pt-8 lg:flex lg:space-x-12 lg:space-y-0 lg:px-8">
        <li
          className="cursor-pointer lg:flex-1"
          onClick={() => updateOpenTab(1)}
          aria-hidden="true"
        >
          <div className="flex flex-col space-y-2 border-l-4 border-primary/30 py-2 pl-4 lg:border-l-0 lg:border-t-2 lg:pb-0 lg:pl-0 lg:pt-4">
            <span className="text-sm font-medium text-primary">Step 1</span>
            <span className="text-xl font-semibold">
              Sign up for an account
            </span>
            <span className="mt-2 text-gray-dark">
              Either starting out with a free plan or choose our{' '}
              <Link
                className="text-primary underline underline-offset-2"
                href="/pricing"
              >
                pro plan
              </Link>
              .
            </span>
          </div>
        </li>
        <li
          className="cursor-pointer lg:flex-1"
          onClick={() => updateOpenTab(2)}
          aria-hidden="true"
        >
          <div className="flex flex-col space-y-2 border-l-4 border-primary/30 py-2 pl-4 lg:border-l-0 lg:border-t-2 lg:pb-0 lg:pl-0 lg:pt-4">
            <span className="text-sm font-medium text-primary">Step 2</span>
            <span className="text-xl font-semibold">Upload your PDF file</span>
            <span className="mt-2 text-gray-dark">
              We&apos;ll process your file and make it ready for you to chat
              with.
            </span>
          </div>
        </li>
        <li
          className="cursor-pointer lg:flex-1"
          onClick={() => updateOpenTab(3)}
          aria-hidden="true"
        >
          <div className="flex flex-col space-y-2 border-l-4 border-primary/30 py-2 pl-4 lg:border-l-0 lg:border-t-2 lg:pb-0 lg:pl-0 lg:pt-4">
            <span className="text-sm font-medium text-primary">Step 3</span>
            <span className="text-xl font-semibold">
              Start asking questions
            </span>
            <span className="mt-2 text-gray-dark">
              It&apos;s that simple. Try out Bento DocQA today - it really takes
              less than a minute.
            </span>
          </div>
        </li>
      </ol>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-gray/5 p-2 ring-1 ring-inset ring-gray/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <Image
              alt="uploading preview"
              loading="lazy"
              width="1419"
              height="732"
              decoding="async"
              data-nimg="1"
              className={`rounded-md bg-white shadow-2xl ring-1 ring-gray/10 ${openTab === 1 ? 'block' : 'hidden'}`}
              src=""
            />
            <Image
              alt="uploading preview"
              loading="lazy"
              width="1419"
              height="732"
              decoding="async"
              data-nimg="1"
              className={`rounded-md bg-white shadow-2xl ring-1 ring-gray/10 ${openTab === 2 ? 'block' : 'hidden'}`}
              src=""
            />
            <Image
              alt="uploading preview"
              loading="lazy"
              width="1419"
              height="732"
              decoding="async"
              data-nimg="1"
              className={`rounded-md bg-white shadow-2xl ring-1 ring-gray/10 ${openTab === 3 ? 'block' : 'hidden'}`}
              src=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}
