import React, { useState, useEffect, useRef } from 'react'
import { ScrollRevealBox } from './ScrollRevealTitle'

const AnimatedStatValue: React.FC<{ target: number; unit?: string; delay?: number }> = ({
  target,
  unit,
  delay = 0,
}) => {
  const [val, setVal] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setHasStarted(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.unobserve(el)
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasStarted) return

    setVal(0)
    const duration = 900 // Snappy & clearly visible (900ms)
    let startTime: number | null = null
    let frameId: number

    const timer = setTimeout(() => {
      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        // High-end cubic ease out
        const ease = 1 - Math.pow(1 - progress, 3)
        setVal(Math.round(ease * target))

        if (progress < 1) {
          frameId = requestAnimationFrame(animate)
        } else {
          setVal(target)
        }
      }
      frameId = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timer)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [hasStarted, target, delay])

  return (
    <span ref={containerRef} className="inline-flex items-baseline">
      <span className="tabular-nums font-bold">{val}</span>
      {unit && <span className="text-[#04000B] dark:text-[#C9F31D]">{unit}</span>}
    </span>
  )
}

export const StatsSection: React.FC = () => {
  const stats = [
    {
      numericValue: 10,
      unit: '+',
      label: 'World Customer',
      circleSize: 'w-48 h-48',
      bgWhite: false,
    },
    {
      numericValue: 98,
      unit: '%',
      label: 'Positive Rating',
      circleSize: 'w-56 h-56',
      bgWhite: true,
    },
    {
      numericValue: 4,
      unit: '+',
      label: 'Total Team Members',
      circleSize: 'w-52 h-52',
      bgWhite: false,
    },
    {
      numericValue: 3,
      unit: '+',
      label: 'Years experience',
      circleSize: 'w-60 h-60',
      bgWhite: true,
    },
  ]

  return (
    <section className="py-24 lg:py-32 bg-[#F2F3EF] dark:bg-[#121316] overflow-hidden">
      <div className="w-full max-w-[1140px] px-4 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 items-center">
          {stats.map((stat, idx) => (
            <ScrollRevealBox key={idx} delay={idx * 120} yOffset={40}>
              <div
                className="flex flex-col items-center justify-center text-center relative p-6 group transition-transform duration-500 hover:scale-105"
              >
                {/* Circular outline layer matching NY-0 design */}
                <div
                  className={`absolute rounded-full border border-[#C9C4C4] dark:border-gray-700 pointer-events-none transition-all duration-500 group-hover:border-[#C9F31D] ${
                    stat.circleSize
                  } ${stat.bgWhite ? 'bg-white dark:bg-[#1A1A1A] shadow-md group-hover:shadow-xl' : ''}`}
                />

                <div className="relative z-10 py-6">
                  <div className="flex items-center justify-center font-barlow font-semibold text-5xl sm:text-6xl lg:text-[75px] leading-tight text-[#04000B] dark:text-white">
                    <AnimatedStatValue
                      target={stat.numericValue}
                      unit={stat.unit}
                      delay={idx * 100}
                    />
                  </div>
                  <div className="text-[17px] font-barlow font-semibold text-[#666666] dark:text-gray-300 mt-2">
                    {stat.label}
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
