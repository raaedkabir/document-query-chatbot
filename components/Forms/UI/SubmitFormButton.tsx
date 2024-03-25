'use client'

import { useFormStatus } from 'react-dom'

export default function SubmitFormButton({ text }: { text: string }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:cursor-progress disabled:opacity-50"
    >
      {text}
    </button>
  )
}
