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
          type: 'pricingPlan',
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(3),
    },
  ],
})
