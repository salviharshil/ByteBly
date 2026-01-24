import { Link } from "react-router-dom";
import {
  Linkedin,
  Twitter,
  Github,
  Dribbble,
  ArrowUpRight,
  Instagram,
} from "lucide-react";
import { motion } from "framer-motion";

const FOOTER = {
  quickLinks: [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Careers", path: "/career" },
    { name: "Contact", path: "/contact" },
  ],
  services: [
    { name: "MERN Stack", path: "/contact" },
    { name: "Shopify E-commerce", path: "/contact" },
    { name: "Figma to Code", path: "/contact" },
    { name: "WordPress Solutions", path: "/contact" },
  ],
  socials: [
    { icon: Linkedin, url: "https://www.linkedin.com/in/byte-bly-99863a3a8" },
    { icon: Twitter, url: "https://x.com/bytebly" },
    { icon: Github, url: "https://github.com/bytebly" },
    { icon: Instagram, url: "https://www.instagram.com/bytebly/" },
  ],
};

const MotionLink = motion.create(Link);

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#050508] border-t border-white/5 px-6 pt-24 pb-20 overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-primary/10 blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Main Grid - Using justify-items-center to balance columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 mb-24 lg:justify-items-center">
          {/* Brand Section - Stays Left Aligned */}
          <div className="space-y-6 w-full lg:max-w-xs">
           <MotionLink
  to="/"
  onClick={scrollToTop}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="flex items-center gap-2"
>
  <img
    src="/logo.png"
    alt="ByteBly Logo"
    className="h-4 w-auto object-contain"
  />
  <span className="text-2xl font-heading font-extrabold tracking-tight text-white uppercase mt-5">
  YTEBLY
  </span>
</MotionLink>

            <p className="text-gray-500 text-sm leading-relaxed">
              Designing and engineering high-performance digital products for
              forward-thinking brands.
            </p>

            <div className="flex gap-4">
              {FOOTER.socials.map(({ icon: Icon, url }, i) => (
                <motion.a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10
                             text-gray-400 hover:text-primary hover:border-primary/40
                             transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links - Balanced in middle */}
          <div className="w-full lg:w-auto">
            <h4 className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {FOOTER.quickLinks.map((link) => (
                <li key={link.name}>
                  <MotionLink
                    to={link.path}
                    whileHover={{ x: 5 }}
                    className="group flex items-center text-sm text-gray-500
                               hover:text-primary transition-colors"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={14}
                      className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </MotionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - Balanced in middle */}
          <div className="w-full lg:w-auto">
            <h4 className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Services
            </h4>
            <ul className="space-y-4">
              {FOOTER.services.map((item) => (
                <li key={item.name}>
                  <MotionLink
                    to={item.path}
                    whileHover={{ x: 5 }}
                    className="text-sm text-gray-500 hover:text-white transition-colors block w-fit"
                  >
                    {item.name}
                  </MotionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - Balanced Right */}
          <div className="w-full lg:w-auto">
            <h4 className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Get in Touch
            </h4>
            <ul className="space-y-5 text-sm text-gray-500">
              <motion.li
                whileHover={{ x: 5 }}
                className="hover:text-white transition-colors cursor-pointer w-fit"
              >
                hr@bytebly.in
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="hover:text-white transition-colors cursor-pointer w-fit"
              >
                +91 7567551327
              </motion.li>
              <li className="leading-relaxed opacity-80 pt-2">
                Remote-first studio
                <br />
                Serving clients worldwide
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Extra padding from mb-20 and pt-12 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-white/5">
          <p className="text-[11px] uppercase tracking-widest text-gray-600">
            © {new Date().getFullYear()} ByteBly. All rights reserved.
          </p>

          <div className="flex gap-10">
            <MotionLink
              to="/privacy"
              whileHover={{ opacity: 0.7 }}
              className="text-[11px] uppercase tracking-widest text-gray-600 hover:text-white transition-colors"
            >
              Privacy Policy
            </MotionLink>
            <MotionLink
              to="/terms"
              whileHover={{ opacity: 0.7 }}
              className="text-[11px] uppercase tracking-widest text-gray-600 hover:text-white transition-colors"
            >
              Terms of Service
            </MotionLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
