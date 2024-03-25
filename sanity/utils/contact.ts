import { client } from '../lib/client'
import { groq } from 'next-sanity'

interface FormFieldCopy {
  label: string
  placeholder: string
}

export interface ContactCopy {
  header: string
  description: string
  detailsHeader: string
  detailsDescription: string
  detailsList: {
    title: string
    icon: string
    content: string
  }[]
  formHeader: string
  nameFormField: FormFieldCopy
  emailFormField: FormFieldCopy
  subjectFormField: FormFieldCopy
  messageFormField: FormFieldCopy
  submitFormButtonText: string
}

export async function getContactCopy(): Promise<ContactCopy> {
  return client.fetch(
    groq`*[_type == "contact"][0] {
      header,
      description,
      detailsHeader,
      detailsDescription,
      detailsList[] {
        title,
        icon,
        content
      },
      formHeader,
      nameFormField[0] {
        label,
        placeholder
      },
      emailFormField[0] {
        label,
        placeholder
      },
      subjectFormField[0] {
        label,
        placeholder
      },
      messageFormField[0] {
        label,
        placeholder
      },
      submitFormButtonText
    }`,
    {},
    {
      next: {
        revalidate: 0,
      },
    }
  )
}
