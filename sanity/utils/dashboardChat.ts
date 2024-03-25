import { client } from '../lib/client'
import { groq } from 'next-sanity'

export interface DashboardChatCopy {
  chatErrorMessage: string
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
