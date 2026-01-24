import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Modern Navbar – 2025 Edition
 * Glassmorphism • Active Indicator • Fullscreen Mobile Drawer
 */

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Career', path: '/career' },
  { name: 'Blog', path: '/blog' },
  // { name: 'Contact', path: '/contact' },
];

// Create motion-enabled Link for internal routing
const MotionLink = motion(Link);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-2xl bg-[#0A0A0F]/80 border-b border-white/10 py-4'
            : 'py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <MotionLink
            to="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-extrabold tracking-tight font-heading hover:opacity-80 transition"
          >
            BYTEBLY
          </MotionLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <ul className="flex gap-8 relative">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.name} className="relative">
                    <MotionLink
                      to={link.path}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`text-sm font-medium transition-colors block ${
                        isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </MotionLink>

                    {/* Active underline */}
                    {isActive && (
                      <motion.span
                        layoutId="activeLink"
                        className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-cyan-400 rounded-full"
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            {/* CTA */}
            <MotionLink
              to="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-cyan-400 text-sm font-bold text-black transition-transform"
            >
              Contact us
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </MotionLink>
          </nav>

          {/* Mobile Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="md:hidden p-2 rounded-lg border border-white/10 bg-white/5"
            aria-label="Open menu"
          >
            <Menu size={26} />
          </motion.button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[110]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              className="fixed inset-0 z-[120] bg-[#0A0A0F] flex flex-col p-8"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <div className="flex justify-between items-center mb-16">
                <span className="text-xl font-bold font-heading">MENU</span>
                <motion.button 
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                >
                  <X size={28} />
                </motion.button>
              </div>

              <div className="flex flex-col gap-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <MotionLink
                      to={link.path}
                      whileHover={{ x: 10, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-4xl font-extrabold font-heading hover:text-primary transition inline-block"
                    >
                      {link.name}
                    </MotionLink>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto">
                <MotionLink
                  to="/contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block text-center py-4 rounded-2xl bg-gradient-to-r from-primary to-cyan-400 text-black font-bold text-lg"
                >
                  Start a Project
                </MotionLink>

                <p className="mt-6 text-sm text-gray-500">
                  contact@bytebly.com
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}