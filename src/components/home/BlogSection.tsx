import React, { useState, useRef, useEffect } from 'react'
import { BLOGS_DATA, BlogPost } from '../../data/blogsData'
import { ScrollRevealTitle, ScrollRevealBox } from '../common/ScrollRevealTitle'

interface BlogSectionProps {
  onPostClick?: (title: string) => void
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onPostClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [activePost, setActivePost] = useState<BlogPost | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  const categories = [
    'All',
    'Meta Ads',
    'Digital Marketing',
    'Website Development',
    'Software Development',
    'App Development',
    'UI/UX Design',
    'E-Commerce',
  ]

  const filteredPosts = activeCategory === 'All'
    ? BLOGS_DATA
    : BLOGS_DATA.filter((p) => p.category === activeCategory)

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
      
      const totalScrollable = scrollWidth - clientWidth
      if (totalScrollable > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollLeft / totalScrollable) * 100)))
      } else {
        setScrollProgress(100)
      }
    }
  }

  useEffect(() => {
    checkScroll()
    const el = sliderRef.current
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true })
      window.addEventListener('resize', checkScroll)
      return () => {
        el.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [filteredPosts])

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const card = sliderRef.current.firstElementChild as HTMLElement
      const scrollAmount = card ? (card.offsetWidth + 28) : 380
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="blog-section" className="py-24 lg:py-32 bg-[#F2F3EF] dark:bg-[#121316] relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C9F31D]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[1200px] px-4 mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            {/* Pill Badge */}
            <ScrollRevealBox delay={50} yOffset={20}>
              <div className="inline-block mb-4 py-2 px-6 rounded-[30px] border border-[#CCCCCC] dark:border-gray-700 bg-white/60 dark:bg-white/5 backdrop-blur-sm shadow-sm">
                <span className="text-[14px] sm:text-[16px] leading-[120%] uppercase font-barlow font-bold tracking-wider text-[#04000B] dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C9F31D] animate-pulse" />
                  News & Insights
                </span>
              </div>
            </ScrollRevealBox>

            <ScrollRevealTitle
              lines={['Latest Articles &', 'Tech Perspectives']}
              className="text-3xl sm:text-5xl lg:text-[56px] leading-[115%] font-barlow font-semibold text-[#04000B] dark:text-white tracking-tight"
              staggerDelayMs={120}
            />

            <ScrollRevealBox delay={180} yOffset={20}>
              <p className="mt-4 text-base sm:text-lg font-barlow text-[#666666] dark:text-gray-400">
                Explore proven strategies, industry trends, and creative blueprints crafted by Bytebly's engineering & growth teams.
              </p>
            </ScrollRevealBox>
          </div>

          {/* Navigation Controls & View All Button */}
          <ScrollRevealBox delay={200} yOffset={20} className="self-start md:self-end">
            <div className="flex items-center gap-3">
              {/* Slider Navigation Arrows */}
              <div className="flex items-center gap-2 mr-1">
                <button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  aria-label="Previous article"
                  className="w-12 h-12 rounded-full border border-[#CCCCCC] dark:border-[#333] bg-white dark:bg-[#1A1A1A] text-[#04000B] dark:text-white flex items-center justify-center hover:bg-[#C9F31D] hover:text-[#04000B] hover:border-[#C9F31D] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm active:scale-95 group"
                >
                  <span className="text-lg font-bold transition-transform group-hover:-translate-x-0.5">←</span>
                </button>
                <button
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  aria-label="Next article"
                  className="w-12 h-12 rounded-full border border-[#CCCCCC] dark:border-[#333] bg-white dark:bg-[#1A1A1A] text-[#04000B] dark:text-white flex items-center justify-center hover:bg-[#C9F31D] hover:text-[#04000B] hover:border-[#C9F31D] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm active:scale-95 group"
                >
                  <span className="text-lg font-bold transition-transform group-hover:translate-x-0.5">→</span>
                </button>
              </div>

              {/* View All Button */}
              <button
                onClick={() => onPostClick?.('All Posts')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[10px] border border-[#CCCCCC] dark:border-gray-700 bg-white dark:bg-[#1A1A1A] font-barlow font-semibold text-[15px] text-[#04000B] dark:text-white hover:border-[#04000B] dark:hover:border-[#C9F31D] hover:text-[#04000B] dark:hover:text-[#C9F31D] transition-all transform active:scale-95 shadow-sm group"
              >
                <span>Explore All Posts</span>
                <span className="transition-transform group-hover:translate-x-1 text-[#88A60A] dark:text-[#C9F31D]">➔</span>
              </button>
            </div>
          </ScrollRevealBox>
        </div>

        {/* Category Filter Tabs */}
        <ScrollRevealBox delay={220} yOffset={20}>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-8">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-5 py-2.5 rounded-full font-barlow font-semibold text-sm transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#C9F31D] text-[#04000B] shadow-md scale-105'
                      : 'bg-white dark:bg-[#1A1A1A] border border-[#E5E7EB] dark:border-white/10 text-[#666666] dark:text-gray-300 hover:text-[#04000B] dark:hover:text-white hover:border-[#04000B] dark:hover:border-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </ScrollRevealBox>

        {/* Horizontal Slider Area */}
        <ScrollRevealBox delay={260} yOffset={30}>
          <div className="relative">
            <div
              ref={sliderRef}
              className="flex gap-7 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 pt-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => {
                    setActivePost(post)
                    onPostClick?.(post.title)
                  }}
                  className="w-[310px] sm:w-[350px] md:w-[370px] shrink-0 snap-start group cursor-pointer flex flex-col justify-between rounded-[22px] bg-white dark:bg-[#1A1A1A] border border-[#E5E7EB] dark:border-white/10 hover:border-[#C9F31D] dark:hover:border-[#C9F31D] overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_40px_rgba(201,243,29,0.15)] transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div>
                    {/* Photo & Date Badge Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        loading="lazy"
                      />

                      {/* Dark gradient overlay on image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                      {/* Category Pill Tag */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-block py-1 px-3.5 rounded-full bg-[#04000B]/80 dark:bg-[#04000B]/90 backdrop-blur-md border border-white/10 text-xs font-barlow font-bold uppercase tracking-wider text-[#C9F31D]">
                          {post.category}
                        </span>
                      </div>

                      {/* Lime Gradient Date Badge */}
                      <div className="absolute right-4 bottom-4 z-10 py-2.5 px-4 rounded-[12px] bg-gradient-to-tr from-[#ADD40C] to-[#C9F31D] text-center shadow-lg transform transition-transform group-hover:scale-105">
                        <div className="text-2xl font-barlow font-extrabold text-[#04000B] leading-none">
                          {post.date}
                        </div>
                        <div className="text-[11px] font-barlow font-bold text-[#04000B] uppercase tracking-wider">
                          {post.month}
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 sm:p-7">
                      {/* Metadata Row */}
                      <div className="flex items-center flex-wrap gap-y-1 gap-x-3 mb-3.5 text-[13px] sm:text-[14px] font-barlow font-medium text-[#666666] dark:text-gray-400">
                        <span className="flex items-center gap-1.5 text-[#04000B] dark:text-gray-300 font-semibold">
                          <svg className="w-3.5 h-3.5 text-[#88A60A] dark:text-[#C9F31D]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          {post.author}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" strokeWidth="2" />
                            <path strokeWidth="2" d="M12 6v6l4 2" />
                          </svg>
                          {post.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-[22px] leading-[130%] font-barlow font-semibold text-[#04000B] dark:text-white mb-3 group-hover:text-[#88A60A] dark:group-hover:text-[#C9F31D] transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-[14px] sm:text-[15px] leading-[160%] font-barlow text-[#666666] dark:text-gray-400 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Divider & Action */}
                  <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-[#F2F3EF] dark:border-white/5 flex items-center justify-between">
                    <span className="text-[14px] sm:text-[15px] font-barlow font-bold text-[#04000B] dark:text-white group-hover:text-[#88A60A] dark:group-hover:text-[#C9F31D] transition-colors">
                      Read Full Story
                    </span>
                    <span className="w-9 h-9 rounded-full bg-[#F2F3EF] dark:bg-white/5 border border-transparent dark:border-white/10 flex items-center justify-center text-sm font-bold text-[#04000B] dark:text-white group-hover:bg-[#C9F31D] group-hover:text-[#04000B] transition-all transform group-hover:translate-x-1">
                      ➔
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {/* Progress Bar & Status Indicator */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-barlow font-medium text-gray-500 dark:text-gray-400">
                <span className="font-bold text-[#04000B] dark:text-white">{filteredPosts.length}</span> articles available
                <span className="hidden sm:inline">• Drag, swipe or use arrows to navigate</span>
              </div>

              {/* Slider track bar */}
              <div className="w-32 sm:w-48 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C9F31D] rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.max(15, scrollProgress)}%` }}
                />
              </div>
            </div>
          </div>
        </ScrollRevealBox>

      </div>

      {/* Full Article Reading Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div
            className="fixed inset-0"
            onClick={() => setActivePost(null)}
          />
          <div className="relative w-full max-w-3xl bg-white dark:bg-[#16171B] rounded-[24px] shadow-2xl overflow-hidden border border-[#E7E7E7] dark:border-white/10 z-10 max-h-[90vh] flex flex-col">
            
            {/* Modal Header Bar with Close Button */}
            <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-[#16171B]/95 backdrop-blur-md z-20">
              <span className="px-3.5 py-1 rounded-full bg-[#C9F31D] text-[#04000B] font-barlow font-bold text-xs uppercase tracking-wider">
                {activePost.category}
              </span>
              <button
                onClick={() => setActivePost(null)}
                aria-label="Close article"
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-[#C9F31D] hover:text-[#04000B] text-gray-700 dark:text-white flex items-center justify-center font-bold text-base transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
              {/* Header Image */}
              <div className="rounded-2xl overflow-hidden aspect-[16/9] shadow-md relative">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Metadata */}
              <div>
                <div className="flex items-center gap-3 text-sm font-barlow text-gray-500 dark:text-gray-400 mb-2">
                  <span className="font-semibold text-[#04000B] dark:text-white">
                    By {activePost.author} ({activePost.authorRole})
                  </span>
                  <span>•</span>
                  <span>{activePost.month} {activePost.date}, {activePost.year}</span>
                  <span>•</span>
                  <span>{activePost.readTime}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-barlow font-bold text-[#04000B] dark:text-white leading-tight">
                  {activePost.title}
                </h2>
              </div>

              {/* Body Paragraphs */}
              <div className="space-y-4 text-base sm:text-lg font-barlow text-[#444444] dark:text-gray-300 leading-relaxed">
                {activePost.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Key Takeaways Box */}
              <div className="p-6 rounded-2xl bg-[#F2F3EF] dark:bg-[#121316] border-l-4 border-[#C9F31D]">
                <h4 className="text-lg font-barlow font-bold text-[#04000B] dark:text-white mb-3">
                  Key Strategic Takeaways
                </h4>
                <ul className="space-y-2.5">
                  {activePost.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base font-barlow text-[#555555] dark:text-gray-300">
                      <span className="text-[#88A60A] dark:text-[#C9F31D] font-bold">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activePost.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-xs font-barlow font-semibold text-gray-600 dark:text-gray-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => setActivePost(null)}
                  className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-barlow font-semibold text-sm text-gray-700 dark:text-gray-300 hover:border-black dark:hover:border-white transition-colors"
                >
                  Close Article
                </button>
                <div className="text-xs sm:text-sm font-barlow text-gray-500">
                  Published by Bytebly Editorial Team
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  )
}
