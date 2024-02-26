import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
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
                  <form className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="name"
                          className="sr-only block text-sm font-medium leading-6 text-gray-dark"
                        >
                          Your Name
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your Name"
                          required
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-dark shadow-sm ring-1 ring-inset ring-gray-light placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="email"
                          className="sr-only block text-sm font-medium leading-6 text-gray-dark"
                        >
                          Email address
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Your Email Address"
                          required
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-dark shadow-sm ring-1 ring-inset ring-gray-light placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="subject"
                          className="sr-only block text-sm font-medium leading-6 text-gray-dark"
                        >
                          Subject
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="Subject"
                          required
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-dark shadow-sm ring-1 ring-inset ring-gray-light placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="message"
                          className="sr-only block text-sm font-medium leading-6 text-gray-dark"
                        >
                          Enter your message
                        </label>
                      </div>
                      <div className="mt-2">
                        <textarea
                          id="message"
                          name="message"
                          placeholder="Enter your message"
                          required
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-dark shadow-sm ring-1 ring-inset ring-gray-light placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
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
