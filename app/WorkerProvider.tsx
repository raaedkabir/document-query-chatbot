'use client'

import { Worker } from '@react-pdf-viewer/core'
import packageJson from '@/package.json'

const pdfjsVersion = packageJson.dependencies['pdfjs-dist']

export default function WorkerProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Worker
      workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
    >
      {children}
    </Worker>
  )
}
