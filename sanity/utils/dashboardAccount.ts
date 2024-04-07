import { client } from '../lib/client'
import { groq } from 'next-sanity'

export interface DashboardAccountCopy {
  header: string
  filesTitle: string
  welcomeCopy: string
  subnav: {
    subscription: string
    billing: string
  }
  membershipSection: {
    header: string
    changePlan: string
    cancelPlan: string
  }
  accountUsageSection: {
    header: string
    queriesCopy: string
    uploadedFilesCopy: string
    limitCopy: string
  }
}

export async function getDashboardAccountCopy(): Promise<DashboardAccountCopy> {
  return client.fetch(
    groq`*[_type == "dashboardAccount"][0] {
      header,
      filesTitle,
      welcomeCopy,
      subnav[0] {
        subscription,
        billing
      },
      membershipSection[0] {
        header,
        changePlan,
        cancelPlan
      },
      accountUsageSection[0] {
        header,
        queriesCopy,
        uploadedFilesCopy,
        limitCopy
      }
    }`,
    {},
    {
      next: {
        revalidate: 0,
      },
    }
  )
}
