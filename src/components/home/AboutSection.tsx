import React, { useState, useEffect } from 'react'
import { ASSETS } from '../../constants/assets'
import { ScrollRevealTitle, ScrollRevealBox, useInView } from '../common/ScrollRevealTitle'
import { Code2, Palette, TrendingUp, ArrowUpRight, Sparkles } from 'lucide-react'

interface AboutSectionProps {
  onNavigate?: (page: string) => void
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [badgeRef, isBadgeInView] = useInView({ threshold: 0.2 })
  const [projectCount, setProjectCount] = useState(0)
  const [successRate, setSuccessRate] = useState(0)

  // Smooth counter animation for 10+ Projects and 99.8% Client Success
  useEffect(() => {
    if (!isBadgeInView) return

    setProjectCount(0)
    setSuccessRate(0)

    const targetCount = 10
    const targetRate = 99.8
    const duration = 2200 // Slower & smooth counter progression (2200ms)
    let startTime: number | null = null
    let frameId: number

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Smooth cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3)

      setProjectCount(Math.round(ease * targetCount))
      setSuccessRate(Number((ease * targetRate).toFixed(1)))

      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      } else {
        setProjectCount(targetCount)
        setSuccessRate(targetRate)
      }
    }

    frameId = requestAnimationFrame(animate)

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [isBadgeInView])

  const pillars = [
    {
      id: 'web-dev',
      number: '01',
      tag: 'BUILD',
      title: 'Web & App Development',
      desc: 'High-speed frontend architectures, full-stack web apps, and custom scalable platforms tailored for modern businesses.',
      icon: Code2,
      targetPage: 'services',
    },
    {
      id: 'ui-ux',
      number: '02',
      tag: 'DESIGN',
      title: 'UI/UX & Brand Design',
      desc: 'User-centric interfaces, high-converting design systems, and distinctive digital identities that command attention.',
      icon: Palette,
      targetPage: 'services',
    },
    {
      id: 'growth',
      number: '03',
      tag: 'SCALE',
      title: 'Growth & Meta Ads',
      desc: 'Data-driven marketing campaigns, precision Meta ad funnels, and performance strategies engineered for high ROI.',
      icon: TrendingUp,
      targetPage: 'services',
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#0E0F11] relative overflow-hidden transition-colors duration-300">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#C9F31D]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#C9F31D]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[1140px] px-4 mx-auto relative z-10">
        <div className="flex flex-wrap items-center -mx-4">
          
          {/* Left: About Photo / Sphere Showcase with Automatic Animations */}
          <div className="w-full lg:w-5/12 px-4 mb-14 lg:mb-0 relative z-0">
            <div className="relative group max-w-md mx-auto lg:max-w-none">
              
              {/* OUTSIDE ANIMATION 1: Ambient Pulsing Aura Glow */}
              <div className="absolute inset-0 -m-8 rounded-[48px] bg-gradient-to-tr from-[#C9F31D]/25 via-transparent to-[#ADD40C]/20 blur-3xl animate-aura-pulse pointer-events-none" />
              
              {/* OUTSIDE ANIMATION 2: Orbiting Cosmic Energy Ring */}
              <div className="absolute top-1/2 left-1/2 w-[114%] h-[114%] rounded-[42px] border border-dashed border-[#C9F31D]/40 pointer-events-none animate-cosmic-ring" />

              {/* OUTSIDE ANIMATION 3: Gentle levitation float container */}
              <div className="animate-sphere-card-float">
                {/* Image Frame */}
                <div className="relative rounded-[32px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-black/10 dark:border-white/15 bg-[#0E0F11]">
                  
                  {/* INSIDE ANIMATION 1: Organic Breathing & Subtle Rotation of the 3D Sphere */}
                  <img
                    src={ASSETS.aboutPhoto}
                    alt="Bytebly Creative and Digital Agency"
                    className="w-full h-auto object-cover aspect-[405/413] animate-sphere-breathing"
                  />

                  {/* INSIDE ANIMATION 2: Specular Light Beam Shimmer Sweeping across the sphere surface */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent w-3/4 h-full animate-sphere-shimmer pointer-events-none" />

                  {/* Subtle vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Inner subtle neon glow at bottom corner */}
                  <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-[#C9F31D]/35 rounded-full blur-2xl pointer-events-none animate-pulse" />
                </div>
              </div>

              {/* Floating Trust Badge with Counter Animation */}
              <div
                ref={badgeRef}
                className="absolute -bottom-6 -left-4 sm:-bottom-7 sm:-left-6 bg-white/95 dark:bg-[#16171B]/95 backdrop-blur-md p-4 sm:p-5 rounded-[22px] shadow-[0_20px_50px_rgba(0,0,0,0.14)] border border-black/5 dark:border-white/10 z-20 flex items-center gap-3.5 sm:gap-4 transition-transform duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#C9F31D] flex items-center justify-center text-[#04000B] font-bold shadow-md shrink-0">
                  <Sparkles className="w-6 h-6 text-[#04000B]" />
                </div>
                <div>
                  <div className="text-[17px] sm:text-[19px] font-barlow font-bold text-[#04000B] dark:text-white leading-tight flex items-baseline">
                    <span className="tabular-nums">{projectCount}</span>
                    <span>+ Projects</span>
                  </div>
                  <div className="text-xs sm:text-[13px] font-barlow font-medium text-[#666666] dark:text-gray-400">
                    Delivered with <span className="tabular-nums font-semibold">{successRate.toFixed(1)}%</span> Client Success
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Agency Details & 3 Overlapping Interactive Cards */}
          <div className="w-full lg:w-7/12 px-4 lg:pl-12">
            <div>
              {/* Agency Tag & Icon Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5">
                  <span className="w-2 h-2 rounded-full bg-[#C9F31D] animate-pulse" />
                  <span className="text-[12px] sm:text-[13px] uppercase font-barlow font-bold tracking-widest text-[#04000B] dark:text-white">
                    Bytebly Agency • Build • Scale • Grow
                  </span>
                </div>
              </div>

              {/* Badge Icon & Heading with Letter Pop-up Animation */}
              <div className="flex items-start gap-4 sm:gap-6 mb-5">
                <img
                  src={ASSETS.agencyBadgeIcon}
                  alt="Bytebly Badge"
                  className="w-14 sm:w-16 lg:w-20 h-auto object-contain shrink-0 filter dark:invert mt-1"
                />
                <ScrollRevealTitle
                  lines={['BEST CREATIVE &', 'DIGITAL AGENCY']}
                  className="text-3xl sm:text-5xl lg:text-[52px] leading-[106%] uppercase font-barlow font-bold text-[#04000B] dark:text-white tracking-tight"
                />
              </div>

              {/* Description with authentic Bytebly copywriting */}
              <ScrollRevealBox delay={100} yOffset={25}>
                <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[175%] font-barlow text-[#555555] dark:text-gray-300 mb-9 max-w-xl">
                  Bytebly is an end-to-end creative technology and digital acceleration agency. We engineer high-performance web applications, craft conversion-driven UI/UX design systems, and deploy aggressive performance marketing funnels that turn ambitious businesses into market leaders.
                </p>
              </ScrollRevealBox>

              {/* 3 Horizontal Interactive Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:-ml-20 xl:-ml-28 relative z-10">
                {pillars.map((pillar, idx) => {
                  const isHovered = hoveredCard === idx
                  const Icon = pillar.icon

                  return (
                    <ScrollRevealBox key={pillar.id} delay={180 + idx * 90} yOffset={35}>
                      <div
                        onMouseEnter={() => setHoveredCard(idx)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => {
                          if (onNavigate) onNavigate(pillar.targetPage)
                        }}
                        className={`group p-6 sm:p-7 rounded-[22px] cursor-pointer min-h-[190px] sm:min-h-[210px] flex flex-col justify-between transition-all duration-300 ease-out border ${
                          isHovered
                            ? 'bg-[#C9F31D] text-[#04000B] border-[#C9F31D] shadow-[0_20px_45px_rgba(201,243,29,0.38)] -translate-y-2 scale-[1.02]'
                            : 'bg-white dark:bg-[#16171B] border-black/8 dark:border-white/10 text-[#04000B] dark:text-white shadow-sm hover:bg-[#C9F31D] hover:text-[#04000B] hover:border-[#C9F31D] hover:shadow-[0_20px_45px_rgba(201,243,29,0.38)] hover:-translate-y-2'
                        }`}
                      >
                        {/* Top row: Icon / Badge & Action */}
                        <div className="flex items-center justify-between">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-barlow font-bold text-sm transition-all duration-300 ${
                              isHovered
                                ? 'bg-[#04000B] text-[#C9F31D] scale-110 shadow-md'
                                : 'bg-[#F2F3EF] dark:bg-[#222226] text-[#04000B] dark:text-white group-hover:bg-[#04000B] group-hover:text-[#C9F31D] group-hover:scale-110'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>

                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isHovered
                                ? 'bg-[#04000B]/15 text-[#04000B] rotate-45 scale-110'
                                : 'text-gray-400 opacity-60 group-hover:bg-[#04000B]/15 group-hover:text-[#04000B] group-hover:rotate-45 group-hover:opacity-100 group-hover:scale-110'
                            }`}
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Bottom row: Tag, Title & Description */}
                        <div className="mt-4">
                          <div
                            className={`text-[11px] font-barlow font-bold uppercase tracking-wider mb-1 transition-colors duration-300 ${
                              isHovered
                                ? 'text-[#04000B]/75'
                                : 'text-[#666666] dark:text-gray-400 group-hover:text-[#04000B]/75'
                            }`}
                          >
                            {pillar.number} • {pillar.tag}
                          </div>
                          <div
                            className={`text-[16px] sm:text-[17px] leading-[125%] font-barlow font-bold transition-colors duration-300 ${
                              isHovered
                                ? 'text-[#04000B]'
                                : 'text-[#04000B] dark:text-white group-hover:text-[#04000B]'
                            }`}
                          >
                            {pillar.title}
                          </div>
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
