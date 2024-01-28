import { Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

export default function PDFViewer() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  return (
    <Viewer
      fileUrl="/DocQA_Outline_V5.pdf"
      plugins={[defaultLayoutPluginInstance]}
    />
  )
}
