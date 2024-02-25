import ChatHistoryItem from './ChatHistoryItem'
import type { IChatHistoryTableItem } from '@/services/dynamodb'

export default function ChatHistory({
  userId,
  chatHistory,
}: {
  userId: string
  chatHistory: IChatHistoryTableItem[]
}) {
  return (
    <div className="flex flex-grow flex-col gap-1 overflow-y-auto text-gray-dark">
      {chatHistory.length > 0 &&
        chatHistory
          .sort((a, b) => b?.last_updated - a?.last_updated)
          .map((file) => {
            return (
              <ChatHistoryItem key={file.chat_id} file={file} userId={userId} />
            )
          })}
    </div>
  )
}
