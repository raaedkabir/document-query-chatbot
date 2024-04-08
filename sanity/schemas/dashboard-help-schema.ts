import { defineType } from 'sanity'

export default defineType({
  name: 'dashboardHelp',
  title: 'Dashboard Help',
  type: 'document',
  fields: [
    {
      name: 'header',
      title: 'Header',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'faqList',
      title: 'FAQ List',
      type: 'array',
      of: [
        {
          type: 'document',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'contactButton',
      title: 'Contact Button',
      type: 'array',
      of: [
        {
          type: 'document',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().max(1),
    },
  ],
})
