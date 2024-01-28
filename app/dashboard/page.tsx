'use client'

import { useState } from 'react'
import PDFIcon from '@/components/PDFIcon'
import Modal from '@/components/Modal'
import Uploader from '@/components/Uploader'
import {
  ChatBubbleLeftRightIcon,
  DocumentPlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {isOpen && (
        <Modal title="Upload PDF" isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className="mt-2">
            <Uploader />
          </div>
        </Modal>
      )}
      <div className="col-span-7 mx-auto w-full p-4 pl-0 md:col-span-8 xl:col-span-9">
        <div className="min-h-full rounded-2xl border border-gray-dark/50 p-5">
          <div className="container mx-auto text-center">
            <h1 className="text-center text-3xl font-bold text-primary">
              DOCQA
            </h1>
            <div className="flex justify-between">
              <h2 className="text-center text-3xl font-bold">My Files</h2>
              <button
                className="flex h-9 items-center justify-center rounded-md bg-primary px-3 text-base font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
                onClick={() => setIsOpen(true)}
              >
                Upload PDF
              </button>
            </div>
            <hr className="my-4 border-gray-dark/25" />
            <div className="flex flex-wrap">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="basis-full px-2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="flex">
                    <PDFIcon className="mr-2 size-8" />{' '}
                    <h2 className="text-2xl">DOCQA</h2>
                  </div>
                  <hr className="my-4 border-gray-dark/25" />
                  <div className="mx-1 flex items-center justify-between gap-1 text-sm">
                    <div>Jan 11, 2024</div>
                    <div className="flex">
                      <ChatBubbleLeftRightIcon className="mr-2 size-6" /> 79
                    </div>
                    <button className="bg-secondary px-4 py-1.5">
                      <DocumentPlusIcon className="size-6" />
                    </button>
                    <button className="bg-error/50 px-4 py-1.5">
                      <TrashIcon className="size-6" />
                    </button>
                  </div>
                  <hr className="my-4 border-gray-dark/25" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
