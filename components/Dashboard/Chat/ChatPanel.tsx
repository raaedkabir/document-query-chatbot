'use client'

import { useRef, useEffect } from 'react'
import { useChat } from 'ai/react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { ArrowRightIcon, ClipboardIcon } from '@heroicons/react/24/outline'
import LoadingIcon from '@/components/LoadingIcon'
import { updateChat } from '@/services/dynamodb'
import { DashboardChatCopy } from '@/sanity/utils/dashboardChat'

export default function ChatPanel({
  copy,
  fileName,
  userId,
  chatId,
  chat,
}: {
  copy: DashboardChatCopy
  fileName: string
  userId: string
  chatId: string
  chat: string
}) {
  const chatRef = useRef<HTMLInputElement>(null)
  const chatHistory = JSON.parse(chat)
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: chatHistory,
      body: {
        fileName,
        userId,
      },
      onError() {
        toast(
          copy.chatErrorMessage ||
            'The message you submitted was too long. Please submit something shorter or start a new chat.',
          {
            duration: 60000, // 1 minute
          }
        )
      },
      onFinish() {
        // scroll to the message that was just received
        if (chatRef.current) {
          const lastMessage = chatRef.current.lastElementChild
          if (lastMessage) {
            lastMessage.scrollIntoView({
              behavior: 'smooth',
              block: 'end',
            })
          }
        }
      },
    })

  useEffect(() => {
    // update chat history when assistant responds
    if (
      messages.length > 1 &&
      messages.length !== chatHistory.length && // prevent unwanted updates on initial load
      messages[messages.length - 1].role === 'assistant' &&
      !isLoading
    ) {
      updateChat(userId, chatId, JSON.stringify(messages))
    }
  }, [messages, chatHistory, isLoading, userId, chatId])

  const copyTextToClipboard = async (text: string) => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      // fallback to execCommand for IE 11 and older browsers that don't support Clipboard API
      return document.execCommand('copy', true, text)
    }
  }

  return (
    <div className="flex h-screen flex-1 flex-col justify-between bg-white pb-4 sm:p-6">
      <div
        ref={chatRef}
        className="flex flex-col space-y-4 overflow-y-auto p-3 pt-36 sm:pt-3"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`group flex items-end ${message.role === 'assistant' ? '' : 'justify-end'}`}
          >
            <div
              className={`mx-2 flex max-w-lg flex-col space-y-2 leading-tight ${message.role == 'assistant' ? 'order-2 items-start' : 'order-2 items-end'}`}
            >
              <span
                style={{ overflowWrap: 'anywhere' }}
                className={`inline-block whitespace-pre-wrap rounded-xl px-4 py-3 ${message.role == 'assistant' ? 'rounded-bl-none bg-gray-light text-gray-dark' : 'rounded-br-none bg-primary text-white'}`}
              >
                {message.content}
              </span>
            </div>
            <Image
              src={message.role === 'assistant' ? '/bot.png' : '/user.png'}
              width="512"
              height="512"
              alt=""
              className={`size-6 rounded-full ${message.role === 'assistant' ? 'order-1' : 'order-3'}`}
            />
            <ClipboardIcon
              className={`size-6 w-6 shrink-0 cursor-pointer self-center rounded-full bg-primary p-1 text-white opacity-0 group-hover:opacity-100 ${message.role === 'assistant' ? 'order-3' : 'order-1'}`}
              onClick={() => {
                copyTextToClipboard(message.content)
                toast.success(
                  copy.copiedTextToClipboardMessage || 'Copied to clipboard!'
                )
              }}
            />
          </div>
        ))}
        {isLoading && messages[messages.length - 1].role !== 'assistant' && (
          <div className="flex items-end">
            <div className="order-2 mx-2 flex flex-col items-start space-y-2 leading-tight">
              <Image
                src="/typing-animation.gif"
                width="256"
                height="164"
                alt="..."
                className="ml-6 w-16"
              />
            </div>
          </div>
        )}
      </div>
      <div className="border-t-2 border-gray-light px-4 pt-4 sm:mb-0">
        <div className="relative flex">
          <form onSubmit={handleSubmit} className="w-full">
            <label htmlFor="prompt" className="sr-only">
              {copy.promptTextField.label ||
                'Enter a prompt for the AI ChatBot to answer'}
            </label>
            <input
              id="prompt"
              type="text"
              placeholder={copy.promptTextField.placeholder || 'Type here...'}
              autoComplete="off"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={true}
              value={input}
              onChange={handleInputChange}
              className="w-full rounded-full border-2 border-gray-light bg-gray-light py-2 pl-5 pr-16 text-gray-dark placeholder-gray focus:border-primary focus:placeholder-gray focus:outline-none"
            />
            <div className="absolute inset-y-0 right-2 hidden items-center sm:flex">
              <button
                disabled={isLoading}
                className="inline-flex size-8 items-center justify-center rounded-full bg-primary text-white transition duration-200 ease-in-out hover:bg-secondary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                type="submit"
              >
                {isLoading ? (
                  <LoadingIcon className="size-6 animate-spin p-1 text-white" />
                ) : (
                  <ArrowRightIcon className="size-6 rounded-full bg-primary p-1 text-white" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
