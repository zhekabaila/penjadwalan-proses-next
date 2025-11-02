import React from 'react'
import { HeroSection } from '../_components/HeroSection'
import { NavigationMenuDemo } from '../_components/Navbar'
import FeatureSection from '../_components/FeatureSection'
import TheorySection from '../_components/TheorySection'
import Footer from '../_components/Footer'

export default function LandingPage() {
  return (
    <div>
      <NavigationMenuDemo />
      <HeroSection />
      <FeatureSection />
      <TheorySection />
      <Footer />
    </div>
  )
}
