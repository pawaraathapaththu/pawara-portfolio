import { useState, useEffect, useMemo, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, Sparkles, Eye, X, CheckCircle2 } from "lucide-react";
import { projectsData, projectCategories } from "../../data/projectsData";
import "./Projects.css";

function ProjectCard({ project, index, onOpenDetails }) {
  const prefersReducedMotion = useReducedMotion();
  const [imageLoaded, setImageLoaded] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 160, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 160, damping: 20 });

  const tiltX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const tiltY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPx = e.clientX - rect.left;
    const yPx = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${xPx}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${yPx}px`);

    if (typeof window !== "undefined" && window.innerWidth >= 901) {
      mouseX.set(xPx / rect.width - 0.5);
      mouseY.set(yPx / rect.height - 0.5);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      layout
      className="glass-card project-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={
        prefersReducedMotion
          ? undefined
          : { rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-cursor-border" aria-hidden="true" />

      <div
        className="project-media"
        onClick={() => onOpenDetails(project)}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${project.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenDetails(project);
          }
        }}
      >
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className={`project-image ${imageLoaded ? "is-loaded" : ""}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="project-media-overlay" aria-hidden="true">
          <span className="project-preview-pill">
            <Eye size={14} />
            <span>Project Details</span>
          </span>
        </div>
      </div>

      <div className="project-content">
        <div className="project-meta-row">
          <span className="project-category">{project.category}</span>
          {project.featured && (
            <span className="featured-badge">
              <Sparkles size={12} aria-hidden="true" />
              Featured
            </span>
          )}
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-summary">{project.summary}</p>

        <div className="project-tech-list">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-actions">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              <ExternalLink size={15} />
              <span>Live Demo</span>
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${project.liveUrl ? "btn-secondary" : "btn-primary"} btn-sm`}
            >
              <FaGithub size={16} />
              <span>GitHub</span>
            </a>
          )}

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onOpenDetails(project)}
          >
            <Eye size={15} />
            <span>Details</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const getFocusable = () => {
      if (!dialogRef.current) return [];
      return Array.from(
        dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      );
    };

    const focusTimer = setTimeout(() => {
      const focusable = getFocusable();
      if (focusable.length > 0) focusable[0].focus();
    }, 20);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusable = getFocusable();
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (previousFocus && typeof previousFocus.focus === "function") {
        previousFocus.focus();
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <motion.div
      className="project-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <motion.div
        ref={dialogRef}
        className="glass-card project-modal-dialog"
        initial={{ opacity: 0, scale: 0.95, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="project-modal-topbar">
          <div>
            <span className="project-category">{project.category}</span>
            <h3 id="project-modal-title" className="project-modal-title">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            className="project-modal-close"
            onClick={onClose}
            aria-label="Close project details"
          >
            <X size={20} />
          </button>
        </div>

        <div className="project-modal-body">
          <div className="project-modal-media">
            <img
              src={project.image}
              alt={`${project.title} full preview`}
              className="project-modal-img"
            />
          </div>

          <p className="project-modal-summary">{project.summary}</p>

          {project.highlights && project.highlights.length > 0 && (
            <ul className="project-modal-highlights">
              {project.highlights.map((item, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  <span>{item}</span>
                </li>
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
        </div>

        <div className="project-modal-footer">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              <ExternalLink size={15} />
              <span>Live Demo</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${project.liveUrl ? "btn-secondary" : "btn-primary"} btn-sm`}
            >
              <FaGithub size={16} />
              <span>View on GitHub</span>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projectsData;
    return projectsData.filter((project) => project.category === selectedCategory);
  }, [selectedCategory]);

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
          <h2 className="section-title section-title-decorated">
            <span>Featured Work</span>
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
            Hands-on web development projects demonstrating full-stack architecture, database
            design, and modern UI engineering.
          </p>
        </motion.div>

        <div className="project-filters" role="tablist" aria-label="Filter projects by category">
          {projectCategories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`project-filter-btn ${isActive ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            );
          })}
        </div>

        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpenDetails={setActiveProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;
