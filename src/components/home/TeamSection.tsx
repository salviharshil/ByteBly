import React, { useState, useRef, useEffect } from 'react'
import { ASSETS } from '../../constants/assets'
import { ScrollRevealTitle, ScrollRevealBox } from '../common/ScrollRevealTitle'

interface TeamMember {
  name: string
  role: string
  department: string
  image: string
  bio: string
  experience: string
  skills: string[]
  highlights: string[]
  email: string
  linkedin?: string
  github?: string
}

export const TeamSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [hoveredTab, setHoveredTab] = useState<number | null>(null)
  const [hoveredMemberIndex, setHoveredMemberIndex] = useState<number | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const departments = [
    { title: 'CEO & Founder', subtitle: 'Head of department', memberIndex: 0 },
    { title: 'COO', subtitle: 'Managing Director', memberIndex: 1 },
    { title: 'Software Developer', subtitle: 'App Department', memberIndex: 2 },
  ]

  const teamMembers: TeamMember[] = [
    {
      name: 'Harshil Patel',
      role: 'CEO & Founder',
      department: 'Executive Leadership',
      image: ASSETS.team.harshilPatel,
      experience: '3+ Years in Digital Strategy & Executive Leadership',
      bio: "Harshil leads Bytebly with a visionary focus on delivering world-class digital solutions, scalable enterprise web architectures, and high-impact branding. Combining technical foresight with strategic execution, he directs the agency's innovation roadmap and spearheads global client partnerships.",
      skills: [
        'Strategic Leadership',
        'Enterprise Web Architecture',
        'Product Strategy & Roadmap',
        'Brand Acceleration',
        'Global Client Relations',
      ],
      highlights: [
        'Founded and scaled Bytebly into an end-to-end digital agency delivering worldwide impact.',
        'Architected strategic digital roadmaps for enterprise web platforms and client campaigns.',
        'Champions high-velocity engineering standards and customer-centric delivery practices.',
      ],
      email: 'support@bytebly.in',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Harsh Kotadiya',
      role: 'COO',
      department: 'Operations & Management',
      image: ASSETS.team.harshKotadiya,
      experience: '2+ Years in Operations & Agile Delivery',
      bio: 'Harsh oversees operational excellence and organizational workflow at Bytebly. He orchestrates cross-functional engineering, design, and product delivery teams to ensure every project launches on schedule, within scope, and exceeding client expectations.',
      skills: [
        'Operations Management',
        'Agile & Sprint Execution',
        'Workflow Optimization',
        'Resource Planning',
        'Quality Assurance & Delivery',
      ],
      highlights: [
        'Streamlined cross-functional project delivery workflows across design and engineering.',
        'Orchestrates sprint cycles, resource management, and client communication channels.',
        'Maintains zero-delay operational standards across concurrent client engagements.',
      ],
      email: 'support@bytebly.in',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Harsh Shrivas',
      role: 'Full stack - MERN Developer',
      department: 'Fullstack Engineering',
      image: ASSETS.team.harshSrivas,
      experience: '1+ Years in MERN Developer',
      bio: 'Harsh builds robust, secure, and highly scalable server-side systems. He specializes in designing clean REST and GraphQL APIs, resilient microservice architectures, and database performance tuning that keeps Bytebly applications reliable under heavy load.',
      skills: [
        'Node.js & Express',
        'Nextjs & Reactjs',
        'PostgreSQL & MongoDB',
        'RESTful & GraphQL APIs',
        'Git & Github',
      ],
      highlights: [
        'Architected high-throughput backend services maintaining 99.9% uptime guarantees.',
        'Designed optimized relational and NoSQL database schemas with sub-50ms query latency.',
        'Implemented secure JWT authentication, rate limiting, and robust data encryption.',
      ],
      email: 'support@bytebly.in',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
    {
      name: 'Prince Kotadiya',
      role: 'Fullstack Developer',
      department: 'Fullstack Engineering',
      image: ASSETS.team.princeKotadiya,
      experience: '1+ Years in Fullstack Web & Cloud Engineering',
      bio: 'Prince architects end-to-end web applications, bridging intuitive frontend interfaces with scalable backend architectures. He specializes in building comprehensive digital solutions with React, Node.js, TypeScript, and modern databases—delivering high-performance, secure, and responsive products from concept to production.',
      skills: [
        'React.js & Next.js',
        'Node.js & Express',
        'TypeScript',
        'REST & GraphQL APIs',
        'PostgreSQL & MongoDB',
        'Tailwind CSS',
      ],
      highlights: [
        'Architected end-to-end fullstack web platforms with sub-second load times and 99.9% uptime.',
        'Engineered scalable RESTful API backends integrated seamlessly with reactive, modern frontends.',
        'Implemented robust database schemas, secure authentication flows, and automated deployment pipelines.',
      ],
      email: 'support@bytebly.in',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  ]

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)

      const card = sliderRef.current.firstElementChild as HTMLElement
      if (card) {
        const cardWidth = card.offsetWidth + 24
        const currentIdx = Math.round(scrollLeft / cardWidth)
        setActiveIndex(Math.min(teamMembers.length - 1, Math.max(0, currentIdx)))
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
  }, [])

  // Lock body scroll and handle Escape key when modal is open
  useEffect(() => {
    if (selectedMember) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedMember(null)
        }
      }
      window.addEventListener('keydown', handleKeyDown)

      return () => {
        document.body.style.overflow = originalOverflow
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [selectedMember])

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const card = sliderRef.current.firstElementChild as HTMLElement
      const scrollAmount = card ? card.offsetWidth + 24 : 320
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const scrollToIndex = (index: number) => {
    if (sliderRef.current) {
      const items = Array.from(sliderRef.current.children) as HTMLElement[]
      const targetCard = items[index]
      if (targetCard) {
        sliderRef.current.scrollTo({
          left: targetCard.offsetLeft,
          behavior: 'smooth',
        })
      }
    }
  }

  const handleDepartmentClick = (deptIndex: number, memberIndex: number) => {
    setActiveTab(deptIndex)
    scrollToIndex(memberIndex)
  }

  return (
    <section className="py-24 lg:py-32 border-b border-[#DDDDDD] dark:border-[#222] bg-white dark:bg-[#0E0F11]">
      <div className="w-full max-w-[1140px] px-4 mx-auto">
        {/* Header matching 6A-0 */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <div className="inline-block mb-5 py-2 px-7 rounded-[30px] border border-[#CCCCCC] dark:border-gray-600 bg-white/40 dark:bg-white/5">
            <span className="text-[16px] sm:text-[18px] leading-[120%] uppercase font-barlow font-bold text-[#04000B] dark:text-white">
              Team members
            </span>
          </div>

          <ScrollRevealTitle
            lines={['Turn Information Into', 'Actionable Insights']}
            className="text-3xl sm:text-5xl lg:text-[60px] leading-[115%] font-barlow font-semibold text-[#04000B] dark:text-white tracking-tight"
          />
        </div>

        {/* Content Grid */}
        <div className="flex flex-wrap -mx-4 items-start">
          {/* Left Column: Department List */}
          <div className="w-full lg:w-4/12 px-4 mb-10 lg:mb-0 lg:pr-8">
            <div className="flex flex-col space-y-5">
              {departments.map((dept, index) => {
                const isHighlighted =
                  hoveredTab === index ||
                  (hoveredMemberIndex !== null &&
                    (departments[index]?.memberIndex === hoveredMemberIndex ||
                      (hoveredMemberIndex >= 2 && index === 2)))
                return (
                  <ScrollRevealBox key={index} delay={index * 120} yOffset={30}>
                    <button
                      onClick={() => {
                        setActiveTab(index)
                        handleDepartmentClick(index, dept.memberIndex)
                      }}
                      onMouseEnter={() => {
                        setHoveredTab(index)
                        handleDepartmentClick(index, dept.memberIndex)
                      }}
                      onMouseLeave={() => setHoveredTab(null)}
                      className={`w-full text-left py-7 px-8 rounded-[10px] transition-all duration-300 cursor-pointer group ${
                        isHighlighted
                          ? 'bg-[#C9F31D] text-[#04000B] shadow-lg transform scale-102'
                          : 'bg-white dark:bg-[#1A1A1A] text-[#04000B] dark:text-white shadow-[0px_15px_60px_-10px_rgba(109,117,143,0.33)] hover:bg-[#C9F31D] hover:text-[#04000B] hover:shadow-xl hover:scale-102'
                      }`}
                    >
                      <div className="text-[22px] sm:text-[24px] leading-[140%] capitalize font-barlow font-semibold transition-colors">
                        {dept.title}
                      </div>
                      <div
                        className={`text-[16px] sm:text-[18px] leading-[170%] capitalize font-barlow font-medium transition-colors ${
                          isHighlighted ? 'text-[#04000B]' : 'text-[#666666] dark:text-gray-400 group-hover:text-[#04000B]'
                        }`}
                      >
                        {dept.subtitle}
                      </div>
                    </button>
                  </ScrollRevealBox>
                )
              })}
            </div>
          </div>

          {/* Right Column: Member Profile Cards Horizontal Slider */}
          <div className="w-full lg:w-7/12 lg:ml-[8.33333%] px-4 overflow-hidden">
            <ScrollRevealBox delay={180} yOffset={35}>
              {/* Slider Controls Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-[15px] font-barlow font-semibold uppercase tracking-wider text-[#666666] dark:text-gray-400">
                  Team Members ({teamMembers.length})
                </div>
                <div className="flex items-center gap-3">
                <button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  aria-label="Previous member"
                  className="w-11 h-11 rounded-full border border-[#CCCCCC] dark:border-[#333] bg-white dark:bg-[#1A1A1A] text-[#04000B] dark:text-white flex items-center justify-center hover:bg-[#C9F31D] hover:text-[#04000B] hover:border-[#C9F31D] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm active:scale-95"
                >
                  <span className="text-lg font-bold">←</span>
                </button>
                <button
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  aria-label="Next member"
                  className="w-11 h-11 rounded-full border border-[#CCCCCC] dark:border-[#333] bg-white dark:bg-[#1A1A1A] text-[#04000B] dark:text-white flex items-center justify-center hover:bg-[#C9F31D] hover:text-[#04000B] hover:border-[#C9F31D] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm active:scale-95"
                >
                  <span className="text-lg font-bold">→</span>
                </button>
              </div>
            </div>

            {/* Horizontal Slider Track */}
            <div
              ref={sliderRef}
              className="relative flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-2 -mx-2 px-2 scrollbar-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {teamMembers.map((member, index) => {
                const isSelectedByTab =
                  hoveredMemberIndex === index ||
                  (hoveredTab !== null &&
                    (departments[hoveredTab]?.memberIndex === index ||
                      (index >= 2 && hoveredTab === 2)))
                const matchingDeptIdx = departments.findIndex(
                  (d) => d.memberIndex === index || (index >= 2 && d.memberIndex === 2)
                )

                return (
                  <div
                    key={index}
                    onClick={() => setSelectedMember(member)}
                    onMouseEnter={() => {
                      setHoveredMemberIndex(index)
                      if (matchingDeptIdx !== -1) {
                        setHoveredTab(matchingDeptIdx)
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredMemberIndex(null)
                      setHoveredTab(null)
                    }}
                    className={`shrink-0 w-[280px] sm:w-[calc(50%-12px)] snap-start rounded-[12px] overflow-hidden transition-all duration-300 cursor-pointer ${
                      isSelectedByTab
                        ? 'shadow-2xl ring-2 ring-[#C9F31D] scale-[1.01]'
                        : 'shadow-lg hover:shadow-2xl hover:ring-2 hover:ring-[#C9F31D]'
                    } group`}
                  >
                    {/* Photo container with "+" expand icon button */}
                    <div className="relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full aspect-[13/12] object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* "+" circular button positioned over photo bottom edge */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedMember(member)
                        }}
                        aria-label={`View details for ${member.name}`}
                        title="Click to view details"
                        className="absolute right-8 -bottom-5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C9F31D] rounded-full transition-transform duration-300 hover:scale-110 active:scale-95 group/btn"
                      >
                        <div
                          className={`w-12 h-12 rounded-full bg-white dark:bg-[#0E0F11] border-4 transition-colors ${
                            isSelectedByTab
                              ? 'border-[#C9F31D]'
                              : 'border-[#EFF2E4] dark:border-[#222] group-hover:border-[#C9F31D]'
                          } flex items-center justify-center shadow-md`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full transition-colors flex items-center justify-center font-bold text-base ${
                              isSelectedByTab
                                ? 'bg-[#0E0F11] text-[#C9F31D]'
                                : 'bg-[#0E0F11] dark:bg-white text-white dark:text-[#0E0F11] group-hover:bg-[#0E0F11] group-hover:text-[#C9F31D]'
                            }`}
                          >
                            +
                          </div>
                        </div>
                      </button>
                    </div>

                    {/* Card Name and Role - Highlights to lime green #C9F31D */}
                    <div
                      className={`p-7 pt-9 transition-colors duration-300 ${
                        isSelectedByTab
                          ? 'bg-[#C9F31D] text-[#04000B]'
                          : 'bg-[#EFF2E4] dark:bg-[#1A1A1A] group-hover:bg-[#C9F31D] text-[#04000B] dark:text-white group-hover:text-[#04000B]'
                      }`}
                    >
                      <h4
                        className={`text-[20px] leading-[120%] mb-1 font-barlow font-bold transition-colors ${
                          isSelectedByTab
                            ? 'text-[#04000B]'
                            : 'text-[#04000B] dark:text-white group-hover:text-[#04000B]'
                        }`}
                      >
                        {member.name}
                      </h4>
                      <p
                        className={`text-[17px] leading-[170%] font-barlow font-medium transition-colors ${
                          isSelectedByTab
                            ? 'text-[#04000B]/85'
                            : 'text-[#555555] dark:text-gray-300 group-hover:text-[#04000B]/85'
                        }`}
                      >
                        {member.role}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-2 mt-6">
              {teamMembers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? 'w-7 bg-[#C9F31D]'
                      : 'w-2 bg-[#CCCCCC] dark:bg-[#333] hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </ScrollRevealBox>
        </div>
        </div>
      </div>

      {/* Team Member Full Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          {/* Backdrop click to dismiss */}
          <div
            className="fixed inset-0"
            onClick={() => setSelectedMember(null)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-3xl bg-white dark:bg-[#16171B] rounded-[24px] shadow-2xl overflow-hidden border border-[#E7E7E7] dark:border-white/10 z-10 max-h-[92vh] flex flex-col my-auto">
            {/* Top Bar with department badge and close button */}
            <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-[#16171B]/95 backdrop-blur-md z-20">
              <div className="flex items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full bg-[#C9F31D] text-[#04000B] font-barlow font-bold text-xs uppercase tracking-wider">
                  {selectedMember.department}
                </span>
                <span className="hidden sm:inline-block text-xs font-barlow font-medium text-gray-500 dark:text-gray-400">
                  {selectedMember.experience}
                </span>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                aria-label="Close modal"
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-[#C9F31D] hover:text-[#04000B] text-gray-700 dark:text-white flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Profile Card Header (Grid) */}
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="relative shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-lg border-2 border-[#C9F31D]/40">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex-1">
                  <span className="inline-block sm:hidden text-xs font-barlow font-medium text-[#666] dark:text-gray-400 mb-1">
                    {selectedMember.experience}
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-barlow font-bold text-[#04000B] dark:text-white leading-tight">
                    {selectedMember.name}
                  </h3>
                  <p className="text-lg font-barlow font-semibold text-[#8EB700] dark:text-[#C9F31D] mt-1">
                    {selectedMember.role}
                  </p>
                  <p className="text-sm font-barlow text-[#666666] dark:text-gray-400 mt-1">
                    Bytebly Technologies • {selectedMember.department}
                  </p>

                  {/* Quick Contact & Socials */}
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <a
                      href={`mailto:${selectedMember.email}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#04000B] dark:bg-white text-white dark:text-[#04000B] hover:bg-[#C9F31D] dark:hover:bg-[#C9F31D] hover:text-[#04000B] dark:hover:text-[#04000B] text-sm font-barlow font-semibold transition-all duration-200"
                    >
                      <span>✉</span>
                      <span>{selectedMember.email}</span>
                    </a>
                    {selectedMember.linkedin && (
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-[#0077b5] hover:text-white text-gray-700 dark:text-gray-300 text-sm font-barlow font-medium transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                    {selectedMember.github && (
                      <a
                        href={selectedMember.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-[#333] hover:text-white text-gray-700 dark:text-gray-300 text-sm font-barlow font-medium transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* About / Bio */}
              <div className="bg-[#F8F9F5] dark:bg-[#111215] rounded-2xl p-5 sm:p-6 border border-gray-100 dark:border-white/5">
                <h4 className="text-xs sm:text-sm font-barlow font-bold uppercase tracking-wider text-[#04000B] dark:text-white mb-2">
                  About & Background
                </h4>
                <p className="text-base sm:text-[17px] font-barlow text-[#555] dark:text-gray-300 leading-relaxed">
                  {selectedMember.bio}
                </p>
              </div>

              {/* Core Expertise / Skills */}
              <div>
                <h4 className="text-xs sm:text-sm font-barlow font-bold uppercase tracking-wider text-[#04000B] dark:text-white mb-3">
                  Core Expertise & Key Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-[#1F2024] border border-gray-200 dark:border-white/10 text-sm font-barlow font-medium text-[#04000B] dark:text-gray-200 shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Impact & Responsibilities */}
              <div>
                <h4 className="text-xs sm:text-sm font-barlow font-bold uppercase tracking-wider text-[#04000B] dark:text-white mb-3">
                  Key Responsibilities & Highlights
                </h4>
                <div className="space-y-2.5">
                  {selectedMember.highlights.map((highlight, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#1A1A1E] border border-gray-100 dark:border-white/5"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#C9F31D] text-[#04000B] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="text-sm sm:text-base font-barlow text-[#444] dark:text-gray-300">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
