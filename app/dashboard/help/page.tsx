import Link from 'next/link'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import FAQList from '@/components/Dashboard/Help/FAQList'
import { getDashboardHelpCopy } from '@/sanity/utils/dashboardHelp'

export default async function DashboardHelp() {
  const dashboardHelpCopy = await getDashboardHelpCopy()

  return (
    <div className="mx-auto w-full p-4 sm:pl-0">
      <div className="w-full rounded-2xl border border-gray-dark/50 p-5">
        <div className="container mx-auto text-center">
          <h1 className="text-center text-3xl font-bold">
            {dashboardHelpCopy.header}
          </h1>
          <FAQList copy={dashboardHelpCopy} />
          <hr className="my-4 border-gray-dark/25" />
          <div>
            <Link
              className="flex justify-center font-bold text-primary hover:text-primary-300"
              href={dashboardHelpCopy.contactButton.url}
            >
              <ExclamationTriangleIcon className="mr-2 size-6 text-black" />
              <span className="text-current">
                {dashboardHelpCopy.contactButton.text}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
