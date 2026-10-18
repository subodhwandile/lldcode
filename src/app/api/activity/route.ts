import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ activity: [] });
    }

    const submissions = await prisma.submission.findMany({
      where: { userId: session.user.id },
      select: { createdAt: true, status: true },
      orderBy: { createdAt: "asc" },
    });

    // Group by date (YYYY-MM-DD) and count
    const map: Record<string, { total: number; accepted: number }> = {};
    for (const s of submissions) {
      const date = s.createdAt.toISOString().slice(0, 10);
      if (!map[date]) map[date] = { total: 0, accepted: 0 };
      map[date].total++;
      if (s.status === "Accepted") map[date].accepted++;
    }

    const activity = Object.entries(map).map(([date, counts]) => ({ date, ...counts }));
    return NextResponse.json({ activity });
  } catch (error) {
    console.error("Activity error:", error);
    return NextResponse.json({ activity: [] });
  }
}
