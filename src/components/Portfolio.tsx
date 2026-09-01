import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SideRays from "./SideRays";
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
      <LineSidebar dark={dark} toggle={toggle} activeId={activeId} />
      <MobileTopBar dark={dark} toggle={toggle} />

      <div className="lg:pl-16">
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

/* ---------- Line Sidebar ---------- */

function LineSidebar({
  dark,
  toggle,
  activeId,
}: {
  dark: boolean;
  toggle: () => void;
  activeId: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [activeLinePos, setActiveLinePos] = useState<number | null>(null);
  const [hoverLinePos, setHoverLinePos] = useState<number | null>(null);
  const [showHoverLine, setShowHoverLine] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement>>({});
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hoverDelayRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const getLinePosition = useCallback((id: string) => {
    const el = itemRefs.current[id];
    const nav = navRef.current;
    if (!el || !nav) return null;
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return elRect.top - navRect.top + elRect.height / 2 - 8;
  }, []);

  const { t, lang, setLang } = useLanguage();
  const navItems = NAV_IDS.map((n) => ({
    ...n,
    label: (t.nav as Record<string, string>)[n.id],
  }));

  useEffect(() => {
    if (activeId) {
      const pos = getLinePosition(activeId);
      setActiveLinePos(pos);
    }
  }, [activeId, getLinePosition, expanded]);

  const onItemEnter = useCallback(
    (id: string) => {
      clearTimeout(hoverTimeoutRef.current);
      clearTimeout(hoverDelayRef.current);
      const pos = getLinePosition(id);
      setHoverLinePos(pos);
      hoverDelayRef.current = setTimeout(() => setShowHoverLine(true), 120);
    },
    [getLinePosition],
  );

  const onItemLeave = useCallback(() => {
    clearTimeout(hoverDelayRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setShowHoverLine(false);
    }, 80);
  }, []);

  const onSidebarEnter = useCallback(() => {
    clearTimeout(hoverTimeoutRef.current);
    setExpanded(true);
  }, []);

  const onSidebarLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setExpanded(false);
      setShowHoverLine(false);
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(hoverTimeoutRef.current);
      clearTimeout(hoverDelayRef.current);
    };
  }, []);

  return (
    <header
      onMouseEnter={onSidebarEnter}
      onMouseLeave={onSidebarLeave}
      className={`fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-border bg-background/85 backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:flex ${
        expanded ? "w-44" : "w-16 items-center"
      }`}
    >
      <div className="flex justify-center pt-5">
        <a
          href="#top"
          className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-lg shadow-sm transition-transform duration-200 hover:scale-105"
        >
          <img
            src={dark ? "/logo-white.png" : "/logo-gold.png"}
            alt="AE"
            className="h-[4.5rem] w-[4.5rem] object-contain"
          />
        </a>
      </div>

      <div
        ref={navRef}
        className={`relative mt-6 flex flex-1 flex-col gap-0.5 ${
          expanded ? "items-stretch px-3" : "items-center"
        }`}
      >
        <div
          className="pointer-events-none absolute left-0 w-0.5 rounded-full bg-foreground transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            height: 16,
            transform:
              activeLinePos !== null ? `translateY(${activeLinePos}px)` : "translateY(-100px)",
            opacity: activeLinePos !== null ? 1 : 0,
          }}
        />

        <div
          className="pointer-events-none absolute left-0 w-0.5 rounded-full bg-muted-foreground/40 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            height: 16,
            transform:
              hoverLinePos !== null ? `translateY(${hoverLinePos}px)` : "translateY(-100px)",
            opacity: showHoverLine ? 1 : 0,
          }}
        />

        {navItems.map((n) => {
          const Icon = n.icon;
          return (
            <a
              key={n.id}
              ref={(el) => {
                if (el) itemRefs.current[n.id] = el;
              }}
              href={`#${n.id}`}
              onMouseEnter={() => onItemEnter(n.id)}
              onMouseLeave={onItemLeave}
              className={`group flex items-center rounded-lg text-sm font-medium transition-all duration-300 ease-out ${
                expanded ? "h-9 gap-3 pl-5 pr-2" : "h-9 w-9 justify-center"
              } ${
                activeId === n.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-out ${
                  expanded ? "" : "group-hover:scale-110"
                }`}
              />
              <span
                className={`whitespace-nowrap transition-all duration-300 ease-out ${
                  expanded
                    ? "translate-x-0 opacity-100"
                    : "pointer-events-none absolute -translate-x-2 opacity-0"
                }`}
              >
                {n.label}
              </span>
            </a>
          );
        })}
      </div>

      <div
        className={`flex flex-col gap-2 px-3 ${expanded ? "items-stretch mb-3" : "items-center mb-3"}`}
      >
        <div className={`flex gap-1.5 ${expanded ? "w-full" : "flex-col items-center"}`}>
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              aria-label={`${l.label} - ${t.langLabel}`}
              className={`h-8 shrink-0 rounded-md border text-xs font-semibold transition-colors ${
                lang === l.code
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
              } ${expanded ? "flex-1" : "w-8"}`}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div className={`flex gap-2 ${expanded ? "flex-row" : "flex-col items-center"}`}>
          <button
            onClick={toggle}
            aria-label={t.themeLabel}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border bg-card transition-colors hover:bg-accent"
          >
            {dark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
          <a
            href="#contact"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-foreground text-background transition-opacity hover:opacity-90"
            title={t.contactLabel}
          >
            <Mail className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Mobile Top Bar ---------- */

function MobileTopBar({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const { t, lang, setLang } = useLanguage();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors lg:hidden ${
        scrolled
          ? "border-border bg-background/85 backdrop-blur"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3 text-sm font-medium">
          <span className="flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-md">
            <img
              src={dark ? "/logo-white-sm.png" : "/logo-gold.png"}
              alt="AE"
              className="h-[3.5rem] w-[3.5rem] object-contain"
            />
          </span>
          <span>Ali Elömer</span>
        </a>

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
    <section id="top" className="relative overflow-hidden pt-24 lg:pt-20">
      <SideRays
        speed={1.5}
        rayColor1="#C0AC30"
        rayColor2="#690C37"
        intensity={1.2}
        spread={1.8}
        origin="top-right"
        opacity={0.35}
      />
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
                alt="Ali Elömer"
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

/* ---------- Gallery: large cards with labels ---------- */

function Gallery() {
  const [lightbox, setLightbox] = useState<{ src: string; title: string; desc: string } | null>(
    null,
  );
  const { t } = useLanguage();

  return (
    <section id="gallery" className="scroll-mt-24 border-t border-border bg-card/40 py-28">
      <div className="mx-auto mb-12 w-full max-w-6xl px-6">
        <Reveal>
          <SectionLabel index={t.gallery.index} title={t.gallery.title} />
        </Reveal>
      </div>

      <Reveal delay={0.05}>
        <div className="flex gap-5 overflow-x-auto px-6 pb-8 [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin]">
          {GALLERY.map((src, i) => {
            const item = t.gallery.items[i] ?? { title: "", desc: "" };
            return (
              <button
                key={`${src}-${i}`}
                onClick={() => setLightbox({ src, title: item.title, desc: item.desc })}
                className="group w-[16rem] shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-card text-left shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-raised)] sm:w-[19rem] md:w-[22rem]"
              >
                <div className="relative h-60 overflow-hidden sm:h-64 md:h-72">
                  <img
                    src={src}
                    alt={item.title}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute left-3 top-3 rounded-md bg-background/80 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-sm">
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-foreground">
                      {item.title}
                    </div>
                    <div className="mt-0.5 truncate text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </button>
            );
          })}
        </div>
      </Reveal>

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
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
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
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 text-sm">
          <span className="relative flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-md">
            <img
              src="/logo-white-sm.png"
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
        </div>
        <div className="text-xs text-muted-foreground">{t.footer.location}</div>
      </div>
    </footer>
  );
}
