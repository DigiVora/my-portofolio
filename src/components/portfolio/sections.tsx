import { SectionHeader, Reveal } from "./section";
import profileImg from "@/assets/profile.jpg";
import canvaIcon from "@/assets/canva.png";
import mysqlIcon from "@/assets/mysql.png";
import {
  Code2, Palette, LayoutDashboard, Sparkles, Globe,
  Github, Linkedin, Instagram, Send, Mail, ExternalLink,
  Briefcase, GraduationCap, Rocket,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "./i18n";

/* Reliable skill progress bar: uses IntersectionObserver + CSS transition
   instead of framer-motion whileInView (which can fail in production builds). */
function SkillBar({ lvl, delay = 0 }: { lvl: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    // fallback safety: ensure bars render even if observer never fires
    const fallback = window.setTimeout(() => setShown(true), 1500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative mt-4 h-1.5 rounded-full bg-white/5 overflow-hidden"
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--cyan)] to-[var(--cyan)] shadow-[0_0_12px_var(--glow)]"
        style={{
          width: shown ? `${lvl}%` : "0%",
          transition: `width 1.1s cubic-bezier(0.2,0.8,0.2,1) ${delay}s`,
        }}
      />
    </div>
  );
}

/* ---------------- ABOUT ---------------- */
export function About() {
  const { t } = useI18n();
  const stats = [
    { icon: Rocket, v: "20+", l: t("about.stat.shipped") },
    { icon: Briefcase, v: "3+", l: t("about.stat.years") },
    { icon: GraduationCap, v: "IT", l: t("about.stat.student") },
  ];
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t("about.eyebrow")}
          title={<>{t("about.title.a")} <span className="text-gradient">{t("about.title.clean")}</span>{t("about.title.b")} <span className="text-gradient">{t("about.title.premium")}</span>.</>}
        />
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-tr from-[var(--primary)]/40 to-[var(--cyan)]/40 rounded-3xl blur-2xl opacity-50" />
              <div className="relative glass-strong rounded-3xl p-2 overflow-hidden">
                <img
                  src={profileImg}
                  alt="Achmad Khusnul Yakin"
                  width={768}
                  height={896}
                  loading="lazy"
                  className="rounded-2xl w-full object-cover aspect-[4/5]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 glass-strong rounded-2xl px-4 py-3 flex items-center gap-3">
                <span className="size-2 rounded-full bg-[var(--cyan)] shadow-[0_0_10px_var(--cyan)] animate-glow-pulse" />
                <div>
                  <div className="text-xs text-muted-foreground">{t("about.currently")}</div>
                  <div className="text-sm font-medium">{t("about.building")}</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {stats.map((s, i) => (
                <Reveal key={s.l} delay={0.15 + i * 0.08}>
                  <div className="glass rounded-2xl p-4 hover-lift">
                    <s.icon className="size-5 text-[var(--cyan)] mb-3" />
                    <div className="font-display text-xl font-bold">{s.v}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SKILLS ---------------- */
// Use Devicon CDN for OFFICIAL multi-color brand logos (no color override).
const devicon = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}.svg`;

export function Skills() {
  const { t } = useI18n();
  const langs = [
    { n: "Java",       icon: devicon("java/java-original"),               lvl: 90, cat: t("skills.cat.lang") },
    { n: "C++",        icon: devicon("cplusplus/cplusplus-original"),     lvl: 80, cat: t("skills.cat.lang") },
    { n: "JavaScript", icon: devicon("javascript/javascript-original"),   lvl: 88, cat: t("skills.cat.lang") },
    { n: "TypeScript", icon: devicon("typescript/typescript-original"),   lvl: 82, cat: t("skills.cat.lang") },
    { n: "PHP",        icon: devicon("php/php-original"),                 lvl: 75, cat: t("skills.cat.lang") },
    { n: "Python",     icon: devicon("python/python-original"),           lvl: 70, cat: t("skills.cat.lang") },
    { n: "MySQL",      icon: mysqlIcon,                                   lvl: 78, cat: t("skills.cat.db")   },
    { n: "MongoDB",    icon: devicon("mongodb/mongodb-original"),         lvl: 72, cat: t("skills.cat.db")   },
  ];
  const tools = [
    { n: "Figma",        icon: devicon("figma/figma-original") },
    { n: "Canva",        icon: canvaIcon },
    { n: "VS Code",      icon: devicon("vscode/vscode-original") },
    { n: "GitHub",       icon: devicon("github/github-original"),       invertOnDark: true },
    { n: "Docker",       icon: devicon("docker/docker-original") },
    { n: "Tailwind CSS", icon: devicon("tailwindcss/tailwindcss-original") },
    { n: "React",        icon: devicon("react/react-original") },
    { n: "Next.js",      icon: devicon("nextjs/nextjs-original"),       invertOnDark: true },
  ];

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t("skills.eyebrow")}
          title={<><span className="text-gradient">Programming Languages</span> & Tools</>}
          subtitle={t("skills.sub")}
        />

        {/* Programming Languages */}
        <Reveal>
          <div className="flex items-center gap-2 mb-6">
            <Code2 className="size-5 text-[var(--cyan)]" />
            <h3 className="font-display text-lg font-semibold">{t("skills.langs")}</h3>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {langs.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.05}>
              <div className="group relative glass-strong rounded-2xl p-5 hover-lift overflow-hidden h-full">
                <div className="absolute -top-10 -right-10 size-32 rounded-full bg-[var(--cyan)]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-start justify-between gap-3 mb-4">
                  <div className="size-11 rounded-xl glass grid place-items-center group-hover:scale-110 transition-transform">
                    <img
                      src={p.icon}
                      alt={p.n}
                      width={22}
                      height={22}
                      loading="lazy"
                      className="size-[22px] object-contain"
                    />
                  </div>
                  <span className="font-mono text-[11px] text-[var(--cyan)] tabular-nums">{p.lvl}%</span>
                </div>
                <div className="relative">
                  <div className="font-display font-semibold text-base">{p.n}</div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono mt-0.5">{p.cat}</div>
                </div>
                <SkillBar lvl={p.lvl} delay={i * 0.05} />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Tools */}
        <Reveal>
          <div className="flex items-center gap-2 mt-16 mb-6">
            <Sparkles className="size-5 text-[var(--cyan)]" />
            <h3 className="font-display text-lg font-semibold">{t("skills.tools")}</h3>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {tools.map((tool, i) => (
            <Reveal key={tool.n} delay={i * 0.04}>
              <div className="group relative glass rounded-2xl p-4 sm:p-5 flex items-center gap-3 hover-lift overflow-hidden animate-float" style={{ animationDelay: `${i * 0.25}s` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan)]/0 to-[var(--cyan)]/0 group-hover:from-[var(--cyan)]/10 group-hover:to-transparent transition-all" />
                <div className="absolute -bottom-8 -right-8 size-24 rounded-full bg-[var(--cyan)]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative size-10 rounded-xl glass grid place-items-center group-hover:scale-110 transition-transform shrink-0">
                  <img
                    src={tool.icon}
                    alt={tool.n}
                    width={20}
                    height={20}
                    loading="lazy"
                    className={`size-5 object-contain ${tool.invertOnDark ? "invert [.light_&]:invert-0" : ""}`}
                  />
                </div>
                <div className="relative text-sm font-medium truncate">{tool.n}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
export function Services() {
  const { t } = useI18n();
  const services = [
    { icon: Globe,           t: t("svc.web.t"),   d: t("svc.web.d") },
    { icon: Palette,         t: t("svc.uiux.t"),  d: t("svc.uiux.d") },
    { icon: LayoutDashboard, t: t("svc.dash.t"),  d: t("svc.dash.d") },
    { icon: Sparkles,        t: t("svc.brand.t"), d: t("svc.brand.d") },
    { icon: Rocket,          t: t("svc.sol.t"),   d: t("svc.sol.d") },
    { icon: Code2,           t: t("svc.code.t"),  d: t("svc.code.d") },
  ];
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t("services.eyebrow")}
          title={<>{t("services.title.a")} <span className="text-gradient">{t("services.title.b")}</span>.</>}
          subtitle={t("services.sub")}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.05}>
              <div className="group relative glass rounded-2xl p-6 hover-lift h-full overflow-hidden">
                <div className="absolute -top-12 -right-12 size-40 rounded-full bg-[var(--cyan)]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="size-11 rounded-xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--cyan)]/20 border border-border grid place-items-center mb-4 group-hover:scale-110 transition-transform">
                    <s.icon className="size-5 text-[var(--cyan)]" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{s.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */
const projects = [
  {
    title: "DigiVora Studio",
    desc: {
      id: "Landing page resmi DigiVora Studio — identitas visual, motion premium, dan arsitektur clean code untuk membangun first impression yang berkelas.",
      en: "Official landing page for DigiVora Studio — visual identity, premium motion, and clean-code architecture crafted for a high-end first impression.",
    },
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    grad: "from-[#3B82F6] via-[#06B6D4] to-[#22D3EE]",
  },
  {
    title: "DigiVora Bot",
    desc: {
      id: "Bot otomasi multi-platform untuk DigiVora — chat command, notifikasi realtime, dan workflow internal yang mempercepat operasional studio.",
      en: "Multi-platform automation bot for DigiVora — chat commands, realtime notifications, and internal workflows that speed up studio operations.",
    },
    tags: ["Node.js", "TypeScript", "Webhooks"],
    grad: "from-[#22D3EE] via-[#3B82F6] to-[#1E3A8A]",
  },
  {
    title: "DigiVora Pay",
    desc: {
      id: "Sistem pembayaran digital DigiVora — checkout modern, integrasi payment gateway, dan dashboard transaksi dengan UX yang elegan.",
      en: "DigiVora's digital payment system — modern checkout, payment gateway integration, and an elegant transaction dashboard.",
    },
    tags: ["Next.js", "Node.js", "Payment API"],
    grad: "from-[#06B6D4] via-[#3B82F6] to-[#0F172A]",
  },
  {
    title: "DigiVora Store",
    desc: {
      id: "E-commerce DigiVora untuk produk dan layanan digital — katalog, keranjang, dan admin panel yang ringan, cepat, dan responsif.",
      en: "DigiVora's e-commerce for digital products and services — catalog, cart, and admin panel that's lightweight, fast, and responsive.",
    },
    tags: ["React", "TypeScript", "Tailwind"],
    grad: "from-[#3B82F6] via-[#22D3EE] to-[#06B6D4]",
  },
];

export function Projects() {
  const { t, lang } = useI18n();
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t("projects.eyebrow")}
          title={<>{t("projects.title.a")} <span className="text-gradient">{t("projects.title.b")}</span>.</>}
          subtitle={t("projects.sub")}
        />
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <article className="group glass-strong rounded-2xl overflow-hidden hover-lift h-full flex flex-col">
                <div className={`relative aspect-[16/10] bg-gradient-to-br ${p.grad} overflow-hidden`}>
                  <div className="absolute inset-0 bg-grid opacity-30 mix-blend-overlay" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-5xl font-bold text-white/90 drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)] tracking-tight">
                      {p.title.split(" ").map(w => w[0]).join("")}
                    </span>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 flex items-center justify-center gap-3">
                    <a className="glass-strong rounded-full px-4 py-2 text-xs font-medium inline-flex items-center gap-1.5" href="#">
                      <ExternalLink className="size-3.5" /> Preview
                    </a>
                    <a className="glass-strong rounded-full px-4 py-2 text-xs font-medium inline-flex items-center gap-1.5" href="https://github.com/DigiVora" target="_blank" rel="noreferrer">
                      <Github className="size-3.5" /> Code
                    </a>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{p.desc[lang]}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-border text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT + SOCIAL ---------------- */
const socials = [
  { key: "github",    icon: Github,    label: "GitHub",    handle: "@DigiVora",            href: "https://github.com/DigiVora" },
  { key: "linkedin",  icon: Linkedin,  label: "LinkedIn",  handle: "Achmad Khusnul Yakin", href: "https://www.linkedin.com/in/achmad-khusnul-yakin-25b87a3a2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  { key: "instagram", icon: Instagram, label: "Instagram", handle: "@achmadkhusnulyakin", href: "https://www.instagram.com/achmadkhusnulyakin?igsh=MXY2bTlybmhidDN3YQ==" },
  { key: "telegram",  icon: Send,      label: "Telegram",  handle: "@achmad_khusnul_yakin", href: "https://t.me/achmad_khusnul_yakin" },
  { key: "email",     icon: Mail,      label: "Email",     handle: "ahmadkhusnulyakin26@gmail.com", href: "mailto:ahmadkhusnulyakin26@gmail.com" },
];

export function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });

  const serviceOptions = [
    "Web Development",
    "UI/UX Design",
    "Dashboard System",
    "Branding Digital",
    "Digital Solutions",
    "Code Review & Refactor",
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const service = form.service || "General Inquiry";
    const subject = `New Project Inquiry - ${service}`;
    const body =
      `Hello, Achmad Khusnul Yakin\n\n` +
      `Name:\n${form.name}\n\n` +
      `Email:\n${form.email}\n\n` +
      `Service:\n${service}\n\n` +
      `Message:\n${form.message}\n`;
    const url = `mailto:ahmadkhusnulyakin26@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t("contact.eyebrow")}
          title={<>{t("contact.title.a")} <span className="text-gradient">{t("contact.title.b")}</span>.</>}
          subtitle={t("contact.sub")}
        />
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6">
          <Reveal>
            <div className="space-y-3">
              {socials.map((s) => {
                const active = activeKey === s.key;
                return (
                  <a
                    key={s.key}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    onMouseEnter={() => setActiveKey(s.key)}
                    onMouseLeave={() => setActiveKey((k) => (k === s.key ? null : k))}
                    onFocus={() => setActiveKey(s.key)}
                    onBlur={() => setActiveKey((k) => (k === s.key ? null : k))}
                    onClick={() => setActiveKey(s.key)}
                    onTouchStart={() => setActiveKey(s.key)}
                    className="group flex items-center justify-between glass rounded-2xl px-5 py-4 hover-lift"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="size-10 rounded-xl glass grid place-items-center transition-colors group-hover:bg-[var(--cyan)]/15 shrink-0">
                        <s.icon className="size-4 text-[var(--cyan)]" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium">{s.label}</div>
                        <div className="text-xs text-muted-foreground font-mono truncate">{s.handle}</div>
                      </div>
                    </div>
                    <ExternalLink
                      className={`size-4 shrink-0 ml-2 transition-all duration-300 ${
                        active
                          ? "opacity-100 translate-x-0 text-[var(--cyan)]"
                          : "opacity-0 -translate-x-1 text-muted-foreground"
                      }`}
                    />
                  </a>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSendMessage}
              className="relative glass-strong rounded-3xl p-6 sm:p-8 space-y-4"
            >
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[var(--primary)]/20 via-transparent to-[var(--cyan)]/20 -z-10 blur" />
              <div>
                <label className="text-xs text-muted-foreground font-mono">_name</label>
                <input
                  type="text" required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1.5 w-full bg-transparent border border-border focus:border-[var(--cyan)] focus:shadow-[0_0_0_3px_var(--glow)] outline-none rounded-xl px-4 py-3 text-sm transition-all"
                  placeholder={t("contact.name")}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-mono">_email</label>
                <input
                  type="email" required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1.5 w-full bg-transparent border border-border focus:border-[var(--cyan)] focus:shadow-[0_0_0_3px_var(--glow)] outline-none rounded-xl px-4 py-3 text-sm transition-all"
                  placeholder={t("contact.email")}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-mono">_service</label>
                <select
                  required
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="mt-1.5 w-full bg-transparent border border-border focus:border-[var(--cyan)] focus:shadow-[0_0_0_3px_var(--glow)] outline-none rounded-xl px-4 py-3 text-sm transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-background text-foreground">
                    {t("contact.service.placeholder")}
                  </option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s} className="bg-background text-foreground">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-mono">_message</label>
                <textarea
                  required rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1.5 w-full bg-transparent border border-border focus:border-[var(--cyan)] focus:shadow-[0_0_0_3px_var(--glow)] outline-none rounded-xl px-4 py-3 text-sm transition-all resize-none"
                  placeholder={t("contact.msg")}
                />
              </div>
              <button
                type="submit"
                className="group w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium text-primary-foreground bg-gradient-to-r from-[var(--primary)] to-[var(--cyan)] shadow-[0_0_30px_-8px_var(--glow)] hover:shadow-[0_0_50px_-6px_var(--glow)] transition-all"
              >
                {sent ? t("contact.sent") : <>{t("contact.send")} <Send className="size-4 group-hover:translate-x-0.5 transition-transform" /></>}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative py-12 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs text-muted-foreground text-center sm:text-left">
          {t("footer.tagline")}
        </p>
        <p className="text-xs text-muted-foreground text-center sm:text-right">
          © {new Date().getFullYear()} Achmad Khusnul Yakin. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}