import { client } from '../lib/client'
import { groq } from 'next-sanity'

export interface DashboardNavbarCopy {
  navbarTitle: string
  filesTitle: string
  chatHistoryTitle: string
  chatHistoryActions: {
    renameChatAction: string
    deleteChatAction: string
  }
  signOutButton: string
}

export async function getDashboardNavbarCopy(): Promise<DashboardNavbarCopy> {
  return client.fetch(
    groq`*[_type == "dashboardNavbar"][0] {
      navbarTitle,
      filesTitle,
      chatHistoryTitle,
      chatHistoryActions[0] {
        renameChatAction,
        deleteChatAction
      },
      signOutButton
    }`,
    {},
    {
      next: {
        revalidate: 0,
      },
    }
  )
}
