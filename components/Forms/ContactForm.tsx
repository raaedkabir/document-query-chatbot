'use client'

import { useState, useEffect } from 'react'
import { useFormState } from 'react-dom'
import SubmitFormButton from '@/components/Forms/UI/SubmitFormButton'
import { sendEmail } from '@/app/form-actions'

const initialState = {
  message: '',
  status: '',
}

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [state, formAction] = useFormState(sendEmail, initialState)

  useEffect(() => {
    if (state.status === 'success') {
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    }
  }, [state.status])

  return (
    <form className="space-y-6" action={formAction}>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="name"
            className="sr-only block text-sm font-medium leading-6 text-gray-dark"
          >
            Your Name
          </label>
        </div>
        <div className="mt-2">
          <input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your Name"
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
            Email address
          </label>
        </div>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Your Email Address"
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
            Subject
          </label>
        </div>
        <div className="mt-2">
          <input
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            type="text"
            placeholder="Subject"
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
            Enter your message
          </label>
        </div>
        <div className="mt-2">
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            required
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-dark shadow-sm ring-1 ring-inset ring-gray-light placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <p aria-live="polite" className="sr-only" role="status">
        {state.message}
      </p>

      <div>
        <SubmitFormButton text="Send Message" />
      </div>
    </form>
  )
}
