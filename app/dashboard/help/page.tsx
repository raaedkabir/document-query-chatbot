'use client'

import Link from 'next/link'
import { Disclosure } from '@headlessui/react'
import {
  ChevronUpIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'

export default function DashboardHelp() {
  return (
    <div className="mx-auto w-full p-4 sm:pl-0">
      <div className="w-full rounded-2xl border border-gray-dark/50 p-5">
        <div className="container mx-auto text-center">
          <h1 className="text-center text-3xl font-bold">Help</h1>
          <div className="mx-auto mt-4 max-w-2xl">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-secondary px-4 py-2 text-left text-sm font-medium text-primary-900 hover:bg-secondary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500/75">
                    <span>How you can use DOCQA</span>
                    <ChevronUpIcon
                      className={`${
                        open ? '' : 'rotate-180 transform'
                      } size-5 text-primary`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-dark">
                    Yes.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-secondary px-4 py-2 text-left text-sm font-medium text-primary-900 hover:bg-secondary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500/75">
                    <span>How to upgrade</span>
                    <ChevronUpIcon
                      className={`${
                        open ? '' : 'rotate-180 transform'
                      } size-5 text-primary`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-dark">
                    No.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-secondary px-4 py-2 text-left text-sm font-medium text-primary-900 hover:bg-secondary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500/75">
                    <span>How to make payment</span>
                    <ChevronUpIcon
                      className={`${
                        open ? '' : 'rotate-180 transform'
                      } size-5 text-primary`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-dark">
                    If you&apos;re unhappy with your purchase for any reason,
                    email us within 90 days and we&apos;ll refund you in full,
                    no questions asked.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
          <hr className="my-4 border-gray-dark/25" />
          <div>
            <Link
              className="flex justify-center font-bold text-primary hover:text-primary-300"
              href="/contact"
            >
              <ExclamationTriangleIcon className="mr-2 size-6 text-black" />
              <span className="text-current">Report a problem</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
