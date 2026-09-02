import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  ArrowUp,
  Moon,
  Sun,
  Check,
  User,
  Briefcase,
  GraduationCap,
  Star,
  Award,
  Languages,
  Image,
  Link2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SideRays from "./SideRays";
import AmbientBackground from "./AmbientBackground";
import RotatingText from "./RotatingText";
import { useLanguage, type Lang } from "../lib/i18n";

const NAV_IDS: { id: string; icon: LucideIcon }[] = [
  { id: "about", icon: User },
  { id: "experience", icon: Briefcase },
  { id: "education", icon: GraduationCap },
  { id: "skills", icon: Star },
  { id: "gallery", icon: Image },
  { id: "certificates", icon: Award },
  { id: "languages", icon: Languages },
  { id: "contact", icon: Mail },
];

const GALLERY = [
  "/photos/cert-canva-1.jpg",
  "/photos/cert-canva-2.jpg",
  "/photos/cert-powerpoint-1.jpg",
  "/photos/cert-powerpoint-2.jpg",
  "/photos/cert-excel-1.jpg",
  "/photos/cert-excel-2.jpg",
  "/photos/cert-word-1.jpg",
  "/photos/cert-word-2.jpg",
];

const LANGS: { code: Lang; label: string }[] = [
  { code: "tr", label: "TR" },
  { code: "ar", label: "AR" },
  { code: "en", label: "EN" },
];

/* ---------- Theme hook ---------- */

function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    setDark(saved !== "light");
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  return { dark, toggle: () => setDark((v) => !v) };
}

/* ---------- Intro ---------- */

function Intro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ opacity: { duration: 0.35 } }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_42%,color-mix(in_oklab,var(--color-primary)_22%,transparent),transparent_75%)]" />
      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -6 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className="relative flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="absolute inset-0 rounded-full border border-primary/25"
        />
        <motion.span
          initial={{ opacity: 0, scale: 1.4 }}
          animate={{ opacity: [0, 1, 1], scale: [1.4, 1.12, 1] }}
          transition={{ delay: 0.45, duration: 1, times: [0, 0.6, 1] }}
          className="absolute inset-5 rounded-full border border-primary/50"
        />
        <motion.span
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ delay: 0.6, duration: 9, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-2 rounded-full border border-dashed border-primary/25"
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="absolute h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_2px_var(--color-primary)]"
          style={{ transform: "translateY(-112%)" }}
        />
        <span className="bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-center font-serif text-3xl font-bold leading-tight tracking-[0.08em] text-transparent sm:text-4xl">
          AL
          <br />
          OMAR
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Primitives ---------- */

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-xs tabular-nums uppercase tracking-[0.18em] text-muted-foreground/50">
        {index}
      </span>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <span className="mt-1 h-px w-12 bg-border" />
    </div>
  );
}

/* ---------- Main ---------- */

export default function Portfolio() {
  const { dark, toggle } = useTheme();
  const [showTop, setShowTop] = useState(false);
  const [activeId, setActiveId] = useState<string>("about");
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      document.body.style.overflow = prev;
      setIntro(false);
    }, 2500);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV_IDS.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnimatePresence>{intro && <Intro onDone={() => setIntro(false)} />}</AnimatePresence>
      <Header dark={dark} toggle={toggle} activeId={activeId} />

      <div className="px-6 pt-[8.5rem] lg:pt-[8.5rem]">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Gallery />
        <Certificates />
        <LanguagesSection />
        <Contact />
        <Footer />
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label={t.backToTop}
            className="fixed bottom-6 right-6 z-40 inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium text-foreground shadow-[var(--shadow-card)] transition-colors hover:bg-accent lg:right-6"
          >
            <ArrowUp className="h-4 w-4" />
            <span className="hidden sm:inline">{t.backToTop}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Header ---------- */

