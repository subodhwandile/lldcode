import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

const JUDGE0_URL = "https://ce.judge0.com";

const LANG_CONFIG: Record<string, { id: number; fileName: string }> = {
  java:       { id: 91, fileName: "Main.java" },
  cpp:        { id: 54, fileName: "main.cpp"  },
  javascript: { id: 93, fileName: "index.js"  },
};

async function runCode(language: string, code: string): Promise<{ output: string; exitCode: number }> {
  const config = LANG_CONFIG[language];
  const res = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language_id: config.id,
      source_code: code,
      stdin: "",
      cpu_time_limit: 10,
      wall_time_limit: 20,
      memory_limit: 256000,
    }),
    signal: AbortSignal.timeout(30000),
  });

  if (!res.ok) throw new Error(`Judge0 error: ${res.status}`);

  const result = await res.json();
  const output = (result.stdout || "") + (result.stderr || "") + (result.compile_output || "");
  const exitCode = result.status?.id === 3 ? 0 : 1;
  return { output: output.trim() || "(no output)", exitCode };
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Sign in to submit" }, { status: 401 });
    }

    const { code, language, problemSlug } = await req.json();

    if (!code || !language || !problemSlug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!LANG_CONFIG[language]) {
      return NextResponse.json({ error: "Unsupported language" }, { status: 400 });
    }

    const problem = await prisma.problem.findUnique({ where: { slug: problemSlug } });
    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    let output = "";
    let exitCode = 1;
    try {
      ({ output, exitCode } = await runCode(language, code));
    } catch (err) {
      console.error("Execution error:", err);
      return NextResponse.json({ error: "Code execution service unavailable" }, { status: 503 });
    }

    const status = exitCode === 0 ? "Accepted" : "Runtime Error";

    // Save submission
    const submission = await prisma.submission.create({
      data: {
        userId: session.user.id,
        problemId: problem.id,
        code,
        language,
        status,
        output,
      },
    });

    // Update user progress
    await prisma.userProgress.upsert({
      where: { userId_problemId: { userId: session.user.id, problemId: problem.id } },
      create: { userId: session.user.id, problemId: problem.id, status: exitCode === 0 ? "solved" : "attempted" },
      update: { status: exitCode === 0 ? "solved" : "attempted" },
    });

    return NextResponse.json({ submission, output, status, exitCode });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
