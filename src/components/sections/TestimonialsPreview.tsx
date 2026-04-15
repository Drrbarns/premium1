"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/design-system/Container";
import { MOCK_TESTIMONIALS } from "@/lib/mock";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function TestimonialsPreview() {
  const [active, setActive] = useState(0);
  const total = MOCK_TESTIMONIALS.length;

  const next = useCallback(() => setActive((p) => (p + 1) % total), [total]);

  useEffect(() => {
    const id = setInterval(next, 8000);
    return () => clearInterval(id);
  }, [next]);

  const t = MOCK_TESTIMONIALS[active];

  return (
    <section className="relative overflow-hidden bg-[var(--surface-warm)] py-16 md:py-24">
      <div className="absolute inset-0 hero-grid opacity-[0.06]" aria-hidden />
      <div
        className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[var(--accent)]/[0.07] blur-[100px]"
        aria-hidden
      />

      <Container className="relative">
        <div className="grid min-w-0 items-stretch gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: editorial intro + pickers */}
          <div className="flex min-w-0 flex-col justify-center lg:col-span-5">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--accent)]">
              Field notes
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl md:text-4xl">
              What operators say
              <span className="mt-1 block text-lg font-normal text-slate-500 md:text-xl">
                after the cargo clears.
              </span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              Short reads from teams we support in Ghana and across the corridor—no stock photos, no filler.
            </p>

            <div className="mt-8 space-y-2">
              {MOCK_TESTIMONIALS.map((item, i) => {
                const isOn = i === active;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      "flex min-h-[3.25rem] w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-all duration-300 sm:min-h-0 sm:gap-4 sm:px-4 sm:py-3.5",
                      isOn
                        ? "border-[var(--accent)]/40 bg-white shadow-lg shadow-slate-900/[0.06]"
                        : "border-transparent bg-white/40 hover:bg-white/80",
                    )}
                    aria-pressed={isOn}
                    aria-label={`Show testimonial from ${item.client_name}`}
                  >
                    {item.avatar ? (
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                        <Image src={item.avatar} alt="" fill className="object-cover" sizes="44px" />
                      </div>
                    ) : (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--navy)]/8 font-display text-sm font-bold text-[var(--accent)]">
                        {item.client_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          "truncate font-display text-sm font-bold",
                          isOn ? "text-[var(--ink)]" : "text-slate-700",
                        )}
                      >
                        {item.client_name}
                      </p>
                      <p className="truncate text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                        {item.company}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "font-mono text-[10px] font-bold tabular-nums text-slate-400",
                        isOn && "text-[var(--accent)]",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: quote panel */}
          <div className="relative min-w-0 lg:col-span-7">
            <div className="relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-[var(--navy)] p-5 text-white shadow-xl shadow-slate-900/15 sm:min-h-[300px] sm:p-7 md:p-9 lg:min-h-[360px]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,rgba(46,196,182,0.12),transparent_55%)]" />
              <div className="pointer-events-none absolute inset-0 hero-grid opacity-[0.07]" />

              <div className="relative">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} className="fill-[var(--accent)] text-[var(--accent)]" />
                    ))}
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/70">
                    Verified client
                  </span>
                </div>

                <blockquote
                  key={t.id}
                  className="animate-fade-up font-display text-base font-medium leading-relaxed tracking-tight text-white/95 sm:text-lg md:text-xl"
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              <div className="relative mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-6">
                <div>
                  <p className="font-display text-base font-bold text-white">{t.client_name}</p>
                  <p className="mt-0.5 text-sm text-white/55">
                    {t.role ? `${t.role} · ` : null}
                    <span className="font-semibold text-[var(--accent)]">{t.company}</span>
                  </p>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5" role="tablist" aria-label="Testimonial">
                  {MOCK_TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActive(i)}
                      className="flex h-11 min-w-11 items-center justify-center rounded-lg sm:h-auto sm:min-w-0 sm:rounded-none sm:p-0"
                      aria-label={`Testimonial ${i + 1}`}
                      aria-current={i === active}
                    >
                      <span
                        className={cn(
                          "block h-1.5 rounded-full transition-all duration-300",
                          i === active ? "w-8 bg-[var(--accent)]" : "w-2 bg-white/25 sm:w-1.5",
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
