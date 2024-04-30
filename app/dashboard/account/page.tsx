import { cookies } from 'next/headers'
import Link from 'next/link'
import Stripe from 'stripe'
import {
  UserIcon,
  ChatBubbleLeftRightIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline'
import ProgressBar from '@/components/UI/ProgressBar'
import { getUserDetails } from '@/services/cognito'
import { getUserRecord } from '@/services/dynamodb'
import { retrievePlanLimits } from '@/app/actions'
import { getQueriesUsage } from '@/lib/utils/getQueriesUsage'
import { getUploadedFilesUsage } from '@/lib/utils/getUploadedFilesUsage'
import { getDashboardAccountCopy } from '@/sanity/utils/dashboardAccount'
import { getStripeBillingPortalURL } from '@/lib/utils/getStripeBillingPortalURL'

export default async function DashboardAccount() {
  const dashboardAccountCopy = await getDashboardAccountCopy()

  const accessToken = cookies().get('AccessToken')?.value!
  const idToken = cookies().get('IdToken')?.value!

  const userDetails = await getUserDetails(accessToken)

  const givenName =
    userDetails.UserAttributes?.find(
      (userAttribute) => userAttribute.Name === 'given_name'
    )?.Value || ''

  const userId =
    userDetails.UserAttributes?.find(
      (userAttribute) => userAttribute.Name === 'sub'
    )?.Value || ''

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

  const stripe = new Stripe(
    process.env.TEST_MODE === 'true'
      ? process.env.STRIPE_TEST_SECRET_KEY!
      : process.env.STRIPE_SECRET_KEY!
  )

  // Get the user's subscription
  const subscriptions = await stripe.subscriptions.list({
    customer: userRecord.Item?.stripe_customer_id || '',
  })

  // Get the first subscription of the user,
  // all users should only have one subscription at a time
  const subscription = subscriptions.data[0]

  // Get the product details of the user's subscription
  const product = await stripe.products.retrieve(
    // @ts-ignore
    subscription.items.data[0].plan.product
  )

  const stripeBillingPortalURL = await getStripeBillingPortalURL(
    userRecord.Item?.stripe_customer_id
  )

  return (
    <div className="mx-auto w-full p-4 sm:pl-0">
      <div className="w-full rounded-2xl border border-gray-dark/50 p-5">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl">
            <h1 className="mb-3 text-3xl font-bold">
              {dashboardAccountCopy.header}
            </h1>

            <div className="flex flex-wrap md:flex-nowrap">
              <div className="m-2 w-full md:w-1/4">
                <div className="rounded border border-gray-dark/50 p-2">
                  <UserIcon className="my-4 size-16 w-full rounded-full text-center" />
                  <h2 className="text-xl font-bold">
                    {dashboardAccountCopy.welcomeCopy}{' '}
                    <span className="text-primary">{givenName}</span>
                  </h2>
                </div>
                <div className="mt-2 rounded border border-gray-dark/50 p-2">
                  <div className="flex flex-col">
                    <Link
                      href="/dashboard/account"
                      className="text-xl font-bold text-primary"
                    >
                      {dashboardAccountCopy.subnav.subscription}
                    </Link>
                    <Link
                      href={stripeBillingPortalURL}
                      className="text-xl font-bold"
                    >
                      {dashboardAccountCopy.subnav.billing}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="m-2 w-full md:w-3/4">
                <div className="flex flex-col gap-3 rounded border border-gray-dark/50 p-2 text-center">
                  <h2 className="text-xl font-bold">
                    {dashboardAccountCopy.membershipSection.header}
                  </h2>
                  <h3 className="text-3xl font-bold text-primary">
                    {product.name}
                  </h3>
                  <Link
                    className="inline-block items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/80 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
                    href={stripeBillingPortalURL}
                  >
                    {dashboardAccountCopy.membershipSection.changePlan}
                  </Link>
                  <Link
                    className="inline-block items-center justify-center rounded-md border border-error bg-white px-8 py-2 text-sm font-medium text-error transition-colors hover:bg-error/20 focus:outline-none focus:ring-4 focus:ring-error/50 disabled:pointer-events-none disabled:opacity-50"
                    href={stripeBillingPortalURL}
                  >
                    {dashboardAccountCopy.membershipSection.cancelPlan}
                  </Link>
                </div>
                <div className="mt-2 rounded border border-gray-dark/50 p-2">
                  <h2 className="mb-2 text-xl font-bold">
                    {dashboardAccountCopy.accountUsageSection.header}
                  </h2>
                  <div className="flex justify-between">
                    <h3 className="flex items-center">
                      <ChatBubbleLeftRightIcon className="mr-2 size-6" />
                      <span className="text-xl font-bold">
                        {dashboardAccountCopy.accountUsageSection.queriesCopy}
                      </span>
                    </h3>
                    <div>
                      <span className="text-lg font-bold text-primary">
                        {queriesUsage}
                      </span>{' '}
                      / {planLimits.queries}{' '}
                      {dashboardAccountCopy.accountUsageSection.limitCopy}
                    </div>
                  </div>

                  <ProgressBar
                    percentage={
                      (queriesUsage / Number(planLimits.queries)) * 100
                    }
                  />

                  <div className="h-4" />

                  <div className="flex justify-between">
                    <h3 className="flex items-center">
                      <DocumentIcon className="mr-2 size-6" />
                      <span className="text-xl font-bold">
                        {
                          dashboardAccountCopy.accountUsageSection
                            .uploadedFilesCopy
                        }
                      </span>
                    </h3>
                    <div>
                      <span className="text-lg font-bold text-primary">
                        {uploadedFilesUsage}
                      </span>{' '}
                      / {planLimits.pdfLimit}{' '}
                      {dashboardAccountCopy.accountUsageSection.limitCopy}
                    </div>
                  </div>

                  <ProgressBar
                    percentage={
                      (uploadedFilesUsage / Number(planLimits.pdfLimit)) * 100
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
