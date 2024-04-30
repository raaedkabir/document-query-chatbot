import { client } from '../lib/client'
import { groq } from 'next-sanity'

export interface DashboardChatCopy {
  chatErrorMessage: string
  queryLimitErrorMessage: string
  copiedTextToClipboardMessage: string
  promptTextField: {
    label: string
    placeholder: string
  }
}

export async function getDashboardChatCopy(): Promise<DashboardChatCopy> {
  return client.fetch(
    groq`*[_type == "dashboardChat"][0] {
      chatErrorMessage,
      queryLimitErrorMessage,
      copiedTextToClipboardMessage,
      promptTextField[0] {
        label,
        placeholder
      }
    }`,
    {},
    {
      next: {
        revalidate: 0,
      },
    }
  )
}
