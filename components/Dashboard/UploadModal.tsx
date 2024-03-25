'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import Dialog from '../UI/Dialog'
import Uploader from './Uploader'

export default function UploadModal({
  title,
  userId,
  files,
  planLimits,
}: {
  title: string
  userId: string
  files:
    | {
        name: string | undefined
        uploadDate: Date | undefined
        formattedUploadDate: string
      }[]
    | undefined
  planLimits: {
    pdfLimit: string | number
    pdfSize: string | number
    pdfPages: string | number
    queries: string | number
    adFree: 'true' | 'false'
    currentPeriodStart: number
  }
}) {
  // state for modal open/close
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        className="flex h-9 items-center justify-center rounded-md bg-primary px-3 text-base font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
        onClick={() => {
          if (files?.length) {
            const fileUploadsWithinCurrentPeriod = files.reduce(
              (acc, file) =>
                acc +
                Number(
                  file.uploadDate?.getTime()! / 1000 >
                    planLimits.currentPeriodStart
                ),
              0
            )

            if (fileUploadsWithinCurrentPeriod >= Number(planLimits.pdfLimit)) {
              toast.error('You have reached your upload limit for this period')
              return
            }
          }

          setIsOpen(true)
        }}
      >
        {title}
      </button>

      <Dialog title={title} isOpen={isOpen} setIsOpen={setIsOpen}>
        <Uploader userId={userId} files={files} planLimits={planLimits} />
      </Dialog>
    </>
  )
}
