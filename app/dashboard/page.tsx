import { cookies } from 'next/headers'
import UploadModal from '@/components/UploadModal'
import Uploader from '@/components/Uploader'
import UploadedFiles from '@/components/UploadedFiles'
import { getUser } from '@/services/cognito'
import { listObjects } from '@/services/storage'

export default async function Dashboard() {
  const accessToken = cookies().get('AccessToken')!
  const idToken = cookies().get('IdToken')!

  const userDetails = await getUser(accessToken.value)

  const userId =
    userDetails.UserAttributes?.find(
      (userAttribute) => userAttribute.Name === 'sub'
    )?.Value || ''

  const response = await listObjects(idToken.value, `users/${userId}/`)

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
        name: file.Key?.replace(`users/${userId}/`, ''),
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
              <UploadModal title="Upload PDF">
                <div className="mt-2">
                  <Uploader userId={userId} files={files} />
                </div>
              </UploadModal>
            </div>
            <hr className="my-4 border-gray-dark/25" />
            <div className="flex flex-wrap">
              <UploadedFiles userId={userId} files={files} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
