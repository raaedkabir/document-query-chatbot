import { defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact',
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
      name: 'detailsHeader',
      title: 'Details Header',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'detailsDescription',
      title: 'Details Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'detailsList',
      title: 'Details List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: ['envelope', 'phone'],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Content',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(2),
    },
    {
      name: 'formHeader',
      title: 'Form Header',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'nameFormField',
      title: 'Name Form Field',
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
    {
      name: 'emailFormField',
      title: 'Email Form Field',
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
    {
      name: 'subjectFormField',
      title: 'Subject Form Field',
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
    {
      name: 'messageFormField',
      title: 'Message Form Field',
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
    {
      name: 'submitFormButtonText',
      title: 'Submit Form Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
})
