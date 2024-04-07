'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { deleteS3Object } from '@/services/storage'
import { deleteEmbed } from '@/services/embeddings'
import { deleteFileFromChatHistory } from '@/services/dynamodb'
import Stripe from 'stripe'

export async function setCookie(name: string, value: string) {
  cookies().set(name, value)
}

export async function checkForValidPlan(
  stripe_customer_id: string,
  selectedPlan: string
): Promise<void> {
  const stripe = new Stripe(
    process.env.TEST_MODE === 'true'
      ? process.env.STRIPE_TEST_SECRET_KEY!
      : process.env.STRIPE_SECRET_KEY!
  )

  // Get the user's subscription
  const subscriptions = await stripe.subscriptions.list({
    customer: stripe_customer_id,
  })

  // Subscribe user to free plan if they are not subscribed to any plan
  // and have not opted into a specific plan
  if (subscriptions.data.length === 0) {
    const products = await stripe.products.list({
      expand: ['data.default_price'],
    })

    const userSelectedPlan = products.data.find(
      (product) => product.name === selectedPlan
    )

    if (userSelectedPlan) {
      // @ts-ignore
      if (userSelectedPlan.default_price.unit_amount === 0) {
        // Subscribe user to plan if the plan is free
        await stripe.subscriptions.create({
          customer: stripe_customer_id,
          items: [
            {
              price: (userSelectedPlan.default_price as Stripe.Price).id,
            },
          ],
        })
      } else {
        // Create checkout session and redirect user to payment page
        const session = await stripe.checkout.sessions.create({
          customer: stripe_customer_id,
          mode: 'subscription',
          line_items: [
            {
              price: (userSelectedPlan.default_price as Stripe.Price).id,
              quantity: 1,
            },
          ],
          success_url: `${process.env.DOMAIN_NAME}/dashboard`,
          cancel_url: `${process.env.DOMAIN_NAME}/dashboard?selectedPlan=freemium`,
        })

        redirect(session.url as string)
      }
    } else {
      // Subscribe user to free plan if they have not selected a plan
      await stripe.subscriptions.create({
        customer: stripe_customer_id,
        items: [
          {
            price: process.env.STRIPE_FREE_PLAN_PRICE_ID,
          },
        ],
      })
    }
  }
}

export async function retrievePlanLimits(stripe_customer_id: string): Promise<{
  pdfLimit: string | number
  pdfSize: string | number
  pdfPages: string | number
  queries: string | number
  adFree: 'true' | 'false'
  currentPeriodStart: number
}> {
  const stripe = new Stripe(
    process.env.TEST_MODE === 'true'
      ? process.env.STRIPE_TEST_SECRET_KEY!
      : process.env.STRIPE_SECRET_KEY!
  )

  // Get the user's subscription
  const subscriptions = await stripe.subscriptions.list({
    customer: stripe_customer_id,
  })

  // Get the first subscription of the user,
  // all users should only have one subscription at a time
  const subscription = subscriptions.data[0]

  // Get the product details of the user's subscription
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
