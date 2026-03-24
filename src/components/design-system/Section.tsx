import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "light" | "dark" | "cream" | "navy" | "muted";
}

export function Section({ children, className, background = "white" }: SectionProps) {
  return (
    <section
      className={cn(
        "py-20 md:py-28 lg:py-32",
        background === "white" && "bg-white",
        background === "light" && "bg-slate-50",
        background === "cream" && "bg-[var(--surface-warm)]",
        background === "muted" && "bg-[var(--surface-warm)]",
        background === "dark" && "bg-slate-900 text-white",
        background === "navy" && "bg-[var(--navy)] text-white",
        className
      )}
    >
      {children}
    </section>
  );
}
