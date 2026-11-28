import { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaPhp,
  FaDatabase,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import { Webhook, Layout, Server, GitBranch, Sparkles } from "lucide-react";
import {
  skillCategories,
  currentlyLearning,
  professionalSkills,
} from "../../data/portfolioData";
import "./Skills.css";

const skillIconMap = {
  react: { Icon: FaReact, color: "#38bdf8" },
  javascript: { Icon: FaJs, color: "#facc15" },
  html: { Icon: FaHtml5, color: "#fb923c" },
  css: { Icon: FaCss3Alt, color: "#60a5fa" },
  nodejs: { Icon: FaNodeJs, color: "#4ade80" },
  php: { Icon: FaPhp, color: "#a78bfa" },
  api: { Icon: Webhook, color: "#22d3ee" },
  mysql: { Icon: FaDatabase, color: "#38bdf8" },
  git: { Icon: FaGitAlt, color: "#f87171" },
  github: { Icon: FaGithub, color: "#e2e8f0" },
};

const levelPercentMap = {
  Advanced: 0.9,
  Intermediate: 0.72,
  Beginner: 0.45,
};

const categoryIconMap = {
  frontend: Layout,
  backend: Server,
  "database-tools": GitBranch,
};

const marqueeItems = [
  { name: "React.js", iconKey: "react" },
  { name: "JavaScript", iconKey: "javascript" },
  { name: "HTML5", iconKey: "html" },
  { name: "CSS3", iconKey: "css" },
  { name: "Node.js", iconKey: "nodejs" },
  { name: "PHP", iconKey: "php" },
  { name: "MySQL", iconKey: "mysql" },
  { name: "REST APIs", iconKey: "api" },
  { name: "Git", iconKey: "git" },
  { name: "GitHub", iconKey: "github" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const RING_SIZE = 120;
const RING_RADIUS = 48;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function ProfessionalSkillCard({ skill, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return undefined;

    const duration = 1200;
    const delayMs = index * 100;
    let frameId = null;
    let delayTimer = null;

    delayTimer = setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.round(eased * skill.percentage));
        if (progress < 1) {
          frameId = requestAnimationFrame(tick);
        }
      };
      frameId = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      if (delayTimer !== null) clearTimeout(delayTimer);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [isInView, index, skill.percentage, prefersReducedMotion]);

  const finalPercent = prefersReducedMotion ? skill.percentage : displayValue;
  const targetOffset = RING_CIRCUMFERENCE * (1 - skill.percentage / 100);
  const gradId = `profGrad-${index}`;

  return (
    <motion.div
      ref={cardRef}
      className="prof-skill-card"
      tabIndex={0}
      role="group"
      aria-label={`${skill.name} ${skill.percentage} percent`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="prof-ring-wrap">
        <svg
          width={RING_SIZE}
          height={RING_SIZE}
          viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
          className="prof-ring-svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--secondary)" />
            </linearGradient>
          </defs>

          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            className="prof-ring-track"
            strokeWidth="8"
            fill="none"
          />

          <motion.circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            stroke={`url(#${gradId})`}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={RING_CIRCUMFERENCE}
            initial={{
              strokeDashoffset: prefersReducedMotion ? targetOffset : RING_CIRCUMFERENCE,
            }}
            animate={
              isInView
                ? { strokeDashoffset: targetOffset }
                : { strokeDashoffset: prefersReducedMotion ? targetOffset : RING_CIRCUMFERENCE }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 1.2,
              delay: prefersReducedMotion ? 0 : index * 0.1,
              ease: "easeOut",
            }}
            transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
          />
        </svg>

        <span className="prof-ring-value">{finalPercent}%</span>
      </div>

      <span className="prof-skill-label">{skill.name}</span>
    </motion.div>
  );
}

function Skills() {
  const prefersReducedMotion = useReducedMotion();

  const handleCardMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section className="section" id="skills">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-eyebrow">Technical Skills</span>
          <h2 className="section-title section-title-decorated">
            <span>Technologies &amp; Tools</span>
            <motion.span
              className="section-title-underline"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />
          </h2>
          <p className="section-subtitle">
            Core languages, frameworks, and tools I use to design and build full-stack web
            applications.
          </p>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {skillCategories.map((category) => {
            const CategoryIcon = categoryIconMap[category.id] || Layout;
            return (
              <motion.div
                key={category.id}
                className="glass-card skill-category-card"
                variants={cardVariants}
                onMouseMove={handleCardMouseMove}
              >
                <div className="skill-card-spotlight" aria-hidden="true" />

                <div className="skill-category-header">
                  <div className="skill-category-icon">
                    <CategoryIcon size={20} />
                  </div>
                  <div>
                    <h3 className="skill-category-title">{category.title}</h3>
                    <p className="skill-category-desc">{category.description}</p>
                  </div>
                </div>

                <div className="skill-items">
                  {category.skills.map((skill) => {
                    const entry = skillIconMap[skill.iconKey];
                    const SkillIcon = entry?.Icon;
                    const iconColor = entry?.color || "var(--accent)";
                    const fillScale = levelPercentMap[skill.level] || 0.7;

                    return (
                      <div key={skill.name} className="skill-row">
                        <div className="skill-row-top">
                          <div className="skill-row-left">
                            {SkillIcon && (
                              <span className="skill-pill-icon" style={{ color: iconColor }}>
                                <SkillIcon size={18} />
                              </span>
                            )}
                            <span className="skill-pill-name">{skill.name}</span>
                          </div>
                          {skill.level && (
                            <span className={`skill-level-badge level-${skill.level.toLowerCase()}`}>
                              {skill.level}
                            </span>
                          )}
                        </div>
                        <div className="skill-bar-track" aria-hidden="true">
                          <motion.span
                            className="skill-bar-fill"
                            initial={{ scaleX: prefersReducedMotion ? fillScale : 0 }}
                            whileInView={{ scaleX: fillScale }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Professional Skills Row */}
        {professionalSkills && professionalSkills.length > 0 && (
          <div className="prof-skills-block">
            <div className="prof-skills-header">
              <h3 className="prof-skills-heading">Professional Skills</h3>
              <span className="prof-skills-underline" aria-hidden="true" />
            </div>

            <div className="prof-skills-grid">
              {professionalSkills.map((skill, index) => (
                <ProfessionalSkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Infinite Marquee Strip */}
        <div className="skills-marquee-wrap" aria-label="Technology stack marquee">
          <div className="skills-marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => {
              const entry = skillIconMap[item.iconKey];
              const ItemIcon = entry?.Icon;
              const iconColor = entry?.color || "var(--accent)";
              return (
                <div key={`${item.name}-${idx}`} className="marquee-chip">
                  {ItemIcon && <ItemIcon size={16} style={{ color: iconColor }} aria-hidden="true" />}
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Currently Learning Strip */}
        {currentlyLearning && currentlyLearning.length > 0 && (
          <motion.div
            className="glass-card learning-strip"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="learning-label">
              <Sparkles size={16} aria-hidden="true" />
              <span>Currently Learning</span>
            </div>
            <div className="learning-chips">
              {currentlyLearning.map((item) => (
                <span key={item} className="learning-chip">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Skills;
