'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import { confirmResetPassword } from '@/app/form-actions'
import PasswordStrength from '@/components/PasswordStrength'
import SubmitFormButton from '@/components/Forms/UI/SubmitFormButton'

const initialState = {
  message: '',
  status: '',
}

export default function LoginResetConfirmForm() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')!
  const [state, formAction] = useFormState(confirmResetPassword, initialState)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (state?.status === 'error') {
      toast.error(state?.message)
    }
  }, [state])

  return (
    <form className="space-y-6" action={formAction}>
      <input type="hidden" id="email" name="email" value={email} />

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
            placeholder="Enter Verification Code"
            required
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-dark shadow-sm ring-1 ring-inset ring-gray-light placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium leading-6 text-gray-dark"
          >
            Password
          </label>
        </div>
        <div className="relative mt-2">
          <input
            id="newPassword"
            name="newPassword"
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

      <PasswordStrength password={password} />

      <div>
        <SubmitFormButton text="Reset my password" />
      </div>
    </form>
  )
}
