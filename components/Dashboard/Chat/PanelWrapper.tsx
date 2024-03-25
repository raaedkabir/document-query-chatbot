'use client'

import { useState } from 'react'
import useBreakpoints from '@/hooks/useBreakpoints'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import PDFPanel from '@/components/Dashboard/Chat/PDFPanel'
import ChatPanel from '@/components/Dashboard/Chat/ChatPanel'
import type { IChatHistoryTableItem } from '@/services/dynamodb'

export default function PanelWrapper({
  chatDetails: { file_name: fileName, user_id: userId, chat_id: chatId, chat },
}: {
  chatDetails: IChatHistoryTableItem
}) {
  const [displayChat, setDisplayChat] = useState(true)
  const { isSm, isLg } = useBreakpoints()

  return (
    <>
      <div
        className={`fixed z-10 m-4 translate-y-16 transition-opacity hover:bg-gray/50 focus:bg-gray/50 sm:-translate-x-20 ${!isSm ? 'rounded-2xl bg-secondary' : 'rounded-full'}`}
      >
        <button
          className={`cursor-pointer rounded-full p-2 ${isLg ? 'hidden' : 'block'}`}
          onClick={() => setDisplayChat(!displayChat)}
        >
          <ArrowPathIcon className="size-8" />
        </button>
      </div>
      <div className="grid grid-cols-9 gap-4">
        <div
          className={`col-span-9 h-screen lg:col-span-5 ${isLg ? 'block' : displayChat ? 'hidden' : 'block'}`}
        >
          <PDFPanel fileName={fileName} userId={userId} />
        </div>

        <div
          className={`col-span-9 lg:col-span-4 ${isLg ? 'block' : displayChat ? 'block' : 'hidden'}`}
        >
          <ChatPanel
            fileName={fileName}
            userId={userId}
            chatId={chatId}
            chat={chat}
          />
        </div>
      </div>
    </>
  )
}
