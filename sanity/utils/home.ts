import { client } from '../lib/client'
import { groq } from 'next-sanity'

interface Home {
  header: string
  description: string
  callToActionText: string
  callToActionURL: string
  image: string
}

export async function getHome(): Promise<Home[]> {
  return client.fetch(
    groq`*[_type == "home"]{
      header,
      description,
      callToActionText,
      callToActionURL,
      "image": image.asset->url
    }`,
    {},
    {
      next: {
        revalidate: 0,
      },
    }
  )
}
