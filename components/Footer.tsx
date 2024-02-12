import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-dark/25 bg-white px-4">
      <div className="container m-auto grid grid-cols-10 gap-4 pb-16 pt-8">
        <div className="col-span-10 sm:col-span-10 md:col-span-5">
          <div className="w-1/2">
            <Link className="mb-4 flex font-bold" href="/">
              <span>Bento DocQA</span>
            </Link>
            <p className="text-xl">
              Earn up to 30% Lifetime Commission as an Affiliate!
            </p>
            <Link
              className="mt-5 inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
              href="/dashboard"
            >
              Join Now!
            </Link>
          </div>
        </div>
        <div className="col-span-10 sm:col-span-5 md:col-span-2">
          <ul>
            <li className="py-2 md:pt-0">Pricing</li>
            <li className="py-2">Login</li>
            <li className="py-2">Sign up</li>
            <li className="py-2">Privacy Policy</li>
            <li className="py-2">Terms & Conditions</li>
          </ul>
        </div>
        <div className="col-span-10 sm:col-span-5 md:col-span-3">
          <p className="mb-4 block font-bold">Contact Us</p>
          <p>
            If you need help using our service, or have a question about it,
            please feel free to contact us here.
          </p>
        </div>
      </div>
      <div className="container m-auto">
        <hr className="border-gray-dark/25" />
        <div className="flex justify-between py-8">
          <p>© 2024 Bento DocQA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
