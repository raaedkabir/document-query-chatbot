import { client } from '../lib/client'
import { groq } from 'next-sanity'

interface SiteMetadata {
  title: string
  description: string
  callToActionText: string
  callToActionURL: string
  image: string
}

export async function getSiteMetadata(): Promise<SiteMetadata[]> {
  return client.fetch(
    groq`*[_type == "siteMetadata"]{
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
