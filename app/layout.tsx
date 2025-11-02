import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from './_components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { NavigationMenuDemo } from './_components/Navbar'
import Footer from './_components/Footer'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'Starting Template',
  description: 'Starting Template'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TooltipProvider>
            <NavigationMenuDemo />
            <div className="fixed inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900"></div>
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>
            {children}
            <Footer />
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
