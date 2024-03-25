'use client'

import { useMemo, useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { PreventCloseContext } from '../UI/Dialog'
import { useDropzone } from 'react-dropzone'
import { DocumentIcon } from '@heroicons/react/24/outline'
import { getDocument } from 'pdfjs-dist'
import LoadingIcon from '@/components/LoadingIcon'
import { useAppStore } from '@/lib/store/hooks'
import { setFileName, setId } from '@/lib/store/features/users/usersSlice'
import { chunkFileForS3, chunkFileForPinecone } from '@/lib/utils/getChunks'
import { putNewChat } from '@/services/dynamodb'
import type {
  CreateMultipartUploadCommandOutput,
  UploadPartCommandOutput,
} from '@aws-sdk/client-s3'
import type { DashboardCopy } from '@/sanity/utils/dashboard'

type InitiateUploadResponse = {
  message: string
  data: CreateMultipartUploadCommandOutput
}

type PartUploadResponse = {
  message: string
  data: UploadPartCommandOutput
}

const replaceCopyPlaceholder = (
  copy: string,
  value: string | number,
  placeholder = /\{(.+?)\}/
) => {
  if (!copy) return ''
  if (!value) return copy
  if (typeof value === 'number') value = value.toString()

  return copy.replace(placeholder, value)
}

export default function Uploader({
  copy,
  userId,
  files,
  planLimits,
}: {
  copy: DashboardCopy
  userId: string
  files: { name: string | undefined }[] | undefined
  planLimits: {
    pdfLimit: string | number
    pdfSize: string | number
    pdfPages: string | number
    queries: string | number
    adFree: 'true' | 'false'
    currentPeriodStart: number
  }
}) {
  // prevent modal from closing while uploading
  const { setPreventClose } = useContext(PreventCloseContext)

  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const store = useAppStore()
  const maxFileSizeInMB = Number(planLimits.pdfSize)

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: { 'application/pdf': [] },
    autoFocus: true,
    maxFiles: 1,
    multiple: false,
    maxSize: maxFileSizeInMB * 1000000,
    disabled: isLoading,
    onError: (err) => {
      console.log(err)
    },
    onDropRejected: (fileRejections) => {
      const errors = fileRejections[0].errors
      setError(true)
      if (errors.some(({ code }) => code === 'file-too-large')) {
        setErrorMessage(
          replaceCopyPlaceholder(
            copy.uploadModalErrorMessages.fileSizeMessage,
            maxFileSizeInMB
          )
        )
      } else if (errors.some(({ code }) => code === 'file-invalid-type')) {
        setErrorMessage(copy.uploadModalErrorMessages.fileTypeMessage)
      }
    },
    onDropAccepted: (acceptedFiles) => {
      acceptedFiles.forEach((file, index) => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = () => {
          const typedArray = new Uint8Array(reader.result as ArrayBuffer)
          // make a copy of typedArray and pass it to getDocument
          getDocument(typedArray.slice(0)).promise.then(async (doc) => {
            const numPages = doc.numPages

            if (numPages > Number(planLimits.pdfPages)) {
              // remove file from acceptedFiles array
              acceptedFiles.splice(index, 1)
              setError(true)
              setErrorMessage(
                replaceCopyPlaceholder(
                  copy.uploadModalErrorMessages.fileHasTooManyPagesMessage,
                  planLimits.pdfPages
                )
              )
            } else if (files?.some((f) => f.name === file.name)) {
              setError(true)
              setErrorMessage(
                copy.uploadModalErrorMessages.fileNameAlreadyExistsMessage
              )
            } else {
              setPreventClose(true)
              setIsLoading(true)

              /**
               * Upload file to S3
               */
              setLoadingMessage('Uploading PDF...')
              setLoadingProgress(0)

              // initiate upload
              const response = await fetch('/api/files/upload/initiate', {
                method: 'POST',
                body: JSON.stringify({ userId, fileName: file.name }),
              })
              const {
                data: { UploadId },
              }: InitiateUploadResponse = await response.json()

              // upload parts
              const uploadedParts: { ETag: string; PartNumber: number }[] = []

              const s3Chunks = chunkFileForS3(typedArray)

              for (const [index, chunk] of s3Chunks.entries()) {
                const formData = new FormData()
                formData.append('userId', userId)
                formData.append('fileName', file.name)
                formData.append(
                  'body',
                  new Blob([chunk], { type: 'application/pdf' })
                )
                formData.append('uploadId', UploadId!)
                formData.append('partNumber', (index + 1).toString())
                await fetch('/api/files/upload/part', {
                  method: 'POST',
                  body: formData,
                })
                  .then((response) => response.json())
                  .then((data: PartUploadResponse) => {
                    uploadedParts.push({
                      ETag: data.data.ETag!,
                      PartNumber: index + 1,
                    })

                    setLoadingProgress(((index + 1) / s3Chunks.length) * 100) // update progress
                  })
              }

              // complete upload
              await fetch('/api/files/upload/complete', {
                method: 'POST',
                body: JSON.stringify({
                  userId,
                  fileName: file.name,
                  uploadId: UploadId,
                  parts: uploadedParts,
                }),
              })

              /**
               * Upload file to Pinecone
               */
              setLoadingMessage('Writing to database...')
              setLoadingProgress(0)

              const pineconeChunks = await chunkFileForPinecone(
                new Blob([typedArray], { type: 'application/pdf' })
              )

              let count = 1
              for (const chunk of pineconeChunks) {
                await fetch('/api/pinecone/upload', {
                  method: 'POST',
                  body: JSON.stringify({ userId, fileName: file.name, chunk }),
                })

                setLoadingProgress((count++ / pineconeChunks.length) * 100) // update progress
              }

              // write to DynamoDB
              const chatId = await putNewChat(userId, file.name)

              /**
               * Write to Redux store
               * and redirect to chat page
               */
              setLoadingMessage('Redirecting...')

              store.dispatch(setFileName(file.name))
              store.dispatch(setId(userId))

              router.push(`/dashboard/chat?chat_id=${chatId}`)
            }
          })
        }
        reader.onerror = (err) => {
          console.log(err)
        }
      })
    },
  })

  const className = useMemo(
    () => `
    flex flex-col items-center justify-center rounded-md border border-gray-dark/25 p-10 transition-all duration-300 ease-in-out
      ${isFocused ? 'border-primary' : ''}
      ${isDragAccept ? 'border-[#00E676]' : ''}
      ${isDragReject ? 'border-error' : ''}
      ${error ? 'bg-error/20' : 'bg-gray-light/25'}
    `,
    [isFocused, isDragAccept, isDragReject, error]
  )

  return (
    <div
      className={`text-center ${isLoading ? 'cursor-progress' : 'cursor-pointer'}`}
      onFocus={() => {
        setError(false)
        setErrorMessage('')
      }}
    >
      <div {...getRootProps({ className })}>
        <input {...getInputProps()} />
        <p>{copy.uploadModalContent}</p>
        <p className="mt-4">
          {copy.uploadModalFileTypeRestrictions}{' '}
          {maxFileSizeInMB !== Infinity &&
            replaceCopyPlaceholder(
              copy.uploadModalFileSizeRestrictions,
              maxFileSizeInMB
            )}
        </p>
        {acceptedFiles.length > 0 && (
          <div className="mt-4 flex items-center divide-x divide-gray-dark/25 rounded-md border border-gray-dark/25 p-2">
            <DocumentIcon className="m-2 size-4" />
            {/* @ts-expect-error */}
            <p className="px-2">{acceptedFiles[0].path}</p>
          </div>
        )}
        {isLoading && (
          <div className="mt-4 w-full">
            <span id="progess-label" className="sr-only">
              Loading
            </span>
            <span
              role="progressbar"
              aria-labelledby="progess-label"
              aria-valuenow={loadingProgress}
              className="block rounded-full border border-gray-dark/25 bg-white"
            >
              <span
                className="block h-3 rounded-full bg-[#067CDD] transition-all"
                style={{ width: `${loadingProgress}%` }}
              />
            </span>
            <div className="mt-2 flex justify-center gap-4">
              <LoadingIcon className="size-6 animate-spin text-white" />
              <span>{loadingMessage}</span>
            </div>
          </div>
        )}
        {errorMessage && (
          <div
            className="relative mt-4 rounded border border-error bg-error/20 px-4 py-3 text-error"
            role="alert"
          >
            <strong className="font-bold">{errorMessage}</strong>
          </div>
        )}
      </div>
    </div>
  )
}
