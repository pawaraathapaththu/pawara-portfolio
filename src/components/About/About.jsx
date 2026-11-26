import { motion } from "framer-motion";
import { GraduationCap, MapPin, Code2, Sparkles, Layers, Cpu } from "lucide-react";
import { aboutData } from "../../data/portfolioData";
import "./About.css";

const highlightIcons = [GraduationCap, Sparkles, MapPin, Code2];

const engineeringPillars = [
  {
    icon: Layers,
    title: "Full-Stack Foundations",
    detail: "Connecting responsive React interfaces with PHP/Node.js backends and MySQL schemas.",
  },
  {
    icon: Cpu,
    title: "Real-Time Systems",
    detail: "Event-driven communication and live state updates using Socket.IO and REST APIs.",
  },
];

const KEYWORD_PATTERN =
  /(Bachelor of Information Technology \(BIT\)|University of Moratuwa|full-stack applications|React|RESTful APIs|MySQL|Node\.js|Socket\.IO|Software Engineer)/g;

function HighlightedText({ text }) {
  const parts = text.split(KEYWORD_PATTERN);
  return parts.map((part, idx) =>
    KEYWORD_PATTERN.test(part) ? (
      <span key={idx} className="about-keyword">
        {part}
      </span>
    ) : (
      part
    )
  );
}

function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-eyebrow">{aboutData.eyebrow}</span>
          <h2 className="section-title section-title-decorated">
            <span>{aboutData.heading}</span>
            <motion.span
              className="section-title-underline"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />
          </h2>
        </motion.div>

        <div className="about-two-col">
          <motion.div
            className="glass-card about-narrative-card"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="about-card-label">Developer Profile</div>
            <div className="about-paragraphs">
              {aboutData.paragraphs.map((paragraph, index) => (
                <p key={index} className="about-paragraph">
                  <HighlightedText text={paragraph} />
                </p>
              ))}
            </div>

            <div className="about-info-chips">
              {aboutData.highlights.map((item, idx) => {
                const Icon = highlightIcons[idx % highlightIcons.length];
                return (
                  <div key={item.label} className="about-info-chip">
                    <Icon size={15} aria-hidden="true" />
                    <span className="about-chip-label">{item.label}:</span>
                    <span className="about-chip-value">{item.value}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            className="about-side-column"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {engineeringPillars.map((pillar) => {
              const PillarIcon = pillar.icon;
              return (
                <div key={pillar.title} className="glass-card about-pillar-card">
                  <div className="about-pillar-header">
                    <div className="highlight-icon">
                      <PillarIcon size={20} />
                    </div>
                    <h3 className="about-pillar-title">{pillar.title}</h3>
                  </div>
                  <p className="about-pillar-detail">{pillar.detail}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
