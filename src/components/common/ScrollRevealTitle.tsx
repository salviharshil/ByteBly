import React, { useRef, useState, useEffect } from 'react'

interface ScrollRevealTitleProps {
  lines: string[]
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div'
  className?: string
  lineClassName?: string
  lineClassNames?: string[]
  charStaggerMs?: number
  lineStaggerMs?: number
  staggerDelayMs?: number
  durationMs?: number
  by?: 'char' | 'line'
}

export const ScrollRevealTitle: React.FC<ScrollRevealTitleProps> = ({
  lines,
  as: Component = 'h2',
  className = '',
  lineClassName = '',
  lineClassNames,
  charStaggerMs = 28,
  lineStaggerMs = 120,
  staggerDelayMs,
  durationMs = 750,
  by = 'char',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  // Intelligently handle backwards-compatible staggerDelayMs
  const effectiveLineStagger = staggerDelayMs && staggerDelayMs >= 60 ? staggerDelayMs : lineStaggerMs
  const effectiveCharStagger = staggerDelayMs && staggerDelayMs < 60 ? staggerDelayMs : charStaggerMs

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(el)
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px',
      }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Component ref={containerRef as any} className={`select-none ${className}`}>
      {lines.map((line, lineIdx) => {
        const extraLineClass = lineClassNames?.[lineIdx] || lineClassName
        let charCounter = 0

        if (by === 'line') {
          return (
            <div key={lineIdx} className={`overflow-hidden py-0.5 ${extraLineClass}`}>
              <div
                className="will-change-transform"
                style={{
                  transform: isInView ? 'translateY(0)' : 'translateY(115%)',
                  opacity: isInView ? 1 : 0,
                  transition: `transform ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${
                    lineIdx * effectiveLineStagger
                  }ms, opacity ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${lineIdx * effectiveLineStagger}ms`,
                }}
              >
                {line}
              </div>
            </div>
          )
        }

        const words = line.split(' ')

        return (
          <div key={lineIdx} className={`py-0.5 leading-[inherit] ${extraLineClass}`}>
            {words.map((word, wordIdx) => (
              <span
                key={wordIdx}
                className="inline-block whitespace-nowrap mr-[0.26em] align-bottom"
              >
                {word.split('').map((char, charIdx) => {
                  const delay = lineIdx * effectiveLineStagger + charCounter * effectiveCharStagger
                  charCounter++

                  return (
                    <span
                      key={charIdx}
                      className="inline-block overflow-hidden py-0.5 align-bottom"
                    >
                      <span
                        className="inline-block will-change-transform"
                        style={{
                          transform: isInView ? 'translateY(0)' : 'translateY(118%)',
                          opacity: isInView ? 1 : 0,
                          transition: `transform ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
                        }}
                      >
                        {char}
                      </span>
                    </span>
                  )
                })}
              </span>
            ))}
          </div>
        )
      })}
    </Component>
  )
}

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(el)
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
        ...options,
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, isInView] as const
}

export const ScrollRevealBox: React.FC<{
  children: React.ReactNode
  delay?: number
  className?: string
  yOffset?: number
}> = ({ children, delay = 0, className = '', yOffset = 40 }) => {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{
        transform: inView ? 'translateY(0)' : `translateY(${yOffset}px)`,
        opacity: inView ? 1 : 0,
        transition: `transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

