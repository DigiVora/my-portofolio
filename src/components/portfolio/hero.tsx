import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Terminal } from "lucide-react";
import { useI18n } from "./i18n";

const phrases = [
  "Software Developer",
  "Founder of DigiVora Studio",
  "Information Systems Student",
];

function Typewriter() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = phrases[i % phrases.length];
    const speed = del ? 35 : 70;
    const t = setTimeout(() => {
      if (!del) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDel(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next.length === 0) {
          setDel(false);
          setI((v) => v + 1);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return (
    <span className="font-mono text-[var(--cyan)]">
      {text}
      <span className="inline-block w-[2px] h-[1em] align-[-0.1em] bg-[var(--cyan)] ml-1 animate-blink" />
    </span>
  );
}

export function Hero() {
  const { t } = useI18n();
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* layered backgrounds */}
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute -top-40 -left-40 size-[520px] rounded-full bg-[var(--primary)]/20 blur-[120px] animate-glow-pulse" />
      <div className="absolute -bottom-40 -right-32 size-[520px] rounded-full bg-[var(--cyan)]/20 blur-[120px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs text-muted-foreground mb-6"
          >
            <span className="size-2 rounded-full bg-[var(--cyan)] shadow-[0_0_10px_var(--cyan)]" />
            {t("hero.available")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
          >
            {t("hero.hello")}{" "}
            <span className="text-gradient">Achmad Khusnul Yakin</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg sm:text-xl text-muted-foreground min-h-[1.75em]"
          >
            {t("hero.iam")} <Typewriter />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-4 max-w-xl text-muted-foreground leading-relaxed"
          >
            {t("hero.intro")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground bg-gradient-to-r from-[var(--primary)] to-[var(--cyan)] shadow-[0_0_30px_-6px_var(--glow)] hover:shadow-[0_0_50px_-6px_var(--glow)] transition-all hover:-translate-y-0.5"
            >
              {t("hero.cta.projects")}
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 text-sm font-medium hover-lift"
            >
              <Mail className="size-4" />
              {t("hero.cta.contact")}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 grid grid-cols-3 max-w-md gap-6"
          >
            {[
              { v: "20+", l: t("hero.stat.projects") },
              { v: "3+", l: t("hero.stat.years") },
              { v: "15+", l: t("hero.stat.tech") },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl font-bold text-foreground">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — terminal/code card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute -inset-6 bg-gradient-to-tr from-[var(--primary)]/30 via-transparent to-[var(--cyan)]/30 blur-3xl opacity-60" />
          <div className="relative glass-strong rounded-2xl p-5 sm:p-6 glow-cyan animate-float">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-red-400/70" />
                <span className="size-2.5 rounded-full bg-yellow-400/70" />
                <span className="size-2.5 rounded-full bg-green-400/70" />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
                <Terminal className="size-3" /> ~/digivora — zsh
              </div>
            </div>
            <pre className="mt-4 font-mono text-[12.5px] sm:text-sm leading-relaxed text-muted-foreground overflow-hidden">
{`> whoami
`}<span className="text-[var(--cyan)]">achmad khusnul yakin</span>{`

> cat profile.json
{
  "role":   `}<span className="text-[var(--cyan)]">"Software Developer"</span>{`,
  "studio": `}<span className="text-[var(--cyan)]">"DigiVora Studio"</span>{`,
  "stack":  ["Java", "C++", "JavaScript"],
  "focus":  `}<span className="text-[var(--cyan)]">"clean • modern • impactful"</span>{`
}

> ./build_future.sh`}<span className="inline-block w-[8px] h-[14px] align-[-2px] bg-[var(--cyan)] ml-1 animate-blink" />
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}