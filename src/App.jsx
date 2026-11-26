import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { MotionConfig, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Preloader from "./components/Preloader/Preloader";
import BackgroundEffects from "./components/BackgroundEffects/BackgroundEffects";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import { navLinks } from "./data/portfolioData";
import "./App.css";

const About = lazy(() => import("./components/About/About"));
const Education = lazy(() => import("./components/Education/Education"));
const Skills = lazy(() => import("./components/Skills/Skills"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Certificates = lazy(() => import("./components/Certificates/Certificates"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const Footer = lazy(() => import("./components/Footer/Footer"));

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
    document.documentElement.classList.toggle("light", !dark);
    document.documentElement.classList.toggle("dark", dark);
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute("content", dark ? "#070b14" : "#f6f8fc");
    }
    try {
      localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [dark]);

  // Lenis inertial smooth scrolling (respects prefers-reduced-motion)
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = null;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const targetEl = document.querySelector(hash);
      if (!targetEl) return;
      e.preventDefault();
      lenis.scrollTo(targetEl, { offset: -92 });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  // Deterministic scroll spy
  useEffect(() => {
    const sectionIds = navLinks.map((item) => item.id);
    let rafId = null;

    const updateActiveSection = () => {
      rafId = null;
      const navEl = document.querySelector(".navbar-outer");
      const navHeight = navEl ? navEl.getBoundingClientRect().height : 72;
      const triggerOffset = navHeight + 36;

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

        <CustomCursor />

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
          <Suspense fallback={<div className="section" aria-hidden="true" />}>
            <About />
            <Education />
            <Skills />
            <Projects />
            <Certificates />
            <Contact />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </MotionConfig>
  );
}

export default App;
