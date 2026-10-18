import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

const PISTON_URL = "https://emkc.org/api/v2/piston/execute";

const LANG_CONFIG: Record<string, { pistonLang: string; version: string; fileName: string }> = {
  java:       { pistonLang: "java",       version: "15.0.2",  fileName: "Main.java"  },
  cpp:        { pistonLang: "c++",        version: "10.2.0",  fileName: "main.cpp"   },
  javascript: { pistonLang: "javascript", version: "18.15.0", fileName: "index.js"   },
};

async function executeWithPiston(lang: string, code: string): Promise<{ output: string; exitCode: number }> {
  const config = LANG_CONFIG[lang];

  const res = await fetch(PISTON_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language: config.pistonLang,
      version: config.version,
      files: [{ name: config.fileName, content: code }],
      stdin: "",
      args: [],
      compile_timeout: 15000,
      run_timeout: 10000,
      compile_memory_limit: -1,
      run_memory_limit: -1,
    }),
    signal: AbortSignal.timeout(25000),
  });

  if (!res.ok) {
    throw new Error(`Piston returned ${res.status}`);
  }

  const result = await res.json();

  // Combine compile + run output
  const compileOut = (result.compile?.output || "") + (result.compile?.stderr || "");
  const runOut     = (result.run?.output    || "") + (result.run?.stderr    || "");
  const output     = compileOut + runOut || "(no output)";
  const exitCode   = result.run?.code ?? result.compile?.code ?? 1;

  return { output, exitCode };
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
      ({ output, exitCode } = await executeWithPiston(language, code));
    } catch (err) {
      console.error("Piston error:", err);
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
