import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUserDetails } from '@/services/cognito'
import { getUserRecord, getChat } from '@/services/dynamodb'
import PanelWrapper from '@/components/Dashboard/Chat/PanelWrapper'
import { getQueriesUsage } from '@/lib/utils/getQueriesUsage'
import { retrievePlanLimits } from '@/app/actions'
import { getDashboardChatCopy } from '@/sanity/utils/dashboardChat'

export default async function DashboardChat({
  searchParams,
}: {
  searchParams: { chat_id?: string }
}) {
  /**
   * Redirect to login if no access token is found
   */
  const accessToken = cookies().get('AccessToken')?.value
  if (!accessToken) redirect('/login')

  /**
   * Redirect to dashboard if no chat id is found
   */
  const chatId = searchParams.chat_id
  if (!chatId) redirect('/dashboard')

  /**
   * Get Dashboard Chat page copy
   */
  const dashboardChatCopy = await getDashboardChatCopy()

  /**
   * Get user details
   */
  const userDetails = await getUserDetails(accessToken)
  const userId =
    userDetails.UserAttributes?.find(
      (userAttribute) => userAttribute.Name === 'sub'
    )?.Value || ''

  /**
   * Get chat details
   */
  const { Item: chatDetails } = await getChat(userId, chatId)

  /**
   * Get queries usage
   */
  const userRecord = await getUserRecord(userId)
  const planLimits = await retrievePlanLimits(
    userRecord.Item?.stripe_customer_id || ''
  )
  const queriesUsage = await getQueriesUsage(userId, planLimits)

  if (!chatDetails) redirect('/dashboard')

  return (
    <PanelWrapper
      copy={dashboardChatCopy}
      chatDetails={chatDetails}
      usedQueries={queriesUsage}
      maxQueries={+planLimits.queries}
    />
  )
}
