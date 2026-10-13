import React, { useState, useEffect } from 'react'
import { ASSETS } from '../../constants/assets'
import { ScrollRevealTitle, ScrollRevealBox, useInView } from '../common/ScrollRevealTitle'

interface ClientsSectionProps {
  onViewAll?: () => void
}

const AnimatedClientCount: React.FC = () => {
  const [ref, inView] = useInView()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    setCount(0)
    const target = 10
    const duration = 750 // fast 750ms
    let startTime: number | null = null
    let frameId: number

    const timer = setTimeout(() => {
      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(ease * target))

        if (progress < 1) {
          frameId = requestAnimationFrame(animate)
        }
      }
      frameId = requestAnimationFrame(animate)
    }, 120)

    return () => {
      clearTimeout(timer)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [inView])

  return (
    <span ref={ref} className="text-5xl sm:text-6xl font-barlow font-semibold tabular-nums">
      {count}
    </span>
  )
}

export const ClientsSection: React.FC<ClientsSectionProps> = ({ onViewAll }) => {
  return (
    <section className="py-24 lg:py-32 bg-[#0E0F11] text-white">
      <div className="w-full max-w-[1140px] px-4 mx-auto">
        <div className="flex flex-wrap items-center -mx-4">
          
          {/* Left Column: Clients Info & Avatars */}
          <div className="w-full lg:w-4/12 px-4 mb-12 lg:mb-0 lg:pr-10">
            {/* Pill badge with pop-up animation */}
            <ScrollRevealBox delay={50} yOffset={25}>
              <div className="inline-block mb-6 py-2 px-7 rounded-[30px] border border-white/30 bg-white/5">
                <span className="text-[16px] sm:text-[18px] leading-[120%] uppercase font-barlow font-semibold text-[#CCCCCC]">
                  Clients
                </span>
              </div>
            </ScrollRevealBox>

            {/* Title with Pop-up Animation */}
            <ScrollRevealTitle
              lines={['Partnering with', 'trusted brands']}
              className="text-3xl sm:text-4xl lg:text-[45px] leading-[115%] font-barlow font-bold text-white mb-6 tracking-tight"
            />

            {/* Description */}
            <ScrollRevealBox delay={120} yOffset={25}>
              <p className="text-[16px] sm:text-[17px] leading-[170%] font-barlow text-[#CCCCCC] mb-8">
                We collaborate with forward-thinking enterprises, manufacturers, and global exporters to engineer bespoke digital experiences, high-converting platforms, and scalable web solutions.
              </p>
            </ScrollRevealBox>

            {/* Overlapping Avatars */}
            <ScrollRevealBox delay={180} yOffset={25}>
              <div className="flex items-center pl-3">
                {ASSETS.clients.map((avatar, idx) => (
                  <div
                    key={idx}
                    className="w-14 h-14 -ml-3 rounded-full overflow-hidden border-2 border-[#0E0F11] shadow-md shrink-0 bg-white flex items-center justify-center p-1.5"
                  >
                    <img
                      src={avatar}
                      alt={`Client ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
                
                {/* Plus circular button */}
                <div className="w-14 h-14 -ml-3 rounded-full bg-[#0E0F11] border-2 border-white flex items-center justify-center font-bold text-white text-lg shrink-0">
                  +
                </div>
              </div>
            </ScrollRevealBox>
          </div>

          {/* Right Column: 2:3 Table (2 columns x 3 rows = 6 cells) */}
          <div className="w-full lg:w-7/12 lg:ml-[8.33333%] px-4">
            <ScrollRevealBox delay={150} yOffset={35}>
              <div className="grid grid-cols-2 border-l border-b border-white/10">
                
                {/* Slot 1: 10+ Active Clients with count-up animation */}
                <div className="min-h-[150px] p-6 flex flex-col justify-center items-center text-center border-t border-r border-white/10 bg-white/2">
                  <div className="flex items-center text-white">
                    <AnimatedClientCount />
                    <span className="text-4xl sm:text-5xl font-barlow font-semibold text-[#C9F31D]">
                      +
                    </span>
                  </div>
                  <span className="text-[18px] sm:text-[20px] font-barlow font-semibold text-[#CCCCCC] mt-1">
                    Active Clients
                  </span>
                </div>

              {/* Slots 2-5: 4 Brand Logos */}
              {ASSETS.brandLogos.map((logo, idx) => (
                <div
                  key={idx}
                  className="min-h-[150px] p-6 flex items-center justify-center border-t border-r border-white/10 hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <img
                    src={logo}
                    alt={`Brand Logo ${idx + 1}`}
                    className="max-h-12 max-w-[140px] w-auto h-auto object-contain brightness-0 invert opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}

              {/* Slot 6: View All button */}
              <div className="min-h-[150px] p-6 flex items-center justify-center border-t border-r border-white/10">
                <button
                  onClick={onViewAll}
                  className="text-[18px] sm:text-[20px] uppercase font-barlow font-semibold text-white border-b-2 border-white hover:text-[#C9F31D] hover:border-[#C9F31D] transition-all"
                >
                  View All
                </button>
              </div>

            </div>
          </ScrollRevealBox>
        </div>

        </div>
      </div>
    </section>
  )
}
