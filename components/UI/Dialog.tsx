'use client'

import { useState, useEffect, createContext, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export const PreventCloseContext = createContext({
  preventClose: false,
  setPreventClose: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
})

export default function UploadModal({
  title,
  children,
  isOpen,
  setIsOpen,
}: {
  title: string
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  // prevent modal from closing while uploading
  const [preventClose, setPreventClose] = useState(false)

  // prevent navigation away from page while uploading
  useEffect(() => {
    function handler(e: BeforeUnloadEvent) {
      if (!preventClose) return
      e.preventDefault()
    }

    window.addEventListener('beforeunload', handler)

    return () => {
      window.removeEventListener('beforeunload', handler)
    }
  }, [preventClose])

  return (
    <PreventCloseContext.Provider value={{ preventClose, setPreventClose }}>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={() => {
            if (!preventClose) {
              setIsOpen(false)
            }
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </PreventCloseContext.Provider>
  )
}
