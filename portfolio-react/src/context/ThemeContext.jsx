import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { writeStorage } from "../lib/storage.js";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // index.html already set data-theme before first paint; read it instead of guessing again.
  const [theme, setTheme] = useState(() =>
    document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    writeStorage("theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme: () => setTheme((p) => (p === "dark" ? "light" : "dark")) }),
    [theme]
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
