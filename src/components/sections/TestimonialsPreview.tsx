"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Container } from "@/components/design-system/Container";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { MOCK_TESTIMONIALS } from "@/lib/mock";
import { Star, Quote, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function TestimonialsPreview() {
  const [activeId, setActiveId] = useState<string>(MOCK_TESTIMONIALS[0]?.id ?? "1");
  const active = useMemo(
    () => MOCK_TESTIMONIALS.find((t) => t.id === activeId) ?? MOCK_TESTIMONIALS[0],
    [activeId]
  );

  return (
    <section className="relative py-24 md:py-32 bg-[var(--surface-warm)] overflow-hidden">
      <div className="absolute -top-16 right-0 w-[420px] h-[320px] bg-[var(--accent)]/10 rounded-full blur-[90px]" />
      <Container className="relative">
        <AnimateOnScroll animation="fade-up" className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-[var(--accent)] uppercase bg-[var(--accent-soft)] rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--ink)] tracking-tight">
            What our clients say
          </h2>
          <p className="mt-6 text-slate-600 text-lg">
            Trusted by corporate teams across Ghana and West Africa.
          </p>
        </AnimateOnScroll>

        <div className="mt-16 grid lg:grid-cols-5 gap-8 xl:gap-10 items-start">
          <AnimateOnScroll animation="slide-right" className="lg:col-span-3">
            <div className="rounded-3xl bg-white border border-slate-200/80 shadow-xl shadow-slate-900/5 p-8 md:p-10 relative overflow-hidden min-h-[340px]">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)]" />
              <Quote className="absolute -right-4 -top-4 w-28 h-28 text-[var(--accent)]/10" />
              <div className="flex items-center gap-1 mb-7">
                {Array.from({ length: active.rating }).map((_, j) => (
                  <Star key={j} size={18} className="fill-[var(--accent)] text-[var(--accent)]" />
                ))}
              </div>
              <blockquote className="text-[var(--ink)] text-xl md:text-2xl leading-relaxed font-display italic max-w-2xl">
                &ldquo;{active.quote}&rdquo;
              </blockquote>
              <div className="mt-10 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  {active.avatar ? (
                    <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-slate-100">
                      <Image src={active.avatar} alt="" fill className="object-cover" sizes="56px" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[var(--navy)]/10 text-[var(--accent)] font-display font-bold flex items-center justify-center flex-shrink-0">
                      {active.client_name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  )}
                  <div>
                    <p className="font-display font-bold text-xl text-[var(--ink)]">{active.client_name}</p>
                    <p className="text-sm text-[var(--accent)] font-semibold">{active.company}</p>
                    {active.role ? <p className="text-xs text-slate-500 mt-0.5">{active.role}</p> : null}
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
                  Verified client
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </div>
          </AnimateOnScroll>

          <div className="lg:col-span-2 space-y-3">
            {MOCK_TESTIMONIALS.map((t, i) => {
              const isActive = t.id === activeId;
              return (
                <AnimateOnScroll key={t.id} animation="slide-left" delay={i * 80}>
                  <button
                    type="button"
                    onClick={() => setActiveId(t.id)}
                    className={cn(
                      "w-full text-left rounded-2xl border p-4 transition-all duration-300",
                      isActive
                        ? "bg-white border-[var(--accent)]/35 shadow-lg shadow-[var(--accent)]/10"
                        : "bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {t.avatar ? (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          <Image src={t.avatar} alt="" fill className="object-cover" sizes="40px" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[var(--navy)]/10 text-[var(--accent)] font-display font-bold text-sm flex items-center justify-center flex-shrink-0">
                          {t.client_name.split(" ").map((n) => n[0]).join("")}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className={cn("font-display font-bold truncate", isActive ? "text-[var(--ink)]" : "text-slate-700")}>
                          {t.client_name}
                        </p>
                        <p className="text-xs text-[var(--accent)] font-semibold truncate">{t.company}</p>
                      </div>
                    </div>
                  </button>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}