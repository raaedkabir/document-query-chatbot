import { client } from '../lib/client'
import { groq } from 'next-sanity'

export interface DashboardNavbarCopy {
  navbarTitle: string
  filesTitle: string
  accountUsageTitle: {
    header: string
    queriesCopy: string
    uploadedFilesCopy: string
    limitCTAButtonText: string
  }
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
      accountUsageTitle[0] {
        header,
        queriesCopy,
        uploadedFilesCopy,
        limitCTAButtonText
      },
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
