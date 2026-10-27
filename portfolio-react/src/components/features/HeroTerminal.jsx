import { useEffect, useRef, useState } from "react";
import { SITE } from "../../data/site.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { scrollToSection } from "../../lib/scroll.js";

const SECTION_COMMANDS = ["skills", "projects", "activity", "certificates", "contact"];

export default function HeroTerminal() {
  const { t, setLang } = useLanguage();
  const { setTheme } = useTheme();
  const [lines, setLines] = useState([]);
  const [value, setValue] = useState("");
  const history = useRef([]);
  const cursor = useRef(-1);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const print = (text, kind = "out") => setLines((prev) => [...prev, { text, kind }]);

  function run(raw) {
    const input = raw.trim();
    if (!input) return;
    print(input, "command");
    history.current.push(input);
    cursor.current = history.current.length;

    const [name, arg = ""] = input.toLowerCase().split(/\s+/);

    if (SECTION_COMMANDS.includes(name)) {
      if (name === "skills") print(t("terminal.skills"));
      print(t("terminal.scrolling") + name + "…");
      return scrollToSection(name);
    }

    switch (name) {
      case "help": return print(t("terminal.help"));
      case "whoami": return print(t("terminal.whoami"));
      case "theme":
        if (arg === "light" || arg === "dark") {
          setTheme(arg);
          return print(t("terminal.themeSet") + arg);
        }
        return print(t("terminal.usageTheme"), "error");
      case "lang":
        if (arg === "en" || arg === "ar") {
          setLang(arg);
          return print(t("terminal.langSet") + arg);
        }
        return print(t("terminal.usageLang"), "error");
      case "resume":
      case "cv":
        print(t("terminal.resume"));
        return void setTimeout(() => window.print(), 300);
      case "github":
        print(t("terminal.opening") + "GitHub…");
        return void window.open(SITE.github, "_blank", "noopener,noreferrer");
      case "linkedin":
        print(t("terminal.opening") + "LinkedIn…");
        return void window.open(SITE.linkedin, "_blank", "noopener,noreferrer");
      case "clear": return setLines([]);
      case "sudo": return print(t("terminal.sudo"));
      default: return print(t("terminal.notFound") + name, "error");
    }
  }

  function onKeyDown(e) {
    const h = history.current;
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp" && h.length) {
      e.preventDefault();
      cursor.current = Math.max(0, cursor.current - 1);
      setValue(h[cursor.current] ?? "");
    } else if (e.key === "ArrowDown" && h.length) {
      e.preventDefault();
      cursor.current = Math.min(h.length, cursor.current + 1);
      setValue(h[cursor.current] ?? "");
    }
  }

  // Shell commands stay LTR even on the Arabic page, like a code block.
  return (
    <div dir="ltr" className="mb-8 overflow-hidden rounded-2xl border border-white/15 bg-[rgba(10,12,18,0.55)] text-left font-mono shadow-[0_12px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm print:hidden">
      <div className="flex items-center gap-2 bg-black/25 px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ms-2 text-xs text-white/60">{t("terminal.title")}</span>
      </div>
      <div ref={bodyRef} className="max-h-40 overflow-y-auto p-4 text-[0.85rem] leading-[1.7]" aria-live="polite">
        {lines.map((l, i) => (
          <p key={i} className={`mb-1 break-words whitespace-pre-wrap ${l.kind === "error" ? "text-[#ffb4b4]" : "text-white/90"}`}>
            {l.kind === "command" && <span className="text-accent">{"> "}</span>}
            {l.text}
          </p>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-white/10 px-4 py-2">
        <span className="font-bold text-accent">{">"}</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={t("terminal.placeholder")}
          aria-label="Terminal command"
          autoComplete="off"
          spellCheck="false"
          className="min-w-0 flex-1 border-none bg-transparent text-[0.85rem] text-white outline-none placeholder:text-white/40"
        />
      </div>
    </div>
  );
}
