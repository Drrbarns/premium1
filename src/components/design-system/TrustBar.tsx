import { cn } from "@/lib/utils";

interface TrustBarProps {
  items: string[];
  className?: string;
}

export function TrustBar({ items, className }: TrustBarProps) {
  return (
    <div className={cn("flex flex-wrap gap-4 justify-center text-sm text-slate-600", className)}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          {item}
        </span>
      ))}
    </div>
  );
}
