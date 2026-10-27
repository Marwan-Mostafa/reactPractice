import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import en from "../i18n/en.js";
import ar from "../i18n/ar.js";
import { writeStorage } from "../lib/storage.js";

const dictionaries = { en, ar };
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => (document.documentElement.lang === "ar" ? "ar" : "en"));

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    writeStorage("lang", lang);
  }, [lang]);

  const t = useCallback((key) => dictionaries[lang][key] ?? dictionaries.en[key] ?? key, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t, toggleLang: () => setLang((l) => (l === "ar" ? "en" : "ar")) }),
    [lang, t]
  );
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
