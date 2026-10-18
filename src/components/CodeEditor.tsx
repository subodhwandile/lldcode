"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Play, ChevronDown, RotateCcw, Save } from "lucide-react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface CodeEditorProps {
  problemSlug: string;
  starterCode: Record<string, string>;
}

const LANGUAGES = [
  { id: "java", label: "Java", monaco: "java" },
  { id: "cpp", label: "C++", monaco: "cpp" },
  { id: "javascript", label: "JavaScript", monaco: "javascript" },
];

type SaveStatus = "saved" | "saving" | "idle";

function storageKey(slug: string, lang: string) {
  return `lldcode:${slug}:${lang}`;
}

function loadSaved(slug: string, lang: string, fallback: string): string {
  try {
    return localStorage.getItem(storageKey(slug, lang)) ?? fallback;
  } catch {
    return fallback;
  }
}

function persistCode(slug: string, lang: string, code: string) {
  try {
    localStorage.setItem(storageKey(slug, lang), code);
  } catch {
    // localStorage full or unavailable
  }
}

export function CodeEditor({ problemSlug, starterCode }: CodeEditorProps) {
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(() => loadSaved(problemSlug, "java", starterCode["java"] || ""));
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstMount = useRef(true);

  // Autosave: debounce 1.5s after user stops typing
  useEffect(() => {
    // Skip saving on first mount (don't overwrite with starter code)
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    setSaveStatus("saving");

    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);

    autosaveTimer.current = setTimeout(() => {
      persistCode(problemSlug, language, code);
      setSaveStatus("saved");

      // Reset to idle after 2s
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1500);

    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
  }, [code, language, problemSlug]);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(loadSaved(problemSlug, lang, starterCode[lang] || ""));
    setShowLangMenu(false);
    setOutput("");
    setStatus("idle");
    setSaveStatus("idle");
    isFirstMount.current = true; // treat lang switch like a fresh mount
  };

  const handleReset = () => {
    const starter = starterCode[language] || "";
    setCode(starter);
    persistCode(problemSlug, language, starter);
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2000);
  };

  const handleRun = useCallback(async () => {
    if (running) return;
    setRunning(true);
    setOutput("Running...");
    setStatus("idle");

    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, problemSlug }),
      });

      const data = await res.json();

      if (!res.ok) {
        setOutput(data.error || "Execution failed");
        setStatus("error");
        return;
      }

      setOutput(data.output || "(no output)");
      setStatus(data.status === "success" ? "success" : "error");
    } catch {
      setOutput("Network error — could not reach execution service");
      setStatus("error");
    } finally {
      setRunning(false);
    }
  }, [code, language, problemSlug, running]);

  const currentLang = LANGUAGES.find((l) => l.id === language)!;

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900">
        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-2 text-sm text-zinc-300 bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-md transition-colors"
            >
              {currentLang.label}
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            </button>
            {showLangMenu && (
              <div className="absolute top-full left-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl z-10 min-w-[120px]">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => handleLanguageChange(lang.id)}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-zinc-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      language === lang.id ? "text-indigo-400 bg-zinc-700" : "text-zinc-300"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Autosave indicator */}
          <div className="flex items-center gap-1.5 text-xs">
            {saveStatus === "saving" && (
              <span className="text-zinc-600 flex items-center gap-1">
                <Save className="w-3 h-3 animate-pulse" /> Saving...
              </span>
            )}
            {saveStatus === "saved" && (
              <span className="text-emerald-600 flex items-center gap-1">
                <Save className="w-3 h-3" /> Saved
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Reset to starter code */}
          <button
            onClick={handleReset}
            title="Reset to starter code"
            className="text-zinc-600 hover:text-zinc-400 transition-colors p-1.5 rounded"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <Button
            variant="success"
            size="sm"
            onClick={handleRun}
            disabled={running}
            className="gap-1.5"
          >
            <Play className="w-3.5 h-3.5" />
            {running ? "Running..." : "Run Code"}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-0">
        <MonacoEditor
          height="100%"
          language={currentLang.monaco}
          value={code}
          onChange={(val) => setCode(val || "")}
          theme="vs-dark"
          options={{
            fontSize: 13,
            fontFamily: "var(--font-geist-mono), 'Fira Code', Consolas, monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            roundedSelection: true,
            automaticLayout: true,
            tabSize: 4,
            wordWrap: "off",
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>

      {/* Output panel */}
      <div className="border-t border-zinc-800 bg-zinc-950">
        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Output</span>
          {status !== "idle" && (
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded ${
                status === "success"
                  ? "bg-emerald-900/50 text-emerald-400"
                  : "bg-red-900/50 text-red-400"
              }`}
            >
              {status === "success" ? "Success" : "Error"}
            </span>
          )}
        </div>
        <div className="px-4 py-3 min-h-[100px] max-h-[200px] overflow-y-auto">
          {output ? (
            <pre className="text-xs font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed">
              {output}
            </pre>
          ) : (
            <p className="text-xs text-zinc-600">Run your code to see output here.</p>
          )}
        </div>
      </div>
    </div>
  );
}
