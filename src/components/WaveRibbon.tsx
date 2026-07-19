import { motion } from "framer-motion";

export default function WaveRibbon() {
  return (
    <div className="relative w-full overflow-hidden py-6">
      {/* Wave SVG top */}
      <svg
        className="absolute left-0 top-0 h-6 w-full"
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,0 L0,0 Z"
          className="fill-primary/10"
          animate={{
            d: [
              "M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,0 L0,0 Z",
              "M0,20 C240,0 480,40 720,20 C960,0 1200,40 1440,20 L1440,0 L0,0 Z",
              "M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,0 L0,0 Z",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Center ribbon content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.p
          className="text-2xl font-medium tracking-wide text-primary sm:text-3xl"
          style={{ fontFamily: "'Amiri', serif", direction: "rtl" }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </motion.p>
      </div>

      {/* Wave SVG bottom */}
      <svg
        className="absolute bottom-0 left-0 h-6 w-full"
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0,20 C240,0 480,40 720,20 C960,0 1200,40 1440,20 L1440,40 L0,40 Z"
          className="fill-primary/10"
          animate={{
            d: [
              "M0,20 C240,0 480,40 720,20 C960,0 1200,40 1440,20 L1440,40 L0,40 Z",
              "M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,40 L0,40 Z",
              "M0,20 C240,0 480,40 720,20 C960,0 1200,40 1440,20 L1440,40 L0,40 Z",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
