import React, { useState } from 'react'
import { ASSETS } from '../constants/assets'

interface OffCanvasMenuProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (page: string) => void
}

export const OffCanvasMenu: React.FC<OffCanvasMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  if (!isOpen) return null

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 3000)
      setEmail('')
    }
  }

  const handleNav = (page: string) => {
    onNavigate(page)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-[420px] bg-white dark:bg-[#0E0F11] shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideLeft">
          
          <div>
            {/* Header Block matching JT-0 design */}
            <div className="bg-[#0E0F11] py-8 px-8 relative">
              <div className="flex items-center justify-between">
                <img
                  src={ASSETS.logoWhite}
                  alt="Bytebly"
                  className="h-[72px] w-auto object-contain cursor-pointer"
                  onClick={() => handleNav('home')}
                />
                <button
                  onClick={onClose}
                  className="h-9 w-9 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <span className="text-xl leading-none">✕</span>
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="px-8 pt-8 pb-4 border-b border-[#F2F3EF] dark:border-[#222]">
              <h4 className="text-[13px] uppercase tracking-wider text-[#666666] font-bold mb-4">Navigation</h4>
              <div className="flex flex-col space-y-2">
                {[
                  { id: 'home', label: 'Home Page' },
                  { id: 'about', label: 'About Company' },
                  { id: 'services', label: 'Our Services' },
                  { id: 'projects', label: 'Projects & Portfolio' },
                  { id: 'blog', label: 'Blog & Articles' },
                  { id: 'contact', label: 'Contact Us' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className="text-left text-lg font-barlow font-semibold text-[#04000B] dark:text-white hover:text-[#C9F31D] transition-colors py-1 flex items-center justify-between group"
                  >
                    <span>{item.label}</span>
                    <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity text-[#C9F31D]">→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details matching footer */}
            <div className="px-8 py-6 space-y-5">
              <div>
                <div className="text-[15px] uppercase font-barlow font-bold text-[#0E0F11] dark:text-white mb-1">
                  Address
                </div>
                <div className="text-[16px] font-barlow text-[#666666] dark:text-[#AAAAAA]">
                  Ahmedabad, Gujarat, India
                </div>
              </div>

              <div>
                <div className="text-[15px] uppercase font-barlow font-bold text-[#0E0F11] dark:text-white mb-1">
                  Email
                </div>
                <a
                  href="mailto:support@bytebly.in"
                  className="block text-[16px] font-barlow text-[#666666] dark:text-[#AAAAAA] hover:text-[#C9F31D] transition-colors"
                >
                  support@bytebly.in
                </a>
              </div>

              <div>
                <div className="text-[15px] uppercase font-barlow font-bold text-[#0E0F11] dark:text-white mb-1">
                  Contact
                </div>
                <a
                  href="tel:+919484520805"
                  className="block text-[16px] font-barlow text-[#666666] dark:text-[#AAAAAA] hover:text-[#C9F31D] transition-colors"
                >
                  +91 9484520805
                </a>
              </div>
            </div>

            {/* Newsletter Subscription matching KF-0 */}
            <div className="px-8 py-4">
              <h3 className="text-[20px] leading-[120%] font-barlow font-semibold text-[#04000B] dark:text-white mb-4">
                Get Subscribed!
              </h3>
              <form onSubmit={handleSubscribe} className="relative flex">
                <input
                  type="email"
                  required
                  placeholder="Enter your e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 pl-4 pr-16 border border-[#CCCCCC] dark:border-[#333] bg-white dark:bg-[#1A1A1A] text-[#04000B] dark:text-white font-barlow text-base focus:outline-none focus:border-[#04000B]"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-0 w-14 bg-[#C9F31D] flex items-center justify-center hover:bg-[#ADD40C] transition-colors"
                  aria-label="Subscribe"
                >
                  <span className="text-xl transform -rotate-45 font-bold text-[#04000B]">➔</span>
                </button>
              </form>
              {subscribed && (
                <p className="text-xs text-green-600 mt-2 font-semibold">Thank you for subscribing!</p>
              )}
            </div>
          </div>

          {/* Social Icons matching KQ-0 */}
          <div className="px-8 py-6 border-t border-[#F2F3EF] dark:border-[#222]">
            <div className="flex items-center space-x-3">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1CKjbK8r5U/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[#0E0F11] flex items-center justify-center text-white hover:bg-[#C9F31D] hover:text-[#04000B] transition-colors"
                aria-label="Facebook"
              >
                <span className="text-base font-bold">f</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919484520805"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[#0E0F11] flex items-center justify-center text-white hover:bg-[#C9F31D] hover:text-[#04000B] transition-colors group"
                aria-label="WhatsApp"
              >
                <svg
                  className="w-4 h-4 fill-white group-hover:fill-[#04000B] transition-colors"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="#pinterest"
                className="w-11 h-11 rounded-full bg-[#0E0F11] flex items-center justify-center text-white hover:bg-[#C9F31D] hover:text-[#04000B] transition-colors"
                aria-label="Pinterest"
              >
                <span className="text-base font-bold">P</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/bytebly-99863a3a8?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[#0E0F11] flex items-center justify-center text-white hover:bg-[#C9F31D] hover:text-[#04000B] transition-colors"
                aria-label="LinkedIn"
              >
                <span className="text-base font-bold">in</span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/bytebly?rpxt=MWcxNzlmemRrcWptcA=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[#0E0F11] flex items-center justify-center text-white hover:bg-[#C9F31D] hover:text-[#04000B] transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
