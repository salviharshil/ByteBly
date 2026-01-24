import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth spring physics for the outer circle
  const springConfig = { damping: 20, stiffness: 100, restDelta: 0.001 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveMouse = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 16); // Centering the 32px circle
      cursorY.set(e.clientY - 16);
    };

    const handleHover = (e) => {
      // Check if the element being hovered is a button, link, or has a pointer cursor
      const target = e.target;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovered(isClickable);
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Outer Circle (Lagging/Smooth) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/50 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovered ? 2 : 1,
          backgroundColor: isHovered ? "rgba(0, 102, 255, 0.1)" : "transparent",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 150 }}
      />

      {/* Inner Dot (Instant) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-secondary-cyan rounded-full pointer-events-none z-[10000] hidden md:block"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isHovered ? 0 : 1
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
    </>
  );
}