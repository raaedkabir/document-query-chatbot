'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { deleteS3Object } from '@/services/storage'
import { deleteEmbed } from '@/services/embeddings'

export async function deleteFile(userId: string, fileName: string) {
  const idToken = cookies().get('IdToken')?.value!

  await Promise.all([
    deleteS3Object(idToken, `users/${userId}/uploads/${fileName}`),
    deleteEmbed(fileName, userId),
  ])

  revalidatePath('/dashboard')
}
