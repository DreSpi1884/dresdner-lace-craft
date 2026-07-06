import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type Lang = "en" | "de";

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Return English or German string based on active language. */
  t: (en: string, de: string) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = "ds-lang";

const readInitial = (): Lang => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "de") return stored;
    const nav = typeof navigator !== "undefined" ? navigator.language?.toLowerCase() : "";
    if (nav && nav.startsWith("de")) return "de";
  } catch { /* noop */ }
  return "en";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => readInitial());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch { /* noop */ }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const t = useCallback((en: string, de: string) => (lang === "de" ? de : en), [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
