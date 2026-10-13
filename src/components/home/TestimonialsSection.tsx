import React, { useState, useEffect } from 'react'
import { ASSETS } from '../../constants/assets'
import { useInView } from '../common/ScrollRevealTitle'

export const TestimonialsSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [badgeRef, isBadgeInView] = useInView({ threshold: 0.2 })
  const [ratingVal, setRatingVal] = useState<number>(0)
  const [reviewCount, setReviewCount] = useState<number>(0)

  // Smooth counter animation for 4.9 and 145 reviews
  useEffect(() => {
    if (!isBadgeInView) return

    setRatingVal(0)
    setReviewCount(0)

    const targetRating = 4.9
    const targetReviews = 10
    const duration = 2200 // Slower & smooth counter progression (2200ms)
    let startTime: number | null = null
    let frameId: number

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Smooth cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3)

      setRatingVal(Number((ease * targetRating).toFixed(1)))
      setReviewCount(Math.round(ease * targetReviews))

      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      } else {
        setRatingVal(targetRating)
        setReviewCount(targetReviews)
      }
    }

    frameId = requestAnimationFrame(animate)

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [isBadgeInView])

  const testimonials = [
    {
      score: '5.0',
      text: 'ByteBly gave our export business a website that genuinely looks world-class. International buyers started reaching out within days of going live — the results spoke for themselves.',
      name: 'Jash Patel',
      role: 'Sanderi Expoters',
      avatar: ASSETS.sanderiLogo,
      isLogo: true,
    },
    {
      score: '4.9',
      text: 'ByteBly gave Gajanand Packaging Solutions a professional website that strengthened our online presence, built customer trust, and represented our brand perfectly.',
      name: 'Hitesh Bhai',
      role: 'Gajanand Packaging Solutions',
      avatar: ASSETS.gajanandLogo,
      isLogo: true,
    },
    {
      score: '4.8',
      text: 'ByteBly created a clean, professional website for System Management Services that strengthened our online presence and built greater trust with clients.',
      name: 'Avinash Patel',
      role: 'System Management Services',
      avatar: ASSETS.smsLogo,
      isLogo: true,
    },
  ]

  // Duplicate for seamless infinite auto-scroll loop
  const allCards = [...testimonials, ...testimonials, ...testimonials, ...testimonials]

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-[#F2F3EF] dark:bg-[#121316]">
      <div className="w-full max-w-[1140px] px-4 mx-auto relative z-10 mb-14">
        {/* Top Header Block: Huge TESTIMONIALS title + 4.9 Rating badge */}
        <div className="relative flex flex-wrap items-center justify-between min-h-[140px]">
          {/* Giant Watermark / Gradient Heading with Decorative Ribbon near 'T' */}
          <div className="w-full lg:w-7/12 mb-6 lg:mb-0 relative">
            {/* Decorative 3D ribbon flourish positioned to the left side without text overlap */}
            <div className="hidden sm:block absolute -left-20 md:-left-28 top-1 md:top-3 w-16 sm:w-20 md:w-24 pointer-events-none opacity-90 z-20 animate-float-shape">
              <img
                src={ASSETS.testimonialsDecor}
                alt="Decor"
                className="w-full h-auto object-contain"
              />
            </div>

            <h2 className="text-5xl sm:text-7xl lg:text-[110px] xl:text-[130px] leading-[90%] uppercase font-barlow font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#04000B] to-[#C9F31D] dark:from-white dark:to-[#C9F31D] tracking-tight">
              Testimonials
            </h2>
          </div>

          {/* Small Rating Badge in Right Corner with Counter Animation */}
          <div ref={badgeRef} className="w-full lg:w-5/12 flex justify-start lg:justify-end mt-4 lg:mt-0">
            <div className="inline-flex items-center">
              {/* Circle 4.9 */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#DDDDDD] dark:border-gray-700 bg-white dark:bg-[#1A1A1A] flex items-center justify-center mr-3 sm:mr-4 shadow-sm">
                <span className="text-2xl sm:text-3xl font-barlow font-bold text-[#04000B] dark:text-white tabular-nums">
                  {ratingVal.toFixed(1)}
                </span>
              </div>

              <div>
                <div className="text-amber-400 text-sm sm:text-base tracking-widest leading-tight">
                  ★★★★★
                </div>
                <div className="text-[14px] sm:text-[15px] font-barlow font-semibold text-[#04000B] dark:text-white leading-tight mt-1">
                  <span className="tabular-nums">{reviewCount}</span> (Review)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Smooth Continuous Auto-Moving Slider */}
      <div className="w-full overflow-hidden py-4 relative">
        <div className="animate-marquee-infinite flex gap-6 hover:[animation-play-state:paused]">
          {allCards.map((item, idx) => {
            const isHighlighted = hoveredIndex === idx

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`w-[320px] sm:w-[380px] lg:w-[410px] shrink-0 p-8 sm:p-10 rounded-[30px] relative overflow-hidden transition-all duration-300 ease-out cursor-pointer transform ${
                  isHighlighted
                    ? 'bg-[#C9F31D] text-[#04000B] border border-[#C9F31D] shadow-[0_20px_50px_-10px_rgba(201,243,29,0.45)] -translate-y-2.5 scale-[1.01]'
                    : 'bg-white dark:bg-[#1A1A1A] border border-[#E7E7E7] dark:border-[#2a2a2a] shadow-sm hover:bg-[#C9F31D] hover:text-[#04000B] hover:border-[#C9F31D] hover:shadow-[0_20px_50px_-10px_rgba(201,243,29,0.45)] hover:-translate-y-2.5'
                } group`}
              >
                <div className="relative z-10">
                  {/* Score & Stars */}
                  <div className="flex items-center space-x-3 mb-6">
                    <span
                      className={`text-[20px] font-barlow font-bold transition-colors ${
                        isHighlighted
                          ? 'text-[#04000B]'
                          : 'text-[#04000B] dark:text-white group-hover:text-[#04000B]'
                      }`}
                    >
                      {item.score}
                    </span>
                    <span
                      className={`text-lg tracking-wider transition-colors ${
                        isHighlighted
                          ? 'text-[#04000B]'
                          : 'text-[#ADD40C] group-hover:text-[#04000B]'
                      }`}
                    >
                      ★★★★★
                    </span>
                  </div>

                  {/* Testimonial Quote */}
                  <p
                    className={`text-[17px] sm:text-[19px] leading-[160%] font-barlow font-medium mb-8 min-h-[135px] transition-colors ${
                      isHighlighted
                        ? 'text-[#04000B]'
                        : 'text-[#04000B] dark:text-gray-200 group-hover:text-[#04000B]'
                    }`}
                  >
                    {item.text}
                  </p>

                  {/* Author Info */}
                  <div
                    className={`flex items-center pt-4 border-t transition-colors ${
                      isHighlighted
                        ? 'border-[#04000B]/15'
                        : 'border-[#F2F3EF] dark:border-[#222] group-hover:border-[#04000B]/15'
                    }`}
                  >
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className={`w-14 h-14 rounded-full mr-4 shadow-sm transition-all duration-300 ${
                        item.isLogo
                          ? 'object-contain p-1.5 bg-white border border-gray-200 dark:border-white/10'
                          : 'object-cover'
                      } ${
                        isHighlighted
                          ? 'ring-2 ring-[#04000B] scale-105'
                          : 'group-hover:ring-2 group-hover:ring-[#04000B] group-hover:scale-105'
                      }`}
                    />
                    <div>
                      <h4
                        className={`text-[19px] leading-[120%] font-barlow font-bold transition-colors ${
                          isHighlighted
                            ? 'text-[#04000B]'
                            : 'text-[#04000B] dark:text-white group-hover:text-[#04000B]'
                        }`}
                      >
                        {item.name}
                      </h4>
                      <span
                        className={`text-[15px] font-barlow transition-colors ${
                          isHighlighted
                            ? 'text-[#04000B]/80 font-medium'
                            : 'text-[#666666] dark:text-gray-400 group-hover:text-[#04000B]/80'
                        }`}
                      >
                        {item.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
