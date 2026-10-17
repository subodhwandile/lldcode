import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const { code, language, problemSlug } = await req.json();

    if (!code || !language || !problemSlug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const languageMap: Record<string, string> = {
      java: "java",
      cpp: "cpp",
      javascript: "javascript",
    };

    const pistonLang = languageMap[language];
    if (!pistonLang) {
      return NextResponse.json({ error: "Unsupported language" }, { status: 400 });
    }

    const langVersions: Record<string, string> = {
      java: "15.0.2",
      cpp: "10.2.0",
      javascript: "18.15.0",
    };

    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: pistonLang,
        version: langVersions[pistonLang],
        files: [{ name: getFileName(language), content: code }],
        stdin: "",
        args: [],
        compile_timeout: 10000,
        run_timeout: 5000,
        compile_memory_limit: -1,
        run_memory_limit: -1,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Code execution service unavailable" }, { status: 503 });
    }

    const result = await response.json();
    const output = result.run?.output || result.compile?.output || "";
    const stderr = result.run?.stderr || result.compile?.stderr || "";
    const exitCode = result.run?.code ?? result.compile?.code ?? 1;

    const status = exitCode === 0 ? "success" : "error";

    // Save submission if user is logged in
    if (session?.user?.id) {
      const problem = await prisma.problem.findUnique({
        where: { slug: problemSlug },
      });
      if (problem) {
        await prisma.submission.create({
          data: {
            userId: session.user.id,
            problemId: problem.id,
            code,
            language,
            status: status === "success" ? "Accepted" : "Runtime Error",
            output: output + stderr,
          },
        });
      }
    }

    return NextResponse.json({
      output: output || stderr,
      status,
      exitCode,
    });
  } catch (error) {
    console.error("Execute error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function getFileName(language: string): string {
  switch (language) {
    case "java": return "Main.java";
    case "cpp": return "main.cpp";
    case "javascript": return "index.js";
    default: return "main";
  }
}
