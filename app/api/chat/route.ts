import { NextRequest, NextResponse } from 'next/server'
import { Message } from 'ai'
import { queryDocument } from '@/lib/langchain'

const formatChatHistory = (message: Message) =>
  `${message.role === 'assistant' ? 'Assistant' : 'Human'}: ${message.content}`

export async function POST(req: NextRequest) {
  const body = await req.json()
  const messages: Message[] = body.messages ?? []
  const { fileName, userId }: { fileName: string; userId: string } = body
  const question = messages[messages.length - 1].content
  // retrieve up tp 10 previous messages to use as chat history
  const chatHistory = messages
    .slice(Math.max(messages.length - 11, 0), -1)
    .map(formatChatHistory)

  if (!question) {
    return NextResponse.json('Error: No question in the request', {
      status: 400,
    })
  }

  try {
    const streamingTextResponse = queryDocument({
      fileName,
      userId,
      question: question.replaceAll('\n', ' ').trim(),
      chatHistory: chatHistory.join('\n'),
    })

    return streamingTextResponse
  } catch (error) {
    console.error('Internal server error: ', error)
    return NextResponse.json('Error: Something went wrong. Try again!', {
      status: 500,
    })
  }
}
