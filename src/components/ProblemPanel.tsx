"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Problem } from "@/lib/problems";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, CheckCircle2, Lock, BookOpen, List, History } from "lucide-react";

interface ProblemPanelProps {
  problem: Problem;
}

type Tab = "description" | "hints" | "testcases" | "submissions";

interface Submission {
  id: string;
  language: string;
  status: string;
  output: string | null;
  createdAt: string;
  code: string;
}

export function ProblemPanel({ problem }: ProblemPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    setLoadingSubmissions(true);
    try {
      const res = await fetch(`/api/submissions/${problem.slug}`);
      const data = await res.json();
      setSubmissions(data.submissions || []);
    } catch {
      setSubmissions([]);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    if (activeTab === "submissions") fetchSubmissions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const revealHint = (i: number) => {
    if (!revealedHints.includes(i)) {
      setRevealedHints([...revealedHints, i]);
    }
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "description", label: "Problem", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: "hints", label: `Hints (${problem.hints.length})`, icon: <Lightbulb className="w-3.5 h-3.5" /> },
    { id: "testcases", label: "Test Cases", icon: <List className="w-3.5 h-3.5" /> },
    { id: "submissions", label: "Submissions", icon: <History className="w-3.5 h-3.5" /> },
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
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{problem.description}</ReactMarkdown>
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

        {activeTab === "submissions" && (
          <div className="px-5 py-5">
            {loadingSubmissions ? (
              <p className="text-xs text-zinc-600">Loading submissions...</p>
            ) : submissions.length === 0 ? (
              <div className="text-center py-12">
                <History className="w-8 h-8 text-zinc-700 mx-auto mb-3" />
                <p className="text-sm text-zinc-500">No submissions yet</p>
                <p className="text-xs text-zinc-700 mt-1">Submit your code to see history here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {submissions.map((sub) => (
                  <div key={sub.id} className="border border-zinc-800 rounded-lg overflow-hidden">
                    <div
                      className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-zinc-800/50 transition-colors"
                      onClick={() => setExpandedCode(expandedCode === sub.id ? null : sub.id)}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          sub.status === "Accepted"
                            ? "bg-emerald-900/50 text-emerald-400 border border-emerald-800"
                            : "bg-red-900/50 text-red-400 border border-red-800"
                        }`}>
                          {sub.status}
                        </span>
                        <span className="text-xs text-zinc-500 capitalize">{sub.language}</span>
                      </div>
                      <span className="text-xs text-zinc-600">
                        {new Date(sub.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {expandedCode === sub.id && (
                      <div className="border-t border-zinc-800">
                        <pre className="text-xs font-mono text-zinc-300 bg-zinc-900/50 p-4 overflow-x-auto max-h-64 leading-relaxed">
                          {sub.code}
                        </pre>
                        {sub.output && (
                          <div className="border-t border-zinc-800 px-4 py-3">
                            <span className="text-xs text-zinc-600 uppercase tracking-wider block mb-1.5">Output</span>
                            <pre className="text-xs font-mono text-zinc-400 whitespace-pre-wrap">{sub.output}</pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
