'use client'

import { useState, useEffect } from 'react'
import PDFViewer from '@/components/Dashboard/PDFViewer'

export default function PDFPanel({
  fileName,
  userId,
}: {
  fileName: string
  userId: string
}) {
  const [fileUrl, setFileUrl] = useState('https://example.com/')
  const [isFileUrlReady, setIsFileUrlReady] = useState(false)

  useEffect(() => {
    fetch('/api/files/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, fileName }),
    })
      .then((response) => response.json())
      .then(({ data }) => {
        setFileUrl(data)
        setIsFileUrlReady(true)
      })
  }, [userId, fileName])

  return <PDFViewer fileUrl={fileUrl} isFileUrlReady={isFileUrlReady} />
}
