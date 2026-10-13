import React, { useState } from 'react'
import { ASSETS } from '../constants/assets'

interface FooterProps {
  onNavigate?: (page: string) => void
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSent(true)
      setTimeout(() => setSent(false), 3000)
      setEmail('')
    }
  }

  const [activeModal, setActiveModal] = useState<'faqs' | 'terms' | 'privacy' | 'help' | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [faqSearch, setFaqSearch] = useState('')

  // Help Desk Form State
  const [ticketForm, setTicketForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [ticketSubmitted, setTicketSubmitted] = useState(false)

  // Lock body scroll and handle Escape key for footer modals
  React.useEffect(() => {
    if (activeModal) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setActiveModal(null)
        }
      }
      window.addEventListener('keydown', handleKeyDown)

      return () => {
        document.body.style.overflow = originalOverflow
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [activeModal])

  const handleLink = (page: string) => {
    if (onNavigate) {
      onNavigate(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (ticketForm.name && ticketForm.email && ticketForm.message) {
      setTicketSubmitted(true)
      setTimeout(() => {
        setTicketSubmitted(false)
        setTicketForm({ name: '', email: '', subject: '', message: '' })
      }, 4000)
    }
  }

  const faqsData = [
    {
      q: 'What core services does Bytebly offer?',
      a: 'Bytebly specializes in full-stack web and mobile application development, bespoke UI/UX design, custom enterprise software platforms, cloud infrastructure setup, and digital brand elevation.',
    },
    {
      q: 'How long does a typical project take from start to finish?',
      a: 'Project timelines vary depending on complexity: standard brand websites take between 2 to 4 weeks, while complex full-stack web applications and custom software platforms typically take 6 to 12 weeks with weekly sprint progress demos.',
    },
    {
      q: 'What technologies does your engineering team build with?',
      a: 'We work with modern, high-performance tech stacks including React, Next.js, TypeScript, Tailwind CSS, Node.js, Python, PostgreSQL, MongoDB, Docker, and modern cloud deployment platforms.',
    },
    {
      q: 'Do you offer ongoing post-launch support and maintenance?',
      a: 'Yes! All delivered solutions include complimentary warranty support. We also provide ongoing monthly retainer agreements for feature development, performance audits, security updates, and infrastructure management.',
    },
    {
      q: 'How do project billing and payment milestones work?',
      a: 'We work with transparent, milestone-driven billing (typically 40% project kickoff, 30% intermediate milestone demo, and 30% final deployment and handover). Custom enterprise retainer agreements are also available.',
    },
    {
      q: 'Will my website or application be mobile-friendly and SEO-optimized?',
      a: 'Absolutely. Every digital solution we create is built with 100% responsive layout principles across all screen sizes, clean semantic HTML5 markup, optimized asset delivery, and industry-standard technical SEO.',
    },
  ]

  const filteredFaqs = faqsData.filter(
    (item) =>
      item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.a.toLowerCase().includes(faqSearch.toLowerCase())
  )

  const usefulLinks = [
    { label: 'About Us', action: () => handleLink('about') },
    { label: 'Contact', action: () => handleLink('contact') },
    { label: 'FAQS', action: () => setActiveModal('faqs') },
    { label: 'Services', action: () => handleLink('services') },
    { label: 'Term & Conditions', action: () => setActiveModal('terms') },
    { label: 'Privacy Policy', action: () => setActiveModal('privacy') },
    { label: 'Blog & News', action: () => handleLink('blog') },
    { label: 'Help Desk', action: () => setActiveModal('help') },
  ]

  return (
    <footer className="w-full border-t border-[#DDDDDD] dark:border-[#222] bg-white dark:bg-[#0E0F11] text-xs">
      <div className="w-full max-w-[1140px] px-4 mx-auto">
        <div className="flex flex-wrap -mx-4">
          
          {/* Left Column (Brand, Offices, Newsletter) */}
          <div className="w-full lg:w-1/2 px-4 py-16 lg:py-24 lg:pr-16 border-b lg:border-b-0 lg:border-r border-[#DDDDDD] dark:border-[#222]">
            {/* Logo */}
            <div className="mb-10">
              <img
                src={ASSETS.logoDark}
                alt="Bytebly"
                className="h-20 w-auto object-contain dark:hidden inline-block"
              />
              <img
                src={ASSETS.logoWhite}
                alt="Bytebly"
                className="h-20 w-auto object-contain hidden dark:inline-block"
              />
            </div>

            {/* Offices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              <div>
                <h4 className="text-[20px] leading-[120%] mb-3 font-barlow font-semibold text-[#04000B] dark:text-white">
                  Address
                </h4>
                <p className="text-[17px] leading-[170%] font-barlow text-[#666666] dark:text-gray-400">
                  Ahmedabad, Gujarat, India
                </p>
              </div>
            </div>

            {/* Newsletter Input Box */}
            <div className="relative max-w-md">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 pl-6 pr-16 rounded-[10px] border border-[#E7E7E7] dark:border-[#333] bg-white dark:bg-[#1A1A1A] font-barlow text-[17px] text-[#04000B] dark:text-white placeholder-[#666666] focus:outline-none focus:border-[#04000B]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <img
                    src={ASSETS.footerSend}
                    alt="Send"
                    className="w-6 h-auto object-contain"
                  />
                </button>
              </form>
              {sent && (
                <p className="text-xs text-green-600 mt-2 font-semibold">Subscribed successfully!</p>
              )}

              {/* Social Icons directly below Your Email Section */}
              <div className="flex items-center space-x-3.5 mt-8">
                <a
                  href="https://www.facebook.com/share/1CKjbK8r5U/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-11 h-11 rounded-full bg-white dark:bg-[#1A1A1A] border border-[#E7E7E7] dark:border-[#333] flex items-center justify-center text-[#04000B] dark:text-white hover:bg-[#C9F31D] hover:text-[#04000B] transition-colors shadow-sm"
                >
                  <span className="font-bold text-base">f</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/bytebly-99863a3a8?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-11 h-11 rounded-full bg-white dark:bg-[#1A1A1A] border border-[#E7E7E7] dark:border-[#333] flex items-center justify-center text-[#04000B] dark:text-white hover:bg-[#C9F31D] hover:text-[#04000B] transition-colors shadow-sm"
                >
                  <span className="font-bold text-sm">in</span>
                </a>
                <a
                  href="https://wa.me/919484520805"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-11 h-11 rounded-full bg-white dark:bg-[#1A1A1A] border border-[#E7E7E7] dark:border-[#333] flex items-center justify-center text-[#04000B] dark:text-white hover:bg-[#C9F31D] hover:text-[#04000B] transition-colors shadow-sm group"
                >
                  <svg
                    className="w-4 h-4 fill-[#04000B] dark:fill-white group-hover:fill-[#04000B] transition-colors"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/bytebly?rpxt=MWcxNzlmemRrcWptcA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-11 h-11 rounded-full bg-white dark:bg-[#1A1A1A] border border-[#E7E7E7] dark:border-[#333] flex items-center justify-center text-[#04000B] dark:text-white hover:bg-[#C9F31D] hover:text-[#04000B] transition-colors shadow-sm"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (Useful Links, Contacts) */}
          <div className="w-full lg:w-1/2 px-4 py-16 lg:py-24 lg:pl-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[24px] leading-[120%] font-barlow font-semibold text-[#04000B] dark:text-white">
                Useful Link
              </h3>
              <span className="text-xs font-barlow text-[#888] dark:text-gray-400 uppercase tracking-wider">
                Explore & Support
              </span>
            </div>

            {/* 2-column list of interactive links */}
            <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 mb-10">
              {usefulLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={link.action}
                  className="group flex items-center gap-2 text-left text-[17px] sm:text-[19px] leading-[170%] font-barlow text-[#666666] dark:text-gray-400 hover:text-[#04000B] dark:hover:text-white transition-all duration-200 cursor-pointer focus:outline-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#C9F31D] transition-all duration-200 shrink-0 group-hover:scale-125" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200 underline-offset-4 group-hover:underline">
                    {link.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Contact info strip */}
            <div className="pt-8 border-t border-[#E7E7E7] dark:border-[#222]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <a
                  href="mailto:support@bytebly.in"
                  className="text-[20px] sm:text-[24px] leading-[170%] font-barlow font-medium text-[#04000B] dark:text-white hover:text-[#C9F31D] transition-colors"
                >
                  support@bytebly.in
                </a>
                <a
                  href="tel:+919484520805"
                  className="text-[20px] sm:text-[24px] leading-[170%] font-barlow font-medium text-[#04000B] dark:text-white hover:text-[#C9F31D] transition-colors"
                >
                  +91 9484520805
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Sub-footer Bar */}
      <div className="py-6 border-t border-[#DDDDDD] dark:border-[#222] bg-[#FAFBF8] dark:bg-[#08090A]">
        <div className="w-full max-w-[1140px] px-4 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Left Side: Est. & Startup Badge Info */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-[13px] sm:text-[14px] font-barlow tracking-wider uppercase">
            <span className="inline-flex items-center gap-2 font-bold text-[#04000B] dark:text-[#93C5FD]">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] shrink-0" />
              EST. 2026
            </span>
            <span className="font-semibold text-[#666666] dark:text-[#8E97A6]">
              TECH STARTUP
            </span>
          </div>

          {/* Right Side: Copyright text */}
          <div className="text-[14px] sm:text-[16px] font-barlow text-[#666666] dark:text-gray-400">
            Copyright © 2026 Bytebly. All Rights Reserved
          </div>
        </div>
      </div>
      {/* Interactive Footer Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          {/* Backdrop click to dismiss */}
          <div
            className="fixed inset-0"
            onClick={() => setActiveModal(null)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-3xl bg-white dark:bg-[#16171B] rounded-[24px] shadow-2xl overflow-hidden border border-[#E7E7E7] dark:border-white/10 z-10 max-h-[90vh] flex flex-col my-auto">
            {/* Top Bar with title badge and close button */}
            <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-[#16171B]/95 backdrop-blur-md z-20">
              <div className="flex items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full bg-[#C9F31D] text-[#04000B] font-barlow font-bold text-xs uppercase tracking-wider">
                  {activeModal === 'faqs' && 'Frequently Asked Questions'}
                  {activeModal === 'terms' && 'Terms & Conditions'}
                  {activeModal === 'privacy' && 'Privacy Policy'}
                  {activeModal === 'help' && 'Bytebly Help Desk'}
                </span>
                <span className="hidden sm:inline-block text-xs font-barlow text-gray-500 dark:text-gray-400">
                  {activeModal === 'faqs' && 'Find answers to common inquiries'}
                  {activeModal === 'terms' && 'Last Updated: January 2026'}
                  {activeModal === 'privacy' && 'Effective: January 2026'}
                  {activeModal === 'help' && 'Live Technical & Project Support'}
                </span>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                aria-label="Close modal"
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-[#C9F31D] hover:text-[#04000B] text-gray-700 dark:text-white flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* FAQS MODAL */}
              {activeModal === 'faqs' && (
                <div className="space-y-6">
                  {/* Search box */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search questions (e.g. pricing, timelines, tech stack)..."
                      value={faqSearch}
                      onChange={(e) => setFaqSearch(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1F2024] text-sm font-barlow text-[#04000B] dark:text-white focus:outline-none focus:border-[#C9F31D]"
                    />
                    {faqSearch && (
                      <button
                        onClick={() => setFaqSearch('')}
                        className="absolute right-3 top-3 text-xs text-gray-400 hover:text-gray-600"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Accordion list */}
                  <div className="space-y-3">
                    {filteredFaqs.length > 0 ? (
                      filteredFaqs.map((faq, index) => {
                        const isOpen = openFaqIndex === index
                        return (
                          <div
                            key={index}
                            className={`rounded-xl border transition-all duration-200 ${
                              isOpen
                                ? 'border-[#C9F31D] bg-[#F9FAF6] dark:bg-[#1A1C20]'
                                : 'border-gray-200 dark:border-white/5 bg-white dark:bg-[#141518]'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                              className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                            >
                              <span className="text-[16px] sm:text-[18px] font-barlow font-semibold text-[#04000B] dark:text-white">
                                {faq.q}
                              </span>
                              <span className={`text-xl transition-transform duration-200 ${isOpen ? 'rotate-45 text-[#8EB700] dark:text-[#C9F31D]' : 'text-gray-400'}`}>
                                +
                              </span>
                            </button>
                            {isOpen && (
                              <div className="px-4 sm:px-5 pb-5 pt-1 text-sm sm:text-base font-barlow text-[#555] dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-white/5">
                                {faq.a}
                              </div>
                            )}
                          </div>
                        )
                      })
                    ) : (
                      <p className="text-center py-8 text-sm text-gray-400 font-barlow">
                        No questions matched your search query.
                      </p>
                    )}
                  </div>

                  {/* Need more help banner */}
                  <div className="p-4 rounded-xl bg-[#F2F3EF] dark:bg-[#111215] flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-barlow font-semibold text-[#04000B] dark:text-white">
                        Have a specific question not listed here?
                      </p>
                      <p className="text-xs font-barlow text-[#666] dark:text-gray-400">
                        Our help desk team is on standby to assist you.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveModal('help')}
                      className="px-4 py-2 rounded-lg bg-[#04000B] dark:bg-white text-white dark:text-[#04000B] hover:bg-[#C9F31D] dark:hover:bg-[#C9F31D] hover:text-[#04000B] dark:hover:text-[#04000B] font-barlow font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Open Help Desk →
                    </button>
                  </div>
                </div>
              )}

              {/* TERMS AND CONDITIONS MODAL */}
              {activeModal === 'terms' && (
                <div className="space-y-6 text-sm sm:text-base font-barlow text-[#555] dark:text-gray-300 leading-relaxed">
                  <div className="p-4 rounded-xl bg-[#F9FAF6] dark:bg-[#121316] border border-gray-100 dark:border-white/5">
                    <p className="text-xs text-[#888] dark:text-gray-400 uppercase tracking-wider mb-1 font-semibold">
                      Legal Notice
                    </p>
                    <p className="text-sm text-[#04000B] dark:text-white font-medium">
                      By accessing or using the services provided by Bytebly Technologies ("Bytebly"), you agree to abide by and be bound by the following Terms & Conditions.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-base font-bold text-[#04000B] dark:text-white mb-1.5">
                        1. Services & Scope of Work
                      </h4>
                      <p>
                        Bytebly provides bespoke web development, mobile application engineering, digital product consulting, and UI/UX design. All engagements are executed according to mutually approved project specifications, proposals, or Statements of Work (SOW).
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-[#04000B] dark:text-white mb-1.5">
                        2. Intellectual Property & Deliverables
                      </h4>
                      <p>
                        Upon receipt of full payment for completed milestones, all custom intellectual property, designs, source code, and assets developed specifically for the client transfer entirely to the client. Bytebly reserves the right to present non-confidential deliverables in our professional showcase and case studies.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-[#04000B] dark:text-white mb-1.5">
                        3. Payment Terms & Milestone Invoicing
                      </h4>
                      <p>
                        Invoices are generated based on agreed milestones (kickoff, review, and deployment). Invoices are payable within the net terms agreed upon. Work proceeds through subsequent sprint phases upon confirmation of prior milestone disbursements.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-[#04000B] dark:text-white mb-1.5">
                        4. Client Obligations & Material Delivery
                      </h4>
                      <p>
                        Clients are responsible for providing timely feedback, brand assets, credentials, and content necessary to meet agreed project schedules. Delays in material delivery may adjust estimated completion dates.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-[#04000B] dark:text-white mb-1.5">
                        5. Confidentiality & Non-Disclosure
                      </h4>
                      <p>
                        Both parties agree to treat all business data, technical schemas, and proprietary information shared during the engagement as strictly confidential and will not disclose it to third parties without prior written consent.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-[#04000B] dark:text-white mb-1.5">
                        6. Limitation of Liability
                      </h4>
                      <p>
                        In no event shall Bytebly be liable for indirect, incidental, or consequential damages resulting from third-party hosting outages, domain registry disruptions, or unauthorized external breaches beyond our control.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* PRIVACY POLICY MODAL */}
              {activeModal === 'privacy' && (
                <div className="space-y-6 text-sm sm:text-base font-barlow text-[#555] dark:text-gray-300 leading-relaxed">
                  <div className="p-4 rounded-xl bg-[#F9FAF6] dark:bg-[#121316] border border-gray-100 dark:border-white/5">
                    <p className="text-xs text-[#888] dark:text-gray-400 uppercase tracking-wider mb-1 font-semibold">
                      Your Privacy Matters
                    </p>
                    <p className="text-sm text-[#04000B] dark:text-white font-medium">
                      Bytebly Technologies is committed to safeguarding your privacy and ensuring your personal data is handled responsibly and securely.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-base font-bold text-[#04000B] dark:text-white mb-1.5">
                        1. Information We Collect
                      </h4>
                      <p>
                        We collect information you explicitly provide to us when submitting inquiries, requesting quotes, or contacting our team. This may include your full name, email address, phone number, company name, and project requirements.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-[#04000B] dark:text-white mb-1.5">
                        2. How We Use Collected Data
                      </h4>
                      <p>
                        Information collected is strictly utilized to respond to inquiries, provide customized project proposals, deliver services, issue invoices, and communicate relevant service improvements. We never sell or monetize your data.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-[#04000B] dark:text-white mb-1.5">
                        3. Data Security & Storage
                      </h4>
                      <p>
                        We implement industry-standard SSL encryption, secure credential vaults, and strict access controls to prevent unauthorized access, data loss, or disclosure of your project and personal information.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-[#04000B] dark:text-white mb-1.5">
                        4. Cookies & Usage Analytics
                      </h4>
                      <p>
                        Our website may use essential cookies and anonymized analytics to observe aggregate usage trends and improve website usability. You can choose to disable cookies through your web browser preferences at any time.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-[#04000B] dark:text-white mb-1.5">
                        5. Your Rights & Data Requests
                      </h4>
                      <p>
                        You retain full rights to request an update, verification, or permanent deletion of any personal data stored with Bytebly. For privacy inquiries, please contact us directly at <span className="font-semibold text-[#04000B] dark:text-white">support@bytebly.in</span>.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* HELP DESK MODAL */}
              {activeModal === 'help' && (
                <div className="space-y-6">
                  {/* Channels Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <a
                      href="https://wa.me/919484520805?text=Hello%20Bytebly%20Team%2C%20I%20need%20support"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl border border-green-500/30 bg-green-500/5 hover:bg-green-500/10 transition-colors flex flex-col items-start"
                    >
                      <span className="text-xs font-barlow font-bold uppercase tracking-wider text-green-600 dark:text-green-400 mb-1">
                        Fastest • WhatsApp
                      </span>
                      <span className="text-[17px] font-barlow font-bold text-[#04000B] dark:text-white mb-0.5">
                        +91 9484520805
                      </span>
                      <span className="text-xs text-gray-500 font-barlow">
                        Live chat with team
                      </span>
                    </a>

                    <a
                      href="tel:+919484520805"
                      className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1A1A1E] hover:border-[#C9F31D] transition-colors flex flex-col items-start"
                    >
                      <span className="text-xs font-barlow font-bold uppercase tracking-wider text-[#666] dark:text-gray-400 mb-1">
                        Phone Call
                      </span>
                      <span className="text-[17px] font-barlow font-bold text-[#04000B] dark:text-white mb-0.5">
                        +91 9484520805
                      </span>
                      <span className="text-xs text-gray-500 font-barlow">
                        Mon - Sat (9 AM - 8 PM IST)
                      </span>
                    </a>

                    <a
                      href="mailto:support@bytebly.in"
                      className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1A1A1E] hover:border-[#C9F31D] transition-colors flex flex-col items-start"
                    >
                      <span className="text-xs font-barlow font-bold uppercase tracking-wider text-[#666] dark:text-gray-400 mb-1">
                        Email Desk
                      </span>
                      <span className="text-[17px] font-barlow font-bold text-[#04000B] dark:text-white mb-0.5">
                        support@bytebly.in
                      </span>
                      <span className="text-xs text-gray-500 font-barlow">
                        Response &lt; 2 hours
                      </span>
                    </a>
                  </div>

                  {/* Submit Ticket Form */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#F8F9F5] dark:bg-[#111215] border border-gray-100 dark:border-white/5">
                    <h4 className="text-base font-barlow font-bold text-[#04000B] dark:text-white mb-1">
                      Submit a Support Ticket
                    </h4>
                    <p className="text-xs font-barlow text-[#666] dark:text-gray-400 mb-4">
                      Describe your query or requirement and our engineering team will respond promptly.
                    </p>

                    {ticketSubmitted ? (
                      <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-300 font-barlow text-sm font-medium">
                        ✓ Ticket received! A support representative will get back to you within 2 hours.
                      </div>
                    ) : (
                      <form onSubmit={handleTicketSubmit} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={ticketForm.name}
                            onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1B1C20] text-sm font-barlow text-[#04000B] dark:text-white focus:outline-none focus:border-[#C9F31D]"
                          />
                          <input
                            type="email"
                            required
                            placeholder="Your Email Address"
                            value={ticketForm.email}
                            onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1B1C20] text-sm font-barlow text-[#04000B] dark:text-white focus:outline-none focus:border-[#C9F31D]"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Subject / Topic (Optional)"
                          value={ticketForm.subject}
                          onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1B1C20] text-sm font-barlow text-[#04000B] dark:text-white focus:outline-none focus:border-[#C9F31D]"
                        />
                        <textarea
                          required
                          rows={3}
                          placeholder="How can we help you?"
                          value={ticketForm.message}
                          onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1B1C20] text-sm font-barlow text-[#04000B] dark:text-white focus:outline-none focus:border-[#C9F31D] resize-none"
                        />
                        <button
                          type="submit"
                          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#C9F31D] text-[#04000B] font-barlow font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer"
                        >
                          Submit Ticket →
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
