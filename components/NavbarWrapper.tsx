import Navbar from '@/components/Navbar'
import { getNavbarCopy } from '@/sanity/utils/navbar'

export default async function NavbarWrapper() {
  const navbarCopy = await getNavbarCopy()

  return <Navbar copy={navbarCopy} />
}
