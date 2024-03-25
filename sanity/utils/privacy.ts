import { client } from '../lib/client'
import { groq } from 'next-sanity'
import type { PortableTextBlock } from 'sanity'

interface PrivacyCopy {
  header: string
  description: string
  content: PortableTextBlock
}

export async function getPrivacyCopy(): Promise<PrivacyCopy> {
  return client.fetch(
    groq`*[_type == "privacy"][0] {
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
