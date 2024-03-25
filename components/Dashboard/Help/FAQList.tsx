'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import type { DashboardHelpCopy } from '@/sanity/utils/dashboardHelp'

export default function FAQList({ copy }: { copy: DashboardHelpCopy }) {
  return (
    <div className="mx-auto mt-4 max-w-2xl">
      {copy.faqList.map((faq, index) => (
        <Disclosure key={index} as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-secondary px-4 py-2 text-left text-sm font-medium text-primary-900 hover:bg-secondary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500/75">
                <span>{faq.question}</span>
                <ChevronUpIcon
                  className={`${
                    open ? '' : 'rotate-180 transform'
                  } size-5 text-primary`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-dark">
                {faq.answer}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  )
}
