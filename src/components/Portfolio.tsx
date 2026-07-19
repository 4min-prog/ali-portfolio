import { useEffect, useRef, useState } from "react";
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
} from "lucide-react";

/* ---------- Data ---------- */

const NAV = [
  { id: "about", label: "Hakkımda" },
  { id: "experience", label: "Deneyim" },
  { id: "education", label: "Eğitim" },
  { id: "skills", label: "Yetenekler" },
  { id: "certificates", label: "Sertifikalar" },
  { id: "languages", label: "Diller" },
  { id: "contact", label: "İletişim" },
];

const EXPERIENCE = [
  {
    role: "Yaz Kur'an Kursu Öğreticisi",
    org: "Ömer Şeyh Camii",
    period: "2022 — 2023",
    location: "Gaziantep",
    points: [
      "Farklı yaş gruplarına yönelik ders programlarının hazırlanması ve uygulanması.",
      "Öğrenci gelişiminin takibi ve veli iletişimi.",
    ],
  },
  {
    role: "Stajyer",
    org: "Millî Eğitim Bakanlığı",
    period: "2026",
    location: "Gaziantep",
    points: [
      "Kurumsal süreçler, evrak yönetimi ve idari işleyişte saha deneyimi.",
      "Ofis uygulamaları ile raporlama ve dosyalama çalışmaları.",
    ],
  },
  {
    role: "Yazma Eser Metin Analizi — Uzman Yardımcılığı",
    org: "Akademik Çalışma",
    period: "—",
    location: "Siirt",
    points: [
      "El yazması eserlerin okunması, transkripsiyonu ve içerik analizi.",
      "Arapça kaynak taraması ve akademik doküman düzenleme.",
    ],
  },
];

const EDUCATION = [
  {
    school: "Siirt Üniversitesi",
    degree: "İlahiyat, Lisans",
    year: "2026",
    note: "Yazma eser metin analizi ve Arap dili üzerine yoğunlaşma.",
  },
  {
    school: "Ömer Özmimar Anadolu İmam Hatip Lisesi",
    degree: "Lise Diploması",
    year: "2022",
    note: "Sözel alan; dini ilimler ve Arapça formasyonu.",
  },
];

const OFFICE_SKILLS = [
  { name: "Microsoft Word", level: "İleri" },
  { name: "Microsoft Excel", level: "Orta" },
  { name: "Microsoft PowerPoint", level: "İleri" },
  { name: "Canva", level: "İleri" },
];

const CAPABILITIES = [
  "İdari Ofis Yönetimi",
  "Doküman & Evrak Yönetimi",
  "Tercümanlık (TR ↔ AR)",
  "Sunum Hazırlama",
  "Kurumsal İletişim",
  "Ekip Çalışması",
];

const CERTIFICATES = [
  { title: "Excel Temel Beceriler", issuer: "BTK Akademi" },
  { title: "PowerPoint Temel Beceriler", issuer: "BTK Akademi" },
  { title: "Canva Uygulamalı", issuer: "BTK Akademi" },
];

const LANGUAGES = [
  { name: "Türkçe", level: "Anadil", value: 100 },
  { name: "Arapça", level: "İleri düzey", value: 95 },
];

