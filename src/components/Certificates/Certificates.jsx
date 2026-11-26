import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  ExternalLink,
  Calendar,
  Download,
  Eye,
  Search,
  X,
  Hash,
  Building2,
} from "lucide-react";
import { certificatesData, certificateCategories } from "../../data/certificatesData";
import "./Certificates.css";

function CertificateCard({ certificate, index, onPreview }) {
  return (
    <motion.article
      className="glass-card cert-card"
      layout
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <div
        className="cert-thumb-wrap"
        onClick={() => onPreview(certificate)}
        role="button"
        tabIndex={0}
        aria-label={`Preview ${certificate.title} certificate`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onPreview(certificate);
          }
        }}
      >
        <img
          src={certificate.image}
          alt={`${certificate.title} certificate preview`}
          className="cert-thumb-img"
          loading="lazy"
        />
        <div className="cert-thumb-overlay">
          <span className="cert-thumb-zoom">
            <Eye size={15} />
            <span>Quick Preview</span>
          </span>
        </div>
      </div>

      <div className="cert-body">
        <div className="cert-header">
          <span className="cert-category-badge">{certificate.category}</span>
          <h3 className="cert-title">{certificate.title}</h3>
          <p className="cert-issuer">
            <Building2 size={14} aria-hidden="true" />
            <span>{certificate.issuer}</span>
          </p>
        </div>

        <p className="cert-description">{certificate.description}</p>

        <div className="cert-meta">
          {certificate.issueDate && (
            <span className="cert-meta-item">
              <Calendar size={13} aria-hidden="true" />
              <span>{certificate.issueDate}</span>
            </span>
          )}
          {certificate.credentialId && (
            <span className="cert-meta-item cert-meta-id">
              <Hash size={13} aria-hidden="true" />
              <span>{certificate.credentialId}</span>
            </span>
          )}
        </div>

        <div className="cert-actions">
          <button
            type="button"
            className="btn btn-primary btn-xs"
            onClick={() => onPreview(certificate)}
          >
            <Eye size={14} />
            <span>View Certificate</span>
          </button>

          {certificate.pdfUrl && (
            <a
              href={certificate.pdfUrl}
              download={certificate.pdfFileName || `${certificate.id}.pdf`}
              className="btn btn-secondary btn-xs"
              aria-label={`Download ${certificate.title} PDF`}
            >
              <Download size={14} />
              <span>Download</span>
            </a>
          )}

          {certificate.verifyUrl && (
            <a
              href={certificate.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-xs"
              aria-label={`Verify ${certificate.title} credential`}
            >
              <ExternalLink size={14} />
              <span>Verify</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function CertificateModal({ certificate, onClose }) {
  useEffect(() => {
    if (!certificate) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <motion.div
      className="cert-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <motion.div
        className="glass-card cert-modal-dialog"
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cert-modal-topbar">
          <div>
            <span className="cert-modal-category">{certificate.category}</span>
            <h3 id="cert-modal-title" className="cert-modal-title">
              {certificate.title}
            </h3>
            <p className="cert-modal-issuer">{certificate.issuer}</p>
          </div>

          <button
            type="button"
            className="cert-modal-close"
            onClick={onClose}
            aria-label="Close certificate preview"
          >
            <X size={20} />
          </button>
        </div>

        <div className="cert-modal-preview">
          <img
            src={certificate.image}
            alt={`${certificate.title} full preview`}
            className="cert-modal-image"
          />
        </div>

        <div className="cert-modal-footer">
          <div className="cert-modal-meta">
            {certificate.issueDate && (
              <span className="cert-meta-item">
                <Calendar size={14} aria-hidden="true" />
                <span>Issued: {certificate.issueDate}</span>
              </span>
            )}
            {certificate.credentialId && (
              <span className="cert-meta-item cert-meta-id">
                <Hash size={14} aria-hidden="true" />
                <span>Credential ID: {certificate.credentialId}</span>
              </span>
            )}
          </div>

          <div className="cert-modal-actions">
            {certificate.pdfUrl && (
              <a
                href={certificate.pdfUrl}
                download={certificate.pdfFileName || `${certificate.id}.pdf`}
                className="btn btn-primary btn-sm"
              >
                <Download size={15} />
                <span>Download PDF</span>
              </a>
            )}
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
        </div>
      </motion.div>
    </motion.div>
  );
}

function Certificates() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCertificate, setActiveCertificate] = useState(null);

  const filteredCertificates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return certificatesData.filter((cert) => {
      const matchesCategory =
        selectedCategory === "All" || cert.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        cert.category.toLowerCase().includes(q) ||
        cert.description.toLowerCase().includes(q) ||
        (cert.credentialId && cert.credentialId.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

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
            Verified technical certifications and completed online programmes from the University of
            Moratuwa and HackerRank.
          </p>
        </motion.div>

        <div className="cert-controls">
          <div className="cert-filter-pills" role="tablist" aria-label="Filter certificates by category">
            {certificateCategories.map((category) => {
              const isActive = selectedCategory === category;
              const count =
                category === "All"
                  ? certificatesData.length
                  : certificatesData.filter((c) => c.category === category).length;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`cert-filter-btn ${isActive ? "active" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <span>{category}</span>
                  <span className="cert-filter-count">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="cert-search-wrap">
            <Search size={16} className="cert-search-icon" aria-hidden="true" />
            <input
              type="search"
              className="cert-search-input"
              placeholder="Search title, issuer, or ID..."
              aria-label="Search certificates"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="cert-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear certificate search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {filteredCertificates.length > 0 ? (
          <div className="certificates-grid">
            {filteredCertificates.map((cert, index) => (
              <CertificateCard
                key={cert.id}
                certificate={cert}
                index={index}
                onPreview={setActiveCertificate}
              />
            ))}
          </div>
        ) : (
          <div className="glass-card cert-empty-state">
            <div className="cert-empty-icon">
              <Award size={26} />
            </div>
            <h3 className="cert-empty-title">No matching certificates</h3>
            <p className="cert-empty-text">
              No certificates matched your current search or category filter.
            </p>
            <button type="button" className="btn btn-secondary btn-sm" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeCertificate && (
          <CertificateModal
            certificate={activeCertificate}
            onClose={() => setActiveCertificate(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Certificates;
