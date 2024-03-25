import { defineType } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'callToActionButton',
      title: 'Call To Action Button',
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
    {
      name: 'navLinks',
      title: 'Navigation Links',
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
      validation: (Rule) => Rule.required().min(1),
    },

    {
      name: 'contactTitle',
      title: 'Contact Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'contactDescription',
      title: 'Contact Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
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
    {
      name: 'legalText',
      title: 'Legal Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
})
