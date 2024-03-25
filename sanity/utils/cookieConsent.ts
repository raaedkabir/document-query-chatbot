import { client } from '../lib/client'
import { groq } from 'next-sanity'

interface CookieConsentCopy {
  header: string
  cookieConsentDescription: string
  buttonText: string
}

export async function getCookieConsentCopy(): Promise<CookieConsentCopy> {
  return client.fetch(
    groq`*[_type == "cookieConsent"][0] {
      header,
      cookieConsentDescription,
      buttonText
    }`,
    {},
    {
      next: {
        revalidate: 0,
      },
    }
  )
}
