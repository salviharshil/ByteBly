import React from 'react';
import Transition from '../components/ui/Transition';
import Services from '../components/home/Services'; // Reusing your existing component logic
import { motion } from 'framer-motion';

export default function ServicesPage() {
  return (
    <Transition>
      <main className="relative pt-32 pb-20 px-6 min-h-screen bg-darkBg">
        <div className="max-w-7xl mx-auto">
          <Services />
          {/* Page Header */}
          {/* <div className="mb-20">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl font-bold font-heading mb-6"
            >
              Our <span className="text-gradient">Expertise</span>
            </motion.h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              We push the boundaries of digital possibility. From high-performance MERN applications 
              to immersive 3D web experiences and conversion-focused Shopify stores.
            </p>
          </div> */}

          {/* The Grid Component */}
          
          
          {/* Detailed breakdown or "How we work" section could go here */}
        </div>
      </main>
    </Transition>
  );
}