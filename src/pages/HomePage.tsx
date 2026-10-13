import React from 'react'
import { Hero } from '../components/home/Hero'
import { AboutSection } from '../components/home/AboutSection'
import { ServicesSection } from '../components/home/ServicesSection'
import { RecentWorkSection } from '../components/home/RecentWorkSection'
import { TeamSection } from '../components/home/TeamSection'
import { PartnerSection } from '../components/about/PartnerSection'
import { ClientsSection } from '../components/home/ClientsSection'
import { TestimonialsSection } from '../components/home/TestimonialsSection'
import { WhyDixorSection } from '../components/home/WhyDixorSection'

interface HomePageProps {
  onNavigate: (page: string, projectTitle?: string) => void
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <main className="w-full">
      <Hero
        onKnowMore={() => onNavigate('about')}
        onContact={() => onNavigate('contact')}
        onProjects={() => onNavigate('projects')}
      />
      <AboutSection onNavigate={onNavigate} />
      <ServicesSection onServiceClick={(title) => onNavigate('blog', title)} />
      <RecentWorkSection onSeeDetails={(title) => onNavigate('projects', title)} />
      <TeamSection />
      <PartnerSection onNavigate={onNavigate} />
      <ClientsSection onViewAll={() => onNavigate('projects')} />
      <TestimonialsSection />
      <WhyDixorSection onContact={() => onNavigate('contact')} />
    </main>
  )
}
