import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, FileCheck2 } from "lucide-react";
import { certificatesData } from "../data/portfolioData";

function CertificateCard({ certificate, index }) {
  return (
    <motion.article
      className="glass-card certificate-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {certificate.image ? (
        <div className="certificate-image-wrap">
          <img
            src={certificate.image}
            alt={`${certificate.title} certificate`}
            className="certificate-image"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="certificate-icon-header">
          <Award size={24} />
        </div>
      )}

      <div className="certificate-body">
        <h3 className="certificate-title">{certificate.title}</h3>
        <p className="certificate-issuer">{certificate.issuer}</p>

        <div className="certificate-meta">
          {certificate.date && (
            <span className="certificate-date">
              <Calendar size={14} />
              {certificate.date}
            </span>
          )}
          {certificate.credentialId && (
            <span className="certificate-id">ID: {certificate.credentialId}</span>
          )}
        </div>

        {certificate.verifyUrl && (
          <a
            href={certificate.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
          >
            <ExternalLink size={15} />
            <span>Verify Credential</span>
          </a>
        )}
      </div>
    </motion.article>
  );
}

function Certificates() {
  const hasCertificates = certificatesData.length > 0;

  return (
    <section className="section" id="certificates">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-eyebrow">Certificates</span>
          <h2 className="section-title">Certifications &amp; Credentials</h2>
          <p className="section-subtitle">
            Verified courses, technical certifications, and academic achievements.
          </p>
        </motion.div>

        {hasCertificates ? (
          <div className="certificates-grid">
            {certificatesData.map((cert, index) => (
              <CertificateCard key={cert.id} certificate={cert} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            className="glass-card empty-state-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <div className="empty-state-icon">
              <FileCheck2 size={28} />
            </div>
            <h3 className="empty-state-title">Certificates Section Ready</h3>
            <p className="empty-state-text">
              Verified certificates and credential links are not yet uploaded. Add certificate
              entries (with optional images and verification URLs) to{" "}
              <code>certificatesData</code> in <code>src/data/portfolioData.js</code> to display
              them here.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Certificates;
