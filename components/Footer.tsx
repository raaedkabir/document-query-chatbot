import Link from 'next/link'
import { getFooterCopy } from '@/sanity/utils/footer'

export default async function Footer() {
  const footerCopy = await getFooterCopy()

  return (
    <footer className="w-full border-t border-gray-dark/25 bg-white px-4">
      <div className="container m-auto grid grid-cols-10 gap-4 pb-16 pt-8">
        <div className="col-span-10 sm:col-span-10 md:col-span-5">
          <div className="w-1/2">
            <Link className="mb-4 flex font-bold" href="/">
              <span>{footerCopy.title}</span>
            </Link>
            <p className="text-xl">{footerCopy.description}</p>
            <Link
              className="mt-5 inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
              href={footerCopy.callToActionButton.url}
            >
              {footerCopy.callToActionButton.text}
            </Link>
          </div>
        </div>
        <div className="col-span-10 sm:col-span-5 md:col-span-2">
          <ul>
            {footerCopy.navLinks.map((navLink, index) => (
              <Link key={index} href={navLink.url} className="hover:underline">
                <li className={`py-2 ${index === 0 && 'md:pt-0'}`}>
                  {navLink.text}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="col-span-10 sm:col-span-5 md:col-span-3">
          <p className="mb-4 block font-bold">{footerCopy.contactTitle}</p>
          <p>{footerCopy.contactDescription}</p>
          <Link
            className="mt-5 inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
            href={footerCopy.contactButton.url}
          >
            {footerCopy.contactButton.text}
          </Link>
        </div>
      </div>
      <div className="container m-auto">
        <hr className="border-gray-dark/25" />
        <div className="flex justify-between py-8">
          <p>{footerCopy.legalText}</p>
        </div>
      </div>
    </footer>
  )
}
