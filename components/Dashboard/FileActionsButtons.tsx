'use client'

import { useState } from 'react'
import { DocumentPlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { deleteFile } from '@/app/actions'

export default function FileActionsButtons({
  userId,
  fileName,
}: {
  userId: string
  fileName: string
}) {
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <>
      <button
        className={`bg-secondary px-4 py-1.5 hover:bg-secondary-400 ${isDeleting ? 'cursor-progress' : ''}`}
        disabled={isDeleting}
      >
        <DocumentPlusIcon className="size-6 text-secondary-800" />
      </button>
      <button
        className={`bg-error/35 px-4 py-1.5 hover:bg-error/60 ${isDeleting ? 'cursor-progress' : ''}`}
        disabled={isDeleting}
        onClick={() => {
          setIsDeleting(true)
          deleteFile(userId, fileName)
        }}
      >
        <TrashIcon className="size-6 text-error" />
      </button>
    </>
  )
}
