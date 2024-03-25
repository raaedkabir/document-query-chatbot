import NavbarWrapper from '@/components/NavbarWrapper'
import Footer from '@/components/Footer'
import ContactForm from '@/components/Forms/ContactForm'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { getContactCopy } from '@/sanity/utils/contact'

export default async function Contact() {
  const contactCopy = await getContactCopy()

  return (
    <>
      <NavbarWrapper />
      <main className="container mx-auto px-4">
        <div className="mb-8 mt-24 text-center md:px-20">
          <div className="mx-auto mb-10 sm:max-w-lg">
            <h1 className="text-6xl font-bold sm:text-7xl">
              {contactCopy.header}
            </h1>
            <p className="mt-5 sm:text-lg">{contactCopy.description}</p>
          </div>
          <div className="container mx-auto mb-8 text-left">
            <div className="grid grid-cols-1 gap-10 py-12 lg:grid-cols-2">
              <div className="pl-6 pt-6 lg:pl-0 lg:pt-8">
                <h3 className="my-3 font-display text-3xl font-bold">
                  {contactCopy.detailsHeader}
                </h3>
                <p>{contactCopy.detailsDescription}</p>
                {contactCopy.detailsList.map((detail, index) => (
                  <div key={index}>
                    <h4 className="mb-2 mt-6 text-lg font-bold">
                      {detail.title}
                    </h4>
                    <div className="flex items-center">
                      {detail.icon === 'envelope' && (
                        <EnvelopeIcon className="mr-2 size-6 text-primary" />
                      )}
                      {detail.icon === 'phone' && (
                        <PhoneIcon className="mr-2 size-6 text-primary" />
                      )}
                      <span>{detail.content}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-white shadow-lg">
                <div className="p-6 lg:p-8">
                  <h3 className="my-3 font-display text-3xl font-bold">
                    {contactCopy.formHeader}
                  </h3>
                  <ContactForm copy={contactCopy} />
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
