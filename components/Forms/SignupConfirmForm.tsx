'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import { confirmSignup } from '@/app/form-actions'
import SubmitFormButton from '@/components/Forms/UI/SubmitFormButton'

const initialState = {
  message: '',
  status: '',
}

export default function SignupConfirmForm() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')!
  const [state, formAction] = useFormState(confirmSignup, initialState)

  useEffect(() => {
    if (state?.status === 'error') {
      toast.error(state?.message)
    }
  }, [state])

  return (
    <form className="space-y-6" action={formAction}>
      <div>
        <p className="mb-2 text-left text-gray-dark">
          We sent an email with a verification code to{' '}
          <span className="font-bold text-primary">{email}</span>.
        </p>
        <p className="mb-4 text-left text-gray-dark">
          Enter it below to confirm your email.
        </p>
        <input type="hidden" id="email" name="email" value={email} />
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
            placeholder="Enter Verification Code"
            required
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-dark shadow-sm ring-1 ring-inset ring-gray-light placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <SubmitFormButton text="Verify" />
      </div>
    </form>
  )
}
