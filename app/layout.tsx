import './globals.css'
import { Inter } from 'next/font/google'
import Layout from '../components/Layout'

const inter = Inter({ subsets: ['latin'],
  variable: "--font-sans",
 })

export const metadata = {
  title: 'ImageGen - AI Image Generation',
  description: 'Generate amazing images using AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-neutral-50 dark:bg-amoled-black text-[#141414] dark:text-white`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
