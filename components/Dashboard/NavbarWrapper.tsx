import { cookies } from 'next/headers'
import { getUserDetails } from '@/services/cognito'
import { getChats } from '@/services/dynamodb'
import NavbarWithNoSSR from '@/components/Dashboard/Navbar'

export default async function NavbarWrapper() {
  const accessToken = cookies().get('AccessToken')?.value!

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
      chatHistory={ChatHistoryTableItems}
      givenName={givenName}
      userId={userId}
    />
  )
}
