'use client'

import { useState, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function LoginReset() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  if (!email) {
    return router.push('/login/reset')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const response = await fetch('/api/auth/forgotPassword/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code, newPassword }),
    })

    const data = await response.json()

    if (response.ok) {
      router.push(`/login`)
    } else {
      toast.error(data.message)
    }
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4">
        <div className="my-24 text-center md:px-20">
          <div className="mx-auto mb-10 sm:max-w-lg">
            <h1 className="text-6xl font-bold sm:text-7xl">Reset Password</h1>
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
                      Enter it below to reset your password.
                    </p>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-dark"
                      >
                        Verification Code
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
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-dark"
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative mt-2">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value)
                          // checkPasswordStrength(e.target.value)
                        }}
                        placeholder="Enter Password"
                        autoComplete="new-password"
                        required
                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-dark shadow-sm ring-1 ring-inset ring-gray-light placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                      <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-sm leading-5">
                        <svg
                          className={`size-6 text-gray-dark ${showPassword ? 'block' : 'hidden'}`}
                          aria-hidden="true"
                          onClick={() => setShowPassword(!showPassword)}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"
                          />
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>

                        <svg
                          className={`size-6 text-gray-dark ${showPassword ? 'hidden' : 'block'}`}
                          aria-hidden="true"
                          onClick={() => setShowPassword(!showPassword)}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 14c-.5-.6-.9-1.3-1-2 0-1 4-6 9-6m7.6 3.8A5 5 0 0 1 21 12c0 1-3 6-9 6h-1m-6 1L19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </div>
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
