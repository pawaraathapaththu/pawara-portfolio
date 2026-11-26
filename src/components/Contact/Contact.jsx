import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, AlertCircle, Info, Copy, Check } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { personalInfo } from "../../data/portfolioData";
import "./Contact.css";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function validateForm(values) {
  const errors = {};
  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = "Please enter your full name (at least 2 characters).";
  }
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.subject.trim() || values.subject.trim().length < 3) {
    errors.subject = "Please enter a subject (at least 3 characters).";
  }
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = "Please enter a message (at least 10 characters).";
  }
  return errors;
}

function AnimatedCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
      <motion.path
        d="M8 12.5L10.8 15.2L16.2 9.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.32, delay: 0.18, ease: "easeOut" }}
      />
    </svg>
  );
}

function Contact() {
  const [formValues, setFormValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState({ status: "idle", message: "" });
  const [copiedToast, setCopiedToast] = useState(false);

  const hasEmail = Boolean(personalInfo.social.email && personalInfo.social.email.trim() !== "");
  const hasLinkedIn = Boolean(
    personalInfo.social.linkedin && personalInfo.social.linkedin.trim() !== ""
  );

  useEffect(() => {
    if (!copiedToast) return undefined;
    const timer = setTimeout(() => setCopiedToast(false), 2400);
    return () => clearTimeout(timer);
  }, [copiedToast]);

  const handleCopyEmail = async () => {
    if (!hasEmail) return;
    try {
      await navigator.clipboard.writeText(personalInfo.social.email);
      setCopiedToast(true);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (submitState.status !== "idle") {
      setSubmitState({ status: "idle", message: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitState({
        status: "error",
        message: "Please fix the highlighted fields before submitting.",
      });
      return;
    }

    if (!personalInfo.contactFormEndpoint) {
      setSubmitState({
        status: "unconfigured",
        message:
          "Input validated! Direct form delivery is not active yet because no form endpoint or email integration is configured in src/data/portfolioData.js.",
      });
      return;
    }

    try {
      setSubmitState({ status: "submitting", message: "" });
      const response = await fetch(personalInfo.contactFormEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error("Failed to deliver message.");
      }

      setFormValues(initialForm);
      setSubmitState({
        status: "success",
        message: "Thank you for reaching out! Your message has been sent.",
      });
    } catch {
      setSubmitState({
        status: "error",
        message: "Unable to send message right now. Please try again later.",
      });
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="contact-bg-glow" aria-hidden="true" />

      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-eyebrow">Contact</span>
          <h2 className="section-title section-title-decorated">
            <span>Get In Touch</span>
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
            Open to Software Engineering internship opportunities, collaborative projects, and
            technical conversations.
          </p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info-column"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card contact-card">
              <div className="contact-card-icon">
                <Mail size={20} />
              </div>
              <div className="contact-card-content">
                <h3 className="contact-card-title">Email</h3>
                {hasEmail ? (
                  <div className="contact-email-row">
                    <a href={`mailto:${personalInfo.social.email}`} className="contact-card-link">
                      {personalInfo.social.email}
                    </a>
                    <button
                      type="button"
                      className="copy-email-btn"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      title="Click to copy email"
                    >
                      {copiedToast ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedToast ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                ) : (
                  <p className="contact-card-pending">
                    Not yet configured (add in <code>portfolioData.js</code>)
                  </p>
                )}
              </div>
            </div>

            <div className="glass-card contact-card">
              <div className="contact-card-icon">
                <MapPin size={20} />
              </div>
              <div className="contact-card-content">
                <h3 className="contact-card-title">Location</h3>
                <p className="contact-card-text">{personalInfo.location}</p>
              </div>
            </div>

            <div className="glass-card contact-socials-card">
              <span className="contact-socials-label">Connect Online</span>
              <div className="contact-socials-row">
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-icon-btn"
                  aria-label="GitHub Profile"
                  data-tooltip="GitHub"
                >
                  <FaGithub size={20} />
                </a>

                {hasLinkedIn && (
                  <a
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-icon-btn"
                    aria-label="LinkedIn Profile"
                    data-tooltip="LinkedIn"
                  >
                    <FaLinkedin size={20} />
                  </a>
                )}

                {hasEmail && (
                  <a
                    href={`mailto:${personalInfo.social.email}`}
                    className="contact-social-icon-btn"
                    aria-label="Send Email"
                    data-tooltip="Email"
                  >
                    <Mail size={20} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          <motion.form
            className="glass-card contact-form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="form-row">
              <div className="form-group">
                <div className="floating-field">
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder=" "
                    value={formValues.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "error-name" : undefined}
                  />
                  <label htmlFor="contact-name">Full Name</label>
                </div>
                {errors.name && (
                  <span id="error-name" className="field-error" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="form-group">
                <div className="floating-field">
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder=" "
                    value={formValues.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "error-email" : undefined}
                  />
                  <label htmlFor="contact-email">Email Address</label>
                </div>
                {errors.email && (
                  <span id="error-email" className="field-error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <div className="floating-field">
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder=" "
                  value={formValues.subject}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? "error-subject" : undefined}
                />
                <label htmlFor="contact-subject">Subject</label>
              </div>
              {errors.subject && (
                <span id="error-subject" className="field-error" role="alert">
                  {errors.subject}
                </span>
              )}
            </div>

            <div className="form-group">
              <div className="floating-field">
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder=" "
                  value={formValues.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "error-message" : undefined}
                />
                <label htmlFor="contact-message">Message</label>
              </div>
              {errors.message && (
                <span id="error-message" className="field-error" role="alert">
                  {errors.message}
                </span>
              )}
            </div>

            {submitState.status !== "idle" && submitState.message && (
              <div
                className={`form-status form-status-${submitState.status}`}
                role="status"
                aria-live="polite"
              >
                {submitState.status === "error" && <AlertCircle size={18} />}
                {submitState.status === "unconfigured" && <Info size={18} />}
                {submitState.status === "success" && <AnimatedCheckIcon />}
                <span>{submitState.message}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-submit"
              disabled={submitState.status === "submitting"}
            >
              <Send size={17} />
              <span>
                {submitState.status === "submitting" ? "Sending..." : "Send Message"}
              </span>
            </button>
          </motion.form>
        </div>
      </div>

      <AnimatePresence>
        {copiedToast && (
          <motion.div
            className="copy-toast"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22 }}
          >
            <Check size={16} aria-hidden="true" />
            <span>Email copied</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Contact;
