'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { DocumentIcon } from '@heroicons/react/24/outline'
import { getDocument } from 'pdfjs-dist'
import { useAppStore } from '@/lib/store/hooks'
import { setFileName, setId } from '@/lib/store/features/users/usersSlice'
import { chunkFileForS3, chunkFileForPinecone } from '@/lib/utils/getChunks'
import type {
  CreateMultipartUploadCommandOutput,
  UploadPartCommandOutput,
} from '@aws-sdk/client-s3'

export default function Uploader({
  userId,
  files,
}: {
  userId: string
  files: { name: string | undefined }[] | undefined
}) {
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const store = useAppStore()
  const maxFileSizeInMB = 50

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
    onError: (err) => {
      console.log(err)
    },
    onDropRejected: (fileRejections) => {
      const errors = fileRejections[0].errors
      setError(true)
      if (errors.some(({ code }) => code === 'file-too-large')) {
        setErrorMessage(`File is larger than ${maxFileSizeInMB} MB`)
      } else if (errors.some(({ code }) => code === 'file-invalid-type')) {
        setErrorMessage('File is not a PDF')
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

            if (numPages > 10) {
              // remove file from acceptedFiles array
              acceptedFiles.splice(index, 1)
              setError(true)
              setErrorMessage('File has more than 10 pages')
            } else if (files?.some((f) => f.name === file.name)) {
              setError(true)
              setErrorMessage(
                'File already uploaded. Please upload a different file or rename the file'
              )
            } else {
              /**
               * Upload file to S3
               */

              // initiate upload
              const response = await fetch('/api/files/upload/initiate', {
                method: 'POST',
                body: JSON.stringify({ userId, fileName: file.name }),
              })
              const {
                data: { UploadId },
              } = (await response.json()) as {
                message: string
                data: CreateMultipartUploadCommandOutput
              }

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
                  .then(
                    (response) =>
                      response.json() as Promise<{
                        message: string
                        data: UploadPartCommandOutput
                      }>
                  )
                  .then((data) => {
                    uploadedParts.push({
                      ETag: data.data.ETag!,
                      PartNumber: index + 1,
                    })
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

              const pineconeChunks = await chunkFileForPinecone(
                new Blob([typedArray], { type: 'application/pdf' })
              )

              for (const chunk of pineconeChunks) {
                await fetch('/api/pinecone/upload', {
                  method: 'POST',
                  body: JSON.stringify({ userId, fileName: file.name, chunk }),
                })
              }

              store.dispatch(setFileName(file.name))
              store.dispatch(setId(userId))
              router.push('/dashboard/chat')
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
      className="cursor-pointer text-center"
      onFocus={() => {
        setError(false)
        setErrorMessage('')
      }}
    >
      <div {...getRootProps({ className })}>
        <input {...getInputProps()} />
        <p>Click to upload or drag and drop</p>
        <p className="mt-4">PDF ONLY (up to {maxFileSizeInMB} MB)</p>
        {acceptedFiles.length > 0 && (
          <div className="mt-4 flex items-center divide-x divide-gray-dark/25 rounded-md border border-gray-dark/25 p-2">
            <DocumentIcon className="m-2 size-4" />
            {/* @ts-expect-error */}
            <p className="px-2">{acceptedFiles[0].path}</p>
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
