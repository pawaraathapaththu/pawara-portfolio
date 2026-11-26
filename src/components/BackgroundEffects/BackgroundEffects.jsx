import { motion, useReducedMotion } from "framer-motion";
import "./BackgroundEffects.css";

function BackgroundEffects() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="bg-effects" aria-hidden="true">
      <motion.div
        className="bg-aurora bg-aurora-blue"
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, 32, -18, 0], y: [0, 22, -14, 0], scale: [1, 1.06, 0.96, 1] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="bg-aurora bg-aurora-cyan"
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, -28, 20, 0], y: [0, 24, -18, 0], scale: [1, 0.95, 1.05, 1] }
        }
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="bg-aurora bg-aurora-violet"
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, 22, -22, 0], y: [0, -20, 16, 0], scale: [1, 1.04, 0.97, 1] }
        }
        transition={{ duration: 29, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="bg-noise" />
      <div className="bg-vignette" />
    </div>
  );
}

export default BackgroundEffects;
