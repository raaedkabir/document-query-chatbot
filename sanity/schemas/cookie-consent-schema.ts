import { defineType } from 'sanity'

export default defineType({
  name: 'cookieConsent',
  title: 'Cookie Consent Banner',
  type: 'document',
  fields: [
    {
      name: 'header',
      title: 'Header',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'cookieConsentDescription',
      title: 'Cookie Consent Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'buttonText',
      title: 'Cookie Consent Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
})
