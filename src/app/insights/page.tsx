import Image from "next/image";
import Link from "next/link";
import { Container, Section, CTAButton } from "@/components/design-system";
import { PageHero } from "@/components/page/PageHero";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { MOCK_INSIGHTS } from "@/lib/pageContent";
import { InsightsPageClient } from "@/components/insights/InsightsPageClient";
import { ArrowUpRight, BookOpen, Clock, Mail } from "lucide-react";

export const metadata = {
  title: "Insights & Blog | Premium 1 Logistics LTD",
  description: "Guides and perspectives on logistics in Ghana, customs, and West Africa corridors.",
};

export default function InsightsPage() {
  const featured = MOCK_INSIGHTS.find((p) => p.featured) ?? MOCK_INSIGHTS[0];

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Practical logistics intelligence"
        description="Short, operator-written pieces on clearing cargo in Ghana, choosing modes, and running reliable corridors — not generic marketing fluff."
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
        backgroundImage="/hero-slide-1.webp"
      />

      {/* ── Featured Article ── */}
      <section className="relative py-16 md:py-24 bg-[var(--surface-warm)] overflow-hidden">
        <Container>
          <AnimateOnScroll animation="fade-up">
            <article className="group relative rounded-3xl overflow-hidden bg-[var(--navy)] text-white shadow-2xl shadow-slate-900/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 hero-grid opacity-15" aria-hidden />
              
              <div className="relative grid lg:grid-cols-12 gap-10 p-10 md:p-14 lg:p-16 items-center">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] text-xs font-bold uppercase tracking-wider mb-6">
                    <BookOpen size={14} />
                    Featured
                  </div>
                  <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
                    <Link href={`/insights/${featured.slug}`} className="hover:text-white/90 transition-colors after:absolute after:inset-0 after:z-10">
                      {featured.title}
                    </Link>
                  </h2>
                  <p className="text-lg text-white/70 leading-relaxed max-w-xl mb-8">
                    {featured.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
                    <span className="flex items-center gap-2">
                      <Clock size={16} className="text-[var(--accent)]" />
                      {featured.readTime}
                    </span>
                    <span>{featured.published_at}</span>
                    <span className="px-3 py-1 rounded-md bg-white/10 text-white/90 text-xs font-semibold">
                      {featured.category}
                    </span>
                  </div>
                </div>
                
                <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-8 relative z-20">
                  <div className="relative w-full aspect-[4/3] max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-white/5 group-hover:border-white/10 transition-colors duration-500">
                    <Image src="/insights-featured.webp" alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-[var(--navy)]/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <Link
                    href={`/insights/${featured.slug}`}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--accent)] text-white font-bold hover:bg-[var(--accent-hover)] transition-all shadow-lg shadow-[var(--accent)]/20 hover:-translate-y-1 w-full sm:w-auto justify-center"
                  >
                    Read article
                    <ArrowUpRight size={20} />
                  </Link>
                </div>
              </div>
            </article>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ── Article Grid ── */}
      <section className="relative pb-24 md:pb-32 bg-[var(--surface-warm)]">
        <Container>
          <InsightsPageClient posts={MOCK_INSIGHTS} featured={featured} />
        </Container>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--accent)]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <Container>
          <AnimateOnScroll animation="pop-up">
            <div className="rounded-3xl border-2 border-[var(--accent)]/20 bg-gradient-to-br from-[var(--surface-warm)] to-white p-10 md:p-16 text-center max-w-4xl mx-auto shadow-xl shadow-slate-900/5 relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 text-[var(--accent)] flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Mail size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)] mb-4">
                Want this in your inbox?
              </h3>
              <p className="mt-4 text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                We are building a low-frequency newsletter for procurement and ops leads. For now, follow us on LinkedIn or
                reach out to be notified at launch.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <CTAButton href="/contact" variant="primary" size="lg">
                  Notify me
                </CTAButton>
                <CTAButton
                  href="https://linkedin.com/company/premium1logistics"
                  variant="outline"
                  size="lg"
                  external
                >
                  Follow on LinkedIn
                </CTAButton>
              </div>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>
    </>
  );
}
