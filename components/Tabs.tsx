'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { HomeCopy } from '@/sanity/utils/home'

export default function Tabs({ copy }: { copy: HomeCopy }) {
  const [openTab, setOpenTab] = useState(0)

  const updateOpenTab = (number: number) => {
    setOpenTab(number)
  }

  return (
    <div className="mx-auto my-32 max-w-5xl sm:mt-56">
      <div className="mb-12 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-2 text-4xl font-bold sm:text-5xl">
            {copy.secondaryHeader}
          </h2>
          <p className="mt-4 text-lg text-gray-dark">
            {copy.secondaryDescription}
          </p>
        </div>
      </div>
      <ol className="my-8 space-y-4 px-6 pt-8 lg:flex lg:space-x-12 lg:space-y-0 lg:px-8">
        {copy.detailsList.map((detail, index) => (
          <li
            key={index}
            className="cursor-pointer lg:flex-1"
            onClick={() => updateOpenTab(index)}
            aria-hidden="true"
          >
            <div className="flex flex-col space-y-2 border-l-4 border-primary/30 py-2 pl-4 lg:border-l-0 lg:border-t-2 lg:pb-0 lg:pl-0 lg:pt-4">
              <span className="text-sm font-medium text-primary">
                {detail.stepNumber}
              </span>
              <span className="text-xl font-semibold">{detail.title}</span>
              <span className="mt-2 text-gray-dark">{detail.description}</span>
            </div>
          </li>
        ))}
      </ol>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-gray/5 p-2 ring-1 ring-inset ring-gray/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            {copy.detailsList.map((detail, index) => (
              <Image
                key={index}
                alt="uploading preview"
                loading="lazy"
                width={detail.imageData.width}
                height={detail.imageData.height}
                decoding="async"
                data-nimg="1"
                className={`rounded-md bg-white shadow-2xl ring-1 ring-gray/10 ${openTab === index ? 'block' : 'hidden'}`}
                src={detail.imageSrc}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
