import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const PAGES = [
  {
    title: "İlahiyat",
    subtitle: "Lisans Derecesi",
    body: "Siirt Üniversitesi\n2026",
    accent: true,
  },
  {
    title: "Yazma Eser\nMetin Analizi",
    subtitle: "Uzman Yardımcılığı",
    body: "El yazması eserlerin okunması,\ntranskripsiyonu ve içerik analizi.\nArapça kaynak taraması.",
  },
  {
    title: "Tercümanlık",
    subtitle: "TR ↔ AR",
    body: "Türkçe ve Arapça arasında\nakıcı yazılı ve sözlü çeviri.\nKurumsal iletişimde deneyim.",
  },
  {
    title: "Ofis\nUygulamaları",
    subtitle: "Microsoft Office & Canva",
    body: "Word, Excel, PowerPoint\nve Canva tasarım araçları.\nİleri düzey kullanıcı.",
  },
  {
    title: "BTK Akademi",
    subtitle: "Sertifikalar",
    body: "Excel Temel Beceriler\nPowerPoint Temel Beceriler\nCanva Uygulamalı",
  },
];

const PAGE_COUNT = PAGES.length;

function BookPage({
  index,
  progress,
  page,
}: {
  index: number;
  progress: ReturnType<typeof useTransform<number, number>>;
  page: (typeof PAGES)[number];
}) {
  const rotateY = useTransform(progress, [0, 1], [0, -180]);
  const pageRotate = useTransform(rotateY, (v) => (v * (index + 1)) / PAGE_COUNT);
  const springRotate = useSpring(pageRotate, {
    mass: 0.8,
    damping: 20,
    stiffness: 80,
  });

  const shadowOpacity = useTransform(springRotate, [-120, 0], [0.25, 0]);
  const springShadow = useSpring(shadowOpacity, { stiffness: 60, damping: 20 });

  return (
    <motion.div
      className="absolute top-0 left-0 h-full origin-left"
      style={{
        width: "50%",
        zIndex: PAGE_COUNT - index,
        rotateY: springRotate,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Front face */}
      <div
        className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-r-lg border border-white/20 p-6 sm:p-8"
        style={{
          backfaceVisibility: "hidden",
          background:
            index === 0
              ? "linear-gradient(135deg, #0F4C81 0%, #0a3560 100%)"
              : index === PAGES.length - 1
                ? "linear-gradient(135deg, #f8f6f3 0%, #efe9df 100%)"
                : `linear-gradient(145deg, #faf8f5 0%, #f2ece3 100%)`,
          boxShadow: "inset -4px 0 8px rgba(0,0,0,0.04)",
        }}
      >
        {page.accent ? (
          <>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/15 text-sm font-bold text-white/90">
                AE
              </div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">Portföy</div>
            </div>
            <div>
              <div className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                {page.title}
              </div>
              <div className="mt-2 text-sm text-white/60">{page.subtitle}</div>
              <div className="mt-4 h-px w-12 bg-white/20" />
              <pre className="mt-4 whitespace-pre-wrap text-xs leading-relaxed text-white/50">
                {page.body}
              </pre>
            </div>
            <div className="text-[10px] text-white/30">2026</div>
          </>
        ) : (
          <>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
                {page.subtitle}
              </div>
              <div className="mt-3 text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl">
                {page.title}
              </div>
            </div>
            <div>
              <div className="mb-4 h-px w-8 bg-border" />
              <pre className="whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
                {page.body}
              </pre>
            </div>
            <div className="text-[10px] text-muted-foreground/40">Ali Elömer</div>
          </>
        )}
      </div>

      {/* Back face */}
      <div
        className="absolute inset-0 rounded-r-lg border border-white/10"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background:
            index === 0
              ? "linear-gradient(135deg, #0a3560 0%, #072844 100%)"
              : `linear-gradient(145deg, #f0ebe3 0%, #e8e1d6 100%)`,
          boxShadow: "inset 4px 0 8px rgba(0,0,0,0.06)",
        }}
      />

      {/* Page edge thickness */}
      <div
        className="absolute -right-[1px] top-0 h-full w-[2px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.06) 100%)",
        }}
      />
    </motion.div>
  );
}

export default function ScrollBook() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
  });

  const bookY = useTransform(smoothProgress, [0, 1], [80, 0]);
  const bookOpacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);
  const bookRotate = useTransform(smoothProgress, [0, 1], [8, 0]);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[60vh] items-center justify-center overflow-hidden py-16 sm:min-h-[70vh]"
    >
      <motion.div
        style={{
          y: bookY,
          opacity: bookOpacity,
          rotateX: bookRotate,
          perspective: 1200,
        }}
        className="relative"
      >
        <div
          className="relative"
          style={{
            width: "min(320px, 75vw)",
            height: "min(440px, 105vw)",
            perspective: 1200,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Back cover */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              background: "linear-gradient(135deg, #0a3560 0%, #072844 100%)",
              boxShadow: "8px 8px 30px rgba(0,0,0,0.35), 2px 2px 8px rgba(0,0,0,0.15)",
              transform: "translateZ(-4px)",
            }}
          />

          {/* Spine */}
          <div
            className="absolute inset-y-0 left-0 w-[6px] rounded-l-lg"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.2) 100%)",
              transform: "translateX(-3px) rotateY(90deg)",
              transformOrigin: "left center",
            }}
          />

          {/* Pages */}
          <div className="relative h-full w-1/2" style={{ transformStyle: "preserve-3d" }}>
            {PAGES.map((page, i) => (
              <BookPage key={i} index={i} progress={smoothProgress} page={page} />
            ))}
          </div>

          {/* Static right side - visible pages underneath */}
          <div
            className="absolute right-0 top-0 h-full overflow-hidden rounded-r-lg border border-white/10"
            style={{
              width: "50%",
              background: "linear-gradient(145deg, #faf8f5 0%, #f2ece3 100%)",
              boxShadow: "inset -2px 0 6px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex h-full flex-col justify-between p-6 sm:p-8">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground/40">
                Yetenekler
              </div>
              <div className="mt-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                İdari Ofis
                <br />
                Yönetimi
              </div>
              <div>
                <div className="mb-4 h-px w-8 bg-border" />
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div>Doküman & Evrak Yönetimi</div>
                  <div>Kurumsal İletişim</div>
                  <div>Ekip Çalışması</div>
                  <div>Sunum Hazırlama</div>
                </div>
              </div>
              <div className="text-[10px] text-muted-foreground/40">Ali Elömer</div>
            </div>
          </div>

          {/* Cover shadow on surface */}
          <div
            className="absolute -bottom-4 left-4 right-4 h-8 rounded-[50%] blur-xl"
            style={{ background: "rgba(0,0,0,0.12)" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
