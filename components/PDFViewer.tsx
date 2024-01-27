import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import packageJson from '@/package.json'

const pdfjsVersion = packageJson.dependencies['pdfjs-dist']

export default function PDFViewer() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  return (
    <Worker
      workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
    >
      <Viewer
        fileUrl="/DocQA_Outline_V5.pdf"
        plugins={[defaultLayoutPluginInstance]}
      />
    </Worker>
  )
}
