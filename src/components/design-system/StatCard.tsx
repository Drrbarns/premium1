import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className="text-2xl sm:text-3xl font-bold text-slate-900">{value}</div>
      <div className="text-sm sm:text-base text-slate-600 mt-1">{label}</div>
    </div>
  );
}
