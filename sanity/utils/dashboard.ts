import { client } from '../lib/client'
import { groq } from 'next-sanity'

export interface DashboardCopy {
  title: string
  header: string
  accountUsageSection: {
    header: string
    queriesCopy: string
    uploadedFilesCopy: string
    limitCopy: string
    limitCTAMessage: string
    limitCTAButtonText: string
    limitAdditionalCopy: string
  }
  uploadFileButtonText: string
  uploadModalTitle: string
  uploadModalContent: string
  uploadModalFileTypeRestrictions: string
  uploadModalFileSizeRestrictions: string
  uploadModalLoadingMessages: {
    uploadingFileMessage: string
    writingToDatabaseMessage: string
    redirectingMessage: string
  }
  uploadModalErrorMessages: {
    fileUploadQuotaMessage: string
    fileSizeMessage: string
    fileTypeMessage: string
    fileHasTooManyPagesMessage: string
    fileNameAlreadyExistsMessage: string
  }
}

export async function getDashboardCopy(): Promise<DashboardCopy> {
  return client.fetch(
    groq`*[_type == "dashboard"][0] {
      title,
      header,
      accountUsageSection[0] {
        header,
        queriesCopy,
        uploadedFilesCopy,
        limitCopy,
        limitCTAMessage,
        limitCTAButtonText,
        limitAdditionalCopy
      },
      uploadFileButtonText,
      uploadModalTitle,
      uploadModalContent,
      uploadModalFileTypeRestrictions,
      uploadModalFileSizeRestrictions,
      uploadModalLoadingMessages[0] {
        uploadingFileMessage,
        writingToDatabaseMessage,
        redirectingMessage
      },
      uploadModalErrorMessages[0] {
        fileUploadQuotaMessage,
        fileSizeMessage,
        fileTypeMessage,
        fileHasTooManyPagesMessage,
        fileNameAlreadyExistsMessage
      }
    }`,
    {},
    {
      next: {
        revalidate: 0,
      },
    }
  )
}
