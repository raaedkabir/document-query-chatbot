'use client'

import toast from 'react-hot-toast'
import { resendConfirmationCode } from '@/app/actions'

export default function ResendConfirmationCodeButton({
  email,
}: {
  email: string
}) {
  return (
    <button
      onClick={async () => {
        const { status, message } = await resendConfirmationCode(email)
        if (status === 'success') toast.success(message)
        else toast.error(message)
      }}
      className="text-primary underline"
    >
      Click here to send a new verification code.
    </button>
  )
}
