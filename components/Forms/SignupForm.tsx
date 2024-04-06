'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import PasswordStrength from '@/components/PasswordStrength'
import SubmitFormButton from '@/components/Forms/UI/SubmitFormButton'
import { signup } from '@/app/form-actions'

const initialState = {
  message: '',
  status: '',
}

export default function SignupForm() {
  const searchParams = useSearchParams()
  const planType = searchParams.get('planType')
  const [state, formAction] = useFormState(signup, initialState)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (state?.status === 'error') {
      toast.error(state?.message)
    }
  }, [state])

  return (
    <form className="space-y-6" action={formAction}>
      <input
        type="hidden"
        id="planType"
        name="planType"
        value={planType || ''}
      />

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
        <SubmitFormButton text="Sign Up" />
      </div>
    </form>
  )
}
