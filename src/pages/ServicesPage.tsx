import React from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import { NumberedServicesList } from '../components/services/NumberedServicesList'
import { StatsSection } from '../components/common/StatsSection'
import { ClientsSection } from '../components/home/ClientsSection'
import { QuotesTestimonials } from '../components/services/QuotesTestimonials'

interface ServicesPageProps {
  onNavigate: (page: string, extra?: string) => void
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  return (
    <main className="w-full">
      <Breadcrumb
        title="Our Services"
        parent="Home"
        current="services-4"
        onNavigateHome={() => onNavigate('home')}
      />
      <NumberedServicesList onServiceClick={(title) => onNavigate('blog', title)} />
      <StatsSection />
      <ClientsSection onViewAll={() => onNavigate('projects')} />
      <QuotesTestimonials />
    </main>
  )
}
