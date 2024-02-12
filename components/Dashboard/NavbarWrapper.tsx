import { cookies } from 'next/headers'
import { getUser } from '@/services/cognito'
import NavbarWithNoSSR from '@/components/Dashboard/Navbar'

export default async function NavbarWrapper() {
  const accessToken = cookies().get('AccessToken')?.value!

  const userDetails = await getUser(accessToken)

  const givenName =
    userDetails.UserAttributes?.find(
      (userAttribute) => userAttribute.Name === 'given_name'
    )?.Value || ''

  return <NavbarWithNoSSR chatHistory={[]} givenName={givenName} />
}
