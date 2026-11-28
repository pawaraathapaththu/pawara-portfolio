import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../../data/portfolioData";
import "./Preloader.css";

const RING_SIZE = 132;
const RING_RADIUS = 62;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const MIN_DURATION_MS = 2200;
const SAFETY_TIMEOUT_MS = 5000;

function preloadImage(src) {
  if (!src || typeof Image === "undefined") {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
    if (img.complete) {
      resolve();
    }
  });
}

function AnimatedName({ firstName, lastName }) {
  const firstLetters = Array.from(firstName);
  const lastLetters = Array.from(lastName);
  const offset = firstLetters.length + 1;

  return (
    <h1 className="preloader-name" aria-label={`${firstName} ${lastName}`}>
      <span className="preloader-name-first" aria-hidden="true">
        {firstLetters.map((char, idx) => (
          <motion.span
            key={`f-${idx}`}
            className="preloader-letter"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.15 + idx * 0.03, ease: "easeOut" }}
          >
            {char}
          </motion.span>
        ))}
      </span>{" "}
      <span className="preloader-name-last" aria-hidden="true">
        {lastLetters.map((char, idx) => (
          <motion.span
            key={`l-${idx}`}
            className="preloader-letter preloader-letter-gradient"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.25,
              delay: 0.15 + (offset + idx) * 0.03,
              ease: "easeOut",
            }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const assetsReadyRef = useRef(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let frameId = null;
    let finishTimer = null;
    const startTime = performance.now();

    const fontsReady =
      typeof document !== "undefined" && document.fonts?.ready
        ? document.fonts.ready.catch(() => {})
        : Promise.resolve();

    Promise.all([fontsReady, preloadImage(personalInfo.profileImage)]).then(() => {
      if (!cancelled) {
        assetsReadyRef.current = true;
      }
    });

    const tick = (now) => {
      if (cancelled) return;
      const elapsed = now - startTime;

      if (elapsed < MIN_DURATION_MS) {
        const ratio = Math.min(elapsed / MIN_DURATION_MS, 1);
        const eased = 1 - Math.pow(1 - ratio, 2);
        setProgress(Math.round(eased * 90));
        frameId = requestAnimationFrame(tick);
        return;
      }

      if (assetsReadyRef.current || elapsed >= SAFETY_TIMEOUT_MS) {
        setProgress(100);
        finishTimer = setTimeout(() => {
          if (!cancelled) onComplete();
        }, 140);
        return;
      }

      setProgress(90);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (frameId !== null) cancelAnimationFrame(frameId);
      if (finishTimer !== null) clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="preloader-overlay"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      initial={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        y: -20,
        transition: { duration: 0.6, ease: "easeInOut" },
      }}
    >
      <div className="preloader-glow preloader-glow-blue" aria-hidden="true" />
      <div className="preloader-glow preloader-glow-violet" aria-hidden="true" />

      <div className="preloader-center">
        <motion.div
          className="preloader-logo-stage"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.svg
            width={RING_SIZE}
            height={RING_SIZE}
            viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
            className="preloader-ring-svg"
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <defs>
              <linearGradient id="preloaderRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <motion.circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              fill="none"
              stroke="url(#preloaderRingGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              initial={{ strokeDashoffset: RING_CIRCUMFERENCE }}
              animate={{ strokeDashoffset: RING_CIRCUMFERENCE * 0.15 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.svg>

          <div className="preloader-logo-tile">
            <span className="preloader-monogram" aria-hidden="true">
              <span className="monogram-bracket">&lt;</span>
              <span className="monogram-letters">{personalInfo.brandMark}</span>
              <span className="monogram-bracket">/&gt;</span>
            </span>
          </div>
        </motion.div>

        <AnimatedName
          firstName={personalInfo.firstName}
          lastName={personalInfo.lastName}
        />

        <motion.p
          className="preloader-role"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.45 }}
        >
          SOFTWARE ENGINEER
        </motion.p>

        <motion.div
          className="preloader-progress-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <div
            className="preloader-progress-track"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="preloader-progress-fill"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
          <span className="preloader-percent">{progress}%</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Preloader;
