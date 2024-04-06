'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { deleteS3Object } from '@/services/storage'
import { deleteEmbed } from '@/services/embeddings'
import { deleteFileFromChatHistory } from '@/services/dynamodb'
import Stripe from 'stripe'

export async function retrievePlanLimits(stripe_customer_id: string): Promise<{
  pdfLimit: string | number
  pdfSize: string | number
  pdfPages: string | number
  queries: string | number
  adFree: 'true' | 'false'
  currentPeriodStart: number
}> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const customer = await stripe.customers.retrieve(stripe_customer_id, {
    expand: ['subscriptions'],
  })
  const subscription = await stripe.subscriptions.retrieve(
    // @ts-ignore
    customer.subscriptions.data[0].id
  )
  const product = await stripe.products.retrieve(
    // @ts-ignore
    subscription.items.data[0].plan.product
  )

  // @ts-ignore
  return {
    ...product.metadata,
    currentPeriodStart: subscription.current_period_start,
  }
}

export async function deleteFile(userId: string, fileName: string) {
  const idToken = cookies().get('IdToken')?.value!

  await Promise.allSettled([
    deleteS3Object(idToken, `users/${userId}/uploads/${fileName}`),
    deleteEmbed(fileName, userId),
    deleteFileFromChatHistory(userId, fileName),
  ])

  revalidatePath('/dashboard')
}

export async function resendConfirmationCode(email: string) {
  const response = await fetch(
    `${process.env.DOMAIN_NAME}/api/auth/resendConfirmationCode`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }
  )

  const data = await response.json()

  if (response.ok) {
    return {
      message: 'Sent a new verification code to your email.',
      status: 'success',
    }
  } else {
    return { message: data.message, status: 'error' }
  }
}
