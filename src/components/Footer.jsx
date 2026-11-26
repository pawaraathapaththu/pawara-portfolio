import { ArrowUp, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import BrandLogo from "./BrandLogo";
import { navLinks, personalInfo } from "../data/portfolioData";

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
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

        <div className="footer-right">
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

            {personalInfo.social.linkedin && (
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

            {personalInfo.social.email && (
              <a
                href={`mailto:${personalInfo.social.email}`}
                className="footer-social-btn"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            )}
          </div>

          <button
            type="button"
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
            <span>Top</span>
          </button>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {currentYear} {personalInfo.fullName}. Crafted with React &amp; Framer Motion.</p>
      </div>
    </footer>
  );
}

export default Footer;
