import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Layers, ShoppingCart, Figma, Globe, ArrowUpRight } from "lucide-react";
import React from "react";

const SERVICES = [
  {
    title: "MERN Stack Development",
    desc: "Architecting scalable, lightning-fast ecosystems. We build robust backends and reactive frontends that handle massive traffic without breaking a sweat.",
    icon: Layers,
    accent: "text-blue-500",
    glow: "from-blue-600/20",
    tag: "Scalable"
  },
  {
    title: "Shopify E-commerce",
    desc: "Turning visitors into customers. We create conversion-optimized Liquid themes and custom headless Shopify builds for the modern merchant.",
    icon: ShoppingCart,
    accent: "text-purple-500",
    glow: "from-purple-600/20",
    tag: "Growth"
  },
  {
    title: "Figma to High-Code",
    desc: "Zero compromise on design. We bridge the gap between Figma and Production, ensuring every pixel, hover state, and transition is frame-perfect.",
    icon: Figma,
    accent: "text-pink-500",
    glow: "from-pink-600/20",
    tag: "Precision"
  },
  {
    title: "WordPress Solutions",
    desc: "Enterprise-grade WordPress. Custom block-based themes and performance-tuned plugins that give you full control over your content.",
    icon: Globe,
    accent: "text-cyan-400",
    glow: "from-cyan-400/20",
    tag: "Performance"
  }
];

// Individual Card Component with 3D Tilt Effect
function ServiceCard({ service, index }) {
  const Icon = service.icon;
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }} // Subtraction of static feel
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative flex flex-col h-full rounded-[2rem] p-10 bg-white/[0.02] border border-white/10 transition-colors duration-500 hover:border-white/20"
    >
      {/* Dynamic Hover Background Gradient */}
      <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${service.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Floating Tag */}
      <span className="relative z-10 w-fit px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-gray-400 mb-8">
        {service.tag}
      </span>

      {/* Icon with Perspective */}
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10 mb-8 w-fit p-4 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10">
        <Icon className={`${service.accent}`} size={32} />
      </div>

      {/* Title & Description */}
      <h3 style={{ transform: "translateZ(30px)" }} className="relative z-10 text-2xl font-heading font-bold mb-4">
        {service.title}
      </h3>

      <p className="relative z-10 text-gray-400 text-sm leading-relaxed mb-10 flex-grow">
        {service.desc}
      </p>

      {/* Premium CTA Link */}
      <div className="relative z-10 mt-auto pt-6 border-t border-white/5">
        <motion.button 
          whileHover={{ x: 5 }} // Moves the whole button slightly right on hover
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/40 group-hover:text-primary transition-colors"
        >
          Explore Service
          <ArrowUpRight size={14} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-dark-bg">
      {/* Animated Background Mesh */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] bg-neon-purple/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]"
            >
              Capabilities
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-heading font-extrabold mt-4"
            >
              Building <span className="text-gradient">Next</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-sm text-gray-400 text-sm leading-relaxed"
          >
            We don't just build websites; we craft digital ecosystems that define the future of your brand.
          </motion.p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
          {SERVICES.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}