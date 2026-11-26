import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, AlertCircle, Info, CheckCircle2 } from "lucide-react";
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

function Contact() {
  const [formValues, setFormValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState({ status: "idle", message: "" });

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
    <section className="section" id="contact">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-eyebrow">Contact</span>
          <h2 className="section-title">Get In Touch</h2>
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
              <div>
                <h3 className="contact-card-title">Email</h3>
                {personalInfo.social.email ? (
                  <a href={`mailto:${personalInfo.social.email}`} className="contact-card-link">
                    {personalInfo.social.email}
                  </a>
                ) : (
                  <p className="contact-card-pending">
                    Not yet configured (add in <code>portfolioData.js</code>)
                  </p>
                )}
              </div>
            </div>

            <div className="glass-card contact-card">
              <div className="contact-card-icon">
                <FaGithub size={20} />
              </div>
              <div>
                <h3 className="contact-card-title">GitHub</h3>
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card-link"
                >
                  github.com/pawaraathapaththu
                </a>
              </div>
            </div>

            <div className="glass-card contact-card">
              <div className="contact-card-icon">
                <FaLinkedin size={20} />
              </div>
              <div>
                <h3 className="contact-card-title">LinkedIn</h3>
                {personalInfo.social.linkedin ? (
                  <a
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-card-link"
                  >
                    View LinkedIn Profile
                  </a>
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
              <div>
                <h3 className="contact-card-title">Location</h3>
                <p className="contact-card-text">{personalInfo.location}</p>
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
                <label htmlFor="contact-name">Full Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formValues.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "error-name" : undefined}
                />
                {errors.name && (
                  <span id="error-name" className="field-error" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formValues.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "error-email" : undefined}
                />
                {errors.email && (
                  <span id="error-email" className="field-error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                placeholder="Software Engineering Internship Opportunity"
                value={formValues.subject}
                onChange={handleChange}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "error-subject" : undefined}
              />
              {errors.subject && (
                <span id="error-subject" className="field-error" role="alert">
                  {errors.subject}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Write your message..."
                value={formValues.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "error-message" : undefined}
              />
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
                {submitState.status === "error" && <AlertCircle size={17} />}
                {submitState.status === "unconfigured" && <Info size={17} />}
                {submitState.status === "success" && <CheckCircle2 size={17} />}
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
    </section>
  );
}

export default Contact;
