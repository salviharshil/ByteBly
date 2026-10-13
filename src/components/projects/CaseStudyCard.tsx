import React from 'react'
import { ScrollRevealTitle, ScrollRevealBox } from '../common/ScrollRevealTitle'
import { ArrowRight } from 'lucide-react'
import sanderiHeroImage from '../../assets/sanderi-hero.png'
import gajanandHeroImage from '../../assets/gajanand-hero.png'

interface CaseStudyCardProps {
  onProjectClick?: (title: string) => void
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ onProjectClick }) => {
  const projects = [
    {
      date: 'October 2024',
      title: 'Sanderi Exporters',
      lines: ['Sanderi', 'Exporters'],
      image: sanderiHeroImage,
      website: 'https://sanderiexporters.com/',
    },
    {
      date: 'January 15, 2024',
      title: 'Gajanand Packaging Solutions',
      lines: ['Gajanand', 'Packaging', 'Solutions'],
      image: gajanandHeroImage,
      website: 'https://www.gajanandpakagingsolution.com/',
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#0E0F11]">
      <div className="w-full max-w-[1140px] px-4 mx-auto space-y-12">
        {projects.map((project, idx) => (
          <ScrollRevealBox key={idx} delay={idx * 120} yOffset={45}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => onProjectClick?.(project.title)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onProjectClick?.(project.title)
                }
              }}
              className="group p-6 sm:p-12 lg:p-14 rounded-[30px] bg-white dark:bg-[#1A1A1A] shadow-[0px_15px_60px_-10px_rgba(109,117,143,0.33)] border-2 border-white dark:border-white/5 hover:border-black/10 dark:hover:border-white/20 transition-all duration-300 hover:shadow-2xl overflow-hidden cursor-pointer"
            >
              <div className="flex flex-wrap items-center -mx-4">
                
                {/* Left Column: Project Cover Image */}
                <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
                  <div
                    className="rounded-[16px] overflow-hidden aspect-[4/3] shadow-md group/img"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Right Column: Date, Headline & See Details */}
                <div className="w-full lg:w-1/2 px-4 lg:pl-8 xl:pl-12">
                  <div className="max-w-full">
                    {/* Date with black underline */}
                    <ScrollRevealBox delay={80} yOffset={15}>
                      <div className="inline-block mb-4 pb-2 border-b-2 border-[#04000B] dark:border-white">
                        <span className="text-[17px] sm:text-[19px] uppercase font-barlow font-semibold text-[#04000B] dark:text-white">
                          {project.date}
                        </span>
                      </div>
                    </ScrollRevealBox>

                    {/* Headline with Letter-by-Letter Pop-up Animation */}
                    <ScrollRevealTitle
                      lines={project.lines}
                      as="h3"
                      className="text-3xl sm:text-5xl lg:text-4xl xl:text-5xl 2xl:text-[64px] leading-[104%] font-barlow font-semibold text-[#04000B] dark:text-white mb-8 tracking-tight"
                      durationMs={850}
                    />

                    {/* See Details & Live Website Buttons */}
                    <ScrollRevealBox delay={160} yOffset={20}>
                      <div className="flex flex-wrap items-center gap-6">
                        <div
                          className="inline-flex items-center gap-4 group cursor-pointer"
                        >
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0E0F11] dark:bg-white text-white dark:text-[#0E0F11] flex items-center justify-center font-bold text-base shadow-md transition-all duration-300 group-hover:scale-105 group-hover:bg-[#C9F31D] group-hover:text-[#04000B] dark:group-hover:bg-[#C9F31D] shrink-0">
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 stroke-[2.5]" />
                          </div>
                          <span className="text-[16px] sm:text-[17px] uppercase font-barlow font-extrabold tracking-wider text-[#04000B] dark:text-white group-hover:text-[#88A60A] dark:group-hover:text-[#C9F31D] transition-colors">
                            SEE DETAILS
                          </span>
                        </div>

                        {project.website && (
                          <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-[#04000B] dark:text-white hover:border-[#04000B] dark:hover:border-[#C9F31D] hover:text-[#04000B] dark:hover:text-[#C9F31D] text-sm font-barlow font-bold transition-all shadow-sm group hover:scale-105 active:scale-95"
                          >
                            <span>Live Website</span>
                            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                          </a>
                        )}
                      </div>
                    </ScrollRevealBox>
                  </div>
                </div>

              </div>
            </div>
          </ScrollRevealBox>
        ))}
      </div>
    </section>
  )
}
