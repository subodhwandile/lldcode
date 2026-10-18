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

interface ProgressMap {
  [slug: string]: "solved" | "attempted";
}

export function ProblemsClient({ allProblems }: ProblemsClientProps) {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("All");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProgressMap>({});

  // Fetch user progress
  useEffect(() => {
    fetch("/api/progress")
      .then((r) => r.json())
      .then((data) => {
        const map: ProgressMap = {};
        for (const p of data.progress || []) {
          map[p.slug] = p.status;
        }
        setProgress(map);
      })
      .catch(() => {});
  }, []);

  const introProblems = allProblems.filter((p) => p.order <= 0).sort((a, b) => b.order - a.order);
  const mainProblems = allProblems.filter((p) => p.order > 0);

  // All unique tags from main problems
  const allTags = Array.from(new Set(mainProblems.flatMap((p) => p.tags))).sort();

  const filtered = mainProblems.filter((p) => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) &&
        !p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))) return false;
    if (difficulty !== "All" && p.difficulty !== difficulty) return false;
    if (selectedTag && !p.tags.includes(selectedTag)) return false;
    if (status === "Solved" && progress[p.slug] !== "solved") return false;
    if (status === "Attempted" && progress[p.slug] !== "attempted") return false;
    if (status === "Todo" && progress[p.slug]) return false;
    return true;
  });

  const categories = Array.from(new Set(filtered.map((p) => p.category)));

  const solvedCount = mainProblems.filter((p) => progress[p.slug] === "solved").length;
  const totalCount = mainProblems.length;

  const hasFilters = search || difficulty !== "All" || status !== "All" || selectedTag;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Problems</h1>
        <p className="text-zinc-400 text-sm">
          <span className="text-emerald-400 font-medium">{solvedCount}</span>
          <span className="text-zinc-600">/{totalCount}</span> solved
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search problems or tags..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-600 transition-colors"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Difficulty filter */}
        <div className="flex gap-1">
          {(["All", "Easy", "Medium", "Hard"] as DifficultyFilter[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                difficulty === d
                  ? d === "Easy" ? "bg-emerald-900/60 text-emerald-400 border border-emerald-800"
                  : d === "Medium" ? "bg-amber-900/60 text-amber-400 border border-amber-800"
                  : d === "Hard" ? "bg-red-900/60 text-red-400 border border-red-800"
                  : "bg-zinc-700 text-white border border-zinc-600"
                  : "bg-zinc-900 text-zinc-500 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-300"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Status filter */}
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

      {/* Tag chips */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {allTags.slice(0, 20).map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
              selectedTag === tag
                ? "bg-indigo-600 text-white"
                : "bg-zinc-900 border border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Active filter pill */}
      {hasFilters && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-zinc-500">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
          <button
            onClick={() => { setSearch(""); setDifficulty("All"); setStatus("All"); setSelectedTag(null); }}
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear filters
          </button>
        </div>
      )}

      {/* Intro Problems */}
      {!hasFilters && (
        <div className="mb-8">
          <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">Getting Started</h2>
          <div className="border border-zinc-800 rounded-xl overflow-hidden divide-y divide-zinc-800">
            {introProblems.map((problem) => (
              <ProblemRow key={problem.id} problem={problem} status={progress[problem.slug]} />
            ))}
          </div>
        </div>
      )}

      {/* Filtered flat list */}
      {hasFilters ? (
        filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-zinc-500 text-sm">No problems match your filters.</p>
          </div>
        ) : (
          <div className="border border-zinc-800 rounded-xl overflow-hidden divide-y divide-zinc-800">
            {filtered.map((problem) => (
              <ProblemRow key={problem.id} problem={problem} status={progress[problem.slug]} />
            ))}
          </div>
        )
      ) : (
        /* Grouped by category */
        categories.map((category) => {
          const catProblems = filtered.filter((p) => p.category === category);
          if (!catProblems.length) return null;
          return (
            <div key={category} className="mb-8">
              <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">{category}</h2>
              <div className="border border-zinc-800 rounded-xl overflow-hidden divide-y divide-zinc-800">
                {catProblems.map((problem) => (
                  <ProblemRow key={problem.id} problem={problem} status={progress[problem.slug]} />
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

function ProblemRow({
  problem,
  status,
}: {
  problem: Problem;
  status?: "solved" | "attempted";
}) {
  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="flex items-center gap-4 px-5 py-3.5 bg-zinc-900/30 hover:bg-zinc-800/50 transition-colors group"
    >
      {/* Status icon */}
      <div className="w-5 shrink-0 flex items-center justify-center">
        {status === "solved" ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        ) : status === "attempted" ? (
          <Clock className="w-4 h-4 text-amber-500" />
        ) : (
          <div className="w-4 h-4 rounded-full border border-zinc-700" />
        )}
      </div>

      <span className="text-zinc-700 text-sm w-5 text-right shrink-0">
        {problem.order > 0 ? problem.order : "—"}
      </span>

      <div className="flex-1 min-w-0">
        <span className="text-zinc-200 group-hover:text-white font-medium transition-colors">
          {problem.title}
        </span>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {problem.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="tag">{tag}</Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Badge
          variant={
            problem.difficulty === "Easy" ? "easy" : problem.difficulty === "Medium" ? "medium" : "hard"
          }
        >
          {problem.difficulty}
        </Badge>
      </div>
    </Link>
  );
}
