'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { resendConfirmationCode } from '@/app/actions'

interface FormState {
  message: string
  status: string
}

export async function sendEmail(_prevState: FormState, formData: FormData) {
  const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    subject: z.string().min(1),
    message: z.string().min(1),
  })
  const parse = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  })

  if (!parse.success) {
    return { message: 'Failed to send email', status: 'error' }
  }

  try {
    await fetch(process.env.CONTACT_FORM_API_ENDPOINT!, {
      method: 'POST',
      headers: {
        'x-api-key': process.env.CONTACT_FORM_API_KEY!,
      },
      body: JSON.stringify(parse.data),
    })

    return { message: 'Successfully sent email', status: 'success' }
  } catch (e) {
    return { message: 'Failed to send email', status: 'error' }
  }
}

export async function login(_prevState: FormState, formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  const parse = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parse.success) {
    return { message: 'Failed to login', status: 'error' }
  }

  let response, data
  try {
    response = await fetch(`${process.env.DOMAIN_NAME}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parse.data),
    })

    data = await response.json()

    const { IdToken, AccessToken, RefreshToken, ExpiresIn, UserId } = data

    cookies().set('IdToken', IdToken || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: ExpiresIn || 3600, // 1 hour
      path: '/',
    })

    cookies().set('AccessToken', AccessToken || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: ExpiresIn || 3600, // 1 hour
      path: '/',
    })

    cookies().set('RefreshToken', RefreshToken || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    cookies().set('UserId', UserId || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
  } catch (e) {
    return { message: 'Failed to login', status: 'error' }
  }

  if (response.ok) {
    redirect('/dashboard')
  } else {
    if (data.error === 'UserNotConfirmedException') {
      await resendConfirmationCode(parse.data.email)
      redirect(`/signup/confirm?email=${parse.data.email}`)
    }
    return { message: data.message, status: 'error' }
  }
}

export async function resetPassword(_prevState: FormState, formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
  })
  const parse = schema.safeParse({
    email: formData.get('email'),
  })

  if (!parse.success) {
    return { message: 'Failed to login', status: 'error' }
  }

  let response, data
  try {
    response = await fetch(
      `${process.env.DOMAIN_NAME}/api/auth/forgotPassword`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parse.data),
      }
    )

    data = await response.json()
  } catch (e) {
    return { message: 'Failed to reset password', status: 'error' }
  }

  if (response.ok) {
    redirect(`/login/reset/confirm?email=${parse.data.email}`)
  } else {
    return { message: data.message, status: 'error' }
  }
}

export async function confirmResetPassword(
  _prevState: FormState,
  formData: FormData
) {
  const schema = z.object({
    email: z.string().email(),
    code: z.string().min(1),
    newPassword: z.string().min(8),
  })
  const parse = schema.safeParse({
    email: formData.get('email'),
    code: formData.get('code'),
    newPassword: formData.get('newPassword'),
  })

  if (!parse.success) {
    return { message: 'Failed to confirm reset password', status: 'error' }
  }

  let response, data
  try {
    response = await fetch(
      `${process.env.DOMAIN_NAME}/api/auth/forgotPassword/confirm`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parse.data),
      }
    )

    data = await response.json()
  } catch (e) {
    return { message: 'Failed to confirm reset password', status: 'error' }
  }

  if (response.ok) {
    redirect('/login')
  } else {
    if (
      data.error === 'NotAuthorizedException' &&
      data.message === 'User cannot be confirmed. Current status is CONFIRMED'
    ) {
      redirect('/login')
    }
    return { message: data.message, status: 'error' }
  }
}

export async function signup(_prevState: FormState, formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
    planType: z.string(),
  })
  const parse = schema.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
    passwordConfirmation: formData.get('passwordConfirmation'),
    planType: formData.get('planType'),
  })

  if (formData.get('password') !== formData.get('passwordConfirmation')) {
    return { message: 'Passwords do not match', status: 'error' }
  }

  if (!parse.success) {
    return { message: 'Failed to sign up', status: 'error' }
  }

  let response, data
  try {
    response = await fetch(`${process.env.DOMAIN_NAME}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parse.data),
    })

    data = await response.json()
  } catch (e) {
    return { message: 'Failed to sign up', status: 'error' }
  }

  if (response.ok) {
    redirect(`/signup/confirm?email=${parse.data.email}`)
  } else {
    if (data.error === 'UsernameExistsException') {
      await resendConfirmationCode(parse.data.email)
      redirect(`/signup/confirm?email=${parse.data.email}`)
    }
    return { message: data.message, status: 'error' }
  }
}

export async function confirmSignup(_prevState: FormState, formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    code: z.string().min(1),
  })
  const parse = schema.safeParse({
    email: formData.get('email'),
    code: formData.get('code'),
  })

  if (!parse.success) {
    return { message: 'Failed to confirm sign up', status: 'error' }
  }

  let response, data
  try {
    response = await fetch(`${process.env.DOMAIN_NAME}/api/auth/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parse.data),
    })

    data = await response.json()
  } catch (e) {
    return { message: 'Failed to confirm sign up', status: 'error' }
  }

  if (response.ok) {
    redirect('/login')
  } else {
    if (
      data.error === 'NotAuthorizedException' &&
      data.message === 'User cannot be confirmed. Current status is CONFIRMED'
    ) {
      redirect('/login')
    }
    return { message: data.message, status: 'error' }
  }
}
