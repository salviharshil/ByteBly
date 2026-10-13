import React, { useState } from 'react'
import { ASSETS } from '../../constants/assets'
import { ScrollRevealTitle, ScrollRevealBox } from '../common/ScrollRevealTitle'
import { RevenueGrowthGraph } from '../common/RevenueGrowthGraph'

interface WhyDixorSectionProps {
  onContact?: () => void
}

export const WhyDixorSection: React.FC<WhyDixorSectionProps> = ({ onContact }) => {
  const [openAccordion, setOpenAccordion] = useState<number>(0)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [hoveredAward, setHoveredAward] = useState<number | null>(null)

  const awards = [
    { title: 'Behance Awards', icon: '★' },
    { title: 'Design Awards', icon: '🏆' },
    { title: 'Coding Awards', icon: '💻' },
  ]

  const accordionItems = [
    {
      title: 'Business Innovation',
      content:
        'Bennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause.',
    },
    {
      title: 'Search Engine Optimization',
      content:
        'Advanced algorithmic optimization techniques combined with high-quality content marketing to secure top-tier organic visibility and sustainable growth.',
    },
    {
      title: 'Thinking Differently',
      content:
        'Challenging standard conventions with bold creative concepts that establish meaningful brand differentiation and emotional connection with audiences.',
    },
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Research',
      subtitle: 'Discovery & Insights',
      icon: ASSETS.processIcons.research,
      desc: 'In-depth market discovery, competitor analysis, and audience research to uncover actionable opportunities and establish a rock-solid foundation.',
    },
    {
      step: '02',
      title: 'Concept',
      subtitle: 'Ideation & Strategy',
      icon: ASSETS.processIcons.concept,
      desc: 'Strategic wireframing, architecture planning, and creative direction to formulate intuitive user experiences and cohesive brand identities.',
    },
    {
      step: '03',
      title: 'Implement',
      subtitle: 'Engineering & Build',
      icon: ASSETS.processIcons.implement,
      desc: 'Pixel-perfect development and agile engineering utilizing modern tech stacks to build robust, scalable, and high-performance digital products.',
    },
    {
      step: '04',
      title: 'Handover',
      subtitle: 'Launch & Scale',
      icon: ASSETS.processIcons.handover,
      desc: 'Rigorous quality testing, final launch deployment, and comprehensive documentation to empower your team for seamless long-term success.',
    },
  ]

  return (
    <div className="w-full">
      
      {/* 1. WHY BYTEBLY ACCORDION & AWARDS */}
      <section className="py-24 lg:py-32 bg-white dark:bg-[#0E0F11]">
        <div className="w-full max-w-[1140px] px-4 mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            
            {/* Left: Revenue Growth Graph */}
            <div className="w-full lg:w-5/12 px-4 mb-14 lg:mb-0 relative z-0">
              <ScrollRevealBox yOffset={50}>
                <RevenueGrowthGraph />
              </ScrollRevealBox>
            </div>

            {/* Right: Accordion & Awards */}
            <div className="w-full lg:w-7/12 px-4 lg:pl-16">
              {/* Badge */}
              <ScrollRevealBox delay={50} yOffset={20}>
                <div className="inline-block mb-5 py-2 px-7 rounded-[30px] border border-[#CCCCCC] dark:border-gray-600 bg-white/40 dark:bg-white/5">
                  <span className="text-[16px] sm:text-[18px] leading-[120%] uppercase font-barlow font-bold text-[#04000B] dark:text-white">
                    Why Bytebly
                  </span>
                </div>
              </ScrollRevealBox>

              {/* Title with Masked Pop-up Animation */}
              <ScrollRevealTitle
                lines={['Unlock Revenue', 'Growth']}
                className="text-3xl sm:text-5xl lg:text-[60px] leading-[115%] font-barlow font-semibold text-[#04000B] dark:text-white mb-8 tracking-tight"
                staggerDelayMs={120}
              />

              {/* Accordion list */}
              <ScrollRevealBox delay={200} yOffset={30}>
                <div className="space-y-4 mb-12">
                  {accordionItems.map((item, idx) => {
                    const isOpen = openAccordion === idx
                    return (
                      <div
                        key={idx}
                        className="border-b border-[#CCCCCC] dark:border-gray-700 pb-4 transition-all"
                      >
                        <button
                          onClick={() => setOpenAccordion(isOpen ? -1 : idx)}
                          className="w-full flex items-center justify-between text-left py-2 group cursor-pointer"
                        >
                          <div className="flex items-center space-x-4">
                            <span className="w-7 h-7 rounded-full border border-[#CCCCCC] dark:border-gray-600 flex items-center justify-center text-sm font-bold bg-white dark:bg-[#1A1A1A] text-[#04000B] dark:text-white">
                              {isOpen ? '−' : '+'}
                            </span>
                            <span className="text-[19px] sm:text-[20px] font-barlow font-bold text-[#04000B] dark:text-white group-hover:text-[#C9F31D] transition-colors">
                              {item.title}
                            </span>
                          </div>
                        </button>

                        {isOpen && (
                          <div className="pl-11 pr-4 pt-2 text-[16px] sm:text-[17px] leading-[170%] font-barlow text-[#666666] dark:text-gray-300 animate-fadeIn">
                            {item.content}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </ScrollRevealBox>

              {/* 3 Award Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:-ml-12 relative z-10">
                {awards.map((award, idx) => {
                  const isHovered = hoveredAward === idx

                  return (
                    <ScrollRevealBox key={idx} delay={250 + idx * 100} yOffset={30}>
                      <div
                        onMouseEnter={() => setHoveredAward(idx)}
                        onMouseLeave={() => setHoveredAward(null)}
                        className={`group p-6 sm:p-8 rounded-[22px] cursor-pointer transition-all duration-300 ease-out border h-full flex flex-col justify-between ${
                          isHovered
                            ? 'bg-[#C9F31D] text-[#04000B] border-[#C9F31D] shadow-[0_20px_45px_rgba(201,243,29,0.38)] -translate-y-2 scale-[1.02]'
                            : 'bg-white dark:bg-[#1A1A1A] border-gray-100 dark:border-gray-800 text-[#04000B] dark:text-white shadow-[0px_2px_60px_rgba(0,0,0,0.08)] hover:bg-[#C9F31D] hover:text-[#04000B] hover:border-[#C9F31D] hover:shadow-[0_20px_45px_rgba(201,243,29,0.38)] hover:-translate-y-2'
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl transition-all duration-300 ${
                            isHovered
                              ? 'bg-[#04000B] text-[#C9F31D] shadow-md scale-110'
                              : 'bg-[#F2F3EF] dark:bg-white/5 text-[#C9F31D] group-hover:bg-[#04000B] group-hover:text-[#C9F31D] group-hover:scale-110'
                          }`}
                        >
                          <span className={award.icon === '★' ? 'text-[#C9F31D]' : ''}>
                            {award.icon}
                          </span>
                        </div>
                        <h4
                          className={`text-[18px] sm:text-[20px] font-barlow font-bold transition-colors duration-300 ${
                            isHovered
                              ? 'text-[#04000B]'
                              : 'text-[#04000B] dark:text-white group-hover:text-[#04000B]'
                          }`}
                        >
                          {award.title}
                        </h4>
                      </div>
                    </ScrollRevealBox>
                  )
                })}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR PROCESS SECTION */}
      <section className="py-24 lg:py-32 bg-[#F2F3EF] dark:bg-[#121316] relative overflow-hidden">
        {/* Subtle ambient background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9F31D]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C9F31D]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-[1140px] px-4 mx-auto relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
            <ScrollRevealBox delay={50} yOffset={20}>
              <div className="inline-flex items-center gap-2 mb-5 py-2 px-7 rounded-[30px] border border-[#CCCCCC] dark:border-gray-600 bg-white/70 dark:bg-white/5 backdrop-blur-sm shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#C9F31D]" />
                <span className="text-[15px] sm:text-[16px] leading-[120%] uppercase font-barlow font-bold text-[#04000B] dark:text-white tracking-wider">
                  Our Process
                </span>
              </div>
            </ScrollRevealBox>

            <ScrollRevealTitle
              lines={['Best Solutions Provider']}
              className="text-3xl sm:text-5xl lg:text-[56px] leading-[115%] font-barlow font-bold text-[#04000B] dark:text-white tracking-tight mb-4"
            />

            <ScrollRevealBox delay={120} yOffset={20}>
              <p className="text-[16px] sm:text-[17px] leading-[170%] font-barlow text-[#666666] dark:text-gray-400">
                A structured 4-step framework from discovery to deployment, ensuring seamless execution, total transparency, and measurable results.
              </p>
            </ScrollRevealBox>
          </div>

          {/* 4 Process Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {processSteps.map((step, idx) => {
              const isHovered = hoveredStep === idx

              return (
                <ScrollRevealBox key={idx} delay={idx * 120} yOffset={40} className="h-full">
                  <div className="relative h-full">
                    <div
                      onMouseEnter={() => setHoveredStep(idx)}
                      onMouseLeave={() => setHoveredStep(null)}
                      className={`group h-full p-8 sm:p-9 rounded-[28px] flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-300 ease-out border relative overflow-hidden ${
                        isHovered
                          ? 'bg-[#C9F31D] text-[#04000B] border-[#C9F31D] shadow-[0_20px_45px_rgba(201,243,29,0.38)] -translate-y-2.5 scale-[1.02]'
                          : 'bg-white dark:bg-[#1A1A1A] border-[#E5E7EB] dark:border-white/10 text-[#04000B] dark:text-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:bg-[#C9F31D] hover:text-[#04000B] hover:border-[#C9F31D] hover:shadow-[0_20px_45px_rgba(201,243,29,0.38)] hover:-translate-y-2.5'
                      }`}
                    >
                      {/* Faint Watermark Step Number */}
                      <span
                        className={`absolute top-4 right-6 text-5xl font-barlow font-bold pointer-events-none select-none transition-colors duration-300 ${
                          isHovered
                            ? 'text-[#04000B]/15'
                            : 'text-[#04000B]/[0.05] dark:text-white/[0.05] group-hover:text-[#04000B]/15'
                        }`}
                      >
                        {step.step}
                      </span>

                      {/* Step Pill Badge */}
                      <div className="mb-6">
                        <span
                          className={`px-3.5 py-1 rounded-full text-xs font-barlow font-bold uppercase tracking-wider transition-all duration-300 shadow-sm ${
                            isHovered
                              ? 'bg-[#04000B] text-[#C9F31D] shadow-md scale-105'
                              : 'bg-[#F2F3EF] dark:bg-white/10 text-[#04000B] dark:text-white group-hover:bg-[#04000B] group-hover:text-[#C9F31D] group-hover:scale-105'
                          }`}
                        >
                          Step {step.step}
                        </span>
                      </div>

                      {/* Icon Container with dark squircle & lime icon */}
                      <div
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${
                          isHovered
                            ? 'bg-[#04000B] border-[#04000B] shadow-[0_12px_28px_rgba(0,0,0,0.35)] scale-110'
                            : 'bg-[#F2F3EF] dark:bg-white/5 border border-black/5 dark:border-white/10 group-hover:bg-[#04000B] group-hover:border-[#04000B] group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.35)] group-hover:scale-110'
                        }`}
                      >
                        <img
                          src={step.icon}
                          alt={step.title}
                          className={`h-10 w-auto object-contain transition-all duration-300 process-icon-highlight ${
                            isHovered
                              ? 'is-highlighted scale-105'
                              : 'dark:invert group-hover:scale-105'
                          }`}
                        />
                      </div>

                      {/* Title & Subtitle */}
                      <h3
                        className={`text-[22px] font-barlow font-bold mb-1 tracking-tight transition-colors duration-300 ${
                          isHovered
                            ? 'text-[#04000B]'
                            : 'text-[#04000B] dark:text-white group-hover:text-[#04000B]'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <span
                        className={`text-xs font-barlow font-semibold uppercase tracking-wider mb-4 block transition-colors duration-300 ${
                          isHovered
                            ? 'text-[#04000B]/75'
                            : 'text-[#888888] dark:text-gray-400 group-hover:text-[#04000B]/75'
                        }`}
                      >
                        {step.subtitle}
                      </span>

                      {/* Description */}
                      <p
                        className={`text-[14px] sm:text-[15px] leading-[170%] font-barlow flex-1 transition-colors duration-300 ${
                          isHovered
                            ? 'text-[#04000B]/85 font-medium'
                            : 'text-[#666666] dark:text-gray-400 group-hover:text-[#04000B]/85 group-hover:font-medium'
                        }`}
                      >
                        {step.desc}
                      </p>

                      {/* Bottom accent line */}
                      <div
                        className={`h-1 rounded-full transition-all duration-300 mt-6 ${
                          isHovered
                            ? 'w-16 bg-[#04000B]'
                            : 'w-0 bg-[#C9F31D] group-hover:w-16 group-hover:bg-[#04000B]'
                        }`}
                      />
                    </div>

                    {/* Connecting Arrow between cards on desktop */}
                    {idx < processSteps.length - 1 && (
                      <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white dark:bg-[#25262B] border border-[#E5E7EB] dark:border-white/20 items-center justify-center text-[10px] text-[#04000B] dark:text-white shadow-md pointer-events-none">
                        ➔
                      </div>
                    )}
                  </div>
                </ScrollRevealBox>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. HAVE PROJECT IN MIND CTA BANNER */}
      <section className="relative overflow-hidden bg-white dark:bg-[#0E0F11] border-y border-[#DDDDDD] dark:border-[#222]">
        <div className="flex flex-wrap items-center">
          
          {/* Left Column: CTA Content */}
          <div className="w-full lg:w-7/12 py-20 px-8 sm:px-16 lg:pl-28">
            <div className="max-w-xl">
              <ScrollRevealBox delay={50} yOffset={20}>
                <div className="inline-block mb-6 py-2 px-7 rounded-[30px] border border-[#CCCCCC] dark:border-gray-600 bg-white/40 dark:bg-white/5">
                  <span className="text-[16px] sm:text-[18px] leading-[120%] uppercase font-barlow font-bold text-[#04000B] dark:text-white">
                    Have you project in mind?
                  </span>
                </div>
              </ScrollRevealBox>

              <ScrollRevealTitle
                lines={['For instant support', 'Please reach us']}
                className="text-3xl sm:text-5xl lg:text-[55px] leading-[115%] font-barlow font-semibold text-[#04000B] dark:text-white mb-10 tracking-tight"
                staggerDelayMs={120}
              />

              <ScrollRevealBox delay={250} yOffset={30}>
                <div className="pt-8 border-t border-[#DDDDDD] dark:border-gray-700 flex flex-wrap gap-10">
                  {/* Phone */}
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-full bg-[#C9F31D] flex items-center justify-center font-bold text-xl text-[#04000B]">
                      📞
                    </div>
                    <div>
                      <div className="text-[19px] font-barlow font-semibold text-[#04000B] dark:text-white">
                        Phone
                      </div>
                      <a
                        href="tel:+919484520805"
                        className="text-[16px] font-barlow text-[#04000B] dark:text-gray-300 hover:text-[#C9F31D] transition-colors"
                      >
                        +91 9484520805
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-full bg-[#C9F31D] flex items-center justify-center font-bold text-xl text-[#04000B]">
                      ✉
                    </div>
                    <div>
                      <div className="text-[19px] font-barlow font-semibold text-[#04000B] dark:text-white">
                        Official Email
                      </div>
                      <a
                        href="mailto:support@bytebly.in"
                        className="text-[16px] font-barlow text-[#04000B] dark:text-gray-300 hover:text-[#C9F31D] transition-colors"
                      >
                        support@bytebly.in
                      </a>
                    </div>
                  </div>

                  {/* Get in touch CTA */}
                  {onContact && (
                    <div className="flex items-center">
                      <button
                        onClick={onContact}
                        className="inline-flex items-center justify-center py-3.5 px-8 rounded-[8px] bg-[#C9F31D] text-[#04000B] font-barlow font-semibold text-[15px] hover:bg-[#ADD40C] transition-all transform active:scale-95 shadow-md shadow-[#C9F31D]/20 cursor-pointer"
                      >
                        Get in touch
                      </button>
                    </div>
                  )}
                </div>
              </ScrollRevealBox>
            </div>
          </div>

          {/* Right Column: CTA Visual Photo */}
          <div className="w-full lg:w-5/12 h-[350px] lg:h-[520px] relative overflow-hidden">
            <ScrollRevealBox delay={150} yOffset={40} className="w-full h-full">
              <img
                src={ASSETS.ctaBannerBg}
                alt="Project Support Team"
                className="w-full h-full object-cover object-center"
              />
            </ScrollRevealBox>
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </div>

        </div>
      </section>

    </div>
  )
}
