import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Download, Mail, MapPin, GraduationCap } from "lucide-react";
import { FaGithub, FaLinkedin, FaReact, FaNodeJs, FaPhp, FaDatabase } from "react-icons/fa";
import {
  personalInfo,
  projectsData,
  certificatesData,
  START_YEAR,
} from "../../data/portfolioData";
import HeroParticles from "./HeroParticles";
import "./Hero.css";

const floatingTechIcons = [
  { id: "react", label: "React.js", Icon: FaReact, color: "#38bdf8", armClass: "orbit-arm-1", speed: 3.6 },
  { id: "nodejs", label: "Node.js", Icon: FaNodeJs, color: "#4ade80", armClass: "orbit-arm-2", speed: 4.3 },
  { id: "mysql", label: "MySQL", Icon: FaDatabase, color: "#22d3ee", armClass: "orbit-arm-3", speed: 3.9 },
  { id: "php", label: "PHP", Icon: FaPhp, color: "#a78bfa", armClass: "orbit-arm-4", speed: 4.9 },
];

function useTypewriter(words) {
  const prefersReducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(words[0].length);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting && charIndex < currentWord.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 58);
    } else if (!isDeleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 32);
    } else if (isDeleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((w) => (w + 1) % words.length);
      }, 220);
    }

    return () => clearTimeout(timeout);
  }, [words, wordIndex, charIndex, isDeleting, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return words[0];
  }
  return words[wordIndex].slice(0, charIndex);
}

function CountUpStat({ value, suffix = "", label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return undefined;

    const duration = 900;
    const start = performance.now();
    let frameId = null;

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [isInView, value, prefersReducedMotion]);

  const displayCount = prefersReducedMotion ? value : count;

  return (
    <div ref={ref} className="hero-stat-item">
      <span className="hero-stat-value">
        {displayCount}
        {suffix}
      </span>
      <span className="hero-stat-label">{label}</span>
    </div>
  );
}

function MagneticButton({ children, className, ...props }) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18 });
  const springY = useSpring(y, { stiffness: 260, damping: 18 });

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.18;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.18;
    x.set(dx);
    y.set(dy);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      className={className}
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </motion.a>
  );
}

function Hero({ isReady = true }) {
  const prefersReducedMotion = useReducedMotion();
  const typedRole = useTypewriter(personalInfo.animatedRoles);
  const hasLinkedIn = Boolean(
    personalInfo.social.linkedin && personalInfo.social.linkedin.trim() !== ""
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 22 });

  const tiltX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const tiltY = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);
  const iconParallaxX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const iconParallaxY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  const handleHeroMouseMove = (e) => {
    if (prefersReducedMotion) return;
    if (typeof window !== "undefined" && window.innerWidth < 901) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const yearsLearning = Math.max(1, new Date().getFullYear() - START_YEAR);

  return (
    <section
      className="hero-section"
      id="home"
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
    >
      <HeroParticles />
      <div className="container hero-grid">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {personalInfo.showAvailabilityBadge && personalInfo.availability.active && (
            <div className="availability-badge">
              <span className="status-dot" aria-hidden="true" />
              <span>{personalInfo.availability.label}</span>
            </div>
          )}

          <p className="hero-greeting">Hello, I&apos;m</p>

          <h1 className="hero-title">
            <motion.span
              className="hero-name-word"
              initial={{ opacity: 0, y: 18 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.5, delay: 0.14 }}
            >
              {personalInfo.firstName}
            </motion.span>{" "}
            <motion.span
              className="hero-name-word gradient-text-animated"
              initial={{ opacity: 0, y: 18 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.5, delay: 0.26 }}
            >
              {personalInfo.lastName}
            </motion.span>
          </h1>

          <div className="hero-role-wrapper" aria-live="polite">
            <h2 className="hero-role">
              <span>{typedRole}</span>
              <span className="typing-cursor" aria-hidden="true" />
            </h2>
          </div>

          <p className="hero-description">{personalInfo.heroSummary}</p>

          <div className="hero-meta">
            <span className="hero-meta-item">
              <GraduationCap size={16} />
              BIT, University of Moratuwa
            </span>
            <span className="hero-meta-item">
              <MapPin size={16} />
              {personalInfo.location}
            </span>
          </div>

          <div className="hero-actions">
            <MagneticButton href="#projects" className="btn btn-primary">
              <span>View Projects</span>
              <ArrowRight size={17} />
            </MagneticButton>

            <a
              href={personalInfo.cvUrl || "/cv.pdf"}
              download={personalInfo.cvFileName || "cv.pdf"}
              className="btn btn-secondary"
            >
              <Download size={17} />
              <span>Download CV</span>
            </a>

            <a href="#contact" className="btn btn-ghost">
              <Mail size={17} />
              <span>Contact</span>
            </a>
          </div>

          <div className="hero-stats" aria-label="Portfolio highlights">
            <CountUpStat value={projectsData.length} label="Projects" />
            <div className="hero-stat-divider" aria-hidden="true" />
            <CountUpStat value={certificatesData.length} label="Certificates" />
            <div className="hero-stat-divider" aria-hidden="true" />
            <CountUpStat value={yearsLearning} suffix="+" label="Years Learning" />
          </div>

          <div className="hero-socials">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
              aria-label="GitHub Profile"
            >
              <FaGithub size={18} />
              <span>GitHub</span>
            </a>

            {hasLinkedIn && (
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={18} />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="profile-composition"
            style={
              prefersReducedMotion
                ? undefined
                : { rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }
            }
          >
            <div className="profile-frame-outer">
              <div className="profile-glow" aria-hidden="true" />
              <div className="profile-ring" aria-hidden="true" />
              <div className="profile-image-container">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.fullName}
                  width={460}
                  height={460}
                  loading="eager"
                  fetchPriority="high"
                  className="profile-photo"
                />
              </div>
            </div>

            {floatingTechIcons.map((item, idx) => {
              const TechIcon = item.Icon;
              return (
                <div key={item.id} className={`orbit-arm ${item.armClass}`}>
                  <motion.div
                    className="orbit-tech-badge glass-card"
                    title={item.label}
                    aria-label={item.label}
                    style={
                      prefersReducedMotion
                        ? undefined
                        : { x: iconParallaxX, y: iconParallaxY }
                    }
                  >
                    <motion.span
                      className="orbit-tech-inner"
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : { y: [0, idx % 2 === 0 ? -6 : 6, 0] }
                      }
                      transition={{
                        duration: item.speed,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <TechIcon size={20} style={{ color: item.color }} />
                    </motion.span>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="scroll-down-indicator"
        aria-label="Scroll down to About section"
      >
        <span className="mouse-shell" aria-hidden="true">
          <span className="mouse-dot" />
        </span>
      </a>
    </section>
  );
}

export default Hero;
