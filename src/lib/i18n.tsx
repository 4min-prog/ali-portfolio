import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "tr" | "ar" | "en";

const translations = {
  tr: {
    nav: {
      about: "Hakkımda",
      experience: "Deneyim",
      education: "Eğitim",
      skills: "Yetenekler",
      gallery: "Tasarımlar",
      certificates: "Sertifikalar",
      languages: "Diller",
      contact: "İletişim",
    },
    hero: {
      badge: "Gaziantep, Türkiye · Fırsatlara açık",
      name: "Ali Elömer",
      subtitle:
        "Eğitim, idari işler ve tercümanlık alanlarında; öğrenmeye açık, sorumluluk sahibi ve ekip çalışmasına uyumlu bir profesyonel.",
      cvDownload: "CV indir",
      contactBtn: "İletişime geç",
      rotatingTexts: ["Tercümanlık", "İdari İşler", "Eğitimcilik", "Sekreterlik"],
      infoKeys: { location: "Konum", field: "Alan", languages: "Diller", status: "Durum" },
      infoValues: {
        location: "Gaziantep",
        field: "İlahiyat",
        languages: "Türkçe · Arapça",
        status: "Uygun",
      },
      stats: {
        experience: "Deneyim",
        experienceVal: "3+ yıl",
        certificates: "Sertifika",
        certificatesVal: "4",
        languages: "Dil",
        languagesVal: "2",
        field: "Alan",
        fieldVal: "Eğitim · İdari",
      },
    },
    about: {
      index: "01",
      title: "Hakkımda",
      heading: "Eğitim disiplini ile\nkurumsal iş anlayışı.",
      p1: "Eğitim sektöründeki stajyerlik ve öğreticilik tecrübemi, sanayide edindiğim iş disipliniyle birleştiren bir İlahiyat mezunuyum. Sekreterlik, tercümanlık, temel ofis uygulamaları ve Canva tasarımları konusunda bilgi sahibiyim.",
      p2: "Öğrenmeye açık, sorumluluk sahibi ve ekip çalışmasına uyumlu bir yapıya sahibim. Kurumsal işleyişe kolay adapte olur, doküman süreçlerini titizlikle yürütürüm.",
      capabilities: [
        "İdari Ofis Yönetimi",
        "Doküman & Evrak Yönetimi",
        "Tercümanlık (TR ↔ AR)",
        "Sunum Hazırlama",
        "Kurumsal İletişim",
        "Ekip Çalışması",
      ],
    },
    experience: {
      index: "02",
      title: "Deneyim",
      heading: "Eğitim, idari ve akademik alanda saha deneyimi.",
      items: [
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
      ],
    },
    education: {
      index: "03",
      title: "Eğitim",
      items: [
        {
          school: "Siirt Üniversitesi",
          degree: "İlahiyat, Lisans",
          year: "2026",
          note: "Arap dili üzerine yoğunlaşma.",
          level: "Lisans",
        },
        {
          school: "Ömer Özmimar Anadolu İmam Hatip Lisesi",
          degree: "Lise Diploması",
          year: "2022",
          note: "Dini ilimler ve Arapça formasyonu.",
          level: "Lise",
        },
      ],
    },
    skills: {
      index: "04",
      title: "Yetenekler",
      heading: "Ofis uygulamaları\nve tasarım.",
      description:
        "Günlük iş akışlarında güvenle kullandığım araçlar ve kurumsal iletişimde geliştirdiğim yetkinlikler.",
      officeSkills: [
        { name: "Microsoft Word", level: "İleri" },
        { name: "Microsoft Excel", level: "Orta" },
        { name: "Microsoft PowerPoint", level: "İleri" },
        { name: "Canva", level: "İleri" },
      ],
    },
    gallery: {
      index: "05",
      title: "Tasarımlar",
      hint: "Keşfetmek için kaydır ↓",
      items: [
        { title: "Canva · Afiş", desc: "Tanıtım afişi" },
        { title: "Canva · Kart", desc: "Kartvizit tasarımı" },
        { title: "Sunum Kapağı", desc: "PowerPoint kapağı" },
        { title: "Slayt Tasarımı", desc: "Eğitim slaytı" },
        { title: "Veri Tablosu", desc: "Excel raporlaması" },
        { title: "Grafik Düzeni", desc: "Excel grafiği" },
        { title: "Belge Düzeni", desc: "Word belgesi" },
        { title: "Doküman Kapağı", desc: "Word kapak düzeni" },
      ],
    },
    certificates: {
      index: "06",
      title: "Sertifikalar",
      heading: "Online eğitim sertifikaları.",
      count: "4 sertifika",
      items: [
        {
          title: "Excel Temel Beceriler",
          issuer: "Online Eğitim",
          pdf: "/certificates/Microsoft_Excel_Temelleri_Sertifika (ali).pdf",
        },
        {
          title: "PowerPoint Temel Beceriler",
          issuer: "Online Eğitim",
          pdf: "/certificates/Microsoft_PowerPoint_Sertifika.pdf",
        },
        {
          title: "Word Temel Beceriler",
          issuer: "Online Eğitim",
          pdf: "/certificates/Microsoft_Word_Temelleri_Sertifika..ali el omer.pdf",
        },
        {
          title: "Canva Uygulamalı",
          issuer: "Online Eğitim",
          pdf: "/certificates/Uygulamal%C4%B1_Canva_Sertifika%20(ali).pdf",
        },
      ],
    },
    languagesSection: {
      index: "07",
      title: "Diller",
      heading: "İki dilde\nakıcı iletişim.",
      items: [
        { name: "Arapça", level: "İleri düzey", value: 100 },
        { name: "Türkçe", level: "Anadil", value: 100 },
      ],
    },
    contact: {
      index: "08",
      title: "İletişim",
      heading: "Birlikte çalışmak için\niletişime geçelim.",
      description:
        "Eğitim, idari işler, tercümanlık veya ofis yönetimi gerektiren pozisyonlar için mesajlarınıza kısa sürede dönüş sağlıyorum.",
      emailBtn: "E-posta gönder",
      items: [
        { k: "Konum", v: "Gaziantep, Türkiye" },
        { k: "Telefon", v: "+90 538 587 77 39" },
        { k: "E-posta", v: "alielomer450@gmail.com" },
        { k: "LinkedIn", v: "linkedin.com/in/aliomerr" },
      ],
    },
    footer: {
      copyright: "© 2026 Ali Elömer",
      location: "Gaziantep, Türkiye — alielomer450@gmail.com",
    },
    backToTop: "Başa dön",
    contactLabel: "İletişim",
    themeLabel: "Tema değiştir",
    langLabel: "Dil değiştir",
  },
  ar: {
    nav: {
      about: "عني",
      experience: "الخبرة",
      education: "التعليم",
      skills: "المهارات",
      gallery: "التصاميم",
      certificates: "الشهادات",
      languages: "اللغات",
      contact: "التواصل",
    },
    hero: {
      badge: "غازي عنتاب، تركيا · مفتوح للفرص",
      name: "علي العمر",
      subtitle:
        "متخصص في مجالات التعليم والشؤون الإدارية والترجمة؛ منفتح على التعلم، مسؤول، ومتوافق مع العمل الجماعي.",
      cvDownload: "تحميل السيرة الذاتية",
      contactBtn: "تواصل معي",
      rotatingTexts: ["الترجمة", "الشؤون الإدارية", "التعليم", "السكرتارية"],
      infoKeys: { location: "الموقع", field: "التخصص", languages: "اللغات", status: "الحالة" },
      infoValues: {
        location: "غازي عنتاب",
        field: "اللاهوت",
        languages: "التركية · العربية",
        status: "متاح",
      },
      stats: {
        experience: "الخبرة",
        experienceVal: "+٣ سنوات",
        certificates: "الشهادات",
        certificatesVal: "٤",
        languages: "اللغات",
        languagesVal: "٢",
        field: "التخصص",
        fieldVal: "تعليم · إداري",
      },
    },
    about: {
      index: "٠١",
      title: "عني",
      heading: "نظام تعليمي مع\nفهم مؤسسي للأعمال.",
      p1: "خريج كلية اللاهوت يجمع بين خبرتي كمتدرب ومعلم في قطاع التعليم وانضباط العمل الذي اكتسبته في الصناعة. لدي معرفة بالسكرتارية والترجمة وتطبيقات المكتب الأساسية وتصاميم كانفا.",
      p2: "أتمتع بهيكل منفتح على التعلم، مسؤول، ومتوافق مع العمل الجماعي. أتكيف بسهولة مع العمل المؤسسي وأتولى عمليات الوثائق بدقة.",
      capabilities: [
        "إدارة المكتب الإداري",
        "إدارة المستندات والأوراق",
        "الترجمة (تر ↔ عر)",
        "إعداد العروض التقديمية",
        "الاتصال المؤسسي",
        "العمل الجماعي",
      ],
    },
    experience: {
      index: "٠٢",
      title: "الخبرة",
      heading: "خبرة ميدانية في المجال التعليمي والإداري والأكاديمي.",
      items: [
        {
          role: "معلم دورة صيفية للقرآن",
          org: "مسجد عمر الشيه",
          period: "٢٠٢٢ — ٢٠٢٣",
          location: "غازي عنتاب",
          points: [
            "إعداد وتنفيذ برامج دراسية لمختلف الفئات العمرية.",
            "تتبع تطور الطلاب والتواصل مع أولياء الأمور.",
          ],
        },
        {
          role: "متدرب",
          org: "وزارة التربية الوطنية",
          period: "٢٠٢٦",
          location: "غازي عنتاب",
          points: [
            "خبرة ميدانية في العمليات المؤسسي وإدارة المستندات والتشغيل الإداري.",
            " أعمال الإعداد والتقارير وأرشفة باستخدام تطبيقات المكتب.",
          ],
        },
      ],
    },
    education: {
      index: "٠٣",
      title: "التعليم",
      items: [
        {
          school: "جامعة سيرت",
          degree: "اللاهوت، بكالوريوس",
          year: "٢٠٢٦",
          note: "تركيز في اللغة العربية.",
          level: "بكالوريوس",
        },
        {
          school: "ثانوية عمر أوزميمار للإمام الخطيب",
          degree: "شهادة الثانوية",
          year: "٢٠٢٢",
          note: "العلوم الدينية وتكوين اللغة العربية.",
          level: "ثانوية",
        },
      ],
    },
    skills: {
      index: "٠٤",
      title: "المهارات",
      heading: "تطبيقات المكتب\nوالتصميم.",
      description:
        "الأدوات التي أستخدمها بثقة في سير العمل اليومي والكفاءات التي طورتها في الاتصال المؤسسي.",
      officeSkills: [
        { name: "Microsoft Word", level: "متقدم" },
        { name: "Microsoft Excel", level: "متوسط" },
        { name: "Microsoft PowerPoint", level: "متقدم" },
        { name: "Canva", level: "متقدم" },
      ],
    },
    gallery: {
      index: "٠٥",
      title: "التصاميم",
      hint: "مرّر للاستكشاف ↓",
      items: [
        { title: "Canva · ملصق", desc: "ملصق تعريفي" },
        { title: "Canva · بطاقة", desc: "تصميم بطاقة عمل" },
        { title: "غلاف عرض", desc: "غلاف PowerPoint" },
        { title: "تصميم شريحة", desc: "شريحة تعليمية" },
        { title: "جدول بيانات", desc: "تقرير Excel" },
        { title: "تخطيط رسم", desc: "رسم بياني Excel" },
        { title: "تخطيط مستند", desc: "مستند Word" },
        { title: "غلاف وثيقة", desc: "تخطيط غلاف Word" },
      ],
    },
    certificates: {
      index: "٠٦",
      title: "الشهادات",
      heading: "شهادات التعليم عبر الإنترنت.",
      count: "٤ شهادات",
      items: [
        {
          title: "مهارات Excel الأساسية",
          issuer: "تعليم عبر الإنترنت",
          pdf: "/certificates/Microsoft_Excel_Temelleri_Sertifika (ali).pdf",
        },
        {
          title: "مهارات PowerPoint الأساسية",
          issuer: "تعليم عبر الإنترنت",
          pdf: "/certificates/Microsoft_PowerPoint_Sertifika.pdf",
        },
        {
          title: "مهارات Word الأساسية",
          issuer: "تعليم عبر الإنترنت",
          pdf: "/certificates/Microsoft_Word_Temelleri_Sertifika..ali el omer.pdf",
        },
        {
          title: "Canva التطبيقي",
          issuer: "تعليم عبر الإنترنت",
          pdf: "/certificates/Uygulamal%C4%B1_Canva_Sertifika%20(ali).pdf",
        },
      ],
    },
    languagesSection: {
      index: "٠٧",
      title: "اللغات",
      heading: "تواصل سلس\nبلغتين.",
      items: [
        { name: "العربية", level: "مستوى متقدم", value: 100 },
        { name: "التركية", level: "اللغة الأم", value: 100 },
      ],
    },
    contact: {
      index: "٠٨",
      title: "التواصل",
      heading: "لنتواصل معاً\nللعمل معاً.",
      description:
        "أردد الرد على رسائلكم بسرعة لل Positions التي تتطلب التعليم أو الشؤون الإدارية أو التترجمة أو إدارة المكتب.",
      emailBtn: "إرسال بريد إلكتروني",
      items: [
        { k: "الموقع", v: "غازي عنتاب، تركيا" },
        { k: "الهاتف", v: "+90 538 587 77 39" },
        { k: "البريد الإلكتروني", v: "alielomer450@gmail.com" },
        { k: "LinkedIn", v: "linkedin.com/in/aliomerr" },
      ],
    },
    footer: {
      copyright: "© ٢٠٢٦ علي العمر",
      location: "غازي عنتاب، تركيا — alielomer450@gmail.com",
    },
    backToTop: "العودة للأعلى",
    contactLabel: "التواصل",
    themeLabel: "تغيير السمة",
    langLabel: "تغيير اللغة",
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      gallery: "Designs",
      certificates: "Certificates",
      languages: "Languages",
      contact: "Contact",
    },
    hero: {
      badge: "Gaziantep, Turkey · Open to opportunities",
      name: "Ali Elömer",
      subtitle:
        "A professional in education, administrative affairs, and translation; eager to learn, responsible, and adaptable to teamwork.",
      cvDownload: "Download CV",
      contactBtn: "Get in touch",
      rotatingTexts: ["Translation", "Administrative", "Education", "Secretarial"],
      infoKeys: { location: "Location", field: "Field", languages: "Languages", status: "Status" },
      infoValues: {
        location: "Gaziantep",
        field: "Theology",
        languages: "Turkish · Arabic",
        status: "Available",
      },
      stats: {
        experience: "Experience",
        experienceVal: "3+ years",
        certificates: "Certificates",
        certificatesVal: "4",
        languages: "Languages",
        languagesVal: "2",
        field: "Field",
        fieldVal: "Education · Admin",
      },
    },
    about: {
      index: "01",
      title: "About",
      heading: "Educational discipline\nwith corporate understanding.",
      p1: "A Theology graduate who combines my internship and teaching experience in the education sector with the work discipline I gained in industry. I have knowledge in secretarial work, translation, basic office applications, and Canva designs.",
      p2: "I have an open-to-learning, responsible, and team-compatible structure. I easily adapt to corporate operations and meticulously manage document processes.",
      capabilities: [
        "Administrative Office Management",
        "Document & File Management",
        "Translation (TR ↔ AR)",
        "Presentation Preparation",
        "Corporate Communication",
        "Teamwork",
      ],
    },
    experience: {
      index: "02",
      title: "Experience",
      heading: "Field experience in education, administrative, and academic sectors.",
      items: [
        {
          role: "Summer Quran Course Instructor",
          org: "Ömer Şeyh Mosque",
          period: "2022 — 2023",
          location: "Gaziantep",
          points: [
            "Preparation and implementation of lesson programs for different age groups.",
            "Tracking student development and parent communication.",
          ],
        },
        {
          role: "Intern",
          org: "Ministry of National Education",
          period: "2026",
          location: "Gaziantep",
          points: [
            "Field experience in corporate processes, document management, and administrative operations.",
            "Reporting and filing work using office applications.",
          ],
        },
      ],
    },
    education: {
      index: "03",
      title: "Education",
      items: [
        {
          school: "Siirt University",
          degree: "Theology, Bachelor's",
          year: "2026",
          note: "Focus on Arabic language.",
          level: "Bachelor's",
        },
        {
          school: "Ömer Özmimar Anatolian Imam Hatip High School",
          degree: "High School Diploma",
          year: "2022",
          note: "Religious sciences and Arabic formation.",
          level: "High School",
        },
      ],
    },
    skills: {
      index: "04",
      title: "Skills",
      heading: "Office applications\nand design.",
      description:
        "Tools I confidently use in daily workflows and competencies I developed in corporate communication.",
      officeSkills: [
        { name: "Microsoft Word", level: "Advanced" },
        { name: "Microsoft Excel", level: "Intermediate" },
        { name: "Microsoft PowerPoint", level: "Advanced" },
        { name: "Canva", level: "Advanced" },
      ],
    },
    gallery: {
      index: "05",
      title: "Designs",
      hint: "Scroll to explore ↓",
      items: [
        { title: "Canva · Poster", desc: "Promotional poster" },
        { title: "Canva · Card", desc: "Business card design" },
        { title: "Slide Cover", desc: "PowerPoint cover" },
        { title: "Slide Layout", desc: "Training slide" },
        { title: "Data Table", desc: "Excel reporting" },
        { title: "Chart Layout", desc: "Excel chart" },
        { title: "Document Layout", desc: "Word document" },
        { title: "Document Cover", desc: "Word cover layout" },
      ],
    },
    certificates: {
      index: "06",
      title: "Certificates",
      heading: "Online education certificates.",
      count: "4 certificates",
      items: [
        {
          title: "Excel Basic Skills",
          issuer: "Online Education",
          pdf: "/certificates/Microsoft_Excel_Temelleri_Sertifika (ali).pdf",
        },
        {
          title: "PowerPoint Basic Skills",
          issuer: "Online Education",
          pdf: "/certificates/Microsoft_PowerPoint_Sertifika.pdf",
        },
        {
          title: "Word Basic Skills",
          issuer: "Online Education",
          pdf: "/certificates/Microsoft_Word_Temelleri_Sertifika..ali el omer.pdf",
        },
        {
          title: "Canva Applied",
          issuer: "Online Education",
          pdf: "/certificates/Uygulamal%C4%B1_Canva_Sertifika%20(ali).pdf",
        },
      ],
    },
    languagesSection: {
      index: "07",
      title: "Languages",
      heading: "Fluent communication\nin two languages.",
      items: [
        { name: "Arabic", level: "Advanced", value: 100 },
        { name: "Turkish", level: "Native", value: 100 },
      ],
    },
    contact: {
      index: "08",
      title: "Contact",
      heading: "Let's work together.\nGet in touch.",
      description:
        "I promptly respond to your messages for positions requiring education, administrative affairs, translation, or office management.",
      emailBtn: "Send email",
      items: [
        { k: "Location", v: "Gaziantep, Turkey" },
        { k: "Phone", v: "+90 538 587 77 39" },
        { k: "Email", v: "alielomer450@gmail.com" },
        { k: "LinkedIn", v: "linkedin.com/in/aliomerr" },
      ],
    },
    footer: {
      copyright: "© 2026 Ali Elömer",
      location: "Gaziantep, Turkey — alielomer450@gmail.com",
    },
    backToTop: "Back to top",
    contactLabel: "Contact",
    themeLabel: "Toggle theme",
    langLabel: "Change language",
  },
};

