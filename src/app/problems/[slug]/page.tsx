import { notFound } from "next/navigation";
import { getProblemBySlug, getProblemsOrdered } from "@/lib/problems";
import { ProblemPanel } from "@/components/ProblemPanel";
import { CodeEditor } from "@/components/CodeEditor";
import { ResizableProblemLayout } from "@/components/ResizableProblemLayout";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProblemsOrdered().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);
  if (!problem) return { title: "Not Found" };
  return {
    title: `${problem.title} — LLDCode`,
    description: `Practice: ${problem.title}. A ${problem.difficulty} LLD interview problem in ${problem.category}.`,
  };
}

export default async function ProblemPage({ params }: Props) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);

  if (!problem) notFound();

  return (
    <div className="h-[calc(100vh-56px)] overflow-hidden">
      <ResizableProblemLayout
        left={<ProblemPanel problem={problem} />}
        right={
          <CodeEditor
            problemSlug={problem.slug}
            starterCode={problem.starterCode as Record<string, string>}
          />
        }
      />
    </div>
  );
}
