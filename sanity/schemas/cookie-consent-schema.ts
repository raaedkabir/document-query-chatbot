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
    },
    {
      name: 'cookieConsentDescription',
      title: 'Cookie Consent Description',
      type: 'text',
    },
    {
      name: 'buttonText',
      title: 'Cookie Consent Button Text',
      type: 'string',
    },
  ],
})
