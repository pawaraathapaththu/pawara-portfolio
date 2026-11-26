import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { navLinks, personalInfo } from "../data/portfolioData";

function Navbar({ dark, onToggleTheme, activeSection }) {
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
      setScrolled(window.scrollY > 20);
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

  const handleNavClick = () => {
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
          <a href="#home" className="logo-link" aria-label={`${personalInfo.fullName} Home`}>
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
                >
                  <span>{item.label}</span>
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
              className="icon-btn"
              aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
              title={dark ? "Light Mode" : "Dark Mode"}
              onClick={onToggleTheme}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              type="button"
              className="menu-btn"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-nav-menu"
              className="nav-mobile-drawer"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`mobile-nav-link ${isActive ? "active" : ""}`}
                    onClick={handleNavClick}
                  >
                    {item.label}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

export default Navbar;
