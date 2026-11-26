import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import "./CustomCursor.css";

function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 260, damping: 24 });
  const ringY = useSpring(cursorY, { stiffness: 260, damping: 24 });

  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return undefined;
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768;
    if (isTouch) return undefined;

    const frame = requestAnimationFrame(() => setEnabled(true));

    const handleMove = (e) => {
      if (e.clientX <= 0 && e.clientY <= 0) return;
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };

    const handleOver = (e) => {
      const target = e.target.closest(
        'a, button, [role="button"], input, textarea, select, label'
      );
      setHovered(Boolean(target));
    };

    const handleOut = (e) => {
      if (!e.relatedTarget) setVisible(false);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [prefersReducedMotion, cursorX, cursorY]);

  if (!enabled || !visible) return null;

  return (
    <div className="custom-cursor-layer" aria-hidden="true">
      <motion.div
        className="cursor-dot"
        style={{ x: cursorX, y: cursorY }}
      />
      <motion.div
        className={`cursor-ring ${hovered ? "is-hovering" : ""}`}
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovered ? 1.55 : 1 }}
        transition={{ duration: 0.18 }}
      />
    </div>
  );
}

export default CustomCursor;
