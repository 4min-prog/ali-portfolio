import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../lib/i18n";

const COLORS = ["#C0AC30", "#690C37"];

export default function RotatingText() {
  const { t } = useLanguage();
  const words = t.hero.rotatingTexts;
  const [index, setIndex] = useState(0);
  const [color, setColor] = useState(COLORS[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
      setColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
    }, 2500);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <span className="inline-block h-[1.2em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={`${words[index]}-${color}`}
          className="inline-block"
          style={{ color }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
