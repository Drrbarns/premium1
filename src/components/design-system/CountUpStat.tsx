"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CountUpStatProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  className?: string;
  theme?: "light" | "dark";
}

export function CountUpStat({ 
  end, 
  suffix = "", 
  prefix = "", 
  label, 
  duration = 2000, 
  className,
  theme = "dark" 
}: CountUpStatProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  const isLight = theme === "light";

  return (
    <div ref={ref} className={cn("text-center flex flex-col items-center justify-center", className)}>
      <div 
        className={cn(
          "font-display text-3xl sm:text-4xl font-bold tabular-nums tracking-tight mb-1.5 transition-colors",
          isLight ? "text-[var(--ink)]" : "text-white"
        )}
      >
        {prefix}
        {count}
        {suffix}
      </div>
      <div 
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.1em]",
          isLight ? "text-[var(--accent)]" : "text-white/60"
        )}
      >
        {label}
      </div>
    </div>
  );
}