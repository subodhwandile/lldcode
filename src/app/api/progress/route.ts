import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ progress: [] });
    }

    const progress = await prisma.userProgress.findMany({
      where: { userId: session.user.id },
      include: { problem: { select: { slug: true } } },
    });

    return NextResponse.json({
      progress: progress.map((p: { status: string; problem: { slug: string } }) => ({
        slug: p.problem.slug,
        status: p.status,
      })),
    });
  } catch (error) {
    console.error("Progress error:", error);
    return NextResponse.json({ progress: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { problemSlug, status } = await req.json();
    const problem = await prisma.problem.findUnique({ where: { slug: problemSlug } });
    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    await prisma.userProgress.upsert({
      where: { userId_problemId: { userId: session.user.id, problemId: problem.id } },
      create: { userId: session.user.id, problemId: problem.id, status },
      update: { status },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Progress update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
