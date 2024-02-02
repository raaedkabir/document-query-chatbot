'use client'

import { useState, useRef, useEffect } from 'react'
import useBreakpoints from '@/hooks/useBreakpoints'
import { useChat } from 'ai/react'
import Image from 'next/image'
import toast, { Toaster, resolveValue } from 'react-hot-toast'
import { Transition } from '@headlessui/react'
import PDFViewer from '@/components/PDFViewer'
import {
  ArrowRightIcon,
  ArrowPathIcon,
  ClipboardIcon,
} from '@heroicons/react/24/outline'
import { useAppSelector } from '@/lib/store/hooks'

export default function DashboardChat() {
  const [displayChat, setDisplayChat] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatRef = useRef<HTMLInputElement>(null)
  const { isSm, isLg } = useBreakpoints()
  const fileName = useAppSelector((state) => state.users.fileName)
  const userId = useAppSelector((state) => state.users.id)
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: [
        {
          role: 'assistant',
          id: '0',
          content:
            'Hi! I am your PDF assistant. I am happy to help with your questions about your PDF.',
        },
      ],
      body: {
        fileName,
        userId,
      },
    })

  useEffect(() => {
    if (chatRef.current) {
      const lastMessage = chatRef.current.lastElementChild
      if (lastMessage) {
        lastMessage.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        })
      }
    }
  }, [messages])

  const notify = () => toast('Copied to clipboard!')

  const copyTextToClipboard = async (text: string) => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      // fallback to execCommand for IE 11 and older browsers that don't support Clipboard API
      return document.execCommand('copy', true, text)
    }
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
        }}
      >
        {(t) => (
          <Transition
            appear
            show={t.visible}
            className="flex transform rounded-xl bg-gray-dark p-4 text-sm text-white shadow-lg"
            enter="transition-all duration-150"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transition-all duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
          >
            <p className="px-2">{resolveValue(t.message, t)}</p>
          </Transition>
        )}
      </Toaster>
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
          <PDFViewer />
        </div>

        <div
          className={`col-span-9 lg:col-span-4 ${isLg ? 'block' : displayChat ? 'block' : 'hidden'}`}
        >
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
                      className={`inline-block whitespace-pre-wrap rounded-xl px-4 py-3 ${message.role == 'assistant' ? 'rounded-bl-none bg-gray-light text-gray' : 'rounded-br-none bg-primary text-white'}`}
                    >
                      {message.content}
                    </span>
                  </div>
                  <Image
                    src={
                      message.role === 'assistant' ? '/bot.png' : '/user.png'
                    }
                    width="512"
                    height="512"
                    alt=""
                    className={`size-6 rounded-full ${message.role === 'assistant' ? 'order-1' : 'order-3'}`}
                  />
                  <ClipboardIcon
                    className={`size-6 w-6 shrink-0 cursor-pointer self-center rounded-full bg-primary p-1 text-white opacity-0 group-hover:opacity-100 ${message.role === 'assistant' ? 'order-3' : 'order-1'}`}
                    onClick={() => {
                      copyTextToClipboard(message.content)
                      notify()
                    }}
                  />
                </div>
              ))}
              {isLoading &&
                messages[messages.length - 1].role !== 'assistant' && (
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
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Say something..."
                    autoComplete="off"
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus={true}
                    value={input}
                    onChange={handleInputChange}
                    className="w-full rounded-full border-2 border-gray-light bg-gray-light py-2 pl-5 pr-16 text-gray placeholder-gray focus:border-primary focus:placeholder-gray focus:outline-none"
                  />
                  <div className="absolute inset-y-0 right-2 hidden items-center sm:flex">
                    <button
                      disabled={isLoading}
                      className="inline-flex size-8 items-center justify-center rounded-full bg-primary text-white transition duration-200 ease-in-out hover:bg-secondary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      type="submit"
                    >
                      {isLoading ? (
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="size-6 animate-spin bg-primary p-1 text-white"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="#1C64F2"
                          ></path>
                        </svg>
                      ) : (
                        <ArrowRightIcon className="size-6 rounded-full bg-primary p-1 text-white" />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
