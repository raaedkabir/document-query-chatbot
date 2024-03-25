import { client } from '../lib/client'
import { groq } from 'next-sanity'

export interface DashboardHelpCopy {
  header: string
  faqList: {
    question: string
    answer: string
  }[]
  contactButton: {
    text: string
    url: string
  }
}

export async function getDashboardHelpCopy(): Promise<DashboardHelpCopy> {
  return client.fetch(
    groq`*[_type == "dashboardHelp"][0] {
      header,
      faqList[] {
        question,
        answer
      },
      contactButton[0] {
        text,
        url
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
