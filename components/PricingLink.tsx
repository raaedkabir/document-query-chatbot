'use client'

import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import type { PricingPlans } from '@/sanity/utils/pricing'
import { setCookie } from '@/app/actions'

export default function PricingLink({ copy }: { copy: PricingPlans }) {
  return (
    <Link
      className={`inline-flex h-10 w-full items-center justify-center rounded-md ${copy.feature ? 'bg-primary text-white hover:bg-primary/80' : 'bg-gray-light hover:bg-gray-light/80'} px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50`}
      onClick={() => {
        setCookie('selectedPlan', copy.header)
      }}
      href={{
        pathname: '/signup',
      }}
    >
      {copy.callToActionText}
      <ArrowRightIcon className="ml-1 size-5" />
    </Link>
  )
}
