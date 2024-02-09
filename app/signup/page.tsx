'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster, resolveValue } from 'react-hot-toast'
import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import FacebookLogin from '@/components/FacebookLogin'
import GoogleSignIn from '@/components/GoogleSignIn'
import Footer from '@/components/Footer'
// import { getSignUp } from '@/sanity/utils/sign-up'

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordScore, setPasswordScore] = useState(0)
  const [hasMinLength, setHasMinLength] = useState(false)
  const [hasLowercase, setHasLowercase] = useState(false)
  const [hasUppercase, setHasUppercase] = useState(false)
  const [hasNumber, setHasNumber] = useState(false)
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false)

  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const checkPasswordStrength = (password: string) => {
    setHasUppercase(/[A-Z]/.test(password))
    setHasLowercase(/[a-z]/.test(password))
    setHasNumber(/[0-9]/.test(password))
    setHasSpecialCharacter(/[^A-Za-z0-9]/.test(password))
    setHasMinLength(password.length >= 8)
    setPasswordScore(
      +hasMinLength +
        +hasLowercase +
        +hasUppercase +
        +hasNumber +
        +hasSpecialCharacter
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
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
                          checkPasswordStrength(e.target.value)
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
                  <div className="-mx-1 flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i} className="w-1/5 px-1">
                        <div
                          className={`h-2 rounded-xl transition-colors ${i < passwordScore ? (passwordScore <= 2 ? 'bg-[#f87171]' : passwordScore <= 4 ? 'bg-[#facc15]' : 'bg-[#22c55e]') : 'bg-[#e5e7eb]'}`}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="mb-2 block text-left text-sm font-bold leading-6 text-gray-dark">
                      Your password must contain:
                    </p>

                    <ul className="space-y-1 text-sm text-gray-dark">
                      <li
                        className={`flex items-center gap-x-2 ${hasMinLength ? 'text-[#14b8a6]' : ''}`}
                      >
                        <span
                          className={`${hasMinLength ? 'block' : 'hidden'}`}
                        >
                          <svg
                            className="size-4 flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span
                          className={`${!hasMinLength ? 'block' : 'hidden'}`}
                        >
                          <svg
                            className="size-4 flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </span>
                        Minimum number of characters is 8.
                      </li>
                      <li
                        className={`flex items-center gap-x-2 ${hasLowercase ? 'text-[#14b8a6]' : ''}`}
                      >
                        <span
                          className={`${hasLowercase ? 'block' : 'hidden'}`}
                        >
                          <svg
                            className="size-4 flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span
                          className={`${!hasLowercase ? 'block' : 'hidden'}`}
                        >
                          <svg
                            className="size-4 flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </span>
                        Should contain lowercase.
                      </li>
                      <li
                        className={`flex items-center gap-x-2 ${hasUppercase ? 'text-[#14b8a6]' : ''}`}
                      >
                        <span
                          className={`${hasUppercase ? 'block' : 'hidden'}`}
                        >
                          <svg
                            className="size-4 flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span
                          className={`${!hasUppercase ? 'block' : 'hidden'}`}
                        >
                          <svg
                            className="size-4 flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </span>
                        Should contain uppercase.
                      </li>
                      <li
                        className={`flex items-center gap-x-2 ${hasNumber ? 'text-[#14b8a6]' : ''}`}
                      >
                        <span className={`${hasNumber ? 'block' : 'hidden'}`}>
                          <svg
                            className="size-4 flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className={`${!hasNumber ? 'block' : 'hidden'}`}>
                          <svg
                            className="size-4 flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </span>
                        Should contain numbers.
                      </li>
                      <li
                        className={`flex items-center gap-x-2 ${hasSpecialCharacter ? 'text-[#14b8a6]' : ''}`}
                      >
                        <span
                          className={`${hasSpecialCharacter ? 'block' : 'hidden'}`}
                        >
                          <svg
                            className="size-4 flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span
                          className={`${!hasSpecialCharacter ? 'block' : 'hidden'}`}
                        >
                          <svg
                            className="size-4 flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </span>
                        Should contain special characters.
                      </li>
                    </ul>
                  </div>

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
              <a
                href="/login"
                className="font-semibold leading-6 text-primary hover:text-primary/80"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
