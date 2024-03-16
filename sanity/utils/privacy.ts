import { client } from '../lib/client'
import { groq } from 'next-sanity'
import type { PortableTextBlock } from 'sanity'

interface Privacy {
  header: string
  description: string
  content: PortableTextBlock
}

export async function getPrivacy(): Promise<Privacy[]> {
  return client.fetch(
    groq`*[_type == "privacy"]{
      header,
      description,
      content
    }`,
    {},
    {
      next: {
        revalidate: 0,
      },
    }
  )
}
