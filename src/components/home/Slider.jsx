import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

/**
 * Testimonials Slider – 2025 Edition
 * - Auto-play
 * - Soft transitions
 * - Glassmorphism card
 * - Premium agency look
 */

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    company: "Trendify Co.",
    rating: 5,
    quote:
      "ByteBly transformed our online presence with a stunning Shopify store. Sales increased 300% within the first quarter!"
  },
  {
    name: "David Chen",
    company: "DevStream",
    rating: 5,
    quote:
      "Their MERN expertise helped us build a highly scalable platform. The technical depth and execution were outstanding."
  },
  {
    name: "Elena Rodriguez",
    company: "PixelPoint",
    rating: 5,
    quote:
      "From Figma to a live website in record time. Every detail was handled with care and precision."
  },
  {
    name: "Marcus Thorne",
    company: "FutureLabs",
    rating: 5,
    quote:
      "The 3D motion and interaction design elevated our brand beyond expectations."
  },
  {
    name: "Liam O'Connor",
    company: "EcoSphere",
    rating: 5,
    quote:
      "Professional, creative, and fast. The final WordPress site was both beautiful and blazing fast."
  }
];

const variants = {
  enter: (direction) => ({
    opacity: 0,
    y: direction > 0 ? 30 : -30,
    scale: 0.96
  }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  exit: (direction) => ({
    opacity: 0,
    y: direction < 0 ? 30 : -30,
    scale: 0.96
  })
};

export default function Slider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6500);
    return () => clearInterval(timer);
  }, [next]);

  const testimonial = TESTIMONIALS[index];

  return (
    <section className="relative py-28 px-6 bg-white/[0.02] overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute inset-0 flex justify-center items-center -z-10">
        <div className="w-[480px] h-[480px] bg-primary/10 blur-[140px] rounded-full opacity-40" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Icon */}
        <div className="flex justify-center mb-10">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="p-4 rounded-full border border-primary/20 bg-primary/10"
          >
            <Quote className="text-primary" size={28} />
          </motion.div>
        </div>

        {/* Slider Card */}
        <div className="relative min-h-[320px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.6,
                ease: "easeOut"
              }}
              className="w-full"
            >
              <div
                className="relative mx-auto max-w-3xl text-center
                           rounded-3xl p-10 md:p-12
                           bg-white/[0.03] backdrop-blur-xl
                           border border-white/10"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xl md:text-2xl font-light italic text-white/90 leading-relaxed mb-8">
                  “{testimonial.quote}”
                </p>

                {/* Author */}
                <div>
                  <h4 className="text-lg font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="text-primary text-sm uppercase tracking-widest mt-1">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-10 mt-14">
          <motion.button
            whileHover={{ scale: 1.2, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={prev}
            aria-label="Previous testimonial"
            className="p-3 rounded-full backdrop-blur bg-white/5
                       border border-white/10 hover:border-primary/40
                       transition-colors"
          >
            <ChevronLeft size={22} />
          </motion.button>

          {/* Indicators */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300
                  ${i === index
                    ? "w-8 bg-primary"
                    : "w-2 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.2, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={next}
            aria-label="Next testimonial"
            className="p-3 rounded-full backdrop-blur bg-white/5
                       border border-white/10 hover:border-primary/40
                       transition-colors"
          >
            <ChevronRight size={22} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}