import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Tabs from '@/components/Tabs'
import { getHome } from '@/sanity/utils/home'

export default async function Home() {
  const home = await getHome()

  return (
    <>
      <Navbar />
      <main>
        <div className="mx-auto mb-12 mt-28 flex w-full max-w-screen-xl flex-col items-center justify-center px-2.5 text-center sm:mt-40 md:px-20">
          <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
            {home[0].header}
          </h1>
          <p className="mt-5 max-w-prose text-gray-dark sm:text-lg">
            {home[0].description}
          </p>
          <a
            className="mt-5 inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white transition-colors hover:bg-primary/80 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
            href="/signup"
          >
            {home[0].callToActionText}
            <ArrowRightIcon className="ml-1 size-5" />
          </a>
        </div>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray/5 p-2 ring-1 ring-inset ring-gray/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                alt="product preview"
                loading="lazy"
                width="1364"
                height="866"
                decoding="async"
                data-nimg="1"
                className="rounded-md bg-white shadow-2xl ring-1 ring-gray/10"
                src={home[0].image}
              />
            </div>
          </div>
        </div>
        <Tabs />
      </main>
      <Footer />
    </>
  )
}
