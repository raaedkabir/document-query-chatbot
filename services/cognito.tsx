import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  SignUpCommand,
  ResendConfirmationCodeCommand,
  GlobalSignOutCommand,
  GetUserCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import crypto from 'crypto'

const generateSecretHash = (username: string) =>
  crypto
    .createHmac('SHA256', process.env.USER_POOL_CLIENT_SECRET!)
    .update(username + process.env.USER_POOL_CLIENT_ID)
    .digest('base64')

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
})

export const signUp = async (
  name: string,
  username: string,
  password: string,
  planType: string
) =>
  await cognitoClient.send(
    new SignUpCommand({
      ClientId: process.env.USER_POOL_CLIENT_ID,
      SecretHash: generateSecretHash(username),
      Username: username,
      Password: password,
      UserAttributes: [
        {
          Name: 'given_name',
          Value: name,
        },
        {
          Name: 'custom:planType',
          Value: planType,
        },
      ],
    })
  )

export const confirm = async (username: string, code: string) =>
  await cognitoClient.send(
    new ConfirmSignUpCommand({
      ClientId: process.env.USER_POOL_CLIENT_ID,
      SecretHash: generateSecretHash(username),
      ConfirmationCode: code,
      Username: username,
    })
  )

export const resendConfirmationCode = async (username: string) =>
  await cognitoClient.send(
    new ResendConfirmationCodeCommand({
      ClientId: process.env.USER_POOL_CLIENT_ID,
      SecretHash: generateSecretHash(username),
      Username: username,
    })
  )

export const login = async (username: string, password: string) =>
  await cognitoClient.send(
    new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: generateSecretHash(username),
      },
      ClientId: process.env.USER_POOL_CLIENT_ID,
    })
  )

export const getUser = async (accessToken: string) =>
  await cognitoClient.send(
    new GetUserCommand({
      AccessToken: accessToken,
    })
  )

export const signOut = async (accessToken: string) =>
  await cognitoClient.send(
    new GlobalSignOutCommand({
      AccessToken: accessToken,
    })
  )

export const refresh = async (username: string, refreshToken: string) =>
  await cognitoClient.send(
    new InitiateAuthCommand({
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
        SECRET_HASH: generateSecretHash(username),
      },
      ClientId: process.env.USER_POOL_CLIENT_ID,
    })
  )

export const forgotPassword = async (username: string) =>
  await cognitoClient.send(
    new ForgotPasswordCommand({
      ClientId: process.env.USER_POOL_CLIENT_ID,
      SecretHash: generateSecretHash(username),
      Username: username,
    })
  )

export const confirmForgotPassword = async (
  code: string,
  username: string,
  password: string
) =>
  await cognitoClient.send(
    new ConfirmForgotPasswordCommand({
      ClientId: process.env.USER_POOL_CLIENT_ID,
      SecretHash: generateSecretHash(username),
      ConfirmationCode: code,
      Username: username,
      Password: password,
    })
  )

/**
 * If you want to use Cognito User's Identity ID, you can do so like this: 
 * 
 * import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity'
 * import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers'

 * const cognitoIdentity = new CognitoIdentityClient({
 *   credentials: fromCognitoIdentityPool({
 *     clientConfig: { region: process.env.AWS_REGION },
 *     identityPoolId: process.env.IDENTITY_POOL_ID!,
 *     logins: {
 *       [process.env.USER_POOL_ENDPOINT!]: idToken,
 *     },
 *   }),
 * })

 * const credentials = await cognitoIdentity.config.credentials()
 */
