import Link from "next/link";
import { getProblemsOrdered } from "@/lib/problems";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Problems — LLDCode",
  description: "Browse all Low Level Design interview problems",
};

export default function ProblemsPage() {
  const allProblems = getProblemsOrdered();
  const introProblems = allProblems.filter((p) => p.order <= 0).sort((a, b) => b.order - a.order);
  const mainProblems = allProblems.filter((p) => p.order > 0);

  const categories = Array.from(new Set(mainProblems.map((p) => p.category)));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Problems</h1>
        <p className="text-zinc-400 text-sm">
          {mainProblems.length} design problems across {categories.length} categories. Work through them in order or jump to any topic.
        </p>
      </div>

      {/* Intro Problems */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">Getting Started</h2>
        <div className="border border-zinc-800 rounded-xl overflow-hidden divide-y divide-zinc-800">
          {introProblems.map((problem) => (
            <ProblemRow key={problem.id} problem={problem} />
          ))}
        </div>
      </div>

      {/* Design Problems by category */}
      {categories.map((category) => {
        const catProblems = mainProblems.filter((p) => p.category === category);
        return (
          <div key={category} className="mb-8">
            <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">{category}</h2>
            <div className="border border-zinc-800 rounded-xl overflow-hidden divide-y divide-zinc-800">
              {catProblems.map((problem) => (
                <ProblemRow key={problem.id} problem={problem} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProblemRow({ problem }: { problem: ReturnType<typeof getProblemsOrdered>[0] }) {
  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="flex items-center gap-4 px-5 py-3.5 bg-zinc-900/30 hover:bg-zinc-800/50 transition-colors group"
    >
      <span className="text-zinc-700 text-sm w-6 text-right shrink-0">
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
