import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { educationData } from "../../data/portfolioData";
import "./Education.css";

function Education() {
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
          <h2 className="section-title">Academic Background</h2>
          <p className="section-subtitle">
            Formal university education building a strong foundation in software engineering and
            computing.
          </p>
        </motion.div>

        <div className="timeline">
          {educationData.map((edu, index) => (
            <motion.article
              key={edu.id}
              className="timeline-item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="timeline-marker" aria-hidden="true">
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
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
