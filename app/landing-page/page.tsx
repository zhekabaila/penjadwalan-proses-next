import { HeroSection } from '../_components/HeroSection'
import { AboutSection } from '../_components/AboutSection'
import FeatureSection from '../_components/FeatureSection' // Assuming this is the correct import for FeatureSection
import TheorySection from '../_components/TheorySection'
import DemoSection from '../_components/DemoSection'
import FaqSection from '../_components/FaqSection'

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
