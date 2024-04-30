import { getQueries } from '@/services/dynamodb'
import type { retrievePlanLimits } from '@/app/actions'

export const getQueriesUsage = async (
  userId: string,
  planLimits: Awaited<ReturnType<typeof retrievePlanLimits>>
) => {
  const response = await getQueries(userId)

  if (!response.Items) return 0
  return response.Items.reduce(
    (acc, item) =>
      acc + Number(item.query_created / 1000 > planLimits.currentPeriodStart),
    0
  )
}
