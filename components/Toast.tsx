'use client'

import toast, { Toaster, resolveValue } from 'react-hot-toast'
import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Toast() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
      }}
    >
      {(t) => (
        <Transition
          appear
          show={t.visible}
          className={`flex transform rounded-xl text-white shadow-lg ring-1 ring-black ring-opacity-5 ${t.type === 'success' ? 'bg-gray-dark' : 'bg-error'}`}
          enter="transition-all duration-150"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          <div className="p-4">
            <p className="mx-3 mt-1 text-sm">{resolveValue(t.message, t)}</p>
          </div>
          <div className="flex border-l border-gray-light">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex w-full items-center justify-center rounded-none rounded-r-xl border border-transparent p-4 text-sm font-medium hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <XMarkIcon className="size-6" />
            </button>
          </div>
        </Transition>
      )}
    </Toaster>
  )
}
