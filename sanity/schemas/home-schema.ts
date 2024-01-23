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
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'callToActionText',
      title: 'CTA - Text',
      type: 'string',
    },
    {
      name: 'callToActionURL',
      title: 'CTA - URL',
      type: 'url',
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
        },
      ],
    },
  ],
})
