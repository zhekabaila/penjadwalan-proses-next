import { Metadata } from 'next'
import RegisterLayout from './_layouts/register-layout'
import { generateSEOMetadata } from '@/lib/metadata'

export const metadata: Metadata = generateSEOMetadata('/register')

const RegisterPage = () => {
  return <RegisterLayout />
}

export default RegisterPage
