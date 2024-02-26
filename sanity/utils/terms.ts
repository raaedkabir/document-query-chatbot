import { client } from '../lib/client'
import { groq } from 'next-sanity'
import type { PortableTextBlock } from 'sanity'

interface Terms {
  header: string
  description: string
  content: PortableTextBlock
}

export async function getTerms(): Promise<Terms[]> {
  return client.fetch(
    groq`*[_type == "terms"]{
      header,
      description,
      content
    }`
  )
}
