'use client'

import { useState, useRef, useEffect } from 'react'
import useBreakpoints from '@/hooks/useBreakpoints'
import Image from 'next/image'
import toast, { Toaster, resolveValue } from 'react-hot-toast'
import { Transition } from '@headlessui/react'
import PDFViewer from '@/components/PDFViewer'
import {
  ArrowRightIcon,
  ArrowPathIcon,
  ClipboardIcon,
} from '@heroicons/react/24/outline'

export default function Dashboard() {
  const [isBotTyping, setIsBotTyping] = useState(false)
  const [displayChat, setDisplayChat] = useState(true)
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const { isSm, isLg } = useBreakpoints()

  useEffect(() => {
    if (messages[messages.length - 1]?.from === 'user') {
      // add a fake response from the bot
      setTimeout(() => {
        addChat('Hello World!', 'bot')
      }, 1000)
    }
  }, [messages])

  const notify = () => toast('Copied to clipboard!')

  const updateChat = (input: HTMLInputElement) => {
    if (input.value.trim()) {
      addChat(input.value.trim(), 'user')
      input.value = ''
    }
  }

  const scrollChat = () => {
    const messagesContainer = document.getElementById('messages') as HTMLElement

    setTimeout(() => {
      messagesContainer.scrollTop =
        messagesContainer.scrollHeight - messagesContainer.clientHeight
    }, 100)
  }

  const addChat = (input: string, from: string) => {
    if (from === 'bot') {
      setIsBotTyping(true)
      scrollChat()

      // add bot message with fake delay to seem "real"
      setTimeout(() => {
        setIsBotTyping(false)
        setTimeout(() => {
          setMessages([...messages, { from: from, text: input }])
        })
      }, 1000)
    } else {
      // add message
      setMessages([...messages, { from: from, text: input }])

      // keep messages at most recent
      scrollChat()
    }
  }

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
              id="messages"
              className="flex flex-col space-y-4 overflow-y-auto p-3"
            >
              {messages.map((message, key) => (
                <div
                  key={key}
                  className={`group flex items-end ${message.from === 'bot' ? '' : 'justify-end'}`}
                >
                  <div
                    className={`mx-2 flex max-w-lg flex-col space-y-2 leading-tight ${message.from == 'bot' ? 'order-2 items-start' : 'order-2 items-end'}`}
                  >
                    <span
                      className={`inline-block rounded-xl px-4 py-3 ${message.from == 'bot' ? 'rounded-bl-none bg-gray-light text-gray' : 'rounded-br-none bg-primary text-white'}`}
                    >
                      {message.text}
                    </span>
                  </div>
                  <Image
                    src={message.from === 'bot' ? '/bot.png' : '/user.png'}
                    width="512"
                    height="512"
                    alt=""
                    className={`size-6 rounded-full ${message.from === 'bot' ? 'order-1' : 'order-3'}`}
                  />
                  <ClipboardIcon
                    className={`hidden size-6 cursor-pointer self-center rounded-full bg-primary p-1 text-white group-hover:block ${message.from === 'bot' ? 'order-3' : 'order-1'}`}
                    onClick={() => {
                      copyTextToClipboard(message.text)
                      notify()
                    }}
                  />
                </div>
              ))}
              {isBotTyping && (
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
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Say something..."
                  autoComplete="off"
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus={true}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      updateChat(event.target as HTMLInputElement)
                    }
                  }}
                  className="w-full rounded-full border-2 border-gray-light bg-gray-light py-2 pl-5 pr-16 text-gray placeholder-gray focus:border-primary focus:placeholder-gray focus:outline-none"
                />
                <div className="absolute inset-y-0 right-2 hidden items-center sm:flex">
                  <button
                    type="button"
                    className="inline-flex size-8 items-center justify-center rounded-full bg-primary text-white transition duration-200 ease-in-out hover:bg-secondary focus:outline-none"
                    onClick={(el) => {
                      el.preventDefault()
                      updateChat(inputRef.current as HTMLInputElement)
                    }}
                  >
                    <ArrowRightIcon className="size-6 rounded-full bg-primary p-1 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
