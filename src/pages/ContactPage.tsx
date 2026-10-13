import React from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import { ContactForm } from '../components/contact/ContactForm'

interface ContactPageProps {
  onNavigate: (page: string) => void
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  return (
    <main className="w-full">
      <Breadcrumb
        title="Get In Touch"
        parent="Home"
        current="contact-us"
        onNavigateHome={() => onNavigate('home')}
      />
      <ContactForm />
    </main>
  )
}
