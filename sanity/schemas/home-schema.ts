import { defineType } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'callToActionText',
      title: 'CTA - Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'callToActionURL',
      title: 'CTA - URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'secondaryHeader',
      title: 'Secondary Header',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'secondaryDescription',
      title: 'Secondary Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'detailsList',
      title: 'Details List',
      type: 'array',
      of: [
        {
          type: 'document',
          fields: [
            {
              name: 'stepNumber',
              title: 'Step Number',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              fields: [
                {
                  name: 'alt',
                  title: 'Alt',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
              ],
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(2).max(3),
    },
  ],
})
