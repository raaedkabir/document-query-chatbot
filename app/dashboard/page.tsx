import { Suspense } from 'react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import {
  ChatBubbleLeftRightIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline'
import UploadModal from '@/components/Dashboard/UploadModal'
import UploadedFiles from '@/components/Dashboard/UploadedFiles'
import ProgressBar from '@/components/UI/ProgressBar'
import { getUserDetails } from '@/services/cognito'
import { getUserRecord } from '@/services/dynamodb'
import { listObjects } from '@/services/storage'
import { getDashboardCopy } from '@/sanity/utils/dashboard'
import { getUploadedFilesUsage } from '@/lib/utils/getUploadedFilesUsage'
import { checkForValidPlan, retrievePlanLimits } from '@/app/actions'
import { getStripeBillingPortalURL } from '@/lib/utils/getStripeBillingPortalURL'

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { selectedPlan?: string }
}) {
  const accessToken = cookies().get('AccessToken')?.value!
  const idToken = cookies().get('IdToken')?.value!
  const selectedPlan = cookies().get('selectedPlan')?.value

  const dashboardCopy = await getDashboardCopy()

  const userDetails = await getUserDetails(accessToken)

  const userId =
    userDetails.UserAttributes?.find(
      (userAttribute) => userAttribute.Name === 'sub'
    )?.Value || ''

  const userRecord = await getUserRecord(userId)
  await checkForValidPlan(
    userRecord.Item?.stripe_customer_id || '',
    searchParams.selectedPlan || selectedPlan || ''
  )
  const planLimits = await retrievePlanLimits(
    userRecord.Item?.stripe_customer_id || ''
  )

  const response = await listObjects(idToken, `users/${userId}/uploads/`)

  const files = response.Contents
    // Sort files by LastModified date
    ?.sort((a, b) => {
      if (a.LastModified && b.LastModified) {
        return (
          new Date(b.LastModified).getTime() -
          new Date(a.LastModified).getTime()
        )
      }

      return 0
    })
    // Map files to get only the file name
    ?.map((file) => {
      return {
        name: file.Key?.replace(`users/${userId}/uploads/`, ''),
        uploadDate: file.LastModified,
        formattedUploadDate: new Date(
          file.LastModified || ''
        ).toLocaleDateString('en-us', { year: 'numeric', month: 'short' }),
      }
    })
    // Filter out the directory object
    ?.filter((file) => file.name !== '')

  const uploadedFilesUsage = await getUploadedFilesUsage(
    idToken,
    userId,
    planLimits
  )

  const queryUsagePercentage = (250 / Number(planLimits.queries)) * 100
  const uploadedFilesUsagePercentage =
    (uploadedFilesUsage / Number(planLimits.pdfLimit)) * 100

  const stripeBillingPortalURL = await getStripeBillingPortalURL(
    userRecord.Item?.stripe_customer_id
  )

  return (
    <div className="mx-auto w-full p-4 sm:pl-0">
      <div className="rounded-2xl border border-gray-dark/50 p-5">
        <h2 className="mb-2 text-xl font-bold">
          {dashboardCopy.accountUsageSection.header}
        </h2>
        <div className="flex justify-between">
          <h3 className="flex items-center">
            <ChatBubbleLeftRightIcon className="mr-2 size-6" />
            <span className="text-xl font-bold">
              {dashboardCopy.accountUsageSection.queriesCopy}
            </span>
          </h3>
          <div>
            <span className="text-lg font-bold text-primary">250</span> /{' '}
            {planLimits.queries} {dashboardCopy.accountUsageSection.limitCopy}
          </div>
        </div>

        <ProgressBar percentage={queryUsagePercentage} />

        <div className="h-4" />

        <div className="flex justify-between">
          <h3 className="flex items-center">
            <DocumentIcon className="mr-2 size-6" />
            <span className="text-xl font-bold">
              {dashboardCopy.accountUsageSection.uploadedFilesCopy}
            </span>
          </h3>
          <div>
            <span className="text-lg font-bold text-primary">
              {uploadedFilesUsage}
            </span>{' '}
            / {planLimits.pdfLimit}{' '}
            {dashboardCopy.accountUsageSection.limitCopy}
          </div>
        </div>

        <ProgressBar percentage={uploadedFilesUsagePercentage} />
        {(queryUsagePercentage >= 50 || uploadedFilesUsagePercentage >= 50) && (
          <div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-gray-dark">
                {dashboardCopy.accountUsageSection.limitCTAMessage}
              </div>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
                href={stripeBillingPortalURL}
              >
                {dashboardCopy.accountUsageSection.limitCTAButtonText}
              </Link>
            </div>
            <div className="mt-4 text-gray-dark">
              {dashboardCopy.accountUsageSection.limitAdditionalCopy}
            </div>
          </div>
        )}
      </div>

      <div className="h-4" />

      <div className="rounded-2xl border border-gray-dark/50 p-5">
        <div className="container mx-auto text-center">
          <h1 className="text-center text-3xl font-bold text-primary">
            {dashboardCopy.title}
          </h1>
          <div className="flex justify-between">
            <h2 className="text-center text-3xl font-bold">
              {dashboardCopy.header}
            </h2>
            <UploadModal
              copy={dashboardCopy}
              userId={userId}
              files={files}
              planLimits={planLimits}
            />
          </div>
          <hr className="my-4 border-gray-dark/25" />
          <div className="flex flex-wrap">
            <Suspense fallback={<div>Loading...</div>}>
              <UploadedFiles userId={userId} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
