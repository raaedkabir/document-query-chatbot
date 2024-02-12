import FloatingWindow from './FloatingWindow'
import {
  ChatBubbleLeftRightIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import type { IChatHistoryTableItem } from '@/services/dynamodb'

export default function ChatHistory({
  chatHistory,
}: {
  chatHistory: IChatHistoryTableItem[]
}) {
  return (
    <div className="flex flex-grow flex-col gap-1 overflow-y-auto text-gray-dark">
      {chatHistory.length > 0 &&
        chatHistory
          .sort((a, b) => b?.last_updated - a?.last_updated)
          .map((file, i) => (
            <div
              className="flex items-center rounded-lg p-1 hover:bg-secondary"
              key={i}
            >
              <ChatBubbleLeftRightIcon className="mr-1 size-5" />
              <span>{file?.chat_name}</span>
              <FloatingWindow
                title={<EllipsisVerticalIcon className="size-5" />}
              >
                <div className="flex w-fit flex-col">
                  <div className="flex">
                    <PencilIcon className="mr-2 size-5" /> Rename
                  </div>
                  <hr className="my-1.5 border-white" />
                  <div className="flex">
                    <TrashIcon className="mr-2 size-5" /> Delete
                  </div>
                </div>
              </FloatingWindow>
            </div>
          ))}
    </div>
  )
}
