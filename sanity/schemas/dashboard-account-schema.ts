import { defineType } from 'sanity'

export default defineType({
  name: 'dashboardAccount',
  title: 'Dashboard Account',
  type: 'document',
  fields: [
    {
      name: 'header',
      title: 'Header',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'welcomeCopy',
      title: 'Welcome Copy',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subnav',
      title: 'Subnavigation Menu',
      type: 'array',
      of: [
        {
          type: 'document',
          fields: [
            {
              name: 'subscription',
              title: 'Subscription',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'billing',
              title: 'Billing',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'membershipSection',
      title: 'Membership Section',
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
              name: 'changePlan',
              title: 'Change Plan Button',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'cancelPlan',
              title: 'Cancel Plan Button',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'accountUsageSection',
      title: 'Account Usage Section',
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
              name: 'queriesCopy',
              title: 'Queries Copy',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'uploadedFilesCopy',
              title: 'Uploaded Files Copy',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'limitCopy',
              title: 'Limit Copy',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
})
