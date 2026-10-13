import React from 'react'
import { ASSETS } from '../../constants/assets'
import { ScrollRevealTitle, ScrollRevealBox } from '../common/ScrollRevealTitle'

export interface ProjectData {
  id: string
  date: string
  title: string
  category: string
  image: string
  gallery?: string[]
  client: string
  duration: string
  role: string
  website: string
  summary: string
  challenge: string
  solution: string
  results: { label: string; value: string }[]
  quote: { text: string; author: string; title: string }
  features: string[]
}

interface ProjectDetailsProps {
  project: ProjectData
  onBack: () => void
  onNavigateContact: () => void
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  onBack,
  onNavigateContact,
}) => {
  return (
    <div className="w-full bg-[#F2F3EF] dark:bg-[#0E0F11] py-12 lg:py-20 animate-fadeIn">
      <div className="w-full max-w-[1140px] px-4 mx-auto">
        
        {/* Back Button */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#CCCCCC] dark:border-gray-700 bg-white dark:bg-[#1A1A1A] font-barlow font-semibold text-[#04000B] dark:text-white hover:border-[#04000B] dark:hover:border-[#C9F31D] hover:text-[#04000B] dark:hover:text-[#C9F31D] transition-all transform active:scale-95 shadow-sm group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Back to All Projects</span>
          </button>

          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#04000B] dark:bg-white text-white dark:text-[#04000B] hover:bg-[#C9F31D] dark:hover:bg-[#C9F31D] hover:text-[#04000B] dark:hover:text-[#04000B] font-barlow font-bold text-sm transition-all shadow-md group"
            >
              <span>Visit Live Website</span>
              <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 font-bold">↗</span>
            </a>
          )}
        </div>

        {/* Hero Header */}
        <div className="mb-12">
          {/* Category & Date Pill */}
          <ScrollRevealBox delay={50} yOffset={20}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-4 py-1.5 rounded-full bg-[#C9F31D] text-[#04000B] font-barlow font-bold text-xs uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-[#666666] dark:text-gray-400 font-barlow text-sm font-medium">
                {project.date}
              </span>
            </div>
          </ScrollRevealBox>

          <ScrollRevealTitle
            lines={[project.title]}
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-barlow font-bold text-[#04000B] dark:text-white leading-[105%] tracking-tight mb-6"
            durationMs={850}
          />

          <ScrollRevealBox delay={180} yOffset={20}>
            <p className="text-xl sm:text-2xl font-barlow text-[#666666] dark:text-gray-300 max-w-3xl leading-relaxed">
              {project.summary}
            </p>
          </ScrollRevealBox>
        </div>

        {/* Featured Showcase Cover Image */}
        <div className="rounded-[24px] overflow-hidden shadow-2xl mb-16 aspect-[16/9] sm:aspect-[21/9] bg-black">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Metadata Grid Info Card */}
        <div className="p-8 sm:p-12 rounded-[20px] bg-white dark:bg-[#1A1A1A] shadow-lg border border-[#E7E7E7] dark:border-white/5 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-xs uppercase font-barlow font-bold tracking-wider text-[#666666] dark:text-gray-400 mb-1">
                Client
              </div>
              <div className="text-lg sm:text-xl font-barlow font-bold text-[#04000B] dark:text-white">
                {project.client}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase font-barlow font-bold tracking-wider text-[#666666] dark:text-gray-400 mb-1">
                Timeline
              </div>
              <div className="text-lg sm:text-xl font-barlow font-bold text-[#04000B] dark:text-white">
                {project.duration}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase font-barlow font-bold tracking-wider text-[#666666] dark:text-gray-400 mb-1">
                Our Role
              </div>
              <div className="text-lg sm:text-xl font-barlow font-bold text-[#04000B] dark:text-white">
                {project.role}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase font-barlow font-bold tracking-wider text-[#666666] dark:text-gray-400 mb-1">
                Live Platform
              </div>
              {project.website ? (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg sm:text-xl font-barlow font-bold text-[#88A60A] dark:text-[#C9F31D] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Visit Site</span>
                  <span>↗</span>
                </a>
              ) : (
                <div className="text-lg sm:text-xl font-barlow font-bold text-[#C9F31D]">
                  Verified Production
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Deep Dive Content: The Challenge & The Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Challenge */}
          <div className="p-8 sm:p-10 rounded-[20px] bg-white dark:bg-[#1A1A1A] shadow-md border border-transparent dark:border-white/5 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center font-bold text-xl mb-6">
                ⚡
              </div>
              <h3 className="text-2xl sm:text-3xl font-barlow font-bold text-[#04000B] dark:text-white mb-4">
                The Core Challenge
              </h3>
              <p className="text-[17px] leading-[170%] font-barlow text-[#666666] dark:text-gray-300">
                {project.challenge}
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5">
              <span className="text-xs uppercase font-barlow font-bold tracking-wider text-[#666666] dark:text-gray-400">
                Phase 1: Discovery & Audit
              </span>
            </div>
          </div>

          {/* Solution */}
          <div className="p-8 sm:p-10 rounded-[20px] bg-white dark:bg-[#1A1A1A] shadow-md border border-transparent dark:border-white/5 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#C9F31D]/20 text-[#04000B] dark:text-[#C9F31D] flex items-center justify-center font-bold text-xl mb-6">
                ✦
              </div>
              <h3 className="text-2xl sm:text-3xl font-barlow font-bold text-[#04000B] dark:text-white mb-4">
                The Strategic Solution
              </h3>
              <p className="text-[17px] leading-[170%] font-barlow text-[#666666] dark:text-gray-300">
                {project.solution}
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5">
              <span className="text-xs uppercase font-barlow font-bold tracking-wider text-[#C9F31D]">
                Phase 2: Deployment & Optimization
              </span>
            </div>
          </div>
        </div>

        {/* Deliverables Checklist */}
        <div className="p-8 sm:p-10 rounded-[20px] bg-white dark:bg-[#1A1A1A] shadow-md border border-[#E7E7E7] dark:border-white/5 mb-16">
          <h3 className="text-2xl font-barlow font-bold text-[#04000B] dark:text-white mb-6">
            Key Deliverables & Innovations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-[#F2F3EF] dark:bg-[#121316]">
                <div className="w-6 h-6 rounded-full bg-[#C9F31D] text-[#04000B] flex items-center justify-center text-xs font-bold shrink-0">
                  ✓
                </div>
                <span className="font-barlow font-semibold text-base text-[#04000B] dark:text-white">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Architecture & Key Interfaces Showcase */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-16">
            <div className="mb-8">
              <span className="text-xs uppercase font-barlow font-bold tracking-widest text-[#88A60A] dark:text-[#C9F31D]">
                Platform Preview & Architecture
              </span>
              <h3 className="text-3xl sm:text-4xl font-barlow font-bold text-[#04000B] dark:text-white mt-1">
                Visual Experience & Live Platform Interfaces
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.gallery.map((imgUrl, i) => (
                <div
                  key={i}
                  className="rounded-[22px] overflow-hidden bg-white dark:bg-[#1A1A1A] border border-[#E7E7E7] dark:border-white/10 shadow-lg group hover:shadow-2xl transition-all"
                >
                  <div className="px-4 py-3 bg-gray-100 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      <span className="text-xs font-mono text-gray-500 ml-2">
                        {project.website.replace('https://', '')}
                      </span>
                    </div>
                    <span className="text-xs font-barlow font-semibold text-gray-400 uppercase">
                      Module {i + 1}
                    </span>
                  </div>
                  <div className="overflow-hidden aspect-[16/10] bg-gray-50 dark:bg-black/30">
                    <img
                      src={imgUrl}
                      alt={`${project.title} Interface ${i + 1}`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quantified Results Bar */}
        <div className="p-8 sm:p-12 rounded-[24px] bg-[#0E0F11] text-white shadow-2xl mb-16 border border-white/10 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#C9F31D]/10 blur-[80px] pointer-events-none" />
          
          <div className="mb-8">
            <span className="text-xs uppercase font-barlow font-bold tracking-widest text-[#C9F31D]">
              Verified Impact
            </span>
            <h3 className="text-3xl sm:text-4xl font-barlow font-bold mt-1">
              Measurable Outcomes & Growth
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {project.results.map((res, idx) => (
              <div key={idx} className="border-l-2 border-[#C9F31D] pl-6">
                <div className="text-4xl sm:text-5xl font-barlow font-black text-[#C9F31D] mb-1">
                  {res.value}
                </div>
                <div className="text-base sm:text-lg font-barlow text-gray-300">
                  {res.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Quote */}
        <div className="p-8 sm:p-12 rounded-[20px] bg-gradient-to-br from-white to-[#F9FAF6] dark:from-[#1A1A1A] dark:to-[#121316] border border-[#E7E7E7] dark:border-white/5 mb-16 relative">
          <div className="text-6xl text-[#C9F31D] font-serif leading-none absolute top-6 left-6 opacity-40">
            “
          </div>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="text-xl sm:text-2xl italic font-barlow text-[#04000B] dark:text-gray-200 mb-6 leading-relaxed">
              "{project.quote.text}"
            </p>
            <div className="font-barlow font-bold text-lg text-[#04000B] dark:text-white">
              {project.quote.author}
            </div>
            <div className="text-sm font-barlow text-[#666666] dark:text-gray-400">
              {project.quote.title}
            </div>
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="p-8 sm:p-14 rounded-[24px] bg-[#C9F31D] text-[#04000B] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-barlow font-bold leading-tight mb-2">
              Ready to create something extraordinary?
            </h3>
            <p className="text-lg font-barlow font-medium opacity-90 max-w-xl">
              Let's partner together to build high-performance digital experiences tailored for your audience.
            </p>
          </div>
          <button
            onClick={onNavigateContact}
            className="shrink-0 px-8 py-4 rounded-xl bg-[#04000B] text-white font-barlow font-semibold text-lg hover:bg-black/80 transition-all transform active:scale-95 shadow-md"
          >
            Start Your Project ➔
          </button>
        </div>

      </div>
    </div>
  )
}
