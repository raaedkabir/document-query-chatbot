import { client } from '../lib/client'
import { groq } from 'next-sanity'

interface Pricing {
  header: string
  description: string
  pricingPlans: {
    header: string
    description: string
    price: number
    rateText: string
    feature: boolean
    featureText?: string
    pdfLimit: string
    planDetails: {
      description: string
      icon: string
    }[]
    callToActionText: string
  }[]
}

export async function getPricing(): Promise<Pricing[]> {
  return client.fetch(
    groq`*[_type == "pricing"]{
      header,
      description,
      pricingPlans
    }`,
    {},
    {
      next: {
        revalidate: 0,
      },
    }
  )
}
