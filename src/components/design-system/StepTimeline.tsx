import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description: string;
}

interface StepTimelineProps {
  steps: Step[];
  className?: string;
  /** light: cream cards; dark: navy section cards */
  variant?: "light" | "dark";
}

export function StepTimeline({ steps, className, variant = "light" }: StepTimelineProps) {
  const isDark = variant === "dark";

  return (
    <div className={cn("relative", className)}>
      <div
        className="absolute left-[27px] md:left-[31px] top-4 bottom-4 w-px bg-gradient-to-b from-[var(--accent)]/50 via-[var(--accent)]/25 to-transparent pointer-events-none hidden sm:block"
        aria-hidden
      />
      <div className="space-y-0 sm:space-y-1">
        {steps.map((step, i) => (
          <div
            key={i}
            className={cn(
              "group relative flex gap-4 sm:gap-6 py-4 sm:py-5",
              isDark
                ? "border-b border-white/[0.08] last:border-0"
                : "border-b border-slate-200/60 last:border-0",
            )}
          >
            <div
              className={cn(
                "flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center font-display font-bold text-base sm:text-lg transition-all duration-300 z-[1]",
                isDark
                  ? "bg-[var(--accent)]/15 text-[var(--accent)] ring-1 ring-[var(--accent)]/30 group-hover:bg-[var(--accent)] group-hover:text-[var(--navy)] group-hover:ring-[var(--accent)]"
                  : "bg-[var(--accent-soft)] text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white",
              )}
            >
              {i + 1}
            </div>
            <div className="pt-0.5 min-w-0 pb-1">
              <h4
                className={cn(
                  "font-display font-bold text-lg sm:text-xl tracking-tight",
                  isDark ? "text-white" : "text-[var(--ink)]",
                )}
              >
                {step.title}
              </h4>
              <p
                className={cn(
                  "text-sm sm:text-base mt-1.5 leading-relaxed",
                  isDark ? "text-white/65" : "text-slate-600",
                )}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
