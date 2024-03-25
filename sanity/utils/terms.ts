import { client } from '../lib/client'
import { groq } from 'next-sanity'
import type { PortableTextBlock } from 'sanity'

interface TermsCopy {
  header: string
  description: string
  content: PortableTextBlock
}

export async function getTermsCopy(): Promise<TermsCopy> {
  return client.fetch(
    groq`*[_type == "terms"][0] {
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
