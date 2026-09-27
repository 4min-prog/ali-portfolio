import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "min(42vw, 520px)",
          height: "min(42vw, 520px)",
          bottom: "-20%",
          right: "-12%",
          background:
            "radial-gradient(circle, rgba(105,12,55,0.3), rgba(105,12,55,0.08) 45%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{ x: [0, -40, 0], y: [0, -24, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
