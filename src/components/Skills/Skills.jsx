import { motion } from "framer-motion";
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
import { Webhook, Layout, Server, GitBranch } from "lucide-react";
import { skillCategories } from "../../data/portfolioData";
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

const categoryIconMap = {
  frontend: Layout,
  backend: Server,
  "database-tools": GitBranch,
};

function Skills() {
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
          <h2 className="section-title">Technologies &amp; Tools</h2>
          <p className="section-subtitle">
            Core languages, frameworks, and tools I use to design and build full-stack web
            applications.
          </p>
        </motion.div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => {
            const CategoryIcon = categoryIconMap[category.id] || Layout;
            return (
              <motion.div
                key={category.id}
                className="glass-card skill-category-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
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

                    return (
                      <div key={skill.name} className="skill-pill">
                        {SkillIcon && (
                          <span className="skill-pill-icon" style={{ color: iconColor }}>
                            <SkillIcon size={18} />
                          </span>
                        )}
                        <span className="skill-pill-name">{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;
