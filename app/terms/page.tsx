import { PortableText } from '@portabletext/react'
import NavbarWrapper from '@/components/NavbarWrapper'
import Footer from '@/components/Footer'
import { getTermsCopy } from '@/sanity/utils/terms'
import { components } from '@/sanity/utils/portableTextComponents'

export default async function Terms() {
  const termsCopy = await getTermsCopy()

  return (
    <>
      <NavbarWrapper />
      <main className="container mx-auto px-4">
        <div className="mb-8 mt-24 text-center md:px-20">
          <div className="mx-auto mb-10 sm:max-w-lg">
            <h1 className="text-6xl font-bold sm:text-7xl">
              {termsCopy.header}
            </h1>
            <p className="mt-5 sm:text-lg">{termsCopy.description}</p>
          </div>
          <div className="mx-auto my-12 mb-8 max-w-lg text-left">
            <PortableText value={termsCopy.content} components={components} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
