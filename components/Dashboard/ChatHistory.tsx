import ChatHistoryItem from './ChatHistoryItem'
import type { IChatHistoryTableItem } from '@/services/dynamodb'
import type { DashboardNavbarCopy } from '@/sanity/utils/dashboardNavbar'

export default function ChatHistory({
  copy,
  userId,
  chatHistory,
}: {
  copy: DashboardNavbarCopy
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
              <ChatHistoryItem
                key={file.chat_id}
                copy={copy}
                file={file}
                userId={userId}
              />
            )
          })}
    </div>
  )
}
