'use client'

import { useState, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import toast, { Toaster, resolveValue } from 'react-hot-toast'
import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
// import { getSignUpConfirm } from '@/sanity/utils/sign-up-confirm'

export default function SignupConfirm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [code, setCode] = useState('')

  if (!email) {
    return router.push('/signup')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const response = await fetch('/api/auth/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    })

    const data = await response.json()

    if (response.ok) {
      router.push('/login')
    } else {
      toast.error(data.message)
    }
  }

  async function handleResendConfirmationCode() {
    const response = await fetch('/api/auth/resendConfirmationCode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (response.ok) {
      toast.success('Sent a new verification code to your email.')
    } else {
      toast.error(data.message)
    }
  }

  // const signUpConfirm = await getSignUpConfirm()

  return (
    <>
      <Navbar />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
        }}
      >
        {(t) => (
          <Transition
            appear
            show={t.visible}
            className={`flex transform rounded-xl text-white shadow-lg ring-1 ring-black ring-opacity-5 ${t.type === 'success' ? 'bg-gray-dark' : 'bg-error'}`}
            enter="transition-all duration-150"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transition-all duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
          >
            <div className="p-4">
              <p className="mx-3 mt-1 text-sm">{resolveValue(t.message, t)}</p>
            </div>
            <div className="flex border-l border-gray-light">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="flex w-full items-center justify-center rounded-none rounded-r-xl border border-transparent p-4 text-sm font-medium hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <XMarkIcon className="size-6" />
              </button>
            </div>
          </Transition>
        )}
      </Toaster>
      <main className="container mx-auto px-4">
        <div className="mb-8 mt-24 text-center md:px-20">
          <div className="mx-auto mb-10 sm:max-w-lg">
            <h1 className="text-6xl font-bold sm:text-7xl">Create account</h1>
          </div>
          <div className="mx-auto my-12 mb-8 max-w-lg rounded-2xl bg-white shadow-lg">
            <div className="flex min-h-full flex-1 flex-col justify-center p-6 lg:p-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <p className="mb-2 text-left text-gray-dark">
                      We sent an email with a verification code to{' '}
                      <span className="font-bold text-primary">{email}</span>.
                    </p>
                    <p className="mb-4 text-left text-gray-dark">
                      Enter it below to confirm your email.
                    </p>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-dark"
                      >
                        Verification code
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="code"
                        name="code"
                        type="number"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter Verification Code"
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
                      Verify
                    </button>
                  </div>
                </form>
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
                  <button
                    onClick={handleResendConfirmationCode}
                    className="text-primary underline"
                  >
                    Click here to send a new verification code.
                  </button>
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
