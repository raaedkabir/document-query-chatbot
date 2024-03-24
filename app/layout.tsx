import type { Metadata } from 'next'
import { Montserrat, Nunito } from 'next/font/google'
import './globals.css'
import { getSiteMetadata } from '@/sanity/utils/siteMetadata'
import CookieConsent from '@/components/CookieConsent'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
})

export async function generateMetadata(): Promise<Metadata> {
  const siteMetadata = await getSiteMetadata()

  return {
    title: siteMetadata[0].title,
    description: siteMetadata[0].description,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${nunito.variable}`}>
      <body className="min-h-screen bg-gray-light">
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
