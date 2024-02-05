import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  SignUpCommand,
  GetUserCommand,
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
