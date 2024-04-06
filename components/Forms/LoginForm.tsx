'use client'

import { useState, useEffect } from 'react'
import { useFormState } from 'react-dom'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { login } from '@/app/form-actions'
import SubmitFormButton from '@/components/Forms/UI/SubmitFormButton'

const initialState = {
  message: '',
  status: '',
}

export default function LoginForm() {
  const [state, formAction] = useFormState(login, initialState)

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (state?.status === 'error') {
      toast.error(state?.message)
    }
  }, [state])

  return (
    <form className="space-y-6" action={formAction}>
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
            placeholder="Enter Password"
            autoComplete="current-password"
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
        <div className="flex items-center justify-end">
          <div className="text-sm">
            <Link
              href="/login/reset"
              className="font-semibold text-primary hover:text-primary/80"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>

      <div>
        <SubmitFormButton text="Login" />
      </div>
    </form>
  )
}
