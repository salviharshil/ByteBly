import React from 'react'
import { ScrollRevealTitle, ScrollRevealBox } from '../common/ScrollRevealTitle'

interface ServicesSectionProps {
  onServiceClick?: (serviceTitle: string) => void
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onServiceClick }) => {
  const services = [
    { number: '01', title: 'Website Development' },
    { number: '02', title: 'UI/UX Design' },
    { number: '03', title: 'App Development' },
    { number: '04', title: 'Software Development' },
    { number: '05', title: 'Meta Ads' },
    { number: '06', title: 'Digital Marketing' },
  ]

  return (
    <section className="py-24 lg:py-32 bg-[#F2F3EF] dark:bg-[#121316] relative overflow-hidden">
      {/* Giant outline watermark SERVICES matching 13Z-0 */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-20">
        <span
          className="text-7xl sm:text-9xl lg:text-[160px] font-barlow font-black uppercase tracking-widest text-transparent"
          style={{ WebkitTextStroke: '2px #7D7676' }}
        >
          Services
        </span>
      </div>

      <div className="w-full max-w-[1140px] px-4 mx-auto relative z-10">
        
        {/* Section Header with Pop-up text animation */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <div className="inline-block mb-5 py-2 px-7 rounded-[30px] border border-[#CCCCCC] dark:border-gray-600 bg-white/40 dark:bg-white/5">
            <span className="text-[16px] sm:text-[18px] leading-[120%] uppercase font-barlow font-bold text-[#04000B] dark:text-white">
              Services we offer
            </span>
          </div>

          <ScrollRevealTitle
            lines={['Turn Information Into', 'Actionable Insights']}
            className="text-3xl sm:text-5xl lg:text-[60px] leading-[115%] font-barlow font-semibold text-[#04000B] dark:text-white tracking-tight"
          />
        </div>

        {/* Numbered Services Grid with Staggered Pop-up Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {services.map((item, idx) => (
            <ScrollRevealBox key={idx} delay={idx * 80} yOffset={35}>
              <div
                onClick={() => onServiceClick?.(item.title)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onServiceClick?.(item.title)
                  }
                }}
                role="button"
                tabIndex={0}
                title={`Read ${item.title} blog & insights`}
                className="group cursor-pointer select-none focus:outline-none"
              >
                <div className="flex items-center space-x-5">
                  {/* Lime gradient number circle matching 13Z-0 */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#ADD40C] to-[#C9F31D] flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-110">
                    <span className="font-barlow font-extrabold text-2xl text-[#04000B]">
                      {item.number}
                    </span>
                  </div>

                  {/* Service title with bottom border line */}
                  <div className="border-b-2 border-[#04000B] dark:border-white pb-1 flex-1 group-hover:border-[#C9F31D] transition-colors flex items-center justify-between">
                    <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-barlow font-semibold text-[#04000B] dark:text-white transition-colors group-hover:text-[#C9F31D]">
                      {item.title}
                    </h3>
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#88A60A] dark:text-[#C9F31D] text-2xl font-bold ml-2">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </ScrollRevealBox>
          ))}
        </div>

      </div>
    </section>
  )
}
