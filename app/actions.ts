'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { deleteS3Object } from '@/services/storage'
import { deleteEmbed } from '@/services/embeddings'
import { deleteFileFromChatHistory } from '@/services/dynamodb'

export async function deleteFile(userId: string, fileName: string) {
  const idToken = cookies().get('IdToken')?.value!

  await Promise.allSettled([
    deleteS3Object(idToken, `users/${userId}/uploads/${fileName}`),
    deleteEmbed(fileName, userId),
    deleteFileFromChatHistory(userId, fileName),
  ])

  revalidatePath('/dashboard')
}
