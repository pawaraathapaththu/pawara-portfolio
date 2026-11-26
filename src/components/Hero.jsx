import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin, GraduationCap, Info } from "lucide-react";
import { FaGithub, FaLinkedin, FaReact, FaNodeJs, FaPhp, FaDatabase } from "react-icons/fa";
import { personalInfo } from "../data/portfolioData";

const floatingTechIcons = [
  { id: "react", label: "React.js", Icon: FaReact, color: "#38bdf8", className: "orbit-icon-1" },
  { id: "nodejs", label: "Node.js", Icon: FaNodeJs, color: "#4ade80", className: "orbit-icon-2" },
  { id: "php", label: "PHP", Icon: FaPhp, color: "#a78bfa", className: "orbit-icon-3" },
  { id: "mysql", label: "MySQL", Icon: FaDatabase, color: "#22d3ee", className: "orbit-icon-4" },
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
      timeout = setTimeout(() => setIsDeleting(true), 2100);
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

function Hero({ isReady = true }) {
  const typedRole = useTypewriter(personalInfo.animatedRoles);
  const [cvNotice, setCvNotice] = useState(false);

  const handleCvClick = () => {
    if (personalInfo.cvUrl) {
      const link = document.createElement("a");
      link.href = personalInfo.cvUrl;
      link.download = personalInfo.cvFileName || "CV.pdf";
      link.click();
      return;
    }
    setCvNotice((prev) => !prev);
  };

  return (
    <section className="hero-section" id="home">
      <div className="container hero-grid">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {personalInfo.availability.active && (
            <div className="availability-badge">
              <span className="status-dot" aria-hidden="true" />
              <span>{personalInfo.availability.label}</span>
            </div>
          )}

          <p className="hero-greeting">Hello, I&apos;m</p>

          <h1 className="hero-title">
            {personalInfo.firstName}{" "}
            <span className="gradient-text-animated">{personalInfo.lastName}</span>
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
            <a href="#projects" className="btn btn-primary">
              <span>View Projects</span>
              <ArrowRight size={17} />
            </a>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCvClick}
              aria-expanded={!personalInfo.cvUrl ? cvNotice : undefined}
            >
              <Download size={17} />
              <span>Download CV</span>
            </button>

            <a href="#contact" className="btn btn-ghost">
              <Mail size={17} />
              <span>Contact</span>
            </a>
          </div>

          <AnimatePresence>
            {cvNotice && !personalInfo.cvUrl && (
              <motion.div
                className="inline-notice"
                role="status"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
              >
                <Info size={16} />
                <span>
                  CV file not yet uploaded. Add your PDF at <code>public/cv.pdf</code> and set{" "}
                  <code>cvUrl: &quot;/cv.pdf&quot;</code> in <code>src/data/portfolioData.js</code>.
                </span>
              </motion.div>
            )}
          </AnimatePresence>

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

            {personalInfo.social.linkedin ? (
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
            ) : (
              <span
                className="social-pill social-pill-muted"
                title="LinkedIn URL not configured yet"
                aria-label="LinkedIn URL pending"
              >
                <FaLinkedin size={18} />
                <span>LinkedIn (Pending)</span>
              </span>
            )}
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="profile-composition">
            <div className="profile-backdrop-ring" aria-hidden="true" />
            <div className="profile-frame-outer">
              <div className="profile-glow" aria-hidden="true" />
              <div className="profile-ring" aria-hidden="true" />
              <div className="profile-image-container">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.fullName}
                  className="profile-photo"
                />
              </div>
            </div>

            {floatingTechIcons.map((item, idx) => {
              const TechIcon = item.Icon;
              return (
                <motion.div
                  key={item.id}
                  className={`orbit-tech-badge glass-card ${item.className}`}
                  title={item.label}
                  aria-label={item.label}
                  animate={{ y: [0, idx % 2 === 0 ? -7 : 7, 0] }}
                  transition={{
                    duration: 3.6 + idx * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <TechIcon size={20} style={{ color: item.color }} />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
