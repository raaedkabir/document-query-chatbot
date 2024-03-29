import { Suspense } from 'react'
import { cookies } from 'next/headers'
import UploadModal from '@/components/Dashboard/UploadModal'
import UploadedFiles from '@/components/Dashboard/UploadedFiles'
import { getUserDetails } from '@/services/cognito'
import { getUserRecord } from '@/services/dynamodb'
import { listObjects } from '@/services/storage'
import { getDashboardCopy } from '@/sanity/utils/dashboard'
import { retrievePlanLimits } from '../actions'

export default async function Dashboard() {
  const accessToken = cookies().get('AccessToken')?.value!
  const idToken = cookies().get('IdToken')?.value!

  const dashboardCopy = await getDashboardCopy()

  const userDetails = await getUserDetails(accessToken)

  const userId =
    userDetails.UserAttributes?.find(
      (userAttribute) => userAttribute.Name === 'sub'
    )?.Value || ''

  const userRecord = await getUserRecord(userId)
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

  return (
    <>
      <div className="mx-auto w-full p-4 sm:pl-0">
        <div className="rounded-2xl border border-gray-dark/50 p-5">
          <div className="container mx-auto text-center">
            <h1 className="text-center text-3xl font-bold text-primary">
              DOCQA
            </h1>
            <div className="flex justify-between">
              <h2 className="text-center text-3xl font-bold">My Files</h2>
              <UploadModal
                copy={dashboardCopy}
                title={dashboardCopy.uploadModalTitle}
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
    </>
  )
}
