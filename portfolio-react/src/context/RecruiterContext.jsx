import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { readStorage, writeStorage } from "../lib/storage.js";

const RecruiterContext = createContext(null);

export function RecruiterProvider({ children }) {
  const [on, setOn] = useState(() => readStorage("recruiterMode") === "1");

  useEffect(() => {
    writeStorage("recruiterMode", on ? "1" : "0");
  }, [on]);

  const value = useMemo(() => ({ on, toggle: () => setOn((v) => !v) }), [on]);
  return <RecruiterContext.Provider value={value}>{children}</RecruiterContext.Provider>;
}

export function useRecruiter() {
  const ctx = useContext(RecruiterContext);
  if (!ctx) throw new Error("useRecruiter must be used inside <RecruiterProvider>");
  return ctx;
}
