import React, { useState, useEffect } from 'react'
import { TrendingUp } from 'lucide-react'
import { useInView } from './ScrollRevealTitle'

interface RevenueGrowthGraphProps {
  className?: string
}

export const RevenueGrowthGraph: React.FC<RevenueGrowthGraphProps> = ({ className = '' }) => {
  const [graphRef, isGraphInView] = useInView({ threshold: 0.2 })
  const [arrVal, setArrVal] = useState<number>(0.15)
  const [growthVal, setGrowthVal] = useState<number>(0)
  const [runRateVal, setRunRateVal] = useState<number>(15)
  const [retentionVal, setRetentionVal] = useState<number>(85.0)
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null)

  // Animated counters when graph enters viewport (visualizing growth from low to high)
  useEffect(() => {
    if (!isGraphInView) return

    setArrVal(0.15)
    setGrowthVal(0)
    setRunRateVal(15)
    setRetentionVal(85.0)

    const targetArr = 2.84
    const targetGrowth = 138.4
    const targetRunRate = 245
    const targetRetention = 99.4
    const duration = 2400
    let startTime: number | null = null
    let frameId: number

    const animateCounters = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Smooth cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3)

      setArrVal(Number((0.15 + ease * (targetArr - 0.15)).toFixed(2)))
      setGrowthVal(Number((ease * targetGrowth).toFixed(1)))
      setRunRateVal(Math.round(15 + ease * (targetRunRate - 15)))
      setRetentionVal(Number((85.0 + ease * (targetRetention - 85.0)).toFixed(1)))

      if (progress < 1) {
        frameId = requestAnimationFrame(animateCounters)
      } else {
        setArrVal(targetArr)
        setGrowthVal(targetGrowth)
        setRunRateVal(targetRunRate)
        setRetentionVal(targetRetention)
      }
    }

    frameId = requestAnimationFrame(animateCounters)
    return () => {
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [isGraphInView])

  const milestones = [
    { cx: 10, cy: 135, stage: 'Seed Phase', rev: '$15K ARR', desc: 'Brand Launch' },
    { cx: 95, cy: 120, stage: 'Traction', rev: '$180K ARR', desc: 'Product-Market Fit' },
    { cx: 185, cy: 88, stage: 'Velocity', rev: '$720K ARR', desc: 'Scaling Channels' },
    { cx: 280, cy: 50, stage: 'Expansion', rev: '$1.65M ARR', desc: 'Enterprise Adoption' },
    { cx: 390, cy: 12, stage: 'Market Leader', rev: '$2.84M ARR', desc: 'Peak Dominance' },
  ]

  const volumeBars = [
    { x: 25, y: 118, width: 14, height: 42, delay: 100 },
    { x: 80, y: 104, width: 14, height: 56, delay: 220 },
    { x: 135, y: 90, width: 14, height: 70, delay: 340 },
    { x: 190, y: 76, width: 14, height: 84, delay: 460 },
    { x: 245, y: 58, width: 14, height: 102, delay: 580 },
    { x: 305, y: 38, width: 14, height: 122, delay: 700 },
    { x: 365, y: 16, width: 14, height: 144, delay: 820 },
  ]

  return (
    <div className={`relative group max-w-md mx-auto lg:max-w-none ${className}`}>
      {/* Revenue Graph Frame */}
      <div
        ref={graphRef}
        className="relative rounded-[32px] overflow-hidden shadow-2xl border border-black/8 dark:border-white/10 bg-white dark:bg-[#121316] p-6 sm:p-7 flex flex-col justify-between aspect-[405/425] transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(201,243,29,0.28)]"
      >
        {/* Background Ambient Glows matching ByteBly Brand */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#C9F31D]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-[#ADD40C]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Top Section: Header & Live Stats */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C9F31D] animate-pulse" />
              <span className="text-[11px] sm:text-[12px] font-barlow font-bold uppercase tracking-widest text-[#666666] dark:text-gray-300">
                BRAND GROWTH ANALYTICS • LESS TO HIGH
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#C9F31D]/15 text-[11px] font-barlow font-bold text-[#04000B] dark:text-[#C9F31D] border border-[#C9F31D]/30">
              2025 - 2026
            </span>
          </div>

          {/* Main Metric with Brand Lime Growth Badge */}
          <div className="flex items-baseline justify-between mt-1">
            <div>
              <div className="text-3xl sm:text-4xl lg:text-[40px] font-barlow font-extrabold text-[#04000B] dark:text-white leading-none tracking-tight flex items-baseline gap-1.5">
                <span className="bg-gradient-to-r from-[#04000B] via-[#04000B] to-[#ADD40C] dark:from-white dark:via-gray-100 dark:to-[#C9F31D] bg-clip-text text-transparent">
                  ${arrVal.toFixed(2)}M
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-normal">
                  ARR
                </span>
              </div>
              <p className="text-xs font-barlow font-medium text-[#777777] dark:text-gray-400 mt-1">
                Scaling From Low Foundation to High Enterprise Valuation
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-[#C9F31D] text-[#04000B] font-barlow font-black text-xs sm:text-[13px] shadow-[0_4px_18px_rgba(201,243,29,0.35)] transition-transform duration-300 hover:scale-105">
              <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>+{growthVal.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Mid Section: High-Fidelity Animated SVG Revenue Graph */}
        <div className="relative z-10 my-auto py-2">
          <div className="w-full h-36 sm:h-40 relative">
            <svg
              viewBox="0 0 400 160"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Brand Spline Line Gradient: Deep Lime (#ADD40C) -> Signature Neon Lime (#C9F31D) */}
                <linearGradient id="whyBrandGrowthLine" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ADD40C" />
                  <stop offset="45%" stopColor="#BCE71B" />
                  <stop offset="100%" stopColor="#C9F31D" />
                </linearGradient>

                {/* Brand Area Gradient Under Curve */}
                <linearGradient id="whyBrandGrowthArea" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C9F31D" stopOpacity="0.42" />
                  <stop offset="60%" stopColor="#ADD40C" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#ADD40C" stopOpacity="0.0" />
                </linearGradient>

                {/* Animated Area Reveal ClipPath (Unmasks from Left to Right as the brand grows) */}
                <clipPath id="whyGraphAreaClip">
                  <rect
                    x="0"
                    y="0"
                    width={isGraphInView ? 400 : 0}
                    height="160"
                    style={{
                      transition: 'width 2400ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </clipPath>

                {/* Brand Rising Bar Gradient */}
                <linearGradient id="whyBrandBarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9F31D" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#ADD40C" stopOpacity="0.06" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid Guidelines */}
              <line x1="0" y1="30" x2="400" y2="30" stroke="currentColor" strokeDasharray="3 3" className="text-black/[0.06] dark:text-white/[0.08]" />
              <line x1="0" y1="75" x2="400" y2="75" stroke="currentColor" strokeDasharray="3 3" className="text-black/[0.06] dark:text-white/[0.08]" />
              <line x1="0" y1="120" x2="400" y2="120" stroke="currentColor" strokeDasharray="3 3" className="text-black/[0.06] dark:text-white/[0.08]" />

              {/* Monthly Rising Volume Bars (Animated from Less to High in Brand Colors) */}
              {volumeBars.map((b, idx) => (
                <rect
                  key={idx}
                  x={b.x}
                  y={b.y}
                  width={b.width}
                  height={b.height}
                  rx="4"
                  fill="url(#whyBrandBarGrad)"
                  className="transition-all hover:opacity-100"
                  style={{
                    transform: isGraphInView ? 'scaleY(1)' : 'scaleY(0)',
                    transformOrigin: `${b.x}px 160px`,
                    transition: `transform 950ms cubic-bezier(0.16, 1, 0.3, 1) ${b.delay}ms`,
                  }}
                />
              ))}

              {/* Animated Area Fill Under Spline */}
              <g clipPath="url(#whyGraphAreaClip)">
                <path
                  d="M 10 135 C 70 130, 120 100, 170 95 C 220 90, 270 55, 320 38 C 350 28, 375 18, 390 12 L 390 160 L 10 160 Z"
                  fill="url(#whyBrandGrowthArea)"
                />
              </g>

              {/* Black Revenue Spline Line (Animated stroke draw-in from less to high) */}
              <path
                d="M 10 135 C 70 130, 120 100, 170 95 C 220 90, 270 55, 320 38 C 350 28, 375 18, 390 12"
                fill="none"
                stroke="currentColor"
                className="text-[#04000B] dark:text-white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="460"
                strokeDashoffset={isGraphInView ? 0 : 460}
                style={{
                  transition: 'stroke-dashoffset 2400ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />

              {/* Milestone Stage Dots along the curve */}
              {milestones.map((m, idx) => {
                const isPeak = idx === milestones.length - 1
                const isStart = idx === 0
                const isHovered = hoveredMilestone === idx
                const dotColor = isPeak ? '#C9F31D' : isStart ? '#ADD40C' : '#C9F31D'

                return (
                  <g
                    key={idx}
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredMilestone(idx)}
                    onMouseLeave={() => setHoveredMilestone(null)}
                  >
                    {/* Peak Target Radar Ring */}
                    {isPeak && isGraphInView && (
                      <>
                        <circle cx={m.cx} cy={m.cy} r="11" className="fill-[#C9F31D] animate-ping opacity-60" />
                        <circle cx={m.cx} cy={m.cy} r="6" fill="#C9F31D" stroke="#04000B" strokeWidth="2.5" />
                      </>
                    )}

                    {/* Milestone Dot with Sequential Pop Animation */}
                    {!isPeak && (
                      <circle
                        cx={m.cx}
                        cy={m.cy}
                        r={isHovered ? 6 : 4}
                        fill={dotColor}
                        stroke="#04000B"
                        strokeWidth="2"
                        style={{
                          transform: isGraphInView ? 'scale(1)' : 'scale(0)',
                          transformOrigin: `${m.cx}px ${m.cy}px`,
                          transition: `transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) ${400 + idx * 420}ms`,
                        }}
                      />
                    )}
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Brand Stage Progression: Less to High in Website Colors */}
          <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-barlow font-bold uppercase mt-2 px-1 text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1 text-[#ADD40C] dark:text-[#ADD40C] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ADD40C]" /> Seed (Less)
            </span>
            <span>Traction</span>
            <span>Velocity</span>
            <span>Scale</span>
            <span className="flex items-center gap-1 text-[#04000B] dark:text-[#C9F31D] font-extrabold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9F31D] animate-ping" /> Leader (High)
            </span>
          </div>

          {/* Dynamic Milestone Stage Banner in Brand Lime/Soft */}
          <div className="mt-2.5 py-1 px-3 rounded-xl bg-[#C9F31D]/10 dark:bg-[#C9F31D]/10 border border-[#C9F31D]/25 flex items-center justify-between text-[11px] font-barlow">
            <span className="text-gray-700 dark:text-gray-300 font-medium truncate pr-2">
              {hoveredMilestone !== null
                ? `${milestones[hoveredMilestone].stage}: ${milestones[hoveredMilestone].desc}`
                : 'Growth Curve: Early Stage ($15K) ➔ Enterprise Valuation'}
            </span>
            <span className="font-extrabold text-[#04000B] dark:text-[#C9F31D] shrink-0">
              {hoveredMilestone !== null ? milestones[hoveredMilestone].rev : '$2.84M Peak'}
            </span>
          </div>
        </div>

        {/* Bottom Stats Sub-Panel */}
        <div className="relative z-10 pt-3.5 border-t border-black/5 dark:border-white/10 grid grid-cols-2 gap-3">
          <div className="p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
            <div className="text-[11px] uppercase font-barlow font-semibold text-gray-500 dark:text-gray-400">
              Monthly Run-Rate
            </div>
            <div className="text-base sm:text-lg font-barlow font-bold text-[#04000B] dark:text-white mt-0.5">
              ${runRateVal},000<span className="text-xs font-normal text-gray-500">/mo</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
            <div className="text-[11px] uppercase font-barlow font-semibold text-gray-500 dark:text-gray-400">
              Client Retention
            </div>
            <div className="text-base sm:text-lg font-barlow font-bold text-[#04000B] dark:text-white mt-0.5 flex items-center justify-between">
              <span>{retentionVal.toFixed(1)}%</span>
              <span className="text-[10px] py-0.5 px-2 rounded-full bg-[#C9F31D]/20 text-[#04000B] dark:text-[#C9F31D] font-extrabold">
                TOP 1%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
