'use client'

import { useState } from 'react'
import Dialog from '../UI/Dialog'
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

  return (
    <>
      <button
        className="flex h-9 items-center justify-center rounded-md bg-primary px-3 text-base font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
        onClick={() => setIsOpen(true)}
      >
        {title}
      </button>

      <Dialog title={title} isOpen={isOpen} setIsOpen={setIsOpen}>
        <Uploader userId={userId} files={files} />
      </Dialog>
    </>
  )
}
