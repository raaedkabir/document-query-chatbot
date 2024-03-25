import { client } from '../lib/client'
import { groq } from 'next-sanity'

export interface HomeCopy {
  header: string
  description: string
  callToActionText: string
  callToActionURL: string
  imageSrc: string
  imageData: {
    width: number
    aspectRatio: number
    height: number
  }
  secondaryHeader: string
  secondaryDescription: string
  detailsList: {
    stepNumber: string
    title: string
    description: string
    imageSrc: string
    imageData: {
      width: number
      aspectRatio: number
      height: number
    }
  }[]
}

export async function getHomeCopy(): Promise<HomeCopy> {
  return client.fetch(
    groq`*[_type == "home"][0] {
      header,
      description,
      callToActionText,
      callToActionURL,
      "imageSrc": image.asset->url,
      "imageData": image.asset->metadata.dimensions,
      secondaryHeader,
      secondaryDescription,
      detailsList[] {
        stepNumber,
        title,
        description,
        "imageSrc": image.asset->url,
        "imageData": image.asset->metadata.dimensions
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
