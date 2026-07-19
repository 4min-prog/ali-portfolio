import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ScrollBook() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end center"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
    mass: 0.4,
  });

  const coverAngle = useTransform(p, [0, 1], [0, -170]);
  const p1Angle = useTransform(p, [0.05, 1], [0, -145]);
  const p2Angle = useTransform(p, [0.1, 1], [0, -115]);
  const p3Angle = useTransform(p, [0.15, 1], [0, -85]);
  const coverY = useTransform(p, [0, 0.5], [0, -6]);

  return (
    <div ref={ref} className="relative flex h-full items-center justify-center">
      <motion.div style={{ y: coverY }} className="relative">
        <div
          className="relative"
          style={{
            width: "min(260px, 55vw)",
            height: "min(360px, 75vw)",
            perspective: 900,
          }}
        >
          {/* Surface shadow */}
          <div
            className="absolute -bottom-6 left-2 right-2 h-10 rounded-[50%]"
            style={{
              background: "rgba(0,0,0,0.1)",
              filter: "blur(12px)",
            }}
          />

          {/* Back cover */}
          <div
            className="absolute inset-0 rounded-sm"
            style={{
              background: "linear-gradient(145deg, #0d3f73 0%, #082a50 100%)",
              boxShadow: "6px 6px 24px rgba(0,0,0,0.3), 1px 1px 4px rgba(0,0,0,0.15)",
            }}
          />

          {/* Pages stack visual (back) */}
          {[0, 1, 2].map((i) => (
            <div
              key={`stack-${i}`}
              className="absolute rounded-sm"
              style={{
                inset: `${2 + i * 1}px`,
                left: `${2 + i * 1}px`,
                right: 0,
                background: i % 2 === 0 ? "#f5f0e8" : "#ede8df",
                boxShadow: "inset -2px 0 4px rgba(0,0,0,0.04)",
                transform: `translateZ(${-i * 0.5}px)`,
              }}
            />
          ))}

          {/* Right half - visible content underneath */}
          <div
            className="absolute right-0 top-0 flex h-full flex-col justify-between overflow-hidden rounded-r-sm border border-white/10"
            style={{
              width: "50%",
              background: "linear-gradient(150deg, #faf8f5 0%, #f0ebe3 100%)",
              boxShadow: "inset -2px 0 6px rgba(0,0,0,0.04)",
            }}
          >
            <div className="p-5 sm:p-6">
              <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">
                Devam
              </div>
              <div className="mt-2 text-sm font-semibold leading-snug tracking-tight text-foreground/80">
                İdari Ofis
                <br />
                Yönetimi
              </div>
              <div className="mt-3 space-y-1.5">
                {["Doküman Yönetimi", "Kurumsal İletişim", "Ekip Çalışması"].map((t) => (
                  <div
                    key={t}
                    className="flex items-center gap-1.5 text-[10px] text-muted-foreground/60"
                  >
                    <div className="h-px w-1.5 bg-muted-foreground/20" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="px-5 pb-5 text-[9px] text-muted-foreground/30 sm:px-6 sm:pb-6">
              Ali Elömer
            </div>
          </div>

          {/* Left half - rotating pages */}
          <div
            className="absolute left-0 top-0 h-full"
            style={{
              width: "50%",
              transformStyle: "preserve-3d",
              transformOrigin: "right center",
            }}
          >
            {/* Page 3 */}
            <RotatingPage
              angle={p3Angle}
              bg="linear-gradient(150deg, #f0ebe3 0%, #e8e1d6 100%)"
              z={3}
            >
              <div className="p-5 sm:p-6">
                <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">
                  Sertifikalar
                </div>
                <div className="mt-2 text-sm font-semibold tracking-tight text-foreground/80">
                  BTK Akademi
                </div>
                <div className="mt-3 space-y-1.5">
                  {["Excel", "PowerPoint", "Canva"].map((t) => (
                    <div key={t} className="text-[10px] text-muted-foreground/60">
                      • {t}
                    </div>
                  ))}
                </div>
              </div>
            </RotatingPage>

            {/* Page 2 */}
            <RotatingPage
              angle={p2Angle}
              bg="linear-gradient(150deg, #f2ede5 0%, #ebe6dd 100%)"
              z={4}
            >
              <div className="p-5 sm:p-6">
                <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">
                  Diller
                </div>
                <div className="mt-2 text-sm font-semibold tracking-tight text-foreground/80">
                  Türkçe & Arapça
                </div>
                <div className="mt-3 text-[10px] leading-relaxed text-muted-foreground/60">
                  Anadil seviyesinde Türkçe,
                  <br />
                  ileri düzey Arapça.
                </div>
              </div>
            </RotatingPage>

            {/* Page 1 */}
            <RotatingPage
              angle={p1Angle}
              bg="linear-gradient(150deg, #f5f0e8 0%, #ede8df 100%)"
              z={5}
            >
              <div className="p-5 sm:p-6">
                <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">
                  Tercümanlık
                </div>
                <div className="mt-2 text-sm font-semibold tracking-tight text-foreground/80">
                  TR ↔ AR
                </div>
                <div className="mt-3 text-[10px] leading-relaxed text-muted-foreground/60">
                  Yazılı ve sözlü çeviri.
                  <br />
                  Kurumsal iletişim.
                </div>
              </div>
            </RotatingPage>

            {/* Front cover */}
            <motion.div
              className="absolute inset-0 rounded-l-sm"
              style={{
                rotateY: coverAngle,
                transformStyle: "preserve-3d",
                transformOrigin: "right center",
                zIndex: 10,
              }}
            >
              {/* Cover front */}
              <div
                className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-l-sm"
                style={{
                  backfaceVisibility: "hidden",
                  background: "linear-gradient(145deg, #0F4C81 0%, #0b3a63 50%, #082a50 100%)",
                  boxShadow: "2px 0 12px rgba(0,0,0,0.2)",
                }}
              >
                <div className="p-5 sm:p-6">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/12 text-[11px] font-bold text-white/85 backdrop-blur-sm">
                    AE
                  </div>
                </div>
                <div className="px-5 sm:px-6">
                  <div className="text-lg font-bold leading-tight tracking-tight text-white/90 sm:text-xl">
                    Portföy
                  </div>
                  <div className="mt-1 text-[10px] text-white/40">2026</div>
                </div>
                <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                  <div className="h-px w-6 bg-white/15" />
                  <div className="mt-2 text-[9px] text-white/30">Ali Elömer</div>
                </div>
                {/* Cover decorative line */}
                <div
                  className="absolute right-0 top-0 h-full w-px"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 10%, rgba(255,255,255,0.06) 50%, transparent 90%)",
                  }}
                />
              </div>

              {/* Cover back (visible when flipped) */}
              <div
                className="absolute inset-0 rounded-r-sm"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background: "linear-gradient(145deg, #082a50 0%, #061e3a 100%)",
                }}
              />
            </motion.div>

            {/* Spine shadow */}
            <div
              className="absolute right-0 top-0 h-full w-[3px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.08) 100%)",
                transform: "translateX(1px)",
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function RotatingPage({
  angle,
  bg,
  z,
  children,
}: {
  angle: ReturnType<typeof useTransform<number, number>>;
  bg: string;
  z: number;
  children: React.ReactNode;
}) {
  const springAngle = useSpring(angle, {
    stiffness: 50,
    damping: 14,
    mass: 0.5,
  });

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden rounded-l-sm"
      style={{
        rotateY: springAngle,
        transformStyle: "preserve-3d",
        transformOrigin: "right center",
        zIndex: z,
      }}
    >
      {/* Page front */}
      <div
        className="absolute inset-0 flex flex-col"
        style={{
          backfaceVisibility: "hidden",
          background: bg,
          boxShadow: "inset -2px 0 6px rgba(0,0,0,0.04)",
        }}
      >
        {children}
      </div>
      {/* Page back */}
      <div
        className="absolute inset-0 rounded-r-sm"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: bg,
          boxShadow: "inset 2px 0 6px rgba(0,0,0,0.04)",
        }}
      />
    </motion.div>
  );
}
