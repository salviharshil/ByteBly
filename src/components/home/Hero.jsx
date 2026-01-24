import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

// 1. Create a motion-enabled Link
const MotionLink = motion.create(Link);

/**
 * Hero Section – 2025 Trend Edition
 * - Smooth parallax
 * - Gradient typography
 * - Glass + neon CTAs
 * - Premium agency feel
 */

export default function Hero() {
  const { scrollY } = useScroll();

  // Parallax transforms
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.92]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Ambient Gradient Orbs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-neonPurple/30 rounded-full blur-[120px]" />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center max-w-6xl mx-auto"
      >
        {/* Floating Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-xs font-semibold tracking-widest uppercase
                     rounded-full border border-primary/40 bg-white/5 backdrop-blur-md text-secondaryCyan"
        >
          ⚡ Next-Gen Web Solutions
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-heading font-extrabold tracking-tight leading-[0.95]
                     text-5xl md:text-7xl lg:text-8xl mb-8"
        >
          We Build
          <span className="block text-gradient mt-2">Digital Experiences</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-12"
        >
          High-performance websites & products using
          <span className="text-white font-medium"> MERN</span>,
          <span className="text-white font-medium"> Shopify</span>,
          <span className="text-white font-medium"> Figma</span> &
          <span className="text-white font-medium"> WordPress</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          {/* Primary CTA */}
          <MotionLink
            to="/contact" // 2. Set the destination
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 35px rgba(99,102,241,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="relative group px-9 py-4 rounded-full font-semibold text-white
                 bg-gradient-to-r from-primary to-neonPurple inline-block
                 transition-shadow shadow-[0_0_30px_rgba(99,102,241,0.45)]"
          >
            <span className="relative z-10">Start a Project</span>
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
                      bg-white/10 transition-opacity"
            />
          </MotionLink>

          {/* Secondary CTA */}
          <MotionLink
            to="/services" // Destination set to services
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-9 py-4 rounded-full font-semibold text-white
                 backdrop-blur-md bg-white/5 border border-white/20
                 transition-all inline-block text-center"
          >
            View Work
          </MotionLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
