import { useLocation } from "react-router-dom"; // Correct import from react-router-dom
import { AnimatePresence } from "framer-motion"; // Assuming framer-motion is used for animations
import Transition from "../components/ui/Transition";
import Scene from "../components/three/Scene";

import Hero from "../components/home/Hero";
import WhyUs from "../components/home/WhyUs";
import Slider from "../components/home/Slider";

/**
 * Home Page – 2025 Redesign
 * Features:
 * - Persistent Three.js background
 * - Clean section stacking
 * - Page-level transitions
 * - Scroll-safe layering
 *
 * Path: src/pages/Home.jsx
 */

export default function Home() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Transition key={location.pathname}>
        <main className="relative min-h-screen bg-darkBg text-white overflow-x-hidden selection:bg-primary/30">
          
          {/* ---------- 3D Background (Fixed & Optimized) ---------- */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <Scene />
          </div>

          {/* ---------- Page Content ---------- */}
          <div className="relative z-10 flex flex-col">
            
            {/* Hero – First Impression */}
            <Hero />

            {/* Services – Core Offerings */}
            

            {/* Why Us – Authority & Trust */}
            <WhyUs />

            {/* Testimonials / Slider – Social Proof */}
            <Slider />

            {/* Footer spacing / breathing room */}
            <div className="h-24" />
          </div>
        </main>
      </Transition>
    </AnimatePresence>
  );
}