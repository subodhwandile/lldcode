"use client";

import { useState } from "react";
import { useTheme, THEMES, Theme } from "@/components/ThemeProvider";

const themeColors: Record<Theme, string> = {
  dark:      "bg-zinc-800 text-zinc-300",
  blueprint: "bg-blue-950 text-blue-300",
  paper:     "bg-amber-100 text-amber-900",
  terminal:  "bg-black text-amber-400",
  notebook:  "bg-indigo-100 text-indigo-900",
};

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-zinc-200 transition-colors"
        title="Switch theme"
      >
        <span>{THEMES.find(t => t.id === theme)?.icon}</span>
        <span className="hidden sm:inline">{THEMES.find(t => t.id === theme)?.label}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl py-1.5 min-w-[140px]">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTheme(t.id); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-zinc-800 ${
                  theme === t.id ? "text-white" : "text-zinc-400"
                }`}
              >
                <span className={`w-5 h-5 rounded-md text-xs flex items-center justify-center ${themeColors[t.id]}`}>
                  {t.icon}
                </span>
                {t.label}
                {theme === t.id && <span className="ml-auto text-indigo-400 text-xs">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
