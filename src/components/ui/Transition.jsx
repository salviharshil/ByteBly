import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 24,
    scale: 0.98,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    y: -20, // Slightly less travel on exit feels more natural
    scale: 1.02, // Scaling "up" on exit creates a "push-through" effect
    filter: 'blur(8px)',
  },
};

const pageTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1], 
};

export default function Transition({ children }) {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      // Use motion.main for better SEO/Semantics
      className="w-full min-h-screen origin-top"
      style={{ willChange: 'transform, opacity, filter' }}
    >
      {children}
    </motion.main>
  );
}