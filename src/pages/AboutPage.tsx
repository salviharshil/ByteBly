import React from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import { AboutSection } from '../components/home/AboutSection'
import { StatsSection } from '../components/common/StatsSection'
import { PartnerSection } from '../components/about/PartnerSection'
import { TeamSection } from '../components/home/TeamSection'
import { TestimonialsSection } from '../components/home/TestimonialsSection'

interface AboutPageProps {
  onNavigate: (page: string) => void
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <main className="w-full">
      <Breadcrumb
        title="About Company"
        parent="Home"
        current="About"
        onNavigateHome={() => onNavigate('home')}
      />
      <AboutSection onNavigate={onNavigate} />
      <StatsSection />
      <PartnerSection onNavigate={onNavigate} />
      <TeamSection />
      <TestimonialsSection />
    </main>
  )
}
