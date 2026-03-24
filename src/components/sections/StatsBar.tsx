import { Container } from "@/components/design-system/Container";
import { CountUpStat } from "@/components/design-system/CountUpStat";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { MOCK_STATS } from "@/lib/mock";

export function StatsBar() {
  return (
    <section className="relative z-20 pb-12 md:pb-20 bg-transparent -mt-10 sm:-mt-14">
      <Container>
        <div className="relative max-w-5xl mx-auto rounded-3xl bg-white/95 backdrop-blur-xl border border-white shadow-xl shadow-slate-900/5 p-6 md:p-8 overflow-hidden">
          {/* Subtle gradient glow inside the card */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 via-transparent to-[var(--accent)]/5 pointer-events-none" />
          
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x divide-slate-100/0 sm:divide-slate-200">
            {MOCK_STATS.map((s, i) => (
              <AnimateOnScroll 
                key={i} 
                animation="scale-in" 
                delay={i * 100}
                className="flex flex-col items-center justify-center px-4"
              >
                <CountUpStat
                  end={s.end}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix ?? ""}
                  label={s.label}
                  duration={2000}
                  theme="light"
                />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}