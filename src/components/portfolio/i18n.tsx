import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Lang = "id" | "en";
type Dict = Record<string, { id: string; en: string }>;

const dict: Dict = {
  // nav
  "nav.home": { id: "Beranda", en: "Home" },
  "nav.about": { id: "Tentang", en: "About" },
  "nav.skills": { id: "Keahlian", en: "Skills" },
  "nav.services": { id: "Layanan", en: "Services" },
  "nav.projects": { id: "Project", en: "Projects" },
  "nav.contact": { id: "Kontak", en: "Contact" },

  // hero
  "hero.available": { id: "Tersedia untuk kolaborasi", en: "Available for collaboration" },
  "hero.hello": { id: "Halo, Saya", en: "Hello, I'm" },
  "hero.iam": { id: "Saya seorang", en: "I am an" },
  "hero.intro": {
    id: "Mahasiswa Sistem Informasi, Software Developer, dan Founder DigiVora Studio — fokus membangun solusi digital yang bersih, modern, dan berdampak.",
    en: "Information Systems Student, Software Developer, and Founder of DigiVora Studio — focused on building clean, modern, and impactful digital solutions.",
  },
  "hero.cta.projects": { id: "Lihat Project", en: "View Projects" },
  "hero.cta.contact": { id: "Hubungi Saya", en: "Contact Me" },
  "hero.stat.projects": { id: "Project", en: "Projects" },
  "hero.stat.years": { id: "Tahun Coding", en: "Years Coding" },
  "hero.stat.tech": { id: "Teknologi", en: "Technologies" },

  // about
  "about.eyebrow": { id: "Tentang Saya", en: "About Me" },
  "about.title.a": { id: "Kode yang", en: "Code that's" },
  "about.title.clean": { id: "bersih", en: "clean" },
  "about.title.b": { id: ", desain yang terasa", en: ", design that feels" },
  "about.title.premium": { id: "premium", en: "premium" },
  "about.p1": {
    id: "Halo! Saya Achmad Khusnul Yakin, seorang mahasiswa Sistem Informasi di Institut Teknologi Mojosari. Saya memiliki ketertarikan mendalam dalam dunia pengembangan perangkat lunak (software development), arsitektur kode, dan logika pemrograman.",
    en: "Hi! I'm Achmad Khusnul Yakin, an Information Systems student at Institut Teknologi Mojosari. I have a deep interest in software development, code architecture, and programming logic.",
  },
  "about.p2": {
    id: "Selain sibuk di dunia akademis, saya juga aktif membangun dan memimpin DigiVora Studio, sebuah wadah kreatif tempat kami mentransformasikan ide-ide digital menjadi solusi nyata. Saya percaya bahwa kode yang baik bukan cuma bisa berjalan, tapi juga harus bersih, efisien, dan memiliki visual yang rapi.",
    en: "Beyond academics, I actively build and lead DigiVora Studio, a creative space where we transform digital ideas into real solutions. I believe great code doesn't just run — it should be clean, efficient, and visually refined.",
  },
  "about.stat.shipped": { id: "Project Selesai", en: "Projects Shipped" },
  "about.stat.years": { id: "Tahun Pengalaman", en: "Years Experience" },
  "about.stat.student": { id: "Mahasiswa Mojosari", en: "Mojosari Student" },
  "about.currently": { id: "Sedang", en: "Currently" },
  "about.building": { id: "Membangun DigiVora", en: "Building DigiVora" },

  // skills
  "skills.eyebrow": { id: "Keahlian", en: "Skills" },
  "skills.title": { id: "Programming Languages & Tools", en: "Programming Languages & Tools" },
  "skills.sub": {
    id: "Stack yang saya gunakan untuk membangun pengalaman digital modern.",
    en: "The stack I use to craft modern digital experiences.",
  },
  "skills.langs": { id: "Programming Languages", en: "Programming Languages" },
  "skills.tools": { id: "Tools & Platforms", en: "Tools & Platforms" },
  "skills.cat.lang": { id: "Bahasa", en: "Language" },
  "skills.cat.db": { id: "Database", en: "Database" },

  // services
  "services.eyebrow": { id: "Yang Saya Kerjakan", en: "What I Do" },
  "services.title.a": { id: "Layanan untuk", en: "Services tailored for" },
  "services.title.b": { id: "tim modern", en: "modern teams" },
  "services.sub": {
    id: "Dari wireframe pertama hingga deployment produksi — dengan craft.",
    en: "From the first wireframe to production deployment — done with craft.",
  },

  // services items
  "svc.web.t": { id: "Pengembangan Web", en: "Web Development" },
  "svc.web.d": {
    id: "Website & web app modern, cepat, dan responsif dibangun dengan React, Next.js, dan arsitektur clean code.",
    en: "Modern, fast, responsive websites & web apps built with React, Next.js, and clean architecture.",
  },
  "svc.uiux.t": { id: "Desain UI/UX", en: "UI/UX Design" },
  "svc.uiux.d": {
    id: "Antarmuka premium dengan perhatian pada hierarki, motion, dan detail kecil yang dirasakan pengguna.",
    en: "Premium interfaces with attention to hierarchy, motion, and the small details users feel.",
  },
  "svc.dash.t": { id: "Sistem Dashboard", en: "Dashboard System" },
  "svc.dash.d": {
    id: "Admin panel dan tools internal dengan data realtime, chart, dan workflow yang intuitif.",
    en: "Admin panels and internal tools with real-time data, charts, and intuitive workflows.",
  },
  "svc.brand.t": { id: "Branding Digital", en: "Digital Branding" },
  "svc.brand.d": {
    id: "Identitas visual yang berkesan — sistem logo, warna, tipografi, dan bahasa visual yang kohesif.",
    en: "Visual identity that lands — logo systems, color, typography, and a cohesive language.",
  },
  "svc.sol.t": { id: "Solusi Digital", en: "Digital Solutions" },
  "svc.sol.d": {
    id: "Pengembangan produk end-to-end dari ide dan desain hingga launch dan iterasi.",
    en: "End-to-end product development from idea and design to launch and iteration.",
  },
  "svc.code.t": { id: "Code Review & Refactor", en: "Code Review & Refactor" },
  "svc.code.d": {
    id: "Buat codebase kamu bersih, mudah dirawat, dan siap di-scale tanpa merusak yang sudah berjalan.",
    en: "Make your codebase clean, maintainable, and ready to scale without breaking what works.",
  },

  // projects
  "projects.eyebrow": { id: "Project", en: "Projects" },
  "projects.title.a": { id: "Karya", en: "Selected" },
  "projects.title.b": { id: "pilihan", en: "work" },
  "projects.sub": {
    id: "Beberapa produk yang saya bangun bersama DigiVora — masing-masing fokus pada craft.",
    en: "A handful of products I've built with DigiVora — each one focused on craft.",
  },

  // contact
  "contact.eyebrow": { id: "Hubungi Saya", en: "Get in touch" },
  "contact.title.a": { id: "Mari bangun sesuatu yang", en: "Let's build something" },
  "contact.title.b": { id: "luar biasa", en: "remarkable" },
  "contact.sub": {
    id: "Kirim pesan — untuk kolaborasi, freelance, atau sekadar menyapa.",
    en: "Drop a message — for collaboration, freelance, or just a quick hello.",
  },
  "contact.name": { id: "Nama kamu", en: "Your name" },
  "contact.email": { id: "email@kamu.com", en: "you@email.com" },
  "contact.msg": { id: "Ceritakan tentang project kamu…", en: "Tell me about your project…" },
  "contact.send": { id: "Kirim Pesan", en: "Send Message" },
  "contact.sent": { id: "Pesan Terkirim ✓", en: "Message Sent ✓" },
  "contact.service": { id: "Layanan", en: "Service" },
  "contact.service.placeholder": { id: "Pilih layanan", en: "Select a service" },

  // footer
  "footer.rights": { id: "Hak cipta dilindungi.", en: "All rights reserved." },
  "footer.tagline": {
    id: "// \"lebih dari sekedar kode — ini adalah identitas digital.\"",
    en: "// \"more than code — it is a digital identity.\"",
  },
};

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof dict) => string }>({
  lang: "id",
  setLang: () => {},
  t: (k) => dict[k]?.id ?? String(k),
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (stored === "id" || stored === "en") setLangState(stored);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };
  const t = (k: keyof typeof dict) => dict[k]?.[lang] ?? String(k);
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  return useContext(Ctx);
}

export function LanguageToggle() {
  const { lang, setLang } = useI18n();
  const next = lang === "id" ? "en" : "id";
  return (
    <button
      onClick={() => setLang(next)}
      aria-label={`Switch language to ${next.toUpperCase()}`}
      title={`Switch to ${next.toUpperCase()}`}
      className="glass rounded-full size-9 grid place-items-center hover-lift font-mono text-[11px] font-bold tracking-wider text-[var(--cyan)]"
    >
      {lang.toUpperCase()}
    </button>
  );
}