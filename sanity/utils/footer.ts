import { client } from '../lib/client'
import { groq } from 'next-sanity'

interface LinkButtonCopy {
  text: string
  url: string
}

export interface FooterCopy {
  title: string
  description: string
  callToActionButton: LinkButtonCopy
  navLinks: LinkButtonCopy[]
  contactTitle: string
  contactDescription: string
  contactButton: LinkButtonCopy
  legalText: string
}

export async function getFooterCopy(): Promise<FooterCopy> {
  return client.fetch(
    groq`*[_type == "footer"][0] {
      title,
      description,
      callToActionButton[0] {
        text,
        url
      },
      navLinks[] {
        text,
        url
      },
      contactTitle,
      contactDescription,
      contactButton[0] {
        text,
        url
      },
      legalText
    }`,
    {},
    {
      next: {
        revalidate: 0,
      },
    }
  )
}
