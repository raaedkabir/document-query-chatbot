import { client } from '../lib/client'
import { groq } from 'next-sanity'

export interface PricingPlans {
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
}

interface PricingCopy {
  header: string
  description: string
  pricingPlans: PricingPlans[]
}

export async function getPricingCopy(): Promise<PricingCopy> {
  return client.fetch(
    groq`*[_type == "pricing"][0] {
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
