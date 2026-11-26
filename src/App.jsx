import { useState, useEffect, useCallback } from "react";
import { MotionConfig, AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader/Preloader";
import BackgroundEffects from "./components/BackgroundEffects/BackgroundEffects";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Education from "./components/Education/Education";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Certificates from "./components/Certificates/Certificates";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import { navLinks } from "./data/portfolioData";
import "./App.css";

function App() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio-theme");
      return saved ? saved === "dark" : true;
    } catch {
      return true;
    }
  });

  const [showPreloader, setShowPreloader] = useState(true);

  const [activeSection, setActiveSection] = useState("home");

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [dark]);

  useEffect(() => {
    const sectionIds = navLinks.map((item) => item.id);
    let rafId = null;

    const updateActiveSection = () => {
      rafId = null;
      const navEl = document.querySelector(".navbar-outer");
      const navHeight = navEl ? navEl.getBoundingClientRect().height : 72;
      const triggerOffset = navHeight + 36;

      // Highlight the last section when scrolled to the bottom of the page
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 24;
      if (atBottom) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      let currentId = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= triggerOffset) {
          currentId = id;
        }
      }
      setActiveSection(currentId);
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className={`portfolio ${dark ? "dark" : "light"}`}>
        <AnimatePresence mode="wait">
          {showPreloader && (
            <Preloader key="preloader" onComplete={handlePreloaderComplete} />
          )}
        </AnimatePresence>

        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <BackgroundEffects />

        <Navbar
          dark={dark}
          onToggleTheme={() => setDark((prev) => !prev)}
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />

        <main id="main-content">
          <Hero isReady={!showPreloader} />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Certificates />
          <Contact />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
