import { motion } from "framer-motion";
import { GraduationCap, MapPin, Code2, Sparkles, Layers, Cpu } from "lucide-react";
import { aboutData } from "../data/portfolioData";

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
          <h2 className="section-title">{aboutData.heading}</h2>
        </motion.div>

        <div className="bento-grid">
          <motion.div
            className="glass-card bento-card bento-narrative"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bento-card-label">Developer Profile</div>
            <div className="bento-paragraphs">
              {aboutData.paragraphs.map((paragraph, index) => (
                <p key={index} className="about-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bento-facts-grid"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            {aboutData.highlights.map((item, idx) => {
              const Icon = highlightIcons[idx % highlightIcons.length];
              return (
                <div key={item.label} className="glass-card bento-fact-card">
                  <div className="highlight-icon">
                    <Icon size={19} />
                  </div>
                  <div>
                    <span className="highlight-label">{item.label}</span>
                    <p className="highlight-value">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {engineeringPillars.map((pillar, idx) => {
            const PillarIcon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                className="glass-card bento-card bento-pillar"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.12 + idx * 0.06 }}
              >
                <div className="bento-pillar-header">
                  <div className="highlight-icon">
                    <PillarIcon size={19} />
                  </div>
                  <h3 className="bento-pillar-title">{pillar.title}</h3>
                </div>
                <p className="bento-pillar-detail">{pillar.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default About;
