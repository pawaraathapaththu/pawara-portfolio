import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, Layers, Sparkles, ImageIcon, Radio, ShoppingBag } from "lucide-react";
import { projectsData } from "../data/portfolioData";

function ProjectCard({ project, index }) {
  const isSingleFeatured = projectsData.length === 1;

  return (
    <motion.article
      className={`glass-card project-card ${isSingleFeatured ? "project-card-featured" : ""}`}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <div className="project-media">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="project-image"
            loading="lazy"
          />
        ) : (
          <div className="project-showcase-mockup" aria-label="Project UI preview placeholder">
            <div className="mockup-topbar">
              <div className="mockup-dots">
                <span />
                <span />
                <span />
              </div>
              <div className="mockup-address">
                <span>github.com/pawaraathapaththu/{project.id}</span>
              </div>
            </div>

            <div className="mockup-canvas">
              <div className="mockup-hero-banner">
                <span className="mockup-tag">
                  <Layers size={13} />
                  {project.category}
                </span>
                <h4 className="mockup-title">{project.title}</h4>
              </div>

              <div className="mockup-mini-grid">
                <div className="mockup-mini-card">
                  <ShoppingBag size={16} className="mockup-icon-cyan" />
                  <div>
                    <span className="mockup-mini-title">E-Commerce Storefront</span>
                    <span className="mockup-mini-sub">Catalog &amp; Order Flow</span>
                  </div>
                </div>

                <div className="mockup-mini-card">
                  <Radio size={16} className="mockup-icon-purple" />
                  <div>
                    <span className="mockup-mini-title">Live Auction Engine</span>
                    <span className="mockup-mini-sub">Socket.IO Real-Time Bids</span>
                  </div>
                </div>
              </div>

              <div className="mockup-footer-note">
                <ImageIcon size={13} />
                <span>Screenshot preview pending &mdash; add in portfolioData.js</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="project-content">
        <div className="project-meta-row">
          <span className="project-category">{project.category}</span>
          {project.featured && (
            <span className="featured-badge">
              <Sparkles size={13} />
              Featured Project
            </span>
          )}
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-summary">{project.summary}</p>

        {project.highlights && project.highlights.length > 0 && (
          <ul className="project-highlights">
            {project.highlights.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}

        <div className="project-tech-list">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-actions">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              <FaGithub size={17} />
              <span>View on GitHub</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-eyebrow">Projects</span>
          <h2 className="section-title">Featured Work</h2>
          <p className="section-subtitle">
            Hands-on full-stack development projects demonstrating architecture, database design,
            and real-time features.
          </p>
        </motion.div>

        <div className={`projects-grid ${projectsData.length === 1 ? "projects-grid-single" : ""}`}>
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
