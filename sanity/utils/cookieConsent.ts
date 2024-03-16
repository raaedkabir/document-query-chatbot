import { client } from '../lib/client'
import { groq } from 'next-sanity'

interface CookieConsent {
  header: string
  cookieConsentDescription: string
  buttonText: string
}

export async function getCookieConsent(): Promise<CookieConsent[]> {
  return client.fetch(
    groq`*[_type == "cookieConsent"]{
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
