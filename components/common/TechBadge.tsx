import { cn } from "@/lib/utils";

interface TechBadgeProps {
  label: string;
  featured?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function TechBadge({
  label,
  featured = false,
  size = "md",
  className,
}: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono font-medium rounded-md border transition-colors",
        size === "sm"
          ? "px-2 py-0.5 text-xs"
          : "px-2.5 py-1 text-xs",
        featured
          ? "border-blue-500/40 bg-blue-500/10 text-blue-300"
          : "border-slate-700/60 bg-slate-800/60 text-slate-400",
        className
      )}
    >
      {label}
    </span>
  );
}
