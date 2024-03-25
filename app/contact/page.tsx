import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactForm from '@/components/Forms/ContactForm'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
// import { getContact } from '@/sanity/utils/contact'

export default async function Contact() {
  // const contact = await getContact()

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4">
        <div className="mb-8 mt-24 text-center md:px-20">
          <div className="mx-auto mb-10 sm:max-w-lg">
            <h1 className="text-6xl font-bold sm:text-7xl">Contact us</h1>
            <p className="mt-5 sm:text-lg">
              Have a question? We&apos;re here to help.
            </p>
          </div>
          <div className="container mx-auto mb-8 text-left">
            <div className="grid grid-cols-1 gap-10 py-12 lg:grid-cols-2">
              <div className="pl-6 pt-6 lg:pl-0 lg:pt-8">
                <h3 className="my-3 font-display text-3xl font-bold">
                  Get in touch
                </h3>
                <p>
                  Whether you need assistance or have feedback to share,
                  we&apos;re always happy to hear from you!
                </p>
                <h4 className="mb-2 mt-6 text-lg font-bold">Contact</h4>
                <div className="flex items-center">
                  <PhoneIcon className="mr-2 size-6 text-primary" />
                  <span>(+60)12-123 1234</span>
                </div>
                <h4 className="mb-2 mt-6 text-lg font-bold">Email</h4>
                <div className="flex items-center">
                  <EnvelopeIcon className="mr-2 size-6 text-primary" />
                  <span>contact@bentobytes.ai</span>
                </div>
              </div>
              <div className="rounded-2xl bg-white shadow-lg">
                <div className="p-6 lg:p-8">
                  <h3 className="my-3 font-display text-3xl font-bold">
                    Fill out the form with your inquiry
                  </h3>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
