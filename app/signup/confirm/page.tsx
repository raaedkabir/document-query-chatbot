import { redirect } from 'next/navigation'
import NavbarWrapper from '@/components/NavbarWrapper'
import Footer from '@/components/Footer'
import SignupConfirmForm from '@/components/Forms/SignupConfirmForm'
import ResendConfirmationCodeButton from '@/components/Forms/UI/ResendConfirmationCodeButton'
// import { getSignUpConfirm } from '@/sanity/utils/sign-up-confirm'

export default async function SignupConfirm({
  searchParams,
}: {
  searchParams: { email?: string }
}) {
  const email = searchParams.email
  if (!email) {
    redirect('/signup')
  }

  // const signUpConfirm = await getSignUpConfirm()

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
                <SignupConfirmForm />
              </div>
            </div>
          </div>
          <div className="mx-auto mb-24 max-w-lg pl-6">
            <div className="text-left text-gray-dark">
              <p>Didn&apos;t get the code?</p>
              <ul className="list-disc pl-4">
                <li>Codes can take up to 5 minutes to arrive.</li>
                <li>Check your spam folder.</li>
                <li>
                  <ResendConfirmationCodeButton email={email} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
