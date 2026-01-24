import { motion } from "framer-motion";
import { Users, Zap, Heart, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Creating a motion-enabled version of the Router Link
const MotionLink = motion.create(Link);

/**
 * Why Choose Us – Premium Agency Edition
 * - Glass cards
 * - Oversized numeric accents
 * - Soft entrance animations
 * - High-conversion CTA
 */

const REASONS = [
  {
    id: "01",
    title: "Expert Team",
    desc: "Senior engineers and designers deeply experienced in modern web ecosystems.",
    icon: Users,
    accent: "text-primary",
  },
  {
    id: "02",
    title: "Cutting-Edge Tech",
    desc: "We build with React, Three.js, Node & modern cloud-first tooling.",
    icon: Zap,
    accent: "text-secondaryCyan",
  },
  {
    id: "03",
    title: "Client-First Approach",
    desc: "Your business goals shape every design and engineering decision we make.",
    icon: Heart,
    accent: "text-neonPurple",
  },
  {
    id: "04",
    title: "On-Time Delivery",
    desc: "Agile execution ensures speed without sacrificing quality.",
    icon: Clock,
    accent: "text-pink-500",
  },
];

export default function WhyUs() {
  return (
    <section className="relative py-28 px-6 bg-[#0A0A0F] overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px]
                        -translate-x-1/2 -translate-y-1/2
                        bg-primary/10 blur-[150px] rounded-full opacity-40"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl font-extrabold mb-6"
          >
            Why Choose <span className="text-gradient">ByteBly</span>
          </motion.h2>

          <p className="text-gray-400">
            We don’t just ship websites — we build long-term digital advantages.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-28">
          {REASONS.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                }}
                className="group relative rounded-[2.5rem] p-10
                           bg-white/[0.03] backdrop-blur-xl
                           border border-white/10
                           hover:border-primary/40 transition-all duration-500 cursor-pointer"
              >
                {/* Numeric Accent */}
                <span
                  className="absolute -bottom-6 -right-6 text-[8rem] font-heading font-extrabold
                             text-white/[0.035] group-hover:text-primary/10
                             transition-colors duration-500 pointer-events-none"
                >
                  {item.id}
                </span>

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="mb-6 w-fit p-4 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <Icon size={28} className={item.accent} />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[3rem] p-12 md:p-20 text-center
                     bg-white/[0.04] backdrop-blur-xl
                     border border-primary/20 overflow-hidden"
        >
          {/* CTA Glow */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-primary/10 blur-[120px]" />
          </div>

          <h3 className="text-3xl md:text-5xl font-extrabold mb-10">
            Ready to Build Something
            <span className="block text-gradient mt-2">Exceptional?</span>
          </h3>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <MotionLink
              to="/contact" // Directs user to the contact route
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-full font-semibold text-white
                 bg-gradient-to-r from-primary to-neonPurple
                 transition-shadow inline-block text-center
                 shadow-[0_0_30px_rgba(99,102,241,0.45)]"
            >
              Get Started
            </MotionLink>

            <MotionLink
              to="/career" // Update this to match your route path (e.g., /careers or /career)
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-full font-semibold text-white
                 bg-white/5 border border-white/20
                 transition-all inline-block text-center"
            >
              We’re Hiring
            </MotionLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
