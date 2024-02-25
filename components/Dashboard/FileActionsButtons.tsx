'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store/hooks'
import { setFileName, setId } from '@/lib/store/features/users/usersSlice'
import { DocumentPlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { deleteFile } from '@/app/actions'
import { putNewChat } from '@/services/dynamodb'

export default function FileActionsButtons({
  userId,
  fileName,
}: {
  userId: string
  fileName: string
}) {
  const router = useRouter()
  const store = useAppStore()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <button
        className={`bg-secondary px-4 py-1.5 hover:bg-secondary-400 ${isLoading ? 'cursor-progress' : ''}`}
        disabled={isLoading}
        onClick={async () => {
          setIsLoading(true)
          const chatId = await putNewChat(userId, fileName)

          /**
           * Write to Redux store
           * and redirect to chat page
           */
          store.dispatch(setFileName(fileName))
          store.dispatch(setId(userId))

          router.push(`/dashboard/chat?chat_id=${chatId}`)
        }}
      >
        <DocumentPlusIcon className="size-6 text-secondary-800" />
      </button>
      <button
        className={`bg-error/35 px-4 py-1.5 hover:bg-error/60 ${isLoading ? 'cursor-progress' : ''}`}
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true)
          deleteFile(userId, fileName)
        }}
      >
        <TrashIcon className="size-6 text-error" />
      </button>
    </>
  )
}
