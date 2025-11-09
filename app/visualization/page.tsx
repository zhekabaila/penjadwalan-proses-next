import { Metadata } from 'next'
import VisualizationLayout from './_layouts/visualization-layout'
import { generateSEOMetadata } from '@/lib/metadata'

export const metadata: Metadata = generateSEOMetadata('/visualization')

function VisualizationPage() {
  return <VisualizationLayout />
}

export default VisualizationPage
