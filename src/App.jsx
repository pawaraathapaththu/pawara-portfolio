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
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
