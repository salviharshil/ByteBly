import React, { useState } from 'react'
import { ASSETS } from '../constants/assets'

interface HeaderProps {
  currentPage: string
  onNavigate: (page: string) => void
  onOpenDrawer: () => void
  variant?: 'default' | 'with-button'
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenDrawer,
  variant = 'with-button',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ]

  const handleNavClick = (id: string) => {
    onNavigate(id)
    setMobileMenuOpen(false)
  }

  return (
    <header className="relative w-full z-40 bg-transparent">
      <div className="w-full py-4 lg:py-5">
        <div className="items-center flex flex-wrap w-full justify-between max-w-[1140px] px-4 mx-auto">
          {/* Logo */}
          <div className="cursor-pointer" onClick={() => handleNavClick('home')}>
            <img
              src={ASSETS.logoDark}
              alt="Bytebly"
              className="h-[72px] sm:h-[80px] w-auto object-contain dark:hidden"
            />
            <img
              src={ASSETS.logoWhite}
              alt="Bytebly"
              className="h-[72px] sm:h-[80px] w-auto object-contain hidden dark:block"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id || (item.id === 'about' && currentPage === 'about')
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-6 px-3.5 text-[15px] leading-[170%] capitalize font-barlow font-semibold transition-colors flex items-center cursor-pointer ${
                    isActive
                      ? 'text-[#04000B] dark:text-[#C9F31D] font-bold'
                      : 'text-[#232323] dark:text-[#E7E7E7] hover:text-[#04000B] dark:hover:text-[#C9F31D]'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* Right Action: Button or Hamburger Drawer Trigger */}
          <div className="flex items-center gap-4">
            {variant === 'with-button' ? (
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center py-2.5 px-6 sm:py-3 sm:px-8 rounded-[10px] bg-[#C9F31D] text-[#04000B] font-barlow font-bold text-[14px] sm:text-[15px] hover:bg-[#ADD40C] transition-all transform active:scale-95 shadow-sm hover:shadow-md cursor-pointer"
              >
                Get in touch
              </button>
            ) : null}

            {/* Hamburger Icon button */}
            <button
              onClick={onOpenDrawer}
              aria-label="Open Navigation Drawer"
              className="p-2.5 flex flex-col justify-center items-end gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span className="h-[2px] w-6 bg-[#04000B] dark:bg-white rounded-full transition-all" />
              <span className="h-[2px] w-8 bg-[#04000B] dark:bg-white rounded-full transition-all" />
              <span className="h-[2px] w-4 bg-[#04000B] dark:bg-white rounded-full transition-all" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-2xl text-[#232323] dark:text-white"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden w-full bg-white dark:bg-[#0E0F11] border-b border-[#E7E7E7] px-6 py-4 shadow-lg animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => handleNavClick('home')}
                className={`text-left text-base font-semibold py-2 border-b border-[#F2F3EF] dark:border-[#222] ${
                  currentPage === 'home' ? 'text-[#C9F31D]' : 'text-[#04000B] dark:text-white'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className={`text-left text-base font-semibold py-2 border-b border-[#F2F3EF] dark:border-[#222] ${
                  currentPage === 'about' ? 'text-[#C9F31D]' : 'text-[#04000B] dark:text-white'
                }`}
              >
                About Company
              </button>
              <button
                onClick={() => handleNavClick('services')}
                className={`text-left text-base font-semibold py-2 border-b border-[#F2F3EF] dark:border-[#222] ${
                  currentPage === 'services' ? 'text-[#C9F31D]' : 'text-[#04000B] dark:text-white'
                }`}
              >
                Our Services
              </button>
              <button
                onClick={() => handleNavClick('projects')}
                className={`text-left text-base font-semibold py-2 border-b border-[#F2F3EF] dark:border-[#222] ${
                  currentPage === 'projects' ? 'text-[#C9F31D]' : 'text-[#04000B] dark:text-white'
                }`}
              >
                Projects & Case Studies
              </button>
              <button
                onClick={() => handleNavClick('blog')}
                className={`text-left text-base font-semibold py-2 border-b border-[#F2F3EF] dark:border-[#222] ${
                  currentPage === 'blog' ? 'text-[#C9F31D]' : 'text-[#04000B] dark:text-white'
                }`}
              >
                Blog & Insights
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className={`text-left text-base font-semibold py-2 ${
                  currentPage === 'contact' ? 'text-[#C9F31D]' : 'text-[#04000B] dark:text-white'
                }`}
              >
                Contact Us
              </button>
              <div className="pt-2">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full text-center py-3 rounded-md bg-[#C9F31D] text-[#04000B] font-bold"
                >
                  Get in touch
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
