'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast, { Toaster, resolveValue } from 'react-hot-toast'
import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function LoginReset() {
  const router = useRouter()
  const [email, setEmail] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const response = await fetch('/api/auth/forgotPassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (response.ok) {
      router.push(`/login/reset/confirm?email=${email}`)
    } else {
      toast.error(data.message)
    }
  }

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
            className="flex transform rounded-xl bg-error text-white shadow-lg ring-1 ring-black ring-opacity-5"
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
        <div className="my-24 text-center md:px-20">
          <div className="mx-auto mb-10 sm:max-w-lg">
            <h1 className="text-6xl font-bold sm:text-7xl">
              Forgot your password?
            </h1>
          </div>
          <div className="mx-auto my-12 mb-8 max-w-lg rounded-2xl bg-white shadow-lg">
            <div className="flex min-h-full flex-1 flex-col justify-center p-6 lg:p-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <p className="mb-4 text-left text-gray-dark">
                      Enter your email address and we&apos;ll send a reset
                      password verification code to your inbox.
                    </p>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-dark"
                      >
                        Email address
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
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
                      Reset my password
                    </button>
                  </div>

                  <div>
                    <p className="text-sm text-primary">
                      <Link href="/login">Back to login</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
