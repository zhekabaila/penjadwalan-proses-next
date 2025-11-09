import { Metadata } from 'next'
import { HeroSection } from '../_components/HeroSection'
import { AboutSection } from '../_components/AboutSection'
import FeatureSection from '../_components/FeatureSection'
import TheorySection from '../_components/TheorySection'
import DemoSection from '../_components/DemoSection'
import FaqSection from '../_components/FaqSection'
import { generateSEOMetadata } from '@/lib/metadata'

export const metadata: Metadata = generateSEOMetadata('/landing-page')

export default function LandingPage() {
  return (
    <div>
      <HeroSection /> {/* Assuming HeroSection is correctly imported */}
      <AboutSection /> {/* Corrected component name */}
      <FeatureSection />
      <TheorySection />
      <DemoSection />
      <FaqSection />
    </div>
  )
}
