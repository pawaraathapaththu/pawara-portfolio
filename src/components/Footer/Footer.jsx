import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import BrandLogo from "../BrandLogo/BrandLogo";
import { navLinks, personalInfo } from "../../data/portfolioData";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);

  const hasEmail = Boolean(personalInfo.social.email && personalInfo.social.email.trim() !== "");
  const hasLinkedIn = Boolean(
    personalInfo.social.linkedin && personalInfo.social.linkedin.trim() !== ""
  );

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 360);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <a href="#home" className="logo-link" aria-label={`${personalInfo.fullName} Home`}>
              <BrandLogo size={32} />
            </a>
            <p className="footer-tagline">
              {personalInfo.fullName} &mdash; {personalInfo.title}
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer Navigation">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="footer-nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="footer-socials">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>

            {hasLinkedIn && (
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
            )}

            {hasEmail && (
              <a
                href={`mailto:${personalInfo.social.email}`}
                className="footer-social-btn"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            )}
          </div>
        </div>

        <div className="container footer-bottom">
          <p>&copy; {currentYear} {personalInfo.fullName}. Crafted with React &amp; Framer Motion.</p>
        </div>
      </footer>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            className="floating-back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.22 }}
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

export default Footer;
