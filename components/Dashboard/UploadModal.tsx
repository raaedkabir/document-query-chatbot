'use client'

import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Uploader from './Uploader'

export default function UploadModal({
  title,
  userId,
  files,
}: {
  title: string
  userId: string
  files: { name: string | undefined }[] | undefined
}) {
  // state for modal open/close
  const [isOpen, setIsOpen] = useState(false)
  // prevent modal from closing while uploading
  const [isUploading, setIsUploading] = useState(false)

  return (
    <>
      <button
        className="flex h-9 items-center justify-center rounded-md bg-primary px-3 text-base font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
        onClick={() => setIsOpen(true)}
      >
        {title}
      </button>
      {isOpen && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40"
            onClose={() => {
              if (!isUploading) {
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
                    <div className="mt-2">
                      <Uploader
                        userId={userId}
                        files={files}
                        setIsUploading={setIsUploading}
                      />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  )
}
