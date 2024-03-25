'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import NavbarWrapper from '@/components/NavbarWrapper'
import FacebookLogin from '@/components/FacebookLogin'
import GoogleSignIn from '@/components/GoogleSignIn'
import Footer from '@/components/Footer'
import PasswordStrength from '@/components/PasswordStrength'
// import { getSignUp } from '@/sanity/utils/sign-up'

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
        planType: searchParams.get('planType') || '',
      }),
    })

    const data = await response.json()

    if (response.ok) {
      router.push(`/signup/confirm?email=${email}`)
    } else {
      toast.error(data.message)
    }
  }

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
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-dark"
                      >
                        Full Name
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        autoComplete="name"
                        required
                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-dark shadow-sm ring-1 ring-inset ring-gray-light placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="email"
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
                        autoComplete="email"
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
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                        }}
                        placeholder="Enter Password"
                        autoComplete="new-password"
                        required
                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-dark shadow-sm ring-1 ring-inset ring-gray-light placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                      <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-sm leading-5">
                        <EyeIcon
                          strokeWidth="2"
                          className={`size-6 text-gray-dark ${showPassword ? 'block' : 'hidden'}`}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                        <EyeSlashIcon
                          strokeWidth="2"
                          className={`size-6 scale-x-[-1] text-gray-dark ${showPassword ? 'hidden' : 'block'}`}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </div>
                    </div>
                  </div>

                  <PasswordStrength password={password} />

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password-confirmation"
                        className="block text-sm font-medium leading-6 text-gray-dark"
                      >
                        Confirm Password
                      </label>
                    </div>
                    <div className="relative mt-2">
                      <input
                        id="password-confirmation"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter Password"
                        autoComplete="new-password"
                        required
                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-dark shadow-sm ring-1 ring-inset ring-gray-light placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                      <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-sm leading-5">
                        <EyeIcon
                          strokeWidth="2"
                          className={`size-6 text-gray-dark ${showPassword ? 'block' : 'hidden'}`}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                        <EyeSlashIcon
                          strokeWidth="2"
                          className={`size-6 scale-x-[-1] text-gray-dark ${showPassword ? 'hidden' : 'block'}`}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>

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
