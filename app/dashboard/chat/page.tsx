'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useBreakpoints from '@/hooks/useBreakpoints'
import { useChat } from 'ai/react'
import Image from 'next/image'
import toast, { Toaster, resolveValue } from 'react-hot-toast'
import { Transition } from '@headlessui/react'
import PDFViewer from '@/components/Dashboard/PDFViewer'
import {
  ArrowRightIcon,
  ArrowPathIcon,
  ClipboardIcon,
} from '@heroicons/react/24/outline'
import LoadingIcon from '@/components/LoadingIcon'
import { useAppSelector } from '@/lib/store/hooks'

export default function DashboardChat() {
  const router = useRouter()
  const fileName = useAppSelector((state) => state.users.fileName)
  const userId = useAppSelector((state) => state.users.id)

  // redirect to dashboard if no file name or user id
  if (!fileName || !userId) {
    router.replace('/dashboard')
  }

  const [isFileUrlReady, setIsFileUrlReady] = useState(false)
  const [fileUrl, setFileUrl] = useState('https://example.com/')
  const [displayChat, setDisplayChat] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatRef = useRef<HTMLInputElement>(null)
  const { isSm, isLg } = useBreakpoints()
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

  useEffect(() => {
    fetch('/api/files/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, fileName }),
    })
      .then((response) => response.json())
      .then(({ data }) => {
        setFileUrl(data)
        setIsFileUrlReady(true)
      })
  }, [userId, fileName])

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
          <PDFViewer fileUrl={fileUrl} isFileUrlReady={isFileUrlReady} />
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
        </div>
      </div>
    </>
  )
}
