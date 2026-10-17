import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "easy" | "medium" | "hard" | "tag" | "solved" | "attempted";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-zinc-800 text-zinc-300": variant === "default",
          "bg-emerald-900/50 text-emerald-400 border border-emerald-800": variant === "easy",
          "bg-amber-900/50 text-amber-400 border border-amber-800": variant === "medium",
          "bg-red-900/50 text-red-400 border border-red-800": variant === "hard",
          "bg-indigo-900/50 text-indigo-300 border border-indigo-800": variant === "tag",
          "bg-emerald-900/50 text-emerald-400": variant === "solved",
          "bg-amber-900/50 text-amber-400": variant === "attempted",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
