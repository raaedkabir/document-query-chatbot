import { PortableText } from '@portabletext/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getPrivacy } from '@/sanity/utils/privacy'
import { components } from '@/sanity/utils/portableTextComponents'

export default async function Privacy() {
  const privacy = await getPrivacy()

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4">
        <div className="mb-8 mt-24 text-center md:px-20">
          <div className="mx-auto mb-10 sm:max-w-lg">
            <h1 className="text-6xl font-bold sm:text-7xl">
              {privacy[0].header}
            </h1>
            <p className="mt-5 sm:text-lg">{privacy[0].description}</p>
          </div>
          <div className="mx-auto my-12 mb-8 max-w-lg text-left">
            <PortableText value={privacy[0].content} components={components} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
