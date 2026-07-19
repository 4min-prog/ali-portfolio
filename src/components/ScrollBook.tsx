import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollBook() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const coverRotate = useTransform(scrollYProgress, [0.1, 0.5], [0, -160]);
  const page1Rotate = useTransform(scrollYProgress, [0.15, 0.55], [0, -140]);
  const page2Rotate = useTransform(scrollYProgress, [0.2, 0.6], [0, -120]);
  const page3Rotate = useTransform(scrollYProgress, [0.25, 0.65], [0, -100]);
  const bookY = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const bookOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[50vh] items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y: bookY, opacity: bookOpacity }} className="relative">
        <div
          className="relative"
          style={{
            perspective: "1200px",
            width: 200,
            height: 260,
          }}
        >
          {/* Book base / back cover */}
          <div
            className="absolute inset-0 rounded-r-sm rounded-l-lg"
            style={{
              background:
                "linear-gradient(135deg, var(--primary) 0%, color-mix(in oklab, var(--primary) 70%, black) 100%)",
              boxShadow: "4px 4px 20px rgba(0,0,0,0.3)",
            }}
          />

          {/* Page 3 */}
          <motion.div
            className="absolute inset-0 origin-left rounded-r-sm"
            style={{
              rotateY: page3Rotate,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <div
              className="absolute inset-1 rounded-sm"
              style={{
                background: "linear-gradient(90deg, #f5f0e8 0%, #faf7f2 50%, #f5f0e8 100%)",
                boxShadow: "inset 0 0 15px rgba(0,0,0,0.05)",
              }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-2 p-6">
                <div className="h-1 w-12 rounded-full bg-muted-foreground/20" />
                <div className="h-1 w-16 rounded-full bg-muted-foreground/15" />
                <div className="h-1 w-10 rounded-full bg-muted-foreground/10" />
              </div>
            </div>
          </motion.div>

          {/* Page 2 */}
          <motion.div
            className="absolute inset-0 origin-left rounded-r-sm"
            style={{
              rotateY: page2Rotate,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <div
              className="absolute inset-1 rounded-sm"
              style={{
                background: "linear-gradient(90deg, #f0ebe3 0%, #f8f4ed 50%, #f0ebe3 100%)",
                boxShadow: "inset 0 0 15px rgba(0,0,0,0.05)",
              }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
                <div className="h-1 w-14 rounded-full bg-muted-foreground/20" />
                <div className="h-1 w-18 rounded-full bg-muted-foreground/15" />
                <div className="h-1 w-8 rounded-full bg-muted-foreground/10" />
                <div className="mt-2 h-1 w-12 rounded-full bg-muted-foreground/15" />
              </div>
            </div>
          </motion.div>

          {/* Page 1 */}
          <motion.div
            className="absolute inset-0 origin-left rounded-r-sm"
            style={{
              rotateY: page1Rotate,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <div
              className="absolute inset-1 rounded-sm"
              style={{
                background: "linear-gradient(90deg, #ebe6de 0%, #f5f0e8 50%, #ebe6de 100%)",
                boxShadow: "inset 0 0 15px rgba(0,0,0,0.05)",
              }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
                <div className="font-display text-sm font-semibold tracking-tight text-foreground/80">
                  İlahiyat
                </div>
                <div className="h-px w-10 bg-border" />
                <div className="text-[10px] leading-relaxed text-muted-foreground">
                  Yazma Eser Metin Analizi
                </div>
              </div>
            </div>
          </motion.div>

          {/* Front cover */}
          <motion.div
            className="absolute inset-0 origin-left rounded-l-lg"
            style={{
              rotateY: coverRotate,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <div
              className="absolute inset-0 rounded-l-lg rounded-r-sm"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--primary) 90%, white) 0%, var(--primary) 50%, color-mix(in oklab, var(--primary) 80%, black) 100%)",
                boxShadow: "2px 0 15px rgba(0,0,0,0.2)",
              }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-white/15 text-sm font-bold text-white/90 backdrop-blur-sm">
                  AE
                </div>
                <div className="text-center text-xs font-medium tracking-wide text-white/80">
                  Portföy
                </div>
                <div className="h-px w-8 bg-white/20" />
                <div className="text-[10px] text-white/50">2026</div>
              </div>
            </div>
          </motion.div>

          {/* Book spine shadow */}
          <div
            className="absolute inset-y-0 left-0 w-1 rounded-l-lg"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.15) 100%)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
