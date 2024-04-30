import { cookies } from 'next/headers'
import { getUserDetails } from '@/services/cognito'
import { getChats, getUserRecord } from '@/services/dynamodb'
import NavbarWithNoSSR from '@/components/Dashboard/Navbar'
import { getDashboardNavbarCopy } from '@/sanity/utils/dashboardNavbar'
import { getQueriesUsage } from '@/lib/utils/getQueriesUsage'
import { getUploadedFilesUsage } from '@/lib/utils/getUploadedFilesUsage'
import { retrievePlanLimits } from '@/app/actions'
import { getStripeBillingPortalURL } from '@/lib/utils/getStripeBillingPortalURL'

export default async function NavbarWrapper() {
  const accessToken = cookies().get('AccessToken')?.value!
  const idToken = cookies().get('IdToken')?.value!

  const dashboardNavbarCopy = await getDashboardNavbarCopy()

  const userDetails = await getUserDetails(accessToken)

  const userId =
    userDetails.UserAttributes?.find(
      (userAttribute) => userAttribute.Name === 'sub'
    )?.Value || ''

  const givenName =
    userDetails.UserAttributes?.find(
      (userAttribute) => userAttribute.Name === 'given_name'
    )?.Value || ''

  const { Items: ChatHistoryTableItems } = await getChats(userId)

  const userRecord = await getUserRecord(userId)

  const planLimits = await retrievePlanLimits(
    userRecord.Item?.stripe_customer_id || ''
  )

  const queriesUsage = await getQueriesUsage(userId, planLimits)

  const uploadedFilesUsage = await getUploadedFilesUsage(
    idToken,
    userId,
    planLimits
  )

  const stripeBillingPortalURL = await getStripeBillingPortalURL(
    userRecord.Item?.stripe_customer_id
  )

  return (
    <NavbarWithNoSSR
      copy={dashboardNavbarCopy}
      chatHistory={ChatHistoryTableItems}
      givenName={givenName}
      userId={userId}
      planLimits={planLimits}
      queriesUsage={queriesUsage}
      uploadedFilesUsage={uploadedFilesUsage}
      stripeBillingPortalURL={stripeBillingPortalURL}
    />
  )
}
