import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./theme";
import { LanguageToggle, useI18n } from "./i18n";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { t } = useI18n();

  const links = [
    { href: "#home", label: t("nav.home") },
    { href: "#about", label: t("nav.about") },
    { href: "#skills", label: t("nav.skills") },
    { href: "#services", label: t("nav.services") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative" ref={menuRef}>
        <nav
          className={`relative flex items-center justify-between rounded-2xl px-4 sm:px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong" : "glass"
          }`}
        >
          <div>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex items-center gap-2 group focus:outline-none"
            >
              <span className="grid place-items-center h-8 px-2.5 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--cyan)] font-display font-bold text-[13px] tracking-wider text-white shadow-[0_0_20px_-4px_var(--glow)] group-hover:shadow-[0_0_28px_-2px_var(--glow)] transition-shadow">
                AKY
              </span>
              <span className="font-display font-semibold tracking-tight hidden sm:block">
                Achmad<span className="text-[var(--cyan)]">.</span>
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>
        {open && (
            <div
              className="absolute left-0 right-0 top-[calc(100%+0.5rem)] rounded-2xl p-2 shadow-[0_20px_60px_-20px_var(--glow)] animate-in fade-in slide-in-from-top-2 duration-200 border border-border"
              style={{
                background: "color-mix(in oklab, var(--card) 96%, transparent)",
                backdropFilter: "blur(24px) saturate(160%)",
                WebkitBackdropFilter: "blur(24px) saturate(160%)",
              }}
            >
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block text-center px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-[var(--cyan)]/10 transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}