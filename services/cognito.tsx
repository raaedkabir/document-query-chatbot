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

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
})

export const signUp = async (
  name: string,
  username: string,
  password: string
) =>
  await cognitoClient.send(
    new SignUpCommand({
      ClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
      Username: username,
      Password: password,
      UserAttributes: [
        {
          Name: 'given_name',
          Value: name,
        },
      ],
    })
  )

export const confirm = async (username: string, code: string) =>
  await cognitoClient.send(
    new ConfirmSignUpCommand({
      ClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
      ConfirmationCode: code,
      Username: username,
    })
  )

export const resendConfirmationCode = async (username: string) =>
  await cognitoClient.send(
    new ResendConfirmationCodeCommand({
      ClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
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
      },
      ClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
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

export const forgotPassword = async (username: string) =>
  await cognitoClient.send(
    new ForgotPasswordCommand({
      ClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
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
      ClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
      ConfirmationCode: code,
      Username: username,
      Password: password,
    })
  )
