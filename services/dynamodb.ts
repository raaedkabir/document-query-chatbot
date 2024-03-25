'use server'

import { DynamoDBClient, BatchWriteItemCommand } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
  GetCommand,
  GetCommandOutput,
  DeleteCommand,
  QueryCommand,
  QueryCommandOutput,
} from '@aws-sdk/lib-dynamodb'
import { revalidatePath } from 'next/cache'
import { randomUUID } from 'crypto'

export type IGetCommandOutput<T> = Omit<GetCommandOutput, 'Item'> & {
  Item?: T
}

export type IQueryCommandOutput<T> = Omit<QueryCommandOutput, 'Items'> & {
  Items: T[]
}

export type IUsersTableItem = {
  user_id: string // partition key
  user_name: string
  given_name: string
  user_email: string
  stripe_customer_id: string
}

export type IChatHistoryTableItem = {
  user_id: string // partition key
  chat_id: string // sort key
  file_name: string
  chat: string
  chat_name: string
  queries: string
  chat_created: number
  last_updated: number // local secondary index
}

const client = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID!,
    secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY!,
  },
})
const docClient = DynamoDBDocumentClient.from(client)

export const getUserRecord = async (userId: string) => {
  const command = new GetCommand({
    TableName: 'mydocqa-users',
    Key: {
      user_id: userId,
    },
  })

  const response = (await docClient.send(
    command
  )) as IGetCommandOutput<IUsersTableItem>

  return response
}

export const putNewChat = async (
  userId: string,
  fileName: string,
  chatName?: string
) => {
  const chatId = randomUUID()
  const command = new PutCommand({
    TableName: 'mydocqa-chat-history',
    Item: {
      user_id: userId,
      chat_id: chatId,
      file_name: fileName,
      chat: JSON.stringify([
        {
          role: 'assistant',
          id: '0',
          content:
            'Hi! I am your PDF assistant. I am happy to help with your questions about your PDF.',
        },
      ]),
      chat_name: chatName || fileName.substring(0, fileName.lastIndexOf('.')),
      queries: 0,
      chat_created: Date.now(),
      last_updated: Date.now(),
    },
  })

  await docClient.send(command)

  revalidatePath('/dashboard')

  return chatId
}

export const getChats = async (userId: string) => {
  const command = new QueryCommand({
    TableName: 'mydocqa-chat-history',
    KeyConditionExpression: 'user_id = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
  })

  const response = (await docClient.send(
    command
  )) as IQueryCommandOutput<IChatHistoryTableItem>

  return response
}

export const getChat = async (userId: string, chatId: string) => {
  const command = new GetCommand({
    TableName: 'mydocqa-chat-history',
    Key: {
      user_id: userId,
      chat_id: chatId,
    },
  })

  const response = (await docClient.send(
    command
  )) as IGetCommandOutput<IChatHistoryTableItem>

  return response
}

export const updateChat = async (
  userId: string,
  chatId: string,
  chat: string
) => {
  const command = new UpdateCommand({
    TableName: 'mydocqa-chat-history',
    Key: {
      user_id: userId,
      chat_id: chatId,
    },
    UpdateExpression:
      'set chat = :chat, queries = queries + :val, last_updated = :last_updated',
    ExpressionAttributeValues: {
      ':chat': chat,
      ':val': 1,
      ':last_updated': Date.now(),
    },
  })

  const response = await docClient.send(command)

  return response
}

export const updateChatName = async (
  userId: string,
  chatId: string,
  chatName: string
) => {
  const command = new UpdateCommand({
    TableName: 'mydocqa-chat-history',
    Key: {
      user_id: userId,
      chat_id: chatId,
    },
    UpdateExpression:
      'set chat_name = :chat_name, last_updated = :last_updated',
    ExpressionAttributeValues: {
      ':chat_name': chatName,
      ':last_updated': Date.now(),
    },
  })

  const response = await docClient.send(command)

  revalidatePath('/dashboard')

  return response
}

export const deleteChat = async (userId: string, chatId: string) => {
  const command = new DeleteCommand({
    TableName: 'mydocqa-chat-history',
    Key: {
      user_id: userId,
      chat_id: chatId,
    },
  })

  const response = await docClient.send(command)

  revalidatePath('/dashboard')

  return response
}

export const deleteFileFromChatHistory = async (
  userId: string,
  fileName: string
) => {
  const command = new QueryCommand({
    TableName: 'mydocqa-chat-history',
    KeyConditionExpression: 'user_id = :userId',
    FilterExpression: 'file_name = :fileName',
    ExpressionAttributeValues: {
      ':userId': userId,
      ':fileName': fileName,
    },
  })

  const response = (await docClient.send(
    command
  )) as IQueryCommandOutput<IChatHistoryTableItem>

  const deleteCommands = new BatchWriteItemCommand({
    RequestItems: {
      'mydocqa-chat-history': response.Items.map((item) => ({
        DeleteRequest: {
          Key: {
            user_id: { S: item.user_id },
            chat_id: { S: item.chat_id },
          },
        },
      })),
    },
  })

  const deleteResponse = await docClient.send(deleteCommands)

  return deleteResponse
}