/* ---------- Theme hook ---------- */

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    setDark(saved === "dark");
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
  as: Tag = "div",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
  className?: string;
}) {
  const MotionTag = motion(Tag as React.ElementType);
  return (
    <MotionTag
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
      <span className="tabular-nums text-foreground/40">{index}</span>
      <span className="h-px flex-1 bg-border" />
      <span>{title}</span>
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
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar dark={dark} toggle={toggle} activeId={activeId} />

      <Hero />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Certificates />
      <LanguagesSection />
      <Contact />
      <Footer />

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Başa dön"
            className="fixed bottom-6 right-6 z-40 inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium text-foreground shadow-[var(--shadow-card)] transition-colors hover:bg-accent"
          >
            <ArrowUp className="h-4 w-4" />
            <span className="hidden sm:inline">Başa dön</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Top bar ---------- */

function TopBar({
  dark,
  toggle,
  activeId,
}: {
  dark: boolean;
  toggle: () => void;
  activeId: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors ${
        scrolled ? "border-border bg-background/85 backdrop-blur" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <a href="#top" className="flex items-center gap-3 text-sm font-medium">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-foreground text-[11px] font-semibold tracking-wider text-background">
            AE
          </span>
          <span className="hidden sm:inline">Ali Elömer</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                activeId === n.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Tema değiştir"
            className="grid h-9 w-9 place-items-center rounded-md border border-border bg-card transition-colors hover:bg-accent"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#contact"
            className="hidden h-9 items-center rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:inline-flex"
          >
            İletişim
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section id="top" className="relative pt-32 sm:pt-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Gaziantep, Türkiye · Fırsatlara açık
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-8 text-[2.75rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-[4.25rem]">
                Ali Elömer.
                <br />
                <span className="text-muted-foreground">İlahiyat mezunu,</span>
                <br />
                idari işler & tercümanlık.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Eğitim, idari işler ve tercümanlık alanlarında deneyimli;
                öğrenmeye açık, sorumluluk sahibi ve ekip çalışmasına uyumlu
                bir profesyonel.
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
                  CV indir
                </a>
                <a
                  href="#contact"
                  className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-card px-5 text-sm font-medium transition-colors hover:bg-accent"
                >
                  İletişime geç
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
                    { k: "Konum", v: "Gaziantep" },
                    { k: "Alan", v: "İlahiyat" },
                    { k: "Diller", v: "Türkçe · Arapça" },
                    { k: "Durum", v: "Uygun" },
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
              { k: "Deneyim", v: "3+ yıl" },
              { k: "Sertifika", v: "3" },
              { k: "Dil", v: "2" },
              { k: "Alan", v: "Eğitim · İdari" },
            ].map((s) => (
              <div key={s.k} className="bg-card p-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {s.k}
                </div>
                <div className="mt-2 text-2xl font-semibold tracking-tight">{s.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- About: two-column editorial ---------- */

function About() {
  return (
    <section id="about" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index="01" title="Hakkımda" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-12">
          <Reveal delay={0.05} className="md:col-span-5">
            <h2 className="text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
              Eğitim disiplini ile
              <br />
              kurumsal iş anlayışı.
            </h2>
          </Reveal>
          <div className="space-y-8 md:col-span-7">
            <Reveal delay={0.1}>
              <p className="text-base leading-[1.75] text-foreground/85 sm:text-lg">
                Eğitim sektöründeki stajyerlik ve öğreticilik tecrübemi,
                sanayide edindiğim iş disipliniyle birleştiren bir İlahiyat
                mezunuyum. Sekreterlik, tercümanlık, temel ofis uygulamaları
                ve Canva tasarımları konusunda bilgi sahibiyim.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-base leading-[1.75] text-muted-foreground sm:text-lg">
                Öğrenmeye açık, sorumluluk sahibi ve ekip çalışmasına uyumlu
                bir yapıya sahibim. Kurumsal işleyişe kolay adapte olur,
                doküman süreçlerini titizlikle yürütürüm.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="grid grid-cols-1 gap-x-6 gap-y-3 pt-2 sm:grid-cols-2">
                {CAPABILITIES.map((c) => (
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
  return (
    <section id="experience" className="scroll-mt-24 border-t border-border bg-card/40 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index="02" title="Deneyim" />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-14 flex items-end justify-between">
            <h2 className="max-w-xl text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
              Eğitim, idari ve akademik alanda saha deneyimi.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 divide-y divide-border border-y border-border">
          {EXPERIENCE.map((e, i) => (
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
  return (
    <section id="education" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index="03" title="Eğitim" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {EDUCATION.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.06}>
              <article className="flex h-full flex-col rounded-xl border border-border bg-card p-8 transition-shadow hover:shadow-[var(--shadow-raised)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {i === 0 ? "Lisans" : "Lise"}
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
  return (
    <section id="skills" className="scroll-mt-24 border-t border-border bg-card/40 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index="04" title="Yetenekler" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <h2 className="text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
                Ofis uygulamaları
                <br />
                ve tasarım.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                Günlük iş akışlarında güvenle kullandığım araçlar ve kurumsal
                iletişimde geliştirdiğim yetkinlikler.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <ul className="divide-y divide-border border-y border-border">
              {OFFICE_SKILLS.map((s, i) => (
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
                {CAPABILITIES.map((c) => (
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
  return (
    <section id="certificates" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index="05" title="Sertifikalar" />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-14 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="max-w-xl text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
              BTK Akademi eğitim sertifikaları.
            </h2>
            <span className="text-sm text-muted-foreground">3 sertifika</span>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {CERTIFICATES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <article className="flex h-full flex-col justify-between bg-card p-8 transition-colors hover:bg-accent">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {c.issuer}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">{c.title}</h3>
                </div>
                <div className="mt-10 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Tamamlandı</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Languages: minimal meter ---------- */

function LanguagesSection() {
  return (
    <section id="languages" className="scroll-mt-24 border-t border-border bg-card/40 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index="06" title="Diller" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <h2 className="text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
              İki dilde
              <br />
              akıcı iletişim.
            </h2>
          </Reveal>
          <div className="md:col-span-8">
            <ul className="space-y-10">
              {LANGUAGES.map((l, i) => (
                <LanguageRow key={l.name} l={l} delay={i * 0.08} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function LanguageRow({
  l,
  delay,
}: {
  l: (typeof LANGUAGES)[number];
  delay: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <li ref={ref}>
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-xl font-semibold tracking-tight">{l.name}</div>
          <div className="mt-1 text-sm text-muted-foreground">{l.level}</div>
        </div>
        <div className="text-sm tabular-nums text-muted-foreground">{l.value}%</div>
      </div>
      <div className="mt-4 h-px w-full overflow-hidden bg-border">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${l.value}%` : 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay }}
          className="h-px bg-foreground"
        />
      </div>
    </li>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  const items = [
    { icon: MapPin, k: "Konum", v: "Gaziantep, Türkiye", href: undefined },
    { icon: Phone, k: "Telefon", v: "+90 538 587 77 39", href: "tel:+905385877739" },
    { icon: Mail, k: "E-posta", v: "alielomer450@gmail.com", href: "mailto:alielomer450@gmail.com" },
    { icon: Linkedin, k: "LinkedIn", v: "linkedin.com/in/aliomerr", href: "https://linkedin.com/in/aliomerr" },
  ];

  return (
    <section id="contact" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index="07" title="İletişim" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <Reveal>
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
                Birlikte çalışmak için
                <br />
                iletişime geçelim.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                Eğitim, idari işler, tercümanlık veya ofis yönetimi gerektiren
                pozisyonlar için mesajlarınıza kısa sürede dönüş sağlıyorum.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <a
                href="mailto:alielomer450@gmail.com"
                className="mt-8 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Mail className="h-4 w-4" />
                E-posta gönder
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
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 text-sm">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-foreground text-[11px] font-semibold tracking-wider text-background">
            AE
          </span>
          <span className="text-muted-foreground">© 2026 Ali Elömer</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Gaziantep, Türkiye — alielomer450@gmail.com
        </div>
      </div>
    </footer>
  );
}
