import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ submissions: [] });
    }

    const { slug } = await params;
    const problem = await prisma.problem.findUnique({ where: { slug } });
    if (!problem) return NextResponse.json({ submissions: [] });

    const submissions = await prisma.submission.findMany({
      where: { userId: session.user.id, problemId: problem.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error("Submissions fetch error:", error);
    return NextResponse.json({ submissions: [] });
  }
}
