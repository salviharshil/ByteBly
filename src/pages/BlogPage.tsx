import React, { useState, useMemo } from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import { BLOGS_DATA, BlogPost } from '../data/blogsData'
import { ScrollRevealTitle, ScrollRevealBox } from '../components/common/ScrollRevealTitle'

interface BlogPageProps {
  onNavigate: (page: string, extra?: string) => void
  initialCategory?: string | null
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, initialCategory }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All')
  const [activePost, setActivePost] = useState<BlogPost | null>(() => {
    if (initialCategory) {
      return (
        BLOGS_DATA.find(
          (p) => p.category.toLowerCase() === initialCategory.toLowerCase()
        ) || null
      )
    }
    return null
  })

  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory)
      const matching = BLOGS_DATA.find(
        (p) => p.category.toLowerCase() === initialCategory.toLowerCase()
      )
      if (matching) {
        setActivePost(matching)
      }
    } else {
      setSelectedCategory('All')
      setActivePost(null)
    }
  }, [initialCategory])

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

  const filteredPosts = useMemo(() => {
    return BLOGS_DATA.filter((post) => {
      const matchesCat = selectedCategory === 'All' || post.category === selectedCategory
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCat && matchesSearch
    })
  }, [searchQuery, selectedCategory])

  const featuredPost = BLOGS_DATA[0]

  return (
    <main className="w-full bg-[#FAFBF8] dark:bg-[#0E0F11] min-h-screen">
      <Breadcrumb
        title="Blog & Articles"
        parent="Home"
        current="Blog-Grid"
        onNavigateHome={() => onNavigate('home')}
      />

      <div className="w-full max-w-[1140px] px-4 mx-auto py-12 lg:py-20">
        
        {/* Page Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollRevealBox delay={50} yOffset={20}>
            <div className="inline-block mb-4 py-2 px-6 rounded-full border border-[#CCCCCC] dark:border-gray-700 bg-white/70 dark:bg-white/5 backdrop-blur-sm shadow-sm">
              <span className="text-sm uppercase font-barlow font-bold tracking-widest text-[#04000B] dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C9F31D] animate-pulse" />
                Bytebly Knowledge Hub
              </span>
            </div>
          </ScrollRevealBox>

          <ScrollRevealTitle
            lines={['Insights, Blueprints &', 'Tech Stories']}
            as="h1"
            className="text-4xl sm:text-6xl font-barlow font-extrabold text-[#04000B] dark:text-white tracking-tight leading-[110%] mb-5"
            staggerDelayMs={120}
          />

          <ScrollRevealBox delay={180} yOffset={20}>
            <p className="text-lg sm:text-xl font-barlow text-[#666666] dark:text-gray-400">
              Actionable strategies across web development, user experience, high-performance ad algorithms, and software scaling.
            </p>
          </ScrollRevealBox>

          {/* Search Input Bar */}
          <ScrollRevealBox delay={220} yOffset={25}>
            <div className="mt-8 max-w-xl mx-auto relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, keywords, or tags..."
                className="w-full h-14 pl-12 pr-6 rounded-full border border-[#E0E0E0] dark:border-gray-700 bg-white dark:bg-[#1A1A1A] font-barlow text-base text-[#04000B] dark:text-white placeholder-[#888888] focus:outline-none focus:border-[#C9F31D] shadow-sm transition-colors"
              />
              <span className="absolute left-4.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                🔍
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-black dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </ScrollRevealBox>
        </div>

        {/* Featured Post Spotlight (shown when not searching) */}
        {!searchQuery && selectedCategory === 'All' && featuredPost && (
          <ScrollRevealBox delay={260} yOffset={35}>
            <div
              onClick={() => setActivePost(featuredPost)}
              className="mb-16 p-6 sm:p-10 rounded-[28px] bg-white dark:bg-[#16171B] border border-[#E7E7E7] dark:border-white/10 shadow-xl cursor-pointer group hover:border-[#C9F31D] transition-all transform hover:-translate-y-1"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="w-full lg:w-7/12 aspect-[16/10] rounded-[20px] overflow-hidden relative">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="py-1.5 px-4 rounded-full bg-[#04000B]/85 backdrop-blur-md text-[#C9F31D] text-xs font-barlow font-bold uppercase tracking-wider">
                      ★ Featured Story
                    </span>
                  </div>
                </div>

                <div className="w-full lg:w-5/12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-sm font-barlow text-[#666666] dark:text-gray-400 mb-3">
                      <span className="text-[#04000B] dark:text-[#C9F31D] font-bold">
                        {featuredPost.category}
                      </span>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-barlow font-bold text-[#04000B] dark:text-white leading-[120%] mb-4 group-hover:text-[#88A60A] dark:group-hover:text-[#C9F31D] transition-colors">
                      {featuredPost.title}
                    </h2>

                    <p className="text-base sm:text-lg font-barlow text-[#666666] dark:text-gray-300 leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                    <div className="text-sm font-barlow font-semibold text-[#04000B] dark:text-gray-200">
                      By {featuredPost.author}
                    </div>
                    <span className="inline-flex items-center gap-2 font-barlow font-bold text-sm text-[#04000B] dark:text-[#C9F31D] group-hover:gap-3 transition-all">
                      Read Story ➔
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollRevealBox>
        )}

        {/* Category Filter Pills */}
        <ScrollRevealBox delay={280} yOffset={20}>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-10">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
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

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-8 text-sm font-barlow text-gray-500 dark:text-gray-400">
          <span>Showing <strong>{filteredPosts.length}</strong> articles</span>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-[#88A60A] dark:text-[#C9F31D] font-bold hover:underline"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* Grid of All Blog Posts */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <ScrollRevealBox key={post.id} delay={(idx % 6) * 70} yOffset={35} className="h-full">
                <article
                  onClick={() => setActivePost(post)}
                  className="h-full group cursor-pointer flex flex-col justify-between rounded-[22px] bg-white dark:bg-[#1A1A1A] border border-[#E5E7EB] dark:border-white/10 hover:border-[#C9F31D] dark:hover:border-[#C9F31D] overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_40px_rgba(201,243,29,0.15)] transition-all duration-300 transform hover:-translate-y-2"
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

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Category Tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-block py-1 px-3.5 rounded-full bg-[#04000B]/80 dark:bg-[#04000B]/90 backdrop-blur-md border border-white/10 text-xs font-barlow font-bold uppercase tracking-wider text-[#C9F31D]">
                        {post.category}
                      </span>
                    </div>

                    {/* Date Badge */}
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
                    <div className="flex items-center flex-wrap gap-y-1 gap-x-3 mb-3.5 text-[13px] sm:text-[14px] font-barlow font-medium text-[#666666] dark:text-gray-400">
                      <span className="flex items-center gap-1.5 text-[#04000B] dark:text-gray-300 font-semibold">
                        <svg className="w-3.5 h-3.5 text-[#88A60A] dark:text-[#C9F31D]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        {post.author}
                      </span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-xl sm:text-[22px] leading-[130%] font-barlow font-semibold text-[#04000B] dark:text-white mb-3 group-hover:text-[#88A60A] dark:group-hover:text-[#C9F31D] transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-[14px] sm:text-[15px] leading-[160%] font-barlow text-[#666666] dark:text-gray-400 mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-[#F2F3EF] dark:border-white/5 flex items-center justify-between">
                  <span className="text-[14px] sm:text-[15px] font-barlow font-bold text-[#04000B] dark:text-white group-hover:text-[#88A60A] dark:group-hover:text-[#C9F31D] transition-colors">
                    Read Full Story
                  </span>
                  <span className="w-9 h-9 rounded-full bg-[#F2F3EF] dark:bg-white/5 border border-transparent dark:border-white/10 flex items-center justify-center text-sm font-bold text-[#04000B] dark:text-white group-hover:bg-[#C9F31D] group-hover:text-[#04000B] transition-all transform group-hover:translate-x-1">
                    ➔
                  </span>
                </div>
              </article>
            </ScrollRevealBox>
          ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-[#16171B] rounded-[24px] border border-gray-200 dark:border-white/5">
            <span className="text-5xl mb-4 block">🔍</span>
            <h3 className="text-2xl font-barlow font-bold text-[#04000B] dark:text-white mb-2">
              No matching articles found
            </h3>
            <p className="text-gray-500 font-barlow max-w-md mx-auto mb-6">
              We couldn't find any articles matching "{searchQuery}". Try searching for other topics like "Design", "React", or "SEO".
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
              }}
              className="px-6 py-2.5 rounded-full bg-[#C9F31D] text-[#04000B] font-barlow font-bold text-sm hover:bg-[#ADD40C] transition-colors"
            >
              View All Articles
            </button>
          </div>
        )}

      </div>

      {/* Full Article Reading Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div
            className="fixed inset-0"
            onClick={() => setActivePost(null)}
          />
          <div className="relative w-full max-w-3xl bg-white dark:bg-[#16171B] rounded-[24px] shadow-2xl overflow-hidden border border-[#E7E7E7] dark:border-white/10 z-10 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
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
              <div className="rounded-2xl overflow-hidden aspect-[16/9] shadow-md relative">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  className="w-full h-full object-cover"
                />
              </div>

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

              <div className="space-y-4 text-base sm:text-lg font-barlow text-[#444444] dark:text-gray-300 leading-relaxed">
                {activePost.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

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

              <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => setActivePost(null)}
                  className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-barlow font-semibold text-sm text-gray-700 dark:text-gray-300 hover:border-black dark:hover:border-white transition-colors"
                >
                  Close Article
                </button>
                <button
                  onClick={() => {
                    setActivePost(null)
                    onNavigate('contact')
                  }}
                  className="px-6 py-3 rounded-xl bg-[#C9F31D] text-[#04000B] font-barlow font-bold text-sm hover:bg-[#ADD40C] transition-colors"
                >
                  Discuss with Bytebly Experts ➔
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </main>
  )
}
