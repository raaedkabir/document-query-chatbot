'use client'

import { useState, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { sendEmail } from '@/app/actions'
import type { ContactCopy } from '@/sanity/utils/contact'

const initialState = {
  message: '',
  status: '',
}

export default function ContactForm({ copy }: { copy: ContactCopy }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [state, formAction] = useFormState(sendEmail, initialState)
  const { pending } = useFormStatus()

  useEffect(() => {
    if (state?.status === 'success') {
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    }
  }, [state?.status])

  return (
    <form className="space-y-6" action={formAction}>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="name"
            className="sr-only block text-sm font-medium leading-6 text-gray-dark"
          >
            {copy.nameFormField.label}
          </label>
        </div>
        <div className="mt-2">
          <input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder={copy.nameFormField.placeholder}
            required
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-dark shadow-sm ring-1 ring-inset ring-gray-light placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="email"
            className="sr-only block text-sm font-medium leading-6 text-gray-dark"
          >
            {copy.emailFormField.label}
          </label>
        </div>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder={copy.emailFormField.placeholder}
            required
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-dark shadow-sm ring-1 ring-inset ring-gray-light placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="subject"
            className="sr-only block text-sm font-medium leading-6 text-gray-dark"
          >
            {copy.subjectFormField.label}
          </label>
        </div>
        <div className="mt-2">
          <input
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            type="text"
            placeholder={copy.subjectFormField.placeholder}
            required
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-dark shadow-sm ring-1 ring-inset ring-gray-light placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="message"
            className="sr-only block text-sm font-medium leading-6 text-gray-dark"
          >
            {copy.messageFormField.label}
          </label>
        </div>
        <div className="mt-2">
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={copy.messageFormField.placeholder}
            required
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-dark shadow-sm ring-1 ring-inset ring-gray-light placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>

      <div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
        >
          {copy.submitFormButtonText}
        </button>
      </div>
    </form>
  )
}
