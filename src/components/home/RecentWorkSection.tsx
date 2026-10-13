import React, { useState, useEffect } from 'react'
import { ScrollRevealBox } from '../common/ScrollRevealTitle'
import sanderiHeroImage from '../../assets/sanderi-hero.png'
import gajanandHeroImage from '../../assets/gajanand-hero.png'

interface RecentWorkSectionProps {
  onSeeDetails?: (projectTitle: string) => void
}

export const RecentWorkSection: React.FC<RecentWorkSectionProps> = ({ onSeeDetails }) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const slides = [
    {
      title: 'Sanderi Exporters',
      lines: ['Sanderi', 'Exporters'],
      image: sanderiHeroImage,
      category: 'Web Platform & Export Desk',
    },
    {
      title: 'Gajanand Packaging Solutions',
      lines: ['Gajanand', 'Packaging'],
      image: gajanandHeroImage,
      category: 'Industrial Machinery & Packaging',
    },
  ]

  // Automatic slider interval with pause on hover
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 3800)

    return () => clearInterval(timer)
  }, [isPaused, slides.length])

  const current = slides[activeSlide]

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-white dark:bg-[#0E0F11] transition-colors duration-300">
      {/* Blurred lime accent glow in bottom-left */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#C9F31D]/20 dark:bg-[#C9F31D]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1240px] px-4 sm:px-6 lg:px-8 relative z-10 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          
          {/* Left Column: Recent Work Info */}
          <div className="lg:col-span-5 xl:col-span-5 lg:pr-8 xl:pr-12">
            {/* Pill badge matching reference */}
            <ScrollRevealBox delay={50} yOffset={20}>
              <div className="inline-block mb-6 sm:mb-8 py-2 px-6 rounded-full border border-black/15 dark:border-white/20 bg-transparent">
                <span className="text-[13px] sm:text-[14px] leading-none uppercase font-barlow font-bold tracking-wider text-[#04000B] dark:text-white">
                  RECENT WORK
                </span>
              </div>
            </ScrollRevealBox>

            {/* Description */}
            <ScrollRevealBox delay={100} yOffset={20}>
              <p className="text-[14px] sm:text-[15px] leading-[175%] font-barlow text-[#666666] dark:text-gray-400 mb-8 max-w-sm">
                Explore our latest creative triumphs, strategic brand transformations, and high-impact digital experiences engineered for ambitious global brands.
              </p>
            </ScrollRevealBox>

            {/* Divider Line */}
            <div className="border-t border-black/10 dark:border-white/10 my-7 sm:my-8 max-w-sm" />

            {/* Quote block */}
            <ScrollRevealBox delay={150} yOffset={20}>
              <h3 className="text-[22px] sm:text-[25px] lg:text-[27px] leading-[130%] font-barlow font-medium text-[#04000B] dark:text-white max-w-xs">
                Experience the perfect blend of creativity and functionality
              </h3>
            </ScrollRevealBox>
          </div>

          {/* Right Area: Showcase with Overlapping Title, Image, and Circle Button */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="lg:col-span-7 xl:col-span-7 relative pl-0 lg:pl-2 xl:pl-4"
          >
            <div
              onClick={() => onSeeDetails?.(current.title)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSeeDetails?.(current.title)
                }
              }}
              className="relative flex items-center justify-end min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] cursor-pointer group select-none"
            >
              
              {/* Project Image Box on the Right */}
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  onSeeDetails?.(current.title)
                }}
                className="w-full sm:w-[420px] lg:w-[460px] xl:w-[500px] aspect-[4/4.2] overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl relative z-0 cursor-pointer bg-[#F4F5F1] dark:bg-[#16171B] border border-black/5 dark:border-white/10"
              >
                <img
                  key={current.image}
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
              </div>

              {/* Overlapping Text & Wire Circle Button */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 max-w-[85%] sm:max-w-[75%] lg:max-w-[80%]">
                
                {/* Big Title matching reference image */}
                <h2
                  key={current.title + activeSlide}
                  onClick={(e) => {
                    e.stopPropagation()
                    onSeeDetails?.(current.title)
                  }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[88px] leading-[96%] font-barlow font-bold text-[#04000B] dark:text-white tracking-tight drop-shadow-sm select-none cursor-pointer transition-transform duration-300 group-hover:translate-x-1"
                >
                  {current.lines.map((line, idx) => (
                    <span key={idx} className="block">
                      {line}
                    </span>
                  ))}
                </h2>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
