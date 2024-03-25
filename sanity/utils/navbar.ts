import { client } from '../lib/client'
import { groq } from 'next-sanity'

export interface NavbarCopy {
  title: string
  navItems: {
    text: string
    url: string
    highlight: boolean
  }[]
}

export async function getNavbarCopy(): Promise<NavbarCopy> {
  return client.fetch(
    groq`*[_type == "navbar"][0] {
      title,
      navItems[] {
        text,
        url,
        highlight
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
