import React, { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { OffCanvasMenu } from './components/OffCanvasMenu'
import { ThemeToggle } from './components/ThemeToggle'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ServicesPage } from './pages/ServicesPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { BlogPage } from './pages/BlogPage'
import { ContactPage } from './pages/ContactPage'

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home')
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const [isDark, setIsDark] = useState<boolean>(false)

  // Handle dark mode toggle
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    const setFavicon = (window as unknown as { __setAppFaviconTheme?: (dark: boolean) => void }).__setAppFaviconTheme
    if (typeof setFavicon === 'function') {
      setFavicon(isDark)
    }
  }, [isDark])

  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string | null>(null)
  const [selectedBlogCategory, setSelectedBlogCategory] = useState<string | null>(null)

  const handleNavigate = (page: string, extraParam?: string) => {
    setCurrentPage(page)
    if (page === 'projects') {
      setSelectedProjectTitle(extraParam || null)
    } else {
      setSelectedProjectTitle(null)
    }

    if (page === 'blog') {
      setSelectedBlogCategory(extraParam || null)
    } else {
      setSelectedBlogCategory(null)
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0E0F11] text-[#04000B] dark:text-white transition-colors duration-300 flex flex-col justify-between selection:bg-[#C9F31D] selection:text-[#04000B]">
      <div>
        {/* Header - includes Get in touch button */}
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          variant="with-button"
        />

        {/* Page Content */}
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'services' && <ServicesPage onNavigate={handleNavigate} />}
        {currentPage === 'projects' && (
          <ProjectsPage
            initialProjectTitle={selectedProjectTitle}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'blog' && (
          <BlogPage
            initialCategory={selectedBlogCategory}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
      </div>

      {/* Shared Footer matching design file */}
      <Footer onNavigate={handleNavigate} />

      {/* Off-canvas Navigation Drawer matching JT-0 */}
      <OffCanvasMenu
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Floating Theme Switcher Pill matching JN-0 */}
      <ThemeToggle
        isDark={isDark}
        onToggle={() => setIsDark(!isDark)}
      />
    </div>
  )
}

export default App
