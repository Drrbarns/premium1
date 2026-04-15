"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/design-system/Container";
import { cn } from "@/lib/utils";

const STATS = [
  { end: 15, suffix: "+", label: "Years Experience" },
  { end: 50, suffix: "+", label: "Corporate Clients" },
  { end: 12, suffix: "", label: "West Africa Routes" },
  { end: 24, suffix: "/7", label: "Operations Desk" },
];

function useCountUp(end: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.floor(eased * end));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration, started]);

  return { ref, count };
}

function StatItem({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { ref, count } = useCountUp(end);

  return (
    <div
      ref={ref}
      className="group flex flex-col items-center gap-1 text-center md:flex-row md:items-center md:gap-4 md:text-left"
    >
      <span className="font-display text-3xl font-bold tabular-nums tracking-tight text-[var(--ink)] transition-colors duration-300 group-hover:text-[var(--accent)] md:text-3xl lg:text-4xl">
        {count}
        {suffix}
      </span>
      <span className="max-w-[11rem] text-[11px] font-semibold uppercase leading-snug tracking-wide text-slate-500 md:max-w-none md:text-sm md:normal-case md:tracking-normal md:font-medium">
        {label}
      </span>
    </div>
  );
}

export function StatsBar() {
  return (
    <section className="relative border-y border-slate-100 bg-[var(--surface-warm)]/50 py-6 md:bg-white md:py-10">
      <Container>
        <div
          className={cn(
            "overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm",
            "md:rounded-none md:border-0 md:bg-transparent md:shadow-none",
          )}
        >
          <div className="flex flex-col divide-y divide-slate-100 md:flex-row md:divide-y-0 md:justify-between md:gap-2">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={cn(
                  "flex justify-center px-5 py-4 md:flex-1 md:justify-start md:px-0 md:py-0",
                  i < STATS.length - 1 && "md:border-r md:border-slate-200 md:pr-5 lg:pr-9",
                )}
              >
                <StatItem end={s.end} suffix={s.suffix} label={s.label} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
