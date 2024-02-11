'use client'

import PDFIcon from '@/components/PDFIcon'
import {
  ChatBubbleLeftRightIcon,
  DocumentPlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

export default function UploadedFiles({
  userId,
  files,
}: {
  userId: string
  files:
    | {
        name: string | undefined
        uploadDate: Date | undefined
        formattedUploadDate: string
      }[]
    | undefined
}) {
  if (!files || files.length === 0) {
    return (
      <div className="mx-auto py-6 text-center">
        <h2 className="text-2xl">No Files Uploaded</h2>
      </div>
    )
  }

  return (
    <>
      {files.map((file, i) => {
        return (
          <div
            key={i}
            className="basis-full overflow-hidden px-2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            <div className="flex">
              <PDFIcon className="mr-2 size-8 shrink-0" />{' '}
              <h2 className="overflow-hidden text-ellipsis text-2xl">
                {file.name}
              </h2>
            </div>
            <hr className="my-4 border-gray-dark/25" />
            <div className="mx-1 flex items-center justify-between gap-1 text-sm">
              <div title={file.uploadDate?.toString()}>
                {file.formattedUploadDate}
              </div>
              <div className="flex">
                <ChatBubbleLeftRightIcon className="mr-2 size-6" /> 79
              </div>
              <button className="bg-secondary px-4 py-1.5">
                <DocumentPlusIcon className="size-6" />
              </button>
              <button
                className="bg-error/50 px-4 py-1.5"
                onClick={async () => {
                  await fetch('/api/files/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId, fileName: file.name }),
                  })

                  location.reload()
                }}
              >
                <TrashIcon className="size-6" />
              </button>
            </div>
            <hr className="my-4 border-gray-dark/25" />
          </div>
        )
      })}
    </>
  )
}
