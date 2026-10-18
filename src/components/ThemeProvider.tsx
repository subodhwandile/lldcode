"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type Theme = "dark" | "blueprint" | "paper" | "terminal" | "notebook";

export const THEMES: { id: Theme; label: string; icon: string }[] = [
  { id: "dark",      label: "Dark",       icon: "◼" },
  { id: "blueprint", label: "Blueprint",  icon: "⬡" },
  { id: "paper",     label: "Paper",      icon: "📄" },
  { id: "terminal",  label: "Terminal",   icon: ">" },
  { id: "notebook",  label: "Notebook",   icon: "▦" },
];

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: "dark", setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("lld-theme") as Theme;
      if (saved && THEMES.find(t => t.id === saved)) {
        setTheme(saved);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("lld-theme", theme); } catch {}
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
