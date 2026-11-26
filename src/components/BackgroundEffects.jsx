import { motion } from "framer-motion";

function BackgroundEffects() {
  return (
    <div className="bg-effects" aria-hidden="true">
      <div className="bg-spotlight" />
      <div className="bg-grid" />
      <motion.div
        className="bg-aurora bg-aurora-1"
        animate={{
          x: [0, 36, -20, 0],
          y: [0, -28, 20, 0],
          scale: [1, 1.07, 0.96, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="bg-aurora bg-aurora-2"
        animate={{
          x: [0, -30, 24, 0],
          y: [0, 28, -20, 0],
          scale: [1, 0.94, 1.06, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="bg-aurora bg-aurora-3"
        animate={{
          x: [0, 22, -22, 0],
          y: [0, 18, -24, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export default BackgroundEffects;
