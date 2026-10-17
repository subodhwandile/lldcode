"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Problem } from "@/lib/problems";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, CheckCircle2, Lock, BookOpen, List } from "lucide-react";

interface ProblemPanelProps {
  problem: Problem;
}

type Tab = "description" | "hints" | "testcases";

export function ProblemPanel({ problem }: ProblemPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const [revealedHints, setRevealedHints] = useState<number[]>([]);

  const revealHint = (i: number) => {
    if (!revealedHints.includes(i)) {
      setRevealedHints([...revealedHints, i]);
    }
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "description", label: "Problem", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: "hints", label: `Hints (${problem.hints.length})`, icon: <Lightbulb className="w-3.5 h-3.5" /> },
    { id: "testcases", label: "Test Cases", icon: <List className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Problem header */}
      <div className="px-5 py-4 border-b border-zinc-800">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h1 className="text-lg font-bold text-white leading-tight">{problem.title}</h1>
          <Badge
            variant={
              problem.difficulty === "Easy" ? "easy" : problem.difficulty === "Medium" ? "medium" : "hard"
            }
            className="shrink-0 mt-0.5"
          >
            {problem.difficulty}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="default" className="text-zinc-500">{problem.category}</Badge>
          {problem.tags.map((tag) => (
            <Badge key={tag} variant="tag">{tag}</Badge>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800 bg-zinc-900/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-500"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "description" && (
          <div className="px-5 py-5">
            <div className="prose prose-sm">
              <ReactMarkdown>{problem.description}</ReactMarkdown>
            </div>
            {problem.constraints && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                  <span className="w-4 h-4 bg-amber-900/50 rounded flex items-center justify-center text-amber-400">!</span>
                  Constraints
                </h3>
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-400 whitespace-pre-line leading-relaxed">
                  {problem.constraints}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "hints" && (
          <div className="px-5 py-5 space-y-3">
            <p className="text-xs text-zinc-600 mb-4">
              Hints are revealed one at a time to guide your thinking without giving away the answer.
            </p>
            {problem.hints.map((hint, i) => (
              <div key={i} className="border border-zinc-800 rounded-lg overflow-hidden">
                <button
                  onClick={() => revealHint(i)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-zinc-800/50 transition-colors"
                >
                  <span className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                    <span className="w-5 h-5 bg-zinc-800 rounded-full flex items-center justify-center text-xs text-zinc-500">
                      {i + 1}
                    </span>
                    Hint {i + 1}
                  </span>
                  {revealedHints.includes(i) ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <Lock className="w-4 h-4 text-zinc-600 shrink-0" />
                  )}
                </button>
                {revealedHints.includes(i) && (
                  <div className="px-4 pb-4 pt-1 bg-zinc-900/50 border-t border-zinc-800">
                    <p className="text-sm text-zinc-300 leading-relaxed">{hint}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "testcases" && (
          <div className="px-5 py-5 space-y-4">
            {problem.testCases
              .filter((tc) => !tc.isHidden)
              .map((tc, i) => (
                <div key={tc.id} className="border border-zinc-800 rounded-lg overflow-hidden">
                  <div className="px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-300">
                      Test {i + 1}: {tc.description}
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <span className="text-xs text-zinc-600 uppercase tracking-wider block mb-1.5">Input</span>
                      <pre className="text-xs font-mono text-zinc-300 bg-zinc-900 rounded p-3 overflow-x-auto whitespace-pre-wrap">
                        {tc.input}
                      </pre>
                    </div>
                    <div>
                      <span className="text-xs text-zinc-600 uppercase tracking-wider block mb-1.5">Expected Output</span>
                      <pre className="text-xs font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-900/50 rounded p-3 overflow-x-auto">
                        {tc.expectedOutput}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            {problem.testCases.some((tc) => tc.isHidden) && (
              <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                <Lock className="w-4 h-4 text-zinc-600 shrink-0" />
                <p className="text-sm text-zinc-500">
                  {problem.testCases.filter((tc) => tc.isHidden).length} hidden test cases — revealed after submission
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
