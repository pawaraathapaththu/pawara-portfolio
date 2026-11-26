import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./Preloader.css";

const TERMINAL_STEPS = [
  { threshold: 0, text: "Initializing portfolio..." },
  { threshold: 25, text: "Loading components..." },
  { threshold: 58, text: "Preparing experience..." },
  { threshold: 90, text: "Ready. Welcome!" },
];

const AMBIENT_PARTICLES = [
  { id: 1, left: "12%", top: "22%", size: 3, duration: 5.2, delay: 0 },
  { id: 2, left: "24%", top: "74%", size: 2, duration: 6.4, delay: 0.4 },
  { id: 3, left: "38%", top: "16%", size: 2.5, duration: 5.8, delay: 0.2 },
  { id: 4, left: "64%", top: "18%", size: 3, duration: 6.1, delay: 0.5 },
  { id: 5, left: "78%", top: "30%", size: 2, duration: 5.0, delay: 0.1 },
  { id: 6, left: "86%", top: "72%", size: 3, duration: 6.6, delay: 0.3 },
  { id: 7, left: "18%", top: "52%", size: 2, duration: 5.5, delay: 0.6 },
  { id: 8, left: "72%", top: "82%", size: 2.5, duration: 5.9, delay: 0.2 },
  { id: 9, left: "48%", top: "86%", size: 2, duration: 6.2, delay: 0.4 },
  { id: 10, left: "90%", top: "46%", size: 2.5, duration: 5.4, delay: 0.1 },
];

function getStatusMessage(progress) {
  let current = TERMINAL_STEPS[0].text;
  for (const step of TERMINAL_STEPS) {
    if (progress >= step.threshold) {
      current = step.text;
    }
  }
  return current;
}

function Preloader({ onComplete }) {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(prefersReducedMotion ? 100 : 0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        onComplete();
      }, 320);
      return () => clearTimeout(timer);
    }

    const durationMs = 1280;
    let frameId = null;
    let finishTimer = null;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const ratio = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - ratio, 2.2);
      const nextValue = Math.round(eased * 100);
      setProgress(nextValue);

      if (ratio < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        finishTimer = setTimeout(() => {
          onComplete();
        }, 180);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      if (finishTimer !== null) clearTimeout(finishTimer);
    };
  }, [onComplete, prefersReducedMotion]);

  const statusText = getStatusMessage(progress);

  return (
    <motion.div
      className="preloader-overlay"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      initial={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: prefersReducedMotion ? 1 : 1.04,
        transition: { duration: prefersReducedMotion ? 0.2 : 0.42, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <div className="preloader-grid" aria-hidden="true" />
      <div className="preloader-aurora preloader-aurora-cyan" aria-hidden="true" />
      <div className="preloader-aurora preloader-aurora-violet" aria-hidden="true" />

      {!prefersReducedMotion && <div className="preloader-scanline" aria-hidden="true" />}

      {!prefersReducedMotion && (
        <div className="preloader-particles" aria-hidden="true">
          {AMBIENT_PARTICLES.map((p) => (
            <motion.span
              key={p.id}
              className="preloader-particle"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -14, 0],
                opacity: [0.2, 0.65, 0.2],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <div className="preloader-center">
        <motion.div
          className="preloader-emblem-stage"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="orbital-ring orbital-ring-1" aria-hidden="true">
            <span className="orbit-particle orbit-particle-cyan" />
          </div>
          <div className="orbital-ring orbital-ring-2" aria-hidden="true">
            <span className="orbit-particle orbit-particle-violet" />
          </div>
          <div className="orbital-ring orbital-ring-3" aria-hidden="true">
            <span className="orbit-particle orbit-particle-blue" />
          </div>

          <motion.div
            className="preloader-logo-box"
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    scale: [1, 1.035, 1],
                  }
            }
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="preloader-logo-glow" aria-hidden="true" />
            <span className="preloader-monogram" aria-hidden="true">
              <span className="monogram-bracket">&lt;</span>
              <span className="monogram-letters">PA</span>
              <span className="monogram-bracket">/&gt;</span>
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="preloader-identity"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
        >
          <h1 className="preloader-name">
            Pawara <span className="gradient-text-animated">Athapaththu</span>
          </h1>
          <p className="preloader-subtitle">ASPIRING SOFTWARE ENGINEER</p>
        </motion.div>

        <motion.div
          className="preloader-terminal-panel"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18, ease: "easeOut" }}
        >
          <div className="preloader-terminal-row">
            <div className="preloader-terminal-status">
              <span className="terminal-prompt" aria-hidden="true">&gt;</span>
              <span className="terminal-message">{statusText}</span>
              <span className="terminal-cursor" aria-hidden="true" />
            </div>
            <span className="preloader-percent">{progress}%</span>
          </div>

          <div
            className="preloader-progress-track"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="preloader-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Preloader;
