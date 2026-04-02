import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { Container, CTAButton, StepTimeline } from "@/components/design-system";
import { PageHero } from "@/components/page/PageHero";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { MOCK_SERVICES } from "@/lib/mock";
import { SERVICE_DEEP, DEFAULT_SERVICE_DEEP } from "@/lib/pageContent";
import { SERVICE_CASE_SNIPPETS } from "@/lib/richContent";
import {
  Anchor,
  ArrowRight,
  ArrowUpRight,
  FileCheck,
  HelpCircle,
  Home,
  Layers,
  LucideIcon,
  Network,
  Package,
  Ship,
  Sparkles,
  Truck,
  TrendingUp,
  Users,
  Warehouse,
} from "lucide-react";

const SERVICE_RELATED_ICONS: Record<string, LucideIcon> = {
  Package,
  Ship,
  FileCheck,
  Warehouse,
  Truck,
  Home,
  Network,
  Anchor,
};

function ServiceIcon({ name }: { name?: string }) {
  const Icon = (name && SERVICE_RELATED_ICONS[name]) || Layers;
  return <Icon size={22} strokeWidth={1.75} className="text-[var(--accent)]" />;
}

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

      {/* ── Intro + insight row ── */}
      <section className="relative overflow-hidden border-b border-slate-200/80">
        <div className="absolute inset-0 mesh-hero-light opacity-90" aria-hidden />
        <div className="absolute inset-0 hero-grid opacity-[0.35] mix-blend-multiply pointer-events-none" style={{ backgroundSize: "40px 40px" }} aria-hidden />

        <Container className="relative py-14 md:py-20 lg:py-24">
          <div className="max-w-4xl">
            <AnimateOnScroll animation="fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/25 bg-white/80 backdrop-blur-sm px-4 py-1.5 mb-8">
                <Sparkles size={14} className="text-[var(--accent)]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                  Overview
                </span>
              </div>
              <h2 className="sr-only">About {service.name}</h2>
              <p className="text-xl sm:text-2xl md:text-[1.35rem] lg:text-[1.5rem] text-slate-700 font-normal leading-[1.55] tracking-tight max-w-3xl">
                {deep.longLead}
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={120}>
              <div className="mt-10 flex flex-wrap gap-3">
                <CTAButton href="/quote" variant="primary" size="lg">
                  Request a quote
                </CTAButton>
                <CTAButton href="/contact" variant="outline" size="lg">
                  Talk to our team
                </CTAButton>
              </div>
            </AnimateOnScroll>
          </div>

          <div
            className={
              caseSnip
                ? "mt-14 md:mt-16 grid md:grid-cols-2 gap-5 lg:gap-6"
                : "mt-14 md:mt-16 max-w-2xl"
            }
          >
            {caseSnip && (
              <AnimateOnScroll animation="fade-up" delay={80}>
                <div className="relative h-full rounded-3xl bg-[var(--navy)] text-white p-8 md:p-9 overflow-hidden shadow-xl shadow-[var(--navy)]/20 ring-1 ring-white/10">
                  <div className="absolute inset-0 hero-grid opacity-[0.12]" aria-hidden />
                  <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-[var(--accent)]/15 blur-3xl pointer-events-none" aria-hidden />
                  <div className="relative flex items-start gap-3 mb-5">
                    <div className="rounded-xl bg-[var(--accent)]/20 p-2.5 ring-1 ring-[var(--accent)]/25">
                      <TrendingUp size={20} className="text-[var(--accent)]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-1">
                        Case snapshot
                      </p>
                      <h3 className="font-display font-bold text-xl md:text-2xl leading-snug pr-2">{caseSnip.title}</h3>
                    </div>
                  </div>
                  <p className="relative text-white/70 text-[15px] md:text-base leading-relaxed mb-8">{caseSnip.body}</p>
                  <div className="relative pt-6 border-t border-white/10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Business impact</p>
                    <p className="font-display font-bold text-lg md:text-xl text-[var(--accent)] leading-snug">{caseSnip.metric}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            )}

            <AnimateOnScroll animation="fade-up" delay={caseSnip ? 160 : 80}>
              <div className="h-full rounded-3xl border border-slate-200/90 bg-white/90 backdrop-blur-sm p-8 md:p-9 shadow-lg shadow-slate-900/[0.04] ring-1 ring-slate-100">
                <div className="flex items-start gap-3 mb-5">
                  <div className="rounded-xl bg-[var(--accent-soft)] p-2.5 ring-1 ring-[var(--accent)]/15">
                    <Users size={20} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-1">Who it serves</p>
                    <h3 className="font-display font-bold text-xl text-[var(--ink)]">Built for your operating model</h3>
                  </div>
                </div>
                <p className="text-slate-600 text-[15px] md:text-base leading-relaxed">{deep.whoItServes}</p>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ── Offerings (optional) ── */}
      {deep.offerings && deep.offerings.length > 0 && (
        <section className="relative py-16 md:py-24 bg-white overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[min(520px,90vw)] h-[520px] rounded-full bg-[var(--accent)]/[0.06] blur-[100px] pointer-events-none" aria-hidden />
          <Container className="relative">
            <AnimateOnScroll animation="fade-up" className="mb-10 md:mb-12 max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">Service scope</p>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)] tracking-tight">
                How we support your call
              </h3>
            </AnimateOnScroll>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {deep.offerings.map((o, i) => (
                <AnimateOnScroll key={o.title} animation="fade-up" delay={i * 50}>
                  <div className="group h-full rounded-2xl border border-slate-200/80 bg-[var(--surface-warm)]/50 p-6 md:p-7 transition-all duration-300 hover:bg-white hover:border-[var(--accent)]/30 hover:shadow-xl hover:shadow-slate-900/[0.06]">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex h-2 w-2 shrink-0 rotate-45 bg-[var(--accent)] ring-4 ring-[var(--accent)]/15" aria-hidden />
                      <p className="font-display font-bold text-lg text-[var(--ink)] leading-tight group-hover:text-[var(--accent)] transition-colors">
                        {o.title}
                      </p>
                    </div>
                    <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed pl-5 border-l-2 border-[var(--accent)]/20 ml-1">
                      {o.description}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── Highlights ── */}
      <section
        className={`relative py-16 md:py-24 overflow-hidden ${deep.offerings?.length ? "bg-[var(--surface-warm)]" : "bg-white"}`}
      >
        {!deep.offerings?.length && (
          <div className="absolute left-0 top-24 w-72 h-72 rounded-full bg-[var(--navy)]/[0.04] blur-[80px] pointer-events-none" aria-hidden />
        )}
        <Container className="relative">
          <AnimateOnScroll animation="fade-up" className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">Capabilities</p>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)] tracking-tight">What you can expect</h3>
            </div>
            <p className="text-slate-500 text-sm md:text-base max-w-md md:text-right leading-relaxed">
              Concrete deliverables on every file—not generic promises.
            </p>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
            {deep.highlights.map((h, i) => (
              <AnimateOnScroll key={h} animation="fade-up" delay={i * 45}>
                <div className="flex gap-4 rounded-2xl bg-white border border-slate-200/70 p-5 md:p-6 shadow-sm card-hover min-h-[100px]">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--navy)] text-sm font-display font-bold text-[var(--accent)]"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <p className="text-slate-700 text-[15px] md:text-base leading-relaxed pt-1">{h}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Workflow + differentiators (navy band) ── */}
      <section className="relative py-20 md:py-28 bg-[var(--navy)] text-white overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-[0.08]" aria-hidden />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent"
          aria-hidden
        />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-[var(--accent)]/[0.07] blur-[120px] pointer-events-none" aria-hidden />

        <Container className="relative">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <AnimateOnScroll animation="fade-up">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">The process</p>
                <h3 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight mb-4">
                  Typical workflow
                </h3>
                <p className="text-white/55 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
                  Steps flex with your Incoterms and commodity—this is the spine most engagements follow.
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-up" delay={100}>
                <StepTimeline steps={deep.workflow} variant="dark" />
              </AnimateOnScroll>
            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <AnimateOnScroll animation="fade-up" delay={150}>
                <div className="rounded-3xl bg-white/[0.06] backdrop-blur-sm border border-white/10 p-8 md:p-9 shadow-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="text-[var(--accent)]" size={22} strokeWidth={1.5} />
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Why us</p>
                  </div>
                  <h4 className="font-display font-bold text-2xl text-white mb-8 leading-tight">Why clients pick us here</h4>
                  <ul className="space-y-5">
                    {deep.differentiators.map((d) => (
                      <li key={d} className="flex gap-4 text-[15px] md:text-base leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(46,196,182,0.6)]" aria-hidden />
                        <span className="text-white/80">{d}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 pt-8 border-t border-white/10">
                    <CTAButton href="/quote" className="w-full justify-center" variant="primary" size="lg">
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
        <section className="relative py-20 md:py-28 bg-[var(--surface-warm)] overflow-hidden">
          <Container>
            <AnimateOnScroll animation="fade-up" className="mb-12 md:mb-14 max-w-2xl">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-slate-200/80 shadow-sm mb-6">
                <HelpCircle className="text-[var(--accent)]" size={28} strokeWidth={1.5} />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">FAQ</p>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)] tracking-tight">Common questions</h3>
            </AnimateOnScroll>

            <div className="max-w-3xl space-y-3">
              {deep.faqs.map((faq, i) => (
                <AnimateOnScroll key={faq.q} animation="fade-up" delay={i * 60}>
                  <details className="faq-details group rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-sm hover:border-[var(--accent)]/25 hover:shadow-md transition-all duration-300">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 md:p-6 font-display font-bold text-[var(--ink)] text-base md:text-lg list-none">
                      <span className="pr-4">{faq.q}</span>
                      <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-[var(--surface-warm)] flex items-center justify-center text-[var(--accent)] text-lg leading-none group-open:rotate-45 transition-transform duration-300 border border-slate-200/60">
                        +
                      </span>
                    </summary>
                    <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0 text-slate-600 text-[15px] md:text-base leading-relaxed border-t border-slate-100">
                      <p className="pt-4">{faq.a}</p>
                    </div>
                  </details>
                </AnimateOnScroll>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── Related services ── */}
      {related.length > 0 && (
        <section className="relative py-20 md:py-28 bg-white border-t border-slate-200/60">
          <Container>
            <AnimateOnScroll animation="fade-up" className="mb-10 md:mb-12 text-center max-w-2xl mx-auto">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">Bundle</p>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)] tracking-tight">Related services</h3>
              <p className="text-slate-500 mt-3 text-base">Often booked together with {service.name.toLowerCase()}.</p>
            </AnimateOnScroll>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {related.map((r, i) => (
                <AnimateOnScroll key={r.slug} animation="fade-up" delay={i * 80}>
                  <Link
                    href={`/services/${r.slug}`}
                    className="group flex flex-col h-full rounded-3xl border border-slate-200/80 bg-[var(--surface-warm)]/40 p-7 md:p-8 transition-all duration-500 hover:bg-white hover:border-[var(--accent)]/35 hover:shadow-2xl hover:shadow-slate-900/[0.07] card-hover"
                  >
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center shadow-sm group-hover:border-[var(--accent)]/25 transition-colors">
                        <ServiceIcon name={r.icon} />
                      </div>
                      <ArrowUpRight
                        size={20}
                        className="text-slate-300 group-hover:text-[var(--accent)] transition-colors shrink-0"
                      />
                    </div>
                    <h4 className="font-display font-bold text-xl text-[var(--ink)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                      {r.name}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">{r.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)]">
                      View service
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
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
