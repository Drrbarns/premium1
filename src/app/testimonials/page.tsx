import Image from "next/image";
import { Container, Section, CTAButton } from "@/components/design-system";
import { PageHero } from "@/components/page/PageHero";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { MOCK_TESTIMONIALS } from "@/lib/mock";
import { CASE_STUDIES, EXTENDED_TESTIMONIALS } from "@/lib/richContent";
import { ArrowRight, CheckCircle2, Lock, Quote, Star, TrendingUp } from "lucide-react";

export const metadata = {
  title: "Client Success & Testimonials | Premium 1 Logistics LTD",
  description: "What clients say about Premium 1 Logistics — corporate freight across Ghana and West Africa.",
};

const ALL_T = [...MOCK_TESTIMONIALS, ...EXTENDED_TESTIMONIALS];

export default function TestimonialsPage() {
  const featured = ALL_T[0];
  const rest = ALL_T.slice(1);

  return (
    <>
      <PageHero
        eyebrow="Social Proof"
        title="Trusted by teams who cannot afford delays"
        description="Manufacturers, traders, and project owners rely on us when documentation, corridors, and timelines all have to line up."
        crumbs={[{ label: "Home", href: "/" }, { label: "Client Success" }]}
        backgroundImage="/hero-slide-1.png"
      />

      {/* ── Featured Testimonial (Dark) ── */}
      <section className="relative py-24 md:py-32 bg-[var(--navy)] text-white overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-[0.06]" aria-hidden />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)]/10 rounded-full blur-[120px] pointer-events-none" aria-hidden />

        <Container className="relative">
          <AnimateOnScroll animation="pop-up" className="max-w-4xl mx-auto text-center">
            <Quote className="mx-auto text-[var(--accent)] mb-8 opacity-80" size={56} strokeWidth={1} />
            
            <div className="flex justify-center gap-1.5 mb-8">
              {Array.from({ length: featured.rating }).map((_, i) => (
                <Star key={i} size={24} className="fill-[var(--accent)] text-[var(--accent)]" />
              ))}
            </div>
            
            <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-12">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 border-t border-white/10">
              {featured.avatar && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-[var(--accent)]/20 shadow-xl">
                  <Image src={featured.avatar} alt={featured.client_name} fill className="object-cover" sizes="64px" />
                </div>
              )}
              <div className="text-center sm:text-left">
                <p className="font-display font-bold text-2xl tracking-tight">{featured.client_name}</p>
                <p className="text-white/70 text-lg">{featured.company}</p>
                {featured.role && <p className="text-sm font-semibold text-[var(--accent)] mt-1 uppercase tracking-wider">{featured.role}</p>}
              </div>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ── More Client Voices ── */}
      <section className="relative py-24 md:py-32 bg-[var(--surface-warm)] overflow-hidden">
        <Container>
          <AnimateOnScroll animation="fade-up" className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
              Client Feedback
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)]">
              More client voices
            </h2>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {rest.map((t, i) => (
              <AnimateOnScroll key={t.id} animation="fade-up" delay={i * 80}>
                <div className="group h-full flex flex-col justify-between rounded-3xl bg-white border border-slate-200/80 p-8 md:p-10 shadow-lg shadow-slate-900/5 hover:border-[var(--accent)]/30 hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex gap-1">
                        {Array.from({ length: t.rating }).map((_, idx) => (
                          <Star key={idx} size={18} className="fill-[var(--accent)] text-[var(--accent)]" />
                        ))}
                      </div>
                      <Quote className="text-slate-200" size={32} />
                    </div>
                    <p className="text-slate-700 text-lg leading-relaxed mb-10">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
                    {t.avatar ? (
                      <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-slate-200">
                        <Image src={t.avatar} alt={t.client_name} fill className="object-cover" sizes="56px" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-display font-bold text-xl flex items-center justify-center flex-shrink-0">
                        {t.client_name.split(" ").map((n) => n[0]).join("")}
                      </div>
                    )}
                    <div>
                      <p className="font-display font-bold text-lg text-[var(--ink)]">{t.client_name}</p>
                      <p className="text-sm font-medium text-slate-500">{t.company}</p>
                      {t.role && <p className="text-xs font-bold text-[var(--accent)] mt-1 uppercase tracking-wider">{t.role}</p>}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Case Studies & Outcomes ── */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <Container>
          <AnimateOnScroll animation="fade-up" className="max-w-2xl mb-16">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-[var(--accent)]" size={28} />
              <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)]">
                Redacted case studies
              </h2>
            </div>
            <p className="text-slate-600 text-lg leading-relaxed">
              Illustrative outcomes — full decks, customer references, and metrics packs available under NDA for qualified RFPs.
            </p>
          </AnimateOnScroll>

          <div className="grid lg:grid-cols-3 gap-6 mb-20">
            {CASE_STUDIES.map((c, i) => (
              <AnimateOnScroll key={c.id} animation="fade-up" delay={i * 100}>
                <div className="group h-full rounded-3xl border border-slate-200/80 bg-[var(--surface-warm)] p-8 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5 hover:border-[var(--accent)]/20 transition-all duration-500 flex flex-col">
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1.5 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-bold uppercase tracking-wider mb-4">
                      {c.industry}
                    </span>
                    <h3 className="font-display font-bold text-xl text-[var(--ink)] leading-snug">
                      {c.route}
                    </h3>
                  </div>
                  
                  <div className="space-y-4 mb-8 flex-grow">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Challenge</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{c.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-1">Outcome</p>
                      <p className="text-sm font-medium text-[var(--ink)] leading-relaxed">{c.outcome}</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200/80">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Key Metrics</p>
                    <ul className="space-y-2">
                      {c.metrics.map((m) => (
                        <li key={m} className="flex gap-2.5 text-sm text-slate-700">
                          <CheckCircle2 size={16} className="text-[var(--accent)] flex-shrink-0 mt-0.5" />
                          <span className="font-medium">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll animation="pop-up">
            <div className="rounded-3xl border-2 border-[var(--accent)]/20 bg-gradient-to-br from-[var(--surface-warm)] to-white p-10 md:p-14 text-center max-w-3xl mx-auto shadow-lg shadow-[var(--accent)]/5">
              <Lock className="mx-auto text-[var(--accent)] mb-5" size={36} strokeWidth={1.5} />
              <h3 className="font-display font-bold text-2xl md:text-3xl text-[var(--ink)] mb-4">
                Need deeper diligence?
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
                We provide banker references, insurance certificates, and site visits for enterprise tenders.
              </p>
              <CTAButton href="/contact" variant="primary" size="lg">
                Ask for references <ArrowRight className="ml-2 w-4 h-4" />
              </CTAButton>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>
    </>
  );
}
