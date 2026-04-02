import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { Container, Section, CTAButton, StepTimeline } from "@/components/design-system";
import { PageHero } from "@/components/page/PageHero";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { MOCK_SERVICES } from "@/lib/mock";
import { SERVICE_DEEP, DEFAULT_SERVICE_DEEP } from "@/lib/pageContent";
import { SERVICE_CASE_SNIPPETS } from "@/lib/richContent";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  TrendingUp,
  Users,
} from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = MOCK_SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.name} | Premium 1 Logistics LTD`,
    description: service.description,
  };
}

export async function generateStaticParams() {
  return MOCK_SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = MOCK_SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const deep = SERVICE_DEEP[slug] ?? DEFAULT_SERVICE_DEEP;
  const related = deep.relatedSlugs
    .map((s) => MOCK_SERVICES.find((x) => x.slug === s))
    .filter(Boolean) as typeof MOCK_SERVICES;

  const caseSnip = SERVICE_CASE_SNIPPETS[slug];
  const faqJsonLd =
    deep.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: deep.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <>
      {faqJsonLd && (
        <Script
          id={`faq-${slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      
      {/* ── Hero ── */}
      <PageHero
        eyebrow="Service"
        title={service.name}
        description={service.description}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
        backgroundImage={service.image}
      />

      {/* ── Overview & Highlights ── */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--surface-warm)] rounded-full blur-[100px] pointer-events-none opacity-60" aria-hidden />
        
        <Container className="relative">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
              <AnimateOnScroll animation="fade-up">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
                  Overview
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-[var(--ink)] leading-tight font-display font-bold mb-8">
                  {deep.longLead}
                </h2>
              </AnimateOnScroll>

              {deep.offerings && deep.offerings.length > 0 && (
                <div className="mb-12">
                  <AnimateOnScroll animation="fade-up">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
                      Service scope
                    </p>
                    <h3 className="font-display font-bold text-xl md:text-2xl text-[var(--ink)] mb-8">
                      How we support your call
                    </h3>
                  </AnimateOnScroll>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {deep.offerings.map((o, i) => (
                      <AnimateOnScroll key={o.title} animation="fade-up" delay={i * 60}>
                        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 md:p-7 shadow-sm hover:border-[var(--accent)]/25 hover:shadow-md transition-all duration-300 h-full">
                          <p className="font-display font-bold text-[var(--ink)] text-lg mb-2">{o.title}</p>
                          <p className="text-slate-600 leading-relaxed text-[15px] md:text-base">{o.description}</p>
                        </div>
                      </AnimateOnScroll>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {deep.highlights.map((h, i) => (
                  <AnimateOnScroll key={h} animation="fade-up" delay={i * 80}>
                    <div className="flex gap-4 rounded-2xl bg-[var(--surface-warm)] border border-slate-200/60 p-6 hover:bg-white hover:shadow-lg hover:shadow-slate-900/5 hover:border-[var(--accent)]/20 transition-all duration-300">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-slate-200/80 flex items-center justify-center shadow-sm">
                        <CheckCircle2 size={16} className="text-[var(--accent)]" />
                      </div>
                      <span className="text-slate-700 leading-relaxed text-lg pt-1">{h}</span>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>

              <AnimateOnScroll animation="fade-up" delay={300}>
                <div className="mt-12 flex flex-wrap gap-4">
                  <CTAButton href="/quote" variant="primary" size="lg">
                    Request a quote
                  </CTAButton>
                  <CTAButton href="/contact" variant="outline" size="lg">
                    Talk to our team
                  </CTAButton>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Right Column: Case Study & Target Audience */}
            <div className="lg:col-span-5 space-y-8">
              {caseSnip && (
                <AnimateOnScroll animation="slide-left">
                  <div className="relative rounded-3xl bg-[var(--navy)] text-white p-8 md:p-10 overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 hero-grid opacity-10" aria-hidden />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/20 rounded-full blur-[40px] pointer-events-none" aria-hidden />
                    
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-6">
                        <TrendingUp size={20} className="text-[var(--accent)]" />
                        <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                          Case Snapshot
                        </p>
                      </div>
                      <h3 className="font-display font-bold text-2xl mb-4 leading-tight">
                        {caseSnip.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed mb-8">
                        {caseSnip.body}
                      </p>
                      <div className="pt-6 border-t border-white/10">
                        <p className="text-sm text-white/50 uppercase tracking-wider mb-1">Business Impact</p>
                        <p className="font-display font-bold text-xl text-[var(--accent)]">
                          {caseSnip.metric}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              )}

              <AnimateOnScroll animation="slide-left" delay={150}>
                <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                      <Users size={18} className="text-[var(--accent)]" />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-[var(--ink)]">
                      Who it serves
                    </p>
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {deep.whoItServes}
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Workflow & Differentiators ── */}
      <section className="relative py-24 md:py-32 bg-[var(--surface-warm)] overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-start">
            
            <div className="lg:col-span-7">
              <AnimateOnScroll animation="fade-up">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
                  The Process
                </p>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)] mb-4">
                  Typical workflow
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed mb-12">
                  Steps adapt to your Incoterms and commodity — this is the backbone most engagements follow.
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-up" delay={100}>
                <StepTimeline steps={deep.workflow} />
              </AnimateOnScroll>
            </div>
            
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <AnimateOnScroll animation="fade-up" delay={200}>
                <div className="rounded-3xl bg-white border border-slate-200/80 p-8 md:p-10 shadow-xl shadow-slate-900/5 relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] rounded-t-3xl" />
                  
                  <h3 className="font-display font-bold text-2xl text-[var(--ink)] mb-8">
                    Why clients pick us here
                  </h3>
                  
                  <ul className="space-y-5">
                    {deep.differentiators.map((d, i) => (
                      <li key={d} className="flex gap-4 group">
                        <div className="w-8 h-8 rounded-full bg-[var(--surface-warm)] text-[var(--accent)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-300">
                          <ChevronRight size={16} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        <span className="text-slate-700 font-medium pt-1">
                          {d}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-10 pt-8 border-t border-slate-100">
                    <CTAButton href="/quote" className="w-full justify-center" variant="secondary" size="lg">
                      Start your quote
                    </CTAButton>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

          </div>
        </Container>
      </section>

      {/* ── FAQs ── */}
      {deep.faqs.length > 0 && (
        <section className="relative py-24 md:py-32 bg-white">
          <Container>
            <div className="flex flex-col items-center text-center mb-16">
              <div className="w-16 h-16 rounded-2xl bg-[var(--surface-warm)] border border-slate-200 flex items-center justify-center mb-6">
                <HelpCircle className="text-[var(--accent)]" size={32} strokeWidth={1.5} />
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)]">
                Common questions
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {deep.faqs.map((faq, i) => (
                <AnimateOnScroll key={faq.q} animation="fade-up" delay={i * 80}>
                  <details className="faq-details group rounded-2xl bg-white border border-slate-200/80 overflow-hidden hover:border-[var(--accent)]/30 hover:shadow-md transition-all duration-300">
                    <summary className="flex cursor-pointer items-center justify-between gap-6 p-6 font-display font-bold text-[var(--ink)] text-lg list-none">
                      {faq.q}
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--surface-warm)] flex items-center justify-center text-[var(--accent)] text-xl leading-none group-open:rotate-45 transition-transform duration-300">
                        +
                      </span>
                    </summary>
                    <div className="px-6 pb-6 pt-0 text-slate-600 text-lg leading-relaxed border-t border-transparent group-open:border-slate-100 transition-colors">
                      <p className="pt-4">{faq.a}</p>
                    </div>
                  </details>
                </AnimateOnScroll>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── Related Services ── */}
      {related.length > 0 && (
        <section className="relative py-24 md:py-32 bg-[var(--surface-warm)]">
          <Container>
            <AnimateOnScroll animation="fade-up" className="mb-12">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)] text-center">
                Explore related services
              </h2>
            </AnimateOnScroll>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {related.map((r, i) => (
                <AnimateOnScroll key={r.slug} animation="fade-up" delay={i * 100}>
                  <Link
                    href={`/services/${r.slug}`}
                    className="group flex flex-col justify-between h-full rounded-3xl border border-slate-200/80 bg-white p-8 hover:shadow-xl hover:shadow-slate-900/5 hover:border-[var(--accent)]/30 transition-all duration-500"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[var(--surface-warm)] text-[var(--accent)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <ChevronRight size={24} />
                      </div>
                      <h3 className="font-display font-bold text-xl text-[var(--ink)] mb-3">
                        {r.name}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-8">
                        {r.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-[var(--accent)] uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300">
                      View service <ArrowRight size={16} />
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