export type Translations = {
  nav: Record<string, string>;
  hero: {
    badge: string;
    name: string;
    subtitle: string;
    cvDownload: string;
    contactBtn: string;
    rotatingTexts: string[];
    infoKeys: Record<string, string>;
    infoValues: Record<string, string>;
    stats: Record<string, string>;
  };
  about: {
    index: string;
    title: string;
    heading: string;
    p1: string;
    p2: string;
    capabilities: string[];
  };
  experience: {
    index: string;
    title: string;
    heading: string;
    items: {
      role: string;
      org: string;
      period: string;
      location: string;
      points: string[];
    }[];
  };
  education: {
    index: string;
    title: string;
    items: {
      school: string;
      degree: string;
      year: string;
      note: string;
      level: string;
    }[];
  };
  skills: {
    index: string;
    title: string;
    heading: string;
    description: string;
    officeSkills: { name: string; level: string }[];
  };
  gallery: {
    index: string;
    title: string;
    hint: string;
    items: { title: string; desc: string }[];
  };
  certificates: {
    index: string;
    title: string;
    heading: string;
    count: string;
    items: { title: string; issuer: string; pdf: string }[];
  };
  languagesSection: {
    index: string;
    title: string;
    heading: string;
    items: { name: string; level: string; value: number }[];
  };
  contact: {
    index: string;
    title: string;
    heading: string;
    description: string;
    emailBtn: string;
    items: { k: string; v: string }[];
  };
  footer: { copyright: string; location: string };
  backToTop: string;
  contactLabel: string;
  themeLabel: string;
  langLabel: string;
};

/* ---------- Context ---------- */

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && ["tr", "ar", "en"].includes(saved)) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];
  const dir = "ltr";

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export { translations };
