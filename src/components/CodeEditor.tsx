"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Play, ChevronDown, RotateCcw, Save, Send } from "lucide-react";

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
  } catch {}
}

export function CodeEditor({ problemSlug, starterCode }: CodeEditorProps) {
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(() => loadSaved(problemSlug, "java", starterCode["java"] || ""));
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [runStatus, setRunStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitResult, setSubmitResult] = useState<{ status: string; output: string } | null>(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstMount = useRef(true);

  // Autosave with 1.5s debounce
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setSaveStatus("saving");
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      persistCode(problemSlug, language, code);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1500);
    return () => { if (autosaveTimer.current) clearTimeout(autosaveTimer.current); };
  }, [code, language, problemSlug]);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(loadSaved(problemSlug, lang, starterCode[lang] || ""));
    setShowLangMenu(false);
    setOutput("");
    setRunStatus("idle");
    setSubmitResult(null);
    setSaveStatus("idle");
    isFirstMount.current = true;
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
    setRunStatus("idle");
    setSubmitResult(null);
    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, problemSlug }),
      });
      const data = await res.json();
      if (!res.ok) { setOutput(data.error || "Execution failed"); setRunStatus("error"); return; }
      setOutput(data.output || "(no output)");
      setRunStatus(data.status === "success" ? "success" : "error");
    } catch {
      setOutput("Network error — could not reach execution service");
      setRunStatus("error");
    } finally {
      setRunning(false);
    }
  }, [code, language, problemSlug, running]);

  const handleSubmit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    setOutput("Submitting...");
    setRunStatus("idle");
    setSubmitResult(null);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, problemSlug }),
      });
      const data = await res.json();
      if (!res.ok) {
        setOutput(data.error || "Submission failed");
        setRunStatus("error");
        return;
      }
      setSubmitResult({ status: data.status, output: data.output });
      setOutput(data.output || "(no output)");
      setRunStatus(data.exitCode === 0 ? "success" : "error");
    } catch {
      setOutput("Network error — could not reach execution service");
      setRunStatus("error");
    } finally {
      setSubmitting(false);
    }
  }, [code, language, problemSlug, submitting]);

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
          <div className="text-xs">
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
          <button
            onClick={handleReset}
            title="Reset to starter code"
            className="text-zinc-600 hover:text-zinc-400 transition-colors p-1.5 rounded"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <Button variant="secondary" size="sm" onClick={handleRun} disabled={running || submitting} className="gap-1.5">
            <Play className="w-3.5 h-3.5" />
            {running ? "Running..." : "Run"}
          </Button>

          <Button variant="primary" size="sm" onClick={handleSubmit} disabled={running || submitting} className="gap-1.5">
            <Send className="w-3.5 h-3.5" />
            {submitting ? "Submitting..." : "Submit"}
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
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            {submitResult ? "Submission Result" : "Output"}
          </span>
          {submitResult && (
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
              submitResult.status === "Accepted"
                ? "bg-emerald-900/50 text-emerald-400 border border-emerald-800"
                : "bg-red-900/50 text-red-400 border border-red-800"
            }`}>
              {submitResult.status}
            </span>
          )}
          {!submitResult && runStatus !== "idle" && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded ${
              runStatus === "success" ? "bg-emerald-900/50 text-emerald-400" : "bg-red-900/50 text-red-400"
            }`}>
              {runStatus === "success" ? "Success" : "Error"}
            </span>
          )}
        </div>
        <div className="px-4 py-3 min-h-[100px] max-h-[200px] overflow-y-auto">
          {output ? (
            <pre className="text-xs font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed">{output}</pre>
          ) : (
            <p className="text-xs text-zinc-600">Run or submit your code to see output here.</p>
          )}
        </div>
      </div>
    </div>
  );
}
