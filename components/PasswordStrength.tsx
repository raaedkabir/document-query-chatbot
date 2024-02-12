'use client'

import { useState, useEffect } from 'react'

export default function PasswordStrength({
  className,
  password,
}: {
  className?: string
  password: string
}) {
  const [passwordScore, setPasswordScore] = useState(0)
  const [hasMinLength, setHasMinLength] = useState(false)
  const [hasLowercase, setHasLowercase] = useState(false)
  const [hasUppercase, setHasUppercase] = useState(false)
  const [hasNumber, setHasNumber] = useState(false)
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false)

  useEffect(() => {
    setHasUppercase(/[A-Z]/.test(password))
    setHasLowercase(/[a-z]/.test(password))
    setHasNumber(/[0-9]/.test(password))
    setHasMinLength(password.length >= 8)
    setHasSpecialCharacter(/[^A-Za-z0-9]/.test(password))
    /* eslint-disable prettier/prettier */
    setPasswordScore(
      +hasUppercase +
      +hasLowercase +
      +hasNumber +
      +hasMinLength +
      +hasSpecialCharacter
    )
    /* eslint-enable prettier/prettier */
  }, [
    password,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasMinLength,
    hasSpecialCharacter,
  ])

  return (
    <div className={className}>
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
        <p className="mb-2 mt-4 block text-left text-sm font-bold leading-6 text-gray-dark">
          Your password must contain:
        </p>

        <ul className="space-y-1 text-sm text-gray-dark">
          <li
            className={`flex items-center gap-x-2 ${hasMinLength ? 'text-[#14b8a6]' : ''}`}
          >
            <span className={`${hasMinLength ? 'block' : 'hidden'}`}>
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
            <span className={`${!hasMinLength ? 'block' : 'hidden'}`}>
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
            <span className={`${hasLowercase ? 'block' : 'hidden'}`}>
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
            <span className={`${!hasLowercase ? 'block' : 'hidden'}`}>
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
            <span className={`${hasUppercase ? 'block' : 'hidden'}`}>
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
            <span className={`${!hasUppercase ? 'block' : 'hidden'}`}>
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
            <span className={`${hasSpecialCharacter ? 'block' : 'hidden'}`}>
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
            <span className={`${!hasSpecialCharacter ? 'block' : 'hidden'}`}>
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
    </div>
  )
}
