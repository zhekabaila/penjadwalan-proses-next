import React from 'react'
import { Metadata } from 'next'
import HomeLayout from './_layouts/home-layout'
import { generateSEOMetadata } from '@/lib/metadata'

export const metadata: Metadata = generateSEOMetadata('/')

function HomePage() {
  return (
    <HomeLayout />
  )
}

export default HomePage