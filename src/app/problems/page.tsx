import { getProblemsOrdered } from "@/lib/problems";
import { ProblemsClient } from "@/components/ProblemsClient";

export const metadata = {
  title: "Problems — LLDCode",
  description: "Browse all Low Level Design interview problems",
};

export default function ProblemsPage() {
  const allProblems = getProblemsOrdered();
  return <ProblemsClient allProblems={allProblems} />;
}
