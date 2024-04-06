import Link from 'next/link'
import NavbarWrapper from '@/components/NavbarWrapper'
import FacebookLogin from '@/components/FacebookLogin'
import GoogleSignIn from '@/components/GoogleSignIn'
import Footer from '@/components/Footer'
import SignupForm from '@/components/Forms/SignupForm'
// import { getSignUp } from '@/sanity/utils/sign-up'

export default async function Signup() {
  // const signUp = await getSignUp()

  return (
    <>
      <NavbarWrapper />
      <main className="container mx-auto px-4">
        <div className="mb-8 mt-24 text-center md:px-20">
          <div className="mx-auto mb-10 sm:max-w-lg">
            <h1 className="text-6xl font-bold sm:text-7xl">Create account</h1>
          </div>
          <div className="mx-auto my-12 mb-8 max-w-lg rounded-2xl bg-white shadow-lg">
            <div className="flex min-h-full flex-1 flex-col justify-center p-6 lg:p-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <SignupForm />
                <div className="relative my-5 flex items-center">
                  <div className="flex-grow border-t border-gray-light"></div>
                  <span className="mx-4 flex-shrink text-gray">
                    or continue with
                  </span>
                  <div className="flex-grow border-t border-gray-light"></div>
                </div>

                <div className="flex w-full justify-center gap-4">
                  <FacebookLogin />
                  <GoogleSignIn />
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="mb-24 text-center text-gray-dark">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-semibold leading-6 text-primary hover:text-primary/80"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
