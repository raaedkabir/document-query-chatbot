import { defineType } from 'sanity'

export default defineType({
  name: 'dashboardChat',
  title: 'Dashboard Chat',
  type: 'document',
  fields: [
    {
      name: 'chatErrorMessage',
      title: 'Chat Error Message',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'queryLimitErrorMessage',
      title: 'Query Limit Error Message',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'copiedTextToClipboardMessage',
      title: 'Copied Text To Clipboard Message',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'promptTextField',
      title: 'Prompt Text Field',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'placeholder',
              title: 'Placeholder',
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
