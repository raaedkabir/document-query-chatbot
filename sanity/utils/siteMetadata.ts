import { client } from '../lib/client'
import { groq } from 'next-sanity'

interface SiteMetadataCopy {
  title: string
  description: string
  callToActionText: string
  callToActionURL: string
  image: string
}

export async function getSiteMetadataCopy(): Promise<SiteMetadataCopy> {
  return client.fetch(
    groq`*[_type == "siteMetadata"][0] {
      title,
      description
    }`,
    {},
    {
      next: {
        revalidate: 0,
      },
    }
  )
}
