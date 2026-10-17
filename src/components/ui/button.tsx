import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "success" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", size = "md", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-indigo-600 hover:bg-indigo-500 text-white": variant === "primary",
            "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700": variant === "secondary",
            "hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200": variant === "ghost",
            "bg-emerald-700 hover:bg-emerald-600 text-white": variant === "success",
            "bg-red-800 hover:bg-red-700 text-white": variant === "danger",
          },
          {
            "text-xs px-2.5 py-1.5 gap-1.5": size === "sm",
            "text-sm px-4 py-2 gap-2": size === "md",
            "text-base px-6 py-3 gap-2": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
