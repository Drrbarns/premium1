import Link from "next/link";
import { cn } from "@/lib/utils";
import { Package, Ship, FileCheck, Warehouse, Truck, Home, Network, LucideIcon, ArrowRight } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Package,
  Ship,
  FileCheck,
  Warehouse,
  Truck,
  Home,
  Network,
};

interface ServiceCardProps {
  name: string;
  slug: string;
  description: string;
  icon?: string;
  className?: string;
  variant?: "light" | "dark";
}

export function ServiceCard({ name, slug, description, icon, className, variant = "light" }: ServiceCardProps) {
  const Icon = icon ? ICON_MAP[icon] : Package;
  const isDark = variant === "dark";

  return (
    <Link
      href={`/services/${slug}`}
      className={cn(
        "group relative flex flex-col p-8 rounded-3xl transition-all duration-500 overflow-hidden",
        isDark 
          ? "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20" 
          : "bg-white border border-slate-200/60 hover:border-[var(--accent)]/30 hover:shadow-2xl hover:shadow-[var(--accent)]/5",
        className
      )}
    >
      {/* Subtle background glow on hover */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
          isDark
            ? "bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent"
            : "bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-transparent"
        )} 
      />

      <div className="relative z-10 flex flex-col h-full">
        <div 
          className={cn(
            "flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110",
            isDark
              ? "bg-white/10 text-white"
              : "bg-[var(--surface-warm)] text-[var(--accent)]"
          )}
        >
          {Icon && <Icon size={26} strokeWidth={1.5} />}
        </div>
        
        <h3 
          className={cn(
            "text-xl font-display font-bold mb-3 transition-colors",
            isDark ? "text-white group-hover:text-[var(--accent)]" : "text-[var(--ink)] group-hover:text-[var(--accent)]"
          )}
        >
          {name}
        </h3>
        
        <p 
          className={cn(
            "text-[15px] leading-relaxed mb-8 flex-grow",
            isDark ? "text-white/60" : "text-slate-600"
          )}
        >
          {description}
        </p>
        
        <div className="mt-auto pt-6 border-t border-dashed border-current opacity-20 group-hover:opacity-40 transition-opacity" />
        
        <div 
          className={cn(
            "mt-4 flex items-center justify-between font-semibold text-sm",
            isDark ? "text-white/80 group-hover:text-white" : "text-[var(--ink)] group-hover:text-[var(--accent)]"
          )}
        >
          <span>Explore service</span>
          <span 
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 group-hover:translate-x-1",
              isDark ? "bg-white/10 group-hover:bg-[var(--accent)]" : "bg-slate-100 group-hover:bg-[var(--accent)] group-hover:text-white"
            )}
          >
            <ArrowRight size={16} strokeWidth={2} />
          </span>
        </div>
      </div>
    </Link>
  );
}