function Header({
  dark,
  toggle,
  activeId,
}: {
  dark: boolean;
  toggle: () => void;
  activeId: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const { t, lang, setLang } = useLanguage();
  const navItems = NAV_IDS.map((n) => ({
    ...n,
    label: (t.nav as Record<string, string>)[n.id],
  }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors ${
        scrolled
          ? "border-border bg-background/85 backdrop-blur"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[8.5rem] max-w-7xl items-center justify-between gap-4 px-6">
        <a href="#top" className="flex items-center gap-3">
          <span className="relative flex h-[120px] w-[120px] items-center justify-center rounded-lg">
            <img
              src={dark ? "/logo-dark.png" : "/logo-gold.png"}
              alt="AE"
              className="h-[120px] w-[120px] object-contain"
            />
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                activeId === n.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {n.label}
              {activeId === n.id && (
                <motion.span
                  layoutId="header-underline"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              aria-label={`${l.label} - ${t.langLabel}`}
              className={`grid h-8 w-8 place-items-center rounded-md border text-xs font-semibold transition-colors ${
                lang === l.code
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={toggle}
            aria-label={t.themeLabel}
            className="grid h-8 w-8 place-items-center rounded-md border border-border bg-card transition-colors hover:bg-accent"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#contact"
            className="inline-flex h-8 items-center rounded-md bg-foreground px-3 text-xs font-medium text-background transition-opacity hover:opacity-90"
          >
            {t.contactLabel}
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const { t } = useLanguage();
  return (
    <section id="top" className="relative overflow-hidden pt-0 lg:pt-0">
      <SideRays
        speed={1.5}
        rayColor1="#C0AC30"
        rayColor2="#690C37"
        intensity={1.2}
        spread={1.8}
        origin="top-right"
        opacity={0.35}
      />
      <AmbientBackground />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                {t.hero.badge}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-8 text-[2.75rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-[4.25rem]">
                {t.hero.name}
                <br />
                <RotatingText />
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {t.hero.subtitle}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="/cv-ali-elomer.pdf"
                  download
                  className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Download className="h-4 w-4" />
                  {t.hero.cvDownload}
                </a>
                <a
                  href="#contact"
                  className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-card px-5 text-sm font-medium transition-colors hover:bg-accent"
                >
                  {t.hero.contactBtn}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linklyhub.com/alialomer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-card px-5 text-sm font-medium transition-colors hover:bg-accent"
                >
                  <Link2 className="h-4 w-4 text-primary" />
                  {t.hero.linklyBtn ?? "Tüm Linkler"}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-4">
            <Reveal delay={0.2}>
              <aside className="rounded-xl border border-border bg-card p-6">
                <dl className="divide-y divide-border">
                  {[
                    { k: t.hero.infoKeys.location, v: t.hero.infoValues.location },
                    { k: t.hero.infoKeys.field, v: t.hero.infoValues.field },
                    { k: t.hero.infoKeys.languages, v: t.hero.infoValues.languages },
                    { k: t.hero.infoKeys.status, v: t.hero.infoValues.status },
                  ].map((r) => (
                    <div key={r.k} className="flex items-center justify-between py-3 text-sm">
                      <dt className="text-muted-foreground">{r.k}</dt>
                      <dd className="font-medium">{r.v}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.25}>
          <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
            {[
              { k: t.hero.stats.experience, v: t.hero.stats.experienceVal },
              { k: t.hero.stats.certificates, v: t.hero.stats.certificatesVal },
              { k: t.hero.stats.languages, v: t.hero.stats.languagesVal },
              { k: t.hero.stats.field, v: t.hero.stats.fieldVal },
            ].map((s) => (
              <div key={s.k} className="bg-card p-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.k}</div>
                <div className="mt-2 text-2xl font-semibold tracking-tight">{s.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index={t.about.index} title={t.about.title} />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-12">
          <Reveal delay={0.05} className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-card">
              <img
                src="/photos/profile-1.jpg"
                alt="Ali Elأ¶mer"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          </Reveal>
          <div className="space-y-8 md:col-span-7">
            <Reveal delay={0.08}>
              <h2 className="text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
                {t.about.heading.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < t.about.heading.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-base leading-[1.75] text-foreground/85 sm:text-lg">{t.about.p1}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-base leading-[1.75] text-muted-foreground sm:text-lg">
                {t.about.p2}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="grid grid-cols-1 gap-x-6 gap-y-3 pt-2 sm:grid-cols-2">
                {t.about.capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Experience: table-style timeline ---------- */

function Experience() {
  const { t } = useLanguage();
  return (
    <section id="experience" className="scroll-mt-24 border-t border-border bg-card/40 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index={t.experience.index} title={t.experience.title} />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-14 flex items-end justify-between">
            <h2 className="max-w-xl text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
              {t.experience.heading}
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 divide-y divide-border border-y border-border">
          {t.experience.items.map((e, i) => (
            <Reveal key={e.role} delay={i * 0.05}>
              <article className="group grid grid-cols-12 gap-6 py-8 transition-colors hover:bg-card">
                <div className="col-span-12 md:col-span-2">
                  <div className="text-sm font-medium tabular-nums text-muted-foreground">
                    {e.period}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{e.location}</div>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <h3 className="text-lg font-semibold tracking-tight">{e.role}</h3>
                  <div className="mt-1 text-sm text-primary">{e.org}</div>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Education: two large cards ---------- */

function Education() {
  const { t } = useLanguage();
  return (
    <section id="education" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index={t.education.index} title={t.education.title} />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {t.education.items.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.06}>
              <article className="flex h-full flex-col rounded-xl border border-border bg-card p-8 transition-shadow hover:shadow-[var(--shadow-raised)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {e.level}
                  </span>
                  <span className="text-sm font-medium tabular-nums text-muted-foreground">
                    {e.year}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight">{e.school}</h3>
                <div className="mt-1 text-sm text-primary">{e.degree}</div>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{e.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills: split list + capability grid ---------- */

function Skills() {
  const { t } = useLanguage();
  return (
    <section id="skills" className="scroll-mt-24 border-t border-border bg-card/40 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index={t.skills.index} title={t.skills.title} />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <h2 className="text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
                {t.skills.heading.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < t.skills.heading.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                {t.skills.description}
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <ul className="divide-y divide-border border-y border-border">
              {t.skills.officeSkills.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.04}>
                  <li className="flex items-center justify-between py-5">
                    <span className="text-base font-medium">{s.name}</span>
                    <span className="text-sm text-muted-foreground">{s.level}</span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap gap-2">
                {t.about.capabilities.map((c) => (
                  <span
                    key={c}
                    className="rounded-md border border-border bg-card px-3 py-1.5 text-xs text-foreground/80"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Certificates: minimal list ---------- */

function Certificates() {
  const { t } = useLanguage();
  return (
    <section id="certificates" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index={t.certificates.index} title={t.certificates.title} />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-14 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="max-w-xl text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
              {t.certificates.heading}
            </h2>
            <span className="text-sm text-muted-foreground">{t.certificates.count}</span>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {t.certificates.items.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <article className="flex items-center justify-between rounded-xl border border-border bg-card p-6 transition-colors hover:bg-accent">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {c.issuer}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">{c.title}</h3>
                </div>
                <a
                  href={c.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary/10 px-4 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  <Download className="h-3.5 w-3.5" />
                  PDF
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Gallery: sticky full-screen horizontal scroll ---------- */

function Gallery() {
  const [lightbox, setLightbox] = useState<{ src: string; title: string; desc: string } | null>(
    null,
  );
  const { t } = useLanguage();

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const [range, setRange] = useState<[number, number]>([0, 0]);

  useLayoutEffect(() => {
    const measure = () => {
      const first = cardRefs.current[0];
      const last = cardRefs.current[GALLERY.length - 1];
      if (!first || !last) return;
      const vw2 = window.innerWidth / 2;
      setRange([
        vw2 - (first.offsetLeft + first.offsetWidth / 2),
        vw2 - (last.offsetLeft + last.offsetWidth / 2),
      ]);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const trackWidth = useTransform(scrollYProgress, [0, 1], range);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative border-t border-border bg-card/40"
      style={{ height: "350vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 w-full max-w-6xl px-6">
          <SectionLabel index={t.gallery.index} title={t.gallery.title} />
        </div>
        <p className="mb-2 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground/60">
          {t.gallery.hint}
        </p>

        <motion.div style={{ x: trackWidth }} className="relative flex w-max items-center gap-14">
          {GALLERY.map((src, i) => {
            const item = t.gallery.items[i] ?? { title: "", desc: "" };
            return (
              <GalleryCard
                key={`${src}-${i}`}
                src={src}
                title={item.title}
                desc={item.desc}
                progress={scrollYProgress}
                refCb={(el) => {
                  cardRefs.current[i] = el;
                }}
                onOpen={() => setLightbox({ src, title: item.title, desc: item.desc })}
              />
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-h-[88vh] max-w-[92vw] rounded-xl shadow-2xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="max-h-[80vh] max-w-[92vw] rounded-xl object-contain"
              />
              <div className="mt-3 text-center">
                <div className="text-lg font-semibold">{lightbox.title}</div>
                <div className="mt-0.5 text-sm text-muted-foreground">{lightbox.desc}</div>
              </div>
            </motion.div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-card text-foreground shadow-lg transition-colors hover:bg-accent"
            >
              âœ•
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Gallery card ---------- */

function GalleryCard({
  src,
  title,
  desc,
  progress,
  refCb,
  onOpen,
}: {
  src: string;
  title: string;
  desc: string;
  progress: MotionValue<number>;
  refCb: (el: HTMLButtonElement | null) => void;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const scale = useMotionValue(0.82);
  const opacity = useMotionValue(0.5);

  useMotionValueEvent(progress, "change", () => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const viewportCenter = window.innerWidth / 2;
    const dist = Math.abs(center - viewportCenter);
    const maxDist = window.innerWidth / 2 + rect.width / 2;
    const t = Math.min(dist / maxDist, 1);
    scale.set(1.18 - 0.36 * t);
    opacity.set(1 - 0.5 * t);
    el.style.zIndex = t < 0.05 ? "3" : "0";
  });

  return (
    <motion.button
      ref={(el) => {
        ref.current = el;
        refCb(el);
      }}
      onClick={onOpen}
      style={{ scale, opacity }}
      className="group relative flex h-[60vh] w-[74vw] max-w-[26rem] shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[var(--shadow-card)] will-change-transform transition-shadow hover:shadow-[var(--shadow-raised)] sm:w-[22rem] md:w-[26rem]"
    >
      <div className="relative flex-1 overflow-hidden">
        <img
          src={src}
          alt={title}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute left-4 top-4 rounded-md bg-background/80 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-sm">
          {title}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-foreground">{title}</div>
          <div className="mt-0.5 truncate text-xs text-muted-foreground">{desc}</div>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </motion.button>
  );
}

/* ---------- Languages: minimal meter ---------- */

function LanguagesSection() {
  const { t } = useLanguage();
  return (
    <section id="languages" className="scroll-mt-24 border-t border-border bg-card/40 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index={t.languagesSection.index} title={t.languagesSection.title} />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <h2 className="text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
              {t.languagesSection.heading.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < t.languagesSection.heading.split("\n").length - 1 && <br />}
                </span>
              ))}
            </h2>
          </Reveal>
          <div className="flex items-center justify-center gap-16 md:col-span-8">
            {t.languagesSection.items.map((l, i) => (
              <LanguageRow
                key={l.name}
                name={l.name}
                level={l.level}
                value={l.value}
                delay={i * 0.3}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LanguageRow({
  name,
  level,
  value,
  delay,
}: {
  name: string;
  level: string;
  value: number;
  delay: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const duration = 2000;
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c - (inView ? value / 100 : 0) * c;

  return (
    <li ref={ref} className="flex flex-col items-center gap-4">
      <div className="relative h-32 w-32">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            className="text-border"
          />
          <motion.circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            className="text-primary"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: inView ? offset : c }}
            transition={{ duration: 2, ease: "easeOut", delay }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold tabular-nums">{display}</span>
          <span className="text-[10px] text-muted-foreground">%</span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-lg font-semibold tracking-tight">{name}</div>
        <div className="mt-1 text-sm text-muted-foreground">{level}</div>
      </div>
    </li>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  const { t } = useLanguage();
  const items = [
    { icon: MapPin, k: t.contact.items[0].k, v: t.contact.items[0].v, href: undefined },
    { icon: Phone, k: t.contact.items[1].k, v: t.contact.items[1].v, href: "tel:+905385877739" },
    {
      icon: Mail,
      k: t.contact.items[2].k,
      v: t.contact.items[2].v,
      href: "mailto:alielomer450@gmail.com",
    },
    {
      icon: Linkedin,
      k: t.contact.items[3].k,
      v: t.contact.items[3].v,
      href: "https://linkedin.com/in/aliomerr",
    },
  ];

  return (
    <section id="contact" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index={t.contact.index} title={t.contact.title} />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <Reveal>
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
                {t.contact.heading.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < t.contact.heading.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                {t.contact.description}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <a
                href="mailto:alielomer450@gmail.com"
                className="mt-8 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Mail className="h-4 w-4" />
                {t.contact.emailBtn}
              </a>
            </Reveal>
          </div>

          <div className="md:col-span-6">
            <ul className="divide-y divide-border border-y border-border">
              {items.map((it, i) => (
                <Reveal key={it.k} delay={i * 0.05}>
                  <li>
                    <a
                      href={it.href}
                      target={it.href?.startsWith("http") ? "_blank" : undefined}
                      rel={it.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 py-5 transition-colors hover:bg-card"
                    >
                      <it.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs uppercase tracking-widest text-muted-foreground">
                          {it.k}
                        </div>
                        <div className="mt-0.5 truncate text-sm font-medium">{it.v}</div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-10 sm:flex-row sm:items-center">
        <a
          href="https://4min.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-sm"
        >
          <span className="relative flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-md">
            <img
              src="/logo-dark.png"
              alt="AE"
              className="absolute h-[3.5rem] w-[3.5rem] object-contain dark:block hidden"
            />
            <img
              src="/logo-gold.png"
              alt="AE"
              className="absolute h-[3.5rem] w-[3.5rem] object-contain block dark:hidden"
            />
          </span>
          <span className="text-muted-foreground">{t.footer.copyright}</span>
        </a>
        <div className="sm:items-end">
          <a
            href="https://4min.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            created by 4min
          </a>
        </div>
      </div>
    </footer>
  );
}
