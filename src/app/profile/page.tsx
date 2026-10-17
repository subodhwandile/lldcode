export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getProblemsOrdered } from "@/lib/problems";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, User } from "lucide-react";

export const metadata = {
  title: "Profile — LLDCode",
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/signin");

  let progress: { problemId: string; status: string }[] = [];
  let submissionCount = 0;

  try {
    progress = await prisma.userProgress.findMany({
      where: { userId: session.user.id },
    });
    submissionCount = await prisma.submission.count({
      where: { userId: session.user.id },
    });
  } catch {
    // DB might not be set up yet
  }

  const problems = getProblemsOrdered().filter((p) => p.order > 0);
  const solvedIds = new Set(progress.filter((p) => p.status === "solved").map((p) => p.problemId));
  const attemptedIds = new Set(progress.filter((p) => p.status === "attempted").map((p) => p.problemId));

  const solvedCount = solvedIds.size;
  const easyTotal = problems.filter((p) => p.difficulty === "Easy").length;
  const mediumTotal = problems.filter((p) => p.difficulty === "Medium").length;
  const hardTotal = problems.filter((p) => p.difficulty === "Hard").length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* User header */}
      <div className="flex items-center gap-4 mb-8">
        {session.user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={session.user.image} alt="" className="w-16 h-16 rounded-full" />
        ) : (
          <div className="w-16 h-16 bg-indigo-900 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-indigo-400" />
          </div>
        )}
        <div>
          <h1 className="text-xl font-bold text-white">{session.user.name}</h1>
          <p className="text-sm text-zinc-500">{session.user.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Solved", value: solvedCount, total: problems.length, color: "text-emerald-400" },
          { label: "Submissions", value: submissionCount, color: "text-indigo-400" },
          { label: "Easy", value: problems.filter(p => p.difficulty === "Easy" && [...solvedIds].length > 0).length, total: easyTotal, color: "text-emerald-400" },
          { label: "Medium", value: problems.filter(p => p.difficulty === "Medium" && [...solvedIds].length > 0).length, total: mediumTotal, color: "text-amber-400" },
        ].map((stat) => (
          <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
              {stat.total !== undefined && <span className="text-zinc-600 text-base font-normal">/{stat.total}</span>}
            </div>
            <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Problem progress list */}
      <h2 className="text-base font-semibold text-white mb-4">Problem Progress</h2>
      <div className="border border-zinc-800 rounded-xl overflow-hidden divide-y divide-zinc-800">
        {problems.map((problem) => {
          const progressItem = progress.find((p) => p.problemId === problem.id);
          const status = progressItem?.status;

          return (
            <Link
              key={problem.id}
              href={`/problems/${problem.slug}`}
              className="flex items-center gap-4 px-5 py-3 hover:bg-zinc-800/50 transition-colors group"
            >
              <div className="w-5 shrink-0">
                {status === "solved" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : status === "attempted" ? (
                  <Clock className="w-4 h-4 text-amber-500" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-zinc-700" />
                )}
              </div>
              <span className="flex-1 text-sm text-zinc-300 group-hover:text-white transition-colors">
                {problem.title}
              </span>
              <Badge
                variant={
                  problem.difficulty === "Easy" ? "easy" : problem.difficulty === "Medium" ? "medium" : "hard"
                }
              >
                {problem.difficulty}
              </Badge>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
