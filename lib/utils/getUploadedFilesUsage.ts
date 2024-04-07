import { listObjects } from '@/services/storage'
import type { retrievePlanLimits } from '@/app/actions'

export const getUploadedFilesUsage = async (
  idToken: string,
  userId: string,
  planLimits: Awaited<ReturnType<typeof retrievePlanLimits>>
) => {
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

  if (!files) return 0
  return files.reduce(
    (acc, file) =>
      acc +
      Number(
        file.uploadDate?.getTime()! / 1000 > planLimits.currentPeriodStart
      ),
    0
  )
}
