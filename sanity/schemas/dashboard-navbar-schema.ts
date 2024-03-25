import { defineType } from 'sanity'

export default defineType({
  name: 'dashboardNavbar',
  title: 'Dashboard Navbar',
  type: 'document',
  fields: [
    {
      name: 'navbarTitle',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'filesTitle',
      title: 'Files Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'chatHistoryTitle',
      title: 'Chat History Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'chatHistoryActions',
      title: 'Chat History Title',
      type: 'array',
      of: [
        {
          type: 'document',
          fields: [
            {
              name: 'renameChatAction',
              title: 'Rename Chat Action',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'deleteChatAction',
              title: 'Delete Chat Action',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'signOutButton',
      title: 'Sign Out Button',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
})
