import { Metadata } from 'next'
import LoginLayout from './_layouts/login-layout'
import { generateSEOMetadata } from '@/lib/metadata'

export const metadata: Metadata = generateSEOMetadata('/login')

const LoginPage = () => {
  return <LoginLayout />
}

export default LoginPage
