import PDFIcon from '@/components/PDFIcon'
import {
  ChatBubbleLeftRightIcon,
  EllipsisVerticalIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="grid h-screen grid-cols-10 gap-4">
      <div className="col-span-3 flex flex-col justify-between p-4 pr-0 md:col-span-2 xl:col-span-1">
        <div className="flex flex-grow flex-col">
          <h1 className="text-center text-3xl font-bold text-primary">DOCQA</h1>
          <hr className="my-4 border-gray-dark/25" />
          <a
            className="mx-auto flex h-9 items-center justify-center rounded-md bg-primary px-3 text-base font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
            href="/dashboard"
          >
            <PDFIcon className="mr-2 size-6" /> Files
          </a>
          <hr className="my-4 border-gray-dark/25" />
          <p className="mb-2 text-xl text-gray">Chat History</p>
          <div className="flex flex-grow flex-col gap-1 overflow-y-auto">
            {[...Array(4)].map((_, i) => (
              <div className="flex" key={i}>
                <ChatBubbleLeftRightIcon className="mr-1 size-5" />
                <span className="text-sm">DocQA Outline</span>
                <EllipsisVerticalIcon className="ml-auto size-5" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 text-center">
          <div>PHOTO</div>
          <div>
            <div className="font-bold">John Doe</div>
            <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-base font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50">
              Sign Out
            </button>
          </div>
          <div>
            <QuestionMarkCircleIcon className="mx-auto size-10" />
          </div>
        </div>
      </div>

      {children}
    </main>
  )
}
