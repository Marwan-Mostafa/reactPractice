import { useEffect, useMemo, useRef, useState } from "react";
import { SECTIONS, SITE } from "../../data/site.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useRecruiter } from "../../context/RecruiterContext.jsx";
import { scrollToSection } from "../../lib/scroll.js";
import { downloadVCard } from "../../lib/vcard.js";

export default function CommandPalette({ open, setOpen }) {
  const { t, lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const recruiter = useRecruiter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const commands = useMemo(() => {
    const nav = SECTIONS.map((id) => ({
      group: t("palette.nav"),
      label: t("palette.go") + t(`nav.${id}`),
      run: () => scrollToSection(id),
    }));
    const actions = [
      { label: theme === "dark" ? t("palette.themeLight") : t("palette.themeDark"), run: toggleTheme },
      { label: lang === "ar" ? t("palette.langEn") : t("palette.langAr"), run: toggleLang },
      { label: recruiter.on ? t("palette.recruiterOff") : t("palette.recruiterOn"), run: recruiter.toggle },
      { label: t("palette.copyEmail"), run: () => navigator.clipboard?.writeText(SITE.email).catch(() => {}) },
      { label: t("palette.github"), run: () => window.open(SITE.github, "_blank", "noopener,noreferrer") },
      { label: t("palette.linkedin"), run: () => window.open(SITE.linkedin, "_blank", "noopener,noreferrer") },
      { label: t("palette.cv"), run: () => window.print() },
      { label: t("palette.vcard"), run: downloadVCard },
    ].map((a) => ({ ...a, group: t("palette.actions") }));
    return [...nav, ...actions];
  }, [t, theme, lang, recruiter.on, toggleTheme, toggleLang, recruiter.toggle]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => c.label.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  // Global shortcut: Ctrl/Cmd + K toggles, Escape closes.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setOpen]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const choose = (cmd) => {
    cmd?.run();
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => (i + 1) % Math.max(results.length, 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1)); }
    else if (e.key === "Enter") { e.preventDefault(); choose(results[active]); }
    else if (e.key === "Tab") { e.preventDefault(); }
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-start justify-center pt-[12vh] print:hidden" role="dialog" aria-modal="true" aria-label={t("palette.open")}>
      <div className="absolute inset-0 bg-[rgba(6,8,12,0.6)] backdrop-blur-[3px]" onClick={() => setOpen(false)} />
      <div className="relative flex max-h-[60vh] w-[min(560px,92vw)] animate-[pop-in_0.18s_ease-out] flex-col overflow-hidden rounded-2xl bg-surface text-ink shadow-[0_20px_45px_rgba(0,0,0,0.5)]">
        <div className="border-b border-line p-4">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            onKeyDown={onKeyDown}
            placeholder={t("palette.placeholder")}
            aria-label={t("palette.placeholder")}
            className="w-full border-none bg-transparent text-base text-ink outline-none placeholder:text-muted"
          />
        </div>
        <ul role="listbox" className="m-0 list-none overflow-y-auto p-2">
          {results.length === 0 && <li className="p-4 text-center text-[0.9rem] text-muted">{t("palette.empty")}</li>}
          {results.map((cmd, i) => (
            <li
              key={cmd.group + cmd.label}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(cmd)}
              className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg px-4 py-3 ${i === active ? "bg-primary/10" : ""}`}
            >
              <span>{cmd.label}</span>
              <span className="ms-2 text-xs text-muted">{cmd.group}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
