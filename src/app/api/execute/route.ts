import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

// Judge0 CE language IDs
const LANG_CONFIG: Record<string, { id: number; fileName: string }> = {
  java:       { id: 62,  fileName: "Main.java"  },
  cpp:        { id: 54,  fileName: "main.cpp"   },
  javascript: { id: 93,  fileName: "index.js"   },
};

const JUDGE0_URL = "https://ce.judge0.com";

async function executeWithJudge0(language: string, code: string): Promise<{ output: string; exitCode: number }> {
  const config = LANG_CONFIG[language];

  // Submit the code
  const submitRes = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`, {
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

  if (!submitRes.ok) {
    throw new Error(`Judge0 submit failed: ${submitRes.status}`);
  }

  const result = await submitRes.json();

  // status 3 = Accepted, others = various errors
  const stdout   = result.stdout   || "";
  const stderr   = result.stderr   || "";
  const compileErr = result.compile_output || "";
  const output   = stdout + stderr + compileErr || "(no output)";
  const exitCode = result.status?.id === 3 ? 0 : 1;

  return { output: output.trim(), exitCode };
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const { code, language, problemSlug } = await req.json();

    if (!code || !language || !problemSlug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!LANG_CONFIG[language]) {
      return NextResponse.json({ error: "Unsupported language" }, { status: 400 });
    }

    let output = "";
    let exitCode = 1;

    try {
      ({ output, exitCode } = await executeWithJudge0(language, code));
    } catch (err) {
      console.error("Judge0 error:", err);
      return NextResponse.json(
        { error: "Code execution service unavailable. Please try again in a moment." },
        { status: 503 }
      );
    }

    const status = exitCode === 0 ? "success" : "error";

    // Save submission if user is logged in (non-blocking)
    if (session?.user?.id) {
      prisma.problem
        .findUnique({ where: { slug: problemSlug } })
        .then((problem: { id: string } | null) => {
          if (problem) {
            return prisma.submission.create({
              data: {
                userId: session.user!.id!,
                problemId: problem.id,
                code,
                language,
                status: status === "success" ? "Accepted" : "Runtime Error",
                output,
              },
            });
          }
        })
        .catch((e: unknown) => console.error("Submission save error:", e));
    }

    return NextResponse.json({ output, status, exitCode });
  } catch (error) {
    console.error("Execute error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
