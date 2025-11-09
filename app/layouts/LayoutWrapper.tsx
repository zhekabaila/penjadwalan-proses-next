'use client'

import { NavigationMenuDemo } from '../_components/Navbar'
import Footer from '../_components/Footer'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    const validRoutes = [
      '/',
      '/landing-page',
      '/visualization',
      '/login',
      '/register',
    ]
    
    const isValidRoute = validRoutes.some(route => {
      if (route === '/') return pathname === route
      return pathname?.startsWith(route)
    })
    
    if (!isValidRoute && pathname !== null) {
      setIsNotFound(true)
    } else {
      setIsNotFound(false)
    }
  }, [pathname])

  return (
    <>
      {!isNotFound && <NavigationMenuDemo />}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      {children}
      {!isNotFound && <Footer />}
    </>
  )
}
