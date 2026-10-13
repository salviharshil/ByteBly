import React, { useState } from 'react'
import { ASSETS } from '../../constants/assets'
import { ScrollRevealTitle, ScrollRevealBox } from '../common/ScrollRevealTitle'
import { ArrowUpRight, TrendingUp } from 'lucide-react'

interface PartnerSectionProps {
  onNavigate?: (page: string, projectTitle?: string) => void
}

export const PartnerSection: React.FC<PartnerSectionProps> = ({ onNavigate }) => {
  const [hoveredPartner, setHoveredPartner] = useState<number | null>(null)

  const partners = [
    {
      category: 'GLOBAL EXPORT & TRADE',
      name: 'Sanderi Exporters',
      logo: ASSETS.sanderiLogo,
      tag: 'Sanderi Exporters',
      desc: 'Agricultural Export & Global Trade Platform',
      url: 'https://sanderiexporters.com/',
      projectKey: 'Sanderi Exporters',
    },
    {
      category: 'INDUSTRIAL PACKAGING',
      name: 'Gajanand Packaging Solutions',
      logo: ASSETS.gajanandLogo,
      tag: 'Gajanand Solutions',
      desc: 'B2B Industrial Machinery Catalog & Lead Automation',
      url: 'https://www.gajanandpakagingsolution.com/',
      projectKey: 'Gajanand Packaging Solutions',
    },
    {
      category: 'ISO & AUDIT COMPLIANCE',
      name: 'System Management Services',
      logo: ASSETS.smsLogo,
      tag: 'System Management Services',
      desc: 'Enterprise ISO Certification & Consulting Platform',
      url: 'https://www.isosmservices.in/',
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#0E0F11] relative overflow-hidden transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-[#C9F31D]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1140px] px-4 mx-auto relative z-10">
        <div className="flex flex-wrap items-center -mx-4">

          {/* Left Column: Partner Team Photo */}
          <div className="w-full lg:w-5/12 px-4 mb-14 lg:mb-0 relative z-0">
            <ScrollRevealBox yOffset={50}>
              <div className="relative group max-w-md mx-auto lg:max-w-none">
                {/* Photo Frame */}
                <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-black/8 dark:border-white/10 aspect-[405/490] bg-[#EFF2E4] dark:bg-[#16171B]">
                  <img
                    src={ASSETS.partnerPhoto}
                    alt="Bytebly Collaborative Partners Team"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Trust Badge */}
                <div className="absolute -bottom-6 -left-4 sm:-bottom-7 sm:-left-6 bg-white/95 dark:bg-[#16171B]/95 backdrop-blur-md p-4 sm:p-5 rounded-[22px] shadow-[0_20px_50px_rgba(0,0,0,0.14)] border border-black/5 dark:border-white/10 z-20 flex items-center gap-3.5 sm:gap-4 transition-transform duration-300 hover:scale-105">
                  <div className="w-12 h-12 rounded-2xl bg-[#C9F31D] flex items-center justify-center text-[#04000B] font-bold shadow-md shrink-0">
                    <TrendingUp className="w-6 h-6 text-[#04000B] stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-[17px] sm:text-[19px] font-barlow font-bold text-[#04000B] dark:text-white leading-tight">
                      Enterprise Ecosystem
                    </div>
                    <div className="text-xs sm:text-[13px] font-barlow font-medium text-[#666666] dark:text-gray-400">
                      Collaborative Growth Solutions
                    </div>
                  </div>
                </div>
              </div>
            </ScrollRevealBox>
          </div>

          {/* Right Column: Partners Info & 3 Overlapping Cards */}
          <div className="w-full lg:w-7/12 px-4 lg:pl-12">
            <div>
              {/* Badge */}
              <ScrollRevealBox delay={50} yOffset={20}>
                <div className="inline-flex items-center gap-2 mb-4 py-1.5 px-4 rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5">
                  <span className="w-2 h-2 rounded-full bg-[#C9F31D] animate-pulse" />
                  <span className="text-[12px] sm:text-[13px] uppercase font-barlow font-bold tracking-widest text-[#04000B] dark:text-white">
                    OUR CLIENTS • BYTEBLY ECOSYSTEM
                  </span>
                </div>
              </ScrollRevealBox>

              {/* Title with letter pop-up animation */}
              <ScrollRevealTitle
                lines={['Our Trusted Clients.']}
                className="text-3xl sm:text-5xl lg:text-[54px] leading-[108%] font-barlow font-bold text-[#04000B] dark:text-white mb-6 tracking-tight"
              />

              {/* Authentic Bytebly Description */}
              <ScrollRevealBox delay={100} yOffset={30}>
                <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[175%] font-barlow text-[#555555] dark:text-gray-300 mb-10 max-w-xl">
                  At Bytebly, we partner with visionary enterprises, global exporters, and manufacturing leaders to engineer scalable, high-velocity digital solutions. Our client ecosystem guarantees performance, enterprise-grade security, and seamless long-term scalability.
                </p>
              </ScrollRevealBox>

              {/* 3 Horizontal Overlapping Partner Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:-ml-20 xl:-ml-28 relative z-10">
                {partners.map((item, idx) => {
                  const isHovered = hoveredPartner === idx

                  return (
                    <ScrollRevealBox key={idx} delay={180 + idx * 100} yOffset={40}>
                      <div
                        onClick={() => {
                          if (item.projectKey && onNavigate) {
                            onNavigate('projects', item.projectKey)
                          } else {
                            window.open(item.url, '_blank', 'noopener,noreferrer')
                          }
                        }}
                        onMouseEnter={() => setHoveredPartner(idx)}
                        onMouseLeave={() => setHoveredPartner(null)}
                        className={`p-6 sm:p-7 rounded-[22px] cursor-pointer min-h-[220px] sm:min-h-[235px] flex flex-col justify-between transition-all duration-300 ease-out border ${
                          isHovered
                            ? 'bg-[#C9F31D] text-[#04000B] border-[#C9F31D] shadow-[0_20px_45px_rgba(201,243,29,0.38)] -translate-y-2 scale-[1.02]'
                            : 'bg-[#EFF2E4] dark:bg-[#16171B] border-black/5 dark:border-white/10 text-[#04000B] dark:text-white shadow-sm hover:bg-[#C9F31D] hover:text-[#04000B] hover:border-[#C9F31D] hover:shadow-[0_20px_45px_rgba(201,243,29,0.38)] hover:-translate-y-2'
                        } group`}
                      >
                        {/* Top Row: Category & Arrow */}
                        <div className="w-full flex items-center justify-between">
                          <span
                            className={`text-[11px] sm:text-[12px] font-barlow font-bold uppercase tracking-wider transition-colors duration-300 ${
                              isHovered
                                ? 'text-[#04000B]'
                                : 'text-[#04000B] dark:text-white group-hover:text-[#04000B]'
                            }`}
                          >
                            {item.category}
                          </span>
                          <div
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(item.url, '_blank', 'noopener,noreferrer')
                            }}
                            title="Visit Website"
                            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isHovered
                                ? 'bg-[#04000B]/10 text-[#04000B] rotate-45 scale-110'
                                : 'text-gray-400 group-hover:bg-[#04000B]/10 group-hover:text-[#04000B] group-hover:rotate-45 group-hover:scale-110'
                            }`}
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Middle: Brand Logo */}
                        <div className="h-12 my-3 flex items-center">
                          <div
                            className={`h-11 px-3.5 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              isHovered
                                ? 'bg-white shadow-sm'
                                : 'bg-white/85 dark:bg-white/95 group-hover:bg-white group-hover:shadow-sm'
                            }`}
                          >
                            <img
                              src={item.logo}
                              alt={item.name}
                              className="max-h-8 sm:max-h-9 max-w-[125px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        </div>

                        {/* Bottom: Pill Badge */}
                        <div className="pt-1">
                          <span
                            className={`inline-block py-1.5 px-4 rounded-full font-barlow font-bold text-xs sm:text-[13px] shadow-sm transition-all duration-300 ${
                              isHovered
                                ? 'bg-[#04000B] text-[#C9F31D] shadow-md scale-105'
                                : 'bg-[#C9F31D] text-[#04000B] group-hover:bg-[#04000B] group-hover:text-[#C9F31D] group-hover:scale-105'
                            }`}
                          >
                            {item.tag}
                          </span>
                        </div>
                      </div>
                    </ScrollRevealBox>
                  )
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
