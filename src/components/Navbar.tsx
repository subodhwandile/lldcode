"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Code2, LogOut, User } from "lucide-react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-lg">
              LLD<span className="text-indigo-400">Code</span>
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/problems" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Problems
            </Link>
            <Link href="/patterns" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Patterns
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeSwitcher />

            {session ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="gap-2">
                    {session.user?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={session.user.image} alt="" className="w-5 h-5 rounded-full" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline text-zinc-300">{session.user?.name?.split(" ")[0]}</span>
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                  className="text-zinc-500 hover:text-zinc-300"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Link href="/signin">
                <Button variant="primary" size="sm">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
