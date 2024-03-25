'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { deleteS3Object } from '@/services/storage'
import { deleteEmbed } from '@/services/embeddings'
import { deleteFileFromChatHistory } from '@/services/dynamodb'
import { z } from 'zod'

export async function deleteFile(userId: string, fileName: string) {
  const idToken = cookies().get('IdToken')?.value!

  await Promise.allSettled([
    deleteS3Object(idToken, `users/${userId}/uploads/${fileName}`),
    deleteEmbed(fileName, userId),
    deleteFileFromChatHistory(userId, fileName),
  ])

  revalidatePath('/dashboard')
}

export async function sendEmail(
  _prevState: {
    message: string
    status: string
  },
  formData: FormData
) {
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
