import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description: string;
}

interface StepTimelineProps {
  steps: Step[];
  className?: string;
}

export function StepTimeline({ steps, className }: StepTimelineProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {steps.map((step, i) => (
        <div key={i} className="group flex gap-5 p-5 md:p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-[var(--accent)]/20 hover:shadow-lg transition-all duration-300">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center font-display font-bold text-lg group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-300">
            {i + 1}
          </div>
          <div>
            <h4 className="font-display font-bold text-lg text-[var(--ink)]">{step.title}</h4>
            <p className="text-slate-600 text-sm mt-1 leading-relaxed">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
