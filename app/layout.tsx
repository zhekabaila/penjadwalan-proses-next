import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './_components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { LayoutWrapper } from './layouts/LayoutWrapper'
import { generateSEOMetadata } from '@/lib/metadata'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat-sans',
  weight: ['400'],
})


export const metadata: Metadata = generateSEOMetadata('/')

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TooltipProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
