import { cookies } from 'next/headers'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { listObjects } from '@/services/storage'
import { getChats } from '@/services/dynamodb'
import PDFIcon from './PDFIcon'
import FileActionsButtons from './FileActionsButtons'

export default async function UploadedFiles({ userId }: { userId: string }) {
  const idToken = cookies().get('IdToken')?.value!

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

  if (!files || files.length === 0) {
    return (
      <div className="mx-auto py-6 text-center">
        <h2 className="text-2xl">No Files Uploaded</h2>
      </div>
    )
  }

  const { Items: ChatHistoryTableItems } = await getChats(userId)

  return (
    <>
      {files.map((file) => (
        <div
          key={file.name}
          className="basis-full overflow-hidden px-2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
        >
          <div className="flex items-center">
            <PDFIcon className="mr-2 size-8 shrink-0" />{' '}
            <h2 className="overflow-hidden text-ellipsis text-xl">
              {file.name}
            </h2>
          </div>
          <hr className="my-4 border-gray-dark/25" />
          <div className="mx-1 flex items-center justify-between gap-1 text-sm">
            <div title={file.uploadDate?.toString()}>
              {file.formattedUploadDate}
            </div>
            <div className="flex">
              <ChatBubbleLeftRightIcon className="mr-2 size-6" />{' '}
              {ChatHistoryTableItems.reduce((acc, chat) => {
                if (chat.file_name === file.name) {
                  acc += chat.queries
                }
                return acc
              }, 0)}
            </div>
            <FileActionsButtons userId={userId} fileName={file.name || ''} />
          </div>
          <hr className="my-4 border-gray-dark/25" />
        </div>
      ))}
    </>
  )
}
