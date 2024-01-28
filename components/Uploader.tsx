'use client'

import { useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { DocumentIcon } from '@heroicons/react/24/outline'
import { getDocument } from 'pdfjs-dist'

export default function Uploader() {
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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
    maxSize: 5000000,
    onError: (err) => {
      console.log(err)
    },
    onDropRejected: (fileRejections) => {
      const errors = fileRejections[0].errors
      setError(true)
      if (errors.some(({ code }) => code === 'file-too-large')) {
        setErrorMessage('File is larger than 5 MB')
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
          console.log(reader.result)
          getDocument(typedArray).promise.then(function (doc) {
            const numPages = doc.numPages
            console.log('# Document Loaded')
            console.log('Number of Pages: ' + numPages)

            if (numPages > 1) {
              acceptedFiles.splice(index, 1)
              setError(true)
              setErrorMessage('File has more than 1 page')
            }
          })
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
      className="cursor-pointer"
      onFocus={() => {
        setError(false)
        setErrorMessage('')
      }}
    >
      <div {...getRootProps({ className })}>
        <input {...getInputProps()} />
        <p>Click to upload or drag and drop</p>
        <p className="mt-4">PDF ONLY (up to 5 MB)</p>
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
