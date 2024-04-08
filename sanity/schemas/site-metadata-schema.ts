import { defineType } from 'sanity'

export default defineType({
  name: 'siteMetadata',
  title: 'Site Metadata',
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
  ],
})
