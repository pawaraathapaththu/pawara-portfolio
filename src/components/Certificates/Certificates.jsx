import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { certificatesData, certificateCategories } from "../../data/certificatesData";
import "./Certificates.css";

function CertificateCard({ certificate, index, onPreview }) {
  return (
    <motion.article
      layout
      className="glass-card cert-card"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
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
          <div className="cert-badges-row">
            <span className="cert-category-badge">{certificate.category}</span>
            {certificate.featured && (
              <span className="cert-featured-badge">
                <Sparkles size={11} aria-hidden="true" />
                <span>Featured</span>
              </span>
            )}
          </div>
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
              <Hash size={11} aria-hidden="true" />
              <span>ID: {certificate.credentialId}</span>
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

function CertificateModal({
  certificate,
  onClose,
  onPrev,
  onNext,
  hasMultiple,
  currentIndex,
  totalCount,
}) {
  const prefersReducedMotion = useReducedMotion();
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!certificate) return undefined;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const getFocusable = () => {
      if (!dialogRef.current) return [];
      return Array.from(
        dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
      if (hasMultiple && e.key === "ArrowLeft") {
        onPrev();
        return;
      }
      if (hasMultiple && e.key === "ArrowRight") {
        onNext();
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
  }, [certificate, onClose, onPrev, onNext, hasMultiple]);

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
        ref={dialogRef}
        className="glass-card cert-modal-dialog"
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 10 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cert-modal-topbar">
          <div>
            <span className="cert-modal-category">
              {certificate.category}
              {hasMultiple ? ` • ${currentIndex + 1} / ${totalCount}` : ""}
            </span>
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
          {hasMultiple && (
            <button
              type="button"
              className="cert-modal-nav cert-modal-prev"
              onClick={onPrev}
              aria-label="Previous certificate"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <motion.img
            key={certificate.id}
            src={certificate.image}
            alt={`${certificate.title} full preview`}
            className="cert-modal-image"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.22 }}
            drag={hasMultiple && !prefersReducedMotion ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (!hasMultiple) return;
              if (info.offset.x < -50) onNext();
              else if (info.offset.x > 50) onPrev();
            }}
          />

          {hasMultiple && (
            <button
              type="button"
              className="cert-modal-nav cert-modal-next"
              onClick={onNext}
              aria-label="Next certificate"
            >
              <ChevronRight size={20} />
            </button>
          )}
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
                <Hash size={13} aria-hidden="true" />
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
  const [activeIndex, setActiveIndex] = useState(null);

  const filteredCertificates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return [...certificatesData]
      .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
      .filter((cert) => {
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

  const handleOpenPreview = useCallback(
    (cert) => {
      const idx = filteredCertificates.findIndex((c) => c.id === cert.id);
      setActiveIndex(idx >= 0 ? idx : 0);
    },
    [filteredCertificates]
  );

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null || filteredCertificates.length === 0) return null;
      return (prev - 1 + filteredCertificates.length) % filteredCertificates.length;
    });
  }, [filteredCertificates.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null || filteredCertificates.length === 0) return null;
      return (prev + 1) % filteredCertificates.length;
    });
  }, [filteredCertificates.length]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  const activeCertificate =
    activeIndex !== null ? filteredCertificates[activeIndex] || null : null;

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
          <h2 className="section-title section-title-decorated">
            <span>Certifications &amp; Credentials</span>
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
                  onClick={() => {
                    setSelectedCategory(category);
                    setActiveIndex(null);
                  }}
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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveIndex(null);
              }}
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
          <motion.div layout className="certificates-grid">
            <AnimatePresence mode="popLayout">
              {filteredCertificates.map((cert, index) => (
                <CertificateCard
                  key={cert.id}
                  certificate={cert}
                  index={index}
                  onPreview={handleOpenPreview}
                />
              ))}
            </AnimatePresence>
          </motion.div>
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
            onClose={() => setActiveIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
            hasMultiple={filteredCertificates.length > 1}
            currentIndex={activeIndex}
            totalCount={filteredCertificates.length}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Certificates;
