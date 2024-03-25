import { cookies } from 'next/headers'
import { getUserDetails } from '@/services/cognito'
import { getChats } from '@/services/dynamodb'
import NavbarWithNoSSR from '@/components/Dashboard/Navbar'
import { getDashboardNavbarCopy } from '@/sanity/utils/dashboardNavbar'

export default async function NavbarWrapper() {
  const accessToken = cookies().get('AccessToken')?.value!

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

  return (
    <NavbarWithNoSSR
      copy={dashboardNavbarCopy}
      chatHistory={ChatHistoryTableItems}
      givenName={givenName}
      userId={userId}
    />
  )
}
