import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import FloatingWindow from './FloatingWindow'
import {
  ChatBubbleLeftRightIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { updateChatName, deleteChat } from '@/services/dynamodb'
import type { IChatHistoryTableItem } from '@/services/dynamodb'

export default function ChatHistoryItem({
  file,
  userId,
}: {
  file: IChatHistoryTableItem
  userId: string
}) {
  const router = useRouter()
  const [isRenaming, setIsRenaming] = useState(false)
  const [newName, setNewName] = useState(file.chat_name)
  const inputRef = useRef<HTMLInputElement>(null)

  const submitRename = () => {
    updateChatName(
      userId,
      file.chat_id,
      inputRef.current?.value || file.chat_name
    )
    setIsRenaming(false)
  }

  const cancelRename = () => {
    setNewName(file.chat_name)
    setIsRenaming(false)
  }

  return (
    <div className="flex items-center rounded-lg p-1 hover:bg-secondary">
      <ChatBubbleLeftRightIcon className="mr-1 size-5 shrink-0" />
      {isRenaming ? (
        <input
          ref={inputRef}
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full bg-transparent"
          onBlur={() => submitRename()}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submitRename()
            if (e.key === 'Escape') cancelRename()
          }}
        />
      ) : (
        <button
          className="cursor-pointer overflow-hidden text-ellipsis"
          onClick={() => router.push(`/dashboard/chat?chat_id=${file.chat_id}`)}
        >
          {file.chat_name}
        </button>
      )}
      <FloatingWindow title={<EllipsisVerticalIcon className="size-5" />}>
        <div className="flex w-fit flex-col">
          <button
            className="flex"
            onClick={() => {
              setIsRenaming(true)
              setTimeout(() => {
                inputRef.current?.focus()
              })
            }}
          >
            <PencilIcon className="mr-2 size-5" /> Rename
          </button>
          <hr className="my-1.5 border-white" />
          <button
            className="flex"
            onClick={() => {
              deleteChat(userId, file.chat_id)
            }}
          >
            <TrashIcon className="mr-2 size-5" /> Delete
          </button>
        </div>
      </FloatingWindow>
    </div>
  )
}
