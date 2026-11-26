import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import BrandLogo from "../BrandLogo/BrandLogo";
import { navLinks, personalInfo } from "../../data/portfolioData";
import "./Navbar.css";

const mobileDrawerVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.055,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
  },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
};

function Navbar({ dark, onToggleTheme, activeSection, onSelectSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const handleNavClick = (id) => {
    if (onSelectSection && id) {
      onSelectSection(id);
    }
    setMenuOpen(false);
  };

  return (
    <>
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <header className={`navbar-outer ${scrolled ? "scrolled" : ""}`}>
        <nav className="navbar-floating" aria-label="Primary Navigation">
          <a
            href="#home"
            className="logo-link"
            aria-label={`${personalInfo.fullName} Home`}
            onClick={() => handleNavClick("home")}
          >
            <BrandLogo size={32} />
          </a>

          <div className="nav-links-desktop" role="list">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => handleNavClick(item.id)}
                >
                  <span className="nav-link-label">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="nav-active-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="nav-actions">
            <button
              type="button"
              className="icon-btn theme-toggle-btn"
              aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
              title={dark ? "Light Mode" : "Dark Mode"}
              onClick={onToggleTheme}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={dark ? "sun" : "moon"}
                  className="theme-icon-wrap"
                  initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {dark ? <Sun size={18} /> : <Moon size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <button
              type="button"
              className={`menu-btn ${menuOpen ? "open" : ""}`}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className="hamburger-box" aria-hidden="true">
                <span className="hamburger-line line-1" />
                <span className="hamburger-line line-2" />
                <span className="hamburger-line line-3" />
              </span>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-nav-menu"
              className="nav-mobile-fullscreen"
              variants={mobileDrawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="mobile-drawer-links">
                {navLinks.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.a
                      key={item.id}
                      href={`#${item.id}`}
                      variants={mobileLinkVariants}
                      className={`mobile-nav-link ${isActive ? "active" : ""}`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      <span className="mobile-link-index">0{idx + 1}</span>
                      <span>{item.label}</span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

export default Navbar;
