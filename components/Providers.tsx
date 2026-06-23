"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { PersonaId } from "@/lib/data";

interface Ctx {
  persona: PersonaId;
  setPersona: (p: PersonaId) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  toast: (msg: string) => void;
}

const AppContext = createContext<Ctx | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within Providers");
  return ctx;
}

export default function Providers({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<PersonaId>("student");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    const p = localStorage.getItem("cpa_persona") as PersonaId | null;
    const t = localStorage.getItem("cpa_theme") as "light" | "dark" | null;
    if (p) setPersonaState(p);
    if (t) { setTheme(t); document.documentElement.setAttribute("data-theme", t); }
  }, []);

  const setPersona = (p: PersonaId) => {
    setPersonaState(p);
    localStorage.setItem("cpa_persona", p);
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("cpa_theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const toast = (msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg(null), 2600);
  };

  return (
    <AppContext.Provider value={{ persona, setPersona, theme, toggleTheme, toast }}>
      {children}
      <div className={`toast${toastMsg ? " show" : ""}`} role="status" aria-live="polite">
        {toastMsg}
      </div>
    </AppContext.Provider>
  );
}
