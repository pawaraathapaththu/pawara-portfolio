import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { educationData } from "../../data/portfolioData";
import "./Education.css";

function Education() {
  const timelineRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 82%", "end 55%"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section" id="education">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-eyebrow">Education</span>
          <h2 className="section-title section-title-decorated">
            <span>Academic Background</span>
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
            Formal university education building a strong foundation in software engineering and
            computing.
          </p>
        </motion.div>

        <div ref={timelineRef} className="timeline">
          <div className="timeline-rail-bg" aria-hidden="true" />
          <motion.div
            className="timeline-rail-fill"
            style={prefersReducedMotion ? undefined : { scaleY: lineScaleY }}
            aria-hidden="true"
          />

          {educationData.map((edu, index) => {
            const slideFromX = prefersReducedMotion ? 0 : index % 2 === 0 ? -24 : 24;
            return (
              <motion.article
                key={edu.id}
                className="timeline-item"
                initial={{ opacity: 0, x: slideFromX }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="timeline-marker" aria-hidden="true">
                  <span className="timeline-node-glow" />
                  <GraduationCap size={18} />
                </div>

                <div className="glass-card timeline-card">
                  <div className="timeline-top">
                    <div>
                      <h3 className="timeline-degree">{edu.degree}</h3>
                      <p className="timeline-institution">{edu.institution}</p>
                    </div>

                    <div className="timeline-badges">
                      <span className="badge-pill">
                        <Calendar size={14} />
                        {edu.period}
                      </span>
                      <span className="badge-pill badge-pill-subtle">
                        <MapPin size={14} />
                        {edu.location}
                      </span>
                    </div>
                  </div>

                  <div className="education-status">
                    <CheckCircle2 size={16} />
                    <span>{edu.status}</span>
                  </div>

                  <p className="timeline-description">{edu.description}</p>

                  {edu.focusAreas && edu.focusAreas.length > 0 && (
                    <div className="focus-tags">
                      {edu.focusAreas.map((area) => (
                        <span key={area} className="tech-tag">
                          {area}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Education;
