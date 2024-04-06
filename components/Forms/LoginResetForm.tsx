'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { resetPassword } from '@/app/form-actions'
import SubmitFormButton from '@/components/Forms/UI/SubmitFormButton'

const initialState = {
  message: '',
  status: '',
}

export default function LoginResetForm() {
  const [state, formAction] = useFormState(resetPassword, initialState)

  useEffect(() => {
    if (state?.status === 'error') {
      toast.error(state?.message)
    }
  }, [state])

  return (
    <form className="space-y-6" action={formAction}>
      <div>
        <p className="mb-4 text-left text-gray-dark">
          Enter your email address and we&apos;ll send a reset password
          verification code to your inbox.
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
            placeholder="Enter Email"
            required
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-dark shadow-sm ring-1 ring-inset ring-gray-light placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <SubmitFormButton text="Reset my password" />
      </div>

      <div>
        <p className="text-sm text-primary">
          <Link href="/login">Back to login</Link>
        </p>
      </div>
    </form>
  )
}
