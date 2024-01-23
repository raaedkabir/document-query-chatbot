import { defineType } from 'sanity'

export default defineType({
  name: 'planDetail',
  title: 'Plan Detail',
  type: 'document',
  fields: [
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: ['check', 'minus'],
      },
      validation: (Rule) => Rule.required(),
    },
  ],
})
