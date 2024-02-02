import { Viewer } from '@react-pdf-viewer/core'
import {
  pageNavigationPlugin,
  RenderCurrentPageLabelProps,
} from '@react-pdf-viewer/page-navigation'
import { zoomPlugin } from '@react-pdf-viewer/zoom'
import { rotatePlugin } from '@react-pdf-viewer/rotate'
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

export default function PDFViewer() {
  const pageNavigationPluginInstance = pageNavigationPlugin()
  const zoomPluginInstance = zoomPlugin()
  const rotatePluginInstance = rotatePlugin()
  const fullScreenPluginInstance = fullScreenPlugin()

  const {
    CurrentPageInput,
    GoToNextPageButton,
    GoToPreviousPage,
    CurrentPageLabel,
  } = pageNavigationPluginInstance
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance
  const { RotateBackwardButton, RotateForwardButton } = rotatePluginInstance
  const { EnterFullScreenButton } = fullScreenPluginInstance

  return (
    <div className="flex h-full flex-col border border-gray/25">
      <div className="flex w-full items-center justify-between border-b border-gray/25 bg-gray-light p-1">
        <div className="flex">
          <div className="px-0.5">
            <GoToPreviousPage />
          </div>
          <div className="pl-0.5 [&>span]:block">
            <CurrentPageInput />
          </div>
          <div className="mt-[0.3rem] px-0.5">
            <CurrentPageLabel>
              {(props: RenderCurrentPageLabelProps) => (
                <span>{`/ ${props.numberOfPages}`}</span>
              )}
            </CurrentPageLabel>
          </div>
          <div className="px-0.5">
            <GoToNextPageButton />
          </div>
        </div>
        <div className="flex">
          <div className="flex px-0.5">
            <ZoomOutButton />
            <ZoomPopover />
            <ZoomInButton />
          </div>
          <div className="px-0.5">
            <RotateBackwardButton />
          </div>
          <div className="px-0.5">
            <RotateForwardButton />
          </div>
          <div className="px-0.5">
            <EnterFullScreenButton />
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-hidden">
        <Viewer
          fileUrl="/DocQA_Outline_V5.pdf"
          plugins={[
            pageNavigationPluginInstance,
            zoomPluginInstance,
            rotatePluginInstance,
            fullScreenPluginInstance,
          ]}
        />
      </div>
    </div>
  )
}
