"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Problem } from "@/lib/problems";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Search, X } from "lucide-react";

interface ProblemsClientProps {
  allProblems: Problem[];
}

type DifficultyFilter = "All" | "Easy" | "Medium" | "Hard";
type StatusFilter = "All" | "Solved" | "Attempted" | "Todo";
type ProgressMap = Record<string, "solved" | "attempted">;

export function ProblemsClient({ allProblems }: ProblemsClientProps) {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("All");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [progress, setProgress] = useState<ProgressMap>({});

  useEffect(() => {
    fetch("/api/progress")
      .then((r) => r.json())
      .then((data) => {
        const map: ProgressMap = {};
        for (const p of data.progress || []) map[p.slug] = p.status;
        setProgress(map);
      })
      .catch(() => {});
  }, []);

  const problems = [...allProblems].sort((a, b) => a.order - b.order);

  const filtered = problems.filter((p) => {
    if (search) {
      const q = search.toLowerCase();
      if (!p.title.toLowerCase().includes(q) && !p.tags.some((t) => t.toLowerCase().includes(q)))
        return false;
    }
    if (difficulty !== "All" && p.difficulty !== difficulty) return false;
    if (status === "Solved" && progress[p.slug] !== "solved") return false;
    if (status === "Attempted" && progress[p.slug] !== "attempted") return false;
    if (status === "Todo" && progress[p.slug]) return false;
    return true;
  });

  const solvedCount = problems.filter((p) => progress[p.slug] === "solved").length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Problems</h1>
        <p className="text-sm text-zinc-500">
          <span className="text-emerald-400 font-medium">{solvedCount}</span>
          <span className="text-zinc-600">/{problems.length}</span> solved
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or tag..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-8 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-600 transition-colors"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex gap-1">
          {(["All", "Easy", "Medium", "Hard"] as DifficultyFilter[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                difficulty === d
                  ? d === "Easy" ? "bg-emerald-900/60 text-emerald-400 border-emerald-800"
                  : d === "Medium" ? "bg-amber-900/60 text-amber-400 border-amber-800"
                  : d === "Hard" ? "bg-red-900/60 text-red-400 border-red-800"
                  : "bg-zinc-700 text-white border-zinc-600"
                  : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300 hover:border-zinc-700"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusFilter)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-indigo-600"
        >
          <option value="All">All Status</option>
          <option value="Solved">Solved</option>
          <option value="Attempted">Attempted</option>
          <option value="Todo">Todo</option>
        </select>
      </div>

      {/* Result count */}
      {(search || difficulty !== "All" || status !== "All") && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-zinc-500">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
          <button
            onClick={() => { setSearch(""); setDifficulty("All"); setStatus("All"); }}
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        </div>
      )}

      {/* Flat problem list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-zinc-500 text-sm">No problems match your filters.</p>
        </div>
      ) : (
        <div className="border border-zinc-800 rounded-xl overflow-hidden divide-y divide-zinc-800">
          {filtered.map((problem, idx) => (
            <ProblemRow key={problem.id} problem={problem} index={idx + 1} status={progress[problem.slug]} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProblemRow({ problem, index, status }: { problem: Problem; index: number; status?: "solved" | "attempted" }) {
  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="flex items-center gap-4 px-5 py-3.5 hover:bg-zinc-800/50 transition-colors group"
    >
      <div className="w-5 shrink-0 flex items-center justify-center">
        {status === "solved" ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        ) : status === "attempted" ? (
          <Clock className="w-4 h-4 text-amber-500" />
        ) : (
          <div className="w-4 h-4 rounded-full border border-zinc-700" />
        )}
      </div>

      <span className="text-zinc-600 text-sm w-6 text-right shrink-0 tabular-nums">{index}</span>

      <div className="flex-1 min-w-0">
        <span className="text-zinc-200 group-hover:text-white font-medium transition-colors text-sm">
          {problem.title}
        </span>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {problem.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="tag">{tag}</Badge>
          ))}
        </div>
      </div>

      <Badge variant={problem.difficulty === "Easy" ? "easy" : problem.difficulty === "Medium" ? "medium" : "hard"}>
        {problem.difficulty}
      </Badge>
    </Link>
  );
}
