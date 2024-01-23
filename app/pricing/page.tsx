import {
  ArrowRightIcon,
  CheckIcon,
  MinusIcon,
} from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getPricing } from '@/sanity/utils/pricing'

export default async function Pricing() {
  const pricing = await getPricing()

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'check':
        return <CheckIcon className="size-6 text-primary" />
      case 'minus':
        return <MinusIcon className="size-6 text-gray" />
      default:
        return null
    }
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4">
        <div className="mb-8 mt-24 text-center md:px-20">
          <div className="mx-auto mb-10 sm:max-w-lg">
            <h1 className="text-6xl font-bold sm:text-7xl">
              {pricing[0].header}
            </h1>
            <p className="mt-5 sm:text-lg">{pricing[0].description}</p>
          </div>
          <div
            className={`grid grid-cols-1 gap-10 py-12 ${'lg:grid-cols-' + pricing[0].pricingPlans.length}`}
          >
            {pricing[0].pricingPlans.map((pricingPlan) => (
              <div
                key={pricingPlan.header}
                className={`relative rounded-2xl border ${pricingPlan.feature ? 'border-2 border-primary shadow-secondary' : 'border-gray-light'} bg-white shadow-lg`}
              >
                {pricingPlan.feature && pricingPlan.featureText && (
                  <div className="absolute inset-x-0 -top-5 mx-auto w-fit rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-2 text-sm font-medium text-white">
                    {pricingPlan.featureText}
                  </div>
                )}
                <div className="p-5">
                  <h3 className="my-3 text-center font-display text-3xl font-bold">
                    {pricingPlan.header}
                  </h3>
                  <p className="text-gray">{pricingPlan.description}</p>
                  <p className="my-5 font-display text-6xl font-semibold">
                    RM {pricingPlan.price}
                  </p>
                  <p className="text-gray">{pricingPlan.rateText}</p>
                </div>
                <div className="flex h-20 items-center justify-center border-y border-gray-light bg-gray-light/25">
                  <div className="flex items-center space-x-1">
                    <p>{pricingPlan.pdfLimit}</p>
                  </div>
                </div>
                <ul className="my-10 space-y-5 px-8">
                  {pricingPlan.planDetails.map((planDetail) => (
                    <li key={planDetail.description} className="flex space-x-5">
                      <div className="flex-shrink-0">
                        {renderIcon(planDetail.icon)}
                      </div>
                      <div className="flex items-center space-x-1">
                        <p>{planDetail.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-light"></div>
                <div className="p-5">
                  <a
                    className={`inline-flex h-10 w-full items-center justify-center rounded-md ${pricingPlan.feature ? 'bg-primary text-white hover:bg-primary/80' : 'bg-gray-light hover:bg-gray-light/80'} px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50`}
                    href="/sign-in"
                  >
                    {pricingPlan.callToActionText}
                    <ArrowRightIcon className="ml-1 size-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
