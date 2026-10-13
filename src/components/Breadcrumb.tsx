import React from 'react'
import { ASSETS } from '../constants/assets'
import { ScrollRevealTitle, ScrollRevealBox } from './common/ScrollRevealTitle'

interface BreadcrumbProps {
  title: string
  parent?: string
  current: string
  onNavigateHome?: () => void
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  title,
  parent = 'Home',
  current,
  onNavigateHome,
}) => {
  return (
    <div
      className="relative text-center overflow-hidden bg-cover bg-center pt-32 pb-24 md:pt-44 md:pb-36"
      style={{ backgroundImage: `url(${ASSETS.breadcrumbBg})` }}
    >
      {/* Pattern texture overlay */}
      <div
        className="absolute inset-0 bg-[#F2F3EF] dark:bg-[#0E0F11]/90 bg-cover bg-center opacity-90 mix-blend-multiply dark:mix-blend-overlay"
        style={{ backgroundImage: `url(${ASSETS.breadcrumbTexture})` }}
      />

      {/* Gradient fade to match bottom background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(242, 243, 239, 0) 0%, #FFFFFF 92%)',
        }}
      />

      <div className="w-full max-w-[1140px] text-center px-4 relative z-10 mx-auto">
        <ScrollRevealTitle
          lines={[title]}
          as="h1"
          className="text-4xl sm:text-6xl lg:text-[80px] leading-[105%] font-barlow font-semibold text-[#04000B] dark:text-white capitalize mb-4 tracking-tight"
          durationMs={850}
        />

        <ScrollRevealBox delay={150} yOffset={20}>
          <div className="flex items-center justify-center space-x-2 text-[16px] sm:text-[17px] font-barlow font-semibold text-[#04000B] dark:text-white mt-4">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 hover:text-[#C9F31D] transition-colors"
            >
              <span>⌂</span>
              <span>{parent}</span>
            </button>
            <span className="text-xs opacity-60">❯</span>
            <span className="text-[#666666] dark:text-gray-300 capitalize">{current}</span>
          </div>
        </ScrollRevealBox>
      </div>
    </div>
  )
}
