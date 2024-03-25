import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import NavbarWrapper from '@/components/NavbarWrapper'
import Footer from '@/components/Footer'
import Tabs from '@/components/Tabs'
import { getHomeCopy } from '@/sanity/utils/home'

export default async function Home() {
  const homeCopy = await getHomeCopy()

  return (
    <>
      <NavbarWrapper />
      <main>
        <div className="mx-auto mb-12 mt-28 flex w-full max-w-screen-xl flex-col items-center justify-center px-2.5 text-center sm:mt-40 md:px-20">
          <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
            {homeCopy.header}
          </h1>
          <p className="mt-5 max-w-prose text-gray-dark sm:text-lg">
            {homeCopy.description}
          </p>
          <Link
            className="mt-5 inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white transition-colors hover:bg-primary/80 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
            href={homeCopy.callToActionURL}
          >
            {homeCopy.callToActionText}
            <ArrowRightIcon className="ml-1 size-5" />
          </Link>
        </div>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray/5 p-2 ring-1 ring-inset ring-gray/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                alt="product preview"
                loading="lazy"
                width={homeCopy.imageData.width}
                height={homeCopy.imageData.height}
                decoding="async"
                data-nimg="1"
                className="rounded-md bg-white shadow-2xl ring-1 ring-gray/10"
                src={homeCopy.imageSrc}
              />
            </div>
          </div>
        </div>
        <Tabs copy={homeCopy} />
      </main>
      <Footer />
    </>
  )
}
