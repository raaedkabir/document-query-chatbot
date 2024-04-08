import { defineType } from 'sanity'

export default defineType({
  name: 'privacy',
  title: 'Privacy Policy',
  type: 'document',
  fields: [
    {
      name: 'header',
      title: 'Header',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
})
