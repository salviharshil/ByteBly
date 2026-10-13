import React, { useState, useEffect } from 'react'
import { ASSETS } from '../../constants/assets'
import { ScrollRevealTitle, useInView } from '../common/ScrollRevealTitle'

interface HeroProps {
  onKnowMore?: () => void
  onContact?: () => void
  onProjects?: () => void
}

export const Hero: React.FC<HeroProps> = ({ onKnowMore, onContact, onProjects }) => {
  // Counting up animation for the 10+ completed projects
  const [cardRef, inView] = useInView({ threshold: 0.1 })
  const [projectCount, setProjectCount] = useState<number>(0)

  useEffect(() => {
    if (!inView) return
    setProjectCount(0)
    const target = 10
    const duration = 900 // Snappy & smooth counter progression (900ms)
    let startTime: number | null = null
    let frameId: number

    // Starts counting up smoothly right as the card lands into view (~350ms)
    const timer = setTimeout(() => {
      const animateCount = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Smooth cubic ease-out starting directly at 0
        const ease = 1 - Math.pow(1 - progress, 3)
        const currentVal = Math.round(ease * target)

        setProjectCount(currentVal)

        if (progress < 1) {
          frameId = requestAnimationFrame(animateCount)
        }
      }

      frameId = requestAnimationFrame(animateCount)
    }, 350)

    return () => {
      clearTimeout(timer)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [inView])

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 transition-colors duration-300">
      {/* Background Layers matching dixor light mode */}
      <div className="absolute inset-0 bg-[#E6F5BA] dark:bg-[#0E0F11] transition-colors duration-300" />

      {/* Subtle faceted geometric polygons overlay */}
      <svg
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-45 dark:opacity-5 mix-blend-multiply dark:mix-blend-overlay"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <polygon points="0,0 760,0 420,440" fill="#EDFACD" />
        <polygon points="760,0 1440,0 1080,460" fill="#DCF0A8" />
        <polygon points="1440,0 1440,900 1080,460" fill="#D3EAA0" />
        <polygon points="0,0 420,440 0,660" fill="#EEFACD" />
        <polygon points="420,440 1080,460 720,900" fill="#E2F4B3" />
        <polygon points="0,660 420,440 720,900" fill="#DEEFAD" />
        <polygon points="0,660 720,900 0,900" fill="#E8F7C0" />
        <polygon points="1080,460 1440,900 720,900" fill="#CEE698" />
      </svg>

      {/* Soft ambient radial lighting */}
      <div className="absolute -top-20 -right-20 w-[600px] h-[550px] bg-[#C9F31D]/25 blur-[130px] rounded-full pointer-events-none dark:opacity-10" />
      <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-[#ADD40C]/20 blur-[130px] rounded-full pointer-events-none dark:opacity-10" />

      <div className="w-full max-w-[1140px] px-4 relative z-10 mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
          
          {/* Left Column: Headline, Agency Info & Know More */}
          <div className="w-full lg:w-8/12 xl:w-7/12">
            
            {/* Giant Headline: We Build / Digital Experiences in strictly 2 lines & black color */}
            <div className="select-none mb-8 sm:mb-10">
              <ScrollRevealTitle
                lines={['We Build', 'Digital Experiences']}
                className="text-[32px] xs:text-[36px] sm:text-[46px] md:text-[56px] lg:text-[64px] xl:text-[74px] 2xl:text-[80px] leading-[104%] font-barlow font-bold text-[#04000B] dark:text-white tracking-tight"
                lineClassNames={['whitespace-nowrap', 'whitespace-nowrap']}
                charStaggerMs={28}
                lineStaggerMs={140}
                durationMs={850}
              />
            </div>

            {/* Sub-block: Agency info & Know More button with staggered entrance */}
            <div className="max-w-xl animate-fade-up-desc">
              {/* Agency Label with extending horizontal line */}
              <div className="flex items-center gap-4 sm:gap-6 mb-4">
                <span className="text-[15px] sm:text-[16px] font-barlow font-bold uppercase tracking-wider text-[#04000B] dark:text-white shrink-0">
                  Bytebly Agency
                </span>
                <div className="h-[1px] bg-[#04000B]/30 dark:bg-white/30 flex-1" />
              </div>

              {/* Description */}
              <p className="text-[14px] sm:text-[15px] leading-[170%] font-barlow text-[#444444] dark:text-gray-300 mb-8 max-w-lg">
                Providing innovative solutions in branding, marketing, design, and advertising. These agencies often collaborate with clients to develop unique campaigns, visual identities, and digital strategies that resonate with target audiences. Services may include graphic design, content creation, social media management.
              </p>

              {/* Know More Pill Button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={onKnowMore}
                  className="inline-flex items-center justify-center py-2.5 px-8 rounded-full border border-[#04000B] dark:border-white font-barlow font-bold text-xs uppercase tracking-widest text-[#04000B] dark:text-white hover:bg-[#04000B] hover:text-[#C9F31D] dark:hover:bg-white dark:hover:text-[#04000B] transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
                >
                  Know More
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Swirl & Floating 31K Card */}
          <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-end justify-start relative mt-4 lg:mt-0">
            {/* 3D iridescent swirl shape with opening spring popup animation & continuous gentle float */}
            <div className="relative z-10 -mb-16 sm:-mb-20 lg:-mb-24 mr-0 lg:mr-10 animate-blob-popup transition-transform duration-500 hover:scale-105 active:scale-95 cursor-pointer">
              <div className="animate-float-shape">
                <img
                  src={ASSETS.hero3DShape}
                  alt="Creative 3D Abstract Shape"
                  className="w-56 sm:w-72 lg:w-[320px] h-auto object-contain drop-shadow-2xl transition-transform duration-700 hover:rotate-6"
                />
              </div>
            </div>

            {/* 10+ Completed Projects floating card with opening pop entrance & increasing counter */}
            <div
              ref={cardRef}
              onClick={onProjects || onKnowMore}
              className="relative z-20 w-full max-w-[320px] sm:max-w-[340px] p-7 sm:p-8 rounded-[24px] bg-white dark:bg-[#16171B] shadow-[0_20px_50px_rgba(0,0,0,0.07)] border border-black/5 dark:border-white/10 backdrop-blur-sm self-center lg:self-end animate-pop-card hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-4xl sm:text-5xl font-barlow font-bold text-[#04000B] dark:text-white leading-none mb-2 tracking-tight flex items-baseline tabular-nums">
                    <span>{projectCount}</span>
                    <span>+</span>
                  </div>
                  <div className="text-xs sm:text-sm font-barlow font-medium text-[#666666] dark:text-gray-400">
                    Completed Projects
                  </div>
                </div>

                <div className="w-12 h-12 rounded-full bg-[#C9F31D] flex items-center justify-center text-[#04000B] text-xl font-bold shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45 cursor-pointer shrink-0 animate-badge-pop">
                  ↗
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
