import Link from "next/link";
import { getProblemsOrdered } from "@/lib/problems";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Brain, CheckCircle2, Zap } from "lucide-react";

export default function HomePage() {
  const problems = getProblemsOrdered().filter((p) => p.order > 0);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-zinc-950 to-zinc-950" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-950/60 border border-indigo-800/50 rounded-full px-4 py-1.5 mb-6">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs text-indigo-300 font-medium">LeetCode for Low Level Design Interviews</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Master{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              Low Level Design
            </span>
            <br />
            interviews with practice
          </h1>

          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Real LLD problems from top tech companies. Write code in an IDE-grade editor, run against
            test cases, and unlock annotated reference solutions with design pattern explanations.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/problems">
              <Button variant="primary" size="lg" className="gap-2">
                Start Practicing
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/problems/what-is-ood-interview">
              <Button variant="secondary" size="lg">
                What is an LLD Interview?
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-zinc-800 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "Guided Design Process",
                desc: "Each problem walks you through entity identification, relationships, and patterns before you code — the way real interviews work.",
              },
              {
                icon: Code2,
                title: "IDE-Grade Editor",
                desc: "Monaco Editor (VS Code) with Java, C++, and JavaScript support. Real execution via Piston API with stdout and runtime feedback.",
              },
              {
                icon: CheckCircle2,
                title: "Behavioral Test Cases",
                desc: "LLD-specific tests that validate object behavior — park a car, get a ticket, unpark, check the fee. Not just algorithmic output.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
              >
                <div className="w-10 h-10 bg-indigo-950 border border-indigo-800 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem List Preview */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Problems</h2>
            <p className="text-sm text-zinc-500 mt-1">{problems.length} problems across multiple domains</p>
          </div>
          <Link href="/problems">
            <Button variant="secondary" size="sm" className="gap-1.5">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="divide-y divide-zinc-800 border border-zinc-800 rounded-xl overflow-hidden">
          {problems.slice(0, 8).map((problem, i) => (
            <Link
              key={problem.id}
              href={`/problems/${problem.slug}`}
              className="flex items-center gap-4 px-5 py-4 bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors group"
            >
              <span className="text-zinc-600 text-sm w-6 text-right shrink-0">{problem.order}</span>
              <div className="flex-1 min-w-0">
                <span className="text-zinc-200 group-hover:text-white font-medium transition-colors">
                  {problem.title}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge
                  variant={
                    problem.difficulty === "Easy"
                      ? "easy"
                      : problem.difficulty === "Medium"
                      ? "medium"
                      : "hard"
                  }
                >
                  {problem.difficulty}
                </Badge>
                <span className="hidden sm:inline text-xs text-zinc-600">{problem.category}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link href="/problems">
            <Button variant="secondary" size="md">
              View All {problems.length} Problems
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 mt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
              <Code2 className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm text-zinc-500">LLDCode — Practice LLD interviews for free</span>
          </div>
          <span className="text-xs text-zinc-700">Built with Next.js · Free forever</span>
        </div>
      </footer>
    </div>
  );
}
