import { HeroSection } from '../_components/HeroSection'
import FeatureSection from '../_components/FeatureSection'
import TheorySection from '../_components/TheorySection'
import DemoSection from '../_components/DemoSection'
import FaqSection from '../_components/FaqSection'

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <TheorySection />
      <DemoSection />
      <FaqSection />
    </div>
  )
}
