import { defineType } from 'sanity'

export default defineType({
  name: 'pricing',
  title: 'Pricing',
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
      name: 'pricingPlans',
      title: 'Pricing Plans',
      type: 'array',
      of: [
        {
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
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: 'rateText',
              title: 'Rate Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'feature',
              title: 'Feature',
              description: 'Highlight this card.',
              type: 'boolean',
            },
            {
              name: 'featureText',
              title: 'Feature Text',
              description: 'Display this text on top of the card.',
              type: 'string',
              hidden: ({ parent }) => !parent?.feature === true,
            },
            {
              name: 'pdfLimit',
              title: 'PDF Limit',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'planDetails',
              title: 'Plan Details',
              type: 'array',
              of: [
                {
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
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: 'callToActionText',
              title: 'CTA - Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          initialValue: {
            feature: false,
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(3),
    },
  ],
})
